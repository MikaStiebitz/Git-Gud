import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class NanoCommand implements Command {
    name = "nano";
    description = "Edit a file using a simple editor";
    usage = "nano <file>";
    examples = ["nano README.md"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { fileSystem, gitRepository } = context;

        if (args.positionalArgs.length === 0) {
            return ["Please specify a file."];
        }

        const file = args.positionalArgs[0] ?? "";
        const filePath = resolvePath(file, context.currentDirectory);

        // Check if the file exists, and if not, create it
        if (fileSystem.getFileContents(filePath) === null) {
            // Create an empty file if it doesn't exist
            fileSystem.writeFile(filePath, "");

            // Mark as untracked if Git is initialized
            if (gitRepository.isInitialized()) {
                // Ensure we use normalized path without leading slash
                const normalizedPath = filePath.startsWith("/") ? filePath.substring(1) : filePath;
                gitRepository.updateFileStatus(normalizedPath, "untracked");
            }
        }

        // Return a message indicating the file is being opened
        return [`Opening file ${file} in editor...`];
    }
}
