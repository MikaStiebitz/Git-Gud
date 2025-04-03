import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class MvCommand implements Command {
    name = "git mv";
    description = "Move or rename a file, a directory, or a symlink";
    usage = "git mv <source> <destination>";
    examples = ["git mv file.txt new-name.txt", "git mv file.txt dir/"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository, fileSystem } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        if (args.positionalArgs.length < 2) {
            return [`git mv: missing destination file after '${args.positionalArgs[0] ?? ""}'`];
        }

        const sourcePath = resolvePath(args.positionalArgs[0] ?? "", context.currentDirectory);
        const destPath = resolvePath(args.positionalArgs[1] ?? "", context.currentDirectory);

        // Check if source file exists
        if (fileSystem.getFileContents(sourcePath) === null) {
            return [`error: failed to move '${args.positionalArgs[0]}': No such file or directory`];
        }

        // Get the file content
        const fileContent = fileSystem.getFileContents(sourcePath);

        // If we have content, create the new file
        if (fileContent !== null) {
            const success = fileSystem.writeFile(destPath, fileContent);

            if (success) {
                // Delete the old file
                fileSystem.delete(sourcePath);

                // Update git status
                // First make sure we reflect the deletion
                gitRepository.updateFileStatus(sourcePath, "deleted");

                // Then show the new file as staged
                gitRepository.updateFileStatus(destPath, "staged");

                return [`Renamed ${args.positionalArgs[0]} => ${args.positionalArgs[1]}`];
            } else {
                return [`error: failed to move '${args.positionalArgs[0]}' to '${args.positionalArgs[1]}'`];
            }
        }

        return [`error: failed to move '${args.positionalArgs[0]}' to '${args.positionalArgs[1]}'`];
    }
}
