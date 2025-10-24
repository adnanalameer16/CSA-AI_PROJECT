// server/routes/predict.js
const express = require('express');
const axios = require('axios');
const Prediction = require('../models/Prediction');
const router = express.Router();

// POST /api/predict
// { product, history: [{year_month, sales}, ...], horizon }
router.post('/', async (req, res) => {
  try {
    const { product, history, horizon = 1 } = req.body;
    if (!product || !history) return res.status(400).json({ error: 'product & history required' });

    // call python ML service
    const mlUrl = process.env.ML_URL || 'http://localhost:5001/predict';
    const resp = await axios.post(mlUrl, { product, history, horizon });
    const mlRes = resp.data;

    // Save to DB if available
    let saved = null;
    try {
      if (process.env.MONGO_URI) {
        const p = new Prediction({ product, history, predictions: mlRes.predictions });
        saved = await p.save();
      }
    } catch (e) {
      console.warn('DB save failed', e.message);
    }

    res.json({ ml: mlRes, saved });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ error: 'prediction failed', detail: err.message || err });
  }
});

// GET history (if DB connected)
router.get('/history', async (req, res) => {
  if (!process.env.MONGO_URI) return res.json({ error: 'no-db' });
  const items = await Prediction.find().sort({ createdAt: -1 }).limit(50);
  res.json(items);
});

module.exports = router;
