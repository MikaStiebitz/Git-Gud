import { describe, it, expect, beforeEach } from "vitest";
import { RebaseCommand } from "~/commands/git/RebaseCommand";
import { parseCommand } from "~/commands/base/CommandParser";
import { createTestContext, setupInitializedRepo } from "../test-utils";
import type { CommandContext } from "~/commands/base/Command";

describe("RebaseCommand - upstream resolution (issue #69)", () => {
    let context: CommandContext;
    const command = new RebaseCommand();

    beforeEach(() => {
        context = createTestContext();
        setupInitializedRepo(context);

        // Create additional commits so HEAD~n and hash targets exist
        context.fileSystem.writeFile("/a.txt", "a");
        context.gitRepository.updateFileStatus("a.txt", "untracked");
        context.gitRepository.addFile("a.txt");
        context.gitRepository.commit("Second commit");

        context.fileSystem.writeFile("/b.txt", "b");
        context.gitRepository.updateFileStatus("b.txt", "untracked");
        context.gitRepository.addFile("b.txt");
        context.gitRepository.commit("Third commit");
    });

    const run = (input: string): string[] => {
        const { args } = parseCommand(input);
        return command.execute(args, context);
    };

    it("should accept a full commit hash as upstream", () => {
        const history = context.gitRepository.getCommitHistory();
        const target = history[0]!;
        const output = run(`git rebase -i ${target}`);

        expect(output[0]).toContain("interactive rebase");
        expect(output[0]).not.toContain("fatal");
    });

    it("should accept a short commit hash as shown by git log --oneline", () => {
        const history = context.gitRepository.getCommitHistory();
        const shortHash = history[0]!.substring(0, 7);
        const output = run(`git rebase -i ${shortHash}`);

        expect(output[0]).toContain("interactive rebase");
        expect(output[0]).not.toContain("fatal");
    });

    it("should accept HEAD~n as upstream", () => {
        const output = run("git rebase -i HEAD~2");

        expect(output[0]).toContain("interactive rebase");
        expect(output[0]).not.toContain("fatal");
    });

    it("should still accept a branch name as upstream", () => {
        context.gitRepository.createBranch("feature");
        context.gitRepository.checkout("feature");
        const output = run("git rebase main");

        expect(output.join("\n")).toContain("Successfully rebased");
    });

    it("should reject an unknown hash", () => {
        const output = run("git rebase -i ffffffff");

        expect(output[0]).toBe("fatal: invalid upstream 'ffffffff'");
    });

    it("should reject HEAD~n beyond history length", () => {
        const output = run("git rebase -i HEAD~99");

        expect(output[0]).toBe("fatal: invalid upstream 'HEAD~99'");
    });

    it("should still reject rebasing a branch onto itself", () => {
        const output = run("git rebase main");

        expect(output[0]).toContain("onto itself");
    });
});
