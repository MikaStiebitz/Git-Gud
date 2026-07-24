import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const introLevel1 = createLevel({
    id: 1,
    name: "intro.level1.name",
    description: "intro.level1.description",
    objectives: ["intro.level1.objective1"],
    hints: ["intro.level1.hint1", "intro.level1.hint2"],
    requirements: [
        createRequirement({
            id: "init-repo",
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
        files: [],
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
            id: "status",
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

const introLevel3 = createLevel({
    id: 3,
    name: "intro.level3.name",
    description: "intro.level3.description",
    objectives: ["intro.level3.objective1", "intro.level3.objective2"],
    hints: ["intro.level3.hint1", "intro.level3.hint2", "intro.level3.hint3"],
    requirementLogic: "all",
    requirements: [
        {
            id: "clone-repo",
            command: "git clone",
            requiresArgs: ["any"],
            description: "intro.level3.requirement1.description",
            successMessage: "intro.level3.requirement1.success",
        },
        {
            id: "navigate-to-repo",
            command: "cd",
            requiresArgs: ["any"],
            description: "intro.level3.requirement2.description",
            successMessage: "intro.level3.requirement2.success",
        },
    ],
    story: createStory({
        title: "intro.level3.story.title",
        narrative: "intro.level3.story.narrative",
        realWorldContext: "intro.level3.story.realWorldContext",
        taskIntroduction: "intro.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [],
        git: createGitState({
            initialized: false,
        }),
    }),
});

const introLevel4 = createLevel({
    id: 4,
    name: "intro.level4.name",
    description: "intro.level4.description",
    objectives: ["intro.level4.objective1", "intro.level4.objective2"],
    hints: ["intro.level4.hint1", "intro.level4.hint2", "intro.level4.hint3"],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            id: "check-status",
            command: "git status",
            description: "intro.level4.requirement1.description",
            successMessage: "intro.level4.requirement1.success",
        }),
        createRequirement({
            id: "inspect-changes",
            command: "git diff",
            description: "intro.level4.requirement2.description",
            successMessage: "intro.level4.requirement2.success",
        }),
    ],
    story: createStory({
        title: "intro.level4.story.title",
        narrative: "intro.level4.story.narrative",
        realWorldContext: "intro.level4.story.realWorldContext",
        taskIntroduction: "intro.level4.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# TechStart Website\n\nThe company website project."),
            createFileStructure("/src/app.js", 'console.log("Welcome to TechStart!");'),
            createFileStructure(
                "/src/config.js",
                'const config = {\n    appName: "TechStart Website",\n    version: "1.0.0",\n    debugMode: false,\n};\n\nmodule.exports = config;',
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            commits: [
                {
                    message: "Initial project setup",
                    files: ["/README.md", "/src/app.js", "/src/config.js"],
                },
            ],
            // Sarah's mysterious last-minute change: debug mode was switched on
            fileChanges: [
                {
                    path: "/src/config.js",
                    content:
                        'const config = {\n    appName: "TechStart Website",\n    version: "1.0.0",\n    debugMode: true,\n};\n\nmodule.exports = config;',
                    status: "modified",
                },
            ],
        }),
    }),
});

export const introLevels = {
    1: introLevel1,
    2: introLevel2,
    3: introLevel3,
    4: introLevel4,
};
