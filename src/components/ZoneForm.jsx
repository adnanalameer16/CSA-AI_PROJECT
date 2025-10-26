import { useState } from "react";

export default function ZoneForm({ onAddZone }) {
  const [zoneName, setZoneName] = useState("");
  const [requiredQty, setRequiredQty] = useState("");
  const [minQty, setMinQty] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!zoneName) return alert("Please enter a zone name.");
    if (requiredQty === "" || minQty === "")
      return alert("Please enter both quantities.");

    onAddZone({
      zone: zoneName.toUpperCase(),
      req_qty: Number(requiredQty),
      min_qty: Number(minQty),
      alloted_qty: 0,
    });

    // clear form
    setZoneName("");
    setRequiredQty("");
    setMinQty("");
  };

  return (
    <form className="zone-form" onSubmit={handleSubmit}>
      <h2>➕ Add Zone</h2>

      <div className="form-row">
        <div className="input-group">
          <label>Zone Name</label>
          <input
            type="text"
            placeholder="e.g., A"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Enter Required Quantity (kg)</label>
          <input
            type="number"
            min="0"
            value={requiredQty}
            onChange={(e) => setRequiredQty(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Enter Minimum Quantity (kg)</label>
          <input
            type="number"
            min="0"
            value={minQty}
            onChange={(e) => setMinQty(e.target.value)}
          />
        </div>

        <button type="submit">Add Zone</button>
      </div>
    </form>
  );
}
