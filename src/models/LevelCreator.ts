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
        status: "modified" | "untracked" | "deleted" | "staged";
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

// ===== LEVEL DEFINITIONS =====

// ===== INTRO STAGE =====
const introLevel1 = createLevel({
    id: 1,
    name: "intro.level1.name",
    description: "intro.level1.description",
    objectives: ["intro.level1.objective1"],
    hints: ["intro.level1.hint1", "intro.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git init",
            description: "intro.level1.requirement1.description",
            successMessage: "intro.level1.requirement1.success",
        }),
    ],
    resetGitRepo: true,
    story: createStory({
        title: "intro.level1.story.title",
        narrative: "intro.level1.story.narrative",
        realWorldContext: "intro.level1.story.realWorldContext",
        taskIntroduction: "intro.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Learning Game\n\nWelcome to the Git learning game!"),
            createFileStructure("/src/index.js", 'console.log("Hello, Git!");'),
        ],
        git: createGitState({
            initialized: false, // Git not initialized for this level
        }),
    }),
});

const introLevel2 = createLevel({
    id: 2,
    name: "intro.level2.name",
    description: "intro.level2.description",
    objectives: ["intro.level2.objective1"],
    hints: ["intro.level2.hint1", "intro.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git status",
            description: "intro.level2.requirement1.description",
            successMessage: "intro.level2.requirement1.success",
        }),
    ],
    story: createStory({
        title: "intro.level2.story.title",
        narrative: "intro.level2.story.narrative",
        realWorldContext: "intro.level2.story.realWorldContext",
        taskIntroduction: "intro.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Learning Game\n\nWelcome to the Git learning game!"),
            createFileStructure("/src/index.js", 'console.log("Hello, Git!");'),
        ],
        git: createGitState({
            initialized: true, // Git already initialized for this level
            currentBranch: "main",
        }),
    }),
});

// ===== FILES STAGE =====
const filesLevel1 = createLevel({
    id: 1,
    name: "files.level1.name",
    description: "files.level1.description",
    objectives: ["files.level1.objective1"],
    hints: ["files.level1.hint1", "files.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git add",
            requiresArgs: ["."],
            description: "files.level1.requirement1.description",
            successMessage: "files.level1.requirement1.success",
        }),
    ],
    story: createStory({
        title: "files.level1.story.title",
        narrative: "files.level1.story.narrative",
        realWorldContext: "files.level1.story.realWorldContext",
        taskIntroduction: "files.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Project\n\nThis is a README file for our Git project."),
            createFileStructure("/src/index.js", 'console.log("Hello, world!");'),
            createFileStructure("/src/app.js", 'const app = () => {\n  console.log("App started");\n};\n\napp();'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            // All files are untracked in this level
            fileChanges: [
                { path: "/README.md", status: "untracked" },
                { path: "/src/index.js", status: "untracked" },
                { path: "/src/app.js", status: "untracked" },
            ],
        }),
    }),
});

const filesLevel2 = createLevel({
    id: 2,
    name: "files.level2.name",
    description: "files.level2.description",
    objectives: ["files.level2.objective1"],
    hints: ["files.level2.hint1", "files.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git commit",
            requiresArgs: ["-m"],
            description: "files.level2.requirement1.description",
            successMessage: "files.level2.requirement1.success",
        }),
    ],
    story: createStory({
        title: "files.level2.story.title",
        narrative: "files.level2.story.narrative",
        realWorldContext: "files.level2.story.realWorldContext",
        taskIntroduction: "files.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Project\n\nThis is a README file for our Git project."),
            createFileStructure("/src/index.js", 'console.log("Hello, world!");'),
            createFileStructure("/src/app.js", 'const app = () => {\n  console.log("App started");\n};\n\napp();'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            // All files are already staged
            fileChanges: [
                { path: "/README.md", status: "staged" },
                { path: "/src/index.js", status: "staged" },
                { path: "/src/app.js", status: "staged" },
            ],
        }),
    }),
});

const filesLevel3 = createLevel({
    id: 3,
    name: "files.level3.name",
    description: "files.level3.description",
    objectives: ["files.level3.objective1"],
    hints: ["files.level3.hint1", "files.level3.hint2"],
    requirements: [
        createRequirement({
            command: "git rm",
            requiresArgs: ["any"],
            description: "files.level3.requirement1.description",
            successMessage: "files.level3.requirement1.success",
        }),
    ],
    story: createStory({
        title: "files.level3.story.title",
        narrative: "files.level3.story.narrative",
        realWorldContext: "files.level3.story.realWorldContext",
        taskIntroduction: "files.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Project\n\nThis is a README file for our Git project."),
            createFileStructure("/src/index.js", 'console.log("Hello, world!");'),
            createFileStructure("/src/app.js", 'const app = () => {\n  console.log("App started");\n};\n\napp();'),
            createFileStructure("/temp.txt", "This is a temporary file that should be removed."),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            // All files are already committed
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/index.js", "/src/app.js", "/temp.txt"],
                },
            ],
            // A file we want to remove
            fileChanges: [{ path: "/temp.txt", status: "committed" }],
        }),
    }),
});

