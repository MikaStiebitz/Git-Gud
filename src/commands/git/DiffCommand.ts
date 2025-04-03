import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class DiffCommand implements Command {
    name = "git diff";
    description = "Show changes between commits, commit and working tree, etc";
    usage = "git diff [<options>] [<commit>] [--] [<path>...]";
    examples = ["git diff", "git diff HEAD~1 HEAD", "git diff file.txt"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository, fileSystem } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Simplify diff output for the learning game
        let filePath = "";
        if (args.positionalArgs.length > 0) {
            filePath = resolvePath(args.positionalArgs[0] ?? "", context.currentDirectory);

            if (fileSystem.getFileContents(filePath) === null) {
                return [`diff: ${args.positionalArgs[0]}: No such file or directory`];
            }
        }

        // Simplified diff output
        const output = [
            "diff --git a/file b/file",
            "index abcdef..012345 100644",
            "--- a/file",
            "+++ b/file",
            "@@ -1,3 +1,3 @@",
            " Unchanged line",
            "-Removed line",
            "+Added line",
        ];

        if (filePath) {
            const filename = args.positionalArgs[0];
            output[0] = `diff --git a/${filename} b/${filename}`;
            output[2] = `--- a/${filename}`;
            output[3] = `+++ b/${filename}`;
        }

        return output;
    }
}
