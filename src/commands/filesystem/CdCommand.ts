import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class CdCommand implements Command {
    name = "cd";
    description = "Change the current directory";
    usage = "cd [directory]";
    examples = ["cd src", "cd ..", "cd /"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { fileSystem, currentDirectory, setCurrentDirectory } = context;

        if (args.positionalArgs.length === 0) {
            return [`Current directory: ${currentDirectory}`];
        }

        const dir = args.positionalArgs[0] ?? "";
        const newPath = resolvePath(dir, currentDirectory);
        const contents = fileSystem.getDirectoryContents(newPath);

        if (contents) {
            setCurrentDirectory(newPath);
            return [`Changed to directory: ${newPath}`];
        } else {
            return [`Cannot change to directory: ${dir}`];
        }
    }
}
