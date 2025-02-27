"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Terminal } from "~/components/Terminal";
import { GitBranch, TerminalIcon, Search, BookOpen, Command } from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";

// Git-Befehle für das Cheat Sheet
const gitCommands = [
    {
        category: "Grundlagen",
        commands: [
            {
                name: "git init",
                description: "Initialisiert ein neues Git Repository",
                usage: "git init",
                example: "git init",
                explanation:
                    "Dieser Befehl erstellt ein neues Git-Repository in deinem aktuellen Verzeichnis. Er legt ein verstecktes `.git`-Verzeichnis an, das alle Git-Metadaten enthält.",
            },
            {
                name: "git status",
                description: "Zeigt den Status des Repositories an",
                usage: "git status",
                example: "git status",
                explanation:
                    "Hiermit kannst du den aktuellen Status deines Repositories sehen - welche Dateien geändert wurden, welche gestaged sind, etc.",
            },
            {
                name: "git add",
                description: "Fügt Änderungen zur Staging-Area hinzu",
                usage: "git add <datei> oder git add .",
                example: "git add index.html",
                explanation:
                    "Mit diesem Befehl markierst du Änderungen für den nächsten Commit. Mit 'git add .' werden alle Änderungen im aktuellen Verzeichnis markiert.",
            },
            {
                name: "git commit",
                description: "Speichert Änderungen im Repository",
                usage: 'git commit -m "<nachricht>"',
                example: 'git commit -m "Fix bug in login form"',
                explanation:
                    "Erstellt einen neuen Commit mit allen gestagten Änderungen. Die Nachricht sollte kurz und präzise beschreiben, was geändert wurde.",
            },
        ],
    },
    {
        category: "Branches",
        commands: [
            {
                name: "git branch",
                description: "Listet alle Branches auf, erstellt oder löscht Branches",
                usage: "git branch [name] [--delete]",
                example: "git branch feature-login",
                explanation:
                    "Ohne Parameter listet dieser Befehl alle vorhandenen Branches auf. Mit einem Namen wird ein neuer Branch erstellt (aber nicht zu ihm gewechselt).",
            },
            {
                name: "git checkout",
                description: "Wechselt zu einem Branch oder stellt Dateien wieder her",
                usage: "git checkout <branch> oder git checkout -b <new-branch>",
                example: "git checkout -b feature-login",
                explanation:
                    "Wechselt zu einem anderen Branch. Mit '-b' wird ein neuer Branch erstellt und gleich zu ihm gewechselt.",
            },
            {
                name: "git merge",
                description: "Führt zwei oder mehr Branches zusammen",
                usage: "git merge <branch>",
                example: "git merge feature-login",
                explanation:
                    "Integriert die Änderungen aus dem angegebenen Branch in den aktuellen Branch. Dies erstellt einen Merge-Commit, wenn es keine Fast-Forward-Situation ist.",
            },
        ],
    },
    {
        category: "Remote-Repositories",
        commands: [
            {
                name: "git clone",
                description: "Klont ein Repository in ein neues Verzeichnis",
                usage: "git clone <url>",
                example: "git clone https://github.com/user/repo.git",
                explanation:
                    "Erstellt eine lokale Kopie eines entfernten Repositories, inklusive aller Branches und History.",
            },
            {
                name: "git pull",
                description: "Holt und integriert Änderungen aus einem Remote-Repository",
                usage: "git pull [remote] [branch]",
                example: "git pull origin main",
                explanation:
                    "Kombiniert 'git fetch' und 'git merge', um Änderungen aus einem Remote-Branch zu holen und in deinen aktuellen Branch zu integrieren.",
            },
            {
                name: "git push",
                description: "Überträgt lokale Änderungen zu einem Remote-Repository",
                usage: "git push [remote] [branch]",
                example: "git push origin main",
                explanation:
                    "Sendet deine lokalen Commits zu einem Remote-Repository. Andere können dann deine Änderungen sehen und holen.",
            },
        ],
    },
    {
        category: "Fortgeschrittene Befehle",
        commands: [
            {
                name: "git rebase",
                description: "Wendet Commits aus einem Branch auf einen anderen an",
                usage: "git rebase <base>",
                example: "git rebase main",
                explanation:
                    "Überträgt deine Änderungen auf die neueste Version des Basis-Branches. Dies erzeugt eine sauberere History als Merges.",
            },
            {
                name: "git stash",
                description: "Speichert Änderungen temporär",
                usage: "git stash [pop]",
                example: "git stash",
                explanation:
                    "Speichert unvollendete Änderungen temporär, damit du zu einem sauberen Arbeitsverzeichnis zurückkehren kannst. Mit 'pop' werden die gespeicherten Änderungen wieder angewendet.",
            },
            {
                name: "git log",
                description: "Zeigt die Commit-History an",
                usage: "git log",
                example: "git log --oneline",
                explanation:
                    "Zeigt die Commit-History mit Details wie Autor, Datum und Nachricht an. Mit verschiedenen Flags kannst du die Ausgabe anpassen.",
            },
        ],
    },
];

