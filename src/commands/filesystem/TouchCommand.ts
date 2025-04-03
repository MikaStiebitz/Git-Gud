import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class TouchCommand implements Command {
    name = "touch";
    description = "Create a new empty file";
    usage = "touch <file>";
    examples = ["touch newfile.txt"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { fileSystem, gitRepository } = context;

        if (args.positionalArgs.length === 0) {
            return ["Please specify a file name."];
        }

        const file = args.positionalArgs[0] ?? "";
        const filePath = resolvePath(file, context.currentDirectory);

        const success = fileSystem.writeFile(filePath, "");

        if (success) {
            // Mark the file as untracked if Git is initialized
            if (gitRepository.isInitialized()) {
                gitRepository.updateFileStatus(filePath, "untracked");
            }

            return [`Created file: ${file}`];
        } else {
            return [`Failed to create file: ${file}`];
        }
    }
}
