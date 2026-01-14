import { startSpotifyLogin } from "../api.js";

export default function LoginScreen() {
  return (
    <div style={{ padding: 24, maxWidth: 640, margin: "60px auto", fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 8 }}>Spotifer</h1>
      <p style={{ opacity: 0.75, marginTop: 0 }}>
        Zaloguj się przez Spotify, żeby zobaczyć statystyki.
      </p>

      <button
        onClick={startSpotifyLogin}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          cursor: "pointer",
          border: "1px solid #ccc",
          background: "white",
          fontWeight: 600,
        }}
      >
        Login with Spotify
      </button>
    </div>
  );
}
