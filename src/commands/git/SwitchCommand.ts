import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class SwitchCommand implements Command {
    name = "git switch";
    description = "Switch to a specified branch";
    usage = "git switch <branch> or git switch -c <new-branch>";
    examples = ["git switch main", "git switch -c feature"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        if (args.positionalArgs.length === 0) {
            return ["Please specify a branch name."];
        }

        // Handle branch creation and switching
        if (args.flags.c !== undefined || args.flags.create !== undefined) {
            if (args.positionalArgs.length < 1) {
                return ["Please specify a branch name."];
            }

            const newBranch = args.positionalArgs[0] ?? "";
            const success = gitRepository.checkout(newBranch, true);

            return success ? [`Switched to a new branch '${newBranch}'`] : [`Branch '${newBranch}' already exists.`];
        } else {
            // Handle branch switching
            const branch = args.positionalArgs[0] ?? "";
            const success = gitRepository.checkout(branch);

            return success ? [`Switched to branch '${branch}'`] : [`Branch '${branch}' does not exist.`];
        }
    }
}
