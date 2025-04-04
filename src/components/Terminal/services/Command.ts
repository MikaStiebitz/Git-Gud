import commandRegistry from "../../../commands";

export class CommandService {
    constructor(
        private handleCommand: (command: string, isPlayground?: boolean) => void,
        private isPlaygroundMode: boolean,
        private isLevelCompleted: boolean,
        private openFileEditor: (fileName: string, isPlayground?: boolean) => void,
        private openCommitDialog: () => void,
    ) {}

    executeCommand(input: string): void {
        if (!input.trim()) return;

        // Split input by semicolons to support command chaining
        const commands = input
            .split(";")
            .map(cmd => cmd.trim())
            .filter(cmd => cmd);

        // Process each command in sequence
        for (const command of commands) {
            this.processSingleCommand(command);
        }
    }

    private processSingleCommand(command: string): void {
        // Special case handling for nano command
        if (command.startsWith("nano ")) {
            const args = command.split(/\s+/);
            if (args.length > 1) {
                const fileName = args[1] ?? "";
                // Call handleCommand first to let it handle creating the file if needed
                this.handleCommand(command, this.isPlaygroundMode);
                // Then open the file editor
                this.openFileEditor(fileName, this.isPlaygroundMode);
                return;
            }
        }

        if (command === "git commit") {
            this.handleCommand(command, this.isPlaygroundMode);
            this.openCommitDialog();
            return;
        }

        // Special case for the "next" command when level is completed
        if (command === "next" && this.isLevelCompleted) {
            this.handleCommand("next", this.isPlaygroundMode);
            return;
        }

        // Normal command processing
        this.handleCommand(command, this.isPlaygroundMode);
    }

    getTabCompletionCommands(): string[] {
        return commandRegistry.getTabCompletionCommands();
    }

    supportsFileCompletion(commandName: string): boolean {
        return commandRegistry.supportsFileCompletion(commandName);
    }
}