// ===== BRANCHES STAGE =====
const branchesLevel1 = createLevel({
    id: 1,
    name: "branches.level1.name",
    description: "branches.level1.description",
    objectives: ["branches.level1.objective1"],
    hints: ["branches.level1.hint1", "branches.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git branch",
            description: "branches.level1.requirement1.description",
            successMessage: "branches.level1.requirement1.success",
        }),
    ],
    story: createStory({
        title: "branches.level1.story.title",
        narrative: "branches.level1.story.narrative",
        realWorldContext: "branches.level1.story.realWorldContext",
        taskIntroduction: "branches.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Branch Project\n\nA project for learning about Git branches."),
            createFileStructure("/src/main.js", 'console.log("Main branch");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"],
                },
            ],
        }),
    }),
});

const branchesLevel2 = createLevel({
    id: 2,
    name: "branches.level2.name",
    description: "branches.level2.description",
    objectives: ["branches.level2.objective1"],
    hints: ["branches.level2.hint1", "branches.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git checkout",
            requiresArgs: ["-b"],
            description: "branches.level2.requirement1.description",
            successMessage: "branches.level2.requirement1.success",
        }),
    ],
    story: createStory({
        title: "branches.level2.story.title",
        narrative: "branches.level2.story.narrative",
        realWorldContext: "branches.level2.story.realWorldContext",
        taskIntroduction: "branches.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Branch Project\n\nA project for learning about Git branches."),
            createFileStructure("/src/main.js", 'console.log("Main branch");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"],
                },
            ],
        }),
    }),
});

const branchesLevel3 = createLevel({
    id: 3,
    name: "branches.level3.name",
    description: "branches.level3.description",
    objectives: ["branches.level3.objective1"],
    hints: ["branches.level3.hint1", "branches.level3.hint2"],
    requirements: [
        createRequirement({
            command: "git switch",
            description: "branches.level3.requirement1.description",
            successMessage: "branches.level3.requirement1.success",
        }),
    ],
    story: createStory({
        title: "branches.level3.story.title",
        narrative: "branches.level3.story.narrative",
        realWorldContext: "branches.level3.story.realWorldContext",
        taskIntroduction: "branches.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Branch Project\n\nA project for learning about Git branches."),
            createFileStructure("/src/main.js", 'console.log("Main branch");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"],
                },
            ],
        }),
    }),
});

// ===== MERGE STAGE =====
const mergeLevel1 = createLevel({
    id: 1,
    name: "merge.level1.name",
    description: "merge.level1.description",
    objectives: ["merge.level1.objective1"],
    hints: ["merge.level1.hint1", "merge.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git merge",
            requiresArgs: ["any"],
            description: "merge.level1.requirement1.description",
            successMessage: "merge.level1.requirement1.success",
        }),
    ],
    story: createStory({
        title: "merge.level1.story.title",
        narrative: "merge.level1.story.narrative",
        realWorldContext: "merge.level1.story.realWorldContext",
        taskIntroduction: "merge.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Merge Project\n\nA project for learning about Git merges."),
            createFileStructure("/src/main.js", 'console.log("Main branch");'),
            createFileStructure("/src/feature.js", 'console.log("Feature implementation");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature"],
            commits: [
                // Initial commit on main
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"],
                },
                // Switch to feature branch and add feature.js
                {
                    message: "Add feature implementation",
                    files: ["/src/feature.js"],
                    branch: "feature",
                },
                // Switch back to main for the user to merge
                {
                    message: "",
                    files: [],
                    branch: "main",
                },
            ],
        }),
    }),
});

