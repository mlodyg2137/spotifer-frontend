export default function Controls({
  limit,
  setLimit,
  timeRange,
  setTimeRange,
  forceRefresh,
  setForceRefresh,
  refreshAll,
}) {
  return (
    <section style={{ padding: 12, border: "1px solid #e5e5e5", borderRadius: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <label>
          Limit:&nbsp;
          <input
            type="number"
            value={limit}
            min={1}
            max={50}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{ width: 80, padding: 6 }}
          />
        </label>

        <label>
          Time range:&nbsp;
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ padding: 6 }}>
            <option value="short_term">short_term</option>
            <option value="medium_term">medium_term</option>
            <option value="long_term">long_term</option>
          </select>
        </label>

        <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={forceRefresh} onChange={(e) => setForceRefresh(e.target.checked)} />
          forceRefresh
        </label>

        <button
          onClick={refreshAll}
          style={{ padding: "8px 12px", borderRadius: 10, cursor: "pointer", border: "1px solid #ccc" }}
        >
          Odśwież wszystko
        </button>
      </div>
    </section>
  );
}
