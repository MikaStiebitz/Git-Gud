import React, { createContext, useContext, useState, useEffect } from "react";
import { CommandProcessor } from "~/models/CommandProcessor";
import { FileSystem } from "~/models/FileSystem";
import { LevelManager } from "~/models/LevelManager";
import { ProgressManager } from "~/models/ProgressManager";
import { GitRepository } from "~/models/GitRepository";

interface GameContextProps {
    fileSystem: FileSystem;
    gitRepository: GitRepository;
    commandProcessor: CommandProcessor;
    levelManager: LevelManager;
    progressManager: ProgressManager;
    currentStage: string;
    currentLevel: number;
    isLevelCompleted: boolean;
    terminalOutput: string[];

    handleCommand: (command: string) => void;
    handleNextLevel: () => void;
    handleFileEdit: (path: string, content: string) => void;
    resetCurrentLevel: () => void;
    resetAllProgress: () => void;

    // Add more functions as needed
}

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

    // Load saved progress on mount
    useEffect(() => {
        const savedProgress = progressManager.getProgress();
        setCurrentStage(savedProgress.currentStage);
        setCurrentLevel(savedProgress.currentLevel);
        setIsLevelCompleted(progressManager.isLevelCompleted(savedProgress.currentStage, savedProgress.currentLevel));
    }, []);

    // Process a command and update the state
    const handleCommand = (command: string) => {
        setTerminalOutput(prev => [...prev, `$ ${command}`]);

        const [cmd, ...args] = command.trim().split(/\s+/);
        const output = commandProcessor.processCommand(command);

        setTerminalOutput(prev => [...prev, ...output]);

        // Check if the command completes the current level
        if (levelManager.checkLevelCompletion(currentStage, currentLevel, cmd, args)) {
            if (!isLevelCompleted) {
                setIsLevelCompleted(true);
                progressManager.completeLevel(currentStage, currentLevel);
                setTerminalOutput(prev => [
                    ...prev,
                    "🎉 Level abgeschlossen! Gut gemacht! 🎉",
                    "Tippe 'next' ein oder klicke auf 'Nächstes Level', um fortzufahren.",
                ]);
            }
        }
    };

    // Move to the next level
    const handleNextLevel = () => {
        if (isLevelCompleted) {
            const { stageId, levelId } = levelManager.getNextLevel(currentStage, currentLevel);
            setCurrentStage(stageId);
            setCurrentLevel(levelId);
            setIsLevelCompleted(progressManager.isLevelCompleted(stageId, levelId));
            progressManager.setCurrentLevel(stageId, levelId);

            // Reset for next level
            gitRepository.reset();

            setTerminalOutput([
                "Willkommen im Git Terminal Simulator!",
                `Level ${levelId} von ${stageId} gestartet. Gib 'help' ein für Hilfe.`,
            ]);
        }
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

        handleCommand,
        handleNextLevel,
        handleFileEdit,
        resetCurrentLevel,
        resetAllProgress,
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
