/**
 * E2E Tests für alle Level - Simuliert Nutzereingaben
 *
 * Diese Tests simulieren einen echten Nutzer, der jeden Level spielt.
 * Jeder Test:
 * 1. Setzt den Level auf
 * 2. Führt die Befehle wie ein Nutzer ein
 * 3. Prüft ob der Level erfolgreich abgeschlossen wird
 *
 * Ziel: Logiklöcher, fehlende Requirements und unlösbare Level finden
 */

import { describe, it, expect, beforeEach } from "vitest";
import { FileSystem } from "~/models/FileSystem";
import { GitRepository } from "~/models/GitRepository";
import { LevelManager } from "~/models/LevelManager";
import { CommandProcessor } from "~/models/CommandProcessor";
import { ProgressManager } from "~/models/ProgressManager";
import { allStages } from "~/levels";
import { splitCommandRespectingQuotes } from "~/commands/base/CommandParser";

// Types for our solution map
type LevelSolution = {
    commands: string[];
    preActions?: (fs: FileSystem, git: GitRepository, cmd: CommandProcessor) => void;
    postPullAction?: (fs: FileSystem, git: GitRepository, cmd: CommandProcessor) => void;
    commandsAfterStateCheck?: string[];
    description?: string;
};

type StageSolutions = Record<number, LevelSolution>;

/**
 * Solution Map - Enthält die exakten Befehle um jeden Level zu lösen
 * Diese Map simuliert was ein Nutzer eingeben würde
 */
