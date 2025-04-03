import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class PwdCommand implements Command {
    name = "pwd";
    description = "Print working directory";
    usage = "pwd";
    examples = ["pwd"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        return [context.currentDirectory];
    }
}
