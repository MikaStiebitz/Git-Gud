"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "~/translations";

type Language = "de" | "en";

export type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Change default language from "de" to "en"
    const [language, setLanguageState] = useState<Language>("en");

    // Load language from localStorage on initial render
    useEffect(() => {
        const savedLanguage = localStorage.getItem("gitgud-language");
        if (savedLanguage === "en" || savedLanguage === "de") {
            setLanguageState(savedLanguage);
        }
    }, []);

    // Save language to localStorage when it changes
    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("gitgud-language", lang);
    };

    // Translation function
    const t = (key: string): string => {
        if (!translations[language][key as keyof (typeof translations)[typeof language]]) {
            // If translation not found, try to find it in English as fallback
            if (language !== "en" && translations.en[key as keyof typeof translations.en]) {
                return translations.en[key as keyof typeof translations.en];
            }
            // Return the key itself if no translation found
            return key;
        }
        return translations[language][key as keyof (typeof translations)[typeof language]];
    };

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
