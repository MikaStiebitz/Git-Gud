import type { FileStatus, GitStatus } from "../types";

export class GitRepository {
    private initialized = false;
    private branches: string[] = ["main"];
    private currentBranch = "main";
    private HEAD = "main";
    private status: GitStatus = {};
    private commits: Record<string, { message: string; timestamp: Date; files: string[] }> = {};

    constructor() {
        this.init();
    }

    // Initialize a new Git repository
    public init(): boolean {
        if (this.initialized) return false;
        this.initialized = true;
        return true;
    }

    // Check if Git is initialized
    public isInitialized(): boolean {
        return this.initialized;
    }

    // Stage a file for commit
    public addFile(path: string): boolean {
        if (!this.initialized) return false;
        this.status[path] = "staged";
        return true;
    }

    // Stage all files
    public addAll(files: string[]): string[] {
        if (!this.initialized) return [];

        const stagedFiles: string[] = [];
        for (const file of files) {
            this.status[file] = "staged";
            stagedFiles.push(file);
        }
        return stagedFiles;
    }

    // Create a commit
    public commit(message: string): string | null {
        if (!this.initialized) return null;

        const stagedFiles = Object.entries(this.status)
            .filter(([_, status]) => status === "staged")
            .map(([file]) => file);

        if (stagedFiles.length === 0) return null;

        const commitId = this.generateCommitId();
        this.commits[commitId] = {
            message,
            timestamp: new Date(),
            files: stagedFiles,
        };

        // Update status - move staged files to committed
        for (const file of stagedFiles) {
            this.status[file] = "committed";
        }

        return commitId;
    }

    // Create a new branch
    public createBranch(name: string): boolean {
        if (!this.initialized || this.branches.includes(name)) return false;
        this.branches.push(name);
        return true;
    }

    // Switch to a branch
    public checkout(branch: string, createNew = false): boolean {
        if (!this.initialized) return false;

        if (createNew) {
            if (!this.createBranch(branch)) return false;
        } else if (!this.branches.includes(branch)) {
            return false;
        }

        this.currentBranch = branch;
        this.HEAD = branch;
        return true;
    }

    // Merge a branch into the current branch
    public merge(branch: string): boolean {
        if (!this.initialized || !this.branches.includes(branch) || branch === this.currentBranch) {
            return false;
        }

        // In a real application, we would handle merge conflicts here
        // For the learning game, we'll simplify and just say the merge succeeded
        return true;
    }

    // Get the current branch
    public getCurrentBranch(): string {
        return this.currentBranch;
    }

    // Get all branches
    public getBranches(): string[] {
        return [...this.branches];
    }

    // Update file status (for when files are modified)
    public updateFileStatus(path: string, status: FileStatus): void {
        this.status[path] = status;
    }

    // Get status of tracked files
    public getStatus(): GitStatus {
        return { ...this.status };
    }

    // Generate a simple commit ID
    private generateCommitId(): string {
        return Math.random().toString(16).substring(2, 10);
    }

    // Reset the repository (for restarting levels)
    public reset(): void {
        this.initialized = false;
        this.branches = ["main"];
        this.currentBranch = "main";
        this.HEAD = "main";
        this.status = {};
        this.commits = {};
    }
}
