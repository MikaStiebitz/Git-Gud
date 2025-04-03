import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class CherryPickCommand implements Command {
    name = "git cherry-pick";
    description = "Apply the changes introduced by some existing commits";
    usage = "git cherry-pick <commit>...";
    examples = ["git cherry-pick a1b2c3d", "git cherry-pick --abort"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Check for --abort flag
        if (args.flags.abort !== undefined) {
            return ["Cherry-pick aborted."];
        }

        if (args.positionalArgs.length === 0) {
            return ["error: you must specify at least one commit"];
        }

        const commitId = args.positionalArgs[0];

        // We don't actually perform cherry-pick, just give appropriate message
        if (commitId?.match(/^[0-9a-f]{7,40}$/)) {
            return [
                `[${gitRepository.getCurrentBranch()} XXXXXXX] Cherry-picked commit`,
                "1 file changed, 1 insertion(+)",
            ];
        } else {
            return [`error: invalid commit name: ${commitId}`];
        }
    }
}
