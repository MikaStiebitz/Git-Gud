import { describe, it, expect, beforeEach } from "vitest";
import { PushCommand } from "../commands/git/PushCommand";
import { FileSystem } from "../models/FileSystem";
import { GitRepository } from "../models/GitRepository";
import { ProgressManager } from "../models/ProgressManager";
import { parseCommand } from "../commands/base/CommandParser";

describe("PushCommand with --set-upstream", () => {
    let pushCommand: PushCommand;
    let fileSystem: FileSystem;
    let gitRepository: GitRepository;
    let progressManager: ProgressManager;

    beforeEach(() => {
        pushCommand = new PushCommand();
        fileSystem = new FileSystem();
        gitRepository = new GitRepository(fileSystem);
        progressManager = new ProgressManager();

        // Setup: init git, create a branch, make a commit
        gitRepository.init();
        gitRepository.addRemote("origin", "https://github.com/user/repo.git");
        gitRepository.createBranch("feature/test");
        gitRepository.checkout("feature/test", true);
        fileSystem.writeFile("/test.txt", "test content");
        gitRepository.addFile("/test.txt");
        gitRepository.commit("Test commit");
    });

    it("should handle 'git push --set-upstream origin feature/test'", () => {
        const parsed = parseCommand("git push --set-upstream origin feature/test");

        console.log("Parsed command:", parsed.command);
        console.log("Flags:", parsed.args.flags);
        console.log("Positional args:", parsed.args.positionalArgs);

        const result = pushCommand.execute(parsed.args, {
            fileSystem,
            gitRepository,
            currentDirectory: "/",
            setCurrentDirectory: () => {},
            progressManager
        });

        console.log("Push result:", result);

        expect(result).toBeDefined();
        expect(result.some(line => line.includes("error"))).toBe(false);
    });

    it("should handle 'git push -u origin feature/test'", () => {
        const parsed = parseCommand("git push -u origin feature/test");

        console.log("Parsed command:", parsed.command);
        console.log("Flags:", parsed.args.flags);
        console.log("Positional args:", parsed.args.positionalArgs);

        const result = pushCommand.execute(parsed.args, {
            fileSystem,
            gitRepository,
            currentDirectory: "/",
            setCurrentDirectory: () => {},
            progressManager
        });

        console.log("Push result:", result);

        expect(result).toBeDefined();
        expect(result.some(line => line.includes("error"))).toBe(false);
    });

    it("should handle 'git push origin feature/test'", () => {
        const parsed = parseCommand("git push origin feature/test");

        console.log("Parsed command:", parsed.command);
        console.log("Positional args:", parsed.args.positionalArgs);

        const result = pushCommand.execute(parsed.args, {
            fileSystem,
            gitRepository,
            currentDirectory: "/",
            setCurrentDirectory: () => {},
            progressManager
        });

        console.log("Push result:", result);

        expect(result).toBeDefined();
        expect(result.some(line => line.includes("error"))).toBe(false);
    });
});
