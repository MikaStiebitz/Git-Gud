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

        // Parse HEAD references
        let commitsBack = 0;
        if (target.startsWith("HEAD~")) {
            const num = parseInt(target.substring(5));
            if (!isNaN(num) && num > 0) {
                commitsBack = num;
                target = "HEAD~N"; // Mark as a relative HEAD reference
            }
        }

        // Get all commits
        const commits = Object.keys(gitRepository.getCommits());

        // Handle empty repository case
        if (commits.length === 0) {
            if (target === "HEAD") {
                return ["HEAD is now at initial state"];
            } else if (target.startsWith("HEAD~")) {
                return [`fatal: ambiguous argument '${target}': unknown revision`];
            }
            return [`fatal: ambiguous argument '${target}': unknown revision`];
        }

        // Handle HEAD~N references
        if (target === "HEAD~N") {
            if (commitsBack >= commits.length) {
                return [`fatal: ambiguous argument 'HEAD~${commitsBack}': unknown revision`];
            }

            // Find the target commit
            const targetCommit = commits[commits.length - 1 - commitsBack];

            // Perform reset based on mode
            if (mode === "hard") {
                // Clear all modified/staged files
                const status = gitRepository.getStatus();
                for (const [file, fileStatus] of Object.entries(status)) {
                    // Check if file has any changes that need to be reset
                    if (
                        fileStatus === "modified" ||
                        fileStatus === "staged" ||
                        fileStatus === "untracked" ||
                        fileStatus === "staged+modified"
                    ) {
                        gitRepository.updateFileStatus(file, "committed");
                    }
                }

                return [
                    `HEAD is now at ${targetCommit?.substring(0, 7)} (working directory and index changes discarded)`,
                ];
            } else if (mode === "soft") {
                return [`HEAD is now at ${targetCommit?.substring(0, 7)} (changes kept in staging area)`];
            } else {
                // mixed
                // Unstage all changes
                const status = gitRepository.getStatus();
                for (const [file, fileStatus] of Object.entries(status)) {
                    if (fileStatus === "staged" || fileStatus === "staged+modified") {
                        gitRepository.updateFileStatus(file, "modified");
                    }
                }

                return [`HEAD is now at ${targetCommit?.substring(0, 7)} (changes kept in working directory)`];
            }
        }

        // Handle regular HEAD reset
        if (target === "HEAD") {
            if (mode === "hard") {
                // Clear all modified/staged files
                const status = gitRepository.getStatus();
                for (const [file, fileStatus] of Object.entries(status)) {
                    // Check if file has any changes that need to be reset
                    if (
                        fileStatus === "modified" ||
                        fileStatus === "staged" ||
                        fileStatus === "untracked" ||
                        fileStatus === "staged+modified"
                    ) {
                        gitRepository.updateFileStatus(file, "committed");
                    }
                }

                return [
                    `HEAD is now at ${commits[commits.length - 1]?.substring(0, 7)} (working directory and index changes discarded)`,
                ];
            } else if (mode === "soft") {
                return ["No changes to HEAD (changes kept in staging area)"];
            } else {
                // mixed
                // Unstage all changes
                const status = gitRepository.getStatus();
                for (const [file, fileStatus] of Object.entries(status)) {
                    if (fileStatus === "staged" || fileStatus === "staged+modified") {
                        gitRepository.updateFileStatus(file, "modified");
                    }
                }

                return ["Unstaged changes (changes kept in working directory)"];
            }
        }

        return [
            "Reset operation not fully implemented for this target. Supported: git reset [--soft|--mixed|--hard] HEAD, git reset [--soft|--mixed|--hard] HEAD~N",
        ];
    }
}
