import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class InitCommand implements Command {
    name = "git init";
    description = "Initialize a new Git repository";
    usage = "git init";
    examples = ["git init"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        return gitRepository.init()
            ? ["Initialized empty Git repository in .git/"]
            : ["Git repository is already initialized"];
    }
}
