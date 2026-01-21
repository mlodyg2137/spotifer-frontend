import { useEffect, useState } from "react";
import { apiRecentlyPlayed } from "../api.js";
import { useTranslation } from "react-i18next";

import { formatDistanceToNow } from 'date-fns';
import { enUS, pl } from 'date-fns/locale';

export default function RecentlyPlayed({ limit, forceRefresh, refreshKey }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    setErr(null);

    apiRecentlyPlayed({ limit, forceRefresh })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => setErr(String(e.message ?? e)))
      .finally(() => setLoading(false));
  }, [limit, forceRefresh, refreshKey]);

  return (
    <Card title={t("menu.recentlyPlayed")}>
      {loading && <div>Loading...</div>}
      {err && <div style={{ opacity: 0.8 }}>Błąd: {err}</div>}

      {!loading && !err && (
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((r) => (
            <RecentRow key={`${r.playedAt}-${r.trackName}`} r={r} />
          ))}
        </div>
      )}
    </Card>
  );
}

function RecentRow({ r }) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'pl' ? pl : enUS;

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
      <img
        src={r.albumImageUrl}
        alt={r.albumName ?? "album"}
        width={52}
        height={52}
        style={{ borderRadius: 10, objectFit: "cover", flex: "0 0 auto" }}
        loading="lazy"
      />

      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {r.trackName}
        </div>

        <div style={{ opacity: 0.75, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {(r.artistNames ?? []).join(", ")} • {r.albumName}
          {r.playedAt ? ` • ${formatDistanceToNow(new Date(r.playedAt), { addSuffix: true, locale })}` : ""}
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