const mergeLevel2 = createLevel({
    id: 2,
    name: "merge.level2.name",
    description: "merge.level2.description",
    objectives: ["merge.level2.objective1"],
    hints: ["merge.level2.hint1", "merge.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git merge",
            requiresArgs: ["--abort"],
            description: "merge.level2.requirement1.description",
            successMessage: "merge.level2.requirement1.success",
        }),
    ],
    story: createStory({
        title: "merge.level2.story.title",
        narrative: "merge.level2.story.narrative",
        realWorldContext: "merge.level2.story.realWorldContext",
        taskIntroduction: "merge.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure(
                "/README.md",
                "# Merge Conflict Project\n\nA project for learning about merge conflicts.",
            ),
            createFileStructure("/src/main.js", 'console.log("Main branch");'),
            // This file will be different in both branches
            createFileStructure(
                "/src/config.js",
                '// Configuration file\nconst config = {\n  port: 3000,\n  host: "localhost",\n  debug: true\n};\n\nmodule.exports = config;',
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature"],
            commits: [
                // Initial commit on main
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js", "/src/config.js"],
                },
                // Change to config.js on the feature branch
                {
                    message: "Update config for production",
                    files: ["/src/config.js"],
                    branch: "feature",
                },
                // Change to config.js on the main branch
                {
                    message: "Update config for debugging",
                    files: ["/src/config.js"],
                    branch: "main",
                },
            ],
            // Simulate merge conflict
            mergeConflicts: [
                {
                    file: "/src/config.js",
                    content: createMergeConflictContent(
                        '// Configuration file\nconst config = {\n  port: 3000,\n  host: "localhost",\n  debug: true\n};\n\nmodule.exports = config;',
                        '// Configuration file\nconst config = {\n  port: 8080,\n  host: "example.com",\n  debug: false\n};\n\nmodule.exports = config;',
                    ),
                    branch1: "main",
                    branch2: "feature",
                },
            ],
        }),
    }),
});

// ===== REMOTE STAGE =====
const remoteLevel1 = createLevel({
    id: 1,
    name: "remote.level1.name",
    description: "remote.level1.description",
    objectives: ["remote.level1.objective1"],
    hints: ["remote.level1.hint1", "remote.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git remote",
            requiresArgs: ["add"],
            description: "remote.level1.requirement1.description",
            successMessage: "remote.level1.requirement1.success",
        }),
    ],
    story: createStory({
        title: "remote.level1.story.title",
        narrative: "remote.level1.story.narrative",
        realWorldContext: "remote.level1.story.realWorldContext",
        taskIntroduction: "remote.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Remote Project\n\nA project for learning about remote repositories."),
            createFileStructure("/src/index.js", 'console.log("Hello from the local repository");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/index.js"],
                },
            ],
        }),
    }),
});

const remoteLevel2 = createLevel({
    id: 2,
    name: "remote.level2.name",
    description: "remote.level2.description",
    objectives: ["remote.level2.objective1"],
    hints: ["remote.level2.hint1", "remote.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git push",
            description: "remote.level2.requirement1.description",
            successMessage: "remote.level2.requirement1.success",
        }),
    ],
    story: createStory({
        title: "remote.level2.story.title",
        narrative: "remote.level2.story.narrative",
        realWorldContext: "remote.level2.story.realWorldContext",
        taskIntroduction: "remote.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Remote Project\n\nA project for learning about remote repositories."),
            createFileStructure("/src/index.js", 'console.log("Hello from the local repository");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/index.js"],
                },
            ],
            // Remote already added for this level
            fileChanges: [],
        }),
    }),
});

// ===== STAGES COLLECTION =====
export const allStages = {
    Intro: createStage({
        id: "intro",
        name: "intro.name",
        description: "intro.description",
        icon: "🚀",
        levels: {
            1: introLevel1,
            2: introLevel2,
        },
    }),
    Files: createStage({
        id: "files",
        name: "files.name",
        description: "files.description",
        icon: "📁",
        levels: {
            1: filesLevel1,
            2: filesLevel2,
            3: filesLevel3,
        },
    }),
    Branches: createStage({
        id: "branches",
        name: "branches.name",
        description: "branches.description",
        icon: "🌿",
        levels: {
            1: branchesLevel1,
            2: branchesLevel2,
            3: branchesLevel3,
        },
    }),
    Merge: createStage({
        id: "merge",
        name: "merge.name",
        description: "merge.description",
        icon: "🔀",
        levels: {
            1: mergeLevel1,
            2: mergeLevel2,
        },
    }),
    Remote: createStage({
        id: "remote",
        name: "remote.name",
        description: "remote.description",
        icon: "🌐",
        levels: {
            1: remoteLevel1,
            2: remoteLevel2,
        },
    }),
};

// ===== Usage in LevelManager =====
/**
 * To use these levels in the LevelManager, initialize the class like this:
 *
 * export class LevelManager {
 *   private stages: Record<string, StageType>;
 *
 *   constructor() {
 *     this.stages = allStages;
 *   }
 *
 *   // Other methods...
 * }
 */
