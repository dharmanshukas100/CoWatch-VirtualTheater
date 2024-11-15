const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const socketIo = require('socket.io');
const http = require('http');


// app.use('/api', roomRoutes);



const server = http.createServer(app);

const io = new socketIo.Server(server, {
  cors: {
      origin: "http://localhost:3000",  // Allow frontend's origin
      methods: ["GET", "POST"]
  }
});

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000",  // Allow frontend's origin
  methods: ["GET", "POST"],
  credentials: true  // Allow credentials if needed
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
