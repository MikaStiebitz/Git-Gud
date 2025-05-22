import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class RebaseCommand implements Command {
    name = "git rebase";
    description = "Reapply commits on top of another base";
    usage = "git rebase [options] <upstream> [<branch>]";
    examples = [
        "git rebase main",
        "git rebase -i HEAD~3",
        "git rebase --abort",
        "git rebase -i main feature",
        "git rebase main feature -i",
    ];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["fatal: not a git repository (or any of the parent directories): .git"];
        }

        // Parse rebase-specific arguments
        const parseResult = this.parseRebaseArgs(args);

        if (parseResult.error) {
            return [parseResult.error];
        }

        const { isInteractive, isAbort, upstream, branch } = parseResult;

        // Handle --abort flag
        if (isAbort) {
            return ["Rebase aborted successfully."];
        }

        // Check if upstream branch is specified
        if (!upstream) {
            return [
                "fatal: It seems that there is already a rebase-merge directory, and",
                "I wonder if you are in the middle of another rebase.  If that is the",
                "case, please try",
                "        git rebase (--continue | --abort | --skip)",
                "If that is not the case, please",
                '        rm -fr ".git/rebase-merge"',
                "and run me again.  I am stopping in case you still have something",
                "valuable there.",
            ];
        }

        const currentBranch = gitRepository.getCurrentBranch();
        const branches = gitRepository.getBranches();

        // Validate upstream branch exists
        if (!branches.includes(upstream)) {
            return [`fatal: invalid upstream '${upstream}'`];
        }

        // Handle target branch (if specified)
        const targetBranch = branch ?? currentBranch;

        if (branch && !branches.includes(branch)) {
            return [`fatal: invalid branch '${branch}'`];
        }

        // Can't rebase onto itself
        if (upstream === targetBranch) {
            return [`fatal: Cannot rebase '${targetBranch}' onto itself.`];
        }

        // Switch to target branch if different from current
        if (branch && branch !== currentBranch) {
            const switchSuccess = gitRepository.checkout(branch);
            if (!switchSuccess) {
                return [`fatal: could not switch to branch '${branch}'`];
            }
        }

        if (isInteractive) {
            return [
                `Successfully started interactive rebase of '${targetBranch}' onto '${upstream}'.`,
                "# This is a simulation - in real Git, an editor would open here",
                "# with a list of commits to be rebased.",
            ];
        }

        // Standard rebase
        return [
            `First, rewinding head to replay your work on top of it...`,
            `Applying: Rebased commits from '${targetBranch}' onto '${upstream}'`,
            `Successfully rebased '${targetBranch}' onto '${upstream}'.`,
        ];
    }

    private parseRebaseArgs(args: CommandArgs): {
        isInteractive: boolean;
        isAbort: boolean;
        upstream?: string;
        branch?: string;
        error?: string;
    } {
        const isInteractive = args.flags.i !== undefined || args.flags.interactive !== undefined;
        const isAbort = args.flags.abort !== undefined;

        // If abort flag is present, we don't need other arguments
        if (isAbort) {
            return { isInteractive: false, isAbort: true };
        }

        // Extract positional arguments (non-flag arguments)
        // We need to filter out flag arguments from the original args array
        const positionalArgs: string[] = [];

        for (let i = 0; i < args.args.length; i++) {
            const arg = args.args[i];
            if (!arg) continue;

            // Skip flags and their values
            if (arg.startsWith("-")) {
                // Skip single letter flags like -i
                if (arg === "-i" || arg === "--interactive" || arg === "--abort") {
                    continue;
                }
                // Skip flag=value format
                if (arg.includes("=")) {
                    continue;
                }
                // Skip flag with separate value
                if (!arg.startsWith("--") && arg.length > 2) {
                    // This might be combined flags like -abc, just skip
                    continue;
                }
                // If it's a flag that takes a value, skip the next argument too
                const nextArg = args.args[i + 1];
                if (nextArg && !nextArg.startsWith("-")) {
                    i++; // Skip the next argument as it's the flag's value
                }
                continue;
            }

            // This is a positional argument
            positionalArgs.push(arg);
        }

        if (positionalArgs.length === 0) {
            return {
                isInteractive,
                isAbort: false,
                error: "fatal: You must specify a branch to rebase onto.",
            };
        }

        if (positionalArgs.length > 2) {
            return {
                isInteractive,
                isAbort: false,
                error: `fatal: too many arguments for rebase: ${positionalArgs.join(" ")}`,
            };
        }

        return {
            isInteractive,
            isAbort: false,
            upstream: positionalArgs[0],
            branch: positionalArgs[1], // optional
        };
    }
}
