import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class RestoreCommand implements Command {
    name = "git restore";
    description = "Restore working tree files";
    usage = "git restore <file> or git restore --staged <file>";
    examples = ["git restore file.txt", "git restore --staged file.txt"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository, fileSystem } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        if (args.positionalArgs.length === 0) {
            return ["Nothing specified, nothing restored."];
        }

        // Check for --staged flag
        const isStaged = args.flags.staged !== undefined;

        // Get the file path
        const filePath = resolvePath(args.positionalArgs[0] ?? "", context.currentDirectory);

        // Check if file exists
        if (fileSystem.getFileContents(filePath) === null) {
            return [`error: pathspec '${args.positionalArgs[0]}' did not match any file(s) known to git`];
        }

        // Update file status based on flag
        if (isStaged) {
            // Unstage the file (move from staged to modified or untracked)
            const currentStatus = gitRepository.getStatus()[filePath];
            if (currentStatus === "staged") {
                gitRepository.updateFileStatus(filePath, "modified");
                return [`Unstaged changes for '${args.positionalArgs[0]}'`];
            } else {
                return [`No staged changes for '${args.positionalArgs[0]}'`];
            }
        } else {
            // Discard working directory changes (simplified: just mark as clean)
            gitRepository.updateFileStatus(filePath, "committed");
            return [`Restored '${args.positionalArgs[0]}'`];
        }
    }
}
