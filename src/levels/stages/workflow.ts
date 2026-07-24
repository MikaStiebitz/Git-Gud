import { createLevel, createStory, createInitialState, createFileStructure, createGitState } from "../LevelCreator";

const workflowLevel1 = createLevel({
    id: 1,
    name: "workflow.level1.name",
    description: "workflow.level1.description",
    objectives: [
        "workflow.level1.objective1",
        "workflow.level1.objective2",
        "workflow.level1.objective3",
        "workflow.level1.objective4",
        "workflow.level1.objective5",
    ],
    hints: [
        "workflow.level1.hint1",
        "workflow.level1.hint2",
        "workflow.level1.hint3",
        "workflow.level1.hint4",
        "workflow.level1.hint5",
        "workflow.level1.hint6",
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "create-feature-branch",
            objectiveId: 1,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["-c"],
            description: "workflow.level1.requirement1.description",
            successMessage: "workflow.level1.requirement1.success",
        },
        {
            id: "stage-changes",
            objectiveId: 2,
            command: "git add",
            description: "workflow.level1.requirement2.description",
            successMessage: "workflow.level1.requirement2.success",
        },
        {
            id: "commit-changes",
            objectiveId: 2,
            command: "git commit",
            requiresArgs: ["any"],
            description: "workflow.level1.requirement3.description",
            successMessage: "workflow.level1.requirement3.success",
        },
        {
            id: "push-feature",
            objectiveId: 3,
            command: "git push",
            requiresArgs: ["origin"],
            description: "workflow.level1.requirement4.description",
            successMessage: "workflow.level1.requirement4.success",
        },
        {
            id: "switch-to-main",
            objectiveId: 4,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["main"],
            description: "workflow.level1.requirement5.description",
            successMessage: "workflow.level1.requirement5.success",
        },
        {
            id: "merge-feature",
            objectiveId: 5,
            command: "git merge",
            description: "workflow.level1.requirement6.description",
            successMessage: "workflow.level1.requirement6.success",
        },
    ],
    story: createStory({
        title: "workflow.level1.story.title",
        narrative: "workflow.level1.story.narrative",
        realWorldContext: "workflow.level1.story.realWorldContext",
        taskIntroduction: "workflow.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# TechCorp Project\n\nA cutting-edge web application."),
            createFileStructure("/src/app.js", "// Main application file\nconsole.log('App starting...');"),
            createFileStructure("/src/auth.js", "// TODO: Add user authentication"),
            createFileStructure("/package.json", '{\n  "name": "techcorp-app",\n  "version": "1.0.0"\n}'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial project setup",
                    files: ["/README.md", "/src/app.js", "/src/auth.js", "/package.json"],
                },
            ],
            fileChanges: [
                {
                    path: "/src/auth.js",
                    status: "modified",
                    content:
                        "// User authentication module\nfunction login(username, password) {\n  // Authentication logic here\n  return true;\n}",
                },
            ],
        }),
    }),
});

const workflowLevel2 = createLevel({
    id: 2,
    name: "workflow.level2.name",
    description: "workflow.level2.description",
    objectives: [
        "workflow.level2.objective1",
        "workflow.level2.objective2",
        "workflow.level2.objective3",
        "workflow.level2.objective4",
    ],
    hints: ["workflow.level2.hint1", "workflow.level2.hint2", "workflow.level2.hint3", "workflow.level2.hint4"],
    requirementLogic: "all",
    requirements: [
        {
            id: "create-hotfix-branch",
            objectiveId: 1,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["-c"],
            description: "workflow.level2.requirement1.description",
            successMessage: "workflow.level2.requirement1.success",
        },
        {
            id: "stage-fixes",
            objectiveId: 2,
            command: "git add",
            description: "workflow.level2.requirement2.description",
            successMessage: "workflow.level2.requirement2.success",
        },
        {
            id: "commit-fixes",
            objectiveId: 2,
            command: "git commit",
            requiresArgs: ["any"],
            description: "workflow.level2.requirement3.description",
            successMessage: "workflow.level2.requirement3.success",
        },
        {
            id: "switch-to-main",
            objectiveId: 3,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["main"],
            description: "workflow.level2.requirement4.description",
            successMessage: "workflow.level2.requirement4.success",
        },
        {
            id: "merge-hotfix",
            objectiveId: 4,
            command: "git merge",
            requiresArgs: ["any"],
            description: "workflow.level2.requirement5.description",
            successMessage: "workflow.level2.requirement5.success",
        },
    ],
    story: createStory({
        title: "workflow.level2.story.title",
        narrative: "workflow.level2.story.narrative",
        realWorldContext: "workflow.level2.story.realWorldContext",
        taskIntroduction: "workflow.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure(
                "/src/payment.js",
                "// Payment processing\nfunction processPayment(data) {\n  // SECURITY BUG: No input validation!\n  return database.insert(data);\n}",
            ),
            createFileStructure(
                "/src/security.js",
                "// Security utilities\nfunction validateInput(input) {\n  // TODO: Implement validation\n  return true;\n}",
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "develop"],
            commits: [
                {
                    message: "Add payment system",
                    files: ["/src/payment.js", "/src/security.js"],
                },
            ],
        }),
    }),
});

