import commandRegistry from "../commands";
import type { CommandContext } from "../commands/base/Command";
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
        // Check if the command is empty
        if (!command.trim()) return [];

        // Create CommandContext with necessary references
        const context: CommandContext = {
            fileSystem: this.fileSystem,
            gitRepository: this.gitRepository,
            currentDirectory: this.currentDirectory,
            setCurrentDirectory: (dir: string) => {
                if (this.fileSystem.getDirectoryContents(dir)) {
                    this.currentDirectory = dir;
                }
            },
        };

        // Delegate command execution to the registry
        return commandRegistry.execute(command, context);
    }

    // Get current directory (needed for UI display)
    public getCurrentDirectory(): string {
        return this.currentDirectory;
    }

    // Set current directory (rarely used externally)
    public setCurrentDirectory(dir: string): void {
        if (this.fileSystem.getDirectoryContents(dir)) {
            this.currentDirectory = dir;
        }
    }

    // Helper method for Terminal tab completion
    public getCurrentDirectoryFiles(): string[] {
        const contents = this.fileSystem.getDirectoryContents(this.currentDirectory);
        return contents ? Object.keys(contents) : [];
    }
}
