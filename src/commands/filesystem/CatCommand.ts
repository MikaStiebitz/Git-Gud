import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class CatCommand implements Command {
    name = "cat";
    description = "Display the contents of a file";
    usage = "cat <file>";
    examples = ["cat README.md"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { fileSystem } = context;

        if (args.positionalArgs.length === 0) {
            return ["Please specify a file."];
        }

        const file = args.positionalArgs[0] ?? "";
        const resolvedPath = resolvePath(file, context.currentDirectory);
        const fileContent = fileSystem.getFileContents(resolvedPath);

        if (fileContent !== null) {
            // Split the file content into lines
            return fileContent.split("\n");
        } else {
            return [`File not found: ${file}`];
        }
    }
}
