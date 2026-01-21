import { useEffect, useState } from "react";
import { apiTopArtists } from "../api.js";
import { useTranslation } from "react-i18next";

export default function TopArtists({ limit, timeRange, forceRefresh, refreshKey }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    setErr(null);

    apiTopArtists({ limit, time_range: timeRange, offset: 0, forceRefresh })
      .then((data) => setItems(Array.isArray(data) ? data.sort((a, b) => b.popularity - a.popularity) : []))
      .catch((e) => setErr(String(e.message ?? e)))
      .finally(() => setLoading(false));
  }, [limit, timeRange, forceRefresh, refreshKey]);

  return (
    <Card title={t("menu.topTracks")}>
      {loading && <div>{t("common.loading")}</div>}
      {err && <div style={{ opacity: 0.8 }}>{t("errors.error")}: {err}</div>}

      {!loading && !err && (
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((a) => (
            <ArtistRow key={`${a.popularity}-${a.name}`} a={a} />
          ))}
        </div>
      )}
    </Card>
  );
}

function ArtistRow({ a }) {
  const fallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52">
        <rect width="100%" height="100%" fill="#2a2a2a"/>
        <text x="50%" y="55%" text-anchor="middle" fill="#bbb" font-size="18" font-family="Arial" font-weight="700">
          ${a.name?.[0]?.toUpperCase() ?? "?"}
        </text>
      </svg>
    `);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", border: "1px solid #eee", borderRadius: 12, padding: 10 }}>
      <div style={{ width: 28, textAlign: "center", fontWeight: 700, opacity: 0.7 }}>{a.popularity}</div>

      <img
        src={a.artistImageUrl || fallback}
        alt={a.name}
        width={52}
        height={52}
        loading="lazy"
        referrerPolicy="no-referrer"
        style={{ borderRadius: 999, objectFit: "cover", flex: "0 0 auto" }}
        onError={(e) => {
          e.currentTarget.src = fallback; // gdy URL padnie, ustaw placeholder
        }}
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
