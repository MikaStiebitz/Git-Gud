import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class MergeCommand implements Command {
    name = "git merge";
    description = "Join two or more development histories together";
    usage = "git merge [<options>] <commit>...";
    examples = [
        "git merge feature",
        "git merge --abort",
        "git merge --no-ff feature",
        "git merge feature develop",
        "git merge -m 'Merge message' feature",
    ];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["fatal: not a git repository (or any of the parent directories): .git"];
        }

        const parseResult = this.parseMergeArgs(args);

        if (parseResult.error) {
            return [parseResult.error];
        }

        const { isAbort, isNoFF, branches, message } = parseResult;

        // Handle merge abort
        if (isAbort) {
            return ["Merge aborted. Working tree is clean."];
        }

        if (branches.length === 0) {
            return ["fatal: No commit specified and merge.defaultToUpstream not set."];
        }

        const currentBranch = gitRepository.getCurrentBranch();
        const allBranches = gitRepository.getBranches();

        // Validate all branch references
        for (const branch of branches) {
            if (!allBranches.includes(branch)) {
                return [`fatal: '${branch}' does not point to a commit`];
            }
        }

        // Check for self-merge
        if (branches.includes(currentBranch)) {
            return [`fatal: Cannot merge branch '${currentBranch}' into itself.`];
        }

        // Handle single branch merge (most common case)
        if (branches.length === 1) {
            const targetBranch = branches[0]!; // Safe due to length check above

            // Check if already up to date
            if (this.isUpToDate(currentBranch, targetBranch)) {
                return [`Already up to date.`];
            }

            // Check for fast-forward possibility
            const canFastForward = this.canFastForward(currentBranch, targetBranch);

            if (canFastForward && !isNoFF) {
                return [
                    `Updating ${this.getMockCommitHash()}..${this.getMockCommitHash()}`,
                    `Fast-forward`,
                    ` src/feature.js | 1 +`,
                    ` 1 file changed, 1 insertion(+)`,
                ];
            }

            // Handle merge commit
            const success = gitRepository.merge(targetBranch);

            if (!success) {
                return [
                    `Auto-merging failed. Fix conflicts and then commit the result.`,
                    `Automatic merge failed; fix conflicts and then commit the result.`,
                ];
            }

            // Successful merge commit
            const mergeMessage = message ?? `Merge branch '${targetBranch}' into ${currentBranch}`;
            const commitId = this.getMockCommitHash();

            return [
                `Merge made by the 'ort' strategy.`,
                ` src/feature.js | 1 +`,
                ` 1 file changed, 1 insertion(+)`,
                `[${currentBranch} ${commitId}] ${mergeMessage}`,
            ];
        }

        // Handle octopus merge (multiple branches)
        const branchList = branches.join(", ");
        return [
            `Trying simple merge with ${branchList}`,
            `Merge made by the 'octopus' strategy.`,
            ` ${branches.length} files changed, ${branches.length} insertions(+)`,
        ];
    }

    private parseMergeArgs(args: CommandArgs): {
        isAbort: boolean;
        isNoFF: boolean;
        branches: string[];
        message?: string;
        error?: string;
    } {
        const isAbort = args.flags.abort !== undefined;
        const isNoFF = args.flags["no-ff"] !== undefined;
        const message =
            typeof args.flags.m === "string"
                ? args.flags.m
                : typeof args.flags.message === "string"
                  ? args.flags.message
                  : undefined;

        // If abort flag is present, we don't need other arguments
        if (isAbort) {
            return { isAbort: true, isNoFF: false, branches: [] };
        }

        const branches = args.positionalArgs;

        return {
            isAbort: false,
            isNoFF,
            branches,
            message,
        };
    }

    private isUpToDate(currentBranch: string, targetBranch: string): boolean {
        // Simplified check - in real Git this would check commit history
        return false; // For learning purposes, always allow merge
    }

    private canFastForward(currentBranch: string, targetBranch: string): boolean {
        // Simplified check - in real Git this would check if current branch
        // is an ancestor of target branch
        return Math.random() > 0.5; // Random for variety in learning
    }

    private getMockCommitHash(): string {
        return Math.random().toString(16).substring(2, 9);
    }
}
