"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "~/translations";

type Language = "de" | "en" | "fa" | "hi" | "te";

export type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Default to English with auto-detection on first load
    const [language, setLanguageState] = useState<Language>("en");

    // Auto-detect language from browser and geolocation on initial load
    useEffect(() => {
        const savedLanguage = localStorage.getItem("gitgud-language");

        if (savedLanguage === "en" || savedLanguage === "de" || savedLanguage === "fa" || savedLanguage === "hi") {
            // Use saved language preference
            setLanguageState(savedLanguage as Language);
        } else {
            // Auto-detect from browser locale and geolocation
            const browserLanguage = navigator.language || navigator.languages?.[0] || "en";
            const detectedLanguage = browserLanguage.toLowerCase();

            // Try to detect language from browser locale first
            let detectedLang: Language = "en"; // Default to English

            if (detectedLanguage.startsWith("de")) {
                detectedLang = "de";
            } else if (detectedLanguage.startsWith("fa") || detectedLanguage.startsWith("per")) {
                detectedLang = "fa";
            } else if (detectedLanguage.startsWith("hi")) {
                detectedLang = "hi";
            } else {
                // Try geolocation-based detection using timezone
                try {
                    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                    // Map timezones to countries and then to languages
                    // Iran, Afghanistan, Tajikistan -> Persian
                    if (timezone.includes("Tehran") || timezone.includes("Kabul") || timezone.includes("Dushanbe")) {
                        detectedLang = "fa";
                    }
                    // India -> Hindi
                    else if (
                        timezone.includes("Kolkata") ||
                        timezone.includes("Mumbai") ||
                        timezone.includes("Delhi") ||
                        timezone.includes("Asia/Kolkata") ||
                        timezone.includes("Asia/Calcutta")
                    ) {
                        detectedLang = "hi";
                    }
                    // Germany, Austria, Switzerland -> German
                    else if (
                        timezone.includes("Berlin") ||
                        timezone.includes("Vienna") ||
                        timezone.includes("Zurich")
                    ) {
                        detectedLang = "de";
                    }
                } catch (e) {
                    // If geolocation fails, fall back to browser language detection
                }
            }

            setLanguageState(detectedLang);
            localStorage.setItem("gitgud-language", detectedLang);
        }
    }, []);

    // Save language to localStorage when it changes
    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("gitgud-language", lang);
    };

    // Translation function
    const t = (key: string): string => {
        const langTranslations = translations[language];
        if (!langTranslations || !langTranslations[key as keyof typeof langTranslations]) {
            // If translation not found, try to find it in English as fallback
            if (language !== "en" && translations.en[key as keyof typeof translations.en]) {
                return translations.en[key as keyof typeof translations.en];
            }
            // Return the key itself if no translation found
            return key;
        }
        return langTranslations[key as keyof typeof langTranslations];
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
