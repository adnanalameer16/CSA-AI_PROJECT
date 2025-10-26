export default function AllocationResult({ result, remaining }) {
  if (!result) return null;

  return (
    <div className="allocation-result">
      <h2>✅ Successful Allocation</h2>
      <table>
        <thead>
          <tr>
            <th>Zone</th>
            <th>Required</th>
            <th>Minimum</th>
            <th>Alloted</th>
          </tr>
        </thead>
        <tbody>
          {result.map((r, i) => (
            <tr key={i}>
              <td>{r.zone}</td>
              <td>{r.req_qty}</td>
              <td>{r.min_qty}</td>
              <td>{r.alloted_qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><b>Remaining Food (kg):</b> {remaining}</p>
    </div>
  );
}
