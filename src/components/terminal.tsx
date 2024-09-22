"use client";

import { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

type FileSystem = {
  [key: string]: string | FileSystem;
};

type FileStatus = {
  [key: string]: "modified" | "added" | "untracked";
};

export function GitTerminal({
  onCommandSuccess,
  currentLevel,
  onNanoCommand,
  onSaveFile,
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Willkommen im Git Terminal Simulator!",
  ]);
  const [currentDirectory, setCurrentDirectory] = useState("/");
  const [fileSystem, setFileSystem] = useState<FileSystem>({
    "/": {
      "README.md":
        "# Willkommen zum Git Lernspiel\n\nDies ist ein Beispielprojekt.",
      src: {
        "index.js": 'console.log("Hallo, Git!");',
      },
    },
  });
  const [isGitInitialized, setIsGitInitialized] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [fileStatus, setFileStatus] = useState<FileStatus>({});

  useEffect(() => {
    setOutput([
      "Willkommen im Git Terminal Simulator!",
      `\nLevel ${currentLevel} gestartet. Geben Sie 'help' ein für verfügbare Befehle.`,
    ]);
  }, [currentLevel]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim();
    setOutput((prev) => [...prev, `$ ${command}`]);

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
      default:
        setOutput((prev) => [
          ...prev,
          "Befehl nicht erkannt. Versuchen Sie es erneut.",
        ]);
    }

    setInput("");
  };

  const handleGitCommand = (args: string[]) => {
    if (args[0] === "help") {
      handleGitHelpCommand();
      return;
    }

    if (!isGitInitialized && args[0] !== "init") {
      setOutput((prev) => [
        ...prev,
        'Fehler: Git ist noch nicht initialisiert. Verwenden Sie zuerst "git init".',
      ]);
      return;
    }

    switch (args[0]) {
      case "init":
        if (currentLevel === 1 && !completedLevels.includes(1)) {
          setIsGitInitialized(true);
          setOutput((prev) => [...prev, "Leeres Git-Repository initialisiert"]);
          setCompletedLevels((prev) => [...prev, 1]);
          onCommandSuccess();
        } else {
          setOutput((prev) => [
            ...prev,
            "Git-Repository ist bereits initialisiert.",
          ]);
        }
        break;
      case "status":
        handleGitStatus();
        break;
      case "add":
        handleGitAdd(args[1]);
        break;
      case "commit":
        handleGitCommit(args.slice(1).join(" "));
        break;
      default:
        setOutput((prev) => [
          ...prev,
          "Git-Befehl nicht erkannt. Versuchen Sie es erneut.",
        ]);
    }
  };

  const handleGitStatus = () => {
    const modifiedFiles = Object.entries(fileStatus)
      .filter(([_, status]) => status === "modified")
      .map(([file, _]) => file);
    const addedFiles = Object.entries(fileStatus)
      .filter(([_, status]) => status === "added")
      .map(([file, _]) => file);
    const untrackedFiles = Object.entries(fileStatus)
      .filter(([_, status]) => status === "untracked")
      .map(([file, _]) => file);

    const statusOutput = [
      "Auf Branch main",
      modifiedFiles.length > 0
        ? "Änderungen, die nicht zum Commit vorgemerkt sind:"
        : "",
      ...modifiedFiles.map((file) => `\tgeändert:    ${file}`),
      addedFiles.length > 0 ? "Zum Commit vorgemerkte Änderungen:" : "",
      ...addedFiles.map((file) => `\tneu:        ${file}`),
      untrackedFiles.length > 0 ? "Unversionierte Dateien:" : "",
      ...untrackedFiles.map((file) => `\t${file}`),
      modifiedFiles.length === 0 &&
      addedFiles.length === 0 &&
      untrackedFiles.length === 0
        ? "nichts zu committen, Arbeitsverzeichnis sauber"
        : "",
    ].filter(Boolean);

    setOutput((prev) => [...prev, ...statusOutput]);

    if (currentLevel === 2 && !completedLevels.includes(2)) {
      setCompletedLevels((prev) => [...prev, 2]);
      onCommandSuccess();
    }
  };

  const handleGitAdd = (file: string) => {
    if (file === ".") {
      Object.keys(fileStatus).forEach((f) => {
        setFileStatus((prev) => ({ ...prev, [f]: "added" }));
      });
      setOutput((prev) => [...prev, "Alle Änderungen zum Commit vorgemerkt"]);
    } else {
      if (fileStatus[file]) {
        setFileStatus((prev) => ({ ...prev, [file]: "added" }));
        setOutput((prev) => [
          ...prev,
          `Änderungen für ${file} zum Commit vorgemerkt`,
        ]);
      } else {
        setOutput((prev) => [...prev, `Fehler: Datei ${file} nicht gefunden`]);
      }
    }

    if (currentLevel === 8 && !completedLevels.includes(8)) {
      setCompletedLevels((prev) => [...prev, 8]);
      onCommandSuccess();
    }
  };

  const handleGitCommit = (message: string) => {
    if (!message) {
      setOutput((prev) => [
        ...prev,
        "Fehler: Bitte geben Sie eine Commit-Nachricht an",
      ]);
      return;
    }

    const addedFiles = Object.entries(fileStatus)
      .filter(([_, status]) => status === "added")
      .map(([file, _]) => file);

    if (addedFiles.length === 0) {
      setOutput((prev) => [
        ...prev,
        "Fehler: Keine Änderungen zum Commit vorgemerkt",
      ]);
      return;
    }

    setFileStatus((prev) => {
      const newStatus = { ...prev };
      addedFiles.forEach((file) => {
        delete newStatus[file];
      });
      return newStatus;
    });

    setOutput((prev) => [
      ...prev,
      `[main ${Math.random().toString(36).substring(2, 8)}] ${message}`,
      `${addedFiles.length} Dateien geändert`,
    ]);

    if (currentLevel === 9 && !completedLevels.includes(9)) {
      setCompletedLevels((prev) => [...prev, 9]);
      onCommandSuccess();
    }
  };

  const handleCdCommand = (dir: string) => {
    if (!dir) {
      setOutput((prev) => [
        ...prev,
        `Aktuelles Verzeichnis: ${currentDirectory}`,
      ]);
      return;
    }
    if (dir === "..") {
      const parentDir =
        currentDirectory.split("/").slice(0, -1).join("/") || "/";
      setCurrentDirectory(parentDir);
      setOutput((prev) => [...prev, `Verzeichnis gewechselt zu ${parentDir}`]);
      if (
        currentLevel === 6 &&
        !completedLevels.includes(6) &&
        parentDir === "/"
      ) {
        setCompletedLevels((prev) => [...prev, 6]);
        onCommandSuccess();
      }
    } else {
      const newPath = `${currentDirectory}/${dir}`.replace("//", "/");
      if (getDirectoryContents(newPath)) {
        setCurrentDirectory(newPath);
        setOutput((prev) => [...prev, `Verzeichnis gewechselt zu ${newPath}`]);
        if (
          currentLevel === 4 &&
          !completedLevels.includes(4) &&
          newPath === "/src"
        ) {
          setCompletedLevels((prev) => [...prev, 4]);
          onCommandSuccess();
        }
      } else {
        setOutput((prev) => [
          ...prev,
          `Fehler: Verzeichnis ${dir} nicht gefunden`,
        ]);
      }
    }
  };

  const handleCatCommand = (file: string) => {
    if (!file) {
      setOutput((prev) => [
        ...prev,
        "Fehler: Bitte geben Sie einen Dateinamen an",
      ]);
      return;
    }
    const contents = getFileContents(`${currentDirectory}/${file}`);
    if (contents) {
      setOutput((prev) => [...prev, contents]);
      if (
        currentLevel === 5 &&
        !completedLevels.includes(5) &&
        file === "index.js" &&
        currentDirectory === "/src"
      ) {
        setCompletedLevels((prev) => [...prev, 5]);
        onCommandSuccess();
      }
    } else {
      setOutput((prev) => [...prev, `Fehler: Datei ${file} nicht gefunden`]);
    }
  };

  const handleNanoCommand = (file: string) => {
    if (!file) {
      setOutput((prev) => [
        ...prev,
        "Fehler: Bitte geben Sie einen Dateinamen an",
      ]);
      return;
    }
    const filePath = `${currentDirectory}/${file}`;
    const contents = getFileContents(filePath) || "";
    onNanoCommand(file, contents);
    if (
      currentLevel === 7 &&
      !completedLevels.includes(7) &&
      file === "README.md" &&
      currentDirectory === "/"
    ) {
      setCompletedLevels((prev) => [...prev, 7]);
      onCommandSuccess();
    }
  };

  const handleLsCommand = () => {
    const contents = getDirectoryContents(currentDirectory);
    if (contents) {
      setOutput((prev) => [...prev, ...Object.keys(contents)]);
      if (currentLevel === 3 && !completedLevels.includes(3)) {
        setCompletedLevels((prev) => [...prev, 3]);
        onCommandSuccess();
      }
    } else {
      setOutput((prev) => [
        ...prev,
        "Fehler: Verzeichnisinhalt kann nicht aufgelistet werden",
      ]);
    }
  };

  const handleHelpCommand = () => {
    setOutput((prev) => [
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
    setOutput((prev) => [
      ...prev,
      "Verfügbare Git-Befehle:",
      "git init - Initialisiert ein neues Git-Repository",
      "git status - Zeigt den Status des Repositories an",
      "git add [datei] - Fügt Änderungen zum Staging-Bereich hinzu",
      'git commit -m "[nachricht]" - Erstellt einen neuen Commit mit den staged Änderungen',
    ]);
  };

  const handleClearCommand = () => {
    setOutput([]);
  };

  const getDirectoryContents = (path: string): FileSystem | null => {
    const parts = path.split("/").filter(Boolean);
    let current: FileSystem | string = fileSystem["/"];
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
    let current: FileSystem | string = fileSystem["/"];
    for (const part of parts.slice(0, -1)) {
      if (typeof current === "object" && part in current) {
        current = current[part];
      } else {
        return null;
      }
    }
    const fileName = parts[parts.length - 1];
    if (typeof current === "object" && fileName in current) {
      return current[fileName] as string;
    }
    return null;
  };

  const updateFileSystem = (path: string, content: string) => {
    const parts = path.split("/").filter(Boolean);
    const fileName = parts.pop();
    if (!fileName) return;

    let current = fileSystem["/"];
    for (const part of parts) {
      if (!(part in current) || typeof current[part] !== "object") {
        current[part] = {};
      }
      current = current[part] as FileSystem;
    }
    current[fileName] = content;
    setFileSystem({ ...fileSystem });

    // Update file status
    const fullPath = `/${parts.join("/")}/${fileName}`.replace("//", "/");
    if (fileStatus[fullPath]) {
      setFileStatus((prev) => ({ ...prev, [fullPath]: "modified" }));
    } else {
      setFileStatus((prev) => ({ ...prev, [fullPath]: "untracked" }));
    }
  };

  // Add this function to handle file saves from the NanoModal
  const handleSaveFile = (fileName: string, newContent: string) => {
    const filePath = `${currentDirectory}/${fileName}`;
    updateFileSystem(filePath, newContent);
    setOutput((prev) => [...prev, `Datei ${fileName} gespeichert.`]);
  };

  // Pass handleSaveFile to the parent component
  useEffect(() => {
    onSaveFile(handleSaveFile);
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
          onChange={(e) => setInput(e.target.value)}
          placeholder="Befehl eingeben..."
          className="mr-2 flex-grow"
        />
        <Button type="submit">Ausführen</Button>
      </form>
    </div>
  );
}
