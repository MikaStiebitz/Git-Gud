import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class GitHelpCommand implements Command {
    name = "git help";
    description = "Display help information about Git";
    usage = "git help [command]";
    examples = ["git help", "git help commit", "git help branch"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        // If a specific command is requested
        if (args.positionalArgs.length > 0) {
            const command = args.positionalArgs[0] ?? "";
            return this.getHelpForCommand(command);
        }

        // General Git help
        return [
            "Available Git commands:",
            "  git init - Initialize a new Git repository",
            "  git status - Show the working tree status",
            "  git add <file> - Add file contents to the index",
            "  git add . - Add all files to the index",
            "  git commit -m <message> - Record changes to the repository",
            "  git branch - List branches",
            "  git branch <name> - Create a new branch",
            "  git branch -d <name> - Delete a branch",
            "  git checkout <branch> - Switch branches",
            "  git checkout -b <branch> - Create and switch to a new branch",
            "  git switch <branch> - Switch branches (newer alternative)",
            "  git switch -c <branch> - Create and switch to a new branch",
            "  git merge <branch> - Join two development histories together",
            "  git merge --abort - Abort current merge operation",
            "  git mv <source> <dest> - Move or rename a file",
            "  git rm <file> - Remove files from the working tree and from the index",
            "  git log - Show commit history",
            "  git log --oneline - Show commit history in compact format",
            "  git restore <file> - Restore working tree files",
            "  git restore --staged <file> - Unstage files",
            "  git reset [--soft|--mixed|--hard] - Reset current HEAD to a specific state",
            "  git revert <commit> - Create a commit that undoes another commit",
            "  git rebase <branch> - Reapply commits on top of another base",
            "  git stash - Stash changes temporarily",
            "  git stash pop - Apply and remove stashed changes",
            "  git cherry-pick <commit> - Apply changes from specific commits",
            "  git diff - Show changes between commits",
            "  git show - Show various Git objects",
            "  git remote - Manage remote repositories",
            "  git remote add <name> <url> - Add a remote repository",
            "  git push [<remote>] [<branch>] - Push changes to remote repository",
            "  git pull [<remote>] [<branch>] - Pull changes from remote repository",
        ];
    }

    // Help for specific commands
    private getHelpForCommand(command: string): string[] {
        switch (command) {
            case "init":
                return [
                    "NAME",
                    "    git-init - Create an empty Git repository or reinitialize an existing one",
                    "",
                    "SYNOPSIS",
                    "    git init",
                    "",
                    "DESCRIPTION",
                    "    This command creates an empty Git repository - basically a .git directory",
                    "    with subdirectories for objects, refs/heads, refs/tags, and template files.",
                    "",
                    "EXAMPLES",
                    "    git init",
                ];

            case "status":
                return [
                    "NAME",
                    "    git-status - Show the working tree status",
                    "",
                    "SYNOPSIS",
                    "    git status",
                    "",
                    "DESCRIPTION",
                    "    Displays paths that have differences between the index file and the",
                    "    current HEAD commit, paths that have differences between the working",
                    "    tree and the index file, and paths in the working tree that are not",
                    "    tracked by Git.",
                    "",
                    "EXAMPLES",
                    "    git status",
                ];

            // More descriptions coming soon

            default:
                return [`No detailed help available for 'git ${command}'.`];
        }
    }
}
