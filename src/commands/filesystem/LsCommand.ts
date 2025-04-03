import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class LsCommand implements Command {
    name = "ls";
    description = "List directory contents";
    usage = "ls [options]";
    examples = ["ls", "ls -a", "ls -l"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        const { fileSystem } = context;

        // Parse options
        const options = {
            all: false, // -a or --all
            long: false, // -l
        };

        // Check for options in flags
        options.all = args.flags.a !== undefined || args.flags.all !== undefined;
        options.long = args.flags.l !== undefined;

        const contents = fileSystem.getDirectoryContents(context.currentDirectory);
        if (!contents) {
            return ["Cannot list directory contents."];
        }

        // Filter files based on options
        let fileNames = Object.keys(contents);

        // If not showing all files, filter out hidden files (starting with .)
        if (!options.all) {
            fileNames = fileNames.filter(name => !name.startsWith("."));
        }

        // Sort alphabetically (with . files first if showing them)
        fileNames.sort((a, b) => {
            const aIsHidden = a.startsWith(".");
            const bIsHidden = b.startsWith(".");

            if (aIsHidden && !bIsHidden) return -1;
            if (!aIsHidden && bIsHidden) return 1;
            return a.localeCompare(b);
        });

        // If long format is requested, add details
        if (options.long) {
            return fileNames.map(name => {
                const item = contents[name];
                const type = item?.type === "directory" ? "d" : "-";
                const permissions = "rw-r--r--"; // Simplified permissions
                const owner = "user";
                const group = "group";
                const size = item?.content?.length ?? 0;
                const date = item?.lastModified
                    ? item.lastModified.toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0];

                return `${type}${permissions} ${owner} ${group} ${size.toString().padStart(8)} ${date} ${name}${item?.type === "directory" ? "/" : ""}`;
            });
        }

        // Simple listing with directories having a trailing slash
        return fileNames.map(name => {
            const item = contents[name];
            return item?.type === "directory" ? `${name}/` : name;
        });
    }
}
