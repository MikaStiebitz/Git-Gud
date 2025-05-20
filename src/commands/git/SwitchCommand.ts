import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class SwitchCommand implements Command {
    name = "git switch";
    description = "Switch to a specified branch";
    usage = "git switch [<options>] <branch>";
    examples = ["git switch main", "git switch -c feature", "git switch -C force-create"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["fatal: not a git repository (or any of the parent directories): .git"];
        }

        const parseResult = this.parseSwitchArgs(args);

        if (parseResult.error) {
            return [parseResult.error];
        }

        const { isCreateBranch, isForceCreateBranch, branchName, startPoint } = parseResult;

        if (!branchName) {
            return ["fatal: You must specify a branch name."];
        }

        const currentBranch = gitRepository.getCurrentBranch();
        const branches = gitRepository.getBranches();

        // Handle branch creation
        if (isCreateBranch || isForceCreateBranch) {
            // Check if branch already exists (unless force create)
            if (branches.includes(branchName) && !isForceCreateBranch) {
                return [`fatal: A branch named '${branchName}' already exists.`];
            }

            // Validate start point if provided
            if (startPoint && !branches.includes(startPoint)) {
                return [
                    `fatal: '${startPoint}' is not a commit and a branch '${branchName}' cannot be created from it`,
                ];
            }

            // Create branch
            const createSuccess = gitRepository.createBranch(branchName);
            if (!createSuccess && !isForceCreateBranch) {
                return [`fatal: A branch named '${branchName}' already exists.`];
            }

            // Switch to the new branch
            const checkoutResult = gitRepository.checkout(branchName);
            if (!checkoutResult.success) {
                return [`fatal: could not create and switch to branch '${branchName}'`];
            }

            const result = [`Switched to a new branch '${branchName}'`];
            if (checkoutResult.warnings) {
                result.unshift(...checkoutResult.warnings);
            }
            return result;
        }

        // Handle branch switching
        if (!branches.includes(branchName)) {
            // More helpful error message
            const similarBranches = branches.filter(
                b =>
                    b.toLowerCase().includes(branchName.toLowerCase()) ||
                    branchName.toLowerCase().includes(b.toLowerCase()),
            );

            let errorMsg = `fatal: invalid reference: ${branchName}`;

            if (similarBranches.length > 0) {
                errorMsg += `\nDid you mean one of these?\n${similarBranches.map(b => `\t${b}`).join("\n")}`;
            } else {
                errorMsg += `\nDid you mean to create a new branch? Use: git switch -c ${branchName}`;
            }

            return [errorMsg];
        }

        // Switch to existing branch
        const checkoutResult = gitRepository.checkout(branchName);

        if (checkoutResult.success) {
            if (branchName === currentBranch) {
                return [`Already on '${branchName}'`];
            }

            const result = [`Switched to branch '${branchName}'`];
            if (checkoutResult.warnings) {
                result.unshift(...checkoutResult.warnings);
            }
            return result;
        } else {
            return [`fatal: could not switch to branch '${branchName}'`];
        }
    }

    private parseSwitchArgs(args: CommandArgs): {
        isCreateBranch: boolean;
        isForceCreateBranch: boolean;
        branchName?: string;
        startPoint?: string;
        error?: string;
    } {
        const isCreateBranch = args.flags.c !== undefined || args.flags.create !== undefined;
        const isForceCreateBranch = args.flags.C !== undefined || args.flags["force-create"] !== undefined;

        // Handle branch operations - fix for argument parsing
        let positionalArgs = args.positionalArgs;

        // If we have -c flag but no positional args, check if the branch name
        // was captured as a flag value
        if ((isCreateBranch || isForceCreateBranch) && positionalArgs.length === 0) {
            // Check if -c has a value (like -c branchname)
            const cFlagValue = args.flags.c;
            const CFlagValue = args.flags.C;
            const createFlagValue = args.flags.create;
            const forceCreateFlagValue = args.flags["force-create"];

            if (typeof cFlagValue === "string") {
                positionalArgs = [cFlagValue];
            } else if (typeof CFlagValue === "string") {
                positionalArgs = [CFlagValue];
            } else if (typeof createFlagValue === "string") {
                positionalArgs = [createFlagValue];
            } else if (typeof forceCreateFlagValue === "string") {
                positionalArgs = [forceCreateFlagValue];
            } else {
                return {
                    isCreateBranch,
                    isForceCreateBranch,
                    error: "fatal: switch `c' requires a value",
                };
            }
        }

        // Additional check: if we still have no args after the above check
        if ((isCreateBranch || isForceCreateBranch) && positionalArgs.length === 0) {
            return {
                isCreateBranch,
                isForceCreateBranch,
                error: "fatal: switch `c' requires a value",
            };
        }

        if (positionalArgs.length === 0 && !isCreateBranch && !isForceCreateBranch) {
            return {
                isCreateBranch,
                isForceCreateBranch,
                error: "fatal: You must specify a branch name.",
            };
        }

        return {
            isCreateBranch,
            isForceCreateBranch,
            branchName: positionalArgs[0] ?? undefined,
            startPoint: positionalArgs[1] ?? undefined, // for -c <branch> <start-point>
        };
    }
}
