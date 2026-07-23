import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

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
            id: "git-branch",
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
            branches: ["main", "feature", "develop"],
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
            command: "git switch",
            requiresArgs: ["-c"],
            alternativeCommands: ["git checkout"],
            description: "branches.level2.requirement1.description",
            successMessage: "branches.level2.requirement1.success",
            id: "git-switch",
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
            alternativeCommands: ["git checkout"],
            requiresArgs: ["any"],
            description: "branches.level3.requirement1.description",
            successMessage: "branches.level3.requirement1.success",
            id: "git-switch-2",
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

// Level 4: git checkout zum Wechseln zwischen Branches
const branchesLevel4 = createLevel({
    id: 4,
    name: "branches.level4.name",
    description: "branches.level4.description",
    objectives: ["branches.level4.objective1"],
    hints: ["branches.level4.hint1", "branches.level4.hint2"],
    requirements: [
        createRequirement({
            command: "git checkout",
            description: "branches.level4.requirement1.description",
            successMessage: "branches.level4.requirement1.success",
            id: "git-checkout",
        }),
    ],
    story: createStory({
        title: "branches.level4.story.title",
        narrative: "branches.level4.story.narrative",
        realWorldContext: "branches.level4.story.realWorldContext",
        taskIntroduction: "branches.level4.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Branch Project\n\nA project for learning about Git branches."),
            createFileStructure("/src/main.js", 'console.log("Main branch");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature", "bugfix"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"],
                },
            ],
        }),
    }),
});

// Level 5: git checkout -b zum Erstellen und Wechseln in einem Schritt
const branchesLevel5 = createLevel({
    id: 5,
    name: "branches.level5.name",
    description: "branches.level5.description",
    objectives: ["branches.level5.objective1"],
    hints: ["branches.level5.hint1", "branches.level5.hint2"],
    requirements: [
        createRequirement({
            command: "git switch",
            requiresArgs: ["-c"],
            alternativeCommands: ["git checkout", "git branch"],
            description: "branches.level5.requirement1.description",
            successMessage: "branches.level5.requirement1.success",
            id: "git-switch-3",
        }),
    ],
    story: createStory({
        title: "branches.level5.story.title",
        narrative: "branches.level5.story.narrative",
        realWorldContext: "branches.level5.story.realWorldContext",
        taskIntroduction: "branches.level5.story.taskIntroduction",
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

// Level 6: git branch -d / -D zum Löschen von gemergten und verworfenen Branches
const branchesLevel6 = createLevel({
    id: 6,
    name: "branches.level6.name",
    description: "branches.level6.description",
    objectives: ["branches.level6.objective1", "branches.level6.objective2"],
    hints: ["branches.level6.hint1", "branches.level6.hint2", "branches.level6.hint3"],
    requirements: [
        createRequirement({
            command: "git branch",
            requiresArgs: ["-d", "feature/search-filters"],
            description: "branches.level6.requirement1.description",
            successMessage: "branches.level6.requirement1.success",
            id: "branch-delete-merged",
        }),
        createRequirement({
            command: "git branch",
            requiresArgs: ["-D", "experiment/new-ui"],
            description: "branches.level6.requirement2.description",
            successMessage: "branches.level6.requirement2.success",
            id: "branch-force-delete",
        }),
    ],
    requirementLogic: "all",
    story: createStory({
        title: "branches.level6.story.title",
        narrative: "branches.level6.story.narrative",
        realWorldContext: "branches.level6.story.realWorldContext",
        taskIntroduction: "branches.level6.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# TechStart Shop\n\nThe TechStart online shop application."),
            createFileStructure("/src/app.js", 'console.log("TechStart shop is running");'),
            createFileStructure(
                "/src/search.js",
                "// Search filters - merged from feature/search-filters\nexport function filterProducts(products, query) {\n    return products.filter(p => p.name.includes(query));\n}",
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature/search-filters", "experiment/new-ui"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/app.js"],
                },
                {
                    message: "Add search filters",
                    files: ["/src/search.js"],
                },
                {
                    message: "Experiment with a new UI layout",
                    files: [],
                    branch: "experiment/new-ui",
                },
            ],
        }),
    }),
});

export const branchesLevels = {
    1: branchesLevel1,
    2: branchesLevel2,
    3: branchesLevel3,
    4: branchesLevel4,
    5: branchesLevel5,
    6: branchesLevel6,
};
