import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class RebaseCommand implements Command {
    name = "git rebase";
    description = "Reapply commits on top of another base";
    usage = "git rebase [options] <branch>";
    examples = ["git rebase main", "git rebase -i HEAD~3", "git rebase --abort"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Check for --abort flag
        if (args.flags.abort !== undefined) {
            return ["Rebase aborted successfully."];
        }

        // Check for -i or --interactive flag
        const isInteractive = args.flags.i !== undefined || args.flags.interactive !== undefined;

        // Check if a target branch is specified
        if (args.positionalArgs.length === 0) {
            return ["You must specify a branch to rebase onto."];
        }

        const targetBranch = args.positionalArgs[0] ?? "";
        const currentBranch = gitRepository.getCurrentBranch();
        const branches = gitRepository.getBranches();

        if (!branches.includes(targetBranch)) {
            return [`fatal: invalid reference: ${targetBranch}`];
        }

        if (targetBranch === currentBranch) {
            return [`Cannot rebase '${currentBranch}' onto itself.`];
        }

        if (isInteractive) {
            return [`Started interactive rebase of '${currentBranch}' onto '${targetBranch}'.`];
        }

        // We don't actually modify history, just give appropriate message
        return [`Successfully rebased '${currentBranch}' onto '${targetBranch}'.`];
    }
}
