import { startSpotifyLogin } from "../api.js";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  
  const { t } = useTranslation();

  return (
    <div style={{ padding: 24, maxWidth: 640, margin: "60px auto", fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 8 }}>Spotifer</h1>
      <p style={{ opacity: 0.75, marginTop: 0 }}>
        {t("menu.loginScreenText")}
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
          color: "black"
        }}
      >
        Login with Spotify
      </button>
    </div>
  );
}
