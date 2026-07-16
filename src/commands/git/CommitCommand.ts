import type { Command, CommandArgs, CommandContext } from "../base/Command";
import type { GitRepository } from "~/models/GitRepository";

export class CommitCommand implements Command {
    name = "git commit";
    description = "Record changes to the repository";
    usage = "git commit -m <message>";
    examples = [
        'git commit -m "Initial commit"',
        'git commit -m "Fix bug in login form"',
        "git commit",
        "git commit --amend -m 'Updated commit message'",
        "git commit --amend",
    ];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository, currentDirectory } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }
        if (!gitRepository.isInRepository(currentDirectory)) {
            return ["fatal: not a git repository (or any of the parent directories): .git"];
        }

        // Check for --amend flag
        const isAmend = args.flags.amend !== undefined;

        if (isAmend) {
            return this.handleAmend(args, gitRepository);
        }

        // Check if there's anything to commit
        const stagedFiles = Object.entries(gitRepository.getStatus())
            .filter(([_, status]) => status === "staged")
            .map(([file]) => file);

        if (stagedFiles.length === 0) {
            return ["Nothing to commit. Use git add to stage files first."];
        }

        // Get the message
        const message =
            typeof args.flags.m === "string"
                ? args.flags.m.trim()
                : typeof args.flags.message === "string"
                  ? args.flags.message.trim()
                  : "";

        // A -m/--message flag with an empty or whitespace-only value must not create a commit
        const messageFlagProvided = args.flags.m !== undefined || args.flags.message !== undefined;
        if (messageFlagProvided && !message) {
            return ["Aborting commit due to empty commit message."];
        }

        if (message) {
            // If message is provided, commit directly
            const commitId = gitRepository.commit(message);

            if (!commitId) {
                return ["Nothing to commit. Use git add to stage files first."];
            }

            // Generate accurate file statistics
            const fileCount = stagedFiles.length;
            const fileWord = fileCount === 1 ? "file" : "files";
            const insertions = fileCount;  // Simplified: each file = 1 insertion
            const insertionWord = insertions === 1 ? "insertion" : "insertions";

            return [
                `[${gitRepository.getCurrentBranch()} ${commitId.substring(0, 7)}] ${message}`,
                ` ${fileCount} ${fileWord} changed, ${insertions} ${insertionWord}(+)`,
            ];
        }

        // If no message is provided, let the dialog be opened by returning without a message
        // The dialog should only open if we get here (meaning there are staged changes)
        return [];
    }

    private handleAmend(args: CommandArgs, gitRepository: GitRepository): string[] {
        // Get the last commit
        const lastCommit = gitRepository.getLastCommit();

        if (!lastCommit) {
            return ["fatal: No commits yet to amend."];
        }

        // Get the new message if provided
        const newMessage =
            typeof args.flags.m === "string"
                ? args.flags.m.trim()
                : typeof args.flags.message === "string"
                  ? args.flags.message.trim()
                  : "";

        // Amend the last commit
        const result = gitRepository.amendLastCommit(newMessage);

        if (!result) {
            return ["fatal: Could not amend commit."];
        }

        const finalMessage = newMessage || lastCommit.message;
        const commitId = result.substring(0, 7);
        const branch = gitRepository.getCurrentBranch();

        return [
            `[${branch} ${commitId}] ${finalMessage}`,
            " Date: " + new Date().toISOString(),
            " 1 file changed, 1 insertion(+)",
        ];
    }
}
