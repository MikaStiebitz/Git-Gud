import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const teamworkLevel1 = createLevel({
    id: 1,
    name: "teamwork.level1.name",
    description: "teamwork.level1.description",
    objectives: [
        "teamwork.level1.objective1",
        "teamwork.level1.objective2",
        "teamwork.level1.objective3",
        "teamwork.level1.objective4",
        "teamwork.level1.objective5",
        "teamwork.level1.objective6"
    ],
    hints: [
        "teamwork.level1.hint1",
        "teamwork.level1.hint2",
        "teamwork.level1.hint3",
        "teamwork.level1.hint4",
        "teamwork.level1.hint5",
        "teamwork.level1.hint6"
    ],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            objectiveId: 1,
            command: "git pull",
            alternativeCommands: ["git pull origin main", "git pull origin"],
            description: "teamwork.level1.requirement1.description",
            successMessage: "teamwork.level1.requirement1.success",
            id: "git-pull-origin",
        }),
        createRequirement({
            objectiveId: 2,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["-c"],
            description: "teamwork.level1.requirement2.description",
            successMessage: "teamwork.level1.requirement2.success",
            id: "git-switch",
        }),
        createRequirement({
            objectiveId: 3,
            command: "", // No command needed - state-based check
            checkFileChanged: "/team.md",
            description: "teamwork.level1.requirement3.description",
            successMessage: "teamwork.level1.requirement3.success",
            id: "edit-team-file",
        }),
        createRequirement({
            objectiveId: 4,
            command: "git add",
            requiresArgs: ["any"],
            description: "teamwork.level1.requirement4.description",
            successMessage: "teamwork.level1.requirement4.success",
            id: "git-add-teamwork",
        }),
        createRequirement({
            objectiveId: 5,
            command: "git commit",
            requiresArgs: ["-m"],
            description: "teamwork.level1.requirement5.description",
            successMessage: "teamwork.level1.requirement5.success",
            id: "git-commit-teamwork",
        }),
        createRequirement({
            objectiveId: 6,
            command: "git push",
            requiresArgs: ["any"],
            description: "teamwork.level1.requirement6.description",
            successMessage: "teamwork.level1.requirement6.success",
            id: "git-push-teamwork",
        })
    ],
    story: createStory({
        title: "teamwork.level1.story.title",
        narrative: "teamwork.level1.story.narrative",
        realWorldContext: "teamwork.level1.story.realWorldContext",
        taskIntroduction: "teamwork.level1.story.taskIntroduction"
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/team.md", "# Development Team\n\n## Team Members\n- Alex Chen - Team Lead\n- Sarah Miller - Senior Developer\n- Mike Johnson - Frontend Developer\n\n## Add your profile here!"),
            createFileStructure("/src/components/TeamPage.jsx", "// Team page component\nexport function TeamPage() {\n  return <div>Team profiles coming soon...</div>;\n}"),
            createFileStructure("/README.md", "# InnovateCorp Project\n\nA collaborative development environment.")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial team structure setup",
                    files: ["/team.md", "/src/components/TeamPage.jsx", "/README.md"]
                }
            ],
            remoteCommits: [
                {
                    branch: "main",
                    commits: [
                        {
                            id: "remote001",
                            message: "Update team guidelines",
                            files: {
                                "/team.md": "# Development Team\n\n## Team Members\n- Alex Chen - Team Lead\n- Sarah Miller - Senior Developer\n- Mike Johnson - Frontend Developer\n\n## Guidelines\nPlease add your name below!\n\n## Add your profile here!"
                            }
                        }
                    ]
                }
            ]
        })
    })
});

