import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

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
            id: "git-remote-add",
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
    objectives: ["remote.level2.objective1", "remote.level2.objective2"],
    hints: ["remote.level2.hint1", "remote.level2.hint2", "remote.level2.hint3"],
    requirements: [
        createRequirement({
            command: "git push",
            description: "remote.level2.requirement1.description",
            successMessage: "remote.level2.requirement1.success",
            id: "git-push-remote",
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

// Level 3: git push mit Branch-Namen
const remoteLevel3 = createLevel({
    id: 3,
    name: "remote.level3.name",
    description: "remote.level3.description",
    objectives: ["remote.level3.objective1"],
    hints: ["remote.level3.hint1", "remote.level3.hint2"],
    requirements: [
        createRequirement({
            command: "git push",
            description: "remote.level3.requirement1.description",
            successMessage: "remote.level3.requirement1.success",
            id: "git-push-3",
        }),
    ],
    story: createStory({
        title: "remote.level3.story.title",
        narrative: "remote.level3.story.narrative",
        realWorldContext: "remote.level3.story.realWorldContext",
        taskIntroduction: "remote.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Remote Project\n\nA project for learning about remote repositories."),
            createFileStructure("/src/index.js", 'console.log("Hello from the local repository");'),
            createFileStructure("/src/feature.js", 'console.log("New feature");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "feature-branch",
            branches: ["main", "feature-branch"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/index.js"],
                },
                {
                    message: "Add feature",
                    files: ["/src/feature.js"],
                    branch: "feature-branch",
                },
            ],
        }),
    }),
});

// Level 4: git push -u und Upstream-Tracking
const remoteLevel4 = createLevel({
    id: 4,
    name: "remote.level4.name",
    description: "remote.level4.description",
    objectives: ["remote.level4.objective1", "remote.level4.objective2", "remote.level4.objective3"],
    hints: ["remote.level4.hint1", "remote.level4.hint2", "remote.level4.hint3"],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            command: "git push",
            requiresArgs: ["-u", "origin"],
            description: "remote.level4.requirement1.description",
            successMessage: "remote.level4.requirement1.success",
            id: "push-set-upstream",
        }),
        createRequirement({
            command: "git commit",
            requiresArgs: ["-m"],
            description: "remote.level4.requirement2.description",
            successMessage: "remote.level4.requirement2.success",
            id: "commit-login-polish",
        }),
        createRequirement({
            command: "git push",
            description: "remote.level4.requirement3.description",
            successMessage: "remote.level4.requirement3.success",
            id: "push-tracked-branch",
        }),
    ],
    story: createStory({
        title: "remote.level4.story.title",
        narrative: "remote.level4.story.narrative",
        realWorldContext: "remote.level4.story.realWorldContext",
        taskIntroduction: "remote.level4.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Remote Project\n\nA project for learning about remote repositories."),
            createFileStructure("/src/index.js", 'console.log("Hello from the local repository");'),
            createFileStructure(
                "/src/login.js",
                'function validateLogin(user) {\n    if (!user.email || !user.password) {\n        return "Error";\n    }\n    return null;\n}',
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "login-form",
            branches: ["main", "login-form"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/index.js"],
                },
                {
                    message: "Add login form validation",
                    files: ["/src/login.js"],
                    branch: "login-form",
                },
            ],
            fileChanges: [
                {
                    path: "/src/login.js",
                    status: "modified",
                    content:
                        'function validateLogin(user) {\n    if (!user.email) {\n        return "Please enter your email address.";\n    }\n    if (!user.password) {\n        return "Please enter your password.";\n    }\n    return null;\n}',
                },
            ],
        }),
    }),
});

export const remoteLevels = {
    1: remoteLevel1,
    2: remoteLevel2,
    3: remoteLevel3,
    4: remoteLevel4,
};
