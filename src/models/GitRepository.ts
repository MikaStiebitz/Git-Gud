import type { FileStatus, GitStatus } from "../types";
import { type FileSystem } from "~/models/FileSystem";

export class GitRepository {
    private initialized = false;
    private repositoryRoot: string | null = null; // NEW: Track where repo was initialized
    private branches: string[] = ["main"];
    private currentBranch = "main";
    private HEAD = "main";
    private status: GitStatus = {};
    private commits: Record<string, { message: string; timestamp: Date; files: string[]; parents: string[]; isMergeCommit?: boolean }> = {};
    private remoteCommits: Record<string, Array<{
        id: string;
        message: string;
        timestamp: Date;
        files: string[];
        fileContents: Record<string, string>; // Store file contents for pull
    }>> = {}; // Mock remote commits per branch
    private stash: Array<{ message: string; timestamp: Date; changes: Record<string, string> }> = [];
    private remotes: Record<string, string> = {};
    private fileSystem: FileSystem;
    private pushedCommits: Set<string> = new Set<string>();
    private upstreamBranches: Record<string, { remote: string; branch: string }> = {}; // Track upstream branches
    private tags: Map<string, string> = new Map(); // tagName -> commitHash
    private pushedTags: Set<string> = new Set<string>(); // Track which tags have been pushed
    private reflog: Array<{
        commitHash: string;
        action: string;
        message: string;
        timestamp: Date;
        index: number;
    }> = [];

    // Track merge conflict state
    private mergeConflictState: {
        sourceBranch: string;
        conflictFiles: string[];
    } | null = null;

