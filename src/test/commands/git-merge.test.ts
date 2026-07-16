import { describe, it, expect, beforeEach } from "vitest";
import { FileSystem } from "~/models/FileSystem";
import { GitRepository } from "~/models/GitRepository";
import { CommandProcessor } from "~/models/CommandProcessor";
import { ProgressManager } from "~/models/ProgressManager";

describe("git merge", () => {
    let fileSystem: FileSystem;
    let gitRepository: GitRepository;
    let commandProcessor: CommandProcessor;

    beforeEach(() => {
        fileSystem = new FileSystem();
        gitRepository = new GitRepository(fileSystem);
        const progressManager = new ProgressManager();
        commandProcessor = new CommandProcessor(fileSystem, gitRepository, progressManager, "/");

        // Initialize git repo
        commandProcessor.processCommand("git init");
    });

    it("should perform a fast-forward merge when possible", () => {
        // Create initial commit on main
        fileSystem.writeFile("/file1.txt", "content1");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Initial commit'");

        // Create feature branch and add commits
        commandProcessor.processCommand("git switch -c feature");
        fileSystem.writeFile("/file2.txt", "feature content");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Add feature'");

        // Switch back to main and merge
        commandProcessor.processCommand("git switch main");
        const result = commandProcessor.processCommand("git merge feature");

        // Should be fast-forward since main hasn't changed
        expect(result.join(" ")).toContain("Fast-forward");

        // File should exist in main now
        const content = fileSystem.getFileContents("/file2.txt");
        expect(content).toBe("feature content");
    });

    it("should create a merge commit when branches have diverged", () => {
        // Create initial commit on main
        fileSystem.writeFile("/file1.txt", "content1");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Initial commit'");

        // Create feature branch and add commit
        commandProcessor.processCommand("git switch -c feature");
        fileSystem.writeFile("/file2.txt", "feature content");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Add feature'");

        // Switch back to main and add another commit (diverge)
        commandProcessor.processCommand("git switch main");
        fileSystem.writeFile("/file3.txt", "main content");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Add to main'");

        // Merge feature into main
        const result = commandProcessor.processCommand("git merge feature");

        // Should create merge commit since branches diverged
        expect(result.join(" ")).toContain("Merge made by the 'ort' strategy");
        expect(result.join(" ")).toContain("Merge branch 'feature' into main");

        // Both files should exist
        expect(fileSystem.getFileContents("/file2.txt")).toBe("feature content");
        expect(fileSystem.getFileContents("/file3.txt")).toBe("main content");
    });

    it("should report 'Already up to date' when target branch is already merged", () => {
        // Create initial commit
        fileSystem.writeFile("/file1.txt", "content1");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Initial commit'");

        // Create feature branch (but don't add anything)
        commandProcessor.processCommand("git switch -c feature");
        commandProcessor.processCommand("git switch main");

        // Try to merge feature (which has no new commits)
        const result = commandProcessor.processCommand("git merge feature");

        expect(result.join(" ")).toContain("Already up to date");
    });

    it("should merge files from target branch into current branch", () => {
        // Setup: Create main with file1
        fileSystem.writeFile("/file1.txt", "original");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Initial'");

        // Create feature branch with file2 and modified file1
        commandProcessor.processCommand("git switch -c feature");
        fileSystem.writeFile("/file1.txt", "modified");
        // Editing a tracked file marks it modified (the editor does this in the app)
        gitRepository.updateFileStatus("file1.txt", "modified");
        fileSystem.writeFile("/file2.txt", "new file");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Feature changes'");

        // Switch to main and merge
        commandProcessor.processCommand("git switch main");
        commandProcessor.processCommand("git merge feature");

        // Both files should be merged
        expect(fileSystem.getFileContents("/file1.txt")).toBe("modified");
        expect(fileSystem.getFileContents("/file2.txt")).toBe("new file");
    });

    it("should handle git tag after merge", () => {
        // Create initial commit
        fileSystem.writeFile("/file1.txt", "content");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Initial commit'");

        // Create and merge feature branch
        commandProcessor.processCommand("git switch -c release");
        fileSystem.writeFile("/file2.txt", "release");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Release'");

        commandProcessor.processCommand("git switch main");
        commandProcessor.processCommand("git merge release");

        // Now tag should work
        const tagResult = commandProcessor.processCommand("git tag v1.0.0");

        expect(tagResult.join(" ")).not.toContain("fatal");
        expect(tagResult.join(" ")).not.toContain("No commits yet");
    });

    it("should preserve commits from both branches after merge", () => {
        // Create commits on main
        fileSystem.writeFile("/main1.txt", "m1");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Main commit 1'");

        // Create feature with commits
        commandProcessor.processCommand("git switch -c feature");
        fileSystem.writeFile("/feat1.txt", "f1");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Feature commit 1'");

        // Add another commit to main
        commandProcessor.processCommand("git switch main");
        fileSystem.writeFile("/main2.txt", "m2");
        commandProcessor.processCommand("git add .");
        commandProcessor.processCommand("git commit -m 'Main commit 2'");

        // Merge
        commandProcessor.processCommand("git merge feature");

        // Check that we have commits from both branches
        const commits = gitRepository.getCommits();
        const commitMessages = Object.values(commits).map(c => c.message);

        expect(commitMessages).toContain("Main commit 1");
        expect(commitMessages).toContain("Main commit 2");
        expect(commitMessages).toContain("Feature commit 1");
        expect(commitMessages.some(m => m.includes("Merge branch"))).toBe(true);
    });
});
