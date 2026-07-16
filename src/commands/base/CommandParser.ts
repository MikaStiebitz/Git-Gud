import type { CommandArgs } from "./Command";

export function parseCommand(commandStr: string): {
    command: string;
    args: CommandArgs;
} {
    // Split the command respecting quotes
    const parts = splitCommandRespectingQuotes(commandStr.trim());
    const command = parts[0]?.toLowerCase() ?? "";

    if (command === "git" && parts.length > 1) {
        return {
            command: `git ${parts[1]?.toLowerCase()}`,
            args: parseArgs(parts.slice(2)),
        };
    }

    return {
        command,
        args: parseArgs(parts.slice(1)),
    };
}

// Split a raw input line into chained commands at unquoted ';' and '&&' separators.
// Quotes are preserved so each part can be parsed normally afterwards.
export function splitChainedCommands(input: string): string[] {
    const parts: string[] = [];
    let current = "";
    let inQuotes = false;
    let quoteChar = "";

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (char === undefined) continue;

        if ((char === '"' || char === "'") && input[i - 1] !== "\\") {
            if (!inQuotes) {
                inQuotes = true;
                quoteChar = char;
            } else if (char === quoteChar) {
                inQuotes = false;
                quoteChar = "";
            }
            current += char;
            continue;
        }

        if (!inQuotes && char === ";") {
            parts.push(current);
            current = "";
            continue;
        }

        if (!inQuotes && char === "&" && input[i + 1] === "&") {
            parts.push(current);
            current = "";
            i++; // Skip the second '&'
            continue;
        }

        current += char;
    }

    parts.push(current);
    return parts.map(part => part.trim()).filter(part => part.length > 0);
}

export function splitCommandRespectingQuotes(commandStr: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    let quoteChar = "";

    for (let i = 0; i < commandStr.length; i++) {
        const char = commandStr[i];

        // Handle quotes (both double and single)
        if ((char === '"' || char === "'") && (i === 0 || commandStr[i - 1] !== "\\")) {
            if (!inQuotes) {
                // Starting a quoted section
                inQuotes = true;
                quoteChar = char;
            } else if (char === quoteChar) {
                // Ending a quoted section if the quote matches the opening quote
                inQuotes = false;
                quoteChar = "";
            } else {
                // This is a different quote character inside quotes, treat as regular character
                current += char;
            }
            continue;
        }

        // Handle spaces - they split arguments when not in quotes
        if (char === " " && !inQuotes) {
            if (current) {
                result.push(current);
                current = "";
            }
            continue;
        }

        // Regular character
        current += char;
    }

    // Add the last part if there is one
    if (current) {
        result.push(current);
    }

    return result;
}

export function parseArgs(args: string[]): CommandArgs {
    const result: CommandArgs = {
        args: [...args], // Original args array
        flags: {},
        positionalArgs: [],
    };

    // Flags that always require a value (never boolean)
    const valueRequiredFlags = ["m", "message", "author", "date", "format", "C", "D", "F", "p", "u"];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        // Skip undefined arguments
        if (arg === undefined) continue;

        if (arg.startsWith("--") && arg.includes("=")) {
            const [flag, value] = arg.split("=", 2);
            if (flag && value !== undefined) {
                result.flags[flag.substring(2)] = value;
            }
            continue;
        }

        if (arg.startsWith("--")) {
            const flag = arg.substring(2);

            // List of flags that are always boolean (never take a value)
            const booleanFlags = ["set-upstream", "force", "all", "amend", "no-edit", "abort", "continue", "soft", "hard", "mixed", "oneline", "graph"];

            if (booleanFlags.includes(flag)) {
                result.flags[flag] = true;
                continue;
            }

            const nextArg = i + 1 < args.length ? args[i + 1] : undefined;
            if (nextArg !== undefined && !nextArg.startsWith("-")) {
                result.flags[flag] = nextArg;
                i++;
            } else {
                result.flags[flag] = true;
            }
            continue;
        }

        if (arg.startsWith("-") && arg.length > 1) {
            const flags = arg.substring(1).split("");

            // List of single-char flags that are always boolean
            const booleanSingleFlags = ["u", "f", "a"];

            // Special handling for single flags that may take values
            if (flags.length === 1) {
                const flag = flags[0] ?? "";

                // Check if this is a boolean flag
                if (booleanSingleFlags.includes(flag)) {
                    result.flags[flag] = true;
                    continue;
                }

                // Check if this flag requires a value
                if (valueRequiredFlags.includes(flag)) {
                    const nextArg = i + 1 < args.length ? args[i + 1] : undefined;
                    if (nextArg !== undefined && !nextArg.startsWith("-")) {
                        result.flags[flag] = nextArg;
                        i++;
                    } else {
                        // Flag requires value but didn't get one - set to empty string to signal incomplete command
                        result.flags[flag] = "";
                    }
                    continue;
                }

                const nextArg = i + 1 < args.length ? args[i + 1] : undefined;
                if (nextArg !== undefined && !nextArg.startsWith("-")) {
                    result.flags[flag] = nextArg;
                    i++; // Skip the next part as it's being used as a value
                    continue;
                }
            }

            // Process as boolean flags if no value follows
            for (const flag of flags) {
                result.flags[flag] = true;
            }
            continue;
        }

        result.positionalArgs.push(arg);
    }

    return result;
}