const LEVEL_SOLUTIONS: Record<string, StageSolutions> = {
    // ========== INTRO STAGE ==========
    intro: {
        4: {
            commands: ["git status", "git diff"],
            description: "Find the modified file with status, then inspect the change with diff",
        },
        1: {
            commands: ["git init"],
            description: "Initialize a new Git repository",
        },
        2: {
            commands: ["git status"],
            description: "Check the status of the repository",
        },
        3: {
            commands: ["git clone https://github.com/example/repo.git", "cd repo"],
            description: "Clone a repository and navigate into it",
        },
    },

    // ========== FILES STAGE ==========
    files: {
        4: {
            commands: ["git mv src/app-config.js src/config.js", "git commit -m 'Rename app-config.js to config.js'"],
            description: "Rename a file with git mv and commit the rename",
        },
        1: {
            commands: ["git add ."],
            description: "Stage all files for commit",
        },
        2: {
            commands: ["git commit -m 'Initial commit'"],
            description: "Commit staged files",
        },
        3: {
            commands: ["git rm temp.txt"],
            description: "Remove a file from git tracking",
        },
    },

    // ========== BRANCHES STAGE ==========
    branches: {
        6: {
            commands: ["git branch -d feature/search-filters", "git branch -D experiment/new-ui"],
            description: "Delete a merged branch safely with -d, then force-delete an unmerged branch with -D",
        },
        1: {
            commands: ["git branch"],
            description: "List all branches",
        },
        2: {
            commands: ["git switch -c new-feature"],
            description: "Create and switch to a new branch",
        },
        3: {
            commands: ["git switch feature"],
            description: "Switch to an existing branch",
        },
        4: {
            commands: ["git checkout feature"],
            description: "Use checkout to switch branches",
        },
        5: {
            commands: ["git switch -c another-feature"],
            description: "Create and switch using checkout -b",
        },
    },

    // ========== MERGE STAGE ==========
    merge: {
        4: {
            commands: ["git status", "git add .", "git commit -m 'Resolve merge conflict in api.js'"],
            preActions: (fs, git, cmd) => {
                // Resolve the conflict markers in the file (combines both branches' changes)
                fs.writeFile(
                    "/src/api.js",
                    "// API request handler\nconst RATE_LIMIT = 100;\nconst TIMEOUT_MS = 8000;\n\nfunction handleRequest(req) {\n  if (isRateLimited(req)) {\n    return reject(req);\n  }\n  return respond(req);\n}\n\nmodule.exports = { handleRequest };",
                );
                git.updateFileStatus("src/api.js", "modified");
            },
            description: "Resolve a merge conflict and complete the merge",
        },
        1: {
            commands: ["git merge feature/user-auth"],
            description: "Merge a feature branch",
        },
        2: {
            commands: ["git merge develop"],
            description: "Merge develop into main",
        },
        3: {
            commands: ["git merge --abort"],
            description: "Abort a merge with conflicts",
        },
    },

    // ========== REBASE STAGE ==========
    rebase: {
        5: {
            commands: ["git rebase main feature/payment-api"],
            description: "Rebase a branch onto main without checking it out first (two-argument form)",
        },
        1: {
            commands: ["git rebase main"],
            description: "Rebase current branch onto main",
        },
        2: {
            commands: ["git rebase --abort"],
            description: "Abort a rebase with conflicts",
        },
        3: {
            commands: ["git rebase -i HEAD~3"],
            description: "Interactive rebase",
        },
        4: {
            commands: ["git rebase main"],
            description: "Rebase onto main branch",
        },
    },

    // ========== REMOTE STAGE ==========
    remote: {
        4: {
            commands: [
                "git push -u origin login-form",
                "git add .",
                "git commit -m 'Polish login error messages'",
                "git push",
            ],
            description:
                "Upstream tracking workflow: publish branch with -u, commit the pending polish, push again without arguments",
        },
        1: {
            commands: ["git remote add origin https://github.com/user/repo.git"],
            description: "Add a remote repository",
        },
        2: {
            commands: ["git push origin main"],
            description: "Push to remote",
        },
        3: {
            commands: ["git push origin feature-branch"],
            description: "Push a feature branch to remote",
        },
    },

    // ========== RESET STAGE ==========
    reset: {
        4: {
            commands: ["git log --oneline", "git revert HEAD"],
            description: "Safely undo a public commit with revert",
        },
        1: {
            commands: ["git reset --soft HEAD~1", "git reset --soft HEAD", "git reset --soft HEAD~2"],
            description: "Soft reset progression",
        },
        2: {
            commands: ["git reset --hard HEAD~1", "git reset --hard HEAD", "git reset --hard HEAD~2"],
            description: "Hard reset progression",
        },
        3: {
            commands: ["git log", "git reset HEAD~3"], // Will get hash dynamically
            preActions: (fs, git, cmd) => {
                // Get a commit hash to use
                const commits = git.getCommits();
                const commitIds = Object.keys(commits);
                if (commitIds.length > 0) {
                    // Store for later use in test
                    (git as any)._testCommitHash = commitIds[0];
                }
            },
            description: "Reset to specific commit hash",
        },
    },

    // ========== STASH STAGE ==========
    stash: {
        4: {
            commands: ["git stash", "git stash apply", "git add .", "git commit -m 'Finish fuzzy search experiment'"],
            description: "Stash, apply (keeping backup), then commit",
        },
        1: {
            commands: ["git stash", "git switch hotfix", "git switch feature", "git stash pop"],
            description: "Stash workflow - save, switch, restore",
        },
        2: {
            commands: [
                "git stash",
                "git switch main",
                "git switch -c new-task",
                "git switch feature/old-task",
                "git stash pop",
            ],
            description: "Complex stash workflow",
        },
        3: {
            preActions: (fs, git, cmd) => {
                // Pre-stash some changes via command (not direct API)
                // First ensure there are changes to stash
                cmd.processCommand("git stash");
            },
            commands: ["git stash list", "git stash pop"],
            description: "List and pop stashes",
        },
    },

    // ========== WORKFLOW STAGE ==========
    workflow: {
        4: {
            commands: ["git add .", "git commit --amend -m 'Fix login timeout'", "git push origin main"],
            description:
                "Amend workflow - stage the forgotten file, fold it into the last commit with a corrected message, then push",
        },
        1: {
            preActions: (fs, git, cmd) => {
                // Modify a file to stage
                fs.writeFile("/src/auth.js", "// Modified auth module\nfunction login() { return true; }");
                git.updateFileStatus("src/auth.js", "modified");
            },
            commands: [
                "git switch -c feature/auth",
                "git add .",
                "git commit -m 'Add authentication'",
                "git push origin feature/auth",
                "git switch main",
                "git merge feature/auth",
            ],
            description: "Complete feature workflow",
        },
        2: {
            preActions: (fs, git, cmd) => {
                fs.writeFile("/src/payment.js", "// Fixed payment\nfunction process() { return validate(); }");
                git.updateFileStatus("src/payment.js", "modified");
            },
            commands: [
                "git switch -c hotfix/payment",
                "git add .",
                "git commit -m 'Fix payment security bug'",
                "git switch main",
                "git merge hotfix/payment",
            ],
            description: "Hotfix workflow",
        },
        3: {
            preActions: (fs, git, cmd) => {
                fs.writeFile("/CHANGELOG.md", "# v2.0.0\n- New release");
                git.updateFileStatus("CHANGELOG.md", "modified");
            },
            commands: [
                "git switch -c release/2.0.0",
                "git add .",
                "git commit -m 'Release v2.0.0'",
                "git switch main",
                "git merge release/2.0.0",
                "git tag v2.0.0",
            ],
            description: "Release workflow with tagging",
        },
    },

    // ========== TEAMWORK STAGE ==========
    teamwork: {
        4: {
            commands: ["git diff", "git add .", "git diff --staged", "git commit -m 'Add email validation to profile'"],
            description: "Self-review workflow with git diff before committing",
        },
        1: {
            preActions: (fs, git, cmd) => {
                // Modify the team file before starting
                fs.writeFile("/team.md", "# Team\n- New member added!");
                git.updateFileStatus("team.md", "modified");
            },
            commands: [
                "git pull origin main",
                "git switch -c feature/my-profile",
                // Note: The state-based check for file edit happens automatically
                "git add team.md",
                "git commit -m 'Add my profile'",
                "git push origin feature/my-profile",
            ],
            description: "Team collaboration workflow",
        },
        2: {
            preActions: (fs, git, cmd) => {
                // No preActions needed - level has uncommitted changes already
            },
            commands: [
                "git add .",
                "git commit -m 'My local changes'",
                "git pull",
                // After pull, simulate editing the conflicted file to resolve it
                // (State-based check will detect the file change)
            ],
            postPullAction: (fs, git, cmd) => {
                // After git pull, modify the file to simulate conflict resolution
                fs.writeFile(
                    "/src/auth/login.js",
                    "// Authentication module\nfunction validateLogin(username, password) {\n  // Merged solution combining both approaches\n  if (!username || !password) return false;\n  const isValidEmail = username.includes('@');\n  return isValidEmail && username.length >= 5 && password.length >= 10;\n}",
                );
                git.updateFileStatus("src/auth/login.js", "modified");
                // Trigger state-based check
                cmd.processCommand("git status");
            },
            commandsAfterStateCheck: ["git add .", "git commit -m 'Resolve merge conflict'"],
            description: "Handle merge conflicts during pull",
        },
        3: {
            preActions: (fs, git, cmd) => {
                fs.writeFile("/tests/password-reset.test.js", "// Updated tests");
                git.updateFileStatus("tests/password-reset.test.js", "modified");
            },
            commands: [
                "git switch -c feature/password-reset",
                "git add .",
                "git commit -m 'Add password reset feature'",
                "git push origin feature/password-reset",
            ],
            description: "Code review workflow",
        },
    },

    // ========== ADVANCED STAGE ==========
    advanced: {
        4: {
            commands: ["git bisect start", "git bisect bad", "git bisect good", "git bisect reset"],
            description: "Full bisect session: start, mark bad/good, reset",
        },
        1: {
            commands: ["git tag -a v1.0.0 -m 'Release v1.0.0'", "git tag", "git push --tags"],
            description: "Git tags workflow",
        },
        2: {
            commands: ["git log --oneline", "git log --author=admin", "git log --grep='feature 2'"],
            description: "Advanced log searching",
        },
        3: {
            preActions: (fs, git, cmd) => {
                // Get commit hash for show command
                const commits = git.getCommits();
                const commitIds = Object.keys(commits);
                if (commitIds.length > 0) {
                    (git as any)._testCommitHash = commitIds[0];
                }
            },
            commands: [], // Will be set dynamically
            description: "Show commit details",
        },
    },

    // ========== ARCHAEOLOGY STAGE ==========
    archaeology: {
        4: {
            commands: ["git restore --staged config.js", "git restore notes.md"],
            description: "Unstage a file and discard working-tree changes with restore",
        },
        1: {
            commands: ["git blame src/utils/validator.js", "git log --oneline", "git show HEAD"],
            description: "Code archaeology - blame and log",
        },
        2: {
            commands: ["git log --grep=security", "git log -S password", "git log --author=Sarah"],
            description: "Advanced log searching",
        },
        3: {
            preActions: (fs, git, cmd) => {
                // Do a reset to create reflog entries
                cmd.processCommand("git reset --hard HEAD~1");
            },
            commands: ["git reflog", "git reset --hard HEAD@{0}", "git branch recovery HEAD@{1}"],
            description: "Reflog and recovery",
        },
    },

    // ========== MASTERY STAGE ==========
    mastery: {
        4: {
            commands: [
                "git add .",
                "git commit --amend -m 'Prepare release v3.0.0 with notes'",
                "git tag -a v3.0.0 -m 'Release v3.0.0'",
            ],
            description: "Amend the release commit and tag it",
        },
        1: {
            preActions: (fs, git, cmd) => {
                // Resolve the conflict markers
                fs.writeFile(
                    "/src/utils/shared.js",
                    "// Resolved shared utilities\nfunction formatDate(date) {\n  return date.toISOString();\n}",
                );
                git.updateFileStatus("src/utils/shared.js", "modified");
            },
            commands: ["git merge feature/auth", "git add .", "git commit -m 'Merge all features'"],
            description: "Multi-branch merge with conflict resolution",
        },
        2: {
            preActions: (fs, git, cmd) => {
                // Remove the secret from the file
                fs.writeFile("/src/main.js", "// Main application\nconsole.log('App starting safely...');");
                git.updateFileStatus("src/main.js", "modified");
            },
            commands: ["git status", "git add .", "git commit -m 'Clean code for quality checks'"],
            description: "Git hooks and quality automation",
        },
        3: {
            preActions: (fs, git, cmd) => {
                // Get commit hash for cherry-pick
                const commits = git.getCommits();
                const commitIds = Object.keys(commits);
                if (commitIds.length > 0) {
                    (git as any)._testCommitHash = commitIds[0];
                }
            },
            commands: [
                "git switch -c emergency-fix",
                "git cherry-pick HEAD~1",
                "git tag -a v2.1.1 -m 'Emergency hotfix'",
                "git push --tags",
            ],
            description: "Emergency hotfix with cherry-pick",
        },
    },
};

