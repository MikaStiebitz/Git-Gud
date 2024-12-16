"use client";
import { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { stages } from "~/components/level/stages";

type FileSystem = {
    [key: string]: string | FileSystem;
};

type FileStatus = "untracked" | "modified" | "staged";

type GitStatus = Record<string, FileStatus>;

type StageLevel = Record<number, Requirement>;

type Stages = Record<string, StageLevel>;

interface TerminalProps {
    onCommandSuccess: () => void;
    currentGroup: string;
    currentLevel: number;
    onNanoCommand: (file: string, contents: string) => void;
    onSaveFile: (callback: (fileName: string, content: string) => void) => void;
    isLevelCompleted: boolean;
    handleNextLevel: () => void;
}

interface Requirement {
    command: string;
    requiresArgs?: string[];
}

export function Terminal({
    onCommandSuccess,
    currentGroup,
    currentLevel,
    onNanoCommand,
    onSaveFile,
    isLevelCompleted,
    handleNextLevel,
}: TerminalProps) {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState(["Willkommen im Git Terminal Simulator!"]);
    const [currentDirectory, setCurrentDirectory] = useState("/");
    const [fileSystem, setFileSystem] = useState<FileSystem>({
        "/": {
            "README.md": "# Willkommen zum Git Lernspiel\n\nDies ist ein Beispielprojekt.",
            src: {
                "index.js": 'console.log("Hallo, Git!");',
            },
        },
    });
    const [isGitInitialized, setIsGitInitialized] = useState(false);
    const [gitStatus, setGitStatus] = useState<GitStatus>({});

    useEffect(() => {
        setOutput([
            "Willkommen im Git Terminal Simulator!",
            `
${currentGroup} - Level ${currentLevel} gestartet. Geben Sie 'help' ein für verfügbare Befehle.`,
        ]);
    }, [currentGroup, currentLevel]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const command = input.trim().toLowerCase();
        setOutput(prev => [...prev, `$ ${command}`]);

        const [cmd, ...args] = command.split(" ");

        switch (cmd) {
            case "git":
                handleGitCommand(args);
                break;
            case "cd":
                handleCdCommand(args[0]);
                break;
            case "cat":
                handleCatCommand(args[0]);
                break;
            case "nano":
                handleNanoCommand(args[0]);
                break;
            case "ls":
                handleLsCommand();
                break;
            case "help":
                handleHelpCommand();
                break;
            case "clear":
                handleClearCommand();
                break;
            case "next":
                if (!isLevelCompleted) {
                    setOutput(prev => [...prev, "Fehler: Level nicht abgeschlossen"]);
                    break;
                }
                handleNextLevel();
                break;
            default:
                setOutput(prev => [...prev, "Befehl nicht erkannt. Versuchen Sie es erneut."]);
        }

        setInput("");
    };

    const checkLevelCompletion = (args: string[]) => {
        // Type assertion for stages object
        const stagesLevel = stages as Stages;

        // Safe property access with type checking
        const currentStage = stagesLevel[currentGroup];
        if (!currentStage) return false;

        const requirement = currentStage[currentLevel];
        if (!requirement) return false;

        // Type guard for requirement with args
        const hasRequiredArgs = (req: Requirement): req is Required<Requirement> => {
            return Array.isArray(req.requiresArgs);
        };

        if (hasRequiredArgs(requirement)) {
            return requirement.requiresArgs.every((reqArg: string) => {
                if (reqArg === "any") {
                    return args.length > 0;
                }
                return args.includes(reqArg);
            });
        }

        return true;
    };

    const handleGitCommand = (args: string[]) => {
        if (args[0] === "help") {
            handleGitHelpCommand();
            return;
        }

        if (!isGitInitialized && args[0] !== "init") {
            setOutput(prev => [...prev, 'Fehler: Git ist noch nicht initialisiert. Verwenden Sie zuerst "git init".']);
            return;
        }

        switch (args[0]) {
            case "init":
                if (!isGitInitialized) {
                    setIsGitInitialized(true);
                    setOutput(prev => [...prev, "Leeres Git-Repository initialisiert"]);
                } else {
                    setOutput(prev => [...prev, "Git-Repository ist bereits initialisiert."]);
                }
                break;
            case "status":
                const statusOutput = getGitStatusOutput();
                setOutput(prev => [...prev, ...statusOutput]);
                break;
            case "add":
                if (args[1] === ".") {
                    const stagedFiles = handleGitAddAll();
                    if (stagedFiles.length > 0) {
                        setOutput(prev => [...prev, `${stagedFiles.length} Datei(en) zum Commit vorgemerkt:`]);
                        stagedFiles.forEach(file => {
                            setOutput(prev => [...prev, `  ${file}`]);
                        });
                    } else {
                        setOutput(prev => [...prev, "Keine Änderungen zum Vormerken gefunden."]);
                    }
                } else if (args[1]) {
                    const file = args[1];
                    if (gitStatus[file] && gitStatus[file] !== "staged") {
                        setGitStatus(prev => ({ ...prev, [file]: "staged" }));
                        setOutput(prev => [...prev, `Änderungen für ${file} zum Commit vorgemerkt`]);
                    } else {
                        setOutput(prev => [...prev, `Fehler: Datei ${file} nicht gefunden oder bereits vorgemerkt`]);
                    }
                } else {
                    setOutput(prev => [...prev, "Fehler: Bitte geben Sie eine Datei zum Vormerken an"]);
                }
                break;
            case "commit":
                if (args[1] === "-m" && args[2]) {
                    const stagedFiles = Object.entries(gitStatus).filter(([_, status]) => status === "staged");
                    if (stagedFiles.length > 0) {
                        setOutput(prev => [
                            ...prev,
                            `[main f7d1e1d] ${args[2]}`,
                            `${stagedFiles.length} Datei(en) geändert`,
                        ]);
                        setGitStatus({});
                    } else {
                        setOutput(prev => [...prev, "Fehler: Keine Änderungen zum Committen"]);
                    }
                } else {
                    setOutput(prev => [...prev, "Fehler: Bitte geben Sie eine Commit-Nachricht an"]);
                }
                break;
            case "branch":
                setOutput(prev => [...prev, "* main"]);
                break;
            case "checkout":
                console.log("args", args);
                if (args[1] === "-b" && args[2]) {
                    setOutput(prev => [...prev, `Switched to a new branch '${args[2]}'`]);
                } else {
                    setOutput(prev => [...prev, "Fehler: Ungültiger checkout Befehl"]);
                }
                break;
            case "merge":
                if (args[0]) {
                    setOutput(prev => [...prev, `Merging branch '${args[0]}' into current branch`]);
                } else {
                    setOutput(prev => [...prev, "Fehler: Bitte geben Sie einen Branch-Namen zum Mergen an"]);
                }
                break;
            default:
                setOutput(prev => [...prev, "Git-Befehl nicht erkannt. Versuchen Sie es erneut."]);
        }

        if (checkLevelCompletion(args.slice(1))) {
            onCommandSuccess();
        }
    };

    const handleGitAddAll = () => {
        const stagedFiles: string[] = [];
        const newGitStatus = { ...gitStatus };

        const addFilesRecursively = (dir: string, path: string) => {
            const contents = getDirectoryContents(dir);
            if (contents) {
                Object.entries(contents).forEach(([name, content]) => {
                    const fullPath = `${path}/${name}`.replace(/^\//, "");
                    if (typeof content === "string") {
                        if (newGitStatus[fullPath] !== "staged") {
                            newGitStatus[fullPath] = "staged";
                            stagedFiles.push(fullPath);
                        }
                    } else {
                        addFilesRecursively(`${dir}/${name}`, fullPath);
                    }
                });
            }
        };

        addFilesRecursively("/", "");
        setGitStatus(newGitStatus);
        return stagedFiles;
    };

    const getGitStatusOutput = () => {
        const output = ["Auf Branch main"];
        const untracked: string[] = [];
        const modified: string[] = [];
        const staged: string[] = [];

        Object.entries(gitStatus).forEach(([file, status]) => {
            switch (status) {
                case "untracked":
                    untracked.push(file);
                    break;
                case "modified":
                    modified.push(file);
                    break;
                case "staged":
                    staged.push(file);
                    break;
            }
        });

        if (untracked.length === 0 && modified.length === 0 && staged.length === 0) {
            output.push("Nichts zu committen, Arbeitsverzeichnis sauber");
        } else {
            if (staged.length > 0) {
                output.push("Zum Commit vorgemerkte Änderungen:");
                staged.forEach(file => output.push(`  ${file}`));
            }
            if (modified.length > 0) {
                output.push("Änderungen, die nicht zum Commit vorgemerkt sind:");
                modified.forEach(file => output.push(`  ${file}`));
            }
            if (untracked.length > 0) {
                output.push("Unversionierte Dateien:");
                untracked.forEach(file => output.push(`  ${file}`));
            }
        }

        return output;
    };

    const handleCdCommand = (dir: string | undefined) => {
        if (!dir) {
            setOutput(prev => [...prev, `Aktuelles Verzeichnis: ${currentDirectory}`]);
            return;
        }
        if (dir === "..") {
            const parentDir = currentDirectory.split("/").slice(0, -1).join("/");
            setCurrentDirectory(parentDir || "/");
            setOutput(prev => [...prev, `Verzeichnis gewechselt zu ${parentDir || "/"}`]);
        } else {
            const newPath = `${currentDirectory}/${dir}`.replace("//", "/");
            if (getDirectoryContents(newPath)) {
                setCurrentDirectory(newPath);
                setOutput(prev => [...prev, `Verzeichnis gewechselt zu ${newPath}`]);
            } else {
                setOutput(prev => [...prev, `Fehler: Verzeichnis ${dir} nicht gefunden`]);
            }
        }
    };

    const handleCatCommand = (file: string | undefined) => {
        if (!file) {
            setOutput(prev => [...prev, "Fehler: Bitte geben Sie einen Dateinamen an"]);
            return;
        }
        const contents = getFileContents(`${currentDirectory}/${file}`);
        if (contents) {
            setOutput(prev => [...prev, contents]);
        } else {
            setOutput(prev => [...prev, `Fehler: Datei ${file} nicht gefunden`]);
        }
    };

    const handleNanoCommand = (file: string | undefined) => {
        if (!file) {
            setOutput(prev => [...prev, "Fehler: Bitte geben Sie einen Dateinamen an"]);
            return;
        }
        const filePath = `${currentDirectory}/${file}`;
        const contents = getFileContents(filePath) ?? "";
        onNanoCommand(file, contents);
    };

    const handleLsCommand = () => {
        const contents = getDirectoryContents(currentDirectory);
        if (contents) {
            setOutput(prev => [...prev, ...Object.keys(contents)]);
        } else {
            setOutput(prev => [...prev, "Fehler: Verzeichnisinhalt kann nicht aufgelistet werden"]);
        }
    };

    const handleHelpCommand = () => {
        setOutput(prev => [
            ...prev,
            "Verfügbare Befehle:",
            "help - Zeigt diese Hilfe an",
            "git help - Zeigt Git-spezifische Hilfe an",
            "ls - Listet Dateien und Verzeichnisse auf",
            "cd [verzeichnis] - Wechselt das Verzeichnis",
            "cat [datei] - Zeigt den Inhalt einer Datei an",
            "nano [datei] - Bearbeitet eine Datei",
            "git [befehl] - Führt Git-Befehle aus",
            "clear - Löscht den Terminalinhalt",
        ]);
    };

    const handleGitHelpCommand = () => {
        setOutput(prev => [
            ...prev,
            "Verfügbare Git-Befehle:",
            "git init - Initialisiert ein neues Git-Repository",
            "git status - Zeigt den Status des Repositories an",
            "git add [datei] - Fügt Änderungen zum Staging-Bereich hinzu",
            'git commit -m "[nachricht]" - Erstellt einen neuen Commit mit den staged Änderungen',
            "git branch - Zeigt alle Branches an",
            "git checkout -b [branch-name] - Erstellt einen neuen Branch und wechselt zu ihm",
            "git merge [branch-name] - Führt den angegebenen Branch in den aktuellen Branch zusammen",
        ]);
    };

    const handleClearCommand = () => {
        setOutput([]);
    };

    const getDirectoryContents = (path: string): FileSystem | null => {
        const parts = path.split("/").filter(Boolean);
        let current: FileSystem | string | undefined = fileSystem["/"];
        for (const part of parts) {
            if (typeof current === "object" && part in current) {
                current = current[part];
            } else {
                return null;
            }
        }
        return typeof current === "object" ? current : null;
    };

    const getFileContents = (path: string): string | null => {
        const parts = path.split("/").filter(Boolean);
        let current: FileSystem | string | undefined = fileSystem["/"];
        for (const part of parts.slice(0, -1)) {
            if (typeof current === "object" && part in current) {
                current = current[part];
            } else {
                return null;
            }
        }
        const fileName = parts[parts.length - 1] ?? "";
        if (typeof current === "object" && fileName in current) {
            return current[fileName] as string;
        }
        return null;
    };

    const updateFileSystem = (path: string, content: string) => {
        const parts = path.split("/").filter(Boolean);
        const fileName = parts.pop();
        if (!fileName) return;

        let current: FileSystem = fileSystem["/"] as FileSystem;
        for (const part of parts) {
            if (!(part in current) || typeof current[part] === "string") {
                current[part] = {} as FileSystem;
            }
            current = current[part]!;
        }
        current[fileName] = content;
        setFileSystem({ ...fileSystem });

        // Update git status when a file is modified
        setGitStatus(prev => ({
            ...prev,
            [parts.join("/") + "/" + fileName]:
                prev[parts.join("/") + "/" + fileName] === "staged" ? "staged" : "modified",
        }));
    };

    // Add this function to handle file saves from the NanoModal
    const handleSaveFile = (fileName: string, newContent: string) => {
        const filePath = `${currentDirectory}/${fileName}`;
        updateFileSystem(filePath, newContent);
        setOutput(prev => [...prev, `Datei ${fileName} gespeichert.`]);
    };

    // Pass handleSaveFile to the parent component
    useEffect(() => {
        onSaveFile(handleSaveFile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSaveFile, currentDirectory]);

    return (
        <div className="flex h-[300px] flex-col">
            <ScrollArea className="mb-4 flex-grow bg-black p-2 font-mono text-sm text-green-500">
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </ScrollArea>
            <form onSubmit={handleCommand} className="flex">
                <Input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Befehl eingeben..."
                    className="mr-2 flex-grow"
                />
                <Button type="submit">Ausführen</Button>
            </form>
        </div>
    );
}
