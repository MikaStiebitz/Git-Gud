import type { CommandProcessor } from "~/models/CommandProcessor";
import type { FileSystem } from "~/models/FileSystem";
import type { LevelManager } from "~/models/LevelManager";
import type { ProgressManager } from "~/models/ProgressManager";
import type { GitRepository } from "~/models/GitRepository";

// GameContext Props Definition
export interface GameContextProps {
    // Modelle
    fileSystem: FileSystem;
    gitRepository: GitRepository;
    commandProcessor: CommandProcessor;
    levelManager: LevelManager;
    progressManager: ProgressManager;

    // Zustandsvariablen
    currentStage: string;
    currentLevel: number;
    isLevelCompleted: boolean;
    terminalOutput: string[];
    isFileEditorOpen: boolean;
    isAdvancedMode: boolean;

    // Funktionen
    handleCommand: (command: string, isPlaygroundMode: boolean) => void;
    handleNextLevel: () => void;
    handleFileEdit: (path: string, content: string) => void;
    resetCurrentLevel: () => void;
    resetAllProgress: () => void;
    resetTerminalForPlayground: () => void;
    openFileEditor: (fileName: string) => void;
    setIsFileEditorOpen: (isOpen: boolean) => void;
    toggleAdvancedMode: () => void;
    resetTerminalForLevel: () => void;
    getEditableFiles: () => { name: string; path: string }[];
}

// Basis-Typen
export type CommandType = {
    name: string;
    description: string;
    usage: string;
    examples?: string[];
    args?: {
        name: string;
        description: string;
        required?: boolean;
    }[];
    example?: string;
    explanation?: string;
};

export type GitCommand = CommandType & {
    requiresInitializedRepo?: boolean;
};

export type FileStatus = "untracked" | "modified" | "staged" | "committed" | "deleted";

export type GitStatus = Record<string, FileStatus>;

export interface FileSystemItem {
    type: "file" | "directory";
    name: string;
    content?: string;
    children?: Record<string, FileSystemItem>;
    lastModified?: Date;
}

export type StoryContext = {
    title: string;
    narrative: string;
    realWorldContext: string;
    taskIntroduction: string;
};

export type LevelRequirement = {
    command: string;
    requiresArgs?: string[];
    description: string;
    successMessage?: string;
};

export type LevelType = {
    id: number;
    name: string;
    description: string;
    objectives: string[];
    hints: string[];
    requirements: LevelRequirement[];
    story: StoryContext;
    resetGitRepo?: boolean;
};

export type StageType = {
    id: string;
    name: string;
    description: string;
    icon: string;
    levels: Record<number, LevelType>;
};

export type UserProgress = {
    completedLevels: Record<string, number[]>;
    currentStage: string;
    currentLevel: number;
    score: number;
    lastSavedAt: string;
};
