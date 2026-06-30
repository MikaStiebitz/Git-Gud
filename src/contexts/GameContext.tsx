"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CommandProcessor } from "~/models/CommandProcessor";
import { FileSystem } from "~/models/FileSystem";
import { LevelManager } from "~/models/LevelManager";
import { ProgressManager } from "~/models/ProgressManager";
import { GitRepository } from "~/models/GitRepository";
import { splitCommandRespectingQuotes } from "~/commands/base/CommandParser";
import { resolvePath } from "~/lib/utils";
import type { GameContextProps, DifficultyLevel } from "~/types";
import { useLanguage } from "~/contexts/LanguageContext";
import { useSoundManager } from "~/lib/SoundManager";

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
    const [progressManager] = useState<ProgressManager>(new ProgressManager());
    const [commandProcessor] = useState<CommandProcessor>(
        new CommandProcessor(fileSystem, gitRepository, progressManager),
    );
    const [levelManager] = useState<LevelManager>(new LevelManager());
    const { t } = useLanguage();

    // Initialize sound manager with purchased status
    const hasSoundPack = progressManager.getPurchasedItems().includes("victory-sound");
    const { playSound } = useSoundManager(hasSoundPack);

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

    // Advanced mode state - initialize with false to avoid hydration mismatch
    const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);

    // Story dialog trigger state
    const [shouldShowStoryDialog, setShouldShowStoryDialog] = useState<boolean>(false);

    // Difficulty system state - initialize with default to avoid hydration mismatch
    const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>("beginner");

    // Load values from localStorage after mount to avoid hydration issues
    useEffect(() => {
        const savedAdvancedMode = localStorage.getItem("gitgud-advanced-mode") === "true";
        const savedDifficulty = (localStorage.getItem("gitgud-difficulty") as DifficultyLevel) || "beginner";

        setIsAdvancedMode(savedAdvancedMode);
        setCurrentDifficulty(savedDifficulty);
    }, []);

    // Initialize level state on mount - ensures git is set up after page reload
    useEffect(() => {
        const progress = progressManager.getProgress();
        levelManager.setupLevel(progress.currentStage, progress.currentLevel, fileSystem, gitRepository);
        // Reset command processor's current directory to root
        commandProcessor.setCurrentDirectory("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty deps = runs once on mount

    // Toggle advanced mode
    const toggleAdvancedMode = () => {
        setIsAdvancedMode(prev => {
            const newMode = !prev;
            if (typeof window !== "undefined") localStorage.setItem("gitgud-advanced-mode", newMode.toString());
            return newMode;
        });
    };

    // Update difficulty level
    const handleSetCurrentDifficulty = (difficulty: DifficultyLevel) => {
        setCurrentDifficulty(difficulty);
        if (typeof window !== "undefined") {
            localStorage.setItem("gitgud-difficulty", difficulty);
        }
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

        // Close the dialog after committing
        closeCommitDialog();

        // Check for level completion after dialog commit (only if not in playground mode)
        if (typeof window !== "undefined" && !window.location.pathname.includes("/playground")) {
            const [cmd, ...args] = splitCommandRespectingQuotes(`git commit -m "${escapedMessage}"`.trim());
            if (cmd && levelManager.checkLevelCompletion(currentStage, currentLevel, cmd, args, gitRepository)) {
                markLevelAsCompleted();
            }
        }
    };

    // Sync URL with current level state
    const syncURLWithCurrentLevel = useCallback(() => {
        if (typeof window !== "undefined") {
            const pathname = window.location.pathname;
            // Check if we're on a level page (matches pattern /[level])
            if (
                pathname !== "/" &&
                !pathname.includes("/playground") &&
                !pathname.includes("/faq") &&
                !pathname.includes("/installation") &&
                !pathname.includes("/impressum")
            ) {
                // Validate that current stage and level are valid before updating URL
                const stage = levelManager.getStage(currentStage);
                if (!stage) {
                    console.warn(`Invalid stage: ${currentStage}`);
                    return;  // Don't update URL if stage is invalid
                }

                if (currentLevel < 1) {
                    console.warn(`Invalid level: ${currentLevel}`);
                    return;  // Don't update URL if level is invalid
                }

                const currentParams = new URLSearchParams(window.location.search);
                const currentStageParam = currentParams.get("stage");
                const currentLevelParam = currentParams.get("level");

                // Only update URL if the parameters have actually changed
                if (currentStageParam !== currentStage || currentLevelParam !== currentLevel.toString()) {
                    router.replace(`/${currentStage.toLowerCase()}?stage=${currentStage}&level=${currentLevel}`, {
                        scroll: false,
                    });
                }
            }
        }
    }, [currentStage, currentLevel, router, levelManager]);

    // Add a function to reset terminal for playground mode
    const resetTerminalForPlayground = () => {
        // First reset the git repository to ensure a clean state
        gitRepository.reset();

        // Completely clear the file system and rebuild it with fresh state
        fileSystem.reset();
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
        if (command.trim() === "next") {
            // Playground mode: next command is disabled
            if (isPlaygroundMode) {
                setTerminalOutput(prev => [...prev, "The 'next' command is not available in Playground mode."]);
                return;
            }

            // Normal mode: level not complete
            if (!isLevelCompleted) {
                setTerminalOutput(prev => [...prev, "You must complete the level before using 'next'."]);
                return;
            }

            // Normal mode: level is complete → proceed
            handleNextLevel();
            return;
        }

        // Special case for nano command - handle it directly
        if (command.trim().startsWith("nano ")) {
            const args = splitCommandRespectingQuotes(command.trim());
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
            // Level completion check will happen in handleCommit() after user provides the message
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
        // Note: "merge failed" due to conflicts is NOT a command failure - it's a normal workflow state
        const commandFailed = output.some(line => {
            const lowerLine = line.toLowerCase();
            // Merge conflicts are not failures - they're normal workflow states
            if (lowerLine.includes("merge") && lowerLine.includes("failed")) {
                return false;
            }
            if (lowerLine.includes("automatic merge failed")) {
                return false;
            }
            return (
                lowerLine.includes("error:") ||
                lowerLine.includes("fatal:") ||
                lowerLine.includes("failed") ||
                lowerLine.includes("not a git repository") ||
                lowerLine.includes("nothing specified") ||
                lowerLine.includes("did not match any files") ||
                (lowerLine.includes("pathspec") && lowerLine.includes("did not match"))
            );
        });

        if (commandFailed) {
            return; // Don't mark level as completed if command failed
        }

        // Check if the command completes the level
        const [cmd, ...args] = splitCommandRespectingQuotes(command.trim());

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

            // Play victory sound if purchased
            if (progressManager.getPurchasedItems().includes("victory-sound")) {
                playSound("levelComplete");
            }

            // Trigger mascot success animation if purchased
            if (progressManager.getPurchasedItems().includes("git-mascot")) {
                // This will trigger the mascot success animation
                interface WindowWithMascot extends Window {
                    triggerMascotSuccess?: () => void;
                }
                if (typeof window !== "undefined") {
                    const windowWithMascot = window as WindowWithMascot;
                    windowWithMascot.triggerMascotSuccess?.();
                }
            }
        }
    };

    // Move to the next level
    const handleNextLevel = () => {
        if (isLevelCompleted) {
            const { stageId, levelId } = levelManager.getNextLevel(currentStage, currentLevel, currentDifficulty);

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

                // Trigger story dialog for the new level (if not in advanced mode)
                if (!isAdvancedMode) {
                    setShouldShowStoryDialog(true);
                }

                // Sync URL with the new level state
                syncURLWithCurrentLevel();

                return { stageId, levelId };
            } else {
                // Handle case where there's no next level in current difficulty - redirect to home immediately
                // Show completion message with GitHub star request
                const completionMessages = [
                    t("terminal.difficultyCompleted"),
                    "",
                    t("terminal.githubStar"),
                    t("terminal.githubLink"),
                    "",
                    t("terminal.redirectingHome"),
                ];

                setTerminalOutput(prev => [...prev, ...completionMessages]);

                // Ensure story dialog doesn't show during redirect
                setShouldShowStoryDialog(false);

                // Redirect to home page immediately without story dialog delay
                setTimeout(() => {
                    if (typeof window !== "undefined") {
                        router.push("/");
                    }
                }, 2000); // Shorter delay, just enough to read the message

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
        // Use resolvePath for consistent and complete path normalization
        // This handles ./, ../, double slashes, and relative paths properly
        const currentDir = commandProcessor.getCurrentDirectory();
        const fullPath = resolvePath(path, currentDir);

        // Write the file
        fileSystem.writeFile(fullPath, content);

        // Update Git status - use path without leading slash
        const gitPath = fullPath.startsWith("/") ? fullPath.substring(1) : fullPath;

        // If the file is staged, it should be shown as both staged and modified
        gitRepository.updateFileStatus(gitPath, "modified");

        // Only add one message to terminal output
        setTerminalOutput(prev => [...prev, t("terminal.fileSaved").replace("{path}", path)]);

        // Check state-based requirements (like file modified checks)
        if (levelManager.checkStateBasedRequirements(currentStage, currentLevel, gitRepository, fileSystem)) {
            markLevelAsCompleted();
        }
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
            const levelChanged = stageId !== currentStage || levelId !== currentLevel;

            // If level changed, set up the environment and update state
            if (levelChanged) {
                console.log(`Loading level from URL: ${stageId}-${levelId}`);

                // First set up the environment
                levelManager.setupLevel(stageId, levelId, fileSystem, gitRepository);

                // Reset the command processor's current directory to "/"
                // This ensures path resolution works correctly in the new level
                commandProcessor.setCurrentDirectory("/");

                // Close any open file editor when switching levels
                setIsLevelFileEditorOpen(false);

                // Then update state in a single batch to prevent cascading renders
                setCurrentStage(stageId);
                setCurrentLevel(levelId);
                setIsLevelCompleted(progressManager.isLevelCompleted(stageId, levelId));

                // Update localStorage last
                progressManager.setCurrentLevel(stageId, levelId);
            }

            // Always update terminal output to ensure it shows the correct level
            // This fixes the issue where terminal shows previous level after navigation
            setTerminalOutput([
                t("terminal.welcome"),
                t("terminal.levelStarted").replace("{level}", levelId.toString()).replace("{stage}", stageId),
            ]);
        },
        [currentStage, currentLevel, fileSystem, gitRepository, levelManager, progressManager, commandProcessor, t],
    );

    // Debug functions
    const debugGiveMoney = useCallback(
        (amount: number) => {
            // Add money to progress using the existing addCoins method
            progressManager.addCoins(amount);
            console.log(`Debug: Added ${amount} coins. Total: ${progressManager.getCoins()}`);
        },
        [progressManager],
    );

    const debugUnlockAllLevels = useCallback(() => {
        // Complete all levels in the correct order to unlock them
        const stages = [
            "Intro",
            "Files",
            "Branches",
            "Workflow",
            "TeamWork",
            "Merge",
            "Reset",
            "Stash",
            "Advanced",
            "Archaeology",
            "Mastery",
        ];

        stages.forEach(stage => {
            for (let level = 1; level <= 5; level++) {
                progressManager.completeLevel(stage, level);
            }
        });
        console.log("Debug: Completed all levels (unlocked)");
    }, [progressManager]);

    const debugLockAllLevels = useCallback(() => {
        // Reset all progress to lock all levels
        progressManager.resetProgress();
        console.log("Debug: Reset all progress (locked all levels)");
    }, [progressManager]);

    const debugCompleteCurrentLevel = useCallback(() => {
        if (currentStage && currentLevel) {
            progressManager.completeLevel(currentStage, currentLevel);
            setIsLevelCompleted(true);
            console.log(`Debug: Completed ${currentStage} level ${currentLevel}`);
        }
    }, [currentStage, currentLevel, progressManager]);

    const addPoints = (amount: number) => {
        progressManager.addCoins(amount);
    };

    const addXP = (amount: number) => {
        progressManager.addScore(amount);
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
        isAdvancedMode,
        shouldShowStoryDialog,
        currentDifficulty,
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
        setShouldShowStoryDialog,
        setCurrentDifficulty: handleSetCurrentDifficulty,
        isCommitDialogOpen,
        handleCommit,
        closeCommitDialog,
        openCommitDialog,
        addPoints,
        addXP,

        // Debug functions
        debugGiveMoney,
        debugUnlockAllLevels,
        debugLockAllLevels,
        debugCompleteCurrentLevel,
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
