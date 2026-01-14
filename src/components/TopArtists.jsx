import { useEffect, useState } from "react";
import { apiTopArtists } from "../api.js";

export default function TopArtists({ limit, timeRange, forceRefresh, refreshKey }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);

    apiTopArtists({ limit, time_range: timeRange, offset: 0, forceRefresh })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => setErr(String(e.message ?? e)))
      .finally(() => setLoading(false));
  }, [limit, timeRange, forceRefresh, refreshKey]);

  return (
    <Card title="Top Artists">
      {loading && <div>Loading...</div>}
      {err && <div style={{ opacity: 0.8 }}>Błąd: {err}</div>}

      {!loading && !err && (
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((a) => (
            <ArtistRow key={`${a.rank}-${a.name}`} a={a} />
          ))}
        </div>
      )}
    </Card>
  );
}

function ArtistRow({ a }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 10,
      }}
    >
      <div style={{ width: 28, textAlign: "center", fontWeight: 700, opacity: 0.7 }}>
        {a.rank}
      </div>

      <img
        src={a.artistImageUrl}
        alt={a.name}
        width={52}
        height={52}
        style={{ borderRadius: 999, objectFit: "cover", flex: "0 0 auto" }}
        loading="lazy"
      />

      <div style={{ minWidth: 0, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {a.name}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <section style={{ border: "1px solid #e5e5e5", borderRadius: 12, padding: 12 }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {children}
    </section>
  );
}
