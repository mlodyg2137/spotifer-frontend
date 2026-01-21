import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button onClick={() => setLang("pl")} disabled={i18n.language === "pl"}>
        PL
      </button>
      <button onClick={() => setLang("en")} disabled={i18n.language === "en"}>
        EN
      </button>
    </div>
  );
}
