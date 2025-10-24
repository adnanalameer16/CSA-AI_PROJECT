// server/models/Prediction.js
const mongoose = require('mongoose');

const PredSchema = new mongoose.Schema({
  product: String,
  history: [{ year_month: String, sales: Number }],
  predictions: [{ year_month: String, predicted_sales: Number }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', PredSchema);
