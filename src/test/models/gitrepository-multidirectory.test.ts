import { describe, it, expect, beforeEach } from "vitest";
import { FileSystem } from "~/models/FileSystem";
import { GitRepository } from "~/models/GitRepository";
import { InitCommand } from "~/commands/git/InitCommand";
import { StatusCommand } from "~/commands/git/StatusCommand";
import type { CommandContext } from "~/commands/base/Command";
import { ProgressManager } from "~/models/ProgressManager";

describe("Git Repository Multi-Directory Support", () => {
    let fileSystem: FileSystem;
    let gitRepository: GitRepository;
    let context: CommandContext;

    beforeEach(() => {
        fileSystem = new FileSystem();
        gitRepository = new GitRepository(fileSystem);

        // Create subdirectory
        fileSystem.mkdir("/test");
        fileSystem.writeFile("/test.txt", "root file");
        fileSystem.writeFile("/test/subfile.txt", "test directory file");

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

    it("should keep git repositories directory-specific", () => {
        const initCmd = new InitCommand();
        const statusCmd = new StatusCommand();

        // Init in /test directory
        context.currentDirectory = "/test";
        const initOutput = initCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(initOutput).toEqual(["Initialized empty Git repository in /test/.git/"]);

        // Status in /test should work
        const testStatus = statusCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(testStatus.some(line => line.includes("On branch main"))).toBe(true);

        // Status in / should fail (no repo in root)
        context.currentDirectory = "/";
        const rootStatus = statusCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(rootStatus).toEqual(["fatal: not a git repository (or any of the parent directories): .git"]);
    });

    it("should NOT allow independent repositories in different directories (single repo limitation)", () => {
        const initCmd = new InitCommand();
        const statusCmd = new StatusCommand();

        // Init in root
        context.currentDirectory = "/";
        const rootInit = initCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(rootInit).toEqual(["Initialized empty Git repository in .git/"]);

        // Try to init in /test - should fail because root already has repo
        context.currentDirectory = "/test";
        const testInit = initCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(testInit).toEqual(["Repository already initialized elsewhere. Only one repository is supported."]);

        // Status should work only in root (where repo is)
        context.currentDirectory = "/";
        const rootStatus = statusCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(rootStatus.some(line => line.includes("On branch main"))).toBe(true);

        // /test is a subdirectory so it should also work
        context.currentDirectory = "/test";
        const testStatus = statusCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(testStatus.some(line => line.includes("On branch main"))).toBe(true);
    });

    it("should detect repository in parent directory", () => {
        const initCmd = new InitCommand();
        const statusCmd = new StatusCommand();

        // Init in root
        context.currentDirectory = "/";
        initCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);

        // Create subdirectory after init
        fileSystem.mkdir("/subdir");

        // Status in subdirectory should work (repo is in parent)
        context.currentDirectory = "/subdir";
        const subdirStatus = statusCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(subdirStatus.some(line => line.includes("On branch main"))).toBe(true);
    });

    it("should allow reinitializing in same directory", () => {
        const initCmd = new InitCommand();

        // Init in root
        context.currentDirectory = "/";
        const rootInit = initCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(rootInit).toEqual(["Initialized empty Git repository in .git/"]);

        // Reinit in same directory should work
        const rootReinit = initCmd.execute({ args: [], flags: {}, positionalArgs: [] }, context);
        expect(rootReinit).toEqual(["Reinitialized existing Git repository in .git/"]);
    });
});
