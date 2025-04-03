import type { CommandArgs } from "./Command";

export function parseCommand(commandStr: string): {
    command: string;
    args: CommandArgs;
} {
    const parts = commandStr.trim().split(/\s+/);
    const command = parts[0]?.toLowerCase() ?? "";

    // Für Git-Befehle, kombiniere "git" und den Subbefehl
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

        // Flags mit Werten: --flag=value
        if (arg.startsWith("--") && arg.includes("=")) {
            const [flag, value] = arg.split("=", 2);
            if (flag && value !== undefined) {
                result.flags[flag.substring(2)] = value;
            }
            continue;
        }

        // Lange Flags: --flag
        if (arg.startsWith("--")) {
            const flag = arg.substring(2);

            // Prüfe, ob der nächste Teil ein Wert ist (kein Flag)
            const nextArg = i + 1 < args.length ? args[i + 1] : undefined;
            if (nextArg !== undefined && !nextArg.startsWith("-")) {
                result.flags[flag] = nextArg;
                i++; // Überspringe den nächsten Teil, da er als Wert verwendet wurde
            } else {
                result.flags[flag] = true;
            }
            continue;
        }

        // Kurze Flags: -a, -abc
        if (arg.startsWith("-") && arg.length > 1) {
            const flags = arg.substring(1).split("");
            for (const flag of flags) {
                result.flags[flag] = true;
            }
            continue;
        }

        // Kein Flag, behandle als positionelles Argument
        result.positionalArgs.push(arg);
    }

    return result;
}
