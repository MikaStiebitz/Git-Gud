import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class RmCommand implements Command {
    name = "git rm";
    description = "Remove files from the working tree and from the index";
    usage = "git rm <file>";
    examples = ["git rm file.txt", "git rm --cached file.txt"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository, fileSystem } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        if (args.positionalArgs.length === 0) {
            return ["Nothing specified, nothing removed."];
        }

        const filePath = resolvePath(args.positionalArgs[0] ?? "", context.currentDirectory);

        // Check if the path is a directory
        if (fileSystem.getDirectoryContents(filePath)) {
            return [`fatal: not removing '${args.positionalArgs[0]}' recursively without -r`];
        }

        // Check if the file exists
        if (fileSystem.getFileContents(filePath) === null) {
            return [`pathspec '${args.positionalArgs[0]}' did not match any files`];
        }

        // Check if file is tracked by git - normalize the path properly
        const status = gitRepository.getStatus();
        const normalizedPath = filePath.startsWith("/") ? filePath.substring(1) : filePath;
        const isTracked = Object.keys(status).includes(normalizedPath);

        if (!isTracked) {
            return [`error: '${args.positionalArgs[0]}' is not tracked by Git`];
        }

        // Remove the file
        const success = fileSystem.delete(filePath);

        // Update Git status if successful
        if (success) {
            // Mark the file as deleted in Git status before removing it
            gitRepository.updateFileStatus(normalizedPath, "deleted");

            // Then stage the deletion if --cached is not used
            const isCachedOption = args.flags.cached !== undefined;

            if (!isCachedOption) {
                // Standard git rm - remove from both working directory and index
                setTimeout(() => {
                    const status = gitRepository.getStatus();
                    if (normalizedPath in status) {
                        delete status[normalizedPath];
                    }
                }, 10);
                return [`rm '${args.positionalArgs[0]}'`];
            } else {
                // git rm --cached - keep the file but remove from index
                return [
                    `warning: --cached option not fully implemented in this simulation\nrm '${args.positionalArgs[0]}'`,
                ];
            }
        } else {
            return [`error: failed to remove '${args.positionalArgs[0]}'`];
        }
    }
}
