import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class StashCommand implements Command {
    name = "git stash";
    description = "Stash the changes in a dirty working directory away";
    usage = "git stash [push|list|pop|apply]";
    examples = ["git stash", "git stash pop", "git stash list", "git stash apply"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Determine the subcommand (default is "push")
        let subcommand = "push";
        if (args.positionalArgs.length > 0) {
            subcommand = args.positionalArgs[0] ?? "";
        }

        switch (subcommand) {
            case "push":
            case "save":
                // Stash changes
                return [
                    "Saved working directory and index state WIP on " +
                        gitRepository.getCurrentBranch() +
                        ": Changes stashed successfully.",
                ];

            case "pop":
                // Pop stashed changes
                return [
                    "On branch " +
                        gitRepository.getCurrentBranch() +
                        "\nChanges not staged for commit:\n  modified: (stashed changes)\n" +
                        "Dropped refs/stash@{0}",
                ];

            case "list":
                // List stashes (simplified)
                return ["stash@{0}: WIP on " + gitRepository.getCurrentBranch() + ": Changes"];

            case "apply":
                // Apply stashed changes without removing them
                return [
                    "On branch " +
                        gitRepository.getCurrentBranch() +
                        "\nChanges not staged for commit:\n  modified: (stashed changes)\n" +
                        "Applied stash@{0}",
                ];

            default:
                return [
                    "Unsupported stash operation: " +
                        subcommand +
                        "\nSupported operations: git stash, git stash pop, git stash list, git stash apply",
                ];
        }
    }
}