// Test helper functions
function createTestEnvironment() {
    const fileSystem = new FileSystem();
    const gitRepository = new GitRepository(fileSystem);
    const progressManager = new ProgressManager();
    const levelManager = new LevelManager();
    const commandProcessor = new CommandProcessor(fileSystem, gitRepository, progressManager);

    return {
        fileSystem,
        gitRepository,
        progressManager,
        levelManager,
        commandProcessor,
    };
}

function executeCommandAndCheckCompletion(
    command: string,
    stageId: string,
    levelId: number,
    env: ReturnType<typeof createTestEnvironment>,
): { output: string[]; isCompleted: boolean } {
    const { commandProcessor, levelManager, gitRepository } = env;

    // Execute the command
    const output = commandProcessor.processCommand(command);

    // Parse the command to check completion
    const parts = splitCommandRespectingQuotes(command.trim());
    const baseCommand = parts[0] || "";
    const args = parts.slice(1);

    // Check if this command completes any requirement
    const isCompleted = levelManager.checkLevelCompletion(stageId, levelId, baseCommand, args, gitRepository);

    // Also check state-based requirements
    levelManager.checkStateBasedRequirements(stageId, levelId, gitRepository, env.fileSystem);

    return { output, isCompleted };
}

function isLevelFullyCompleted(
    stageId: string,
    levelId: number,
    env: ReturnType<typeof createTestEnvironment>,
): boolean {
    const { levelManager } = env;
    const level = levelManager.getLevel(stageId, levelId);

    if (!level) return false;

    // Check if all requirements are completed
    const allCompleted = level.requirements.every(req => !req.id || level.completedRequirements?.includes(req.id));

    return allCompleted;
}

