import React, { useState, useRef } from 'react';
import { uploadCSV, requestPredict } from './utils/api';

export default function UploadCSV({ onPrediction }) {
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState('');
  const [horizon, setHorizon] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text }
  const fileInputRef = useRef(null);

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    try {
      setMessage(null);
      if (!file) { setMessage({ type: 'error', text: 'Choose a CSV file first.' }); return; }
      if (!product) { setMessage({ type: 'error', text: 'Enter a product name.' }); return; }
      setLoading(true);
      const parseResp = await uploadCSV(file);
      const rows = parseResp.data.rows || [];
      const history = rows.filter(r => r.product === product);
      if (history.length === 0) { setMessage({ type: 'error', text: 'No rows found for that product in the CSV.' }); return; }
      const payload = { product, history, horizon: Number(horizon) };
      const predResp = await requestPredict(payload);
      onPrediction(predResp.data);
      setMessage({ type: 'success', text: 'Prediction complete.' });
    } catch (e) {
      setMessage({ type: 'error', text: e?.message || 'Upload or prediction failed.' });
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragOver(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) setFile(f);
  };
  const onBrowse = () => fileInputRef.current?.click();

  return (
    <form className="form" onSubmit={(e)=>{e.preventDefault(); handleUpload();}}>
      <div className="row">
        <label className="muted">CSV File</label>
        <div
          className={`dropzone ${dragOver ? 'dragover' : ''}`}
          onDragOver={(e)=>{e.preventDefault(); setDragOver(true);}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={onDrop}
          onClick={onBrowse}
        >
          <div>
            <div style={{fontWeight:600, marginBottom:6}}>Drag & drop your CSV here</div>
            <div className="hint">or click to browse</div>
            {file && (
              <div style={{marginTop:10}} className="badge">{file.name}</div>
            )}
          </div>
          <input ref={fileInputRef} style={{display:'none'}} type="file" accept=".csv" onChange={handleFile} />
        </div>
      </div>
      <div className="row two">
        <div>
          <label className="muted">Product</label>
          <input className="input" value={product} onChange={e=>setProduct(e.target.value)} placeholder="e.g. Soap" />
        </div>
        <div>
          <label className="muted">Horizon (months)</label>
          <input className="input" type="number" value={horizon} min="1" max="24" onChange={e=>setHorizon(e.target.value)} />
        </div>
      </div>
      {message && (
        <div className={`toast ${message.type}`}>
          {message.text}
        </div>
      )}
      <div style={{display:'flex', gap:10, alignItems:'center'}}>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? (<><span className="spinner"/> Predicting...</>) : 'Upload & Predict'}
        </button>
        {loading && <span className="muted">This may take a few seconds…</span>}
      </div>
    </form>
  );
}
