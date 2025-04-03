import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class HelpCommand implements Command {
    name = "help";
    description = "Display help for available commands";
    usage = "help [command]";
    examples = ["help", "help ls", "help git"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        // If a specific command is requested
        if (args.positionalArgs.length > 0) {
            const command = args.positionalArgs[0] ?? "";
            return this.getHelpForCommand(command);
        }

        // General help
        return [
            "Available commands:",
            "  git - Git version control commands (use 'git help' for more)",
            "  ls - List files in current directory",
            "  cd <directory> - Change current directory",
            "  cat <file> - Display contents of a file",
            "  nano <file> - Edit a file",
            "  touch <file> - Create a new empty file",
            "  mkdir <directory> - Create a new directory",
            "  rm <file> - Remove a file",
            "  pwd - Print working directory",
            "  clear - Clear the terminal screen",
            "  help - Show this help message",
            "",
            "For help on a specific command, type: help <command>",
        ];
    }

    private getHelpForCommand(command: string): string[] {
        switch (command) {
            case "ls":
                return [
                    "NAME",
                    "    ls - list directory contents",
                    "",
                    "SYNOPSIS",
                    "    ls [OPTION]... [FILE]...",
                    "",
                    "DESCRIPTION",
                    "    List information about the FILEs (the current directory by default).",
                    "",
                    "OPTIONS",
                    "    -a, --all",
                    "        do not ignore entries starting with .",
                    "",
                    "    -l",
                    "        use a long listing format",
                    "",
                    "EXAMPLES",
                    "    ls       - List files in the current directory",
                    "    ls -a    - List all files, including hidden ones",
                    "    ls -l    - List files in long format with details",
                ];

            case "cd":
                return [
                    "NAME",
                    "    cd - change the working directory",
                    "",
                    "SYNOPSIS",
                    "    cd [directory]",
                    "",
                    "DESCRIPTION",
                    "    Change the current directory to the specified directory.",
                    "    If no directory is given, report the current directory.",
                    "",
                    "EXAMPLES",
                    "    cd          - Show current directory",
                    "    cd /src     - Change to /src directory",
                    "    cd ..       - Go up one directory",
                    "    cd .        - Stay in the current directory",
                ];

            case "git":
                return [
                    "NAME",
                    "    git - the stupid content tracker",
                    "",
                    "SYNOPSIS",
                    "    git [--version] [--help] <command> [<args>]",
                    "",
                    "DESCRIPTION",
                    "    Git is a fast, scalable, distributed revision control system with an",
                    "    unusually rich command set that provides both high-level operations",
                    "    and full access to internals.",
                    "",
                    "COMMON GIT COMMANDS",
                    "    git init       - Create an empty Git repository or reinitialize an existing one",
                    "    git status     - Show the working tree status",
                    "    git add        - Add file contents to the index",
                    "    git commit     - Record changes to the repository",
                    "    git branch     - List, create, or delete branches",
                    "    git checkout   - Switch branches or restore working tree files",
                    "    git merge      - Join two or more development histories together",
                    "",
                    "For more details on a specific git command, use: git help <command>",
                ];

            case "cat":
                return [
                    "NAME",
                    "    cat - concatenate files and print on the standard output",
                    "",
                    "SYNOPSIS",
                    "    cat [FILE]...",
                    "",
                    "DESCRIPTION",
                    "    Concatenate FILE(s) to standard output.",
                    "",
                    "EXAMPLES",
                    "    cat file.txt     - Display the contents of file.txt",
                ];

            case "nano":
                return [
                    "NAME",
                    "    nano - edit files in a simple editor",
                    "",
                    "SYNOPSIS",
                    "    nano [FILE]",
                    "",
                    "DESCRIPTION",
                    "    Opens the specified file for editing. If the file does not exist,",
                    "    it will be created when you save.",
                    "",
                    "EXAMPLES",
                    "    nano file.txt     - Edit file.txt",
                ];

            case "touch":
                return [
                    "NAME",
                    "    touch - change file timestamps or create empty files",
                    "",
                    "SYNOPSIS",
                    "    touch [FILE]...",
                    "",
                    "DESCRIPTION",
                    "    Creates empty files if they do not exist.",
                    "",
                    "EXAMPLES",
                    "    touch file.txt     - Create an empty file named file.txt",
                ];

            case "mkdir":
                return [
                    "NAME",
                    "    mkdir - make directories",
                    "",
                    "SYNOPSIS",
                    "    mkdir [DIRECTORY]...",
                    "",
                    "DESCRIPTION",
                    "    Create the DIRECTORY(ies), if they do not already exist.",
                    "",
                    "EXAMPLES",
                    "    mkdir src     - Create a directory named src",
                ];

            case "rm":
                return [
                    "NAME",
                    "    rm - remove files or directories",
                    "",
                    "SYNOPSIS",
                    "    rm [FILE]...",
                    "",
                    "DESCRIPTION",
                    "    Remove (unlink) the FILE(s).",
                    "",
                    "EXAMPLES",
                    "    rm file.txt     - Remove file.txt",
                ];

            case "pwd":
                return [
                    "NAME",
                    "    pwd - print name of current/working directory",
                    "",
                    "SYNOPSIS",
                    "    pwd",
                    "",
                    "DESCRIPTION",
                    "    Print the full filename of the current working directory.",
                    "",
                    "EXAMPLES",
                    "    pwd     - Show the current directory path",
                ];

            case "clear":
                return [
                    "NAME",
                    "    clear - clear the terminal screen",
                    "",
                    "SYNOPSIS",
                    "    clear",
                    "",
                    "DESCRIPTION",
                    "    Clears the terminal screen.",
                    "",
                    "EXAMPLES",
                    "    clear     - Clear the terminal output",
                ];

            case "help":
                return [
                    "NAME",
                    "    help - display help for commands",
                    "",
                    "SYNOPSIS",
                    "    help [COMMAND]",
                    "",
                    "DESCRIPTION",
                    "    Display help information for the specified command,",
                    "    or a list of available commands if no command is specified.",
                    "",
                    "EXAMPLES",
                    "    help         - Show list of available commands",
                    "    help git     - Show help for the git command",
                    "    help ls      - Show help for the ls command",
                ];

            default:
                return [`No help available for command: ${command}`];
        }
    }
}
