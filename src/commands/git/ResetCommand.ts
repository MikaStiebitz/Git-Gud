import type { Command, CommandArgs, CommandContext } from "../base/Command";
import type { GitRepository } from "~/models/GitRepository";

export class ResetCommand implements Command {
    name = "git reset";
    description = "Reset current HEAD to the specified state";
    usage = "git reset [--soft | --mixed | --hard] [<commit>]";
    examples = [
        "git reset --soft HEAD~1",
        "git reset --mixed HEAD~1",
        "git reset --hard HEAD~1",
        "git reset --hard HEAD",
        "git reset --soft HEAD",
        "git reset HEAD~2",
    ];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Parse options: --soft, --mixed (default), --hard
        let mode: "soft" | "mixed" | "hard" = "mixed"; // mixed is default
        let target = "HEAD";

        // Parse reset mode flags
        if (args.flags.soft !== undefined) {
            mode = "soft";
        } else if (args.flags.hard !== undefined) {
            mode = "hard";
        } else if (args.flags.mixed !== undefined) {
            mode = "mixed";
        }

        // Parse target commit
        if (args.positionalArgs.length > 0) {
            target = args.positionalArgs[0] ?? "HEAD";
        }

        // Get all commits for the current branch
        const commits = Object.keys(gitRepository.getCommits());

        if (commits.length === 0) {
            if (target === "HEAD") {
                return this.performReset(gitRepository, mode, "HEAD", 0);
            } else {
                return [`fatal: ambiguous argument '${target}': unknown revision or path not in the working tree.`];
            }
        }

        // Parse HEAD references (HEAD~N)
        let commitsBack = 0;
        let targetCommitId: string | null = null;

        if (target === "HEAD") {
            commitsBack = 0;
            targetCommitId = commits[commits.length - 1] ?? null;
        } else if (target.startsWith("HEAD~")) {
            const num = parseInt(target.substring(5));
            if (!isNaN(num) && num > 0) {
                commitsBack = num;
                if (commitsBack >= commits.length) {
                    return [`fatal: ambiguous argument '${target}': unknown revision or path not in the working tree.`];
                }
                targetCommitId = commits[commits.length - 1 - commitsBack] ?? null;
            } else {
                return [`fatal: ambiguous argument '${target}': unknown revision or path not in the working tree.`];
            }
        } else {
            // Try to find commit by ID
            targetCommitId = commits.find(id => id.startsWith(target)) ?? null;
            if (!targetCommitId) {
                return [`fatal: ambiguous argument '${target}': unknown revision or path not in the working tree.`];
            }
        }

        if (!targetCommitId) {
            return [`fatal: ambiguous argument '${target}': unknown revision or path not in the working tree.`];
        }

        return this.performReset(gitRepository, mode, targetCommitId, commitsBack);
    }

    private performReset(
        gitRepository: GitRepository,
        mode: "soft" | "mixed" | "hard",
        targetCommitId: string,
        commitsBack: number,
    ): string[] {
        const status = gitRepository.getStatus();
        const currentBranch = gitRepository.getCurrentBranch();

        switch (mode) {
            case "hard":
                // Reset working directory, staging area, and HEAD
                // Clear all modifications, staged changes, and untracked files
                const clearedFiles: string[] = [];

                for (const [file, fileStatus] of Object.entries(status)) {
                    if (
                        fileStatus === "modified" ||
                        fileStatus === "staged" ||
                        fileStatus === "untracked" ||
                        fileStatus === "staged+modified"
                    ) {
                        gitRepository.updateFileStatus(file, "committed");
                        clearedFiles.push(file);
                    }
                }

                // Use the new resetToCommit method
                gitRepository.resetToCommit(targetCommitId, "hard");

                if (commitsBack > 0) {
                    return [
                        `HEAD is now at ${targetCommitId.substring(0, 7)} (${commitsBack} commit${commitsBack > 1 ? "s" : ""} behind)`,
                        "All local changes have been discarded.",
                    ];
                } else {
                    return [
                        `HEAD is now at ${targetCommitId.substring(0, 7)}`,
                        "Working directory and staging area cleared.",
                    ];
                }

            case "soft":
                // Only move HEAD, keep staging area and working directory unchanged
                if (commitsBack > 0) {
                    return [
                        `HEAD is now at ${targetCommitId.substring(0, 7)} (${commitsBack} commit${commitsBack > 1 ? "s" : ""} behind)`,
                        "Staged changes and working directory preserved.",
                    ];
                } else {
                    return [
                        `HEAD is now at ${targetCommitId.substring(0, 7)}`,
                        "No changes to staging area or working directory.",
                    ];
                }

            case "mixed":
            default:
                // Reset staging area but keep working directory
                // Move staged files to modified state
                const unstagedFiles: string[] = [];

                for (const [file, fileStatus] of Object.entries(status)) {
                    if (fileStatus === "staged" || fileStatus === "staged+modified") {
                        gitRepository.updateFileStatus(file, "modified");
                        unstagedFiles.push(file);
                    }
                }

                gitRepository.resetToCommit(targetCommitId, "mixed");

                if (commitsBack > 0) {
                    return [
                        `HEAD is now at ${targetCommitId.substring(0, 7)} (${commitsBack} commit${commitsBack > 1 ? "s" : ""} behind)`,
                        unstagedFiles.length > 0
                            ? `Unstaged changes after reset:\n${unstagedFiles.map(f => `M\t${f}`).join("\n")}`
                            : "Working directory preserved.",
                    ];
                } else {
                    return [
                        `HEAD is now at ${targetCommitId.substring(0, 7)}`,
                        unstagedFiles.length > 0
                            ? `Unstaged changes:\n${unstagedFiles.map(f => `M\t${f}`).join("\n")}`
                            : "No staged changes to reset.",
                    ];
                }
        }
    }
}