// Generate tests for all stages and levels
describe("E2E Level Tests - Full User Simulation", () => {
    const stageKeys = Object.keys(allStages);

    // Test summary tracking
    const testResults: {
        stage: string;
        level: number;
        passed: boolean;
        error?: string;
        commands?: string[];
    }[] = [];

    describe.each(stageKeys)("Stage: %s", stageKey => {
        const stage = allStages[stageKey as keyof typeof allStages];
        const stageId = stage.id;
        const levelIds = Object.keys(stage.levels)
            .map(Number)
            .sort((a, b) => a - b);

        describe.each(levelIds)("Level %i", levelId => {
            let env: ReturnType<typeof createTestEnvironment>;

            beforeEach(() => {
                env = createTestEnvironment();
            });

            it(`should setup level ${stageId}/${levelId} without errors`, () => {
                const success = env.levelManager.setupLevel(stageId, levelId, env.fileSystem, env.gitRepository);

                expect(success).toBe(true);
            });

            it(`should have valid requirements for level ${stageId}/${levelId}`, () => {
                const level = env.levelManager.getLevel(stageId, levelId);

                expect(level).toBeDefined();
                expect(level?.requirements).toBeDefined();
                expect(level?.requirements.length).toBeGreaterThan(0);

                // Each requirement should have an id
                level?.requirements.forEach(req => {
                    expect(req.id).toBeDefined();
                    expect(req.description).toBeDefined();
                });
            });

            it(`should be completable with correct commands for level ${stageId}/${levelId}`, () => {
                const solution = LEVEL_SOLUTIONS[stageId]?.[levelId];

                if (!solution) {
                    console.warn(`⚠️ No solution defined for ${stageId}/${levelId}`);
                    return;
                }

                // Setup the level
                const setupSuccess = env.levelManager.setupLevel(stageId, levelId, env.fileSystem, env.gitRepository);
                expect(setupSuccess).toBe(true);

                // Run pre-actions if defined
                if (solution.preActions) {
                    solution.preActions(env.fileSystem, env.gitRepository, env.commandProcessor);
                }

                // Get commands (possibly modified by preActions)
                let commands = [...solution.commands];

                // Handle dynamic commit hash requirement for specific levels
                if ((stageId === "reset" && levelId === 3) || (stageId === "advanced" && levelId === 3)) {
                    const hash = (env.gitRepository as any)._testCommitHash;
                    if (hash) {
                        if (stageId === "reset" && levelId === 3) {
                            commands[1] = `git reset ${hash.substring(0, 7)}`;
                        }
                        if (stageId === "advanced" && levelId === 3) {
                            commands = [`git show ${hash.substring(0, 7)}`];
                        }
                    }
                }

                // Execute all commands
                const executionResults: string[] = [];
                for (const command of commands) {
                    try {
                        const result = executeCommandAndCheckCompletion(command, stageId, levelId, env);
                        executionResults.push(`✓ ${command} → ${result.isCompleted ? "COMPLETED" : "pending"}`);

                        // Check for postPullAction after git pull
                        if (command === "git pull" && (solution as any).postPullAction) {
                            (solution as any).postPullAction(env.fileSystem, env.gitRepository, env.commandProcessor);
                            // Check state-based requirements after file modification
                            env.levelManager.checkStateBasedRequirements(
                                stageId,
                                levelId,
                                env.gitRepository,
                                env.fileSystem,
                            );
                        }
                    } catch (error) {
                        executionResults.push(
                            `✗ ${command} → ERROR: ${error instanceof Error ? error.message : "Unknown"}`,
                        );
                    }
                }

                // Execute commandsAfterStateCheck if defined
                if ((solution as any).commandsAfterStateCheck) {
                    for (const command of (solution as any).commandsAfterStateCheck) {
                        try {
                            const result = executeCommandAndCheckCompletion(command, stageId, levelId, env);
                            executionResults.push(`✓ ${command} → ${result.isCompleted ? "COMPLETED" : "pending"}`);
                        } catch (error) {
                            executionResults.push(
                                `✗ ${command} → ERROR: ${error instanceof Error ? error.message : "Unknown"}`,
                            );
                        }
                    }
                }

                // Log execution for debugging
                console.log(`\n📋 ${stageId}/${levelId} - ${solution.description}:`);
                executionResults.forEach(r => console.log(`   ${r}`));

                // Final check - is the level completed?
                const level = env.levelManager.getLevel(stageId, levelId);
                const completedCount = level?.completedRequirements?.length || 0;
                const totalCount = level?.requirements.length || 0;

                console.log(`   📊 Progress: ${completedCount}/${totalCount} requirements completed`);

                if (completedCount < totalCount) {
                    const missingReqs = level?.requirements.filter(
                        req => !level.completedRequirements?.includes(req.id),
                    );
                    console.log(`   ❌ Missing requirements:`);
                    missingReqs?.forEach(req => {
                        console.log(`      - ${req.id}: ${req.command}`);
                    });
                }

                // Assert completion
                expect(completedCount).toBe(totalCount);
            });

            it(`should have matching objectives and hints for level ${stageId}/${levelId}`, () => {
                const level = env.levelManager.getLevel(stageId, levelId);

                expect(level?.objectives).toBeDefined();
                expect(level?.objectives.length).toBeGreaterThan(0);
                expect(level?.hints).toBeDefined();
                expect(level?.hints.length).toBeGreaterThan(0);

                // Story should be present
                if (level?.story) {
                    expect(level.story.title).toBeDefined();
                    expect(level.story.narrative).toBeDefined();
                    expect(level.story.taskIntroduction).toBeDefined();
                }
            });
        });
    });
});

