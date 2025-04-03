import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class PushCommand implements Command {
    name = "git push";
    description = "Update remote refs along with associated objects";
    usage = "git push [<remote> [<branch>]]";
    examples = ["git push", "git push origin main", "git push -u origin feature"];
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
        const setUpstream = args.flags.u !== undefined || args.flags["set-upstream"] !== undefined;

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

        // Check if there are unpushed commits before pushing
        const hasUnpushedCommits = gitRepository.hasUnpushedCommits();
        const unpushedCommitCount = gitRepository.getUnpushedCommitCount();

        // Perform push
        const success = gitRepository.push(remote, branch);
        if (success) {
            if (hasUnpushedCommits) {
                // Show a more realistic push output when commits are actually pushed
                if (setUpstream) {
                    return [
                        `Branch '${branch}' set up to track remote branch '${branch}' from '${remote}'.`,
                        `Enumerating objects: ${unpushedCommitCount * 2 + 1}, done.`,
                        `Counting objects: 100% (${unpushedCommitCount * 2 + 1}/${unpushedCommitCount * 2 + 1}), done.`,
                        `Writing objects: 100% (${unpushedCommitCount}/${unpushedCommitCount}), 256 bytes | 256.00 KiB/s, done.`,
                        `Total ${unpushedCommitCount} (delta 0), reused 0 (delta 0)`,
                        `To ${remotes[remote]}`,
                        `   a1b2c3d..e4f5g6h  ${branch} -> ${branch}`,
                    ];
                } else {
                    return [
                        `Enumerating objects: ${unpushedCommitCount * 2 + 1}, done.`,
                        `Counting objects: 100% (${unpushedCommitCount * 2 + 1}/${unpushedCommitCount * 2 + 1}), done.`,
                        `Writing objects: 100% (${unpushedCommitCount}/${unpushedCommitCount}), 256 bytes | 256.00 KiB/s, done.`,
                        `Total ${unpushedCommitCount} (delta 0), reused 0 (delta 0)`,
                        `To ${remotes[remote]}`,
                        `   a1b2c3d..e4f5g6h  ${branch} -> ${branch}`,
                    ];
                }
            } else {
                return ["Everything up-to-date"];
            }
        } else {
            return [`error: failed to push to '${remote}'`];
        }
    }
}
