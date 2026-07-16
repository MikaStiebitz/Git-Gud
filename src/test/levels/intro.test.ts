import { describe, it, expect, beforeEach } from "vitest";
import { FileSystem } from "~/models/FileSystem";
import { GitRepository } from "~/models/GitRepository";
import { LevelManager } from "~/models/LevelManager";
import { allStages } from "~/levels";
import type { CommandContext } from "~/commands/base/Command";
import { InitCommand } from "~/commands/git/InitCommand";
import { ProgressManager } from "~/models/ProgressManager";

describe("Intro Stage Levels", () => {
    let fileSystem: FileSystem;
    let gitRepository: GitRepository;
    let levelManager: LevelManager;
    let context: CommandContext;

    beforeEach(() => {
        fileSystem = new FileSystem();
        gitRepository = new GitRepository(fileSystem);
        levelManager = new LevelManager();

        context = {
            fileSystem,
            gitRepository,
            currentDirectory: "/",
            setCurrentDirectory: (path: string) => {
                context.currentDirectory = path;
            },
            progressManager: new ProgressManager(),
        };
    });

    describe("Level 1: Git Init", () => {
        it("should complete when git init is executed", () => {
            // Setup level
            const setupSuccess = levelManager.setupLevel("intro", 1, fileSystem, gitRepository);
            expect(setupSuccess).toBe(true);

            // Execute git init
            const initCmd = new InitCommand();
            const output = initCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);

            // Check output
            expect(output).toEqual(["Initialized empty Git repository in .git/"]);

            // Check if level is completed
            const isCompleted = levelManager.checkLevelCompletion("intro", 1, "git", ["init"], gitRepository);
            expect(isCompleted).toBe(true);
        });

        it("should have proper initial state", () => {
            const level = allStages.Intro.levels[1];

            expect(level).toBeDefined();
            if (!level) return;

            // Check level metadata
            expect(level.id).toBe(1);
            expect(level.name).toBe("intro.level1.name");
            expect(level.description).toBe("intro.level1.description");
            expect(level.requirements).toHaveLength(1);
            expect(level.requirements[0]?.command).toBe("git init");
        });
    });

    describe("Level 2: First Commit", () => {
        it("should setup level with README.md file", () => {
            // Setup level
            levelManager.setupLevel("intro", 2, fileSystem, gitRepository);

            // Git should be pre-initialized
            expect(gitRepository.isInitialized()).toBe(true);

            // Check if README.md exists
            const readme = fileSystem.getFileContents("/README.md");
            expect(readme).not.toBeNull();
            expect(typeof readme).toBe("string");
        });
    });

    describe("Level 3: Status Check", () => {
        it("should setup level correctly", () => {
            // Setup level
            const success = levelManager.setupLevel("intro", 3, fileSystem, gitRepository);
            expect(success).toBe(true);

            // Git should NOT be initialized (Level 3 is about cloning)
            expect(gitRepository.isInitialized()).toBe(false);
        });
    });

    describe("All Intro Levels", () => {
        it("should have valid structure for all levels", () => {
            const introStage = allStages.Intro;

            expect(introStage.id).toBe("intro");
            expect(introStage.levels).toBeDefined();

            const levelIds = Object.keys(introStage.levels).map(Number);
            expect(levelIds.length).toBeGreaterThan(0);

            // Check each level has required properties
            levelIds.forEach(levelId => {
                const level = introStage.levels[levelId];
                if (!level) return;

                expect(level.id).toBe(levelId);
                expect(level.name).toBeDefined();
                expect(level.description).toBeDefined();
                expect(level.requirements).toBeDefined();
                expect(Array.isArray(level.requirements)).toBe(true);
                expect(level.initialState).toBeDefined();
            });
        });

        it("should have sequential level IDs", () => {
            const introStage = allStages.Intro;
            const levelIds = Object.keys(introStage.levels).map(Number).sort((a, b) => a - b);

            for (let i = 0; i < levelIds.length; i++) {
                expect(levelIds[i]).toBe(i + 1);
            }
        });

        it("should load and setup each level without errors", () => {
            const introStage = allStages.Intro;
            const levelIds = Object.keys(introStage.levels).map(Number);

            levelIds.forEach(levelId => {
                // Reset for each level
                fileSystem = new FileSystem();
                gitRepository = new GitRepository(fileSystem);

                const success = levelManager.setupLevel("intro", levelId, fileSystem, gitRepository);
                expect(success).toBe(true);
            });
        });
    });
});