// Additional test suite for specific edge cases
describe("Level Logic Edge Cases", () => {
    describe("Sequential Requirements (requirementLogic: 'all')", () => {
        it("should require commands in order for reset level 1", () => {
            const env = createTestEnvironment();
            const stageId = "reset";
            const levelId = 1;

            env.levelManager.setupLevel(stageId, levelId, env.fileSystem, env.gitRepository);

            // Try executing commands out of order - should not complete
            executeCommandAndCheckCompletion("git reset --soft HEAD~2", stageId, levelId, env);

            const level = env.levelManager.getLevel(stageId, levelId);
            // Should not have completed req 3 before req 1 and 2
            expect(level?.completedRequirements?.includes("reset-soft-head-tilde")).toBe(false);
        });
    });

    describe("Alternative Commands", () => {
        it("should accept git checkout as alternative to git switch", () => {
            const env = createTestEnvironment();
            const stageId = "branches";
            const levelId = 3;

            env.levelManager.setupLevel(stageId, levelId, env.fileSystem, env.gitRepository);

            // Use checkout instead of switch
            executeCommandAndCheckCompletion("git checkout feature", stageId, levelId, env);

            const level = env.levelManager.getLevel(stageId, levelId);
            expect(level?.completedRequirements?.length).toBeGreaterThan(0);
        });

        it("should accept git checkout -b as alternative to git switch -c", () => {
            const env = createTestEnvironment();
            const stageId = "branches";
            const levelId = 2;

            env.levelManager.setupLevel(stageId, levelId, env.fileSystem, env.gitRepository);

            // Use checkout -b instead of switch -c
            executeCommandAndCheckCompletion("git checkout -b new-feature", stageId, levelId, env);

            const level = env.levelManager.getLevel(stageId, levelId);
            expect(level?.completedRequirements?.length).toBeGreaterThan(0);
        });
    });

    describe("State-Based Requirements", () => {
        it("should detect file changes for teamwork level 1", () => {
            const env = createTestEnvironment();
            const stageId = "teamwork";
            const levelId = 1;

            env.levelManager.setupLevel(stageId, levelId, env.fileSystem, env.gitRepository);

            // Complete first two requirements
            executeCommandAndCheckCompletion("git pull origin main", stageId, levelId, env);
            executeCommandAndCheckCompletion("git switch -c my-feature", stageId, levelId, env);

            // Modify the team file (state-based check)
            env.fileSystem.writeFile("/team.md", "# Modified team file");
            env.gitRepository.updateFileStatus("team.md", "modified");

            // Check state-based requirements
            env.levelManager.checkStateBasedRequirements(stageId, levelId, env.gitRepository, env.fileSystem);

            const level = env.levelManager.getLevel(stageId, levelId);
            expect(level?.completedRequirements).toContain("edit-team-file");
        });
    });
});

