import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

// Level 1: git reset --soft (Progressive learning: simple → HEAD → HEAD~n)
const resetLevel1 = createLevel({
    id: 1,
    name: "reset.level1.name",
    description: "reset.level1.description",
    objectives: ["reset.level1.objective1", "reset.level1.objective2", "reset.level1.objective3"],
    hints: [
        "reset.level1.hint1",
        "reset.level1.hint2",
        "reset.level1.hint3",
        "reset.level1.hint4",
        "reset.level1.hint5",
        "reset.level1.hint6",
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "reset-soft-last-commit",
            command: "git reset",
            requiresArgs: ["--soft"],
            description: "reset.level1.requirement1.description",
            successMessage: "reset.level1.requirement1.success",
        },
        {
            id: "reset-soft-to-head",
            command: "git reset",
            requiresArgs: ["--soft"],
            description: "reset.level1.requirement2.description",
            successMessage: "reset.level1.requirement2.success",
        },
        {
            id: "reset-soft-head-tilde",
            command: "git reset",
            requiresArgs: ["--soft"],
            description: "reset.level1.requirement3.description",
            successMessage: "reset.level1.requirement3.success",
        },
    ],
    story: createStory({
        title: "reset.level1.story.title",
        narrative: "reset.level1.story.narrative",
        realWorldContext: "reset.level1.story.realWorldContext",
        taskIntroduction: "reset.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Payment System\n\nSecure payment processing API"),
            createFileStructure(
                "/src/routes.js",
                'const routes = require("express").Router();\nmodule.exports = routes;',
            ),
            createFileStructure("/src/auth.js", "function authenticate(user) {\n  return jwt.sign(user);\n}"),
            createFileStructure(
                "/src/api.js",
                'const API_BASE = "https://api.example.com";\nmodule.exports = { API_BASE };',
            ),
            createFileStructure(
                "/config/database.js",
                '// SENSITIVE!\nmodule.exports = {\n  password: "admin123",\n  user: "root"\n};',
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial project setup",
                    files: ["/README.md"],
                },
                {
                    message: "Setup routing",
                    files: ["/src/routes.js"],
                },
                {
                    message: "Add authentication",
                    files: ["/src/auth.js"],
                },
                {
                    message: "Update API endpoints",
                    files: ["/src/api.js"],
                },
                {
                    message: "Add database config - CONTAINS SENSITIVE DATA!",
                    files: ["/config/database.js"],
                },
            ],
        }),
    }),
});

// Level 2: git reset --hard (Progressive learning: simple → HEAD → HEAD~n - DESTRUCTIVE!)
const resetLevel2 = createLevel({
    id: 2,
    name: "reset.level2.name",
    description: "reset.level2.description",
    objectives: ["reset.level2.objective1", "reset.level2.objective2", "reset.level2.objective3"],
    hints: [
        "reset.level2.hint1",
        "reset.level2.hint2",
        "reset.level2.hint3",
        "reset.level2.hint4",
        "reset.level2.hint5",
        "reset.level2.hint6",
        "reset.level2.hint7",
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "reset-hard-last-commit",
            command: "git reset",
            requiresArgs: ["--hard"],
            description: "reset.level2.requirement1.description",
            successMessage: "reset.level2.requirement1.success",
        },
        {
            id: "reset-hard-to-head",
            command: "git reset",
            requiresArgs: ["--hard"],
            description: "reset.level2.requirement2.description",
            successMessage: "reset.level2.requirement2.success",
        },
        {
            id: "reset-hard-head-tilde",
            command: "git reset",
            requiresArgs: ["--hard"],
            description: "reset.level2.requirement3.description",
            successMessage: "reset.level2.requirement3.success",
        },
    ],
    story: createStory({
        title: "reset.level2.story.title",
        narrative: "reset.level2.story.narrative",
        realWorldContext: "reset.level2.story.realWorldContext",
        taskIntroduction: "reset.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Experimental Features\n\nTrying new algorithms"),
            createFileStructure("/src/auth.js", "function login(user) {\n  return validateUser(user);\n}"),
            createFileStructure("/src/dashboard.js", "function Dashboard() {\n  return <div>User Dashboard</div>;\n}"),
            createFileStructure(
                "/src/algorithm-v1.js",
                "// Attempt 1\nfunction calculate() {\n  // This doesn't work\n  return NaN;\n}",
            ),
            createFileStructure(
                "/src/algorithm-v2.js",
                '// Attempt 2\nfunction calculate() {\n  // Still broken\n  throw new Error("Failed!");\n}',
            ),
            createFileStructure(
                "/src/algorithm-v3.js",
                "// Attempt 3 - WORST\nfunction calculate() {\n  while(true) {} // Infinite loop!\n}",
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial project",
                    files: ["/README.md"],
                },
                {
                    message: "Add user authentication",
                    files: ["/src/auth.js"],
                },
                {
                    message: "Add user dashboard",
                    files: ["/src/dashboard.js"],
                },
                {
                    message: "Try experimental algorithm v1 - doesn't work",
                    files: ["/src/algorithm-v1.js"],
                },
                {
                    message: "Try experimental algorithm v2 - still broken",
                    files: ["/src/algorithm-v2.js"],
                },
                {
                    message: "Try experimental algorithm v3 - COMPLETE DISASTER",
                    files: ["/src/algorithm-v3.js"],
                },
            ],
        }),
    }),
});

