import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class PullCommand implements Command {
    name = "git pull";
    description = "Fetch from and integrate with another repository or a local branch";
    usage = "git pull [<remote> [<branch>]]";
    examples = ["git pull", "git pull origin main"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Default values
        let remote = "origin";
        let branch = gitRepository.getCurrentBranch();

        // Parse positional arguments
        if (args.positionalArgs.length > 0) {
            remote = args.positionalArgs[0] ?? "origin";
        }

        if (args.positionalArgs.length > 1) {
            branch = args.positionalArgs[1] ?? gitRepository.getCurrentBranch();
        }

        // Check if remote exists
        const remotes = gitRepository.getRemotes();
        if (!remotes[remote]) {
            return [
                `fatal: '${remote}' does not appear to be a git repository`,
                "fatal: Could not read from remote repository.",
                "Please make sure you have the correct access rights",
                "and the repository exists.",
            ];
        }

        // Perform pull
        const success = gitRepository.pull(remote, branch);
        if (success) {
            return ["Already up to date."];
        } else {
            return [`error: failed to pull from '${remote}'`];
        }
    }
}
