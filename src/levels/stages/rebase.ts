import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
    createMergeConflictContent,
} from "../LevelCreator";

const rebaseLevel1 = createLevel({
    id: 1,
    name: "rebase.level1.name",
    description: "rebase.level1.description",
    objectives: ["rebase.level1.objective1"],
    hints: ["rebase.level1.hint1", "rebase.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git rebase",
            requiresArgs: ["any"],
            description: "rebase.level1.requirement1.description",
            successMessage: "rebase.level1.requirement1.success",
            id: "git-rebase",
        }),
    ],
    story: createStory({
        title: "rebase.level1.story.title",
        narrative: "rebase.level1.story.narrative",
        realWorldContext: "rebase.level1.story.realWorldContext",
        taskIntroduction: "rebase.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Rebase Project\n\nA project for learning about Git rebases."),
            createFileStructure("/src/main.js", 'console.log("Main branch with new updates");'),
            createFileStructure("/src/feature.js", 'console.log("Feature implementation");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "feature",
            branches: ["main", "feature"],
            commits: [
                // Initial commit on main
                {
                    message: "Initial commit",
                    files: ["/README.md"],
                    branch: "main",
                },
                // First update on main branch
                {
                    message: "Add main.js",
                    files: ["/src/main.js"],
                    branch: "main",
                },
                // Create feature branch and add feature.js
                {
                    message: "Start feature implementation",
                    files: ["/src/feature.js"],
                    branch: "feature",
                },
                // Add another commit to main (to make rebase meaningful)
                {
                    message: "Update main.js",
                    files: ["/src/main.js"],
                    branch: "main",
                },
                // Switch back to feature branch for the user to rebase
                {
                    message: "",
                    files: [],
                    branch: "feature",
                },
            ],
        }),
    }),
});

const rebaseLevel2 = createLevel({
    id: 2,
    name: "rebase.level2.name",
    description: "rebase.level2.description",
    objectives: ["rebase.level2.objective1"],
    hints: ["rebase.level2.hint1", "rebase.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git rebase",
            requiresArgs: ["--abort"],
            description: "rebase.level2.requirement1.description",
            successMessage: "rebase.level2.requirement1.success",
            id: "git-rebase-abort",
        }),
    ],
    story: createStory({
        title: "rebase.level2.story.title",
        narrative: "rebase.level2.story.narrative",
        realWorldContext: "rebase.level2.story.realWorldContext",
        taskIntroduction: "rebase.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure(
                "/README.md",
                "# Rebase Conflict Project\n\nA project for learning about rebase conflicts.",
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
            // Simulate rebase conflict
            mergeConflicts: [
                {
                    file: "/src/config.js",
                    content: createMergeConflictContent(
                        '// Configuration file\nconst config = {\n  port: 3000,\n  host: "localhost\n  debug: true\n};\n\nmodule.exports = config;',
                        '// Configuration file\nconst config = {\n  port: 8080,\n  host: "example.com",\n  debug: false\n};\n\nmodule.exports = config;',
                    ),
                    branch1: "main",
                    branch2: "feature",
                },
            ],
        }),
    }),
});

const rebaseLevel3 = createLevel({
    id: 3,
    name: "rebase.level3.name",
    description: "rebase.level3.description",
    objectives: ["rebase.level3.objective1"],
    hints: ["rebase.level3.hint1", "rebase.level3.hint2"],
    requirements: [
        createRequirement({
            command: "git rebase",
            requiresArgs: ["-i"],
            description: "rebase.level3.requirement1.description",
            successMessage: "rebase.level3.requirement1.success",
            id: "git-rebase-i",
        }),
    ],
    story: createStory({
        title: "rebase.level3.story.title",
        narrative: "rebase.level3.story.narrative",
        realWorldContext: "rebase.level3.story.realWorldContext",
        taskIntroduction: "rebase.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure(
                "/README.md",
                "# Interactive Rebase Project\n\nA project for learning about interactive rebasing.",
            ),
            createFileStructure("/src/main.js", 'console.log("Main branch");'),
            createFileStructure("/src/feature.js", 'console.log("Feature implementation");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "feature",
            branches: ["main", "feature"],
            commits: [
                // Initial commit on main
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"],
                },
                // First feature commit
                {
                    message: "Add feature implementation - initial",
                    files: ["/src/feature.js"],
                    branch: "feature",
                },
                // Second feature commit
                {
                    message: "Fix typo in feature implementation",
                    files: ["/src/feature.js"],
                    branch: "feature",
                },
                // Third feature commit
                {
                    message: "Improve feature implementation",
                    files: ["/src/feature.js"],
                    branch: "feature",
                },
            ],
        }),
    }),
});

