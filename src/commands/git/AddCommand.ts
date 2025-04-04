import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { getAllFiles, resolvePath } from "~/lib/utils";

export class AddCommand implements Command {
    name = "git add";
    description = "Add file contents to the index";
    usage = "git add <file>... or git add .";
    examples = ["git add file.txt", "git add .", "git add src/"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository, fileSystem } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        if (args.positionalArgs.length === 0) {
            return ["Nothing specified, nothing added."];
        }

        // Handle 'git add .'
        if (args.positionalArgs[0] === ".") {
            // Get all files in the current directory recursively
            const allFiles = getAllFiles(fileSystem, context.currentDirectory);
            const stagedFiles = [];

            // Mark appropriate files as staged
            for (const file of allFiles) {
                // Skip .git directory
                if (file.startsWith("/.git") || file.includes("/.git/")) {
                    continue;
                }

                // Normalize path for consistency
                const normalizedPath = file.startsWith("/") ? file.substring(1) : file;

                // Add file to staging
                gitRepository.addFile(normalizedPath);
                stagedFiles.push(normalizedPath);
            }

            if (stagedFiles.length === 0) {
                return ["No changes to add."];
            }

            return [`Added ${stagedFiles.length} files to staging area.`];
        } else {
            // Handle specific files
            const results: string[] = [];

            for (const argPath of args.positionalArgs) {
                const filePath = resolvePath(argPath, context.currentDirectory);

                if (fileSystem.getFileContents(filePath) === null) {
                    results.push(`pathspec '${argPath}' did not match any files`);
                    continue;
                }

                // Mark as untracked if not already tracked
                const status = gitRepository.getStatus();
                if (!status[filePath]) {
                    gitRepository.updateFileStatus(filePath, "untracked");
                }

                // Stage the file
                gitRepository.addFile(filePath);

                // Ensure UI is updated - force update in GitRepository
                const updatedStatus = gitRepository.getStatus();
                updatedStatus[filePath] = "staged";

                results.push(`Added ${argPath} to staging area.`);
            }

            return results.length ? results : ["No changes to add."];
        }
    }
}
