import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class LogCommand implements Command {
    name = "git log";
    description = "Show commit logs";
    usage = "git log [options]";
    examples = ["git log", "git log --oneline", "git log --graph"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        // Handle --oneline flag
        const isOneline = args.flags.oneline !== undefined;
        // Handle --graph flag (simplified - we don't actually show a graph)
        const showGraph = args.flags.graph !== undefined;

        const commits = gitRepository.getCommits();

        if (Object.keys(commits).length === 0) {
            return ["No commits yet"];
        }

        const output: string[] = [];

        // Show commits in reverse chronological order (newest first)
        Object.entries(commits)
            .reverse()
            .forEach(([commitId, commit]) => {
                const shortId = commitId.substring(0, 7);
                const date = commit.timestamp.toISOString().split("T")[0];

                if (isOneline) {
                    const graphPrefix = showGraph ? "* " : "";
                    output.push(`${graphPrefix}${shortId} ${commit.message}`);
                } else {
                    output.push(`commit ${commitId}`);
                    output.push(`Date: ${date}`);
                    output.push("");
                    output.push(`    ${commit.message}`);
                    output.push("");
                }
            });

        return output;
    }
}
