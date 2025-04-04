import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class CommitCommand implements Command {
    name = "git commit";
    description = "Record changes to the repository";
    usage = "git commit -m <message>";
    examples = ['git commit -m "Initial commit"', 'git commit -m "Fix bug in login form"'];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Check for message flag
        const hasMessageFlag = args.flags.m !== undefined || args.flags.message !== undefined;

        if (!hasMessageFlag) {
            return ["Please provide a commit message with the -m flag."];
        }

        // Get the message
        const message =
            typeof args.flags.m === "string"
                ? args.flags.m.trim()
                : typeof args.flags.message === "string"
                  ? args.flags.message.trim()
                  : "";

        if (!message) {
            return ["Please provide a non-empty commit message."];
        }

        const commitId = gitRepository.commit(message);

        if (!commitId) {
            return ["Nothing to commit. Use git add to stage files first."];
        }

        return [
            `[${gitRepository.getCurrentBranch()} ${commitId.substring(0, 7)}] ${message}`,
            "1 file changed, 1 insertion(+)",
        ];
    }
}
