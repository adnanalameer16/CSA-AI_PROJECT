require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const USE_DB = process.env.USE_DB === 'true';
const DATABASE_URL = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

let pool = null;
if (USE_DB) {
  pool = new Pool({ connectionString: DATABASE_URL });
  console.log('✅ Connected to Postgres');
} else {
  console.log('⚙️ Running in memory mode');
}

const memoryStore = [];

// Priority logic
function computeScore(report) {
  const w = { severity: 3, casualties: 2.5, population: 1, damage: 2, accessibility: 1.5, age: 0.1 };
  const dmg = (d => ({ hospital: 1, bridge: 0.8, road: 0.6, building: 0.7, none: 0 })[d?.toLowerCase()] ?? 0.5)(report.infrastructure_damage);
  const acc = (a => ({ open: 1, partial: 0.5, blocked: 0 })[a?.toLowerCase()] ?? 0.5)(report.accessibility);
  const hours = (Date.now() - new Date(report.time_reported || Date.now())) / (1000 * 60 * 60);
  let score = w.severity * (report.severity / 5 * 5) +
              w.casualties * Math.log(1 + (report.casualties || 0)) +
              w.population * ((report.affected_population || 0) / 1000) +
              w.damage * dmg * 5 +
              w.accessibility * (1 - acc) * 5 +
              w.age * hours;
  if (report.chemical_spill) score += 30;
  if ((report.infrastructure_damage || '').includes('hospital') && report.casualties > 0) score += 20;
  return score;
}

function mapLevel(score) {
  if (score >= 25) return 'Critical';
  if (score >= 15) return 'High';
  if (score >= 7) return 'Medium';
  return 'Low';
}

async function saveReport(report) {
  report.time_reported = report.time_reported || new Date().toISOString();
  report.score = computeScore(report);
  report.priority_level = mapLevel(report.score);
  report.served = false;
  if (USE_DB) {
    const q = `INSERT INTO incident_reports (reporter, latitude, longitude, severity, affected_population, casualties,
      infrastructure_damage, accessibility, chemical_spill, time_reported, metadata, score, priority_level, served)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;`;
    const vals = [
      report.reporter || null,
      report.latitude, report.longitude, report.severity,
      report.affected_population || 0, report.casualties || 0,
      report.infrastructure_damage || null, report.accessibility || null,
      report.chemical_spill || false, report.time_reported,
      JSON.stringify(report.metadata || {}), report.score,
      report.priority_level, report.served
    ];
    const res = await pool.query(q, vals);
    return res.rows[0];
  } else {
    const id = memoryStore.length + 1;
    memoryStore.push({ id, ...report });
    return { id, ...report };
  }
}

async function listReports() {
  if (USE_DB) {
    const res = await pool.query('SELECT * FROM incident_reports ORDER BY score DESC');
    return res.rows;
  }
  return memoryStore.sort((a, b) => b.score - a.score);
}

app.post('/reports', async (req, res) => {
  if (!req.body.latitude || !req.body.longitude || !req.body.severity)
    return res.status(400).json({ error: 'latitude, longitude, severity required' });
  const saved = await saveReport(req.body);
  res.status(201).json(saved);
});

app.get('/reports', async (_, res) => {
  const data = await listReports();
  res.json(data);
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
