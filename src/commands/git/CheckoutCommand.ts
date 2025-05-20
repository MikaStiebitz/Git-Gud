import { GitRepository } from "~/models/GitRepository";
import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { FileSystem } from "~/models/FileSystem";

export class CheckoutCommand implements Command {
    name = "git checkout";
    description = "Switch branches or restore working tree files";
    usage = "git checkout [<options>] <branch>";
    examples = [
        "git checkout main",
        "git checkout -b feature",
        "git checkout -b feature main",
        "git checkout -- file.txt",
        "git checkout HEAD~1 -- file.txt",
    ];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository, fileSystem } = context;

        if (!gitRepository.isInitialized()) {
            return ["fatal: not a git repository (or any of the parent directories): .git"];
        }

        const parseResult = this.parseCheckoutArgs(args, context);

        if (parseResult.error) {
            return [parseResult.error];
        }

        const { isCreateBranch, isForceCreateBranch, isRestoreFiles, branchName, startPoint, filePaths } = parseResult;

        // Handle file restoration (git checkout -- file.txt)
        if (isRestoreFiles) {
            return this.handleFileRestore(filePaths, fileSystem, gitRepository);
        }

        // Handle branch operations
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

            let errorMsg = `error: pathspec '${branchName}' did not match any file(s) known to git`;

            if (similarBranches.length > 0) {
                errorMsg += `\nDid you mean one of these?\n${similarBranches.map(b => `\t${b}`).join("\n")}`;
            } else {
                errorMsg += `\nDid you mean to create a new branch? Use: git checkout -b ${branchName}`;
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
            return [`error: could not switch to branch '${branchName}'`];
        }
    }

    private parseCheckoutArgs(
        args: CommandArgs,
        context: CommandContext,
    ): {
        isCreateBranch: boolean;
        isForceCreateBranch: boolean;
        isRestoreFiles: boolean;
        branchName?: string;
        startPoint?: string;
        filePaths: string[];
        error?: string;
    } {
        const isCreateBranch = args.flags.b !== undefined;
        const isForceCreateBranch = args.flags.B !== undefined;

        // Check for file restoration pattern (-- files)
        const dashDashIndex = args.args.indexOf("--");
        const isRestoreFiles = dashDashIndex !== -1;

        if (isRestoreFiles) {
            const filePaths = args.args.slice(dashDashIndex + 1);
            return {
                isCreateBranch: false,
                isForceCreateBranch: false,
                isRestoreFiles: true,
                filePaths,
            };
        }

        // Handle branch operations - the key fix is here
        let positionalArgs = args.positionalArgs;

        // If we have -b flag but no positional args, check if the branch name
        // was captured as a flag value
        if ((isCreateBranch || isForceCreateBranch) && positionalArgs.length === 0) {
            // Check if -b has a value (like -b branchname)
            if (typeof args.flags.b === "string") {
                positionalArgs = [args.flags.b];
            } else if (typeof args.flags.B === "string") {
                positionalArgs = [args.flags.B];
            } else {
                return {
                    isCreateBranch,
                    isForceCreateBranch,
                    isRestoreFiles: false,
                    filePaths: [],
                    error: "fatal: switch `b' requires a value",
                };
            }
        }

        // Additional check: if we still have no args after the above check
        if ((isCreateBranch || isForceCreateBranch) && positionalArgs.length === 0) {
            return {
                isCreateBranch,
                isForceCreateBranch,
                isRestoreFiles: false,
                filePaths: [],
                error: "fatal: switch `b' requires a value",
            };
        }

        if (positionalArgs.length === 0 && !isCreateBranch && !isForceCreateBranch) {
            return {
                isCreateBranch,
                isForceCreateBranch,
                isRestoreFiles: false,
                filePaths: [],
                error: "fatal: You must specify a branch name.",
            };
        }

        return {
            isCreateBranch,
            isForceCreateBranch,
            isRestoreFiles: false,
            branchName: positionalArgs[0],
            startPoint: positionalArgs[1], // for -b <branch> <start-point>
            filePaths: [],
        };
    }

    private handleFileRestore(filePaths: string[], fileSystem: FileSystem, gitRepository: GitRepository): string[] {
        if (filePaths.length === 0) {
            return ["fatal: You must specify file paths to restore."];
        }

        const results: string[] = [];

        for (const filePath of filePaths) {
            // Check if file exists
            if (fileSystem.getFileContents(filePath) === null) {
                results.push(`error: pathspec '${filePath}' did not match any file(s) known to git`);
                continue;
            }

            // Restore file (simplified - just mark as clean)
            gitRepository.updateFileStatus(filePath, "committed");
            results.push(`Updated 1 path from the index.`);
        }

        return results.length > 0 ? results : ["Updated paths from the index."];
    }
}
