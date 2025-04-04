# Git Commands Implementation Guide

This document explains how Git commands are implemented in the GitGud learning platform and how to add new commands.

## Command Architecture

Commands in GitGud are implemented using a class-based architecture with the following components:

- **Command Interface**: Defines the structure of all commands (`src/commands/base/Command.ts`)
- **CommandRegistry**: Central registry for all commands (`src/commands/base/CommandRegistry.ts`)
- **CommandParser**: Parses command strings into structured arguments (`src/commands/base/CommandParser.ts`)

### Command Interface

All commands implement this interface:

```typescript
export interface Command {
    // Metadata
    name: string;
    description: string;
    usage: string;
    examples: string[];

    // Tab completion properties
    includeInTabCompletion: boolean;
    supportsFileCompletion: boolean;

    // Method to execute the command
    execute(args: CommandArgs, context: CommandContext): string[];

    // Optional validation method
    validate?(args: CommandArgs): { isValid: boolean; errorMessage?: string };
}
```

### Adding a New Command

1. Create a new TypeScript file in the appropriate category folder:

    - Git commands: `src/commands/git/`
    - Filesystem commands: `src/commands/filesystem/`
    - Helper commands: `src/commands/helpers/`

2. Implement the Command interface:

```typescript
import type { Command, CommandArgs, CommandContext } from "../base/Command";

export class MyNewCommand implements Command {
    name = "command-name";
    description = "Description of what the command does";
    usage = "command-name [options]";
    examples = ["command-name example"];
    includeInTabCompletion = true;
    supportsFileCompletion = false;

    execute(args: CommandArgs, context: CommandContext): string[] {
        // Command implementation logic
        // Return string array with command output lines
        return ["Command output"];
    }

    // Optional validation
    validate(args: CommandArgs): { isValid: boolean; errorMessage?: string } {
        return { isValid: true };
    }
}
```

3. Register the new command in `src/commands/index.ts`:

```typescript
import { MyNewCommand } from "./category/MyNewCommand";
// ...
registry.register(new MyNewCommand());
```

## Command Context

Commands have access to these components through the CommandContext:

- **fileSystem**: Manage files and directories
- **gitRepository**: Manage Git state (branches, commits, etc.)
- **currentDirectory**: The current working directory
- **setCurrentDirectory**: Function to change the current directory

Use these to implement command behavior, for example:

```typescript
// Inside your execute method:
const { fileSystem, gitRepository, currentDirectory } = context;

// Check Git state
if (!gitRepository.isInitialized()) {
    return ["Not a git repository. Run 'git init' first."];
}

// File operations
fileSystem.writeFile("/path/to/file", "content");

// Directory operations
const contents = fileSystem.getDirectoryContents(currentDirectory);
```

## Command Arguments

The CommandArgs object provides structured access to arguments:

- **args**: Original arguments array
- **flags**: Object containing all flags (like `--option` or `-o`)
- **positionalArgs**: Array of positional arguments

Example parsing:

```typescript
// For command: git commit -m "My message" --verbose
{
    args: ["-m", "My message", "--verbose"],
    flags: {
        "m": "My message",
        "verbose": true
    },
    positionalArgs: []
}
```

## Testing Commands

When adding a new command, test it thoroughly in the playground mode to ensure it:

1. Handles all expected argument formats
2. Provides useful error messages for invalid input
3. Correctly interacts with the file system and Git repository
4. Returns helpful output messages

## Command Limitations

Note that the Git implementation in GitGud is a simulation, not a full Git implementation. Some advanced features and edge cases may behave differently than real Git.
