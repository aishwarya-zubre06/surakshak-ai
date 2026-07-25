const mongoose = require('mongoose');

const ThreatSchema = new mongoose.Schema({
  type: { type: String, required: true },
  source: { type: String, required: true },
  location: { lat: Number, lng: Number },
  risk: { type: String, enum: ['Low', 'Medium', 'High'] },
  status: { type: String, enum: ['Detected', 'Blocked', 'Escalated', 'Reported'] },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Threat', ThreatSchema);