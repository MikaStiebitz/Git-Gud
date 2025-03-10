import type { CommandProcessor } from "~/models/CommandProcessor";
import type { FileSystem } from "~/models/FileSystem";
import type { LevelManager } from "~/models/LevelManager";
import type { ProgressManager } from "~/models/ProgressManager";
import type { GitRepository } from "~/models/GitRepository";

// GameContext Props Definition
export interface GameContextProps {
    // Models
    fileSystem: FileSystem;
    gitRepository: GitRepository;
    commandProcessor: CommandProcessor;
    levelManager: LevelManager;
    progressManager: ProgressManager;

    // State variables
    currentStage: string;
    currentLevel: number;
    isLevelCompleted: boolean;
    terminalOutput: string[];
    isFileEditorOpen: boolean;
    isAdvancedMode: boolean;
    currentFile: { name: string; content: string };

    // Functions
    handleCommand: (command: string, isPlaygroundMode: boolean) => void;
    handleNextLevel: () => void;
    handleFileEdit: (path: string, content: string) => void;
    resetCurrentLevel: () => void;
    resetAllProgress: () => void;
    resetTerminalForPlayground: () => void;
    openFileEditor: (fileName: string, isPlayground?: boolean) => void;
    setIsFileEditorOpen: (isOpen: boolean) => void;
    toggleAdvancedMode: () => void;
    resetTerminalForLevel: () => void;
    getEditableFiles: () => { name: string; path: string }[];
    syncURLWithCurrentLevel: () => void; // Added this function
}

// Base Types
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

export type UserProgress = {
    completedLevels: Record<string, number[]>;
    currentStage: string;
    currentLevel: number;
    score: number;
    lastSavedAt: string;
};

// Stash related types
export type GitStashEntry = {
    message: string;
    timestamp: Date;
    changes: Record<string, string>;
};

// Remote repository types
export type RemoteRepository = {
    name: string;
    url: string;
};

export type FileStructure = {
    path: string;
    content: string;
};

// Git commit definition
export type GitCommit = {
    message: string;
    files: string[];
    branch?: string; // Optional branch to switch to before committing
};

// File change definition
export type FileChange = {
    path: string;
    content?: string;
    status: "modified" | "untracked" | "deleted" | "staged" | "committed";
};

// Merge conflict definition
export type MergeConflict = {
    file: string;
    content: string; // Conflicted content with <<<<<<< HEAD, =======, etc. markers
    branch1?: string;
    branch2?: string;
};

// Git repository state
export type GitState = {
    initialized: boolean;
    currentBranch?: string;
    branches?: string[];
    commits?: GitCommit[];
    fileChanges?: FileChange[];
    mergeConflicts?: MergeConflict[];
};

// Initial state for a level
export type LevelInitialState = {
    files?: FileStructure[];
    git?: GitState;
};

// Level types
export type LevelType = {
    id: number;
    name: string;
    description: string;
    objectives: string[];
    hints: string[];
    requirements: LevelRequirement[];
    requirementLogic?: "any" | "all";
    completedRequirements?: string[];
    story?: StoryContext;
    resetGitRepo?: boolean;
    initialState?: LevelInitialState;
};

// The rest of the types remain mostly the same
export type LevelRequirement = {
    id?: string;
    command: string;
    requiresArgs?: string[];
    description: string;
    successMessage?: string;
};

export type StoryContext = {
    title: string;
    narrative: string;
    realWorldContext: string;
    taskIntroduction: string;
};

export type StageType = {
    id: string;
    name: string;
    description: string;
    icon: string;
    levels: Record<number, LevelType>;
};
