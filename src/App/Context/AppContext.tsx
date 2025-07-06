import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de';
type Theme = 'light' | 'dark' | 'blue';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  translate: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    goals: 'Goals',
    reports: 'Reports',
    tests: 'Tests',
    biologicalAge: 'Biological age',
    chronologicalAge: 'Chronological age',
    years: 'yrs',
    totalHealth: 'Total Health',
    keyAreasOfConcern: 'Key Areas of Concern',
    showAll: 'Show all',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    blue: 'Blue'
  },
  es: {
    dashboard: 'Tablero',
    goals: 'Metas',
    reports: 'Informes',
    tests: 'Pruebas',
    biologicalAge: 'Edad biológica',
    chronologicalAge: 'Edad cronológica',
    years: 'años',
    totalHealth: 'Salud Total',
    keyAreasOfConcern: 'Áreas clave de preocupación',
    showAll: 'Mostrar todo',
    high: 'Alto',
    medium: 'Medio',
    low: 'Bajo',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    blue: 'Azul'
  },
  fr: {
    dashboard: 'Tableau de bord',
    goals: 'Objectifs',
    reports: 'Rapports',
    tests: 'Tests',
    biologicalAge: 'Âge biologique',
    chronologicalAge: 'Âge chronologique',
    years: 'ans',
    totalHealth: 'Santé Totale',
    keyAreasOfConcern: 'Principaux domaines de préoccupation',
    showAll: 'Afficher tout',
    high: 'Élevé',
    medium: 'Moyen',
    low: 'Faible',
    language: 'Langue',
    theme: 'Thème',
    light: 'Clair',
    dark: 'Sombre',
    blue: 'Bleu'
  },
  de: {
    dashboard: 'Dashboard',
    goals: 'Ziele',
    reports: 'Berichte',
    tests: 'Tests',
    biologicalAge: 'Biologisches Alter',
    chronologicalAge: 'Chronologisches Alter',
    years: 'Jahre',
    totalHealth: 'Gesamtgesundheit',
    keyAreasOfConcern: 'Wichtige Problembereiche',
    showAll: 'Alle anzeigen',
    high: 'Hoch',
    medium: 'Mittel',
    low: 'Niedrig',
    language: 'Sprache',
    theme: 'Thema',
    light: 'Hell',
    dark: 'Dunkel',
    blue: 'Blau'
  }
};

// Create the context with default values
const AppContext = createContext<AppContextType>({
  language: 'en',
  setLanguage: () => {},
  theme: 'light',
  setTheme: () => {},
  translate: () => ''
});

// Create a provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('light');

  // Apply theme when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  // Set language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  // Set theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  // Initialize from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language') as Language;
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    
    if (savedLanguage && ['en', 'es', 'fr', 'de'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
    
    if (savedTheme && ['light', 'dark', 'blue'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  // Translation function
  const translate = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, translate }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => useContext(AppContext); 