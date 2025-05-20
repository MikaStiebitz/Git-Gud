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
    private pushedCommits: Set<string> = new Set<string>();

    // NEW: Branch-specific states
    private branchStates: Record<
        string,
        {
            files: Record<string, string>; // file path -> content
            status: GitStatus; // file statuses for this branch
            commits: string[]; // commit IDs for this branch
        }
    > = {};

    constructor(fileSystem: FileSystem) {
        this.fileSystem = fileSystem;
        this.initialized = false;

        // Initialize main branch state
        this.branchStates.main = {
            files: {},
            status: {},
            commits: [],
        };
    }

    public partialReset(): void {
        this.initialized = true;
        this.branches = ["main"];
        this.currentBranch = "main";
        this.HEAD = "main";
        this.status = {};
        this.commits = {};
        this.stash = [];
        this.pushedCommits = new Set();
        this.branchStates = {
            main: { files: {}, status: {}, commits: [] },
        };
    }

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

    public isInitialized(): boolean {
        return this.initialized;
    }

    public addFile(path: string): boolean {
        if (!this.initialized) return false;

        const normalizedPath = path.startsWith("/") ? path.substring(1) : path;
        this.status[normalizedPath] = "staged";

        // Also update current branch state
        const currentBranchState = this.branchStates[this.currentBranch];
        if (currentBranchState) {
            currentBranchState.status[normalizedPath] = "staged";
        }

        return true;
    }

    public addAll(files: string[]): string[] {
        if (!this.initialized) return [];

        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return [];

        const stagedFiles: string[] = [];
        for (const file of files) {
            this.status[file] = "staged";
            currentBranchState.status[file] = "staged";
            stagedFiles.push(file);
        }
        return stagedFiles;
    }

    public commit(message: string): string | null {
        if (!this.initialized) return null;

        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return null;

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
            currentBranchState.status[file] = "committed";

            // Save file content to branch state
            const content = this.fileSystem.getFileContents(file);
            if (content !== null) {
                currentBranchState.files[file] = content;
            }
        }

        // Add commit to current branch
        currentBranchState.commits.push(commitId);

        return commitId;
    }

    public getCommits(): Record<string, { message: string; timestamp: Date; files: string[] }> {
        return { ...this.commits };
    }

    public hasUnpushedCommits(): boolean {
        return Object.keys(this.commits).some(id => !this.pushedCommits.has(id));
    }

    public getUnpushedCommitCount(): number {
        return Object.keys(this.commits).filter(id => !this.pushedCommits.has(id)).length;
    }

    public createBranch(name: string): boolean {
        if (!this.initialized || this.branches.includes(name)) return false;

        this.branches.push(name);

        // Initialize new branch state as copy of current branch
        const currentBranchState = this.branchStates[this.currentBranch];
        if (currentBranchState) {
            this.branchStates[name] = {
                files: { ...currentBranchState.files },
                status: { ...currentBranchState.status },
                commits: [...currentBranchState.commits],
            };
        } else {
            // Fallback if current branch state doesn't exist
            this.branchStates[name] = {
                files: {},
                status: {},
                commits: [],
            };
        }

        return true;
    }

    public deleteBranch(name: string): boolean {
        if (!this.initialized || !this.branches.includes(name) || name === this.currentBranch) return false;

        const index = this.branches.indexOf(name);
        if (index > -1) {
            this.branches.splice(index, 1);
            delete this.branchStates[name];
            return true;
        }
        return false;
    }

    // NEW: Enhanced checkout with proper branch switching
    public checkout(branch: string, createNew = false): { success: boolean; warnings?: string[] } {
        if (!this.initialized) return { success: false };

        const cleanBranchName = branch.replace(/^["'](.*)["']$/, "$1");

        if (createNew) {
            if (!this.createBranch(cleanBranchName)) {
                return { success: false };
            }
        } else if (!this.branches.includes(cleanBranchName)) {
            return { success: false };
        }

        // Check for uncommitted changes
        const warnings = this.checkForUncommittedChanges();

        // Save current working tree state
        this.saveWorkingTreeToBranch();

        // Switch to new branch
        const oldBranch = this.currentBranch;
        this.currentBranch = cleanBranchName;
        this.HEAD = cleanBranchName;

        // Restore working tree for new branch
        this.restoreWorkingTreeFromBranch();

        // Update global status to match new branch
        const newBranchState = this.branchStates[cleanBranchName];
        if (newBranchState) {
            this.status = { ...newBranchState.status };
        } else {
            this.status = {};
        }

        return { success: true, warnings };
    }

    private checkForUncommittedChanges(): string[] {
        const warnings: string[] = [];
        const hasModified = Object.values(this.status).some(s => s === "modified");
        const hasStaged = Object.values(this.status).some(s => s === "staged");

        if (hasModified || hasStaged) {
            warnings.push("Warning: you have uncommitted changes.");
            if (hasStaged) {
                warnings.push("Your staged changes will be kept.");
            }
        }

        return warnings;
    }

    private saveWorkingTreeToBranch(): void {
        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return;

        // Save all tracked files to current branch state
        Object.keys(this.status).forEach(file => {
            const status = this.status[file];
            if (status === "committed" || status === "staged" || status === "modified") {
                const content = this.fileSystem.getFileContents(file);
                if (content !== null) {
                    currentBranchState.files[file] = content;
                }
            }
        });

        // Update branch status
        currentBranchState.status = { ...this.status };
    }

    private restoreWorkingTreeFromBranch(): void {
        const newBranchState = this.branchStates[this.currentBranch];
        if (!newBranchState) return;

        // Clear working tree of tracked files from previous branch
        const previousBranch = this.getPreviousBranch();
        const oldBranchState = previousBranch ? this.branchStates[previousBranch] : null;

        if (oldBranchState?.files) {
            Object.keys(oldBranchState.files).forEach(file => {
                // Only remove if file doesn't exist in new branch
                if (!newBranchState.files[file]) {
                    this.fileSystem.delete(file);
                }
            });
        }

        // Restore files for new branch
        Object.entries(newBranchState.files).forEach(([file, content]) => {
            this.fileSystem.writeFile(file, content);
        });
    }

    private getPreviousBranch(): string | null {
        // This is a simplified approach - in real Git, there would be a previous branch tracking
        const otherBranch = this.branches.find(b => b !== this.currentBranch);
        return otherBranch ?? null;
    }

    public merge(branch: string): boolean {
        if (!this.initialized || !this.branches.includes(branch) || branch === this.currentBranch) {
            return false;
        }
        return true;
    }

    public getCurrentBranch(): string {
        return this.currentBranch;
    }

    public getBranches(): string[] {
        return [...this.branches];
    }

    public updateFileStatus(path: string, status: FileStatus): void {
        const normalizedPath = path.startsWith("/") ? path.substring(1) : path;
        this.status[normalizedPath] = status;

        const currentBranchState = this.branchStates[this.currentBranch];
        if (currentBranchState) {
            currentBranchState.status[normalizedPath] = status;
        }
    }

    public getStatus(): GitStatus {
        return { ...this.status };
    }

    public stashSave(message: string = "WIP on " + this.currentBranch): boolean {
        if (!this.initialized) return false;

        this.stash.push({
            message,
            timestamp: new Date(),
            changes: {},
        });

        Object.keys(this.status).forEach(file => {
            if (this.status[file] === "modified" || this.status[file] === "untracked") {
                delete this.status[file];
            }
        });

        return true;
    }

    public stashApply(pop = false): boolean {
        if (!this.initialized || this.stash.length === 0) return false;

        if (pop) {
            this.stash.pop();
        }

        return true;
    }

    public getStash(): Array<{ message: string; timestamp: Date }> {
        return this.stash.map(stash => ({
            message: stash.message,
            timestamp: stash.timestamp,
        }));
    }

    public addRemote(name: string, url: string): boolean {
        if (!this.initialized) return false;
        this.remotes[name] = url;
        return true;
    }

    public getRemotes(): Record<string, string> {
        return { ...this.remotes };
    }

    public push(remote: string, branch: string): boolean {
        if (!this.initialized) return false;

        if (!this.remotes[remote]) {
            if (remote === "origin" && Object.keys(this.remotes).length === 0) {
                this.remotes[remote] = "https://github.com/user/repo.git";
            } else {
                return false;
            }
        }

        if (!this.branches.includes(branch)) {
            return false;
        }

        const unpushedCommits = Object.keys(this.commits).filter(id => !this.pushedCommits.has(id));

        if (unpushedCommits.length === 0) {
            return true;
        }

        for (const commitId of unpushedCommits) {
            this.pushedCommits.add(commitId);
        }

        return true;
    }

    public pull(remote: string, branch: string): boolean {
        if (!this.initialized) return false;

        if (!this.remotes[remote]) {
            return false;
        }

        if (!this.branches.includes(branch)) {
            return false;
        }

        return true;
    }

    private generateCommitId(): string {
        return Math.random().toString(16).substring(2, 10);
    }

    public reset(): void {
        this.initialized = false;
        this.branches = ["main"];
        this.currentBranch = "main";
        this.HEAD = "main";
        this.status = {};
        this.commits = {};
        this.stash = [];
        this.pushedCommits = new Set();
        this.branchStates = {
            main: { files: {}, status: {}, commits: [] },
        };
    }
}