// Rebase onto main level
const rebaseLevel4 = createLevel({
    id: 4,
    name: "rebase.level4.name",
    description: "rebase.level4.description",
    objectives: ["rebase.level4.objective1"],
    hints: ["rebase.level4.hint1", "rebase.level4.hint2"],
    requirements: [
        createRequirement({
            command: "git rebase",
            requiresArgs: ["main"],
            description: "rebase.level4.requirement1.description",
            successMessage: "rebase.level4.requirement1.success",
            id: "git-rebase-main",
        }),
    ],
    story: createStory({
        title: "rebase.level4.story.title",
        narrative: "rebase.level4.story.narrative",
        realWorldContext: "rebase.level4.story.realWorldContext",
        taskIntroduction: "rebase.level4.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure(
                "/README.md",
                "# Rebase Workflow Project\n\nA project for learning about rebasing workflows.",
            ),
            createFileStructure("/src/main.js", 'console.log("Main branch update");'),
            createFileStructure("/src/feature.js", 'console.log("Feature implementation");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "feature",
            branches: ["main", "feature"],
            commits: [
                // Initial commit on main
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"],
                },
                // Change on feature branch
                {
                    message: "Add feature implementation",
                    files: ["/src/feature.js"],
                    branch: "feature",
                },
                // New change on main branch (after feature branch was created)
                {
                    message: "Update main.js",
                    files: ["/src/main.js"],
                    branch: "main",
                },
                // Switch back to feature branch for the level
                {
                    message: "",
                    files: [],
                    branch: "feature",
                },
            ],
        }),
    }),
});

// Rebase a branch without checking it out first (two-argument form)
const rebaseLevel5 = createLevel({
    id: 5,
    name: "rebase.level5.name",
    description: "rebase.level5.description",
    objectives: ["rebase.level5.objective1"],
    hints: ["rebase.level5.hint1", "rebase.level5.hint2"],
    requirements: [
        createRequirement({
            command: "git rebase",
            requiresArgs: ["main", "feature/payment-api"],
            description: "rebase.level5.requirement1.description",
            successMessage: "rebase.level5.requirement1.success",
            id: "git-rebase-two-args",
        }),
    ],
    story: createStory({
        title: "rebase.level5.story.title",
        narrative: "rebase.level5.story.narrative",
        realWorldContext: "rebase.level5.story.realWorldContext",
        taskIntroduction: "rebase.level5.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure(
                "/README.md",
                "# Payments Release\n\nRelease preparation for the TechStart payments service.",
            ),
            createFileStructure("/src/main.js", 'console.log("Release candidate build");'),
            createFileStructure("/src/payment.js", 'console.log("Payment API integration");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature/payment-api"],
            commits: [
                // Initial commit on main
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"],
                },
                // Work on the payment feature branch
                {
                    message: "Start payment API integration",
                    files: ["/src/payment.js"],
                    branch: "feature/payment-api",
                },
                // Main moves ahead while the feature branch falls behind
                {
                    message: "Prepare release configuration",
                    files: ["/src/main.js"],
                    branch: "main",
                },
            ],
        }),
    }),
});

export const rebaseLevels = {
    1: rebaseLevel1,
    2: rebaseLevel2,
    3: rebaseLevel3,
    4: rebaseLevel4,
    5: rebaseLevel5,
};
