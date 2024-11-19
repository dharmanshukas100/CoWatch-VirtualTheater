// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const AuthRouter = require('./Routes/AuthRouter');
// const http = require('http');
// const { Server } = require('socket.io');

// const server = http.createServer(app);


// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:3000", // Local frontend during development
//       "https://co-watch-main.vercel.app" // Deployed frontend
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true 
//   }
// });

// require('dotenv').config();
// require('./Models/db');
// const PORT = process.env.PORT || 5000;

// // Middleware setup
// app.use(bodyParser.json());

// // Dynamic CORS configuration
// const allowedOrigins = [
//   "http://localhost:3000", // Local frontend during development
//   "https://co-watch-main.vercel.app" // Deployed frontend
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       // Origin is not allowed
//       return callback(new Error('Not allowed by CORS'));
//     }
//     return callback(null, true);
//   },
//   methods: ["GET", "POST"],
//   credentials: true // Allow cookies and credentials
// }));

// app.use('/auth', AuthRouter);


// io.on('connection', (socket) => {
//   console.log('User connected');
//   console.log('Socket id :',socket.id);

//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     console.log(`User joined room: ${roomId}`);
//     socket.to(roomId).emit("userJoined", { callerID: socket.id });
//   });

//   socket.on("sendMessage", ({ roomId, message, fname }) => {
//     const payload = {
//       message,
//       fname,
//       senderId: socket.id,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };
//     socket.broadcast.to(roomId).emit("receiveMessage", payload); // Send to others in the room except sender
//     console.log(`Message sent to room ${roomId}:`, payload);
//   });
  

//   socket.on("disconnected", () => {
//     console.log("User disconnected")
//   })
// }); 




// app.get('/ping', (req, res) => {
//   res.send('PONG');
// });

// // Start the combined server on the specified PORT
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000", // Local frontend during development
      "https://co-watch-main.vercel.app" // Deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
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
  "https://co-watch-main.vercel.app" // Deployed frontend
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

// Participant tracking
const participants = {}; // To track participants in rooms

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle joining a room
  socket.on("joinRoom", ({ roomId, fname }) => {
    socket.join(roomId);
    console.log(`${fname} joined room: ${roomId}`);
    
    // Initialize room's participant list if not present
    if (!participants[roomId]) {
      participants[roomId] = [];
    }
  
    // Prevent duplicate entries for the same socket ID
    if (!participants[roomId].some((p) => p.id === socket.id)) {
      participants[roomId].push({ id: socket.id, fname });
    }
  
    // Notify everyone in the room about the updated participants list
    io.to(roomId).emit("updateParticipants", participants[roomId]);
  });
  

  // Handle sending messages
  socket.on("sendMessage", ({ roomId, message, fname }) => {
    const payload = {
      message,
      fname,
      senderId: socket.id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    socket.broadcast.to(roomId).emit("receiveMessage", payload); // Send to others in the room except sender
    console.log(`Message sent to room ${roomId}:`, payload);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    for (const roomId in participants) {
      participants[roomId] = participants[roomId].filter(
        (participant) => participant.id !== socket.id
      );
  
      // Notify room of updated participants
      io.to(roomId).emit("updateParticipants", participants[roomId]);
    }
    console.log("User disconnected:", socket.id);
  });
});

app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Start the combined server on the specified PORT
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
