import type { Command } from "../base/Command";

export class ClearCommand implements Command {
    name = "clear";
    description = "Clear the terminal screen";
    usage = "clear";
    examples = ["clear"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(): string[] {
        // Return an empty array to clear the terminal
        return [];
    }
}
