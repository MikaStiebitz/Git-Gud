"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CommandProcessor } from "~/models/CommandProcessor";
import { FileSystem } from "~/models/FileSystem";
import { LevelManager } from "~/models/LevelManager";
import { ProgressManager } from "~/models/ProgressManager";
import { GitRepository } from "~/models/GitRepository";
import type { GameContextProps } from "~/types";
import { useLanguage } from "~/contexts/LanguageContext";

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fileSystem] = useState<FileSystem>(new FileSystem());
    const [gitRepository] = useState<GitRepository>(new GitRepository());
    const [commandProcessor] = useState<CommandProcessor>(new CommandProcessor(fileSystem, gitRepository));
    const [levelManager] = useState<LevelManager>(new LevelManager());
    const [progressManager] = useState<ProgressManager>(new ProgressManager());
    const { t } = useLanguage();

    const [currentStage, setCurrentStage] = useState<string>(progressManager.getProgress().currentStage);
    const [currentLevel, setCurrentLevel] = useState<number>(progressManager.getProgress().currentLevel);
    const [isLevelCompleted, setIsLevelCompleted] = useState<boolean>(
        progressManager.isLevelCompleted(currentStage, currentLevel),
    );
    const [terminalOutput, setTerminalOutput] = useState<string[]>([
        t("terminal.welcome"),
        t("terminal.levelStarted").replace("{level}", currentLevel.toString()).replace("{stage}", currentStage),
    ]);

    // Add a function to reset terminal for playground mode
    const resetTerminalForPlayground = () => {
        setTerminalOutput([t("terminal.welcome"), t("terminal.playgroundMode")]);
    };

    // State for FileEditor
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
        // Special case for nano command
        if (command.trim().startsWith("nano ")) {
            const args = command.trim().split(/\s+/);
            if (args.length > 1) {
                const fileName = args[1] ?? "";
                setTerminalOutput(prev => [...prev, `$ ${command}`, `Opening ${fileName} in editor...`]);
                openFileEditor(fileName);
                return;
            }
        }

        if (command.trim() === "clear") {
            setTerminalOutput([]);
            return;
        }

        setTerminalOutput(prev => [...prev, `$ ${command}`]);

        // Special case for "next" command
        if (command.trim() === "next" && isLevelCompleted) {
            handleNextLevel();
            return;
        }

        // Process the command and get output
        const output = commandProcessor.processCommand(command);
        setTerminalOutput(prev => [...prev, ...output]);

        // Skip level completion checks if in playground mode
        if (isPlaygroundMode) {
            return;
        }

        // Check if the command completes the level
        const [cmd, ...args] = command.trim().split(/\s+/);

        // Handle special case for git commands
        if (cmd === "git") {
            const gitCommand = args[0]; // The actual Git command (init, status, etc.)
            const gitArgs = args.slice(1); // The arguments for the Git command

            // Check Git command with the LevelManager
            if (levelManager.checkLevelCompletion(currentStage, currentLevel, cmd, args)) {
                markLevelAsCompleted();
            }
        } else {
            // For non-Git commands - direct check
            if (levelManager.checkLevelCompletion(currentStage, currentLevel, cmd ?? "", args)) {
                markLevelAsCompleted();
            }
        }
    };

    // Helper function to mark a level as completed
    const markLevelAsCompleted = () => {
        if (!isLevelCompleted) {
            setIsLevelCompleted(true);
            progressManager.completeLevel(currentStage, currentLevel);
            setTerminalOutput(prev => [...prev, "🎉 " + t("level.levelCompleted") + " 🎉", t("terminal.typeNext")]);
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
                    t("terminal.welcome"),
                    t("terminal.levelStarted").replace("{level}", levelId.toString()).replace("{stage}", stageId),
                ]);
            } else {
                // Handle case where there's no next level
                setTerminalOutput(prev => [...prev, t("terminal.allLevelsCompleted")]);
            }
        }
    };

    // Open the FileEditor for a file
    const openFileEditor = (fileName: string) => {
        const currentDir = commandProcessor.getCurrentDirectory();
        const filePath = fileName.startsWith("/") ? fileName : `${currentDir}/${fileName}`;
        const content = fileSystem.getFileContents(filePath) ?? "";

        // Set the current file data and open the editor
        setCurrentFile({ name: filePath, content });
        setIsFileEditorOpen(true);
    };

    // Handle file edit (for nano command)
    const handleFileEdit = (path: string, content: string) => {
        const fullPath = path.startsWith("/") ? path : `${commandProcessor.getCurrentDirectory()}/${path}`;

        fileSystem.writeFile(fullPath, content);

        // Update Git status for the file
        gitRepository.updateFileStatus(path, "modified");

        setTerminalOutput(prev => [...prev, t("terminal.fileSaved").replace("{path}", path)]);
    };

    // Reset the current level
    const resetCurrentLevel = () => {
        gitRepository.reset();
        setIsLevelCompleted(false);
        setTerminalOutput([
            t("terminal.levelReset"),
            t("terminal.levelStarted").replace("{level}", currentLevel.toString()).replace("{stage}", currentStage),
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
            t("terminal.progressReset"),
            t("terminal.levelStarted")
                .replace("{level}", initialProgress.currentLevel.toString())
                .replace("{stage}", initialProgress.currentStage),
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
