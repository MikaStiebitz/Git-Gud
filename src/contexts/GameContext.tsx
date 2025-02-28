"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CommandProcessor } from "~/models/CommandProcessor";
import { FileSystem } from "~/models/FileSystem";
import { LevelManager } from "~/models/LevelManager";
import { ProgressManager } from "~/models/ProgressManager";
import { GitRepository } from "~/models/GitRepository";
import type { GameContextProps } from "~/types";

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fileSystem] = useState<FileSystem>(new FileSystem());
    const [gitRepository] = useState<GitRepository>(new GitRepository());
    const [commandProcessor] = useState<CommandProcessor>(new CommandProcessor(fileSystem, gitRepository));
    const [levelManager] = useState<LevelManager>(new LevelManager());
    const [progressManager] = useState<ProgressManager>(new ProgressManager());

    const [currentStage, setCurrentStage] = useState<string>(progressManager.getProgress().currentStage);
    const [currentLevel, setCurrentLevel] = useState<number>(progressManager.getProgress().currentLevel);
    const [isLevelCompleted, setIsLevelCompleted] = useState<boolean>(
        progressManager.isLevelCompleted(currentStage, currentLevel),
    );
    const [terminalOutput, setTerminalOutput] = useState<string[]>([
        "Willkommen im Git Terminal Simulator!",
        `Level ${currentLevel} von ${currentStage} gestartet. Gib 'help' ein für Hilfe.`,
    ]);

    // Add a function to reset terminal for playground mode
    const resetTerminalForPlayground = () => {
        setTerminalOutput([
            "Willkommen im Git Terminal Simulator!",
            "Playground-Modus aktiviert. Experimentiere frei mit Git-Befehlen. Gib 'help' ein für Hilfe.",
        ]);
    };

    // Zustand für den FileEditor
    const [isFileEditorOpen, setIsFileEditorOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState({ name: "", content: "" });

    // Load saved progress on mount
    useEffect(() => {
        const savedProgress = progressManager.getProgress();
        setCurrentStage(savedProgress.currentStage);
        setCurrentLevel(savedProgress.currentLevel);
        setIsLevelCompleted(progressManager.isLevelCompleted(savedProgress.currentStage, savedProgress.currentLevel));
    }, [progressManager]);

    // Process a command and update the state
    const handleCommand = (command: string, isPlaygroundMode = false) => {
        // Spezialfall für nano-Befehl
        if (command.trim().startsWith("nano ")) {
            const args = command.trim().split(/\s+/);
            if (args.length > 1) {
                const fileName = args[1] ?? "";
                setTerminalOutput(prev => [...prev, `$ ${command}`, `Opening ${fileName} in editor...`]);
                openFileEditor(fileName);
                return;
            }
        }

        setTerminalOutput(prev => [...prev, `$ ${command}`]);

        // Spezialfall für "next"-Befehl
        if (command.trim() === "next" && isLevelCompleted) {
            handleNextLevel();
            return;
        }

        // Prozessiere den Befehl und erhalte die Ausgabe
        const output = commandProcessor.processCommand(command);
        setTerminalOutput(prev => [...prev, ...output]);

        // Skip level completion checks if in playground mode
        if (isPlaygroundMode) {
            return;
        }

        // Überprüfe, ob der Befehl das Level abschließt
        const [cmd, ...args] = command.trim().split(/\s+/);

        // Handle special case for git commands
        if (cmd === "git") {
            const gitCommand = args[0]; // Der eigentliche Git-Befehl (init, status, etc.)
            const gitArgs = args.slice(1); // Die Argumente des Git-Befehls

            // Prüfe Git Befehl mit dem LevelManager
            if (levelManager.checkLevelCompletion(currentStage, currentLevel, cmd, args)) {
                markLevelAsCompleted();
            }
        } else {
            // Für Nicht-Git-Befehle - direkte Überprüfung
            if (levelManager.checkLevelCompletion(currentStage, currentLevel, cmd ?? "", args)) {
                markLevelAsCompleted();
            }
        }
    };

    // Hilfsfunktion zum Markieren eines Levels als abgeschlossen
    const markLevelAsCompleted = () => {
        if (!isLevelCompleted) {
            setIsLevelCompleted(true);
            progressManager.completeLevel(currentStage, currentLevel);
            setTerminalOutput(prev => [
                ...prev,
                "🎉 Level abgeschlossen! Gut gemacht! 🎉",
                "Tippe 'next' ein oder klicke auf 'Nächstes Level', um fortzufahren.",
            ]);
        }
    };

    // Move to the next level
    const handleNextLevel = () => {
        if (isLevelCompleted) {
            const { stageId, levelId } = levelManager.getNextLevel(currentStage, currentLevel);

            // Fixed: Check if stageId and levelId are defined before using them
            if (stageId && typeof levelId === "number") {
                setCurrentStage(stageId);
                setCurrentLevel(levelId);
                setIsLevelCompleted(progressManager.isLevelCompleted(stageId, levelId));
                progressManager.setCurrentLevel(stageId, levelId);

                // Get the next level data to check if we should reset the git repo
                const nextLevel = levelManager.getLevel(stageId, levelId);

                // Only completely reset the repository if the next level requires it
                if (nextLevel?.resetGitRepo) {
                    gitRepository.reset();
                } else {
                    // Otherwise, use partial reset to keep the repo initialized
                    gitRepository.partialReset();
                }

                setTerminalOutput([
                    "Willkommen im Git Terminal Simulator!",
                    `Level ${levelId} von ${stageId} gestartet. Gib 'help' ein für Hilfe.`,
                ]);
            } else {
                // Handle case where there's no next level
                setTerminalOutput(prev => [...prev, "Gratulation! Du hast alle verfügbaren Level abgeschlossen!"]);
            }
        }
    };

    // Öffne den FileEditor für eine Datei
    const openFileEditor = (fileName: string) => {
        const currentDir = commandProcessor.getCurrentDirectory();
        const filePath = fileName.startsWith("/") ? fileName : `${currentDir}/${fileName}`;
        const content = fileSystem.getFileContents(filePath) ?? "";

        // Setze die aktuellen Dateideaten und öffne den Editor
        setCurrentFile({ name: filePath, content });
        setIsFileEditorOpen(true);
    };

    // Handle file edit (for nano command)
    const handleFileEdit = (path: string, content: string) => {
        const fullPath = path.startsWith("/") ? path : `${commandProcessor.getCurrentDirectory()}/${path}`;

        fileSystem.writeFile(fullPath, content);

        // Update Git status for the file
        gitRepository.updateFileStatus(path, "modified");

        setTerminalOutput(prev => [...prev, `File saved: ${path}`]);
    };

    // Reset the current level
    const resetCurrentLevel = () => {
        gitRepository.reset();
        setIsLevelCompleted(false);
        setTerminalOutput([
            "Level zurückgesetzt.",
            `Level ${currentLevel} von ${currentStage} neu gestartet. Gib 'help' ein für Hilfe.`,
        ]);
    };

    // Reset all progress
    const resetAllProgress = () => {
        progressManager.resetProgress();
        gitRepository.reset();

        const initialProgress = progressManager.getProgress();
        setCurrentStage(initialProgress.currentStage);
        setCurrentLevel(initialProgress.currentLevel);
        setIsLevelCompleted(false);

        setTerminalOutput([
            "Fortschritt zurückgesetzt.",
            `Level ${initialProgress.currentLevel} von ${initialProgress.currentStage} gestartet. Gib 'help' ein für Hilfe.`,
        ]);
    };

    const value = {
        fileSystem,
        gitRepository,
        commandProcessor,
        levelManager,
        progressManager,
        currentStage,
        currentLevel,
        isLevelCompleted,
        terminalOutput,
        isFileEditorOpen,
        currentFile,

        handleCommand,
        handleNextLevel,
        handleFileEdit,
        resetCurrentLevel,
        resetAllProgress,
        openFileEditor,
        setIsFileEditorOpen,
        resetTerminalForPlayground,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = (): GameContextProps => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameProvider");
    }
    return context;
};
