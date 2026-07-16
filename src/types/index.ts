import type { CommandProcessor } from "~/models/CommandProcessor";
import type { FileSystem } from "~/models/FileSystem";
import type { LevelManager } from "~/models/LevelManager";
import type { ProgressManager } from "~/models/ProgressManager";
import type { GitRepository } from "~/models/GitRepository";

// Difficulty levels
export type DifficultyLevel = "beginner" | "advanced" | "pro";

// Difficulty configuration
export interface DifficultyConfig {
    id: DifficultyLevel;
    name: string;
    description: string;
    icon: string;
    color: string;
    stages: string[];
    maxPoints: number;
}

export interface FileSystemItem {
    type: "file" | "directory";
    name: string;
    content?: string;
    children?: Record<string, FileSystemItem>;
    lastModified?: Date;
}

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
    remoteCommits?: {
        branch: string;
        commits: {
            id: string;
            message: string;
            files: Record<string, string>; // file path -> content
        }[];
    }[];
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
    completedObjectives?: number[]; // Track which objectives are completed (by objectiveId)
    story?: StoryContext;
    resetGitRepo?: boolean;
    initialState?: LevelInitialState;
};

// The rest of the types remain mostly the same
export type LevelRequirement = {
    id: string; // Required - unique identifier for tracking completion
    objectiveId?: number; // Group requirements by objective - all requirements with same objectiveId must complete to check off objective
    command: string;
    alternativeCommands?: string[]; // Alternative commands that also fulfill this requirement
    requiresArgs?: string[];
    description: string;
    successMessage?: string;
    completed?: boolean; // Track if requirement is fulfilled
    // State-based checks (alternative to command-based)
    checkFileChanged?: string; // Check if this file has been modified (path like "/team.md")
    checkFileExists?: string; // Check if this file exists
    checkBranchExists?: string; // Check if this branch exists
    // Repository-state guards (evaluated as an AND-condition after the command/args match).
    // They verify the actual result of a command instead of trusting the typed string.
    checkTagExists?: string; // A specific tag name, or "*" for "any tag exists"
    checkMergeExists?: boolean; // True if a merge commit exists in the current branch's history
    checkCommitCountAtLeast?: number; // Current branch must have at least N commits
    checkCommitMessageContains?: string; // Some commit on the current branch contains this substring
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

// Base CommandType with shared properties
export type CommandType = {
    name: string;
    description: string;
    usage: string;
    example?: string;
    explanation?: string;
};

// GitCommand extends CommandType with additional properties
export type GitCommand = CommandType & {
    requiresInitializedRepo?: boolean;
};

// FileStatus enum for better type safety
export type FileStatus = "untracked" | "modified" | "staged" | "committed" | "deleted" | "staged+modified";

// GitStatus type
export type GitStatus = Record<string, FileStatus>;

// FileSystemItem with improved optional handling
export interface FileSystemItem {
    type: "file" | "directory";
    name: string;
    content?: string;
    children?: Record<string, FileSystemItem>;
    lastModified?: Date;
}

// FileEditorState to consolidate file editor related state
export type FileEditorState = {
    isOpen: boolean;
    fileName: string;
    content: string;
    mode: "level" | "playground";
};

// UserProgress with better typing
export type UserProgress = {
    completedLevels: Record<string, number[]>;
    currentStage: string;
    currentLevel: number;
    score: number; // Progress points (doesn't decrease when spending)
    coins: number; // Currency for shop (can be spent)
    lastSavedAt: string;
    purchasedItems: string[];
    completedMinigames: string[];
    minigameScores: Record<string, number>;
    doubleXpUntil?: string | null; // ISO string date when double XP expires
    gitGudActivated?: boolean; // Easter egg - has the player discovered "git gud"?
};

// Git commit definition with better types
export type GitCommit = {
    message: string;
    files: string[];
    branch?: string; // Optional branch to switch to before committing
};

// Consolidated types for GameContext
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
    shouldShowStoryDialog: boolean;
    currentDifficulty: DifficultyLevel;
    currentFile: { name: string; content: string };
    isCommitDialogOpen: boolean;

    // Functions
    handleCommand: (command: string, isPlaygroundMode?: boolean) => void;
    handleNextLevel: () => { stageId?: string; levelId: number } | null;
    handleFileEdit: (path: string, content: string) => void;
    resetCurrentLevel: () => void;
    resetAllProgress: () => void;
    resetTerminalForPlayground: () => void;
    resetTerminalForLevel: () => void;
    openFileEditor: (fileName: string, isPlayground?: boolean) => void;
    openCommitDialog: () => void;
    setIsFileEditorOpen: (isOpen: boolean) => void;
    toggleAdvancedMode: () => void;
    getEditableFiles: () => Array<{ name: string; path: string }>;
    syncURLWithCurrentLevel: () => void;
    handleLevelFromUrl: (stageId: string, levelId: number) => void;
    setShouldShowStoryDialog: (show: boolean) => void;
    setCurrentDifficulty: (difficulty: DifficultyLevel) => void;
    handleCommit: (message: string) => void;
    closeCommitDialog: () => void;

    // Debug functions
    debugGiveMoney: (amount: number) => void;
    debugUnlockAllLevels: () => void;
    debugLockAllLevels: () => void;
    debugCompleteCurrentLevel: () => void;
}
