import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class RemoteCommand implements Command {
    name = "git remote";
    description = "Manage set of tracked repositories";
    usage = "git remote [add <name> <url> | -v]";
    examples = ["git remote", "git remote -v", "git remote add origin https://github.com/user/repo.git"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Handle different subcommands
        const subcommand = args.positionalArgs[0];

        // List remotes (default)
        if (args.positionalArgs.length === 0) {
            // List remotes
            const remotes = Object.keys(gitRepository.getRemotes());

            // If no remotes exist and we're not in a specific level, add a default remote
            if (remotes.length === 0 && !gitRepository.isInitialized()) {
                gitRepository.addRemote("origin", "https://github.com/user/repo.git");
                return ["origin"];
            }

            return remotes.length === 0 ? [] : remotes;
        }

        // Add a remote
        if (subcommand === "add") {
            if (args.positionalArgs.length < 3) {
                return ["error: wrong number of arguments, usage: git remote add <name> <url>"];
            }

            const name = args.positionalArgs[1] ?? "";
            const url = args.positionalArgs[2] ?? "";

            const success = gitRepository.addRemote(name, url);
            return success ? [`Added remote '${name}' with URL '${url}'`] : [`error: remote '${name}' already exists`];
        }

        // Show remote details
        if (args.positionalArgs[0] === "-v" || args.positionalArgs[0] === "--verbose") {
            // List remotes with URLs
            const remotes = gitRepository.getRemotes();
            const output: string[] = [];

            for (const [name, url] of Object.entries(remotes)) {
                output.push(`${name}\t${url} (fetch)`);
                output.push(`${name}\t${url} (push)`);
            }

            return output.length === 0 ? [] : output;
        }

        return ["error: Unknown subcommand. Supported: git remote, git remote add <name> <url>, git remote -v"];
    }
}
