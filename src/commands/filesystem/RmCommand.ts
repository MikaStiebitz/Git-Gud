import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class RmCommand implements Command {
    name = "rm";
    description = "Remove files or directories";
    usage = "rm <file>";
    examples = ["rm file.txt"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { fileSystem, gitRepository } = context;

        if (args.positionalArgs.length === 0) {
            return ["Please specify a file to remove."];
        }

        const file = args.positionalArgs[0] ?? "";
        const filePath = resolvePath(file, context.currentDirectory);

        // Check if path is a directory
        if (fileSystem.getDirectoryContents(filePath)) {
            return [`Cannot remove '${file}': Is a directory. Use 'rm -r' for directories (not implemented yet).`];
        }

        // Check if file exists
        if (fileSystem.getFileContents(filePath) === null) {
            return [`Cannot remove '${file}': No such file.`];
        }

        const success = fileSystem.delete(filePath);

        // Update Git status if file was tracked
        if (success && gitRepository.isInitialized()) {
            const status = gitRepository.getStatus();
            if (filePath in status) {
                delete status[filePath];
            }
        }

        return success ? [`Removed file '${file}'.`] : [`Failed to remove '${file}'.`];
    }
}
