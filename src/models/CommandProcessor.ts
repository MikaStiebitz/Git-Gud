import { FileSystem } from "./FileSystem";
import { GitRepository } from "./GitRepository";

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
            case "touch":
                return [`Use the editor to modify ${cmdArgs[0] || "file"}`];
            case "mkdir":
                return this.processMkdirCommand(cmdArgs[0]);
            case "pwd":
                return [this.currentDirectory];
            case "help":
                return this.processHelpCommand();
            case "clear":
                return [];
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
            case "merge":
                return this.processGitMergeCommand(args.slice(1));
            case "help":
                return this.processGitHelpCommand();
            default:
                return [`Git: '${subCommand}' is not a git command.`];
        }
    }

    // Process git status command
    private processGitStatusCommand(): string[] {
        const status = this.gitRepository.getStatus();
        const output = [`On branch ${this.gitRepository.getCurrentBranch()}`];

        const staged: string[] = [];
        const modified: string[] = [];
        const untracked: string[] = [];

        Object.entries(status).forEach(([file, fileStatus]) => {
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
            const stagedFiles = this.gitRepository.addAll(allFiles);

            if (stagedFiles.length === 0) {
                return ["No changes to add."];
            }

            return [`Added ${stagedFiles.length} files to staging area.`];
        } else {
            const filePath = this.resolvePath(args[0]);
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
        const commitId = this.gitRepository.commit(message);

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
            const success = this.gitRepository.checkout(newBranch, true);

            return success ? [`Switched to a new branch '${newBranch}'`] : [`Branch '${newBranch}' already exists.`];
        } else {
            const branch = args[0];
            const success = this.gitRepository.checkout(branch);

            return success ? [`Switched to branch '${branch}'`] : [`Branch '${branch}' does not exist.`];
        }
    }

    // Process git merge command
    private processGitMergeCommand(args: string[]): string[] {
        if (args.length === 0) {
            return ["Please specify a branch to merge."];
        }

        const branch = args[0];
        const success = this.gitRepository.merge(branch);

        return success
            ? [`Merged branch '${branch}' into ${this.gitRepository.getCurrentBranch()}.`]
            : [`Cannot merge branch '${branch}'.`];
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
            "  git checkout <branch> - Switch branches",
            "  git checkout -b <branch> - Create and switch to a new branch",
            "  git merge <branch> - Join two development histories together",
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

    // Process mkdir command
    private processMkdirCommand(dir?: string): string[] {
        if (!dir) {
            return ["Please specify a directory name."];
        }

        const dirPath = this.resolvePath(dir);
        const success = this.fileSystem.mkdir(dirPath);

        return success ? [`Created directory: ${dir}`] : [`Failed to create directory: ${dir}`];
    }

    // Process help command
    private processHelpCommand(): string[] {
        return [
            "Available commands:",
            "  git - Git version control commands",
            "  ls - List directory contents",
            "  cd <directory> - Change directory",
            "  pwd - Print working directory",
            "  cat <file> - Display file contents",
            "  nano <file> - Edit file",
            "  touch <file> - Create empty file",
            "  mkdir <directory> - Create directory",
            "  help - Display this help message",
            "  clear - Clear the terminal",
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

    // Get all files in a directory recursively
    private getAllFiles(directory: string, prefix: string = ""): string[] {
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
