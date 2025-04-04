import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";
import type { FileSystem } from "~/models/FileSystem";
import type { GitRepository } from "~/models/GitRepository";

export class RmCommand implements Command {
    name = "rm";
    description = "Remove files or directories";
    usage = "rm [-r] <file_or_directory>";
    examples = ["rm file.txt", "rm -r directory"];
    includeInTabCompletion = true;
    supportsFileCompletion = true;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { fileSystem, gitRepository } = context;

        if (args.positionalArgs.length === 0) {
            return ["Please specify a file or directory to remove."];
        }

        // Check for recursive flag
        const isRecursive = args.flags.r !== undefined || args.flags.recursive !== undefined;

        const file = args.positionalArgs[0] ?? "";
        const filePath = resolvePath(file, context.currentDirectory);

        // Check if path is a directory
        const isDirectory = fileSystem.getDirectoryContents(filePath) !== null;

        if (isDirectory && !isRecursive) {
            return [`Cannot remove '${file}': Is a directory. Use 'rm -r' for directories.`];
        }

        // If it's a file or we're using -r flag
        const success = this.recursiveDelete(filePath, fileSystem, gitRepository, isRecursive);

        return success ? [`Removed '${file}'.`] : [`Failed to remove '${file}'.`];
    }

    // New method to handle recursive deletion
    private recursiveDelete(
        path: string,
        fileSystem: FileSystem,
        gitRepository: GitRepository,
        isRecursive: boolean,
    ): boolean {
        // If it's a file, simply delete it
        if (fileSystem.getFileContents(path) !== null) {
            const success = fileSystem.delete(path);

            // Update Git status if file was tracked
            if (success && gitRepository.isInitialized()) {
                // Normalize path for Git
                const normalizedPath = path.startsWith("/") ? path.substring(1) : path;
                const status = gitRepository.getStatus();
                if (normalizedPath in status) {
                    delete status[normalizedPath];
                }
            }

            return success;
        }

        // If it's a directory and recursive is enabled
        if (isRecursive) {
            const contents = fileSystem.getDirectoryContents(path);
            if (!contents) return false;

            // Delete all contents first
            for (const [name, item] of Object.entries(contents)) {
                const subPath = path === "/" ? `/${name}` : `${path}/${name}`;

                if (item.type === "file") {
                    // Delete file and update Git status
                    const success = fileSystem.delete(subPath);
                    if (success && gitRepository.isInitialized()) {
                        // Normalize path for Git
                        const normalizedPath = subPath.startsWith("/") ? subPath.substring(1) : subPath;
                        const status = gitRepository.getStatus();
                        if (normalizedPath in status) {
                            delete status[normalizedPath];
                        }
                    }
                } else if (item.type === "directory") {
                    // Recursively delete subdirectory
                    this.recursiveDelete(subPath, fileSystem, gitRepository, true);
                }
            }

            // Finally delete the directory itself
            return fileSystem.delete(path);
        }

        return false;
    }
}
