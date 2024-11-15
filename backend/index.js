const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const socketIo = require('socket.io');
const http = require('http');

const server = http.createServer(app);

const io = new socketIo.Server(server, {
  cors: {
    origin: [
      "http://localhost:3000", // Local frontend during development
      "https://co-watch-virtual-theater-front.vercel.app" // Deployed frontend
    ],
    methods: ["GET", "POST"]
  }
});

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.json());

// Dynamic CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // Local frontend during development
  "https://co-watch-virtual-theater-front.vercel.app" // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // Origin is not allowed
      return callback(new Error('Not allowed by CORS'));
    }
    return callback(null, true);
  },
  methods: ["GET", "POST"],
  credentials: true // Allow cookies and credentials
}));

app.use('/auth', AuthRouter);

// Single consolidated Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a room based on roomId
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("userJoined", { callerID: socket.id });
    console.log(`User joined room: ${roomId}`);
  });

  // Handle signaling data
  socket.on("sendingSignal", (payload) => {
    io.to(payload.userToSignal).emit("receivingSignal", { signal: payload.signal, id: socket.id });
  });

  socket.on("returningSignal", (payload) => {
    io.to(payload.callerID).emit("receivingReturnedSignal", { signal: payload.signal, id: socket.id });
  });

  // Chat messages
  socket.on("sendMessage", (message) => {
    io.to(message.roomId).emit("receiveMessage", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Test endpoint
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Start the combined server on the specified PORT
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
