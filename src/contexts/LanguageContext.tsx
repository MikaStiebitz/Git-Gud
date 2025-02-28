"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "de" | "en";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const translations = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.terminal": "Terminal",
        "nav.playground": "Playground",
        "nav.startLearning": "Start Learning",
        "nav.language": "Language",

        // Home Page
        "home.title": "Master Git Through Play",
        "home.subtitle":
            "Learn Git commands and concepts through an interactive game. Progress through levels, complete challenges, and become a Git expert.",
        "home.startLearning": "Start Learning",
        "home.cheatSheet": "Cheat Sheet",
        "home.learningPath": "Your Learning Path",
        "home.chooseChallenge": "Choose Your Challenge",
        "home.completed": "completed",
        "home.reviewLevel": "Review Level",
        "home.startLevel": "Start Level",
        "home.locked": "Locked",

        // Level Page
        "level.gitTerminal": "Git Terminal",
        "level.currentChallenge": "Current Challenge",
        "level.objectives": "Objectives:",
        "level.showHints": "Show Hints",
        "level.hideHints": "Hide Hints",
        "level.nextLevel": "Next Level",
        "level.filesToEdit": "Files to Edit:",
        "level.workingTreeClean": "Working tree clean",
        "level.staged": "staged",
        "level.modified": "modified",
        "level.untracked": "untracked",
        "level.gitNotInitialized": "Git is not initialized yet",
        "level.branch": "Branch:",
        "level.gitStatus": "Git Status",
        "level.advancedOptions": "Advanced Options",
        "level.hideAdvancedOptions": "Hide Advanced Options",
        "level.resetLevel": "Reset Level",
        "level.resetAllProgress": "Reset All Progress",
        "level.resetConfirm": "Are you sure you want to reset all your progress?",
        "level.level": "Level",
        "level.levelCompleted": "Level completed!",
        "level.realWorldContext": "Real-World Context",
        "level.task": "Your Task",
        "level.startCoding": "Start Coding",
        "level.storyButton": "Show Story",
        "level.advancedModeOn": "Advanced Mode (On)",
        "level.advancedModeOff": "Advanced Mode (Off)",
        "level.notFound": "Level not found",

        // Playground
        "playground.title": "Git Playground",
        "playground.subtitle": "Freely experiment with Git commands and learn from the cheat sheet",
        "playground.gitTerminal": "Git Terminal (Free Mode)",
        "playground.gitCheatSheet": "Git Cheat Sheet",
        "playground.searchCommands": "Search Git commands...",
        "playground.usage": "Usage:",
        "playground.example": "Example:",
        "playground.explanation": "Explanation:",
        "playground.noCommands": "No commands found for",
        "playground.resetSearch": "Reset Search",

        // Command Categories
        "category.basics": "Basics",
        "category.branches": "Branches",
        "category.remoteRepos": "Remote Repositories",
        "category.advanced": "Advanced Commands",

        // File Editor
        "editor.fileContent": "File Content",
        "editor.unsaved": "Unsaved",
        "editor.cancel": "Cancel",
        "editor.save": "Save",
        "editor.escToCancel": "Press ESC to cancel, CTRL+Enter to save",
        "editor.unsavedChanges": "You have unsaved changes. Do you really want to cancel?",

        // Progress
        "progress.beginner": "Beginner",
        "progress.intermediate": "Intermediate",
        "progress.expert": "Expert",
        "progress.gitMaster": "Git Master",
        "progress.points": "points",

        // Terminal
        "terminal.welcome": "Welcome to the Git Terminal Simulator!",
        "terminal.levelStarted": "Level {level} of {stage} started. Type 'help' for help.",
        "terminal.playgroundMode":
            "Playground mode activated. Freely experiment with Git commands. Type 'help' for help.",
        "terminal.levelCompleted": "Level completed! 🎉 Type 'next' or click the \"Next Level\" button.",
        "terminal.enterCommand": "Enter a command...",
        "terminal.typeNext": "Type 'next' or click the \"Next Level\" button to continue.",
        "terminal.fileSaved": "File saved: {path}",
        "terminal.fileRemoved": "File removed: {path}",
        "terminal.levelReset": "Level reset.",
        "terminal.progressReset": "Progress reset.",
        "terminal.allLevelsCompleted": "Congratulations! You have completed all available levels!",
    },
    de: {
        // Navigation
        "nav.home": "Home",
        "nav.terminal": "Terminal",
        "nav.playground": "Playground",
        "nav.startLearning": "Starte Lernen",
        "nav.language": "Sprache",

        // Home Page
        "home.title": "Meistere Git durch Spielen",
        "home.subtitle":
            "Lerne Git-Befehle und Konzepte durch ein interaktives Spiel. Schreite durch Level fort, löse Herausforderungen und werde ein Git-Experte.",
        "home.startLearning": "Starte Lernen",
        "home.cheatSheet": "Spickzettel",
        "home.learningPath": "Dein Lernpfad",
        "home.chooseChallenge": "Wähle deine Herausforderung",
        "home.completed": "abgeschlossen",
        "home.reviewLevel": "Level wiederholen",
        "home.startLevel": "Level starten",
        "home.locked": "Gesperrt",

        // Level Page
        "level.gitTerminal": "Git Terminal",
        "level.currentChallenge": "Aktuelle Herausforderung",
        "level.objectives": "Ziele:",
        "level.showHints": "Hinweise anzeigen",
        "level.hideHints": "Hinweise ausblenden",
        "level.nextLevel": "Nächstes Level",
        "level.filesToEdit": "Dateien zum Bearbeiten:",
        "level.workingTreeClean": "Working tree clean",
        "level.staged": "staged",
        "level.modified": "modified",
        "level.untracked": "untracked",
        "level.gitNotInitialized": "Git ist noch nicht initialisiert",
        "level.branch": "Branch:",
        "level.gitStatus": "Git Status",
        "level.advancedOptions": "Erweiterte Optionen anzeigen",
        "level.hideAdvancedOptions": "Erweiterte Optionen ausblenden",
        "level.resetLevel": "Level zurücksetzen",
        "level.resetAllProgress": "Gesamten Fortschritt zurücksetzen",
        "level.resetConfirm": "Möchtest du wirklich deinen gesamten Fortschritt zurücksetzen?",
        "level.level": "Level",
        "level.levelCompleted": "Level abgeschlossen!",
        "level.realWorldContext": "Kontext in der echten Welt",
        "level.task": "Deine Aufgabe",
        "level.startCoding": "Mit dem Coding beginnen",
        "level.storyButton": "Story anzeigen",
        "level.advancedModeOn": "Fortgeschrittenen-Modus (An)",
        "level.advancedModeOff": "Fortgeschrittenen-Modus (Aus)",
        "level.notFound": "Level nicht gefunden",

        // Playground
        "playground.title": "Git Playground",
        "playground.subtitle": "Experimentiere frei mit Git-Befehlen und lerne aus dem Spickzettel",
        "playground.gitTerminal": "Git Terminal (Freier Modus)",
        "playground.gitCheatSheet": "Git Spickzettel",
        "playground.searchCommands": "Suche nach Git-Befehlen...",
        "playground.usage": "Verwendung:",
        "playground.example": "Beispiel:",
        "playground.explanation": "Erklärung:",
        "playground.noCommands": "Keine Befehle gefunden für",
        "playground.resetSearch": "Suche zurücksetzen",

        // Command Categories
        "category.basics": "Grundlagen",
        "category.branches": "Branches",
        "category.remoteRepos": "Remote-Repositories",
        "category.advanced": "Fortgeschrittene Befehle",

        // File Editor
        "editor.fileContent": "Dateiinhalt",
        "editor.unsaved": "Ungespeichert",
        "editor.cancel": "Abbrechen",
        "editor.save": "Speichern",
        "editor.escToCancel": "Drücke ESC zum Abbrechen, CTRL+Enter zum Speichern",
        "editor.unsavedChanges": "Du hast ungespeicherte Änderungen. Möchtest du wirklich abbrechen?",

        // Progress
        "progress.beginner": "Anfänger",
        "progress.intermediate": "Fortgeschritten",
        "progress.expert": "Experte",
        "progress.gitMaster": "Git Master",
        "progress.points": "Punkte",

        // Terminal
        "terminal.welcome": "Willkommen im Git Terminal Simulator!",
        "terminal.levelStarted": "Level {level} von {stage} gestartet. Gib 'help' ein für Hilfe.",
        "terminal.playgroundMode":
            "Playground-Modus aktiviert. Experimentiere frei mit Git-Befehlen. Gib 'help' ein für Hilfe.",
        "terminal.levelCompleted":
            "Level abgeschlossen! 🎉 Tippe 'next' ein oder klicke auf 'Nächstes Level', um fortzufahren.",
        "terminal.enterCommand": "Gib einen Befehl ein...",
        "terminal.typeNext": "Tippe 'next' ein oder klicke auf 'Nächstes Level', um fortzufahren.",
        "terminal.fileSaved": "Datei gespeichert: {path}",
        "terminal.fileRemoved": "Datei gelöscht: {path}",
        "terminal.levelReset": "Level zurückgesetzt.",
        "terminal.progressReset": "Fortschritt zurückgesetzt.",
        "terminal.allLevelsCompleted": "Gratulation! Du hast alle verfügbaren Level abgeschlossen!",
    },
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
        return translations[language][key as keyof (typeof translations)[typeof language]] || key;
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
