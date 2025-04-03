import type { Command, CommandContext } from "./Command";
import { parseCommand } from "./CommandParser";

export class CommandRegistry {
    private commands: Map<string, Command> = new Map<string, Command>();
    private aliases: Map<string, string> = new Map<string, string>();

    // Befehl registrieren
    register(command: Command): void {
        this.commands.set(command.name, command);
    }

    // Alias registrieren
    registerAlias(alias: string, commandName: string): void {
        if (this.commands.has(commandName)) {
            this.aliases.set(alias, commandName);
        } else {
            console.warn(`Tried to create alias for non-existent command: ${commandName}`);
        }
    }

    // Befehl ausführen
    execute(commandStr: string, context: CommandContext): string[] {
        const { command, args } = parseCommand(commandStr);

        // Versuche, einen Befehl direkt zu finden
        let cmd = this.commands.get(command);

        // Wenn nicht gefunden, versuche Aliase
        if (!cmd && this.aliases.has(command)) {
            const mainCommandName = this.aliases.get(command);
            if (mainCommandName) {
                cmd = this.commands.get(mainCommandName);
            }
        }

        if (!cmd) {
            return [`Command not found: ${command}`];
        }

        // Validiere den Befehl, falls vorhanden
        if (cmd.validate) {
            const validation = cmd.validate(args);
            if (!validation.isValid) {
                return [validation.errorMessage ?? `Invalid usage of command: ${command}`];
            }
        }

        // Führe den Befehl aus
        return cmd.execute(args, context);
    }

    // Alle Befehle für Tab-Completion abrufen
    getTabCompletionCommands(): string[] {
        const commands: string[] = [];

        for (const [name, cmd] of this.commands.entries()) {
            if (cmd.includeInTabCompletion) {
                commands.push(name);
            }
        }

        return commands;
    }

    // Prüfe, ob ein Befehl File-Completion unterstützt
    supportsFileCompletion(command: string): boolean {
        const cmd = this.commands.get(command);
        return !!cmd?.supportsFileCompletion;
    }

    // Hilfsinformationen zu einem Befehl abrufen
    getHelpForCommand(commandName: string): string[] {
        const cmd = this.commands.get(commandName);

        if (!cmd) {
            return [`No help available for command: ${commandName}`];
        }

        const help: string[] = [`Command: ${cmd.name}`, `Description: ${cmd.description}`, `Usage: ${cmd.usage}`];

        if (cmd.examples.length > 0) {
            help.push("Examples:");
            cmd.examples.forEach(example => help.push(`  ${example}`));
        }

        return help;
    }
}
