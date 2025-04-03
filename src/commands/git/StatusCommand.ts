import type { Command, CommandArgs, CommandContext } from "../base/Command";
import { getAllFiles } from "~/lib/utils";

export class StatusCommand implements Command {
    name = "git status";
    description = "Show the working tree status";
    usage = "git status";
    examples = ["git status"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository, fileSystem } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // First, ensure the status is up to date by checking for untracked files
        const currentFiles = getAllFiles(fileSystem, context.currentDirectory);
        const status = gitRepository.getStatus();

        // Find files that exist in the filesystem but aren't in the git status
        // Filter out .git directory and its contents
        const nonGitFiles = currentFiles.filter(file => !file.startsWith("/.git") && !file.includes("/.git/"));

        nonGitFiles.forEach(file => {
            if (!Object.prototype.hasOwnProperty.call(status, file)) {
                gitRepository.updateFileStatus(file, "untracked");
            }
        });

        // Now get the updated status
        const updatedStatus = gitRepository.getStatus();
        const output = [`On branch ${gitRepository.getCurrentBranch()}`];

        const staged: string[] = [];
        const modified: string[] = [];
        const untracked: string[] = [];

        // Filter out .git directory entries
        Object.entries(updatedStatus).forEach(([file, fileStatus]) => {
            if (!file.startsWith("/.git") && !file.includes("/.git/")) {
                switch (fileStatus) {
                    case "staged":
                        staged.push(file);
                        break;
                    case "modified":
                        modified.push(file);
                        break;
                    case "untracked":
                        untracked.push(file);
                        break;
                }
            }
        });

        if (staged.length === 0 && modified.length === 0 && untracked.length === 0) {
            output.push("Nothing to commit, working tree clean");
        } else {
            if (staged.length > 0) {
                output.push("Changes to be committed:");
                staged.forEach(file => output.push(`  new file: ${file}`));
                output.push("");
            }

            if (modified.length > 0) {
                output.push("Changes not staged for commit:");
                modified.forEach(file => output.push(`  modified: ${file}`));
                output.push("");
            }

            if (untracked.length > 0) {
                output.push("Untracked files:");
                untracked.forEach(file => output.push(`  ${file}`));
                output.push("");
            }
        }

        return output;
    }
}
