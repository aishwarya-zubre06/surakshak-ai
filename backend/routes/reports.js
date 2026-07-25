const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id });
    res.json(reports);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/generate', auth, async (req, res) => {
  try {
    const report = new Report({
      userId: req.user.id,
      title: 'Weekly Cyber Threat Summary',
      content: 'This is a simulated report for demonstration purposes.'
    });
    await report.save();
    res.json(report);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
