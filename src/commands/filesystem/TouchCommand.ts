import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { resolvePath } from "~/lib/utils";

export class TouchCommand implements Command {
    name = "touch";
    description = "Create a new empty file";
    usage = "touch <file>";
    examples = ["touch newfile.txt", "touch README", "touch script.js"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { fileSystem, gitRepository } = context;

        if (args.positionalArgs.length === 0) {
            return ["Please specify a file name."];
        }

        let fileName = args.positionalArgs[0] ?? "";

        // Add .txt extension if no extension is present
        fileName = this.ensureFileExtension(fileName);

        const filePath = resolvePath(fileName, context.currentDirectory);

        const success = fileSystem.writeFile(filePath, "");

        if (success) {
            // Mark the file as untracked if Git is initialized
            if (gitRepository.isInitialized()) {
                // Normalize path for git (remove leading slash)
                const normalizedPath = filePath.startsWith("/") ? filePath.substring(1) : filePath;
                gitRepository.updateFileStatus(normalizedPath, "untracked");
            }

            return [`Created file: ${fileName}`];
        } else {
            return [`Failed to create file: ${fileName}`];
        }
    }

    /**
     * Ensures the filename has an extension, adds .txt if none is present
     */
    private ensureFileExtension(fileName: string): string {
        // Check if filename already has an extension
        const lastDotIndex = fileName.lastIndexOf(".");
        const lastSlashIndex = Math.max(fileName.lastIndexOf("/"), fileName.lastIndexOf("\\"));

        // If there's a dot after the last slash (or no slash), it has an extension
        if (lastDotIndex > lastSlashIndex && lastDotIndex > 0) {
            return fileName; // Already has extension
        }

        // Special cases where we don't add .txt
        const specialFiles = [
            "README",
            "LICENSE",
            "CHANGELOG",
            "CONTRIBUTING",
            "Makefile",
            "Dockerfile",
            "Jenkinsfile",
            ".gitignore",
            ".env",
            ".htaccess",
        ];

        const baseFileName = fileName.split("/").pop() ?? fileName;

        // Don't add extension to special files
        if (specialFiles.includes(baseFileName) || baseFileName.startsWith(".")) {
            return fileName;
        }

        // Add .txt extension
        return `${fileName}.txt`;
    }
}
