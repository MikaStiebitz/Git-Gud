import {
    createLevel,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const stashLevel1 = createLevel({
    id: 1,
    name: "stash.level1.name",
    description: "stash.level1.description",
    objectives: [
        "stash.level1.objective1",
        "stash.level1.objective2",
        "stash.level1.objective3",
        "stash.level1.objective4"
    ],
    hints: [
        "stash.level1.hint1",
        "stash.level1.hint2",
        "stash.level1.hint3",
        "stash.level1.hint4"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "stash-save",
            objectiveId: 1,
            command: "git stash",
            description: "stash.level1.requirement1.description",
            successMessage: "stash.level1.requirement1.success",
        },
        {
            id: "checkout-hotfix",
            objectiveId: 2,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["hotfix"],
            description: "stash.level1.requirement2.description",
            successMessage: "stash.level1.requirement2.success",
        },
        {
            id: "checkout-feature",
            objectiveId: 3,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["feature"],
            description: "stash.level1.requirement3.description",
            successMessage: "stash.level1.requirement3.success",
        },
        {
            id: "stash-pop",
            objectiveId: 4,
            command: "git stash",
            requiresArgs: ["pop"],
            description: "stash.level1.requirement4.description",
            successMessage: "stash.level1.requirement4.success",
        },
    ],
    story: createStory({
        title: "stash.level1.story.title",
        narrative: "stash.level1.story.narrative",
        realWorldContext: "stash.level1.story.realWorldContext",
        taskIntroduction: "stash.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Project\n\nA web application."),
            createFileStructure("/src/app.js", "// Main application\nconsole.log('App running');"),
            createFileStructure("/src/feature.js", "// Feature in progress\n// TODO: Complete implementation"),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "feature",
            branches: ["main", "feature", "hotfix"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/app.js"],
                    branch: "main",
                },
                {
                    message: "Start feature work",
                    files: ["/src/feature.js"],
                    branch: "feature",
                },
                {
                    message: "Create hotfix branch",
                    files: [],
                    branch: "hotfix",
                },
                // Switch back to feature branch (empty commit = just checkout)
                {
                    message: "",
                    files: [],
                    branch: "feature",
                },
            ],
            fileChanges: [
                {
                    path: "/src/feature.js",
                    status: "modified",
                    content: "// Feature in progress\nfunction newFeature() {\n  // Work in progress - NOT DONE YET!\n  console.log('Still working on this...');\n  return 'incomplete';\n}",
                },
            ],
        }),
    }),
});

const stashLevel2 = createLevel({
    id: 2,
    name: "stash.level2.name",
    description: "stash.level2.description",
    objectives: [
        "stash.level2.objective1",
        "stash.level2.objective2",
        "stash.level2.objective3",
        "stash.level2.objective4",
        "stash.level2.objective5"
    ],
    hints: [
        "stash.level2.hint1",
        "stash.level2.hint2",
        "stash.level2.hint3",
        "stash.level2.hint4",
        "stash.level2.hint5"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "stash-old-work",
            objectiveId: 1,
            command: "git stash",
            description: "stash.level2.requirement1.description",
            successMessage: "stash.level2.requirement1.success",
        },
        {
            id: "checkout-main",
            objectiveId: 2,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["main"],
            description: "stash.level2.requirement2.description",
            successMessage: "stash.level2.requirement2.success",
        },
        {
            id: "create-new-branch",
            objectiveId: 3,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            description: "stash.level2.requirement3.description",
            successMessage: "stash.level2.requirement3.success",
        },
        {
            id: "return-old-task",
            objectiveId: 4,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["feature/old-task"],
            description: "stash.level2.requirement4.description",
            successMessage: "stash.level2.requirement4.success",
        },
        {
            id: "stash-pop-work",
            objectiveId: 5,
            command: "git stash",
            requiresArgs: ["pop"],
            description: "stash.level2.requirement5.description",
            successMessage: "stash.level2.requirement5.success",
        },
    ],
    story: createStory({
        title: "stash.level2.story.title",
        narrative: "stash.level2.story.narrative",
        realWorldContext: "stash.level2.story.realWorldContext",
        taskIntroduction: "stash.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Multi-Task Project\n\nJuggling multiple features."),
            createFileStructure("/src/app.js", "// Main application\nconsole.log('App');"),
            createFileStructure("/src/task.js", "// Current task\nfunction task() { return 'working'; }"),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "feature/old-task",
            branches: ["main", "feature/old-task"],
            commits: [
                {
                    message: "Initial setup",
                    files: ["/README.md", "/src/app.js"],
                    branch: "main",
                },
                {
                    message: "Start old task",
                    files: ["/src/task.js"],
                    branch: "feature/old-task",
                },
            ],
            fileChanges: [
                {
                    path: "/src/task.js",
                    status: "modified",
                    content: "// Current task\nfunction task() {\n  // Half-done work\n  return 'incomplete';\n}",
                },
            ],
        }),
    }),
});

const stashLevel3 = createLevel({
    id: 3,
    name: "stash.level3.name",
    description: "stash.level3.description",
    objectives: [
        "stash.level3.objective1",
        "stash.level3.objective2"
    ],
    hints: [
        "stash.level3.hint1",
        "stash.level3.hint2",
        "stash.level3.hint3"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "stash-list",
            objectiveId: 1,
            command: "git stash",
            requiresArgs: ["list"],
            description: "stash.level3.requirement1.description",
            successMessage: "stash.level3.requirement1.success",
        },
        {
            id: "stash-pop",
            objectiveId: 2,
            command: "git stash",
            requiresArgs: ["pop"],
            description: "stash.level3.requirement2.description",
            successMessage: "stash.level3.requirement2.success",
        },
    ],
    story: createStory({
        title: "stash.level3.story.title",
        narrative: "stash.level3.story.narrative",
        realWorldContext: "stash.level3.story.realWorldContext",
        taskIntroduction: "stash.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Stash Management\n\nLearning stash commands."),
            createFileStructure("/src/code.js", "// Code file\nfunction code() { return 'clean'; }"),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/code.js"],
                },
            ],
            fileChanges: [
                {
                    path: "/src/code.js",
                    status: "modified",
                    content: "// Code file\nfunction code() {\n  // Modified\n  return 'changed';\n}",
                },
            ],
        }),
    }),
});

export const stashLevels = {
    1: stashLevel1,
    2: stashLevel2,
    3: stashLevel3,
};
