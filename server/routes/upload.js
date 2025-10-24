// server/routes/upload.js
const express = require('express');
const multer = require('multer');
const csv = require('csvtojson');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/upload/csv
 * Form-data with file field 'file' (CSV with columns: product,year_month,sales)
 */
router.post('/csv', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const csvStr = req.file.buffer.toString('utf8');
    const arr = await csv().fromString(csvStr);
    // Return parsed rows to client so they can call predict
    res.json({ rows: arr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

module.exports = router;