    // Enhanced branch-specific states
    private branchStates: Record<
        string,
        {
            files: Record<string, string>; // file path -> content
            status: GitStatus; // file statuses for this branch
            commits: string[]; // commit IDs for this branch
            workingDirectory: Record<string, string>; // working directory files
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
            workingDirectory: {},
        };
    }

    // NEW: Check if a directory is within this repository
    public isInRepository(currentDirectory: string): boolean {
        if (!this.initialized) return false;

        // Check if .git directory exists in current or parent directories
        let checkDir = this.normalizePath(currentDirectory);

        while (true) {
            const gitPath = checkDir === '/' ? '/.git' : `${checkDir}/.git`;
            const gitDir = this.fileSystem.getDirectoryContents(gitPath);
            if (gitDir !== null) {
                // Found .git directory
                // Check if this matches our repository root
                return this.repositoryRoot === checkDir;
            }

            // Move to parent directory
            if (checkDir === '/') break;
            checkDir = this.getParentPath(checkDir);
        }

        return false;
    }

    // NEW: Get repository root
    public getRepositoryRoot(): string | null {
        return this.repositoryRoot;
    }

    private normalizePath(path: string): string {
        if (path !== '/' && path.endsWith('/')) {
            return path.slice(0, -1);
        }
        return path || '/';
    }

    private getParentPath(path: string): string {
        if (path === '/') return '/';
        const parts = path.split('/').filter(p => p);
        if (parts.length === 0) return '/';
        parts.pop();
        return parts.length === 0 ? '/' : '/' + parts.join('/');
    }

    public partialReset(): void {
        this.initialized = true;
        this.repositoryRoot = null; // Reset repository root
        this.branches = ["main"];
        this.currentBranch = "main";
        this.HEAD = "main";
        this.status = {};
        this.commits = {};
        this.stash = [];
        this.pushedCommits = new Set();
        this.branchStates = {
            main: { files: {}, status: {}, commits: [], workingDirectory: {} },
        };
    }

    public init(currentDirectory: string = '/'): boolean {
        const normalizedDir = this.normalizePath(currentDirectory);

        // If already initialized in this exact directory, reinitialize
        if (this.initialized && this.repositoryRoot === normalizedDir) {
            // Create .git directory structure in the file system
            this.fileSystem.mkdir(`${normalizedDir}/.git`);
            this.fileSystem.mkdir(`${normalizedDir}/.git/objects`);
            this.fileSystem.mkdir(`${normalizedDir}/.git/refs`);
            this.fileSystem.mkdir(`${normalizedDir}/.git/refs/heads`);

            // Create basic git files
            this.fileSystem.writeFile(`${normalizedDir}/.git/HEAD`, "ref: refs/heads/main");
            this.fileSystem.writeFile(
                `${normalizedDir}/.git/config`,
                "[core]\n\trepositoryformatversion = 0\n\tfilemode = true\n\tbare = false\n",
            );
            return true; // Reinitialize success
        }

        // If initialized in a different directory, we can't init here (single repo limitation)
        if (this.initialized && this.repositoryRoot !== normalizedDir) {
            return false; // Already initialized elsewhere
        }

        // First initialization
        // Create .git directory structure in the file system
        this.fileSystem.mkdir(`${normalizedDir}/.git`);
        this.fileSystem.mkdir(`${normalizedDir}/.git/objects`);
        this.fileSystem.mkdir(`${normalizedDir}/.git/refs`);
        this.fileSystem.mkdir(`${normalizedDir}/.git/refs/heads`);

        // Create basic git files
        this.fileSystem.writeFile(`${normalizedDir}/.git/HEAD`, "ref: refs/heads/main");
        this.fileSystem.writeFile(
            `${normalizedDir}/.git/config`,
            "[core]\n\trepositoryformatversion = 0\n\tfilemode = true\n\tbare = false\n",
        );

        this.initialized = true;
        this.repositoryRoot = normalizedDir; // Store where we initialized
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

    public commit(message: string, allowEmpty = false): string | null {
        if (!this.initialized) return null;

        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return null;

        const stagedFiles = Object.entries(this.status)
            .filter(([_, status]) => status === "staged")
            .map(([file]) => file);

        // Normally a commit needs staged files; allowEmpty supports branch-marker
        // commits (git commit --allow-empty), used e.g. when setting up level history.
        if (stagedFiles.length === 0 && !allowEmpty) return null;

        const commitId = this.generateCommitId();
        const lastCommitId = currentBranchState.commits[currentBranchState.commits.length - 1];
        this.commits[commitId] = {
            message,
            timestamp: new Date(),
            files: stagedFiles,
            parents: lastCommitId ? [lastCommitId] : [],
        };

        // Update status - move staged files to committed
        for (const file of stagedFiles) {
            this.status[file] = "committed";
            currentBranchState.status[file] = "committed";

            // Save file content to branch state
            const content = this.fileSystem.getFileContents(file);
            if (content !== null) {
                currentBranchState.files[file] = content;
                currentBranchState.workingDirectory[file] = content;
            }
        }

        // Add commit to current branch
        currentBranchState.commits.push(commitId);

        // Add to reflog
        this.addReflogEntry(commitId, "commit", message);

        return commitId;
    }

    public getCommits(): Record<string, { message: string; timestamp: Date; files: string[] }> {
        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return {};

        // Return only commits that belong to the current branch
        const branchCommits: Record<string, { message: string; timestamp: Date; files: string[] }> = {};
        currentBranchState.commits.forEach(commitId => {
            const commit = this.commits[commitId];
            if (commit) {
                branchCommits[commitId] = commit;
            }
        });

        return branchCommits;
    }

    public getAllCommits(): Record<string, { message: string; timestamp: Date; files: string[]; parents: string[]; isMergeCommit?: boolean }> {
        return { ...this.commits };
    }

    public getBranchHeads(): Record<string, string> {
        const heads: Record<string, string> = {};
        for (const [branch, state] of Object.entries(this.branchStates)) {
            const last = state.commits[state.commits.length - 1];
            if (last) heads[branch] = last;
        }
        return heads;
    }

    // Get commits as ordered array (oldest to newest)
    public getCommitHistory(): string[] {
        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return [];

        // Return commits in chronological order (oldest first)
        return [...currentBranchState.commits];
    }

    public hasUnpushedCommits(): boolean {
        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return false;

        return currentBranchState.commits.some(id => !this.pushedCommits.has(id));
    }

    public getUnpushedCommitCount(): number {
        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return 0;

        return currentBranchState.commits.filter(id => !this.pushedCommits.has(id)).length;
    }

    public getUnpulledCommitCount(): number {
        const remoteCommitsForBranch = this.remoteCommits[this.currentBranch] || [];
        return remoteCommitsForBranch.length;
    }

    public getLastCommit(): { id: string; message: string; timestamp: Date; files: string[] } | null {
        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState || currentBranchState.commits.length === 0) return null;

        const lastCommitId = currentBranchState.commits[currentBranchState.commits.length - 1];
        if (!lastCommitId) return null;

        const commitData = this.commits[lastCommitId];
        if (!commitData) return null;

        return {
            id: lastCommitId,
            ...commitData,
        };
    }

    public amendLastCommit(newMessage?: string): string | null {
        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState || currentBranchState.commits.length === 0) {
            return null;
        }

        const lastCommitId = currentBranchState.commits[currentBranchState.commits.length - 1];
        if (!lastCommitId || !this.commits[lastCommitId]) {
            return null;
        }

        // Get currently staged files
        const stagedFiles = Object.entries(this.status)
            .filter(([_, status]) => status === "staged")
            .map(([file]) => file);

        // Update the commit message if provided
        if (newMessage) {
            const commit = this.commits[lastCommitId];
            if (commit) {
                commit.message = newMessage;
            }
        }

        // If there are staged files, add them to the amended commit
        if (stagedFiles.length > 0) {
            // Add staged files to the commit
            const commit = this.commits[lastCommitId];
            if (commit) {
                const existingFiles = new Set(commit.files);

                for (const file of stagedFiles) {
                    if (!existingFiles.has(file)) {
                        commit.files.push(file);
                    }

                    // Update status - move staged files to committed
                    this.status[file] = "committed";
                    currentBranchState.status[file] = "committed";

                    // Save file content to branch state
                    const content = this.fileSystem.getFileContents(file);
                    if (content !== null) {
                        currentBranchState.files[file] = content;
                        currentBranchState.workingDirectory[file] = content;
                    }
                }
            }
        }

        // Update timestamp
        const commit = this.commits[lastCommitId];
        if (commit) {
            commit.timestamp = new Date();
        }

        return lastCommitId;
    }

    public createBranch(name: string): boolean {
        // Validate branch name - Git branch names cannot contain spaces or certain special characters
        if (!this.isValidBranchName(name)) return false;
        if (!this.initialized || this.branches.includes(name)) return false;

        this.branches.push(name);

        // Initialize new branch state as copy of current branch
        const currentBranchState = this.branchStates[this.currentBranch];
        if (currentBranchState) {
            // Get current working directory from file system (not from cached state)
            // This ensures modified files are included in the new branch
            const currentWorkingDir: Record<string, string> = {};
            this.getAllFilesFromFileSystem().forEach(filePath => {
                const content = this.fileSystem.getFileContents(filePath);
                if (content !== null) {
                    const normalizedPath = filePath.startsWith("/") ? filePath.substring(1) : filePath;
                    currentWorkingDir[normalizedPath] = content;
                }
            });

            this.branchStates[name] = {
                files: { ...currentBranchState.files },
                status: { ...currentBranchState.status },
                commits: [...currentBranchState.commits],
                workingDirectory: currentWorkingDir, // Use current file system state
            };
        } else {
            // Fallback if current branch state doesn't exist
            this.branchStates[name] = {
                files: {},
                status: {},
                commits: [],
                workingDirectory: {},
            };
        }

        return true;
    }

    // Validate branch name according to Git rules
    private isValidBranchName(name: string): boolean {
        // Branch name cannot be empty
        if (!name || name.length === 0) return false;
        // Cannot contain spaces
        if (name.includes(" ")) return false;
        // Cannot contain special characters that Git doesn't allow: ~ ^ : [ \ *
        if (/[\s~^:\[\\\*]/.test(name)) return false;
        // Cannot start or end with a dot
        if (name.startsWith(".") || name.endsWith(".")) return false;
        // Cannot be "." or ".."
        if (name === "." || name === "..") return false;
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

    public hasUnmergedCommits(branchName: string, baseBranch?: string): boolean {
        if (!this.initialized) return false;

        const base = baseBranch || this.currentBranch;
        const targetBranchState = this.branchStates[branchName];
        const baseBranchState = this.branchStates[base];

        if (!targetBranchState || !baseBranchState) return false;

        // Check if target branch has commits not in base branch
        const targetCommits = new Set(targetBranchState.commits);
        const baseCommits = new Set(baseBranchState.commits);

        // If target branch has any commit that base branch doesn't have, it's unmerged
        for (const commit of targetCommits) {
            if (!baseCommits.has(commit)) {
                return true; // Has unmerged commits
            }
        }

        return false; // All commits are merged or branch has no unique commits
    }

    // Enhanced checkout with proper branch switching and file system isolation
    public checkout(branch: string, createNew = false): { success: boolean; warnings?: string[] } {
        if (!this.initialized) return { success: false };

        const cleanBranchName = branch.replace(/^["'](.*)["']$/, "$1");

        // When createNew is true, the branch was already created by the caller
        // We just need to verify it exists
        if (!this.branches.includes(cleanBranchName)) {
            return { success: false };
        }

        // Check for uncommitted changes that would be lost
        const warnings = this.checkForUncommittedChanges();
        const hasUncommittedChanges = warnings.length > 0;

        // If switching to an EXISTING branch and there are uncommitted changes, warn and prevent switch
        // When creating a NEW branch (createNew = true), allow uncommitted changes
        if (!createNew && cleanBranchName !== this.currentBranch && hasUncommittedChanges) {
            const hasModified = Object.values(this.status).some(s => s === "modified" || s === "untracked");
            if (hasModified) {
                return {
                    success: false,
                    warnings: [
                        "error: Your local changes to the following files would be overwritten by checkout:",
                        ...Object.keys(this.status)
                            .filter(file => this.status[file] === "modified" || this.status[file] === "untracked")
                            .map(file => `\t${file}`),
                        "Please commit your changes or stash them before you switch branches.",
                        "Aborting",
                    ],
                };
            }
        }

        // Save current working tree state before switching
        this.saveWorkingTreeToBranch();

        // Switch to new branch
        this.currentBranch = cleanBranchName;
        this.HEAD = cleanBranchName;

        // Restore working tree for new branch (this will update the file system)
        this.restoreWorkingTreeFromBranch();

        // Update global status to match new branch
        const newBranchState = this.branchStates[cleanBranchName];
        if (newBranchState) {
            this.status = { ...newBranchState.status };
        } else {
            this.status = {};
        }

        // Add to reflog
        this.addReflogEntry(this.getCurrentCommitHash(), "checkout", `moving to ${cleanBranchName}`);

        return { success: true, warnings: warnings.length > 0 ? warnings : undefined };
    }

    private checkForUncommittedChanges(): string[] {
        const warnings: string[] = [];
        const hasModified = Object.values(this.status).some(s => s === "modified");
        const hasStaged = Object.values(this.status).some(s => s === "staged");
        const hasUntracked = Object.values(this.status).some(s => s === "untracked");

        if (hasModified || hasStaged || hasUntracked) {
            if (hasStaged) {
                warnings.push("Warning: you have staged changes.");
            }
            if (hasModified) {
                warnings.push("Warning: you have modified files.");
            }
            if (hasUntracked) {
                warnings.push("Warning: you have untracked files.");
            }
        }

        return warnings;
    }

    private saveWorkingTreeToBranch(): void {
        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return;

        // Save all files in working directory (including untracked files)
        currentBranchState.workingDirectory = {};

        // Get all files from the file system (excluding .git)
        this.getAllFilesFromFileSystem().forEach(filePath => {
            const content = this.fileSystem.getFileContents(filePath);
            if (content !== null) {
                const normalizedPath = filePath.startsWith("/") ? filePath.substring(1) : filePath;
                currentBranchState.workingDirectory[normalizedPath] = content;
            }
        });

        // Update branch status
        currentBranchState.status = { ...this.status };
    }

    private restoreWorkingTreeFromBranch(): void {
        const newBranchState = this.branchStates[this.currentBranch];
        if (!newBranchState) return;

        // Clear the entire working directory first (except .git)
        this.clearWorkingDirectory();

        // Restore files for new branch
        Object.entries(newBranchState.workingDirectory).forEach(([filePath, content]) => {
            const fullPath = filePath.startsWith("/") ? filePath : `/${filePath}`;
            this.fileSystem.writeFile(fullPath, content);
        });
    }

    private getAllFilesFromFileSystem(): string[] {
        type DirectoryEntry = { type: "file" } | { type: "directory"; children: DirectoryContents };
        type DirectoryContents = Record<string, DirectoryEntry>;

        const files: string[] = [];
        const contents = this.fileSystem.getDirectoryContents("/") as DirectoryContents | undefined;
        if (!contents) return files;

        const traverse = (dirContents: DirectoryContents, currentPath: string) => {
            Object.entries(dirContents).forEach(([name, item]) => {
                if (name === ".git") return; // Skip .git directory

                const fullPath = currentPath === "/" ? `/${name}` : `${currentPath}/${name}`;

                if (item.type === "file") {
                    files.push(fullPath);
                } else if (item.type === "directory" && item.children) {
                    traverse(item.children, fullPath);
                }
            });
        };

        traverse(contents, "/");
        return files;
    }

    private clearWorkingDirectory(): void {
        const contents = this.fileSystem.getDirectoryContents("/");
        if (!contents) return;

        Object.keys(contents).forEach(name => {
            if (name !== ".git") {
                // Don't delete .git directory
                this.fileSystem.delete(`/${name}`);
            }
        });
    }

    public merge(branch: string): {
        success: boolean;
        isFastForward: boolean;
        filesChanged: string[];
        conflictFiles?: string[];
        mergeCommitId?: string;
    } {
        if (!this.initialized || !this.branches.includes(branch) || branch === this.currentBranch) {
            return { success: false, isFastForward: false, filesChanged: [] };
        }

        const currentBranchState = this.branchStates[this.currentBranch];
        const targetBranchState = this.branchStates[branch];

        if (!currentBranchState || !targetBranchState) {
            return { success: false, isFastForward: false, filesChanged: [] };
        }

        // Check if target branch is already merged (up to date)
        const targetCommits = new Set(targetBranchState.commits);
        const currentCommits = new Set(currentBranchState.commits);

        let hasNewCommits = false;
        for (const commit of targetCommits) {
            if (!currentCommits.has(commit)) {
                hasNewCommits = true;
                break;
            }
        }

        if (!hasNewCommits) {
            // Already up to date
            return { success: true, isFastForward: false, filesChanged: [] };
        }

        // Check if we can do a fast-forward merge
        // Fast-forward is possible if current branch is an ancestor of target branch
        const canFastForward = this.isAncestor(currentBranchState.commits, targetBranchState.commits);

        const filesChanged: string[] = [];

        if (canFastForward) {
            // Fast-forward merge: just update current branch to point to target branch
            currentBranchState.commits = [...targetBranchState.commits];
            currentBranchState.files = { ...targetBranchState.files };

            // Update working directory with target branch files
            Object.entries(targetBranchState.files).forEach(([filePath, content]) => {
                const fullPath = filePath.startsWith("/") ? filePath : `/${filePath}`;
                this.fileSystem.writeFile(fullPath, content);
                filesChanged.push(filePath);
            });

            // Clear status after fast-forward
            currentBranchState.status = {};
            this.status = {};

            return { success: true, isFastForward: true, filesChanged };
        }

        // Regular merge (create merge commit)
        // Detect conflicts and merge target branch files into current branch
        const conflictFiles: string[] = [];
        
        Object.entries(targetBranchState.files).forEach(([filePath, content]) => {
            const fullPath = filePath.startsWith("/") ? filePath : `/${filePath}`;

            // Check if file exists in current branch with different content
            const currentContent = currentBranchState.files[filePath];

            if (currentContent === undefined) {
                // New file from target branch
                currentBranchState.files[filePath] = content;
                this.fileSystem.writeFile(fullPath, content);
                filesChanged.push(filePath);
            } else if (currentContent !== content) {
                // File exists but differs in both branches - CONFLICT
                conflictFiles.push(filePath);
                filesChanged.push(filePath);
                
                // Mark file as modified with both versions
                this.status[filePath] = "modified";
                currentBranchState.status[filePath] = "modified";
                
                // Write conflict markers to working directory
                const conflictContent = 
                    `<<<<<<< HEAD\n${currentContent}\n=======\n${content}\n>>>>>>> ${branch}`;
                this.fileSystem.writeFile(fullPath, conflictContent);
            }
        });

        // If there are conflicts, return conflict state without creating merge commit
        if (conflictFiles.length > 0) {
            // Store current merge state for conflict resolution
            this.mergeConflictState = {
                sourceBranch: branch,
                conflictFiles: conflictFiles,
            };
            
            return { 
                success: false, 
                isFastForward: false, 
                filesChanged,
                conflictFiles,
            };
        }

        // Merge commits from target branch
        targetBranchState.commits.forEach(commitId => {
            if (!currentCommits.has(commitId)) {
                currentBranchState.commits.push(commitId);
            }
        });

        // Create a merge commit
        const mergeCommitId = this.generateCommitId();
        const mergeCommitMessage = `Merge branch '${branch}' into ${this.currentBranch}`;

        const currentHead = currentBranchState.commits[currentBranchState.commits.length - 1];
        const targetHead = targetBranchState.commits[targetBranchState.commits.length - 1];
        this.commits[mergeCommitId] = {
            message: mergeCommitMessage,
            timestamp: new Date(),
            files: filesChanged,
            parents: [currentHead, targetHead].filter(Boolean) as string[],
            isMergeCommit: true,
        };

        currentBranchState.commits.push(mergeCommitId);

        // Add to reflog
        this.addReflogEntry(mergeCommitId, "merge", `Merge branch '${branch}' into ${this.currentBranch}`);

        // Update working directory
        currentBranchState.workingDirectory = { ...currentBranchState.files };

        // Clear status after merge
        currentBranchState.status = {};
        this.status = {};

        return {
            success: true,
            isFastForward: false,
            filesChanged,
            mergeCommitId
        };
    }

    private isAncestor(currentCommits: string[], targetCommits: string[]): boolean {
        // Check if all commits in current branch exist in target branch
        // AND target has more commits
        if (targetCommits.length <= currentCommits.length) {
            return false;
        }

        // Check if current commits are a prefix of target commits
        for (let i = 0; i < currentCommits.length; i++) {
            if (currentCommits[i] !== targetCommits[i]) {
                return false;
            }
        }

        return true;
    }

    private generateCommitId(): string {
        return Math.random().toString(16).substring(2, 9);
    }

    public getCurrentBranch(): string {
        return this.currentBranch;
    }

    public getCurrentCommitHash(): string {
        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState || currentBranchState.commits.length === 0) {
            return "0000000"; // Default hash when no commits
        }
        const lastCommit = currentBranchState.commits[currentBranchState.commits.length - 1];
        return lastCommit || "0000000";
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

    public isFileTracked(path: string): boolean {
        const normalizedPath = path.startsWith("/") ? path.substring(1) : path;

        // Check if file exists in current status (any status except "untracked")
        if (normalizedPath in this.status) {
            const fileStatus = this.status[normalizedPath];
            return fileStatus !== "untracked";
        }

        // Check if file exists in committed files for current branch
        const currentBranchState = this.branchStates[this.currentBranch];
        if (currentBranchState && normalizedPath in currentBranchState.files) {
            return true;
        }

        return false;
    }

    public getStatus(): GitStatus {
        return { ...this.status };
    }

    public getCommittedFileContent(path: string): string | null {
        const normalizedPath = path.startsWith("/") ? path.substring(1) : path;
        const currentBranchState = this.branchStates[this.currentBranch];

        if (!currentBranchState) return null;

        return currentBranchState.files[normalizedPath] ?? null;
    }

    public stashSave(message: string = "WIP on " + this.currentBranch): boolean {
        if (!this.initialized) return false;

        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return false;

        // Capture all current changes from filesystem
        const changes: Record<string, string> = {};
        let hasChanges = false;

        // Check all files with a status (staged, modified, etc.)
        Object.keys(currentBranchState.status).forEach(file => {
            const fileStatus = currentBranchState.status[file];

            // Get current file content from filesystem
            const currentContent = this.fileSystem.getFileContents("/" + file);

            if (fileStatus === "modified" || fileStatus === "staged") {
                // Save the current content
                changes[file] = currentContent ?? "";
                hasChanges = true;
            }
        });

        // If no changes to stash, return false
        if (!hasChanges) return false;

        // Save the stash entry with actual file contents
        this.stash.push({
            message,
            timestamp: new Date(),
            changes,
        });

        // Revert files to their committed state in the filesystem
        Object.keys(changes).forEach(file => {
            const committedContent = currentBranchState.files[file];
            if (committedContent !== undefined) {
                // Restore to committed content
                this.fileSystem.writeFile("/" + file, committedContent);
                currentBranchState.workingDirectory[file] = committedContent;
            } else {
                // File doesn't exist in committed state, delete it
                this.fileSystem.delete("/" + file);
                delete currentBranchState.workingDirectory[file];
            }
        });

        // Clear status for stashed files (both global and branch-specific)
        Object.keys(changes).forEach(file => {
            delete this.status[file];
            delete currentBranchState.status[file];
        });

        return true;
    }

    public stashApply(pop = false): { success: boolean; files: string[] } {
        if (!this.initialized || this.stash.length === 0) {
            return { success: false, files: [] };
        }

        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return { success: false, files: [] };

        // Get the most recent stash
        const stashEntry = this.stash[this.stash.length - 1];
        if (!stashEntry) return { success: false, files: [] };

        const restoredFiles: string[] = [];

        // Restore the stashed changes to filesystem and working directory
        Object.entries(stashEntry.changes).forEach(([file, content]) => {
            // Write to filesystem
            this.fileSystem.writeFile("/" + file, content);
            // Update working directory state
            currentBranchState.workingDirectory[file] = content;
            // Mark as modified (both global and branch-specific)
            this.status[file] = "modified";
            currentBranchState.status[file] = "modified";
            restoredFiles.push(file);
        });

        // Remove from stash if pop (not just apply)
        if (pop) {
            this.stash.pop();
        }

        return { success: true, files: restoredFiles };
    }

    public getStash(): Array<{ message: string; timestamp: Date }> {
        return this.stash.map(stash => ({
            message: stash.message,
            timestamp: stash.timestamp,
        }));
    }

    public addRemote(name: string, url: string): boolean {
        if (!this.initialized) return false;
        // Don't allow duplicate remotes
        if (this.remotes[name]) return false;
        this.remotes[name] = url;

        // Set upstream for main branch when adding origin remote
        if (name === "origin" && this.branches.includes("main") && !this.upstreamBranches["main"]) {
            this.upstreamBranches["main"] = { remote: "origin", branch: "main" };
        }

        return true;
    }

    public removeRemote(name: string): boolean {
        if (!this.initialized) return false;
        if (!this.remotes[name]) return false;
        delete this.remotes[name];
        return true;
    }

    public getRemotes(): Record<string, string> {
        return { ...this.remotes };
    }

    public push(remote: string, branch: string, setUpstream = false): boolean {
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

        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return false;

        const unpushedCommits = currentBranchState.commits.filter(id => !this.pushedCommits.has(id));

        if (unpushedCommits.length === 0) {
            return true;
        }

        for (const commitId of unpushedCommits) {
            this.pushedCommits.add(commitId);
        }

        // Set upstream tracking only if explicitly requested with -u or --set-upstream flag
        // Do not auto-set upstream on regular push (respects Git semantics)
        if (setUpstream) {
            this.upstreamBranches[branch] = { remote, branch };
        }

        return true;
    }

    public hasUpstreamBranch(branch: string): boolean {
        return !!this.upstreamBranches[branch];
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

    // New method for git reset functionality
    public resetToCommit(commitId: string, mode: "soft" | "mixed" | "hard"): boolean {
        if (!this.initialized) return false;

        const currentBranchState = this.branchStates[this.currentBranch];
        if (!currentBranchState) return false;

        // Find the index of the target commit in the current branch
        const targetIndex = currentBranchState.commits.indexOf(commitId);
        if (targetIndex === -1) {
            return false; // Commit not found in current branch
        }

        // Remove commits after the target commit
        const removedCommits = currentBranchState.commits.slice(targetIndex + 1);
        currentBranchState.commits = currentBranchState.commits.slice(0, targetIndex + 1);

        switch (mode) {
            case "hard":
                // Reset working directory, staging area, and HEAD
                // First, collect all files that should exist after reset
                const targetCommitFiles = new Set<string>();
                const targetCommit = this.commits[commitId];
                if (targetCommit) {
                    targetCommit.files.forEach(filePath => targetCommitFiles.add(filePath));
                }

                // Delete files that don't exist in target commit
                Object.keys(currentBranchState.workingDirectory).forEach(filePath => {
                    if (!targetCommitFiles.has(filePath)) {
                        this.fileSystem.delete(`/${filePath}`);
                        delete currentBranchState.workingDirectory[filePath];
                        delete this.status[filePath];
                        delete currentBranchState.status[filePath];
                    }
                });

                // Clear all status
                this.status = {};
                currentBranchState.status = {};

                // Restore files from the target commit
                if (targetCommit) {
                    targetCommit.files.forEach(filePath => {
                        const content = currentBranchState.files[filePath];
                        if (content !== undefined) {
                            this.fileSystem.writeFile(`/${filePath}`, content);
                            currentBranchState.workingDirectory[filePath] = content;
                            this.status[filePath] = "committed";
                            currentBranchState.status[filePath] = "committed";
                        }
                    });
                }
                break;

            case "mixed":
                // Reset staging area and HEAD, keep working directory
                // Files from removed commits should appear as modified
                removedCommits.forEach(removedCommitId => {
                    const removedCommit = this.commits[removedCommitId];
                    if (removedCommit) {
                        removedCommit.files.forEach(filePath => {
                            // Get the content of the file from the branch state
                            const fileContent = currentBranchState.files[filePath];

                            // Mark files from removed commits as modified
                            this.status[filePath] = "modified";
                            currentBranchState.status[filePath] = "modified";

                            // Make sure the file exists in the working directory
                            if (fileContent !== undefined) {
                                this.fileSystem.writeFile(`/${filePath}`, fileContent);
                                currentBranchState.workingDirectory[filePath] = fileContent;
                            }
                        });
                    }
                });

                // Also unstage any currently staged files
                Object.keys(this.status).forEach(file => {
                    if (this.status[file] === "staged" || this.status[file] === "staged+modified") {
                        this.status[file] = "modified";
                        currentBranchState.status[file] = "modified";
                    }
                });
                break;

            case "soft":
                // Only reset HEAD (commits), keep staging area and working directory
                // The files from removed commits should now appear as staged
                removedCommits.forEach(removedCommitId => {
                    const removedCommit = this.commits[removedCommitId];
                    if (removedCommit) {
                        removedCommit.files.forEach(filePath => {
                            // Get the content of the file from the branch state
                            const fileContent = currentBranchState.files[filePath];

                            // Mark files from removed commits as staged and restore content
                            this.status[filePath] = "staged";
                            currentBranchState.status[filePath] = "staged";

                            // Make sure the file exists in the working directory
                            if (fileContent !== undefined) {
                                this.fileSystem.writeFile(`/${filePath}`, fileContent);
                                currentBranchState.workingDirectory[filePath] = fileContent;
                            }
                        });
                    }
                });
                break;
        }

        // Add to reflog
        this.addReflogEntry(commitId, "reset", `reset: moving to ${commitId.substring(0, 7)}`);

        return true;
    }

    public reset(): void {
        this.initialized = false;
        this.branches = ["main"];
        this.currentBranch = "main";
        this.HEAD = "main";
        this.status = {};
        this.commits = {};
        this.remoteCommits = {};
        this.remotes = {};
        this.stash = [];
        this.pushedCommits = new Set();
        this.upstreamBranches = {};
        this.mergeConflictState = null;  // Clear merge conflict state
        this.branchStates = {
            main: { files: {}, status: {}, commits: [], workingDirectory: {} },
        };
    }

    // Check if there are unresolved merge conflicts
    public hasMergeConflicts(): boolean {
        return this.mergeConflictState !== null;
    }

    // Get current merge conflict state
    public getMergeConflictState(): { sourceBranch: string; conflictFiles: string[] } | null {
        return this.mergeConflictState;
    }

    // Clear merge conflict state (after conflicts are resolved)
    public clearMergeConflicts(): void {
        this.mergeConflictState = null;
    }

    // Mock remote commits for pull simulation
    public setRemoteCommits(branch: string, commits: Array<{ id: string; message: string; files: Record<string, string> }>): void {
        this.remoteCommits[branch] = commits.map(commit => ({
            id: commit.id,
            message: commit.message,
            timestamp: new Date(),
            files: Object.keys(commit.files),
            fileContents: commit.files
        }));
    }

    public getRemoteCommits(branch: string): Array<{ id: string; message: string; timestamp: Date; files: string[]; fileContents: Record<string, string> }> {
        return this.remoteCommits[branch] || [];
    }

    public pullRemoteCommits(remote: string, branch: string): { success: boolean; pulledCommits: number; output: string[] } {
        const remoteUrl = this.remotes[remote];
        if (!remoteUrl) {
            return {
                success: false,
                pulledCommits: 0,
                output: [`error: No such remote: '${remote}'`]
            };
        }

        const remoteCommitsForBranch = this.remoteCommits[branch] || [];

        if (remoteCommitsForBranch.length === 0) {
            return {
                success: true,
                pulledCommits: 0,
                output: [
                    `From ${remoteUrl}`,
                    ` * branch            ${branch} -> FETCH_HEAD`,
                    "Already up to date."
                ]
            };
        }

        // Apply each remote commit
        const output: string[] = [
            `From ${remoteUrl}`,
            ` * branch            ${branch} -> FETCH_HEAD`
        ];

        let pulledCount = 0;
        const conflictedFiles: string[] = [];

        for (const remoteCommit of remoteCommitsForBranch) {
            // Add commit to local history
            const prevCommitId = this.branchStates[this.currentBranch]?.commits.slice(-1)[0];
            this.commits[remoteCommit.id] = {
                message: remoteCommit.message,
                timestamp: remoteCommit.timestamp,
                files: remoteCommit.files,
                parents: prevCommitId ? [prevCommitId] : [],
            };

            // Mark pulled commit as already pushed (it came from remote)
            this.pushedCommits.add(remoteCommit.id);

            // Update file contents in filesystem - check for conflicts
            for (const [filePath, remoteContent] of Object.entries(remoteCommit.fileContents)) {
                // Normalize path for consistent lookup
                const normalizedPath = filePath.startsWith("/") ? filePath.substring(1) : filePath;

                const localContent = this.fileSystem.getFileContents(filePath);
                const committedContent = this.branchStates[this.currentBranch]?.files[normalizedPath];
                const fileStatus = this.branchStates[this.currentBranch]?.status[normalizedPath];

                // Determine what content we should compare against remote
                // If file is modified/staged locally, use local content
                // Otherwise use committed content
                const isModifiedLocally = fileStatus === "modified" || fileStatus === "staged";
                const currentContent = isModifiedLocally && localContent !== null
                    ? localContent
                    : committedContent;

                // Conflict detection:
                // 1. File exists locally (either committed or modified)
                // 2. Remote content differs from current local state
                const hasLocalVersion = currentContent !== undefined;
                const contentsDiffer = currentContent !== remoteContent;

                // Merge conflict: both local AND remote modified the same file differently
                if (hasLocalVersion && contentsDiffer) {
                    // Create conflict markers using the current local content
                    const conflictContent = `<<<<<<< HEAD
${currentContent}
=======
${remoteContent}
>>>>>>> ${remoteCommit.id.slice(0, 7)} (${remoteCommit.message})`;

                    this.fileSystem.writeFile(filePath, conflictContent);
                    conflictedFiles.push(filePath);

                    // Mark as conflicted in status
                    if (!this.branchStates[this.currentBranch]) {
                        this.branchStates[this.currentBranch] = {
                            files: {},
                            status: {},
                            commits: [],
                            workingDirectory: {}
                        };
                    }
                    this.branchStates[this.currentBranch]!.status[normalizedPath] = "modified";
                } else {
                    // No conflict: just apply remote changes
                    this.fileSystem.writeFile(filePath, remoteContent);

                    if (!this.branchStates[this.currentBranch]) {
                        this.branchStates[this.currentBranch] = {
                            files: {},
                            status: {},
                            commits: [],
                            workingDirectory: {}
                        };
                    }
                    this.branchStates[this.currentBranch]!.files[normalizedPath] = remoteContent;
                    this.branchStates[this.currentBranch]!.workingDirectory[normalizedPath] = remoteContent;

                    // Remove from status (file is now clean/committed)
                    delete this.branchStates[this.currentBranch]!.status[normalizedPath];
                }
            }

            // Update branch state
            this.branchStates[this.currentBranch]!.commits.push(remoteCommit.id);
            pulledCount++;
        }

        // Clear remote commits after pulling
        this.remoteCommits[branch] = [];

        // Build output messages
        if (conflictedFiles.length > 0) {
            // Merge conflict occurred
            output.push(`Updating ${this.HEAD}..${remoteCommitsForBranch[remoteCommitsForBranch.length - 1]?.id.slice(0, 7)}`);
            output.push(""); // Empty line for readability
            output.push("⚠️  CONFLICT (content): Merge conflict in the following files:");
            conflictedFiles.forEach(file => {
                output.push(`    🔴 ${file}`);
            });
            output.push("");
            output.push("Automatic merge failed; fix conflicts and then commit the result.");
            output.push("");
            output.push("💡 To resolve:");
            output.push("   1. Edit the conflicted files to resolve conflicts");
            output.push("   2. Remove the conflict markers (<<<<<<<, =======, >>>>>>>)");
            output.push("   3. Stage resolved files: git add .");
            output.push("   4. Complete the merge: git commit -m \"Resolve merge conflict\"");

            return {
                success: false, // Indicate merge conflict
                pulledCommits: pulledCount,
                output
            };
        } else {
            // Clean pull
            output.push(`Updating ${this.HEAD}..${remoteCommitsForBranch[remoteCommitsForBranch.length - 1]?.id.slice(0, 7)}`);
            output.push(`Fast-forward`);

            // List changed files
            const allFiles = new Set<string>();
            remoteCommitsForBranch.forEach(commit => {
                commit.files.forEach(file => allFiles.add(file));
            });

            allFiles.forEach(file => {
                output.push(` ${file} | changes`);
            });

            output.push(`${allFiles.size} file${allFiles.size !== 1 ? 's' : ''} changed`);

            return {
                success: true,
                pulledCommits: pulledCount,
                output
            };
        }
    }

    // Reflog methods
    public addReflogEntry(commitHash: string, action: string, message: string): void {
        const entry = {
            commitHash,
            action,
            message,
            timestamp: new Date(),
            index: this.reflog.length
        };
        this.reflog.unshift(entry); // Add to beginning (most recent first)
    }

    public getReflog(): Array<{
        commitHash: string;
        action: string;
        message: string;
        timestamp: Date;
        index: number;
    }> {
        return this.reflog;
    }

    public clearReflog(): void {
        this.reflog = [];
    }

    // Tag methods
    public createTag(tagName: string, commitHash?: string): { success: boolean; message: string; commitHash?: string } {
        if (!this.initialized) {
            return { success: false, message: "fatal: not a git repository" };
        }

        // Check if tag already exists
        if (this.tags.has(tagName)) {
            return { success: false, message: `fatal: tag '${tagName}' already exists` };
        }

        // Get the commit to tag
        const commitIds = Object.keys(this.commits);
        let targetCommit: string;

        if (commitHash) {
            // Find the commit by hash
            const foundCommit = commitIds.find(id => id.startsWith(commitHash));
            if (!foundCommit) {
                return { success: false, message: `fatal: commit '${commitHash}' not found` };
            }
            targetCommit = foundCommit;
        } else {
            // Tag the latest commit
            if (commitIds.length === 0) {
                return { success: false, message: "fatal: No commits yet to tag" };
            }
            const lastCommitId = commitIds[commitIds.length - 1];
            if (!lastCommitId) {
                return { success: false, message: "fatal: No commits yet to tag" };
            }
            targetCommit = lastCommitId;
        }

        // Create the tag
        this.tags.set(tagName, targetCommit);

        return { success: true, message: `Created tag '${tagName}'`, commitHash: targetCommit };
    }

    public deleteTag(tagName: string): { success: boolean; message: string } {
        if (!this.tags.has(tagName)) {
            return { success: false, message: `error: tag '${tagName}' not found` };
        }

        this.tags.delete(tagName);
        this.pushedTags.delete(tagName); // Also remove from pushed tags
        return { success: true, message: `Deleted tag '${tagName}'` };
    }

    public getTags(): Map<string, string> {
        return this.tags;
    }

    public getTagsList(): string[] {
        return Array.from(this.tags.keys()).sort();
    }

    public hasTag(tagName: string): boolean {
        return this.tags.has(tagName);
    }

    public pushTags(remote: string, specificTag?: string): { success: boolean; messages: string[] } {
        const messages: string[] = [];

        // Validate remote exists
        if (!this.remotes[remote]) {
            return {
                success: false,
                messages: [`error: No such remote: '${remote}'`]
            };
        }

        if (specificTag) {
            // Push a specific tag
            if (!this.tags.has(specificTag)) {
                return {
                    success: false,
                    messages: [`error: src refspec ${specificTag} does not match any`]
                };
            }

            this.pushedTags.add(specificTag);
            const commitHash = this.tags.get(specificTag);
            messages.push(`To ${this.remotes[remote]}`);
            messages.push(` * [new tag]         ${specificTag} -> ${specificTag}`);
        } else {
            // Push all tags
            if (this.tags.size === 0) {
                return {
                    success: true,
                    messages: ["Everything up-to-date"]
                };
            }

            const unpushedTags = Array.from(this.tags.keys()).filter(tag => !this.pushedTags.has(tag));

            if (unpushedTags.length === 0) {
                return {
                    success: true,
                    messages: ["Everything up-to-date"]
                };
            }

            messages.push(`To ${this.remotes[remote]}`);
            unpushedTags.forEach(tag => {
                this.pushedTags.add(tag);
                messages.push(` * [new tag]         ${tag} -> ${tag}`);
            });
        }

        return { success: true, messages };
    }
}
