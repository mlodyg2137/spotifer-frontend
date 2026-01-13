import { useEffect, useState } from "react";
import { apiTopTracks, apiTopArtists, apiRecentlyPlayed } from "../api.js";

export default function Dashboard({ me, onLogout }) {
  const [limit, setLimit] = useState(20);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [forceRefresh, setForceRefresh] = useState(false);

  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recent, setRecent] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tracks, artists, rec] = await Promise.all([
        apiTopTracks({ limit, time_range: timeRange, offset: 0, forceRefresh }),
        apiTopArtists({ limit, time_range: timeRange, offset: 0, forceRefresh }),
        apiRecentlyPlayed({ limit, forceRefresh }),
      ]);
      setTopTracks(tracks);
      setTopArtists(artists);
      setRecent(rec);
    } catch (e) {
      setError(String(e.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto", fontFamily: "system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ marginBottom: 6 }}>Dashboard</h1>
          <div style={{ opacity: 0.75 }}>
            {me ? `Zalogowany jako: ${me.displayName ?? me.email ?? me.id ?? "user"}` : ""}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onLogout}
            style={{ padding: "8px 12px", borderRadius: 10, cursor: "pointer", border: "1px solid #ccc" }}
          >
            Wyloguj
          </button>
        </div>
      </header>

      {/* Controls */}
      <section style={{ marginTop: 18, padding: 12, border: "1px solid #e5e5e5", borderRadius: 12 }}>
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
            <input
              type="checkbox"
              checked={forceRefresh}
              onChange={(e) => setForceRefresh(e.target.checked)}
            />
            forceRefresh
          </label>

          <button
            onClick={load}
            style={{ padding: "8px 12px", borderRadius: 10, cursor: "pointer", border: "1px solid #ccc" }}
            disabled={loading}
          >
            {loading ? "Ładowanie..." : "Odśwież"}
          </button>
        </div>

        {error && (
          <div style={{ marginTop: 10, padding: 10, borderRadius: 10, border: "1px solid #ffcccc" }}>
            Błąd: {error}
          </div>
        )}
      </section>

      {/* Content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
        <Card title="Top Tracks">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ol>
              {topTracks?.map((t, idx) => (
                <li key={t.id ?? `${t.name}-${idx}`}>
                  {t.name} — {t.artistName ?? t.artist ?? t.artists?.[0]?.name ?? ""}
                </li>
              ))}
            </ol>
          )}
        </Card>

        <Card title="Top Artists">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ol>
              {topArtists?.map((a, idx) => (
                <li key={a.id ?? `${a.name}-${idx}`}>{a.name}</li>
              ))}
            </ol>
          )}
        </Card>

        <div style={{ gridColumn: "1 / -1" }}>
          <Card title="Recently Played">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ol>
                {recent?.map((r, idx) => (
                  <li key={r.playedAt ?? `${r.trackName}-${idx}`}>
                    {r.trackName ?? r.name ?? ""} — {r.artistName ?? r.artist ?? ""}
                    {r.playedAt ? ` (${r.playedAt})` : ""}
                  </li>
                ))}
              </ol>
            )}
          </Card>
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
