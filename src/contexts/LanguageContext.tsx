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
        "home.title": "Master Git Through",
        "home.title2": "Play",
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
        "level.techModeOn": "Focus on Commands (Tech Mode)",
        "level.storyModeOn": "Show Story Context (Story Mode)",
        "level.techModeDescription":
            "Technical mode focuses on Git commands without stories or context for a faster, more direct experience.",
        "level.storyModeDescription":
            "Story mode provides real-world context and explanations to help understand why and how Git commands are used.",
        "level.editFile": "Edit file",
        "level.deleteFile": "Delete file",
        "level.confirmDelete": "Are you sure you want to delete {file}?",
        "level.hints": "Hints",

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

        // Level Content - Intro Stage
        "intro.name": "Introduction to Git",
        "intro.description": "Learn the basics of Git",

        "intro.level1.name": "Initialize Git",
        "intro.level1.description": "Create a new Git repository",
        "intro.level1.objective1": "Initialize a new Git repository",
        "intro.level1.hint1": "Use the git init command",
        "intro.level1.hint2": "This creates a hidden .git directory",
        "intro.level1.requirement1.description": "Initialize a Git repository",
        "intro.level1.requirement1.success": "Well done! You've created a Git repository.",
        "intro.level1.story.title": "Welcome to the Team",
        "intro.level1.story.narrative":
            "Welcome to your new job as a developer at TechStart! I'm Alex, your team lead.\n\nIt's your first day and we want to help you become productive quickly. We use Git for our version control - it helps us track changes in code and work together as a team.\n\nThe first thing you need to do is create a new repository for your onboarding project. We use the 'git init' command for this.",
        "intro.level1.story.realWorldContext":
            "In real development teams, Git is essential. It's the first tool you set up for a new project.",
        "intro.level1.story.taskIntroduction": "Let's create a new repository for your project.",

        "intro.level2.name": "Repository Status",
        "intro.level2.description": "Check the status of your repository",
        "intro.level2.objective1": "Display the status of your Git repository",
        "intro.level2.hint1": "Use the git status command",
        "intro.level2.hint2": "This command shows the current status of your repository",
        "intro.level2.requirement1.description": "Show the repository status",
        "intro.level2.requirement1.success": "Perfect! Now you can see the status of your repository.",
        "intro.level2.story.title": "What's Happening in Your Repo?",
        "intro.level2.story.narrative":
            "Great! You've created your first Git repository. The hidden .git directory now contains all the information Git needs.\n\nAlex stops by: \"Great job! Next you should look at what's happening in your repository. With 'git status' you can check the current state at any time.\"",
        "intro.level2.story.realWorldContext":
            "Developers run 'git status' multiple times a day to see which files have been changed and which are ready for the next commit.",
        "intro.level2.story.taskIntroduction": "Check the status of your repository with git status.",

        // Level Content - Files Stage
        "files.name": "File Operations",
        "files.description": "Learn how to manage files with Git",

        "files.level1.name": "Staging Changes",
        "files.level1.description": "Add files to the staging area",
        "files.level1.objective1": "Add all files to the staging area",
        "files.level1.hint1": "Use the git add . command",
        "files.level1.hint2": "The dot represents 'all files in the current directory'",
        "files.level1.requirement1.description": "Add all files to the staging area",
        "files.level1.requirement1.success": "Great! You've added all files to the staging area.",
        "files.level1.story.title": "Preparing Code Changes",
        "files.level1.story.narrative":
            '"Hey!" calls Sarah, your colleague, "I see you\'ve already started with Git. Next you should learn how to stage changes."\n\nShe explains: "When you modify files, you need to explicitly tell Git which changes should be included in the next commit. This is called \'staging\' and works with \'git add\'."',
        "files.level1.story.realWorldContext":
            "The staging concept is a powerful feature of Git. It allows you to commit only selected changes while others can remain in progress.",
        "files.level1.story.taskIntroduction": "Add all files to the staging area with git add .",

        "files.level2.name": "Committing Changes",
        "files.level2.description": "Create a commit with your changes",
        "files.level2.objective1": "Create a commit with a message",
        "files.level2.hint1": "Use the git commit -m 'Your message' command",
        "files.level2.hint2": "The message should describe your changes",
        "files.level2.requirement1.description": "Create a commit with a message",
        "files.level2.requirement1.success": "Excellent! You've successfully created a commit.",
        "files.level2.story.title": "Your First Commit",
        "files.level2.story.narrative":
            '"Great job!" says Alex when he sees your progress. "You\'ve added changes to the staging area. Now it\'s time for your first commit."\n\nHe explains: "A commit is like a snapshot of your project at a specific point in time. Each commit needs a message that describes what was changed. This is important for traceability."',
        "files.level2.story.realWorldContext":
            "Good commit messages are extremely important in development teams. They help everyone understand why a change was made, not just what was changed.",
        "files.level2.story.taskIntroduction": "Create your first commit with a meaningful message.",

        // Level Content - Branches Stage
        "branches.name": "Working with Branches",
        "branches.description": "Learn how to work with branches",

        "branches.level1.name": "View Branches",
        "branches.level1.description": "Display all branches in your repository",
        "branches.level1.objective1": "Display all existing branches",
        "branches.level1.hint1": "Use the git branch command",
        "branches.level1.hint2": "This shows all local branches",
        "branches.level1.requirement1.description": "Show all branches",
        "branches.level1.requirement1.success": "Very good! Now you can see all branches in your repository.",
        "branches.level1.story.title": "Code Branches",
        "branches.level1.story.narrative":
            '"Time for something more advanced," says Alex and draws a tree with branches on a whiteboard. "These branches are like Git branches. They allow you to work on different versions of your code simultaneously."\n\nHe continues: "Currently you\'re working on the \'main\' branch. Let\'s first check which branches we have."',
        "branches.level1.story.realWorldContext":
            "Branches are a fundamental concept in Git. They enable parallel development, feature isolation, and experimental work without affecting the main code.",
        "branches.level1.story.taskIntroduction": "Display all existing branches with git branch.",

        "branches.level2.name": "Create Branch",
        "branches.level2.description": "Create a new branch and switch to it",
        "branches.level2.objective1": "Create a new branch named 'feature' and switch to it",
        "branches.level2.hint1": "Use the git checkout -b feature command",
        "branches.level2.hint2": "This creates a new branch and switches to it at the same time",
        "branches.level2.requirement1.description": "Create a new branch and switch to it",
        "branches.level2.requirement1.success": "Excellent! You've created a new branch and switched to it.",
        "branches.level2.story.title": "New Feature Development",
        "branches.level2.story.narrative":
            "\"Perfect! Now we want to implement a new feature,\" says Alex. \"For this, we'll create a new branch called 'feature' so our changes don't affect the main code.\"\n\nHe shows you how to create a branch and switch to it in one step: \"With 'git checkout -b' you can do both in one command.\"",
        "branches.level2.story.realWorldContext":
            "In professional development teams, you almost never work directly on the main branch. Instead, you create feature branches for new functionality to keep the main code stable.",
        "branches.level2.story.taskIntroduction": "Create a new branch named 'feature' and switch to it.",

        // Level Content - Merge Stage
        "merge.name": "Merging Branches",
        "merge.description": "Learn how to merge branches",

        "merge.level1.name": "Merge Branches",
        "merge.level1.description": "Merge one branch into the current branch",
        "merge.level1.objective1": "Merge the 'feature' branch into the 'main' branch",
        "merge.level1.hint1": "Use the git merge feature command",
        "merge.level1.hint2": "This merges the feature branch into your current branch",
        "merge.level1.requirement1.description": "Merge a branch",
        "merge.level1.requirement1.success": "Excellent! You've successfully merged a branch.",
        "merge.level1.story.title": "Code Integration",
        "merge.level1.story.narrative":
            '"Great! Your feature is complete and tested," says Alex. "Now it\'s time to integrate these changes back into the main code."\n\nHe explains: "First switch to the main branch with \'git checkout main\' and then merge the feature branch with \'git merge feature\'."',
        "merge.level1.story.realWorldContext":
            "Merging is a critical part of the Git workflow. In larger teams, this is often formalized through pull requests and code reviews.",
        "merge.level1.story.taskIntroduction": "Merge the 'feature' branch into the 'main' branch.",
    },
    de: {
        // Navigation
        "nav.home": "Home",
        "nav.terminal": "Terminal",
        "nav.playground": "Playground",
        "nav.startLearning": "Starte Lernen",
        "nav.language": "Sprache",

        // Home Page
        "home.title": "Meistere Git durch",
        "home.title2": "Spielen",
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
        "level.techModeOn": "Fokus auf Befehle (Tech-Modus)",
        "level.storyModeOn": "Story-Kontext anzeigen (Story-Modus)",
        "level.techModeDescription":
            "Der technische Modus konzentriert sich auf Git-Befehle ohne Geschichten oder Kontext für ein schnelleres, direkteres Erlebnis.",
        "level.storyModeDescription":
            "Der Story-Modus bietet Kontext aus der realen Welt und Erklärungen, um zu verstehen, warum und wie Git-Befehle verwendet werden.",
        "level.editFile": "Datei bearbeiten",
        "level.deleteFile": "Datei löschen",
        "level.confirmDelete": "Möchten Sie {file} wirklich löschen?",
        "level.hints": "Hinweise",

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

        // Level Content - Intro Stage
        "intro.name": "Einführung in Git",
        "intro.description": "Lerne die Grundlagen von Git",

        "intro.level1.name": "Git initialisieren",
        "intro.level1.description": "Erstelle ein neues Git-Repository",
        "intro.level1.objective1": "Initialisiere ein neues Git-Repository",
        "intro.level1.hint1": "Verwende den Befehl git init",
        "intro.level1.hint2": "Dies erstellt ein verstecktes .git-Verzeichnis",
        "intro.level1.requirement1.description": "Initialisiere ein Git-Repository",
        "intro.level1.requirement1.success": "Gut gemacht! Du hast ein Git-Repository erstellt.",
        "intro.level1.story.title": "Willkommen im Team",
        "intro.level1.story.narrative":
            "Herzlich willkommen in deinem neuen Job als Entwickler bei TechStart! Ich bin Alex, dein Team-Lead.\n\nEs ist dein erster Tag und wir wollen dir helfen, schnell produktiv zu werden. Wir nutzen Git für unsere Versionskontrolle - damit verfolgen wir Änderungen im Code und arbeiten im Team zusammen.\n\nAls erstes musst du ein neues Repository für dein Onboarding-Projekt anlegen. Dafür nutzen wir den Befehl 'git init'.",
        "intro.level1.story.realWorldContext":
            "In echten Entwicklerteams ist Git unverzichtbar. Es ist das erste Tool, das du bei einem neuen Projekt einrichtest.",
        "intro.level1.story.taskIntroduction": "Lass uns ein neues Repository für dein Projekt erstellen.",

        "intro.level2.name": "Repository Status",
        "intro.level2.description": "Überprüfe den Status deines Repositories",
        "intro.level2.objective1": "Zeige den Status deines Git-Repositories an",
        "intro.level2.hint1": "Verwende den Befehl git status",
        "intro.level2.hint2": "Dieser Befehl zeigt dir den aktuellen Status deines Repositories",
        "intro.level2.requirement1.description": "Zeige den Status des Repositories",
        "intro.level2.requirement1.success": "Perfekt! Du kannst nun den Status deines Repositories sehen.",
        "intro.level2.story.title": "Was ist los in deinem Repo?",
        "intro.level2.story.narrative":
            "Großartig! Du hast dein erstes Git-Repository erstellt. Das versteckte .git-Verzeichnis enthält nun alle Informationen, die Git braucht.\n\nAlex schaut vorbei: \"Super! Als nächstes solltest du dir anschauen, was in deinem Repository passiert. Mit 'git status' kannst du jederzeit den aktuellen Zustand überprüfen.\"",
        "intro.level2.story.realWorldContext":
            "Entwickler führen 'git status' mehrmals täglich aus, um zu sehen, welche Dateien geändert wurden und welche für den nächsten Commit bereit sind.",
        "intro.level2.story.taskIntroduction": "Überprüfe den Status deines Repositories mit git status.",

        // Level Content - Files Stage
        "files.name": "Dateioperationen",
        "files.description": "Lerne, wie du Dateien mit Git verwaltest",

        "files.level1.name": "Änderungen stagen",
        "files.level1.description": "Füge Dateien zur Staging-Area hinzu",
        "files.level1.objective1": "Füge alle Dateien zur Staging-Area hinzu",
        "files.level1.hint1": "Verwende den Befehl git add .",
        "files.level1.hint2": "Der Punkt steht für 'alle Dateien im aktuellen Verzeichnis'",
        "files.level1.requirement1.description": "Füge alle Dateien zum Staging-Bereich hinzu",
        "files.level1.requirement1.success": "Großartig! Du hast alle Dateien zur Staging-Area hinzugefügt.",
        "files.level1.story.title": "Code-Änderungen vorbereiten",
        "files.level1.story.narrative":
            '"Hey!" ruft Sarah, deine Kollegin, "ich sehe, du hast schon mit Git angefangen. Als nächstes solltest du lernen, wie man Änderungen staged."\n\nSie erklärt: "Wenn du Dateien änderst, musst du Git explizit sagen, welche Änderungen in den nächsten Commit aufgenommen werden sollen. Das nennt man \'Staging\' und funktioniert mit \'git add\'."',
        "files.level1.story.realWorldContext":
            "Das Staging-Konzept ist ein mächtiges Feature von Git. Es erlaubt dir, nur ausgewählte Änderungen zu committen, während andere noch in Bearbeitung bleiben können.",
        "files.level1.story.taskIntroduction": "Füge alle Dateien zur Staging-Area hinzu mit git add .",

        "files.level2.name": "Änderungen committen",
        "files.level2.description": "Erstelle einen Commit mit deinen Änderungen",
        "files.level2.objective1": "Erstelle einen Commit mit einer Nachricht",
        "files.level2.hint1": "Verwende den Befehl git commit -m 'Deine Nachricht'",
        "files.level2.hint2": "Die Nachricht sollte die Änderungen beschreiben",
        "files.level2.requirement1.description": "Erstelle einen Commit mit einer Nachricht",
        "files.level2.requirement1.success": "Ausgezeichnet! Du hast erfolgreich einen Commit erstellt.",
        "files.level2.story.title": "Dein erster Commit",
        "files.level2.story.narrative":
            '"Super gemacht!" sagt Alex, als er deine Fortschritte sieht. "Du hast Änderungen zur Staging-Area hinzugefügt. Jetzt ist es Zeit für deinen ersten Commit."\n\nEr erklärt: "Ein Commit ist wie ein Snapshot deines Projekts zu einem bestimmten Zeitpunkt. Jeder Commit braucht eine Nachricht, die beschreibt, was geändert wurde. Das ist wichtig für die Nachvollziehbarkeit."',
        "files.level2.story.realWorldContext":
            "Gute Commit-Nachrichten sind in Entwicklerteams extrem wichtig. Sie helfen allen zu verstehen, warum eine Änderung gemacht wurde, nicht nur was geändert wurde.",
        "files.level2.story.taskIntroduction": "Erstelle deinen ersten Commit mit einer aussagekräftigen Nachricht.",

        // Level Content - Branches Stage
        "branches.name": "Arbeiten mit Branches",
        "branches.description": "Lerne, wie du mit Branches arbeitest",

        "branches.level1.name": "Branches anzeigen",
        "branches.level1.description": "Zeige alle Branches in deinem Repository",
        "branches.level1.objective1": "Zeige alle vorhandenen Branches an",
        "branches.level1.hint1": "Verwende den Befehl git branch",
        "branches.level1.hint2": "Dies zeigt dir alle lokalen Branches an",
        "branches.level1.requirement1.description": "Zeige alle Branches an",
        "branches.level1.requirement1.success": "Sehr gut! Du kannst nun alle Branches in deinem Repository sehen.",
        "branches.level1.story.title": "Verzweigungen im Code",
        "branches.level1.story.narrative":
            '"Zeit für etwas Fortgeschritteneres", sagt Alex und zeichnet einen Baum mit Zweigen auf ein Whiteboard. "Diese Zweige sind wie Git-Branches. Sie erlauben dir, an verschiedenen Versionen deines Codes gleichzeitig zu arbeiten."\n\nEr erklärt weiter: "Derzeit arbeitest du auf dem \'main\'-Branch. Lass uns zuerst überprüfen, welche Branches wir haben."',
        "branches.level1.story.realWorldContext":
            "Branches sind ein fundamentales Konzept in Git. Sie ermöglichen parallele Entwicklung, Feature-Isolation und experimentelles Arbeiten ohne den Hauptcode zu beeinträchtigen.",
        "branches.level1.story.taskIntroduction": "Zeige dir alle vorhandenen Branches mit git branch an.",

        "branches.level2.name": "Branch erstellen",
        "branches.level2.description": "Erstelle einen neuen Branch und wechsle zu ihm",
        "branches.level2.objective1": "Erstelle einen neuen Branch namens 'feature' und wechsle zu ihm",
        "branches.level2.hint1": "Verwende den Befehl git checkout -b feature",
        "branches.level2.hint2": "Dies erstellt einen neuen Branch und wechselt gleichzeitig zu ihm",
        "branches.level2.requirement1.description": "Erstelle einen neuen Branch und wechsle zu ihm",
        "branches.level2.requirement1.success":
            "Hervorragend! Du hast einen neuen Branch erstellt und zu ihm gewechselt.",
        "branches.level2.story.title": "Neue Feature-Entwicklung",
        "branches.level2.story.narrative":
            '"Perfekt! Jetzt wollen wir ein neues Feature implementieren", sagt Alex. "Dafür erstellen wir einen neuen Branch namens \'feature\', damit unsere Änderungen den Hauptcode nicht beeinflussen."\n\nEr zeigt dir, wie man gleichzeitig einen Branch erstellt und zu ihm wechselt: "Mit \'git checkout -b\' kannst du beides in einem Schritt erledigen."',
        "branches.level2.story.realWorldContext":
            "In professionellen Entwicklungsteams arbeitet man fast nie direkt im main-Branch. Stattdessen erstellt man Feature-Branches für neue Funktionen, um den Hauptcode stabil zu halten.",
        "branches.level2.story.taskIntroduction": "Erstelle einen neuen Branch namens 'feature' und wechsle zu ihm.",

        // Level Content - Merge Stage
        "merge.name": "Branches zusammenführen",
        "merge.description": "Lerne, wie du Branches zusammenführst",

        "merge.level1.name": "Branches mergen",
        "merge.level1.description": "Führe einen Branch in den aktuellen Branch zusammen",
        "merge.level1.objective1": "Führe den 'feature' Branch in den 'main' Branch zusammen",
        "merge.level1.hint1": "Verwende den Befehl git merge feature",
        "merge.level1.hint2": "Dies führt den feature-Branch in deinen aktuellen Branch zusammen",
        "merge.level1.requirement1.description": "Führe einen Branch zusammen",
        "merge.level1.requirement1.success": "Ausgezeichnet! Du hast erfolgreich einen Branch zusammengeführt.",
        "merge.level1.story.title": "Code-Integration",
        "merge.level1.story.narrative":
            '"Super! Dein Feature ist fertig und getestet", sagt Alex. "Jetzt ist es Zeit, diese Änderungen zurück in den Hauptcode zu integrieren."\n\nEr erklärt: "Wechsle zuerst zum main-Branch mit \'git checkout main\' und führe dann den feature-Branch mit \'git merge feature\' zusammen."',
        "merge.level1.story.realWorldContext":
            "Das Zusammenführen (Merging) ist ein kritischer Teil des Git-Workflows. In größeren Teams wird dies oft durch Pull Requests und Code Reviews formalisiert.",
        "merge.level1.story.taskIntroduction": "Führe den 'feature'-Branch in den 'main'-Branch zusammen.",
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
