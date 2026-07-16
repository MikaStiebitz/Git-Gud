import { describe, it, expect, beforeEach } from "vitest";
import { FileSystem } from "~/models/FileSystem";
import { GitRepository } from "~/models/GitRepository";
import { LevelManager } from "~/models/LevelManager";
import type { LevelRequirement } from "~/types";

describe("LevelManager repository-state guards", () => {
    let fileSystem: FileSystem;
    let gitRepository: GitRepository;
    let levelManager: LevelManager;

    beforeEach(() => {
        fileSystem = new FileSystem();
        gitRepository = new GitRepository(fileSystem);
        levelManager = new LevelManager();

        gitRepository.init();
        fileSystem.writeFile("/a.txt", "a");
        gitRepository.addFile("a.txt");
        gitRepository.commit("Initial commit");
    });

    const req = (extra: Partial<LevelRequirement>): LevelRequirement => ({
        id: "r",
        command: "git tag",
        description: "d",
        ...extra,
    });

    describe("checkTagExists", () => {
        it('fails when the tag does not exist ("*")', () => {
            expect(levelManager.passesStateGuards(req({ checkTagExists: "*" }), gitRepository)).toBe(false);
        });

        it('passes once any tag exists ("*")', () => {
            gitRepository.createTag("v1.0.0");
            expect(levelManager.passesStateGuards(req({ checkTagExists: "*" }), gitRepository)).toBe(true);
        });

        it("matches a specific tag name", () => {
            gitRepository.createTag("v2.0.0");
            expect(levelManager.passesStateGuards(req({ checkTagExists: "v2.0.0" }), gitRepository)).toBe(true);
            expect(levelManager.passesStateGuards(req({ checkTagExists: "v9.9.9" }), gitRepository)).toBe(false);
        });
    });

    describe("checkCommitCountAtLeast", () => {
        it("compares against the current branch history length", () => {
            expect(levelManager.passesStateGuards(req({ checkCommitCountAtLeast: 1 }), gitRepository)).toBe(true);
            expect(levelManager.passesStateGuards(req({ checkCommitCountAtLeast: 2 }), gitRepository)).toBe(false);

            fileSystem.writeFile("/b.txt", "b");
            gitRepository.addFile("b.txt");
            gitRepository.commit("Second commit");

            expect(levelManager.passesStateGuards(req({ checkCommitCountAtLeast: 2 }), gitRepository)).toBe(true);
        });
    });

    describe("checkCommitMessageContains", () => {
        it("finds a substring in the branch history (case-insensitive)", () => {
            expect(
                levelManager.passesStateGuards(req({ checkCommitMessageContains: "initial" }), gitRepository),
            ).toBe(true);
            expect(
                levelManager.passesStateGuards(req({ checkCommitMessageContains: "release" }), gitRepository),
            ).toBe(false);
        });
    });

    describe("no guards", () => {
        it("passes when no state guards are defined", () => {
            expect(levelManager.passesStateGuards(req({}), gitRepository)).toBe(true);
        });
    });

    describe("AND-gate in checkLevelCompletion", () => {
        it("does not complete a command requirement until its guard holds", () => {
            levelManager.addCustomLevel("Intro", {
                id: 99,
                name: "guard-level",
                description: "d",
                objectives: ["o"],
                hints: [],
                requirementLogic: "all",
                requirements: [
                    req({ id: "tag-it", command: "git tag", requiresArgs: ["any"], checkTagExists: "*" }),
                ],
            });

            // Command matches textually, but no tag exists yet -> not complete
            const before = levelManager.checkLevelCompletion("Intro", 99, "git", ["tag"], gitRepository);
            expect(before).toBe(false);

            // Create the tag, then the same command completes the level
            gitRepository.createTag("v1.0.0");
            const after = levelManager.checkLevelCompletion("Intro", 99, "git", ["tag", "v1.0.0"], gitRepository);
            expect(after).toBe(true);
        });
    });
});
