import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class CommitCommand implements Command {
    name = "git commit";
    description = "Record changes to the repository";
    usage = "git commit -m <message>";
    examples = ['git commit -m "Initial commit"', 'git commit -m "Fix bug in login form"', "git commit"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
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

        if (message) {
            // If message is provided, commit directly
            const commitId = gitRepository.commit(message);

            if (!commitId) {
                return ["Nothing to commit. Use git add to stage files first."];
            }

            return [
                `[${gitRepository.getCurrentBranch()} ${commitId.substring(0, 7)}] ${message}`,
                "1 file changed, 1 insertion(+)",
            ];
        }

        // If no message is provided, let the dialog be opened by returning without a message
        // The dialog should only open if we get here (meaning there are staged changes)
        return [];
    }
}
