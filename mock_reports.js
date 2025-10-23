// mock_reports.js
// Run with: node mock_reports.js
import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000/reports";

// Some realistic data pools
const damages = ["none", "road blocked", "bridge collapsed", "hospital damaged", "school collapsed", "power line down"];
const access = ["open", "partial", "blocked"];

function randomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(4);
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function generateReport(i) {
  const report = {
    reporter: `team_${i}`,
    latitude: randomFloat(8, 30),
    longitude: randomFloat(70, 90),
    severity: Math.floor(Math.random() * 5) + 1,
    affected_population: Math.floor(Math.random() * 5000) + 100,
    casualties: Math.floor(Math.random() * 50),
    infrastructure_damage: randomChoice(damages),
    accessibility: randomChoice(access),
    chemical_spill: Math.random() < 0.05, // 5% chance
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });

  const data = await res.json();
  console.log(`✅ Report ${i} sent -> Priority: ${data.priority_level} | Score: ${data.score.toFixed(2)}`);
}

async function main() {
  const total = 30; // how many to send
  for (let i = 1; i <= total; i++) {
    await generateReport(i);
  }
  console.log("✅ All mock reports sent!");
}

main();
