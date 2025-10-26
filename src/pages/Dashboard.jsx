import { useState } from "react";
import ZoneForm from "../components/ZoneForm";
import ZoneList from "../components/ZoneList";
import AllocationResult from "../components/AllocationResult";
import { allocate } from "../utils/allocate";

export default function Dashboard() {
  const [zones, setZones] = useState([]);
  const [available, setAvailable] = useState("");
  const [result, setResult] = useState(null);
  const [remaining, setRemaining] = useState(0);

  const handleAddZone = (zone) => setZones([...zones, zone]);
  const handleRemoveZone = (index) => setZones(zones.filter((_, i) => i !== index));

  const handleAllocate = () => {
    if (zones.length === 0) return alert("Add at least one zone first.");

    const allocResult = allocate(zones, Number(available));
    if (!allocResult) {
      alert("❌ Not possible to allocate resources while satisfying minimum requirements.");
      setResult(null);
    } else {
      const rem = available - allocResult.reduce((s, z) => s + z.alloted_qty, 0);
      setResult(allocResult);
      setRemaining(rem);
    }

    // ✅ Clear form fields after allocation
    setAvailable("");
    setZones([]);
  };

  return (
    <div className="dashboard">
      <h2>🔸 Available Resources</h2>

      <label htmlFor="available-input">Enter total available resource:</label>
      <input
        id="available-input"
        type="number"
        min="0"
        value={available}
        onChange={(e) => setAvailable(e.target.value)}
        placeholder="Enter total available food (kg)"
      />

      <ZoneForm onAddZone={handleAddZone} />
      <ZoneList zones={zones} onRemove={handleRemoveZone} />

      <button className="allocate-btn" onClick={handleAllocate}>
        🚀 Allocate Resources
      </button>

      <AllocationResult result={result} remaining={remaining} />
    </div>
  );
}
