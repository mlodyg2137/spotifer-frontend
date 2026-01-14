import { useEffect, useState } from "react";
import { apiTopTracks } from "../api.js";

export default function TopTracks({ limit, timeRange, forceRefresh, refreshKey }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);

    apiTopTracks({ limit, time_range: timeRange, offset: 0, forceRefresh })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => setErr(String(e.message ?? e)))
      .finally(() => setLoading(false));
  }, [limit, timeRange, forceRefresh, refreshKey]);

  return (
    <Card title="Top Tracks">
      {loading && <div>Loading...</div>}
      {err && <div style={{ opacity: 0.8 }}>Błąd: {err}</div>}

      {!loading && !err && (
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((t) => (
            <TrackRow key={`${t.rank}-${t.trackName}`} t={t} />
          ))}
        </div>
      )}
    </Card>
  );
}

function TrackRow({ t }) {
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
        {t.rank}
      </div>

      <img
        src={t.albumImageUrl}
        alt={t.albumName ?? "album"}
        width={52}
        height={52}
        style={{ borderRadius: 10, objectFit: "cover", flex: "0 0 auto" }}
        loading="lazy"
      />

      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {t.trackName}
        </div>

        <div style={{ opacity: 0.75, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {(t.artistNames ?? []).join(", ")} • {t.albumName}
        </div>
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
