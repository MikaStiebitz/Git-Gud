import type {
    LevelType,
    LevelRequirement,
    StoryContext,
    FileStructure,
    GitState,
    LevelInitialState,
    StageType,
} from "~/types";

/**
 * Creates a Level configuration with type checking
 */
export function createLevel(params: {
    id: number;
    name: string;
    description: string;
    objectives: string[];
    hints: string[];
    requirements: LevelRequirement[];
    story?: StoryContext;
    resetGitRepo?: boolean;
    initialState?: {
        files?: FileStructure[];
        git?: GitState;
    };
}): LevelType {
    return {
        id: params.id,
        name: params.name,
        description: params.description,
        objectives: params.objectives,
        hints: params.hints,
        requirements: params.requirements,
        story: params.story,
        resetGitRepo: params.resetGitRepo,
        initialState: params.initialState,
    };
}

/**
 * Creates a Story context with type checking
 */
export function createStory(params: {
    title: string;
    narrative: string;
    realWorldContext: string;
    taskIntroduction: string;
}): StoryContext {
    return {
        title: params.title,
        narrative: params.narrative,
        realWorldContext: params.realWorldContext,
        taskIntroduction: params.taskIntroduction,
    };
}

/**
 * Creates a Level requirement with type checking
 */
export function createRequirement(params: {
    command: string;
    requiresArgs?: string[];
    description: string;
    successMessage?: string;
}): LevelRequirement {
    return {
        command: params.command,
        requiresArgs: params.requiresArgs,
        description: params.description,
        successMessage: params.successMessage,
    };
}

/**
 * Creates a file structure for a level
 */
export function createFileStructure(path: string, content: string): FileStructure {
    return { path, content };
}

/**
 * Creates a Git state configuration
 */
export function createGitState(params: {
    initialized: boolean;
    currentBranch?: string;
    branches?: string[];
    commits?: {
        message: string;
        files: string[];
        branch?: string;
    }[];
    fileChanges?: {
        path: string;
        content?: string;
        status: "modified" | "untracked" | "deleted" | "staged" | "committed";
    }[];
    mergeConflicts?: {
        file: string;
        content: string;
        branch1?: string;
        branch2?: string;
    }[];
}): GitState {
    return {
        initialized: params.initialized,
        currentBranch: params.currentBranch,
        branches: params.branches,
        commits: params.commits,
        fileChanges: params.fileChanges,
        mergeConflicts: params.mergeConflicts,
    };
}

/**
 * Creates an initial level state
 */
export function createInitialState(params: { files?: FileStructure[]; git?: GitState }): LevelInitialState {
    return {
        files: params.files,
        git: params.git,
    };
}

/**
 * Creates merge conflict content
 */
export function createMergeConflictContent(
    currentBranchContent: string,
    otherBranchContent: string,
    surroundingContent = "",
): string {
    return `${surroundingContent}
<<<<<<< HEAD
${currentBranchContent}
=======
${otherBranchContent}
>>>>>>> branch-name
${surroundingContent}`;
}

/**
 * Creates a Stage with type checking
 */
export function createStage(params: {
    id: string;
    name: string;
    description: string;
    icon: string;
    levels: Record<number, LevelType>;
}): StageType {
    return {
        id: params.id,
        name: params.name,
        description: params.description,
        icon: params.icon,
        levels: params.levels,
    };
}
