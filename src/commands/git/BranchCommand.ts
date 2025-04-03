import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class BranchCommand implements Command {
    name = "git branch";
    description = "List, create, or delete branches";
    usage = "git branch [name] or git branch -d <name>";
    examples = ["git branch", "git branch feature", "git branch -d old-branch"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Handle branch deletion
        if (args.flags.d !== undefined || args.flags.delete !== undefined || args.flags.D !== undefined) {
            if (args.positionalArgs.length === 0) {
                return ["error: branch name required"];
            }

            const branchName = args.positionalArgs[0] ?? "";

            // Cannot delete current branch
            if (branchName === gitRepository.getCurrentBranch()) {
                return [`error: Cannot delete branch '${branchName}' checked out`];
            }

            const deleted = gitRepository.deleteBranch(branchName);
            if (deleted) {
                return [`Deleted branch ${branchName}`];
            } else {
                return [`error: branch '${branchName}' not found`];
            }
        }

        // Create new branch without switching
        if (args.positionalArgs.length > 0) {
            const newBranch = args.positionalArgs[0] ?? "";
            const created = gitRepository.createBranch(newBranch);

            if (created) {
                return [`Created branch '${newBranch}'`];
            } else {
                return [`fatal: a branch named '${newBranch}' already exists`];
            }
        }

        // List branches
        const branches = gitRepository.getBranches();
        const currentBranch = gitRepository.getCurrentBranch();

        return branches.map(branch => (branch === currentBranch ? `* ${branch}` : `  ${branch}`));
    }
}
