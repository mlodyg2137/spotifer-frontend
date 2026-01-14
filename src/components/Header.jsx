export default function Header({ me, onLogout }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <div>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <div style={{ opacity: 0.75 }}>
          {me ? `Zalogowany jako: ${me.displayName ?? me.email ?? me.id ?? "user"}` : ""}
        </div>
      </div>

      <button
        onClick={onLogout}
        style={{ padding: "8px 12px", borderRadius: 10, cursor: "pointer", border: "1px solid #ccc" }}
      >
        Wyloguj
      </button>
    </header>
  );
}
