import { useState } from "react";
import Header from "./Header.jsx";
import Controls from "./Controls.jsx";
import TopTracks from "./TopTracks.jsx";
import TopArtists from "./TopArtists.jsx";
import RecentlyPlayed from "./RecentlyPlayed.jsx";

export default function Dashboard({ me, onLogout }) {
  const [limit, setLimit] = useState(20);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [forceRefresh, setForceRefresh] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div style={{ padding: 24, margin: "0 auto", width: "90vw", fontFamily: "system-ui" }}>
      <Header me={me} onLogout={onLogout} />

      <div style={{ marginTop: 16 }}>
        <Controls
          limit={limit}
          setLimit={setLimit}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          forceRefresh={forceRefresh}
          setForceRefresh={setForceRefresh}
          refreshAll={() => setRefreshKey((k) => k + 1)}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <TopTracks limit={limit} timeRange={timeRange} forceRefresh={forceRefresh} refreshKey={refreshKey} />
        <TopArtists limit={limit} timeRange={timeRange} forceRefresh={forceRefresh} refreshKey={refreshKey} />

        <div style={{ gridColumn: "1 / -1" }}>
          <RecentlyPlayed limit={limit} forceRefresh={forceRefresh} refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}