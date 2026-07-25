const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const auth = require('../middleware/auth');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

router.post('/', auth, async (req, res) => {
  const { message } = req.body;
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_actual_google_gemini_api_key') {
      return res.json({ reply: 'Gemini API key not configured. Please set GEMINI_API_KEY in .env' });
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Sorry, I had trouble processing your request.' });
  }
});

module.exports = router;
