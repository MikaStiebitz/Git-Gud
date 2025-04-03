import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class MergeCommand implements Command {
    name = "git merge";
    description = "Join two or more development histories together";
    usage = "git merge <branch>";
    examples = ["git merge feature", "git merge --abort"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Handle merge abort
        if (args.flags.abort !== undefined) {
            return ["Merge aborted successfully."];
        }

        if (args.positionalArgs.length === 0) {
            return ["Please specify a branch to merge."];
        }

        const branch = args.positionalArgs[0] ?? "";
        const success = gitRepository.merge(branch);

        return success
            ? [`Merged branch '${branch}' into ${gitRepository.getCurrentBranch()}.`]
            : [`Cannot merge branch '${branch}'.`];
    }
}
