import { useState } from "react";
import { useApp } from "@/App/Context/AppContext";
import styles from "./Settings.module.scss";

const Settings = () => {
  const { language, setLanguage, theme, setTheme, translate } = useApp();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
    setIsThemeOpen(false);
  };

  const toggleThemeDropdown = () => {
    setIsThemeOpen(!isThemeOpen);
    setIsLanguageOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  const themes = [
    { code: 'light', name: translate('light') },
    { code: 'dark', name: translate('dark') },
    { code: 'blue', name: translate('blue') }
  ];

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.dropdown}>
        <button 
          className={styles.dropdownButton}
          onClick={toggleLanguageDropdown}
        >
          <span>{translate('language')}: {languages.find(l => l.code === language)?.name}</span>
          <span className={styles.dropdownArrow}>▼</span>
        </button>
        {isLanguageOpen && (
          <div className={styles.dropdownContent}>
            {languages.map((lang) => (
              <button 
                key={lang.code}
                className={`${styles.dropdownItem} ${language === lang.code ? styles.active : ''}`}
                onClick={() => {
                  setLanguage(lang.code as any);
                  setIsLanguageOpen(false);
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.dropdown}>
        <button 
          className={styles.dropdownButton}
          onClick={toggleThemeDropdown}
        >
          <span>{translate('theme')}: {translate(theme)}</span>
          <span className={styles.dropdownArrow}>▼</span>
        </button>
        {isThemeOpen && (
          <div className={styles.dropdownContent}>
            {themes.map((t) => (
              <button 
                key={t.code}
                className={`${styles.dropdownItem} ${theme === t.code ? styles.active : ''}`}
                onClick={() => {
                  setTheme(t.code as any);
                  setIsThemeOpen(false);
                }}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 