const teamworkLevel2 = createLevel({
    id: 2,
    name: "teamwork.level2.name",
    description: "teamwork.level2.description",
    objectives: [
        "teamwork.level2.objective1",
        "teamwork.level2.objective2",
        "teamwork.level2.objective3",
        "teamwork.level2.objective4"
    ],
    hints: [
        "teamwork.level2.hint1",
        "teamwork.level2.hint2",
        "teamwork.level2.hint3",
        "teamwork.level2.hint4",
        "teamwork.level2.hint5",
        "teamwork.level2.hint6",
        "teamwork.level2.hint7",
        "teamwork.level2.hint8"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "stage-initial-changes",
            objectiveId: 1, // Objective 1: Stage and commit your local changes
            command: "git add",
            description: "teamwork.level2.requirement1.description",
            successMessage: "teamwork.level2.requirement1.success"
        },
        {
            id: "commit-initial-changes",
            objectiveId: 1, // Objective 1: Stage and commit your local changes (both add AND commit needed)
            command: "git commit",
            description: "teamwork.level2.requirement2.description",
            successMessage: "teamwork.level2.requirement2.success"
        },
        {
            id: "pull-remote-changes",
            objectiveId: 2, // Objective 2: Pull remote changes (triggers conflict)
            command: "git pull",
            description: "teamwork.level2.requirement3.description",
            successMessage: "teamwork.level2.requirement3.success"
        },
        {
            id: "resolve-conflict-markers",
            objectiveId: 3, // Objective 3: Resolve merge conflict markers
            command: "", // State-based check
            checkFileChanged: "/src/auth/login.js",
            description: "teamwork.level2.requirement4.description",
            successMessage: "teamwork.level2.requirement4.success"
        },
        {
            id: "stage-resolved-conflict",
            objectiveId: 4, // Objective 4: Stage and commit the merged solution
            command: "git add",
            description: "teamwork.level2.requirement5.description",
            successMessage: "teamwork.level2.requirement5.success"
        },
        {
            id: "commit-merge-resolution",
            objectiveId: 4, // Objective 4: Stage and commit the merged solution (both add AND commit needed)
            command: "git commit",
            description: "teamwork.level2.requirement5.description",
            successMessage: "teamwork.level2.requirement5.success"
        }
    ],
    story: createStory({
        title: "teamwork.level2.story.title",
        narrative: "teamwork.level2.story.narrative",
        realWorldContext: "teamwork.level2.story.realWorldContext",
        taskIntroduction: "teamwork.level2.story.taskIntroduction"
    }),
    initialState: createInitialState({
        files: [
            // Original committed version (basic validation)
            createFileStructure("/src/auth/login.js", "// Authentication module\nfunction validateLogin(username, password) {\n  // Basic validation\n  return username.length >= 3 && password.length >= 6;\n}"),
            createFileStructure("/src/auth/signup.js", "// User registration\nfunction createUser(userData) {\n  return database.users.create(userData);\n}")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Add authentication foundation",
                    files: ["/src/auth/login.js", "/src/auth/signup.js"]
                }
            ],
            // Sarah's changes waiting on remote
            remoteCommits: [
                {
                    branch: "main",
                    commits: [
                        {
                            id: "abc1234",
                            message: "Add email validation to login by Sarah",
                            files: {
                                "/src/auth/login.js": "// Authentication module\nfunction validateLogin(username, password) {\n  // Sarah's implementation with email validation\n  if (!username || !password) return false;\n  const isValidEmail = username.includes('@');\n  return isValidEmail && password.length >= 6;\n}"
                            }
                        }
                    ]
                }
            ],
            // Your local uncommitted changes (you've been working on this!)
            fileChanges: [
                {
                    path: "/src/auth/login.js",
                    status: "modified",
                    content: "// Authentication module\nfunction validateLogin(username, password) {\n  // Your improved implementation with stronger requirements\n  if (!username || !password) return false;\n  return username.length >= 5 && password.length >= 10;\n}"
                }
            ]
        })
    })
});

const teamworkLevel3 = createLevel({
    id: 3,
    name: "teamwork.level3.name",
    description: "teamwork.level3.description",
    objectives: [
        "teamwork.level3.objective1",
        "teamwork.level3.objective2",
        "teamwork.level3.objective3",
        "teamwork.level3.objective4"
    ],
    hints: [
        "teamwork.level3.hint1",
        "teamwork.level3.hint2",
        "teamwork.level3.hint3",
        "teamwork.level3.hint4",
        "teamwork.level3.hint5",
        "teamwork.level3.hint6",
        "teamwork.level3.hint7"
    ],
    requirementLogic: "all",
    requirements: [
        {
            id: "create-review-branch",
            objectiveId: 1,
            command: "git switch",
            alternativeCommands: ["git checkout"],
            requiresArgs: ["-c"],
            description: "teamwork.level3.requirement1.description",
            successMessage: "teamwork.level3.requirement1.success"
        },
        {
            id: "stage-code-for-review",
            objectiveId: 2,
            command: "git add",
            description: "teamwork.level3.requirement2.description",
            successMessage: "teamwork.level3.requirement2.success"
        },
        {
            id: "commit-for-review",
            objectiveId: 3,
            command: "git commit",
            description: "teamwork.level3.requirement3.description",
            successMessage: "teamwork.level3.requirement3.success"
        },
        {
            id: "push-for-review",
            objectiveId: 4,
            command: "git push",
            requiresArgs: ["any"],
            description: "teamwork.level3.requirement4.description",
            successMessage: "teamwork.level3.requirement4.success"
        }
    ],
    story: createStory({
        title: "teamwork.level3.story.title",
        narrative: "teamwork.level3.story.narrative",
        realWorldContext: "teamwork.level3.story.realWorldContext",
        taskIntroduction: "teamwork.level3.story.taskIntroduction"
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/src/auth/password-reset.js", "// Password reset functionality\nfunction initiatePasswordReset(email) {\n  // TODO: Implement password reset logic\n  console.log('Password reset requested for:', email);\n}"),
            createFileStructure("/src/auth/email-service.js", "// Email service integration\nfunction sendResetEmail(email, token) {\n  // Email sending logic here\n  return true;\n}"),
            createFileStructure("/tests/password-reset.test.js", "// Tests for password reset\ntest('password reset sends email', () => {\n  // Test implementation\n});")
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Add authentication system foundation",
                    files: ["/src/auth/password-reset.js", "/src/auth/email-service.js"]
                }
            ]
        })
    })
});

export const teamworkLevels = {
    1: teamworkLevel1,
    2: teamworkLevel2,
    3: teamworkLevel3,
};
