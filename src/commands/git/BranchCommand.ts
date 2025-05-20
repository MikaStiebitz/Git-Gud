import type { Command, CommandArgs, CommandContext } from "../base/Command";
import type { GitRepository } from "~/models/GitRepository";

export class BranchCommand implements Command {
    name = "git branch";
    description = "List, create, or delete branches";
    usage = "git branch [<options>] [<branch>] [<start-point>]";
    examples = [
        "git branch",
        "git branch feature",
        "git branch -d old-branch",
        "git branch -D force-delete-branch",
        "git branch feature main",
        "git branch -m old-name new-name",
        "git branch -r",
    ];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["fatal: not a git repository (or any of the parent directories): .git"];
        }

        const parseResult = this.parseBranchArgs(args);

        if (parseResult.error) {
            return [parseResult.error];
        }

        const { action, branchName, startPoint, newName, isForce } = parseResult;

        switch (action) {
            case "list":
                return this.listBranches(gitRepository);

            case "create":
                return this.createBranch(gitRepository, branchName!, startPoint);

            case "delete":
                return this.deleteBranch(gitRepository, branchName!, isForce);

            case "rename":
                return this.renameBranch(gitRepository, branchName!, newName!);

            default:
                return ["fatal: unknown branch command"];
        }
    }

    private parseBranchArgs(args: CommandArgs): {
        action: "list" | "create" | "delete" | "rename";
        branchName?: string;
        startPoint?: string;
        newName?: string;
        isForce: boolean;
        error?: string;
    } {
        const isDelete = args.flags.d !== undefined;
        const isForceDelete = args.flags.D !== undefined;
        const isMove = args.flags.m !== undefined;
        const isForceMove = args.flags.M !== undefined;
        const isRemote = args.flags.r !== undefined;

        const isForce = isForceDelete || isForceMove;
        const positionalArgs = args.positionalArgs;

        // Handle remote branch listing
        if (isRemote) {
            return {
                action: "list",
                isForce: false,
            };
        }

        // Handle deletion
        if (isDelete || isForceDelete) {
            if (positionalArgs.length === 0) {
                return {
                    action: "delete",
                    isForce,
                    error: "fatal: branch name required",
                };
            }

            return {
                action: "delete",
                branchName: positionalArgs[0],
                isForce,
            };
        }

        // Handle rename
        if (isMove || isForceMove) {
            if (positionalArgs.length < 2) {
                return {
                    action: "rename",
                    isForce,
                    error: "fatal: Branch rename requires both old and new branch names",
                };
            }

            return {
                action: "rename",
                branchName: positionalArgs[0],
                newName: positionalArgs[1],
                isForce,
            };
        }

        // Handle creation
        if (positionalArgs.length > 0) {
            return {
                action: "create",
                branchName: positionalArgs[0],
                startPoint: positionalArgs[1], // optional
                isForce: false,
            };
        }

        // Default to list
        return {
            action: "list",
            isForce: false,
        };
    }

    private listBranches(gitRepository: GitRepository): string[] {
        const branches = gitRepository.getBranches();
        const currentBranch = gitRepository.getCurrentBranch();

        return branches.map(branch => (branch === currentBranch ? `* ${branch}` : `  ${branch}`));
    }

    private createBranch(gitRepository: GitRepository, branchName: string, startPoint?: string): string[] {
        const allBranches = gitRepository.getBranches();

        // Check if branch already exists
        if (allBranches.includes(branchName)) {
            return [`fatal: A branch named '${branchName}' already exists.`];
        }

        // Validate start point if provided
        if (startPoint && !allBranches.includes(startPoint)) {
            return [`fatal: '${startPoint}' is not a valid branch name.`];
        }

        const created = gitRepository.createBranch(branchName);

        if (created) {
            return [`Created branch '${branchName}'${startPoint ? ` from '${startPoint}'` : ""}.`];
        } else {
            return [`fatal: Failed to create branch '${branchName}'.`];
        }
    }

    private deleteBranch(gitRepository: GitRepository, branchName: string, isForce: boolean): string[] {
        const currentBranch = gitRepository.getCurrentBranch();
        const allBranches = gitRepository.getBranches();

        // Check if branch exists
        if (!allBranches.includes(branchName)) {
            return [`error: branch '${branchName}' not found.`];
        }

        // Cannot delete current branch
        if (branchName === currentBranch) {
            return [`error: Cannot delete branch '${branchName}' checked out at '${process.cwd()}'`];
        }

        // Check for unmerged commits (only if not force)
        if (!isForce && this.hasUnmergedCommits(branchName)) {
            return [
                `error: The branch '${branchName}' is not fully merged.`,
                `If you are sure you want to delete it, run 'git branch -D ${branchName}'.`,
            ];
        }

        const deleted = gitRepository.deleteBranch(branchName);

        if (deleted) {
            return [`Deleted branch ${branchName} (was ${this.getMockCommitHash()}).`];
        } else {
            return [`error: Failed to delete branch '${branchName}'.`];
        }
    }

    private renameBranch(gitRepository: GitRepository, oldName: string, newName: string): string[] {
        const allBranches = gitRepository.getBranches();
        const currentBranch = gitRepository.getCurrentBranch();

        // Check if old branch exists
        if (!allBranches.includes(oldName)) {
            return [`error: refname refs/heads/${oldName} not found`];
        }

        // Check if new branch already exists
        if (allBranches.includes(newName)) {
            return [`fatal: A branch named '${newName}' already exists.`];
        }

        // In a real implementation, we would rename the branch
        // For simulation, we'll create new and delete old
        const createSuccess = gitRepository.createBranch(newName);
        if (!createSuccess) {
            return [`fatal: Failed to create branch '${newName}'.`];
        }

        const deleteSuccess = gitRepository.deleteBranch(oldName);
        if (!deleteSuccess) {
            return [`fatal: Failed to delete old branch '${oldName}'.`];
        }

        // If we were on the renamed branch, switch to the new name
        if (currentBranch === oldName) {
            gitRepository.checkout(newName);
        }

        return [`Branch '${oldName}' renamed to '${newName}'.`];
    }

    private hasUnmergedCommits(branchName: string): boolean {
        // Simplified check - in real Git this would check if the branch
        // has commits that aren't merged into the current branch
        return Math.random() > 0.7; // Sometimes have unmerged commits for realism
    }

    private getMockCommitHash(): string {
        return Math.random().toString(16).substring(2, 9);
    }
}
