import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ me, onLogout }) {

  const { t } = useTranslation();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div>
        <h1 style={{ margin: 0 }}>Spotifer</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Avatar */}
        {me?.avatarUrl ? (
          <img
            src={me.avatarUrl}
            alt="avatar"
            width={40}
            height={40}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {me?.displayName?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}

        {/* Nazwa */}
        <div style={{ fontWeight: 600 }}>
          {me?.displayName ?? me?.email ?? "User"}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            cursor: "pointer",
            border: "1px solid #ccc",
          }}
        >
          {t("header.logout")}
        </button>
      </div>

      <LanguageSwitcher />

    </header>
  );
}
