export function allocate(zones, totalAvailable) {
  const minRequiredTotal = zones.reduce((sum, z) => sum + z.min_qty, 0);
  if (totalAvailable < minRequiredTotal) return null;

  const allocations = new Array(zones.length).fill(0);

  function backtrack(index, remaining) {
    if (index === zones.length) return remaining >= 0 ? [...allocations] : null;

    const { min_qty, req_qty } = zones[index];

    for (let alloc = req_qty; alloc >= min_qty; alloc--) {
      if (alloc <= remaining) {
        allocations[index] = alloc;
        const result = backtrack(index + 1, remaining - alloc);
        if (result) return result;
        allocations[index] = 0;
      }
    }

    return null;
  }

  const result = backtrack(0, totalAvailable);
  if (!result) return null;

  return zones.map((z, i) => ({ ...z, alloted_qty: result[i] }));
}
