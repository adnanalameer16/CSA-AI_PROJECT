import React, { useState } from 'react';
import UploadCSV from './uploadCSV';
import Dashboard from './dashboard';
import './App.css';

function App(){
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="app-shell">
      {/* Top Nav */}
      <nav className="nav">
        <div className="nav-inner container">
          <div className="brand">
            <span className="dot" />
            Demand Forecasting
          </div>
          <span className="tag">v1.0</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="container header-hero">
        <div className="hero">
          <span className="eyebrow">Forecasting</span>
          <h2 className="title">Plan inventory with confidence</h2>
          <p className="sub">Upload your sales history, select a product, and instantly view AI-powered predictions.</p>
          <div className="kpis">
            <div className="kpi"><div className="label">Models</div><div className="value">1</div></div>
            <div className="kpi"><div className="label">Horizon</div><div className="value">1-12 mo</div></div>
            <div className="kpi"><div className="label">Status</div><div className="value">Online</div></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container">
        <div className="grid">
          <section className="panel">
            <div className="panel-header">
              <h3>Upload & Predict</h3>
              <span className="muted">CSV: product, year_month, sales</span>
            </div>
            <div className="panel-body">
              <UploadCSV onPrediction={(resp) => setPrediction(resp)} />
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h3>Dashboard</h3>
              <span className="muted">Predicted monthly sales</span>
            </div>
            <div className="panel-body">
              <Dashboard prediction={prediction} />
            </div>
          </section>
        </div>
      </main>

      <footer className="footer container">Built for insights • {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
