import type { CommandArgs } from "./Command";

export function parseCommand(commandStr: string): {
    command: string;
    args: CommandArgs;
} {
    const parts = commandStr.trim().split(/\s+/);
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

export function parseArgs(args: string[]): CommandArgs {
    const result: CommandArgs = {
        args: [...args], // Original args array
        flags: {},
        positionalArgs: [],
    };

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

            // Special handling for single flags that may take values
            if (flags.length === 1) {
                const flag = flags[0] ?? "";
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
