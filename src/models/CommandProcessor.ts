import type { FileSystem } from "./FileSystem";
import type { GitRepository } from "./GitRepository";

export class CommandProcessor {
    constructor(
        private fileSystem: FileSystem,
        private gitRepository: GitRepository,
        private currentDirectory = "/",
    ) {}

    // Process a command and return the output
    public processCommand(command: string): string[] {
        const args = command.trim().split(/\s+/);
        const cmd = args[0]?.toLowerCase();
        const cmdArgs = args.slice(1);

        switch (cmd) {
            case "git":
                return this.processGitCommand(cmdArgs);
            case "ls":
                return this.processLsCommand();
            case "cd":
                return this.processCdCommand(cmdArgs[0]);
            case "cat":
                return this.processCatCommand(cmdArgs[0]);
            case "nano":
                return this.processNanoCommand(cmdArgs[0]);
            case "touch":
                return this.processTouchCommand(cmdArgs[0]);
            case "mkdir":
                return this.processMkdirCommand(cmdArgs[0]);
            case "rm":
                return this.processRmCommand(cmdArgs[0]);
            case "pwd":
                return [this.currentDirectory];
            case "help":
                return this.processHelpCommand();
            case "clear":
                return [];
            case "next":
                // "next" is a special command that is only used in the UI
                return ["Switching to next level..."];
            default:
                return [`Command not found: ${cmd}`];
        }
    }

    // Process Git commands
    private processGitCommand(args: string[]): string[] {
        const subCommand = args[0]?.toLowerCase();

        if (subCommand === "init") {
            return this.gitRepository.init()
                ? ["Initialized empty Git repository in .git/"]
                : ["Git repository is already initialized"];
        }

        if (!this.gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        switch (subCommand) {
            case "status":
                return this.processGitStatusCommand();
            case "add":
                return this.processGitAddCommand(args.slice(1));
            case "commit":
                return this.processGitCommitCommand(args.slice(1));
            case "branch":
                return this.processGitBranchCommand(args.slice(1));
            case "checkout":
                return this.processGitCheckoutCommand(args.slice(1));
            case "switch":
                return this.processGitSwitchCommand(args.slice(1));
            case "merge":
                return this.processGitMergeCommand(args.slice(1));
            case "mv":
                return this.processGitMvCommand(args.slice(1));
            case "log":
                return this.processGitLogCommand(args.slice(1));
            case "rm":
                return this.processGitRmCommand(args.slice(1));
            case "restore":
                return this.processGitRestoreCommand(args.slice(1));
            case "reset":
                return this.processGitResetCommand(args.slice(1));
            case "revert":
                return this.processGitRevertCommand(args.slice(1));
            case "rebase":
                return this.processGitRebaseCommand(args.slice(1));
            case "stash":
                return this.processGitStashCommand(args.slice(1));
            case "cherry-pick":
                return this.processGitCherryPickCommand(args.slice(1));
            case "diff":
                return this.processGitDiffCommand(args.slice(1));
            case "show":
                return this.processGitShowCommand(args.slice(1));
            case "remote":
                return this.processGitRemoteCommand(args.slice(1));
            case "push":
                return this.processGitPushCommand(args.slice(1));
            case "pull":
                return this.processGitPullCommand(args.slice(1));
            case "help":
                return this.processGitHelpCommand();
            default:
                return [`Git: '${subCommand}' is not a git command.`];
        }
    }

    // Process git status command
    private processGitStatusCommand(): string[] {
        // First, ensure the status is up to date by checking for untracked files
        const currentFiles = this.getAllFiles(this.currentDirectory);
        const status = this.gitRepository.getStatus();

        // Find files that exist in the filesystem but aren't in the git status
        currentFiles.forEach(file => {
            if (!Object.prototype.hasOwnProperty.call(status, file)) {
                this.gitRepository.updateFileStatus(file, "untracked");
            }
        });

        // Now get the updated status
        const updatedStatus = this.gitRepository.getStatus();
        const output = [`On branch ${this.gitRepository.getCurrentBranch()}`];

        const staged: string[] = [];
        const modified: string[] = [];
        const untracked: string[] = [];

        Object.entries(updatedStatus).forEach(([file, fileStatus]) => {
            switch (fileStatus) {
                case "staged":
                    staged.push(file);
                    break;
                case "modified":
                    modified.push(file);
                    break;
                case "untracked":
                    untracked.push(file);
                    break;
            }
        });

        if (staged.length === 0 && modified.length === 0 && untracked.length === 0) {
            output.push("Nothing to commit, working tree clean");
        } else {
            if (staged.length > 0) {
                output.push("Changes to be committed:");
                staged.forEach(file => output.push(`  new file: ${file}`));
                output.push("");
            }

            if (modified.length > 0) {
                output.push("Changes not staged for commit:");
                modified.forEach(file => output.push(`  modified: ${file}`));
                output.push("");
            }

            if (untracked.length > 0) {
                output.push("Untracked files:");
                untracked.forEach(file => output.push(`  ${file}`));
                output.push("");
            }
        }

        return output;
    }

    // Process git add command
    private processGitAddCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["Nothing specified, nothing added."];
        }

