import { describe, it, expect, beforeEach } from "vitest";
import { CommitCommand } from "~/commands/git/CommitCommand";
import { parseCommand } from "~/commands/base/CommandParser";
import { createTestContext, setupInitializedRepo } from "../test-utils";
import type { CommandContext } from "~/commands/base/Command";

describe("CommitCommand - empty message handling (issue #73)", () => {
    let context: CommandContext;
    const command = new CommitCommand();

    beforeEach(() => {
        context = createTestContext();
        setupInitializedRepo(context);

        // Stage a change so there is something to commit
        context.fileSystem.writeFile("/README.md", "# Updated");
        context.gitRepository.updateFileStatus("README.md", "modified");
        context.gitRepository.addFile("README.md");
    });

    it("should reject a whitespace-only commit message", () => {
        const { args } = parseCommand('git commit -m " "');
        const output = command.execute(args, context);

        expect(output).toEqual(["Aborting commit due to empty commit message."]);
        expect(context.gitRepository.getLastCommit()?.message).toBe("Initial commit");
    });

    it("should reject -m without a message", () => {
        const { args } = parseCommand("git commit -m");
        const output = command.execute(args, context);

        expect(output).toEqual(["Aborting commit due to empty commit message."]);
    });

    it("should commit normally with a real message", () => {
        const { args } = parseCommand('git commit -m "Add feature"');
        const output = command.execute(args, context);

        expect(output[0]).toContain("Add feature");
        expect(context.gitRepository.getLastCommit()?.message).toBe("Add feature");
    });

    it("should still allow 'git commit --amend' without a new message", () => {
        const { args } = parseCommand("git commit --amend");
        const output = command.execute(args, context);

        expect(output[0]).toContain("Initial commit");
    });
});
