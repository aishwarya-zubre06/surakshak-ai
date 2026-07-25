const express = require('express');
const router = express.Router();
const Threat = require('../models/Threat');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const threats = await Threat.find().sort({ timestamp: -1 });
    res.json(threats);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  const { type, source, location, risk, status } = req.body;
  try {
    const newThreat = new Threat({ type, source, location, risk, status });
    await newThreat.save();
    res.json(newThreat);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