        if (args[0] === ".") {
            // Get all files in the current directory recursively
            const allFiles = this.getAllFiles(this.currentDirectory);

            // Fix: Before calling addAll, make sure all files are marked as untracked
            allFiles.forEach(file => {
                this.gitRepository.updateFileStatus(file, "untracked");
            });

            const stagedFiles = this.gitRepository.addAll(allFiles);

            if (stagedFiles.length === 0) {
                return ["No changes to add."];
            }

            return [`Added ${stagedFiles.length} files to staging area.`];
        } else {
            const filePath = this.resolvePath(args[0] ?? "");
            if (this.fileSystem.getFileContents(filePath) === null) {
                return [`pathspec '${args[0]}' did not match any files`];
            }

            this.gitRepository.addFile(filePath);
            return [`Added ${args[0]} to staging area.`];
        }
    }

    // Process git commit command
    private processGitCommitCommand(args: string[]): string[] {
        if (args.length < 2 || args[0] !== "-m") {
            return ["Please provide a commit message with the -m flag."];
        }

        const message = args[1];
        const commitId = this.gitRepository.commit(message ?? "");

        if (!commitId) {
            return ["Nothing to commit. Use git add to stage files first."];
        }

        return [
            `[${this.gitRepository.getCurrentBranch()} ${commitId.substring(0, 7)}] ${message}`,
            "1 file changed, 1 insertion(+)",
        ];
    }

    // Process git branch command
    private processGitBranchCommand(args: string[]): string[] {
        // Handle branch deletion
        if (args.length > 0 && (args[0] === "-d" || args[0] === "--delete" || args[0] === "-D")) {
            if (args.length < 2) {
                return ["error: branch name required"];
            }
            const branchName = args[1];

            // Cannot delete current branch
            if (branchName === this.gitRepository.getCurrentBranch()) {
                return [`error: Cannot delete branch '${branchName}' checked out`];
            }

            const deleted = this.gitRepository.deleteBranch(branchName);
            if (deleted) {
                return [`Deleted branch ${branchName}`];
            } else {
                return [`error: branch '${branchName}' not found`];
            }
        }

        // Create new branch without switching
        if (args.length > 0 && !args[0].startsWith("-")) {
            const newBranch = args[0];
            const created = this.gitRepository.createBranch(newBranch);
            if (created) {
                return [`Created branch '${newBranch}'`];
            } else {
                return [`fatal: a branch named '${newBranch}' already exists`];
            }
        }

        // List branches
        const branches = this.gitRepository.getBranches();
        const currentBranch = this.gitRepository.getCurrentBranch();

        return branches.map(branch => (branch === currentBranch ? `* ${branch}` : `  ${branch}`));
    }

    // Process git checkout command
    private processGitCheckoutCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["Please specify a branch name."];
        }

        if (args[0] === "-b") {
            if (args.length < 2) {
                return ["Please specify a branch name."];
            }

            const newBranch = args[1];
            const success = this.gitRepository.checkout(newBranch ?? "", true);

            return success ? [`Switched to a new branch '${newBranch}'`] : [`Branch '${newBranch}' already exists.`];
        } else {
            const branch = args[0];
            const success = this.gitRepository.checkout(branch ?? "");

            return success ? [`Switched to branch '${branch}'`] : [`Branch '${branch}' does not exist.`];
        }
    }

    // Process git switch command (newer alternative to checkout for branch switching)
    private processGitSwitchCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["Please specify a branch name."];
        }

        if (args[0] === "-c" || args[0] === "--create") {
            if (args.length < 2) {
                return ["Please specify a branch name."];
            }

            const newBranch = args[1];
            const success = this.gitRepository.checkout(newBranch ?? "", true);

            return success ? [`Switched to a new branch '${newBranch}'`] : [`Branch '${newBranch}' already exists.`];
        } else {
            const branch = args[0];
            const success = this.gitRepository.checkout(branch ?? "");

            return success ? [`Switched to branch '${branch}'`] : [`Branch '${branch}' does not exist.`];
        }
    }

    // Process git merge command
    private processGitMergeCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["Please specify a branch to merge."];
        }

        // Handle merge abort
        if (args[0] === "--abort") {
            return ["Merge aborted successfully."];
        }

        const branch = args[0];
        const success = this.gitRepository.merge(branch ?? "");

        return success
            ? [`Merged branch '${branch}' into ${this.gitRepository.getCurrentBranch()}.`]
            : [`Cannot merge branch '${branch}'.`];
    }

    // Process git mv command
    private processGitMvCommand(args: string[]): string[] {
        if (args.length < 2) {
            return ["git mv: missing destination file after '" + (args[0] ?? "") + "'"];
        }

        const sourcePath = this.resolvePath(args[0] ?? "");
        const destPath = this.resolvePath(args[1] ?? "");

        // Check if source file exists
        if (this.fileSystem.getFileContents(sourcePath) === null) {
            return [`error: failed to move '${args[0]}': No such file or directory`];
        }

        // Get the file content
        const fileContent = this.fileSystem.getFileContents(sourcePath);

        // If we have content, create the new file
        if (fileContent !== null) {
            const success = this.fileSystem.writeFile(destPath, fileContent);

            if (success) {
                // Delete the old file
                this.fileSystem.delete(sourcePath);

                // Update git status
                // First make sure we reflect the deletion
                this.gitRepository.updateFileStatus(sourcePath, "deleted");

                // Then show the new file as staged
                this.gitRepository.updateFileStatus(destPath, "staged");

                return [`Renamed ${args[0]} => ${args[1]}`];
            } else {
                return [`error: failed to move '${args[0]}' to '${args[1]}'`];
            }
        }

        return [`error: failed to move '${args[0]}' to '${args[1]}'`];
    }

    // Process git log command
    private processGitLogCommand(args: string[]): string[] {
        // Handle --oneline flag
        const isOneline = args.includes("--oneline");
        // Handle --graph flag (simplified - we don't actually show a graph)
        const showGraph = args.includes("--graph");

        const commits = this.gitRepository.getCommits();

        if (Object.keys(commits).length === 0) {
            return ["No commits yet"];
        }

        const output: string[] = [];

        // Show commits in reverse chronological order (newest first)
        Object.entries(commits)
            .reverse()
            .forEach(([commitId, commit]) => {
                const shortId = commitId.substring(0, 7);
                const date = commit.timestamp.toISOString().split("T")[0];

                if (isOneline) {
                    const graphPrefix = showGraph ? "* " : "";
                    output.push(`${graphPrefix}${shortId} ${commit.message}`);
                } else {
                    output.push(`commit ${commitId}`);
                    output.push(`Date: ${date}`);
                    output.push("");
                    output.push(`    ${commit.message}`);
                    output.push("");
                }
            });

        return output;
    }

    // Process git restore command
    private processGitRestoreCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["Nothing specified, nothing restored."];
        }

        // Check for --staged flag
        const isStaged = args.includes("--staged");

        // Find the file argument
        let filePath = "";
        for (const arg of args) {
            if (!arg.startsWith("--")) {
                filePath = this.resolvePath(arg);
                break;
            }
        }

        if (!filePath) {
            return ["error: you must specify path(s) to restore"];
        }

        // Check if file exists
        if (this.fileSystem.getFileContents(filePath) === null) {
            return [`error: pathspec '${args[args.length - 1]}' did not match any file(s) known to git`];
        }

        // Update file status based on flag
        if (isStaged) {
            // Unstage the file (move from staged to modified or untracked)
            const currentStatus = this.gitRepository.getStatus()[filePath];
            if (currentStatus === "staged") {
                this.gitRepository.updateFileStatus(filePath, "modified");
                return [`Unstaged changes for '${args[args.length - 1]}'`];
            } else {
                return [`No staged changes for '${args[args.length - 1]}'`];
            }
        } else {
            // Discard working directory changes (simplified: just mark as clean)
            this.gitRepository.updateFileStatus(filePath, "committed");
            return [`Restored '${args[args.length - 1]}'`];
        }
    }

    // Process git reset command
    private processGitResetCommand(args: string[]): string[] {
        // Parse options: --soft, --mixed (default), --hard
        let mode = "mixed";
        let target = "HEAD";

        for (const arg of args) {
            if (arg === "--soft") {
                mode = "soft";
            } else if (arg === "--hard") {
                mode = "hard";
            } else if (arg === "--mixed") {
                mode = "mixed";
            } else if (!arg.startsWith("--")) {
                target = arg;
            }
        }

        // For simplicity, we'll just handle HEAD~1 to undo the last commit
        if (target === "HEAD~1") {
            const commits = Object.keys(this.gitRepository.getCommits());

            if (commits.length === 0) {
                return ["fatal: ambiguous argument 'HEAD~1': unknown revision"];
            }

            // We don't actually modify history, just give appropriate message
            if (mode === "hard") {
                // --hard would reset index and working directory
                return [
                    "HEAD is now at " +
                        commits[commits.length - 1].substring(0, 7) +
                        " " +
                        "Reset to previous commit (working directory and index changes discarded)",
                ];
            } else if (mode === "soft") {
                // --soft would keep changes staged
                return [
                    "HEAD is now at " +
                        commits[commits.length - 1].substring(0, 7) +
                        " " +
                        "Reset to previous commit (changes kept in staging area)",
                ];
            } else {
                // --mixed (default) would unstage the changes
                return [
                    "HEAD is now at " +
                        commits[commits.length - 1].substring(0, 7) +
                        " " +
                        "Reset to previous commit (changes kept in working directory)",
                ];
            }
        }

        return [
            "Reset operation not fully implemented in this simulation. Supported: git reset [--soft|--mixed|--hard] HEAD~1",
        ];
    }

    // Process git revert command
    private processGitRevertCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["error: you must specify at least one commit to revert"];
        }

        const commitToRevert = args[0];

        // For simplicity, we'll just handle HEAD to revert the last commit
        if (commitToRevert === "HEAD") {
            const commits = Object.keys(this.gitRepository.getCommits());

            if (commits.length === 0) {
                return ["fatal: bad revision 'HEAD'"];
            }

            // We don't actually modify history, just give appropriate message
            return [
                'Created revert commit: Revert "Last commit message"',
                "This reverts commit " + commits[commits.length - 1],
            ];
        }

        return ["Revert operation not fully implemented in this simulation. Supported: git revert HEAD"];
    }

    // Process git rebase command
    private processGitRebaseCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["You must specify a branch to rebase onto."];
        }

        const targetBranch = args[0];

        // Check if branch exists
        const branches = this.gitRepository.getBranches();
        const currentBranch = this.gitRepository.getCurrentBranch();

        if (!branches.includes(targetBranch)) {
            return [`fatal: invalid reference: ${targetBranch}`];
        }

        if (targetBranch === currentBranch) {
            return [`Cannot rebase '${currentBranch}' onto itself.`];
        }

        // We don't actually modify history, just give appropriate message
        return [`Successfully rebased '${currentBranch}' onto '${targetBranch}'.`];
    }

    // Process git stash command
    private processGitStashCommand(args: string[]): string[] {
        // Handle basic stash operations
        if (args.length === 0) {
            // Stash changes
            return [
                "Saved working directory and index state WIP on " +
                    this.gitRepository.getCurrentBranch() +
                    ": Changes stashed successfully.",
            ];
        }

        if (args[0] === "pop") {
            // Pop stashed changes
            return [
                "On branch " +
                    this.gitRepository.getCurrentBranch() +
                    "\nChanges not staged for commit:\n  modified: (stashed changes)\n" +
                    "Dropped refs/stash@{0}",
            ];
        }

        if (args[0] === "list") {
            // List stashes (simplified)
            return ["stash@{0}: WIP on " + this.gitRepository.getCurrentBranch() + ": Changes"];
        }

        if (args[0] === "apply") {
            // Apply stashed changes without removing them
            return [
                "On branch " +
                    this.gitRepository.getCurrentBranch() +
                    "\nChanges not staged for commit:\n  modified: (stashed changes)\n" +
                    "Applied stash@{0}",
            ];
        }

        return [
            "Unsupported stash operation: " +
                args[0] +
                "\nSupported operations: git stash, git stash pop, git stash list, git stash apply",
        ];
    }

    // Process git cherry-pick command
    private processGitCherryPickCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["error: you must specify at least one commit"];
        }

        const commitId = args[0];

        // We don't actually perform cherry-pick, just give appropriate message
        if (commitId.match(/^[0-9a-f]{7,40}$/)) {
            return [
                `[${this.gitRepository.getCurrentBranch()} XXXXXXX] Cherry-picked commit`,
                "1 file changed, 1 insertion(+)",
            ];
        } else {
            return [`error: invalid commit name: ${commitId}`];
        }
    }

    // Process git diff command
    private processGitDiffCommand(args: string[]): string[] {
        // Simplify diff output for the learning game
        let filePath = "";
        if (args.length > 0 && !args[0].startsWith("--")) {
            filePath = this.resolvePath(args[0]);
        }

        if (filePath && this.fileSystem.getFileContents(filePath) === null) {
            return [`diff: ${args[0]}: No such file or directory`];
        }

        // Simplified diff output
        const output = [
            "diff --git a/file b/file",
            "index abcdef..012345 100644",
            "--- a/file",
            "+++ b/file",
            "@@ -1,3 +1,3 @@",
            " Unchanged line",
            "-Removed line",
            "+Added line",
        ];

        if (filePath) {
            output[0] = `diff --git a/${args[0]} b/${args[0]}`;
            output[2] = `--- a/${args[0]}`;
            output[3] = `+++ b/${args[0]}`;
        }

        return output;
    }

    // Process git show command
    private processGitShowCommand(args: string[]): string[] {
        let target = "HEAD";
        if (args.length > 0) {
            target = args[0];
        }

        const commits = this.gitRepository.getCommits();

        if (Object.keys(commits).length === 0) {
            return ["fatal: ambiguous argument '" + target + "': unknown revision"];
        }

        // Simplified show output
        const commitId = Object.keys(commits)[Object.keys(commits).length - 1];
        const commit = commits[commitId];

        return [
            `commit ${commitId}`,
            `Date: ${commit.timestamp.toISOString().split("T")[0]}`,
            "",
            `    ${commit.message}`,
            "",
            "diff --git a/file b/file",
            "new file mode 100644",
            "index 0000000..1234567",
            "--- /dev/null",
            "+++ b/file",
            "@@ -0,0 +1,3 @@",
            "+Line 1",
            "+Line 2",
            "+Line 3",
        ];
    }

    // Process git rm command
    private processGitRmCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["Nothing specified, nothing removed."];
        }

        const filePath = this.resolvePath(args[0] ?? "");

        // Check if the path is a directory
        if (this.fileSystem.getDirectoryContents(filePath)) {
            return [`fatal: not removing '${args[0]}' recursively without -r`];
        }

        // Check if the file exists
        if (this.fileSystem.getFileContents(filePath) === null) {
            return [`pathspec '${args[0]}' did not match any files`];
        }

        // Check if file is tracked by git
        const status = this.gitRepository.getStatus();
        const isTracked = Object.keys(status).includes(filePath);

        if (!isTracked) {
            return [`error: '${args[0]}' is not tracked by Git`];
        }

        // Remove the file
        const success = this.fileSystem.delete(filePath);

        // Update Git status if successful
        if (success) {
            // Mark the file as deleted in Git status before removing it
            this.gitRepository.updateFileStatus(filePath, "deleted");

            // Then stage the deletion if --cached is not used
            const isForceOption = args.includes("-f") || args.includes("--force");
            const isCachedOption = args.includes("--cached");

            if (!isCachedOption) {
                // Standard git rm - remove from both working directory and index
                setTimeout(() => {
                    const status = this.gitRepository.getStatus();
                    if (filePath in status) {
                        delete status[filePath];
                    }
                }, 10);
                return [`rm '${args[0]}'`];
            } else {
                // git rm --cached - keep the file but remove from index
                // (Note: we've already deleted the file, which is not what --cached should do.
                // For simplicity, we'll just acknowledge this isn't fully implemented)
                return [`warning: --cached option not fully implemented in this simulation\nrm '${args[0]}'`];
            }
        } else {
            return [`error: failed to remove '${args[0]}'`];
        }
    }

    // Process git remote command
    private processGitRemoteCommand(args: string[]): string[] {
        if (args.length === 0) {
            // List remotes
            const remotes = Object.keys(this.gitRepository.getRemotes());
            return remotes.length === 0 ? [] : remotes;
        }

        if (args[0] === "add") {
            if (args.length < 3) {
                return ["error: wrong number of arguments, usage: git remote add <name> <url>"];
            }

            const name = args[1];
            const url = args[2];

            const success = this.gitRepository.addRemote(name, url);
            return success ? [`Added remote '${name}' with URL '${url}'`] : [`error: remote '${name}' already exists`];
        }

        if (args[0] === "-v" || args[0] === "--verbose") {
            // List remotes with URLs
            const remotes = this.gitRepository.getRemotes();
            const output: string[] = [];

            for (const [name, url] of Object.entries(remotes)) {
                output.push(`${name}\t${url} (fetch)`);
                output.push(`${name}\t${url} (push)`);
            }

            return output.length === 0 ? [] : output;
        }

        return ["error: Unknown subcommand. Supported: git remote, git remote add <name> <url>, git remote -v"];
    }

    // Process git push command
    private processGitPushCommand(args: string[]): string[] {
        // Default values
        let remote = "origin";
        let branch = this.gitRepository.getCurrentBranch();
        let setUpstream = false;

        // Parse arguments
        for (let i = 0; i < args.length; i++) {
            if (args[i] === "-u" || args[i] === "--set-upstream") {
                setUpstream = true;
            } else if (i === 0 && !args[i].startsWith("-")) {
                remote = args[i];
            } else if (i === 1 && !args[i].startsWith("-")) {
                branch = args[i];
            }
        }

        // Check if remote exists
        const remotes = this.gitRepository.getRemotes();
        if (!remotes[remote]) {
            return [
                `fatal: '${remote}' does not appear to be a git repository`,
                "fatal: Could not read from remote repository.",
                "Please make sure you have the correct access rights",
                "and the repository exists.",
            ];
        }

        // Perform push
        const success = this.gitRepository.push(remote, branch);
        if (success) {
            if (setUpstream) {
                return [
                    `Branch '${branch}' set up to track remote branch '${branch}' from '${remote}'.`,
                    "Everything up-to-date",
                ];
            } else {
                return ["Everything up-to-date"];
            }
        } else {
            return [`error: failed to push to '${remote}'`];
        }
    }

    // Process git pull command
    private processGitPullCommand(args: string[]): string[] {
        // Default values
        let remote = "origin";
        let branch = this.gitRepository.getCurrentBranch();

        // Parse arguments
        if (args.length > 0 && !args[0].startsWith("-")) {
            remote = args[0];
        }
        if (args.length > 1 && !args[1].startsWith("-")) {
            branch = args[1];
        }

        // Check if remote exists
        const remotes = this.gitRepository.getRemotes();
        if (!remotes[remote]) {
            return [
                `fatal: '${remote}' does not appear to be a git repository`,
                "fatal: Could not read from remote repository.",
                "Please make sure you have the correct access rights",
                "and the repository exists.",
            ];
        }

        // Perform pull
        const success = this.gitRepository.pull(remote, branch);
        if (success) {
            return ["Already up to date."];
        } else {
            return [`error: failed to pull from '${remote}'`];
        }
    }

    // Process git help command
    private processGitHelpCommand(): string[] {
        return [
            "Available Git commands:",
            "  git init - Initialize a new Git repository",
            "  git status - Show the working tree status",
            "  git add <file> - Add file contents to the index",
            "  git add . - Add all files to the index",
            "  git commit -m <message> - Record changes to the repository",
            "  git branch - List branches",
            "  git branch <name> - Create a new branch",
            "  git branch -d <name> - Delete a branch",
            "  git checkout <branch> - Switch branches",
            "  git checkout -b <branch> - Create and switch to a new branch",
            "  git switch <branch> - Switch branches (newer alternative)",
            "  git switch -c <branch> - Create and switch to a new branch",
            "  git merge <branch> - Join two development histories together",
            "  git merge --abort - Abort current merge operation",
            "  git mv <source> <dest> - Move or rename a file",
            "  git rm <file> - Remove files from the working tree and from the index",
            "  git log - Show commit history",
            "  git log --oneline - Show commit history in compact format",
            "  git restore <file> - Restore working tree files",
            "  git restore --staged <file> - Unstage files",
            "  git reset [--soft|--mixed|--hard] - Reset current HEAD to a specific state",
            "  git revert <commit> - Create a commit that undoes another commit",
            "  git rebase <branch> - Reapply commits on top of another base",
            "  git stash - Stash changes temporarily",
            "  git stash pop - Apply and remove stashed changes",
            "  git cherry-pick <commit> - Apply changes from specific commits",
            "  git diff - Show changes between commits",
            "  git show - Show various Git objects",
            "  git remote - Manage remote repositories",
            "  git remote add <name> <url> - Add a remote repository",
            "  git push [<remote>] [<branch>] - Push changes to remote repository",
            "  git pull [<remote>] [<branch>] - Pull changes from remote repository",
        ];
    }

    // Process ls command
    private processLsCommand(): string[] {
        const contents = this.fileSystem.getDirectoryContents(this.currentDirectory);
        return contents ? Object.keys(contents) : ["Cannot list directory contents."];
    }

    // Process cd command
    private processCdCommand(dir?: string): string[] {
        if (!dir) {
            return ["Current directory: " + this.currentDirectory];
        }

        const newPath = this.resolvePath(dir);
        const contents = this.fileSystem.getDirectoryContents(newPath);

        if (contents) {
            this.currentDirectory = newPath;
            return ["Changed to directory: " + newPath];
        } else {
            return [`Cannot change to directory: ${dir}`];
        }
    }

    // Process cat command
    private processCatCommand(file?: string): string[] {
        if (!file) {
            return ["Please specify a file."];
        }

        const filePath = this.resolvePath(file);
        const contents = this.fileSystem.getFileContents(filePath);

        return contents !== null ? [contents] : [`File not found: ${file}`];
    }

    // Process nano command - Now with special handling
    private processNanoCommand(file?: string): string[] {
        if (!file) {
            return ["Please specify a file."];
        }

        // Check if the file exists, and if not, create it
        const filePath = this.resolvePath(file);
        if (this.fileSystem.getFileContents(filePath) === null) {
            // Create an empty file if it doesn't exist
            this.fileSystem.writeFile(filePath, "");
            this.gitRepository.updateFileStatus(filePath, "untracked");
        }

        // Just return a confirmation message
        // The actual file opening is handled by the Terminal component
        return [`Opening file ${file} in editor...`];
    }

    // Process touch command
    private processTouchCommand(file?: string): string[] {
        if (!file) {
            return ["Please specify a file name."];
        }

        const filePath = this.resolvePath(file);
        const success = this.fileSystem.writeFile(filePath, "");

        if (success) {
            // Use the resolved file path for the Git status update
            this.gitRepository.updateFileStatus(filePath, "untracked");
            return [`Created file: ${file}`];
        } else {
            return [`Failed to create file: ${file}`];
        }
    }

    // Process mkdir command
    private processMkdirCommand(dir?: string): string[] {
        if (!dir) {
            return ["Please specify a directory name."];
        }

        const dirPath = this.resolvePath(dir);
        const success = this.fileSystem.mkdir(dirPath);

        return success ? [`Created directory: ${dir}`] : [`Failed to create directory: ${dir}`];
    }

    // Process rm command
    private processRmCommand(filePath?: string): string[] {
        if (!filePath) {
            return ["Please specify a file to remove."];
        }

        const resolvedPath = this.resolvePath(filePath);

        // Check if the path is a directory
        if (this.fileSystem.getDirectoryContents(resolvedPath)) {
            return [`Cannot remove '${filePath}': Is a directory. Use 'rm -r' for directories (not implemented yet).`];
        }

        // Check if the file exists
        if (this.fileSystem.getFileContents(resolvedPath) === null) {
            return [`Cannot remove '${filePath}': No such file.`];
        }

        // Remove the file
        const success = this.fileSystem.delete(resolvedPath);

        // Update Git status if file was tracked
        if (success) {
            const status = this.gitRepository.getStatus();
            if (resolvedPath in status) {
                // Remove the file from Git status
                delete status[resolvedPath];
            }
        }

        return success ? [`Removed file '${filePath}'.`] : [`Failed to remove '${filePath}'.`];
    }

    // Process help command
    private processHelpCommand(): string[] {
        return [
            "Available commands:",
            "  git - Git version control commands (use 'git help' for more)",
            "  ls - List files in current directory",
            "  cd <directory> - Change current directory",
            "  cat <file> - Display contents of a file",
            "  nano <file> - Edit a file",
            "  touch <file> - Create a new empty file",
            "  mkdir <directory> - Create a new directory",
            "  rm <file> - Remove a file",
            "  pwd - Print working directory",
            "  clear - Clear the terminal screen",
            "  help - Show this help message",
        ];
    }

    // Get current directory
    public getCurrentDirectory(): string {
        return this.currentDirectory;
    }

    // Set current directory
    public setCurrentDirectory(dir: string): void {
        if (this.fileSystem.getDirectoryContents(dir)) {
            this.currentDirectory = dir;
        }
    }

    // Get files in the current directory (for autocomplete)
    public getCurrentDirectoryFiles(): string[] {
        const contents = this.fileSystem.getDirectoryContents(this.currentDirectory);
        return contents ? Object.keys(contents) : [];
    }

    // Get all files in a directory recursively
    private getAllFiles(directory: string, prefix = ""): string[] {
        const files: string[] = [];
        const contents = this.fileSystem.getDirectoryContents(directory);

        if (!contents) return files;

        Object.entries(contents).forEach(([name, item]) => {
            const path = prefix ? `${prefix}/${name}` : name;

            if (item.type === "file") {
                files.push(path);
            } else if (item.type === "directory") {
                const subDir = directory === "/" ? `/${name}` : `${directory}/${name}`;
                files.push(...this.getAllFiles(subDir, path));
            }
        });

        return files;
    }

    // Resolve a path (handle relative paths like .. and .)
    private resolvePath(path: string): string {
        if (path.startsWith("/")) {
            return path;
        }

        if (path === "..") {
            const parts = this.currentDirectory.split("/").filter(p => p);
            parts.pop();
            return "/" + parts.join("/");
        }

        if (path === ".") {
            return this.currentDirectory;
        }

        return this.currentDirectory === "/" ? `/${path}` : `${this.currentDirectory}/${path}`;
    }
}
