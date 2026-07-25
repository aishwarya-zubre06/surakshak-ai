const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/surakshak')
  .then(() => console.log('[OK] MongoDB connected'))
  .catch(err => console.error('[ERROR] MongoDB connection:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/threats', require('./routes/threats'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/reports', require('./routes/reports'));

// HTTP & Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

const socketIntervals = new Map();

io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);
  const interval = setInterval(() => {
    const fakeThreat = {
      id: Date.now() + Math.random(),
      type: ['Phishing', 'Malware', 'QR Scam', 'Deepfake', 'Financial Fraud'][Math.floor(Math.random() * 5)],
      source: `attacker-${Math.floor(Math.random() * 100)}@example.com`,
      location: {
        lat: 20 + Math.random() * 10,
        lng: 70 + Math.random() * 10
      },
      risk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      status: 'Detected',
      timestamp: new Date()
    };
    socket.emit('newThreat', fakeThreat);
  }, 5000);
  socketIntervals.set(socket.id, interval);

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
    const interval = socketIntervals.get(socket.id);
    if (interval) clearInterval(interval);
    socketIntervals.delete(socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[OK] Server running on port ${PORT}`);
});