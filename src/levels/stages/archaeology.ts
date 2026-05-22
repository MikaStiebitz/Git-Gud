import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const archaeologyLevel1 = createLevel({
    id: 1,
    name: "archaeology.level1.name",
    description: "archaeology.level1.description",
    objectives: [
        "archaeology.level1.objective1",
        "archaeology.level1.objective2",
        "archaeology.level1.objective3"
    ],
    hints: [
        "archaeology.level1.hint1",
        "archaeology.level1.hint2",
        "archaeology.level1.hint3",
        "archaeology.level1.hint4"
    ],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            objectiveId: 1,
            command: "git blame",
            requiresArgs: ["any"],
            description: "archaeology.level1.requirement1.description",
            successMessage: "archaeology.level1.requirement1.success",
            id:"git-blame",
        }),
        createRequirement({
            objectiveId: 2,
            command: "git log",
            requiresArgs: ["--oneline"],
            description: "archaeology.level1.requirement2.description",
            successMessage: "archaeology.level1.requirement2.success",
            id: "git-log",
 
        }),
        createRequirement({
            objectiveId: 3,
            command: "git show",
            requiresArgs: ["any"],
            description: "archaeology.level1.requirement3.description",
            successMessage: "archaeology.level1.requirement3.success",
            id: "git-show",
        })
    ],
    story: createStory({
        title: "archaeology.level1.story.title",
        narrative: "archaeology.level1.story.narrative",
        realWorldContext: "archaeology.level1.story.realWorldContext",
        taskIntroduction: "archaeology.level1.story.taskIntroduction"
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/utils/validator.js", `// Input validation utilities
// Created by: Original Team (2022)
// Modified by: Sarah Chen (phone validation - March 2023)
// Modified by: Alex Rodriguez (international support - June 2023)
// Modified by: Jordan Kim (bug fixes - September 2023)

function validatePhoneNumber(phone) {
    // US phone number validation - Sarah Chen, March 2023
    const usPattern = /^\\+?1?[2-9]\\d{2}[2-9]\\d{2}\\d{4}$/;

    // European phone number validation - Alex Rodriguez, June 2023
    // BUG: Missing country code handling for some EU countries
    const euPattern = /^\\+?[1-9]\\d{1,14}$/;

    // Bug fix attempt - Jordan Kim, September 2023
    // TODO: This doesn't handle all edge cases
    if (phone.startsWith('+')) {
        return euPattern.test(phone);
    }

    return usPattern.test(phone);
}

function validateEmail(email) {
    // Basic email validation - Original Team, 2022
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

module.exports = { validatePhoneNumber, validateEmail };`),
            createFileStructure("/tests/validator.test.js", "// Validator tests\ntest('validates US phone numbers', () => {\n  expect(validatePhoneNumber('555-123-4567')).toBe(true);\n});"),
            createFileStructure("/bug-reports/issue-247.md", "# Issue #247: International Phone Validation\n\n## Problem\nUsers from Germany, France, and Netherlands cannot register.\n\n## Error\n'Invalid phone number format'")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial validation system",
                    files: ["/src/utils/validator.js", "/tests/validator.test.js"]
                },
                {
                    message: "Add phone number validation for US users",
                    files: ["/src/utils/validator.js"]
                },
                {
                    message: "Add international phone support for EU expansion",
                    files: ["/src/utils/validator.js"]
                },
                {
                    message: "Attempt to fix phone validation edge cases",
                    files: ["/src/utils/validator.js"]
                },
                {
                    message: "Add bug report for investigation",
                    files: ["/bug-reports/issue-247.md"]
                }
            ]
        })
    })
});

const archaeologyLevel2 = createLevel({
    id: 2,
    name: "archaeology.level2.name",
    description: "archaeology.level2.description",
    objectives: [
        "archaeology.level2.objective1",
        "archaeology.level2.objective3",
        "archaeology.level2.objective4"
    ],
    hints: [
        "archaeology.level2.hint1",
        "archaeology.level2.hint2",
        "archaeology.level2.hint3",
        "archaeology.level2.hint4"
    ],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            objectiveId: 1,
            command: "git log",
            requiresArgs: ["--grep"],
            description: "archaeology.level2.requirement1.description",
            successMessage: "archaeology.level2.requirement1.success",
            id: "git-log-1"
        }),
        createRequirement({
            objectiveId: 2,
            command: "git log",
            requiresArgs: ["-S"],
            description: "archaeology.level2.requirement2.description",
            successMessage: "archaeology.level2.requirement2.success",
            id: "git-log-2",

        }),
        createRequirement({
            objectiveId: 3,
            command: "git log",
            requiresArgs: ["--author"],
            description: "archaeology.level2.requirement3.description",
            successMessage: "archaeology.level2.requirement3.success",
            id: "git-log-3",
        })
    ],
    story: createStory({
        title: "archaeology.level2.story.title",
        narrative: "archaeology.level2.story.narrative",
        realWorldContext: "archaeology.level2.story.realWorldContext",
        taskIntroduction: "archaeology.level2.story.taskIntroduction"
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/auth/security.js", `// Security utilities
// SECURITY: Encryption and hashing functions

const crypto = require('crypto');

function hashPassword(password, salt) {
    // Added password hashing - Sarah Chen, Jan 2023
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
}

function generateSalt() {
    // Security improvement - Marcus Johnson, Feb 2023
    return crypto.randomBytes(32);
}

function verifyPassword(password, hash, salt) {
    // Password verification - Sarah Chen, Jan 2023
    const newHash = hashPassword(password, salt);
    return crypto.timingSafeEqual(hash, newHash);
}

module.exports = { hashPassword, generateSalt, verifyPassword };`),
            createFileStructure("/src/auth/session.js", "// Session management\nfunction createSession(userId) {\n  // Session handling logic\n  return jwt.sign({ userId }, secretKey);\n}"),
            createFileStructure("/SECURITY.md", "# Security Guidelines\n\n## Password Policy\n- Minimum 8 characters\n- Must include special characters\n\n## Encryption\n- All passwords are hashed with PBKDF2")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial authentication system",
                    files: ["/src/auth/session.js"]
                },
                {
                    message: "Add password hashing for security",
                    files: ["/src/auth/security.js"]
                },
                {
                    message: "Security: Improve salt generation",
                    files: ["/src/auth/security.js"]
                },
                {
                    message: "Update user interface components",
                    files: ["/src/components/UserForm.js"]
                },
                {
                    message: "Security audit: Add password verification",
                    files: ["/src/auth/security.js"]
                },
                {
                    message: "Add security documentation",
                    files: ["/SECURITY.md"]
                }
            ]
        })
    })
});

const archaeologyLevel3 = createLevel({
    id: 3,
    name: "archaeology.level3.name",
    description: "archaeology.level3.description",
    objectives: [
        "archaeology.level3.objective1",
        "archaeology.level3.objective2",
        "archaeology.level3.objective3"
    ],
    hints: [
        "archaeology.level3.hint1",
        "archaeology.level3.hint2",
        "archaeology.level3.hint3",
        "archaeology.level3.hint4"
    ],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            objectiveId: 1,
            command: "git reflog",
            description: "archaeology.level3.requirement1.description",
            successMessage: "archaeology.level3.requirement1.success",
            id: "git-reflog"
        }),
        createRequirement({
            objectiveId: 2,
            command: "git reset",
            requiresArgs: ["--hard"],
            description: "archaeology.level3.requirement2.description",
            successMessage: "archaeology.level3.requirement2.success",
            id: "git-reset"
        }),
        createRequirement({
            objectiveId: 3,
            command: "git branch",
            requiresArgs: ["any"],
            description: "archaeology.level3.requirement3.description",
            successMessage: "archaeology.level3.requirement3.success",
            id: "git-branch"
        })
    ],
    story: createStory({
        title: "archaeology.level3.story.title",
        narrative: "archaeology.level3.story.narrative",
        realWorldContext: "archaeology.level3.story.realWorldContext",
        taskIntroduction: "archaeology.level3.story.taskIntroduction"
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Project Repository\n\nMain development branch - some work may appear to be lost!"),
            createFileStructure("/src/main.js", "// Main application\nconsole.log('Basic app structure');"),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"]
                },
                {
                    message: "Add authentication system (LOST!)",
                    files: ["/src/auth/login.js", "/src/auth/register.js"]
                },
                {
                    message: "Add new UI components (LOST!)",
                    files: ["/src/components/LoginForm.js", "/src/components/UserDashboard.js"]
                },
                {
                    message: "Complete test suite (LOST!)",
                    files: ["/tests/auth.test.js", "/tests/ui.test.js"]
                }
            ]
        })
    })
});

export const archaeologyLevels = {
    1: archaeologyLevel1,
    2: archaeologyLevel2,
    3: archaeologyLevel3,
};
