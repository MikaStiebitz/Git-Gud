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

        // Parse positional arguments
        if (args.positionalArgs.length > 0) {
            remote = args.positionalArgs[0] ?? "origin";
        }

        // For learning platform, always simulate a successful pull
        // Auto-add a remote if it doesn't exist
        const remotes = gitRepository.getRemotes();
        if (!remotes[remote]) {
            // Auto-create the remote for better UX in the learning platform
            gitRepository.addRemote(remote, `https://github.com/user/${remote}.git`);
        }

        // Simulate pull response
        return ["Already up to date."];
    }
}
