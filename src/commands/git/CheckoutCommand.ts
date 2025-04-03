import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class CheckoutCommand implements Command {
    name = "git checkout";
    description = "Switch branches or restore working tree files";
    usage = "git checkout <branch> or git checkout -b <new-branch>";
    examples = ["git checkout main", "git checkout -b feature", "git checkout -- file.txt"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        if (args.positionalArgs.length === 0) {
            return ["Please specify a branch name."];
        }

        // Handle branch creation and switching
        if (args.flags.b !== undefined) {
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
