// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uploadRouter = require('./routes/upload');
const predictRouter = require('./routes/predict');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRouter);
app.use('/api/predict', predictRouter);

// connect to mongodb if MONGO_URI in .env
const MONGO = process.env.MONGO_URI || null;
if (MONGO) {
  mongoose.connect(MONGO).then(()=> {
    console.log('MongoDB connected');
  }).catch(err => console.error('Mongo connection error', err));
} else {
  console.log('MONGO_URI not set - running without DB (predictions saved only in memory)');
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening ${PORT}`));
