import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "en" | "th";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (savedLanguage === "en" || savedLanguage === "th") {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "th" ? "th" : "en";
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: Language) => setLanguageState(nextLanguage),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
