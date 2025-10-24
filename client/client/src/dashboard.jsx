import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function Dashboard({ prediction }) {
  if (!prediction) return (
    <div>
      <div className="badge">Empty state</div>
      <p className="muted" style={{marginTop:8}}>No prediction yet. Upload your CSV and choose a product to see the chart.</p>
    </div>
  );

  const product = prediction.ml.product;
  const preds = prediction.ml.predictions;

  const labels = preds.map(p => p.year_month);
  const values = preds.map(p => p.predicted_sales);

  const data = {
    labels,
    datasets: [{
      label: `${product} predicted sales`,
      data: values,
      borderColor: 'rgba(34,211,238,.9)',
      backgroundColor: 'rgba(34,211,238,.25)',
      pointRadius: 3,
      tension: 0.35,
    }]
  };
  const options = {
    responsive: true,
    plugins: { legend: { display: true }, title: { display: false } },
    scales: { x: { grid: { color: 'rgba(255,255,255,.06)' } }, y: { grid: { color: 'rgba(255,255,255,.06)' } } }
  };

  const total = values.reduce((a,b)=>a+b,0);
  const avg = values.length ? (total/values.length) : 0;

  return (
    <div>
      <h3 style={{marginTop:0}}>Prediction for {product}</h3>
      <div className="stats">
        <div className="stat"><div className="label">Total predicted</div><div className="value">{total.toFixed(2)}</div></div>
        <div className="stat"><div className="label">Monthly average</div><div className="value">{avg.toFixed(2)}</div></div>
      </div>
      <div className="chart-wrap">
        <Line data={data} options={options} />
      </div>
      <ul className="list" style={{marginTop:12}}>
        {preds.map(p => <li key={p.year_month}><strong>{p.year_month}</strong> · {p.predicted_sales}</li>)}
      </ul>
    </div>
  );
}
