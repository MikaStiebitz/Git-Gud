import type { CommandProcessor } from "~/models/CommandProcessor";
import type { FileSystem } from "~/models/FileSystem";
import type { AutocompleteState } from "../types";
import commandRegistry from "~/commands";

export class AutocompleteService {
    constructor(
        private commandProcessor: CommandProcessor,
        private fileSystem: FileSystem,
    ) {}

    getCommandSuggestion(partialCommand: string): string | undefined {
        if (!partialCommand || partialCommand.trim() === "") return undefined;

        // Normalize input (lowercase, trim spaces)
        const normalizedInput = partialCommand.toLowerCase().trim();

        // Get all tab-completion-enabled commands from registry
        const completionCommands = commandRegistry.getTabCompletionCommands();

        // Find matching commands that start with the input
        const matches = completionCommands.filter(cmd => cmd.toLowerCase().startsWith(normalizedInput));

        // Return the first match or undefined
        return matches.length > 0 ? matches[0] : undefined;
    }

    processTabAutocomplete(input: string): AutocompleteState {
        // Normalize input by removing excess spaces
        const normalizedInput = input.trim().replace(/\s+/g, " ");

        // Extract command and arguments
        const parts = normalizedInput.split(" ");
        let commandName = parts[0] ?? "";

        // Special handling for Git commands (two-word commands)
        if (commandName === "git" && parts.length > 1) {
            commandName = `git ${parts[1]}`;
        }

        // Check if this is a command that supports file completion
        const supportsFileCompletion = commandRegistry.supportsFileCompletion(commandName);

        // If command suggestion is active but we don't have file completion,
        // complete the command when Tab is pressed
        const commandSuggestion = this.getCommandSuggestion(input);

        if (commandSuggestion && !supportsFileCompletion) {
            return {
                fileMatches: [],
                showMenu: false,
                commandSuggestion: "",
                showCommandSuggestion: false,
            };
        }

        if (!supportsFileCompletion) {
            return {
                fileMatches: [],
                showMenu: false,
                commandSuggestion: commandSuggestion ?? "",
                showCommandSuggestion: !!commandSuggestion,
            };
        }

        // For commands that support file completion, handle file path autocomplete
        let filePart = "";

        if (parts.length > 1) {
            // Extract the potential file path part
            if (
                commandName === "git add" ||
                commandName === "git rm" ||
                commandName === "git checkout" ||
                commandName === "git restore"
            ) {
                // For Git commands with subcommands, use the remaining parts as file path
                filePart = parts.slice(2).join(" ");
            } else {
                // For regular commands, use everything after the command as file path
                filePart = parts.slice(1).join(" ");
            }
        }

        // Get files in the current directory
        const currentDir = this.commandProcessor.getCurrentDirectory();
        const contents = this.fileSystem.getDirectoryContents(currentDir);
        if (!contents) {
            return {
                fileMatches: [],
                showMenu: false,
                commandSuggestion: commandSuggestion ?? "",
                showCommandSuggestion: !!commandSuggestion,
            };
        }

        // Filter files based on the current input path
        const matchingFiles = Object.keys(contents).filter(file => file.startsWith(filePart || ""));

        if (matchingFiles.length === 0) {
            return {
                fileMatches: [],
                showMenu: false,
                commandSuggestion: commandSuggestion ?? "",
                showCommandSuggestion: !!commandSuggestion,
            };
        }

        return {
            fileMatches: matchingFiles,
            showMenu: matchingFiles.length > 1,
            commandSuggestion: commandSuggestion ?? "",
            showCommandSuggestion: !!commandSuggestion,
        };
    }

    generateCompletedCommand(input: string, selectedFile: string): string {
        // Split current input into command and arguments
        const parts = input.trim().split(/\s+/);

        if (parts[0] === "git" && parts.length > 1) {
            // For git commands: git command filename
            return `${parts[0]} ${parts[1]} ${selectedFile}`;
        } else {
            // For regular commands: command filename
            return `${parts[0]} ${selectedFile}`;
        }
    }
}
