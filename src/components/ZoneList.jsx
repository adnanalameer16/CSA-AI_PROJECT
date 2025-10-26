export default function ZoneList({ zones, onRemove }) {
  if (zones.length === 0)
    return <p className="info">No zones added yet. Add zones above.</p>;

  return (
    <div className="zone-list">
      <h2>📋 Current Zones</h2>
      {zones.map((z, i) => (
        <div className="zone-card" key={i}>
          <span>Zone: {z.zone}</span>
          <span>Req Qty: {z.req_qty}</span>
          <span>Min Qty: {z.min_qty}</span>
          <span>Alloted: {z.alloted_qty}</span>
          <button onClick={() => onRemove(i)}>❌ Remove</button>
        </div>
      ))}
    </div>
  );
}
