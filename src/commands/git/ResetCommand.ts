import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class ResetCommand implements Command {
    name = "git reset";
    description = "Reset current HEAD to the specified state";
    usage = "git reset [--soft | --mixed | --hard] [<commit>]";
    examples = ["git reset --soft HEAD~1", "git reset --mixed HEAD~1", "git reset --hard HEAD~1"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Parse options: --soft, --mixed (default), --hard
        let mode = "mixed";
        let target = "HEAD";

        if (args.flags.soft !== undefined) {
            mode = "soft";
        } else if (args.flags.hard !== undefined) {
            mode = "hard";
        } else if (args.flags.mixed !== undefined) {
            mode = "mixed";
        }

        if (args.positionalArgs.length > 0) {
            target = args.positionalArgs[0] ?? "";
        }

        // Handle both HEAD and HEAD~1
        if (target === "HEAD" || target === "HEAD~1") {
            const commits = Object.keys(gitRepository.getCommits());

            if (commits.length === 0) {
                return [`fatal: ambiguous argument '${target}': unknown revision`];
            }

            // We don't actually modify history, just handle the changes to status
            if (mode === "hard") {
                // --hard would reset index and working directory
                // Clear all modified/staged files in the repository
                const status = gitRepository.getStatus();

                // Apply changes to status
                for (const [file, fileStatus] of Object.entries(status)) {
                    if (fileStatus === "modified" || fileStatus === "staged" || fileStatus === "untracked") {
                        // For a hard reset, remove these statuses
                        gitRepository.updateFileStatus(file, "committed");
                    }
                }

                // If target is HEAD, this is equivalent to discarding all changes
                if (target === "HEAD") {
                    return [
                        "HEAD is now at " +
                            commits[commits.length - 1]?.substring(0, 7) +
                            " (working directory and index changes discarded)",
                    ];
                } else {
                    // For HEAD~1, this would reset to the previous commit
                    if (commits.length < 2) {
                        return ["fatal: Cannot reset to HEAD~1: no previous commit exists"];
                    }

                    return [
                        "HEAD is now at " +
                            commits[commits.length - 2]?.substring(0, 7) +
                            " (working directory and index changes discarded)",
                    ];
                }
            } else if (mode === "soft") {
                // --soft would keep changes staged
                if (target === "HEAD") {
                    return ["No changes to HEAD (changes kept in staging area)"];
                } else {
                    return [
                        "HEAD is now at " +
                            commits[commits.length - 2]?.substring(0, 7) +
                            " (changes kept in staging area)",
                    ];
                }
            } else {
                // --mixed (default) would unstage the changes
                const status = gitRepository.getStatus();

                // Apply changes to status
                for (const [file, fileStatus] of Object.entries(status)) {
                    if (fileStatus === "staged") {
                        // For a mixed reset, move staged files to modified
                        gitRepository.updateFileStatus(file, "modified");
                    }
                }

                if (target === "HEAD") {
                    return ["Unstaged changes (changes kept in working directory)"];
                } else {
                    return [
                        "HEAD is now at " +
                            commits[commits.length - 2]?.substring(0, 7) +
                            " (changes kept in working directory)",
                    ];
                }
            }
        }

        return [
            "Reset operation not fully implemented in this simulation. Supported: git reset [--soft|--mixed|--hard] HEAD",
        ];
    }
}
