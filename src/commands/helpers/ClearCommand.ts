import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class ClearCommand implements Command {
    name = "clear";
    description = "Clear the terminal screen";
    usage = "clear";
    examples = ["clear"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        // Return an empty array to clear the terminal
        return [];
    }
}
