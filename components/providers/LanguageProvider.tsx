"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";

type LanguageContextType = {
  currentLocale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState({});
  const [currentLocale, setCurrentLocale] = useState("en");

  useEffect(() => {
    // Load initial locale from localStorage or default to 'en'
    const savedLocale = localStorage.getItem("locale") || "en";
    setCurrentLocale(savedLocale);

    // Load messages for the current locale
    import(`../../messages/${savedLocale}.json`)
      .then((messages) => {
        setMessages(messages);
      })
      .catch((error) => {
        console.error("Error loading messages:", error);
        // Fallback to English if there's an error
        import("../../messages/en.json").then((messages) => {
          setMessages(messages);
        });
      });
  }, []);

  const setLocale = (newLocale: string) => {
    localStorage.setItem("locale", newLocale);
    setCurrentLocale(newLocale);

    // Load messages for the new locale
    import(`../../messages/${newLocale}.json`)
      .then((messages) => {
        setMessages(messages);
      })
      .catch((error) => {
        console.error("Error loading messages:", error);
      });
  };

  return (
    <LanguageContext.Provider value={{ currentLocale, setLocale }}>
      <NextIntlClientProvider messages={messages} locale={currentLocale}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};