// Summary report test
describe("Level Coverage Summary", () => {
    it("should report coverage of all levels", () => {
        const stageKeys = Object.keys(allStages);
        const coverageReport: { stage: string; levels: number; covered: number }[] = [];

        stageKeys.forEach(stageKey => {
            const stage = allStages[stageKey as keyof typeof allStages];
            const stageId = stage.id;
            const levelCount = Object.keys(stage.levels).length;
            const coveredLevels = Object.keys(LEVEL_SOLUTIONS[stageId] || {}).length;

            coverageReport.push({
                stage: stageId,
                levels: levelCount,
                covered: coveredLevels,
            });
        });

        console.log("\n📊 E2E Test Coverage Report:");
        console.log("=".repeat(50));

        let totalLevels = 0;
        let totalCovered = 0;

        coverageReport.forEach(({ stage, levels, covered }) => {
            const percentage = ((covered / levels) * 100).toFixed(0);
            const status = covered === levels ? "✅" : covered > 0 ? "⚠️" : "❌";
            console.log(`${status} ${stage.padEnd(15)} ${covered}/${levels} (${percentage}%)`);
            totalLevels += levels;
            totalCovered += covered;
        });

        console.log("=".repeat(50));
        const totalPercentage = ((totalCovered / totalLevels) * 100).toFixed(0);
        console.log(`📈 Total: ${totalCovered}/${totalLevels} levels covered (${totalPercentage}%)`);

        // At minimum, we should have some coverage
        expect(totalCovered).toBeGreaterThan(0);
    });
});
