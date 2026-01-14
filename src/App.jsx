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
        if (e?.message === "UNAUTHORIZED") setStatus("loggedOut");
        else {
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
        window.location.href = "http://127.0.0.1:8080/logout";
      }}
    />
  );
}
