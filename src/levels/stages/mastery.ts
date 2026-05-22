import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const masteryLevel1 = createLevel({
    id: 1,
    name: "mastery.level1.name",
    description: "mastery.level1.description",
    objectives: [
        "mastery.level1.objective1",
        "mastery.level1.objective3",
        "mastery.level1.objective4"
    ],
    hints: [
        "mastery.level1.hint1",
        "mastery.level1.hint2",
        "mastery.level1.hint3",
        "mastery.level1.hint4"
    ],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            objectiveId: 1,
            command: "git merge",
            requiresArgs: ["any"],
            description: "mastery.level1.requirement1.description",
            successMessage: "mastery.level1.requirement1.success",
            id: "git-merge-feature"
        }),
        createRequirement({
            objectiveId: 2,
            command: "git add",
            requiresArgs: ["any"],
            description: "mastery.level1.requirement2.description",
            successMessage: "mastery.level1.requirement2.success",
            id: "git-add-all",
        }),
        createRequirement({
            objectiveId: 3,
            command: "git commit",
            requiresArgs: ["-m"],
            description: "mastery.level1.requirement3.description",
            successMessage: "mastery.level1.requirement3.success",
            id: "git-commit-message",
        })
    ],
    story: createStory({
        title: "mastery.level1.story.title",
        narrative: "mastery.level1.story.narrative",
        realWorldContext: "mastery.level1.story.realWorldContext",
        taskIntroduction: "mastery.level1.story.taskIntroduction"
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/app.js", "// Main application\nconst auth = require('./auth');\nconst payments = require('./payments');\nconst ui = require('./ui');\n\napp.use(auth);\napp.use(payments);\napp.use(ui);"),
            createFileStructure("/src/utils/shared.js", "// Shared utilities - BASE VERSION\nfunction formatDate(date) {\n  return date.toISOString();\n}")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature/auth", "feature/payments", "feature/ui"],
            commits: [
                {
                    message: "Initial application structure",
                    files: ["/src/app.js", "/src/utils/shared.js"]
                }
            ],
            mergeConflicts: [
                {
                    file: "/src/utils/shared.js",
                    content: `// Shared utilities
<<<<<<< feature/auth
function formatDate(date) {
  // Auth team needs ISO format
  return date.toISOString();
}
=======
function formatDate(date) {
  // Payments team needs locale format
  return date.toLocaleDateString();
}
>>>>>>> feature/payments

<<<<<<< feature/ui
// UI utility functions
function formatCurrency(amount) {
  return '$' + amount.toFixed(2);
}
=======
// Empty - no UI utilities in other branches
>>>>>>> HEAD`
                }
            ]
        })
    })
});

