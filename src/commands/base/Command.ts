import { type FileSystem } from "~/models/FileSystem";
import { type GitRepository } from "~/models/GitRepository";

export interface CommandArgs {
    args: string[];
    flags: Record<string, boolean | string>;
    positionalArgs: string[];
}

export interface CommandContext {
    fileSystem: FileSystem;
    gitRepository: GitRepository;
    currentDirectory: string;
    setCurrentDirectory: (path: string) => void;
}

export interface Command {
    // Metadaten
    name: string;
    description: string;
    usage: string;
    examples: string[];

    // Eigenschaften für Autovervollständigung
    includeInTabCompletion: boolean;
    supportsFileCompletion: boolean;

    // Methode zum Ausführen des Befehls
    execute(args: CommandArgs, context: CommandContext): string[];

    // Methode zur Validierung (optional)
    validate?(args: CommandArgs): { isValid: boolean; errorMessage?: string };
}