export default function Playground() {
    const { commandProcessor } = useGameContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCommand, setSelectedCommand] = useState<any>(null);

    // Filtere Befehle basierend auf dem Suchbegriff
    const filteredCommands = !searchTerm
        ? gitCommands
        : gitCommands
              .map(category => ({
                  category: category.category,
                  commands: category.commands.filter(
                      cmd =>
                          cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cmd.description.toLowerCase().includes(searchTerm.toLowerCase()),
                  ),
              }))
              .filter(category => category.commands.length > 0);

    return (
        <div className="min-h-screen bg-[#1a1625] text-purple-100">
            {/* Header */}
            <header className="border-b border-purple-900/20">
                <nav className="container mx-auto flex h-16 items-center px-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <GitBranch className="h-6 w-6 text-purple-400" />
                        <span className="text-xl font-bold text-white">GitGame</span>
                    </Link>
                    <span className="ml-4 text-purple-300">Playground</span>
                    <div className="ml-auto flex space-x-4">
                        <Link href="/">
                            <Button
                                variant="ghost"
                                className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                Home
                            </Button>
                        </Link>
                        <Link href="/level">
                            <Button className="bg-purple-600 text-white hover:bg-purple-700">
                                Zurück zu den Challenges
                            </Button>
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="container mx-auto p-4">
                <h1 className="mb-6 text-center text-3xl font-bold text-white">Git Playground</h1>
                <p className="mb-8 text-center text-lg text-purple-300">
                    Experimentiere frei mit Git-Befehlen und lerne aus dem Cheat Sheet
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Terminal Side */}
                    <Card className="border-purple-900/20 bg-purple-900/10">
                        <CardHeader>
                            <CardTitle className="flex items-center text-white">
                                <TerminalIcon className="mr-2 h-5 w-5 text-purple-400" />
                                Git Terminal (Freier Modus)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Terminal className="h-[500px] rounded-none" showHelpButton={true} showResetButton={true} />
                        </CardContent>
                    </Card>

                    {/* Cheat Sheet Side */}
                    <Card className="border-purple-900/20 bg-purple-900/10">
                        <CardHeader>
                            <CardTitle className="flex items-center text-white">
                                <BookOpen className="mr-2 h-5 w-5 text-purple-400" />
                                Git Cheat Sheet
                            </CardTitle>
                            <div className="relative mt-2">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-purple-400" />
                                <Input
                                    placeholder="Suche nach Git-Befehlen..."
                                    className="border-purple-800 bg-purple-900/30 pl-8 text-purple-200 placeholder:text-purple-500"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[420px] overflow-y-auto pr-2">
                                {filteredCommands.map((category, index) => (
                                    <div key={index} className="mb-6">
                                        <h3 className="mb-2 font-medium text-purple-300">{category.category}</h3>
                                        <div className="space-y-2">
                                            {category.commands.map((command, cmdIndex) => (
                                                <div
                                                    key={cmdIndex}
                                                    className={`cursor-pointer rounded-md border border-purple-800/40 p-2.5 transition-colors hover:bg-purple-800/20 ${
                                                        selectedCommand === command
                                                            ? "border-purple-600/60 bg-purple-800/30"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setSelectedCommand(selectedCommand === command ? null : command)
                                                    }>
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex items-center font-mono text-sm font-semibold text-white">
                                                            <Command className="mr-1.5 h-3.5 w-3.5 text-purple-400" />
                                                            {command.name}
                                                        </span>
                                                        <span className="text-xs text-purple-400">
                                                            {selectedCommand === command ? "▼" : "▶"}
                                                        </span>
                                                    </div>
                                                    <div className="mt-1 text-sm text-purple-300">
                                                        {command.description}
                                                    </div>

                                                    {selectedCommand === command && (
                                                        <div className="mt-3 rounded border border-purple-800/30 bg-purple-900/20 p-3">
                                                            <div className="mb-2">
                                                                <span className="text-xs font-medium text-purple-400">
                                                                    Verwendung:
                                                                </span>
                                                                <pre className="mt-1 overflow-x-auto rounded bg-black/20 p-1.5 font-mono text-xs text-green-400">
                                                                    {command.usage}
                                                                </pre>
                                                            </div>
                                                            <div className="mb-2">
                                                                <span className="text-xs font-medium text-purple-400">
                                                                    Beispiel:
                                                                </span>
                                                                <pre className="mt-1 overflow-x-auto rounded bg-black/20 p-1.5 font-mono text-xs text-green-400">
                                                                    {command.example}
                                                                </pre>
                                                            </div>
                                                            <div>
                                                                <span className="text-xs font-medium text-purple-400">
                                                                    Erklärung:
                                                                </span>
                                                                <p className="mt-1 text-xs text-purple-200">
                                                                    {command.explanation}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {filteredCommands.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <Search className="mb-2 h-8 w-8 text-purple-500" />
                                        <p className="text-purple-400">Keine Befehle gefunden für "{searchTerm}"</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-2 text-purple-400"
                                            onClick={() => setSearchTerm("")}>
                                            Suche zurücksetzen
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 border-t border-purple-900/20 py-4">
                <div className="container mx-auto px-4 text-center text-purple-400">
                    <p>&copy; {new Date().getFullYear()} GitGame. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