const masteryLevel2 = createLevel({
    id: 2,
    name: "mastery.level2.name",
    description: "mastery.level2.description",
    objectives: [
        "mastery.level2.objective1"
    ],
    hints: [
        "mastery.level2.hint1",
        "mastery.level2.hint2",
        "mastery.level2.hint3",
        "mastery.level2.hint4"
    ],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            objectiveId: 1,
            command: "git status",
            description: "mastery.level2.requirement1.description",
            successMessage: "mastery.level2.requirement1.success",
            id: "git-status-hooks",
        }),
        createRequirement({
            objectiveId: 1,
            command: "git add",
            requiresArgs: ["any"],
            description: "mastery.level2.requirement2.description",
            successMessage: "mastery.level2.requirement2.success",
            id: "git-add-2",
        }),
        createRequirement({
            objectiveId: 1,
            command: "git commit",
            requiresArgs: ["-m"],
            description: "mastery.level2.requirement3.description",
            successMessage: "mastery.level2.requirement3.success",
            id: "git-commit-2",
        })
    ],
    story: createStory({
        title: "mastery.level2.story.title",
        narrative: "mastery.level2.story.narrative",
        realWorldContext: "mastery.level2.story.realWorldContext",
        taskIntroduction: "mastery.level2.story.taskIntroduction"
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/.git/hooks/pre-commit", `#!/bin/sh
# Pre-commit hook for quality assurance

echo "🔍 Running pre-commit quality checks..."

# Check for code style
echo "Checking code style..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix code style issues."
    exit 1
fi

# Run tests
echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Please fix failing tests."
    exit 1
fi

# Check for secrets
echo "Checking for secrets..."
if grep -r "password\|secret\|api_key" src/; then
    echo "❌ Potential secrets detected. Please remove them."
    exit 1
fi

echo "✅ All quality checks passed!"
exit 0`),
            createFileStructure("/src/main.js", "// Main application\n// TODO: Remove this secret before commit\nconst apiKey = 'sk-test-123';\n\nconsole.log('App starting...');"),
            createFileStructure("/package.json", '{\n  "name": "quality-app",\n  "scripts": {\n    "test": "echo \\"Running tests...\\" && exit 0",\n    "lint": "echo \\"Checking code style...\\" && exit 0"\n  }\n}')
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Set up quality automation infrastructure",
                    files: ["/.git/hooks/pre-commit", "/package.json"]
                }
            ]
        })
    })
});

const masteryLevel3 = createLevel({
    id: 3,
    name: "mastery.level3.name",
    description: "mastery.level3.description",
    objectives: [
        "mastery.level3.objective1",
        "mastery.level3.objective2",
        "mastery.level3.objective3",
        "mastery.level3.objective4"
    ],
    hints: [
        "mastery.level3.hint1",
        "mastery.level3.hint2",
        "mastery.level3.hint3",
        "mastery.level3.hint4"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "create-emergency-branch",
            objectiveId: 1,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["-c"],
            description: "mastery.level3.requirement1.description",
            successMessage: "mastery.level3.requirement1.success"
        },
        createRequirement({
            objectiveId: 2,
            command: "git cherry-pick",
            requiresArgs: ["any"],
            description: "mastery.level3.requirement2.description",
            successMessage: "mastery.level3.requirement2.success",
            id: "git-cherry-pick",
        }),
        createRequirement({
            objectiveId: 3,
            command: "git tag",
            requiresArgs: ["-a"],
            description: "mastery.level3.requirement3.description",
            successMessage: "mastery.level3.requirement3.success",
            id: "git-tag",
        }),
        createRequirement({
            objectiveId: 4,
            command: "git push",
            requiresArgs: ["--tags"],
            description: "mastery.level3.requirement4.description",
            successMessage: "mastery.level3.requirement4.success",
            id: "git-push",
        })
    ],
    story: createStory({
        title: "mastery.level3.story.title",
        narrative: "mastery.level3.story.narrative",
        realWorldContext: "mastery.level3.story.realWorldContext",
        taskIntroduction: "mastery.level3.story.taskIntroduction"
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/EMERGENCY.md", "# BLACK FRIDAY EMERGENCY RESPONSE\n\n## Status: CRITICAL\n\n### Issues:\n- Payment system failing\n- Checkout process broken\n- Performance degraded\n\n### Action Required:\n- Emergency rollback\n- Selective hotfix deployment\n- Customer communication"),
            createFileStructure("/src/payments/processor.js", "// Payment processor - BROKEN VERSION\nfunction processPayment(data) {\n  // BUG: This breaks on high load\n  return processAsync(data).catch(() => null);\n}"),
            createFileStructure("/src/checkout/cart.js", "// Shopping cart - PARTIALLY WORKING\nfunction calculateTotal(items) {\n  // Good implementation\n  return items.reduce((sum, item) => sum + item.price, 0);\n}")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "hotfix/payment-fix", "hotfix/performance", "hotfix/checkout"],
            commits: [
                {
                    message: "Working Black Friday preparation (GOOD)",
                    files: ["/src/payments/processor.js", "/src/checkout/cart.js"]
                },
                {
                    message: "Deploy performance optimizations (BROKEN)",
                    files: ["/src/payments/processor.js"]
                },
                {
                    message: "Emergency: Add monitoring and alerts",
                    files: ["/EMERGENCY.md"]
                }
            ]
        })
    })
});

export const masteryLevels = {
    1: masteryLevel1,
    2: masteryLevel2,
    3: masteryLevel3,
};
