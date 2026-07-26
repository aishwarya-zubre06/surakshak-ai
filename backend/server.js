require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('[OK] MongoDB connected'))
  .catch(err => console.error('[ERROR] MongoDB connection:', err.message));

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

// Real‑time threat emitter (improved)
io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);

  const interval = setInterval(() => {
    const threatTypes = [
      'Phishing', 'Malware', 'QR Scam', 'Deepfake',
      'Financial Fraud', 'Ransomware', 'DDoS', 'Data Breach'
    ];
    const riskLevels = ['Low', 'Medium', 'High'];
    const statuses = ['Detected', 'Blocked', 'Escalated', 'Under Investigation'];
    const cities = [
      { city: 'Mumbai', lat: 19.0760, lng: 72.8777 },
      { city: 'Delhi', lat: 28.6139, lng: 77.2090 },
      { city: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
      { city: 'Chennai', lat: 13.0827, lng: 80.2707 },
      { city: 'Kolkata', lat: 22.5726, lng: 88.3639 },
      { city: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
      { city: 'Pune', lat: 18.5204, lng: 73.8567 },
      { city: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    ];
    const location = cities[Math.floor(Math.random() * cities.length)];

    const fakeThreat = {
      id: Date.now() + Math.random().toString(36).substring(2, 8),
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      source: `attacker-${Math.floor(Math.random() * 9999)}@example.com`,
      location: {
        lat: location.lat + (Math.random() - 0.5) * 0.02,
        lng: location.lng + (Math.random() - 0.5) * 0.02,
        city: location.city,
      },
      risk: riskLevels[Math.floor(Math.random() * riskLevels.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: new Date().toISOString(),
      description: `Suspicious activity detected from ${location.city}`
    };

    io.emit('newThreat', fakeThreat);
    console.log(`[Threat] ${fakeThreat.type} at ${fakeThreat.location.city} (${fakeThreat.risk} risk)`);

  }, 5000);

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[OK] Server running on port ${PORT}`);
});