"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CommandProcessor } from "~/models/CommandProcessor";
import { FileSystem } from "~/models/FileSystem";
import { LevelManager } from "~/models/LevelManager";
import { ProgressManager } from "~/models/ProgressManager";
import { GitRepository } from "~/models/GitRepository";
import type { GameContextProps } from "~/types";
import { useLanguage } from "~/contexts/LanguageContext";

const GameContext = createContext<GameContextProps | undefined>(undefined);

interface FileSystemItem {
    type: "file" | "directory";
    children?: Record<string, FileSystemItem>;
}

interface EditableFile {
    name: string;
    path: string;
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [fileSystem] = useState<FileSystem>(new FileSystem());
    const [gitRepository] = useState<GitRepository>(new GitRepository(fileSystem));
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
    const [isCommitDialogOpen, setIsCommitDialogOpen] = useState<boolean>(false);

    // Advanced mode state
    const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(
        typeof window !== "undefined" ? localStorage.getItem("gitgud-advanced-mode") === "true" : false,
    );

    // Toggle advanced mode
    const toggleAdvancedMode = () => {
        setIsAdvancedMode(prev => {
            const newMode = !prev;
            if (typeof window !== "undefined") localStorage.setItem("gitgud-advanced-mode", newMode.toString());
            return newMode;
        });
    };

    // Separate file editor states for different modes
    const [isLevelFileEditorOpen, setIsLevelFileEditorOpen] = useState(false);
    const [isPlaygroundFileEditorOpen, setIsPlaygroundFileEditorOpen] = useState(false);
    const [currentLevelFile, setCurrentLevelFile] = useState({ name: "", content: "" });
    const [currentPlaygroundFile, setCurrentPlaygroundFile] = useState({ name: "", content: "" });

    const GIT_SIMULATION_WARNING =
        "⚠️ Note: This is a simplified Git simulation for learning purposes. Some commands may behave differently than in real Git.";

    // Combined getter/setter for file editor state
    const isFileEditorOpen = isLevelFileEditorOpen || isPlaygroundFileEditorOpen;

    const setIsFileEditorOpen = (isOpen: boolean) => {
        if (typeof window !== "undefined" && window.location.pathname.includes("/playground")) {
            setIsPlaygroundFileEditorOpen(isOpen);
        } else {
            setIsLevelFileEditorOpen(isOpen);
        }
    };

    // Open the CommitDialog
    const openCommitDialog = () => {
        setIsCommitDialogOpen(true);
    };

    // Close the CommitDialog
    const closeCommitDialog = () => {
        setIsCommitDialogOpen(false);
    };

