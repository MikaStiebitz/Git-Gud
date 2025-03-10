import type { FileStatus, GitStatus } from "../types";
import { type FileSystem } from "~/models/FileSystem";

export class GitRepository {
    private initialized = false;
    private branches: string[] = ["main"];
    private currentBranch = "main";
    private HEAD = "main";
    private status: GitStatus = {};
    private commits: Record<string, { message: string; timestamp: Date; files: string[] }> = {};
    private stash: Array<{ message: string; timestamp: Date; changes: Record<string, string> }> = [];
    private remotes: Record<string, string> = {};
    private fileSystem: FileSystem;
    private pushedCommits: Set<string> = new Set(); // Track which commits have been pushed

    constructor(fileSystem: FileSystem) {
        this.fileSystem = fileSystem;
        this.initialized = false;
    }

    public partialReset(): void {
        // Keep initialized state, but reset other properties
        this.initialized = true;
        this.branches = ["main"];
        this.currentBranch = "main";
        this.HEAD = "main";
        this.status = {};
        this.commits = {};
        this.stash = [];
        this.pushedCommits = new Set();
    }

    // Initialize a new Git repository
    public init(): boolean {
        if (this.initialized) return false;

        // Create .git directory structure in the file system
        this.fileSystem.mkdir("/.git");
        this.fileSystem.mkdir("/.git/objects");
        this.fileSystem.mkdir("/.git/refs");
        this.fileSystem.mkdir("/.git/refs/heads");

        // Create basic git files
        this.fileSystem.writeFile("/.git/HEAD", "ref: refs/heads/main");
        this.fileSystem.writeFile(
            "/.git/config",
            "[core]\n\trepositoryformatversion = 0\n\tfilemode = true\n\tbare = false\n",
        );

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

        // Commits are not automatically pushed
        // We don't add the commit to pushedCommits

        return commitId;
    }

    // Get all commits
    public getCommits(): Record<string, { message: string; timestamp: Date; files: string[] }> {
        return { ...this.commits };
    }

    // Check if there are unpushed commits
    public hasUnpushedCommits(): boolean {
        return Object.keys(this.commits).some(id => !this.pushedCommits.has(id));
    }

    // Create a new branch
    public createBranch(name: string): boolean {
        if (!this.initialized || this.branches.includes(name)) return false;
        this.branches.push(name);
        return true;
    }

    // Delete a branch
    public deleteBranch(name: string): boolean {
        if (!this.initialized || !this.branches.includes(name) || name === this.currentBranch) return false;

        const index = this.branches.indexOf(name);
        if (index > -1) {
            this.branches.splice(index, 1);
            return true;
        }
        return false;
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

    // Save changes to stash
    public stashSave(message: string = "WIP on " + this.currentBranch): boolean {
        if (!this.initialized) return false;

        // Simplified stashing - we don't actually save file contents
        this.stash.push({
            message,
            timestamp: new Date(),
            changes: {}, // In a real implementation, we would save actual changes
        });

        // Clear modified files after stashing
        Object.keys(this.status).forEach(file => {
            if (this.status[file] === "modified" || this.status[file] === "untracked") {
                delete this.status[file];
            }
        });

        return true;
    }

    // Apply and optionally pop the most recent stash
    public stashApply(pop = false): boolean {
        if (!this.initialized || this.stash.length === 0) return false;

        // Simplified stash apply - we don't actually restore file contents
        // In a real implementation, we would restore the saved changes

        if (pop) {
            this.stash.pop(); // Remove the stash if popping
        }

        return true;
    }

    // Get stash list
    public getStash(): Array<{ message: string; timestamp: Date }> {
        return this.stash.map(stash => ({
            message: stash.message,
            timestamp: stash.timestamp,
        }));
    }

    // Add a remote repository
    public addRemote(name: string, url: string): boolean {
        if (!this.initialized) return false;

        if (this.remotes[name]) {
            return false; // Remote with this name already exists
        }

        this.remotes[name] = url;
        return true;
    }

    // Get all remotes
    public getRemotes(): Record<string, string> {
        return { ...this.remotes };
    }

    // Push to a remote (simulated)
    public push(remote: string, branch: string): boolean {
        if (!this.initialized) return false;

        // Check if remote exists
        if (!this.remotes[remote]) {
            // If no remotes exist but pushing to origin, create a default remote
            if (remote === "origin" && Object.keys(this.remotes).length === 0) {
                this.remotes[remote] = "https://github.com/user/repo.git";
            } else {
                return false;
            }
        }

        // Check if branch exists
        if (!this.branches.includes(branch)) {
            return false;
        }

        // Find unpushed commits
        const unpushedCommits = Object.keys(this.commits).filter(id => !this.pushedCommits.has(id));

        // If no unpushed commits, nothing to do
        if (unpushedCommits.length === 0) {
            return true; // Success, but nothing to push
        }

        // Mark all commits as pushed
        for (const commitId of unpushedCommits) {
            this.pushedCommits.add(commitId);
        }

        return true;
    }

    // Pull from a remote (simulated)
    public pull(remote: string, branch: string): boolean {
        if (!this.initialized) return false;

        // Check if remote exists
        if (!this.remotes[remote]) {
            return false;
        }

        // Check if branch exists
        if (!this.branches.includes(branch)) {
            return false;
        }

        // In a real implementation, we would actually pull the changes
        // For the learning game, we'll just return true
        return true;
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
        this.stash = [];
        this.pushedCommits = new Set();
    }
}
