import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class NextCommand implements Command {
    name = "next";
    description = "Move to the next level";
    usage = "next";
    examples = ["next"];
    includeInTabCompletion = false; // Not shown in tab completion
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        // This is a special command that will be handled by the Terminal component
        // The actual level change happens in the UI layer
        return ["Switching to next level..."];
    }
}