    // Handle commit message from dialog
    const handleCommit = (message: string) => {
        // Create a properly formatted commit command
        // Escape quotes in the message to avoid syntax errors
        const escapedMessage = message.replace(/"/g, '\\"');

        // Execute the commit command
        const output = commandProcessor.processCommand(`git commit -m "${escapedMessage}"`);
        setTerminalOutput(prev => [...prev, ...output]);
    };

    // Sync URL with current level state
    const syncURLWithCurrentLevel = useCallback(() => {
        if (typeof window !== "undefined" && window.location.pathname.includes("/level")) {
            const currentParams = new URLSearchParams(window.location.search);
            const currentStageParam = currentParams.get("stage");
            const currentLevelParam = currentParams.get("level");

            // Only update URL if the parameters have actually changed
            if (currentStageParam !== currentStage || currentLevelParam !== currentLevel.toString()) {
                router.replace(`/level?stage=${currentStage}&level=${currentLevel}`, { scroll: false });
            }
        }
    }, [currentStage, currentLevel, router]);

    // Add a function to reset terminal for playground mode
    const resetTerminalForPlayground = () => {
        // First reset the git repository to ensure a clean state
        gitRepository.reset();

        // Reset the file system to initial state
        // This is a simple approach - you might want to implement a proper reset method in FileSystem class
        fileSystem.mkdir("/");
        fileSystem.writeFile("/README.md", "# Git Learning Game\n\nWelcome to the Git learning game!");
        fileSystem.mkdir("/src");
        fileSystem.writeFile("/src/index.js", 'console.log("Hello, Git!");');

        // Reset the terminal output
        setTerminalOutput([t("terminal.welcome"), t("terminal.playgroundMode"), GIT_SIMULATION_WARNING]);

        // Reset the command processor's current directory
        commandProcessor.setCurrentDirectory("/");

        // Close any open file editors
        setIsPlaygroundFileEditorOpen(false);
    };

    // Add a function to reset terminal for level mode
    const resetTerminalForLevel = () => {
        // Use the LevelManager to set up the environment for this level
        levelManager.setupLevel(currentStage, currentLevel, fileSystem, gitRepository);

        // Reset the terminal output
        setTerminalOutput([
            t("terminal.welcome"),
            t("terminal.levelStarted").replace("{level}", currentLevel.toString()).replace("{stage}", currentStage),
            GIT_SIMULATION_WARNING,
        ]);

        // Reset the command processor's current directory
        commandProcessor.setCurrentDirectory("/");

        // Close any open editor when resetting the level
        setIsLevelFileEditorOpen(false);
    };

    // Load saved progress on mount
    useEffect(() => {
        const savedProgress = progressManager.getProgress();
        setCurrentStage(savedProgress.currentStage);
        setCurrentLevel(savedProgress.currentLevel);
        setIsLevelCompleted(progressManager.isLevelCompleted(savedProgress.currentStage, savedProgress.currentLevel));
    }, [progressManager]);

    // Process a command and update the state
    const handleCommand = (command: string, isPlaygroundMode = false) => {
        // Check if the command is empty
        if (!command.trim()) return;

        // Special case for clearing the terminal
        if (command.trim() === "clear") {
            setTerminalOutput([]);
            return;
        }

        // Add the command to the terminal output
        setTerminalOutput(prev => [...prev, `$ ${command}`]);

        // Special case for "next" command
        if (command.trim() === "next" && isLevelCompleted) {
            handleNextLevel();
            return;
        }

        // Special case for nano command - handle it directly
        if (command.trim().startsWith("nano ")) {
            const args = command.trim().split(/\s+/);
            if (args.length > 1) {
                const fileName = args[1] ?? "";

                // Add nano command output
                setTerminalOutput(prev => [...prev, `Opening ${fileName} in editor...`]);

                // Then open the file editor
                openFileEditor(fileName, isPlaygroundMode);

                return;
            }
        }

        // Special case for git commit (with no -m flag)
        if (command.trim() === "git commit") {
            // Process the command first to check if there are staged changes
            const output = commandProcessor.processCommand(command);
            setTerminalOutput(prev => [...prev, ...output]);

            // Only open commit dialog if there are staged changes (output is empty)
            if (output.length === 0 || !output[0]?.includes("Nothing to commit")) {
                openCommitDialog();
            }
            return;
        }

        // Process the command and get output
        const output = commandProcessor.processCommand(command);
        setTerminalOutput(prev => [...prev, ...output]);

        // Skip level completion checks if in playground mode
        if (isPlaygroundMode) {
            return;
        }

        // Check if the command was successful by looking for error messages in the output
        const commandFailed = output.some(
            line =>
                line.toLowerCase().includes("error:") ||
                line.toLowerCase().includes("fatal:") ||
                line.toLowerCase().includes("failed") ||
                line.toLowerCase().includes("not a git repository") ||
                line.toLowerCase().includes("nothing specified") ||
                line.toLowerCase().includes("did not match any files") ||
                (line.toLowerCase().includes("pathspec") && line.toLowerCase().includes("did not match")),
        );

        if (commandFailed) {
            return; // Don't mark level as completed if command failed
        }

        // Check if the command completes the level
        const [cmd, ...args] = command.trim().split(/\s+/);

        // Handle special case for git commands
        if (cmd === "git") {
            // Check Git command with the LevelManager
            if (levelManager.checkLevelCompletion(currentStage, currentLevel, cmd, args, gitRepository)) {
                markLevelAsCompleted();
            }
        } else {
            // For non-Git commands - direct check
            if (levelManager.checkLevelCompletion(currentStage, currentLevel, cmd ?? "", args, gitRepository)) {
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

                // Set up the environment for the next level using LevelManager
                levelManager.setupLevel(stageId, levelId, fileSystem, gitRepository);

                setTerminalOutput([
                    t("terminal.welcome"),
                    t("terminal.levelStarted").replace("{level}", levelId.toString()).replace("{stage}", stageId),
                ]);

                // Close any open editor when switching levels
                setIsLevelFileEditorOpen(false);

                // Sync URL with the new level state
                syncURLWithCurrentLevel();

                return { stageId, levelId };
            } else {
                // Handle case where there's no next level
                setTerminalOutput(prev => [...prev, t("terminal.allLevelsCompleted")]);
                return null;
            }
        }
        return null;
    };

    // Open the FileEditor for a file
    const openFileEditor = (fileName: string, isPlayground = false) => {
        const currentDir = commandProcessor.getCurrentDirectory();
        const filePath = fileName.startsWith("/") ? fileName : `${currentDir}/${fileName}`;
        const content = fileSystem.getFileContents(filePath) ?? "";

        // Set the current file data and open the editor
        if (isPlayground) {
            setCurrentPlaygroundFile({ name: filePath, content });
            setIsPlaygroundFileEditorOpen(true);
        } else {
            setCurrentLevelFile({ name: filePath, content });
            setIsLevelFileEditorOpen(true);
        }
    };

    // Handle file edit (for nano command)
    const handleFileEdit = (path: string, content: string) => {
        // Normalize the path to handle potential double slashes
        const normalizedPath = path.replace(/\/+/g, "/");

        // Determine full path if needed
        const fullPath = normalizedPath.startsWith("/")
            ? normalizedPath
            : `${commandProcessor.getCurrentDirectory()}/${normalizedPath}`.replace(/\/+/g, "/");

        // Write the file
        fileSystem.writeFile(fullPath, content);

        // Update Git status - use path without leading slash
        const gitPath = fullPath.startsWith("/") ? fullPath.substring(1) : fullPath;

        // If the file is staged, it should be shown as both staged and modified
        gitRepository.updateFileStatus(gitPath, "modified");

        // Only add one message to terminal output
        setTerminalOutput(prev => [...prev, t("terminal.fileSaved").replace("{path}", normalizedPath)]);
    };

    // Reset the current level
    const resetCurrentLevel = () => {
        // Set up level with the LevelManager
        levelManager.setupLevel(currentStage, currentLevel, fileSystem, gitRepository);

        setIsLevelCompleted(false);
        setTerminalOutput([
            t("terminal.levelReset"),
            t("terminal.levelStarted").replace("{level}", currentLevel.toString()).replace("{stage}", currentStage),
        ]);

        // Close any open editor when resetting the level
        setIsLevelFileEditorOpen(false);
    };

    // Reset all progress
    const resetAllProgress = () => {
        progressManager.resetProgress();
        gitRepository.reset();

        const defaultStage = "Intro";
        const defaultLevel = 1;

        // Explicitly set to first level
        setCurrentStage(defaultStage);
        setCurrentLevel(defaultLevel);
        setIsLevelCompleted(false);

        // Use LevelManager to setup the first level
        levelManager.setupLevel(defaultStage, defaultLevel, fileSystem, gitRepository);

        setTerminalOutput([
            t("terminal.progressReset"),
            t("terminal.levelStarted").replace("{level}", defaultLevel.toString()).replace("{stage}", defaultStage),
        ]);

        // Close any open editor when resetting all progress
        setIsLevelFileEditorOpen(false);

        // Update URL to reflect reset
        syncURLWithCurrentLevel();
    };

    // Get all editable files
    const getEditableFiles = (): EditableFile[] => {
        const files: EditableFile[] = [];
        const root = fileSystem.getFileSystem() as FileSystemItem;

        // Helper function to recursively collect files
        const collectFiles = (dir: FileSystemItem, path: string) => {
            if (!dir.children) return;

            Object.entries(dir.children).forEach(([name, item]: [string, FileSystemItem]) => {
                const fullPath = path === "/" ? `/${name}` : `${path}/${name}`;

                if (item.type === "file") {
                    // Add files that are likely to be edited (exclude hidden files)
                    if (!name.startsWith(".")) {
                        files.push({ name, path: fullPath });
                    }
                } else if (item.type === "directory" && !name.startsWith(".")) {
                    // Recursively process subdirectories (exclude hidden dirs)
                    collectFiles(item, fullPath);
                }
            });
        };

        collectFiles(root, "/");
        return files;
    };

    // Determine current file based on environment
    const getCurrentFile = () => {
        if (typeof window !== "undefined" && window.location.pathname.includes("/playground")) {
            return currentPlaygroundFile;
        }
        return currentLevelFile;
    };

    const handleLevelFromUrl = useCallback(
        (stageId: string, levelId: number) => {
            // Only update if different from current values to prevent loops
            if (stageId !== currentStage || levelId !== currentLevel) {
                console.log(`Loading level from URL: ${stageId}-${levelId}`);

                // First set up the environment
                levelManager.setupLevel(stageId, levelId, fileSystem, gitRepository);

                // Then update state in a single batch to prevent cascading renders
                setCurrentStage(stageId);
                setCurrentLevel(levelId);
                setIsLevelCompleted(progressManager.isLevelCompleted(stageId, levelId));

                // Update terminal output
                setTerminalOutput([
                    t("terminal.welcome"),
                    t("terminal.levelStarted").replace("{level}", levelId.toString()).replace("{stage}", stageId),
                ]);

                // Update localStorage last
                progressManager.setCurrentLevel(stageId, levelId);
            }
        },
        [currentStage, currentLevel, fileSystem, gitRepository, levelManager, progressManager, t],
    );

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
        isAdvancedMode,
        currentFile: getCurrentFile(),

        handleCommand,
        handleNextLevel,
        handleFileEdit,
        resetCurrentLevel,
        resetAllProgress,
        openFileEditor,
        setIsFileEditorOpen,
        resetTerminalForPlayground,
        resetTerminalForLevel,
        toggleAdvancedMode,
        getEditableFiles,
        syncURLWithCurrentLevel,
        handleLevelFromUrl,
        isCommitDialogOpen,
        handleCommit,
        closeCommitDialog,
        openCommitDialog,
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