// Level 3: git reset with commit hash (Advanced: Using actual commit IDs)
const resetLevel3 = createLevel({
    id: 3,
    name: "reset.level3.name",
    description: "reset.level3.description",
    objectives: ["reset.level3.objective1", "reset.level3.objective2"],
    hints: [
        "reset.level3.hint1",
        "reset.level3.hint2",
        "reset.level3.hint3",
        "reset.level3.hint4",
        "reset.level3.hint5",
        "reset.level3.hint6",
        "reset.level3.hint7",
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "view-commit-history",
            command: "git log",
            description: "reset.level3.requirement1.description",
            successMessage: "reset.level3.requirement1.success",
        },
        {
            id: "reset-to-specific-commit",
            command: "git reset",
            requiresArgs: ["<hash>"],
            description: "reset.level3.requirement2.description",
            successMessage: "reset.level3.requirement2.success",
        },
    ],
    story: createStory({
        title: "reset.level3.story.title",
        narrative: "reset.level3.story.narrative",
        realWorldContext: "reset.level3.story.realWorldContext",
        taskIntroduction: "reset.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Production Application\n\nVersion control matters!"),
            createFileStructure("/src/app.js", 'console.log("Version 1 - Basic");'),
            createFileStructure("/src/styles.css", "body { margin: 0; }"),
            createFileStructure(
                "/src/feature.js",
                '// Broken feature\nfunction unstableCode() {\n  throw new Error("Still broken!");\n}',
            ),
            createFileStructure("/src/fix-v1.js", "// Fix attempt 1\nfunction fix1() { return false; }"),
            createFileStructure("/src/fix-v2.js", "// Fix attempt 2\nfunction fix2() { return null; }"),
            createFileStructure("/src/fix-v3.js", "// Fix attempt 3\nfunction fix3() { return undefined; }"),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md"],
                },
                {
                    message: "Version 1 - Basic functionality",
                    files: ["/src/app.js"],
                },
                {
                    message: "Version 2 - Good version with styling",
                    files: ["/src/styles.css"],
                },
                {
                    message: "Update styling - cosmetic changes",
                    files: ["/src/styles.css"],
                },
                {
                    message: "Add broken feature - started the problems",
                    files: ["/src/feature.js"],
                },
                {
                    message: "Attempted fix v1 - didn't work",
                    files: ["/src/fix-v1.js"],
                },
                {
                    message: "Attempted fix v2 - still broken",
                    files: ["/src/fix-v2.js"],
                },
                {
                    message: "Attempted fix v3 - giving up",
                    files: ["/src/fix-v3.js"],
                },
            ],
        }),
    }),
});

const resetLevel4 = createLevel({
    id: 4,
    name: "reset.level4.name",
    description: "reset.level4.description",
    objectives: ["reset.level4.objective1", "reset.level4.objective2"],
    hints: ["reset.level4.hint1", "reset.level4.hint2", "reset.level4.hint3"],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            command: "git log",
            requiresArgs: ["--oneline"],
            description: "reset.level4.requirement1.description",
            successMessage: "reset.level4.requirement1.success",
            id: "inspect-history",
        }),
        createRequirement({
            command: "git revert",
            requiresArgs: ["HEAD"],
            description: "reset.level4.requirement2.description",
            successMessage: "reset.level4.requirement2.success",
            id: "revert-head",
        }),
    ],
    story: createStory({
        title: "reset.level4.story.title",
        narrative: "reset.level4.story.narrative",
        realWorldContext: "reset.level4.story.realWorldContext",
        taskIntroduction: "reset.level4.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure(
                "/src/payment.js",
                "// Payment flow\nfunction processPayment(order) {\n  validate(order);\n  return charge(order);\n}",
            ),
            createFileStructure(
                "/src/hotfix.js",
                "// Quick fix pushed without review\nfunction patch() {\n  return true; // TODO: this breaks refunds!\n}",
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Add stable payment flow",
                    files: ["/src/payment.js"],
                },
                {
                    message: "Quick fix without review",
                    files: ["/src/hotfix.js"],
                },
            ],
        }),
    }),
});

export const resetLevels = {
    1: resetLevel1,
    2: resetLevel2,
    3: resetLevel3,
    4: resetLevel4,
};
