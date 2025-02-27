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
};

export type GitCommand = CommandType & {
    requiresInitializedRepo?: boolean;
};

export type FileStatus = "untracked" | "modified" | "staged" | "committed";

export type GitStatus = Record<string, FileStatus>;

export interface FileSystemItem {
    type: "file" | "directory";
    name: string;
    content?: string;
    children?: Record<string, FileSystemItem>;
    lastModified?: Date;
}

export type LevelRequirement = {
    command: string;
    requiresArgs?: string[];
    description: string;
    successMessage?: string;
};

export type StageType = {
    id: string;
    name: string;
    description: string;
    icon: string;
    levels: Record<number, LevelType>;
};

export type LevelType = {
    id: number;
    name: string;
    description: string;
    objectives: string[];
    hints: string[];
    requirements: LevelRequirement[];
};

export type UserProgress = {
    completedLevels: Record<string, number[]>;
    currentStage: string;
    currentLevel: number;
    score: number;
    lastSavedAt: string;
};
