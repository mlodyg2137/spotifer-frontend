import { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { apiMe } from "./api.js";

export default function App() {
  const [status, setStatus] = useState("loading"); // loading | loggedOut | loggedIn
  const [me, setMe] = useState(null);

  useEffect(() => {
    apiMe()
      .then((data) => {
        setMe(data);
        setStatus("loggedIn");
      })
      .catch((e) => {
        // 401/403 = niezalogowany -> pokaż ekran logowania
        if (e?.message === "UNAUTHORIZED") {
          setStatus("loggedOut");
        } else {
          // też pokaż logowanie, ale możesz wyświetlić błąd w konsoli
          console.error(e);
          setStatus("loggedOut");
        }
      });
  }, []);

  if (status === "loading") return <div style={{ padding: 24 }}>Loading...</div>;
  if (status === "loggedOut") return <LoginScreen />;

  return (
    <Dashboard
      me={me}
      onLogout={() => {
        // UWAGA: jeśli backend ma endpoint logout, lepiej go uderzyć.
        // Na szybko: czyścimy cookies przez wejście na backendowy /logout (jeśli masz)
        window.location.href = "http://localhost:8080/logout";
      }}
    />
  );
}
