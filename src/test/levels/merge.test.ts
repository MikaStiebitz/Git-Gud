import { describe, it, expect, beforeEach } from "vitest";
import { FileSystem } from "~/models/FileSystem";
import { GitRepository } from "~/models/GitRepository";
import { LevelManager } from "~/models/LevelManager";
import { allStages } from "~/levels";

describe("Merge Stage Levels", () => {
    let fileSystem: FileSystem;
    let gitRepository: GitRepository;
    let levelManager: LevelManager;

    beforeEach(() => {
        fileSystem = new FileSystem();
        gitRepository = new GitRepository(fileSystem);
        levelManager = new LevelManager();
    });

    describe("Stage Metadata", () => {
        it("should have correct stage metadata", () => {
            const stage = allStages.Merge;

            expect(stage.id).toBe("merge");
            expect(stage.name).toBe("merge.name");
            expect(stage.icon).toBe("🔀");
        });
    });

    describe("All Levels", () => {
        it("should have exactly 4 levels", () => {
            const stage = allStages.Merge;
            const levelIds = Object.keys(stage.levels).map(Number);

            expect(levelIds.length).toBe(4);
            expect(levelIds).toEqual([1, 2, 3, 4]);
        });

        it("should load and setup each level without errors", () => {
            const stage = allStages.Merge;
            const levelIds = Object.keys(stage.levels).map(Number);

            expect(levelIds.length).toBeGreaterThan(0);

            levelIds.forEach(levelId => {
                fileSystem = new FileSystem();
                gitRepository = new GitRepository(fileSystem);

                const success = levelManager.setupLevel("merge", levelId, fileSystem, gitRepository);
                expect(success).toBe(true);
            });
        });

        it("should have merge-related commands", () => {
            const stage = allStages.Merge;
            const levelIds = Object.keys(stage.levels).map(Number);

            let hasMergeCommands = false;

            levelIds.forEach(levelId => {
                const level = stage.levels[levelId];
                if (!level) return;

                level.requirements.forEach(req => {
                    if (req.command.includes("merge")) {
                        hasMergeCommands = true;
                    }
                });
            });

            expect(hasMergeCommands).toBe(true);
        });
    });

    describe("Level 1: Feature Branch Merge", () => {
        it("should start on develop branch", () => {
            const success = levelManager.setupLevel("merge", 1, fileSystem, gitRepository);
            expect(success).toBe(true);
            expect(gitRepository.getCurrentBranch()).toBe("develop");
        });

        it("should have main, develop, and feature/user-auth branches", () => {
            levelManager.setupLevel("merge", 1, fileSystem, gitRepository);
            const branches = gitRepository.getBranches();

            expect(branches).toContain("main");
            expect(branches).toContain("develop");
            expect(branches).toContain("feature/user-auth");
        });

        it("should require merging feature/user-auth", () => {
            const stage = allStages.Merge;
            const level = stage.levels[1];

            expect(level?.requirements[0]?.command).toBe("git merge");
        });
    });

    describe("Level 2: Production Deploy", () => {
        it("should start on main branch", () => {
            const success = levelManager.setupLevel("merge", 2, fileSystem, gitRepository);
            expect(success).toBe(true);
            expect(gitRepository.getCurrentBranch()).toBe("main");
        });

        it("should have main and develop branches", () => {
            levelManager.setupLevel("merge", 2, fileSystem, gitRepository);
            const branches = gitRepository.getBranches();

            expect(branches).toContain("main");
            expect(branches).toContain("develop");
        });

        it("should require merging develop into main", () => {
            const stage = allStages.Merge;
            const level = stage.levels[2];

            expect(level?.requirements[0]?.command).toBe("git merge");
        });
    });

    describe("Level 3: Abort Merge Conflicts", () => {
        it("should start on main branch", () => {
            const success = levelManager.setupLevel("merge", 3, fileSystem, gitRepository);
            expect(success).toBe(true);
            expect(gitRepository.getCurrentBranch()).toBe("main");
        });

        it("should have main and feature branches", () => {
            levelManager.setupLevel("merge", 3, fileSystem, gitRepository);
            const branches = gitRepository.getBranches();

            expect(branches).toContain("main");
            expect(branches).toContain("feature");
        });

        it("should require aborting merge", () => {
            const stage = allStages.Merge;
            const level = stage.levels[3];

            expect(level?.requirements[0]?.command).toBe("git merge");
            expect(level?.requirements[0]?.requiresArgs).toContain("--abort");
        });

        it("should have merge conflicts setup", () => {
            levelManager.setupLevel("merge", 3, fileSystem, gitRepository);

            // The level should have merge conflicts configured
            const level = allStages.Merge.levels[3];
            expect(level).toBeDefined();
            expect(level?.initialState?.git?.mergeConflicts).toBeDefined();
            expect(level?.initialState?.git?.mergeConflicts?.length).toBeGreaterThan(0);
        });
    });
});
