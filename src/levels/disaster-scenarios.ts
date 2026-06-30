import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
    createMergeConflictContent,
} from "./LevelCreator";

export const disasterScenarios = [
    createLevel({
        id: 1,
        name: "scenarios.pushedToMain.name",
        description: "scenarios.pushedToMain.description",
        objectives: ["scenarios.pushedToMain.objective1"],
        hints: ["scenarios.pushedToMain.hint1", "scenarios.pushedToMain.hint2"],
        requirements: [
            createRequirement({
                id: "fix-main",
                command: "git reset",
                description: "scenarios.pushedToMain.requirement1",
                successMessage: "scenarios.pushedToMain.success",
            }),
        ],
        story: createStory({
            title: "Pushed to Main",
            narrative: "Your team lead calls you in a panic — the production site just went down. You check the repo and realize you pushed three broken WIP commits straight to main without opening a PR. Your teammates are about to pull and break their local setups too.",
            realWorldContext: "Pushing directly to main without review is one of the most common beginner mistakes. Most teams protect the main branch with rules that prevent this — but when it happens, knowing how to revert cleanly (without rewriting shared history) is a critical skill.",
            taskIntroduction: "Use git revert or git reset to undo the 3 broken commits and push a clean fix to main.",
        }),
        initialState: createInitialState({
            files: [
                createFileStructure("/app.js", "console.log('Production app');\n// BROKEN CODE HERE\nprocess.exit(1);"),
            ],
            git: createGitState({
                initialized: true,
                currentBranch: "main",
                commits: [
                    { message: "Initial commit", files: ["/app.js"] },
                    { message: "Add feature X (broken)", files: ["/app.js"] },
                    { message: "Fix feature X (still broken)", files: ["/app.js"] },
                    { message: "Urgent fix (broken production)", files: ["/app.js"] },
                ],
            }),
        }),
        commandSuggestions: ["git log --oneline", "git reset HEAD~3", "hint"],
    }),
    createLevel({
        id: 2,
        name: "scenarios.mergeConflict.name",
        description: "scenarios.mergeConflict.description",
        objectives: ["scenarios.mergeConflict.objective1"],
        hints: ["scenarios.mergeConflict.hint1", "scenarios.mergeConflict.hint2"],
        requirements: [
            createRequirement({
                id: "resolve-conflict",
                command: "git commit",
                description: "scenarios.mergeConflict.requirement1",
                successMessage: "scenarios.mergeConflict.success",
            }),
        ],
        story: createStory({
            title: "Merge Conflict Hell",
            narrative: "You and a teammate both edited auth.js this week — you updated the token parsing logic, they refactored the middleware. Now you're trying to merge and Git can't figure out which version to keep. Both changes are valid. You need to manually combine them.",
            realWorldContext: "Merge conflicts happen on every real team. Git marks the conflicting sections with <<<, ===, and >>> markers. Your job is to read both versions, decide what the final code should look like, remove the markers, and commit.",
            taskIntroduction: "Resolve the conflict in auth.js by removing the conflict markers, keeping the correct code, then git add and git commit to finish the merge.",
        }),
        initialState: createInitialState({
            files: [
                createFileStructure(
                    "/auth.js",
                    createMergeConflictContent(
                        "const login = (user) => { return true; }; // Main branch version",
                        "const login = (u) => { console.log(u); return true; }; // Feature version",
                        "// Authentication Library\n",
                    ),
                ),
            ],
            git: createGitState({
                initialized: true,
                currentBranch: "main",
                mergeConflicts: [
                    {
                        file: "/auth.js",
                        content: createMergeConflictContent(
                            "const login = (user) => { return true; };",
                            "const login = (u) => { console.log(u); return true; };",
                        ),
                    },
                ],
            }),
        }),
        commandSuggestions: ["git status", "nano auth.js", "git add auth.js", "git commit -m \"Fix conflict\""],
    }),
    createLevel({
        id: 3,
        name: "scenarios.deletedBranch.name",
        description: "scenarios.deletedBranch.description",
        objectives: ["scenarios.deletedBranch.objective1"],
        hints: ["scenarios.deletedBranch.hint1", "scenarios.deletedBranch.hint2"],
        requirements: [
            createRequirement({
                id: "recover-branch",
                command: "git branch",
                description: "scenarios.deletedBranch.requirement1",
                successMessage: "scenarios.deletedBranch.success",
            }),
        ],
        story: createStory({
            title: "Deleted the Wrong Branch",
            narrative: "You've been building Stripe payment integration for two weeks. You thought it was merged, so you ran git branch -D feature/payments to clean up. It wasn't merged. The branch is gone — but the commits aren't. Not yet.",
            realWorldContext: "Git keeps a local log of every place HEAD has pointed called the reflog. Even after a branch is deleted, its commits stay in reflog for 30 days. This is your safety net for recovering lost work.",
            taskIntroduction: "Use git reflog to find the last commit hash from the deleted branch, then recreate the branch from that hash.",
        }),
        initialState: createInitialState({
            files: [],
            git: createGitState({
                initialized: true,
                currentBranch: "main",
                commits: [
                    { message: "Initial commit", files: [] },
                    { message: "Start payments feature", files: ["/payments.js"] },
                ],
            }),
        }),
        commandSuggestions: ["git reflog", "git branch feature/payments <hash>", "hint"],
    }),
    createLevel({
        id: 4,
        name: "scenarios.forcePush.name",
        description: "scenarios.forcePush.description",
        objectives: ["scenarios.forcePush.objective1"],
        hints: ["scenarios.forcePush.hint1", "scenarios.forcePush.hint2"],
        requirements: [
            createRequirement({
                id: "fix-force-push",
                command: "git cherry-pick",
                description: "scenarios.forcePush.requirement1",
                successMessage: "scenarios.forcePush.success",
            }),
        ],
        story: createStory({
            title: "Force Push Disaster",
            narrative: "You rebased your local branch to clean up the commit history and ran git push --force. What you didn't realize is that your colleague Sarah had pushed two commits to the same branch an hour ago. Her work is now gone from the remote. She's furious.",
            realWorldContext: "Force pushing to a shared branch is one of the most destructive Git mistakes. It overwrites the remote with your local version, discarding any commits others have pushed. Always use git push --force-with-lease instead — it fails if someone else has pushed since your last fetch.",
            taskIntroduction: "Find Sarah's lost commits using git reflog and restore them to the branch using git cherry-pick.",
        }),
        initialState: createInitialState({
            files: [],
            git: createGitState({
                initialized: true,
                currentBranch: "dev",
                commits: [
                    { message: "Base commit", files: [] },
                    { message: "Work commit 1 (lost)", files: ["/work1.js"] },
                    { message: "Work commit 2 (lost)", files: ["/work2.js"] },
                    { message: "Force pushed commit by colleague", files: ["/readme.md"] },
                ],
            }),
        }),
        commandSuggestions: ["git reflog", "git cherry-pick <hash1> <hash2>", "hint"],
    }),
    createLevel({
        id: 5,
        name: "scenarios.committedSecrets.name",
        description: "scenarios.committedSecrets.description",
        objectives: ["scenarios.committedSecrets.objective1"],
        hints: ["scenarios.committedSecrets.hint1", "scenarios.committedSecrets.hint2"],
        requirements: [
            createRequirement({
                id: "purge-keys",
                command: "git filter-branch",
                alternativeCommands: ["git filter-repo"],
                description: "scenarios.committedSecrets.requirement1",
                successMessage: "scenarios.committedSecrets.success",
            }),
        ],
        story: createStory({
            title: "Committed API Keys",
            narrative: "You were setting up a new feature and accidentally committed your .env file — the one with your real AWS access keys. You pushed it to a public GitHub repo 10 minutes ago. The keys are live and exposed. Bots scan GitHub constantly for exactly this.",
            realWorldContext: "Committed secrets are a critical security incident. Even if you delete the file in a new commit, it still exists in Git history and anyone can see it. You must rewrite history with git filter-branch or BFG Repo Cleaner to fully remove it — and rotate the keys immediately, assuming they're already compromised.",
            taskIntroduction: "Rotate the exposed keys first, then purge .env from the entire Git history using git filter-branch and force push.",
        }),
        initialState: createInitialState({
            files: [
                createFileStructure("/.env", "AWS_SECRET_KEY=AKIA1234567890"),
                createFileStructure("/index.js", "console.log('App running');"),
            ],
            git: createGitState({
                initialized: true,
                currentBranch: "main",
                commits: [
                    { message: "Initial commit", files: ["/index.js"] },
                    { message: "Add env vars", files: ["/.env", "/index.js"] },
                    { message: "Update app logic", files: ["/index.js"] },
                ],
            }),
        }),
        commandSuggestions: ["git log --oneline", "git filter-branch --tree-filter 'rm -f .env' HEAD", "hint"],
    }),
];
