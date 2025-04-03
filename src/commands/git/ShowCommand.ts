import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class ShowCommand implements Command {
    name = "git show";
    description = "Show various types of objects";
    usage = "git show [<object>]";
    examples = ["git show", "git show HEAD", "git show a1b2c3d"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { gitRepository } = context;

        if (!gitRepository.isInitialized()) {
            return ["Not a git repository. Run 'git init' first."];
        }

        let target = "HEAD";
        if (args.positionalArgs.length > 0) {
            target = args.positionalArgs[0] ?? "";
        }

        const commits = gitRepository.getCommits();

        if (Object.keys(commits).length === 0) {
            return [`fatal: ambiguous argument '${target}': unknown revision`];
        }

        // Simplified show output
        const commitId = Object.keys(commits)[Object.keys(commits).length - 1];
        const commit = commitId && commits[commitId];
        if (!commit) {
            return ["Invalid commit ID"];
        }

        return [
            `commit ${commitId}`,
            `Date: ${commit.timestamp.toISOString().split("T")[0]}`,
            "",
            `    ${commit.message}`,
            "",
            "diff --git a/file b/file",
            "new file mode 100644",
            "index 0000000..1234567",
            "--- /dev/null",
            "+++ b/file",
            "@@ -0,0 +1,3 @@",
            "+Line 1",
            "+Line 2",
            "+Line 3",
        ];
    }
}