const workflowLevel3 = createLevel({
    id: 3,
    name: "workflow.level3.name",
    description: "workflow.level3.description",
    objectives: [
        "workflow.level3.objective1",
        "workflow.level3.objective2",
        "workflow.level3.objective3",
        "workflow.level3.objective4",
    ],
    hints: [
        "workflow.level3.hint1",
        "workflow.level3.hint2",
        "workflow.level3.hint3",
        "workflow.level3.hint4",
        "workflow.level3.hint5",
        "workflow.level3.hint6",
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "create-release-branch",
            objectiveId: 1,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["-c"],
            description: "workflow.level3.requirement1.description",
            successMessage: "workflow.level3.requirement1.success",
        },
        {
            id: "stage-release-changes",
            objectiveId: 2,
            command: "git add",
            description: "workflow.level3.requirement2.description",
            successMessage: "workflow.level3.requirement2.success",
        },
        {
            id: "commit-release",
            objectiveId: 2,
            command: "git commit",
            requiresArgs: ["any"],
            description: "workflow.level3.requirement3.description",
            successMessage: "workflow.level3.requirement3.success",
        },
        {
            id: "switch-to-main-for-release",
            objectiveId: 3,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["main"],
            description: "workflow.level3.requirement4.description",
            successMessage: "workflow.level3.requirement4.success",
        },
        {
            id: "merge-release",
            objectiveId: 3,
            command: "git merge",
            requiresArgs: ["any"],
            description: "workflow.level3.requirement5.description",
            successMessage: "workflow.level3.requirement5.success",
        },
        {
            id: "tag-release",
            objectiveId: 4,
            command: "git tag",
            requiresArgs: ["any"],
            description: "workflow.level3.requirement6.description",
            successMessage: "workflow.level3.requirement6.success",
        },
    ],
    story: createStory({
        title: "workflow.level3.story.title",
        narrative: "workflow.level3.story.narrative",
        realWorldContext: "workflow.level3.story.realWorldContext",
        taskIntroduction: "workflow.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/CHANGELOG.md", "# Changelog\n\n## v1.9.0\n- Initial release"),
            createFileStructure(
                "/package.json",
                '{\n  "name": "gitflow-app",\n  "version": "1.9.0",\n  "description": "Enterprise application"\n}',
            ),
            createFileStructure(
                "/src/features/feature1.js",
                "// New feature 1\nfunction newFeature1() {\n  return 'Feature 1';\n}",
            ),
            createFileStructure(
                "/src/features/feature2.js",
                "// New feature 2\nfunction newFeature2() {\n  return 'Feature 2';\n}",
            ),
            createFileStructure("/README.md", "# GitFlow App v1.9.0\n\nEnterprise Git workflow demonstration."),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "develop",
            branches: ["main", "develop", "feature/new-ui", "feature/api-integration"],
            commits: [
                {
                    message: "Add new features to develop",
                    files: [
                        "/CHANGELOG.md",
                        "/src/features/feature1.js",
                        "/src/features/feature2.js",
                        "/package.json",
                        "/README.md",
                    ],
                    branch: "develop",
                },
            ],
            fileChanges: [
                {
                    path: "/CHANGELOG.md",
                    status: "modified",
                    content:
                        "# Changelog\n\n## v2.0.0\n- New UI improvements\n- API integration complete\n- Performance optimizations\n\n## v1.9.0\n- Initial release",
                },
                {
                    path: "/package.json",
                    status: "modified",
                    content:
                        '{\n  "name": "gitflow-app",\n  "version": "2.0.0",\n  "description": "Enterprise application with major updates"\n}',
                },
            ],
        }),
    }),
});

const workflowLevel4 = createLevel({
    id: 4,
    name: "workflow.level4.name",
    description: "workflow.level4.description",
    objectives: ["workflow.level4.objective1", "workflow.level4.objective2", "workflow.level4.objective3"],
    hints: ["workflow.level4.hint1", "workflow.level4.hint2", "workflow.level4.hint3", "workflow.level4.hint4"],
    requirementLogic: "all",
    requirements: [
        {
            id: "stage-forgotten-config",
            objectiveId: 1,
            command: "git add",
            description: "workflow.level4.requirement1.description",
            successMessage: "workflow.level4.requirement1.success",
        },
        {
            id: "amend-last-commit",
            objectiveId: 2,
            command: "git commit",
            requiresArgs: ["--amend"],
            description: "workflow.level4.requirement2.description",
            successMessage: "workflow.level4.requirement2.success",
        },
        {
            id: "push-amended-commit",
            objectiveId: 3,
            command: "git push",
            requiresArgs: ["origin"],
            description: "workflow.level4.requirement3.description",
            successMessage: "workflow.level4.requirement3.success",
        },
    ],
    story: createStory({
        title: "workflow.level4.story.title",
        narrative: "workflow.level4.story.narrative",
        realWorldContext: "workflow.level4.story.realWorldContext",
        taskIntroduction: "workflow.level4.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# TechStart Sessions Service\n\nHandles user login and sessions."),
            createFileStructure(
                "/src/login.js",
                "// Login module\nfunction login(user) {\n  const session = createSession(user);\n  session.refreshOnActivity = true; // Fix: keep sessions alive while the user is active\n  return session;\n}",
            ),
            createFileStructure(
                "/src/config.js",
                "// App configuration\nmodule.exports = {\n  SESSION_TIMEOUT_MINUTES: 5\n};",
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial sessions service setup",
                    files: ["/README.md", "/src/login.js", "/src/config.js"],
                },
                {
                    message: "Fix login timout",
                    files: ["/src/login.js"],
                },
            ],
            fileChanges: [
                {
                    path: "/src/config.js",
                    status: "modified",
                    content: "// App configuration\nmodule.exports = {\n  SESSION_TIMEOUT_MINUTES: 30\n};",
                },
            ],
        }),
    }),
});

export const workflowLevels = {
    1: workflowLevel1,
    2: workflowLevel2,
    3: workflowLevel3,
    4: workflowLevel4,
};
