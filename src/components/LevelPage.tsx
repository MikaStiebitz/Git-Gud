"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Terminal } from "~/components/Terminal";
import { FileEditor } from "~/components/FileEditor";
import { ProgressBar } from "~/components/ProgressBar";
import { useGameContext } from "~/contexts/GameContext";
import { type LevelType } from "~/types";
import {
    HelpCircleIcon,
    ArrowRightIcon,
    GitBranch,
    Terminal as TerminalIcon,
    BookOpen,
    MessageCircle,
    LightbulbIcon,
    Coffee,
} from "lucide-react";

// Beispiel für eine storyline-basierte Level-Struktur
const storyContext = {
    Intro: {
        1: {
            title: "Willkommen im Team",
            story: `Herzlich willkommen in deinem neuen Job als Entwickler bei TechStart! Ich bin Alex, dein Team-Lead.

              Es ist dein erster Tag und wir wollen dir helfen, schnell produktiv zu werden. Wir nutzen Git für unsere Versionskontrolle - damit verfolgen wir Änderungen im Code und arbeiten im Team zusammen.

              Als erstes musst du ein neues Repository für dein Onboarding-Projekt anlegen. Dafür nutzen wir den Befehl 'git init'.`,
            realWorldContext:
                "In echten Entwicklerteams ist Git unverzichtbar. Es ist das erste Tool, das du bei einem neuen Projekt einrichtest.",
            taskIntroduction: "Lass uns ein neues Repository für dein Projekt erstellen.",
        },
        2: {
            title: "Was ist los in deinem Repo?",
            story: `Großartig! Du hast dein erstes Git-Repository erstellt. Das versteckte .git-Verzeichnis enthält nun alle Informationen, die Git braucht.

              Alex schaut vorbei: "Super! Als nächstes solltest du dir anschauen, was in deinem Repository passiert. Mit 'git status' kannst du jederzeit den aktuellen Zustand überprüfen."`,
            realWorldContext:
                "Entwickler führen 'git status' mehrmals täglich aus, um zu sehen, welche Dateien geändert wurden und welche für den nächsten Commit bereit sind.",
            taskIntroduction: "Überprüfe den Status deines Repositories mit git status.",
        },
    },
    Files: {
        1: {
            title: "Code-Änderungen vorbereiten",
            story: `"Hey!" ruft Sarah, deine Kollegin, "ich sehe, du hast schon mit Git angefangen. Als nächstes solltest du lernen, wie man Änderungen staged."

              Sie erklärt: "Wenn du Dateien änderst, musst du Git explizit sagen, welche Änderungen in den nächsten Commit aufgenommen werden sollen. Das nennt man 'Staging' und funktioniert mit 'git add'."`,
            realWorldContext:
                "Das Staging-Konzept ist ein mächtiges Feature von Git. Es erlaubt dir, nur ausgewählte Änderungen zu committen, während andere noch in Bearbeitung bleiben können.",
            taskIntroduction: "Füge alle Dateien zur Staging-Area hinzu mit git add .",
        },
        2: {
            title: "Dein erster Commit",
            story: `"Super gemacht!" sagt Alex, als er deine Fortschritte sieht. "Du hast Änderungen zur Staging-Area hinzugefügt. Jetzt ist es Zeit für deinen ersten Commit."

              Er erklärt: "Ein Commit ist wie ein Snapshot deines Projekts zu einem bestimmten Zeitpunkt. Jeder Commit braucht eine Nachricht, die beschreibt, was geändert wurde. Das ist wichtig für die Nachvollziehbarkeit."`,
            realWorldContext:
                "Gute Commit-Nachrichten sind in Entwicklerteams extrem wichtig. Sie helfen allen zu verstehen, warum eine Änderung gemacht wurde, nicht nur was geändert wurde.",
            taskIntroduction: "Erstelle deinen ersten Commit mit einer aussagekräftigen Nachricht.",
        },
    },
};

export default function EnhancedLevelPage() {
    const {
        currentStage,
        currentLevel,
        isLevelCompleted,
        handleNextLevel,
        levelManager,
        progressManager,
        fileSystem,
        gitRepository,
    } = useGameContext();

    const [isFileEditorOpen, setIsFileEditorOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState({ name: "", content: "" });
    const [showRealWorldContext, setShowRealWorldContext] = useState(false);
    const [showStory, setShowStory] = useState(true);
    const [hasReadStory, setHasReadStory] = useState(false);

    // Get the current level data
    const levelData: LevelType | null = levelManager.getLevel(currentStage, currentLevel);
    const progress = progressManager.getProgress();
    const storyData = storyContext[currentStage]?.[currentLevel];

    // Mark story as read after a delay
    useEffect(() => {
        if (showStory && !hasReadStory) {
            const timer = setTimeout(() => {
                setHasReadStory(true);
            }, 5000); // Nach 5 Sekunden gilt die Story als gelesen

            return () => clearTimeout(timer);
        }
    }, [showStory, hasReadStory]);

    // Open the file editor for a specific file
    const openFileEditor = (fileName: string) => {
        const content = fileSystem.getFileContents(fileName) || "";
        setCurrentFile({ name: fileName, content });
        setIsFileEditorOpen(true);
    };

    const renderStorySection = () => {
        if (!storyData) return null;

        return (
            <Card className="mb-4 border-purple-900/20 bg-purple-900/10">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-white">
                            <MessageCircle className="mr-2 h-5 w-5 text-purple-400" />
                            {storyData.title}
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:bg-purple-900/30 hover:text-purple-200"
                            onClick={() => setShowStory(!showStory)}>
                            {showStory ? "Ausblenden" : "Story anzeigen"}
                        </Button>
                    </div>
                </CardHeader>
                {showStory && (
                    <CardContent className="border-t border-purple-800/30 bg-purple-900/5">
                        <div className="space-y-4">
                            <div className="relative rounded-lg border border-purple-800/30 bg-purple-900/20 p-4">
                                <p className="whitespace-pre-line italic text-purple-200">{storyData.story}</p>
                                <div className="absolute -top-3 left-4 bg-purple-900/10 px-2 text-xs font-medium text-purple-400">
                                    Story
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center border-purple-700 text-purple-300 hover:bg-purple-900/50"
                                    onClick={() => setShowRealWorldContext(!showRealWorldContext)}>
                                    <LightbulbIcon className="mr-1 h-4 w-4" />
                                    {showRealWorldContext ? "Kontext ausblenden" : "Praxis-Kontext anzeigen"}
                                </Button>

                                {hasReadStory && (
                                    <Button
                                        size="sm"
                                        className="flex items-center bg-purple-600 text-white hover:bg-purple-700"
                                        onClick={() => setShowStory(false)}>
                                        <Coffee className="mr-1 h-4 w-4" />
                                        Verstanden, an die Arbeit!
                                    </Button>
                                )}
                            </div>

                            {showRealWorldContext && (
                                <div className="rounded border border-amber-800/30 bg-amber-900/10 p-3 text-amber-200">
                                    <div className="flex items-center text-sm font-medium text-amber-300">
                                        <LightbulbIcon className="mr-1 h-4 w-4" /> In der realen Entwicklung:
                                    </div>
                                    <p className="mt-1 text-sm">{storyData.realWorldContext}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                )}
            </Card>
        );
    };

    // Render the current level's challenge details
    const renderLevelChallenge = () => {
        if (!levelData || !storyData) {
            return <div className="text-purple-300">Level nicht gefunden</div>;
        }

        return (
            <div className="space-y-4">
                <div className="border-b border-purple-800/30 pb-3">
                    <h2 className="text-xl font-semibold text-white">{levelData.name}</h2>
                    <p className="mt-1 text-purple-200">{storyData.taskIntroduction}</p>
                </div>

                <div>
                    <h3 className="mb-2 font-medium text-purple-200">Ziele:</h3>
                    <ul className="list-inside list-disc space-y-1 text-purple-300">
                        {levelData.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-md border border-purple-700/50 bg-purple-900/30 p-3 text-purple-200">
                    <h3 className="mb-1 flex items-center font-medium">
                        <BookOpen className="mr-1 h-4 w-4 text-purple-400" />
                        Hilfreiche Hinweise:
                    </h3>
                    <ul className="list-inside list-disc space-y-1">
                        {levelData.hints.map((hint, index) => (
                            <li key={index}>{hint}</li>
                        ))}
                    </ul>
                </div>

                {isLevelCompleted && (
                    <div className="flex justify-end">
                        <Button
                            onClick={handleNextLevel}
                            className="flex items-center bg-purple-600 text-white hover:bg-purple-700">
                            <ArrowRightIcon className="mr-1 h-4 w-4" />
                            Nächstes Level
                        </Button>
                    </div>
                )}
            </div>
        );
    };

    // Information about Git status
    const renderGitStatus = () => {
        const status = gitRepository.getStatus();
        const branch = gitRepository.getCurrentBranch();
        const isInitialized = gitRepository.isInitialized();

        if (!isInitialized) {
            return (
                <div className="mt-4 rounded border border-purple-800/30 bg-purple-900/30 px-3 py-2 text-sm">
                    <span className="text-yellow-400">⚠️ Git ist noch nicht initialisiert</span>
                </div>
            );
        }

        const stagedCount = Object.values(status).filter(s => s === "staged").length;
        const modifiedCount = Object.values(status).filter(s => s === "modified").length;
        const untrackedCount = Object.values(status).filter(s => s === "untracked").length;

        return (
            <div className="mt-4 rounded border border-purple-800/30 bg-purple-900/30 px-3 py-2 text-sm">
                <div className="flex items-center justify-between">
                    <span>
                        <span className="text-purple-400">Branch:</span>{" "}
                        <span className="text-purple-200">{branch}</span>
                    </span>
                    <span className="text-xs text-purple-500">Git Status</span>
                </div>

                {stagedCount > 0 && (
                    <div className="mt-1">
                        <span className="text-green-400">● {stagedCount} staged</span>
                    </div>
                )}

                {modifiedCount > 0 && (
                    <div className="mt-1">
                        <span className="text-amber-400">● {modifiedCount} modified</span>
                    </div>
                )}

                {untrackedCount > 0 && (
                    <div className="mt-1">
                        <span className="text-red-400">● {untrackedCount} untracked</span>
                    </div>
                )}

                {stagedCount === 0 && modifiedCount === 0 && untrackedCount === 0 && (
                    <div className="mt-1">
                        <span className="text-green-400">✓ Working tree clean</span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#1a1625] text-purple-100">
            {/* Header */}
            <header className="border-b border-purple-900/20">
                <nav className="container mx-auto flex h-16 items-center px-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <GitBranch className="h-6 w-6 text-purple-400" />
                        <span className="text-xl font-bold text-white">GitGame</span>
                    </Link>
                    <span className="ml-4 text-purple-300">
                        Level {currentLevel} - {currentStage}
                    </span>
                    <div className="ml-auto flex space-x-4">
                        <Link href="/playground">
                            <Button
                                variant="ghost"
                                className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <TerminalIcon className="mr-2 h-4 w-4" />
                                Playground
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button
                                variant="ghost"
                                className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                Home
                            </Button>
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="container mx-auto p-4">
                <h1 className="mb-6 text-center text-3xl font-bold text-white">Git Lernpfad</h1>

                <ProgressBar score={progress.score} maxScore={150} className="mb-6" />

                {/* Story Section */}
                {renderStorySection()}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card className="border-purple-900/20 bg-purple-900/10 md:order-2">
                        <CardHeader>
                            <CardTitle className="flex items-center text-white">
                                <BookOpen className="mr-2 h-5 w-5 text-purple-400" />
                                Aktuelle Aufgabe
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {renderLevelChallenge()}
                            {renderGitStatus()}
                        </CardContent>
                    </Card>

                    <Card className="border-purple-900/20 bg-purple-900/10 md:order-1">
                        <CardHeader>
                            <CardTitle className="text-white">Git Terminal</CardTitle>
                            <CardDescription className="text-purple-400">
                                Führe die Git-Befehle aus, um das Level abzuschließen
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Terminal className="h-[400px] rounded-none" />
                        </CardContent>
                    </Card>
                </div>

                <FileEditor
                    isOpen={isFileEditorOpen}
                    onClose={() => setIsFileEditorOpen(false)}
                    fileName={currentFile.name}
                    initialContent={currentFile.content}
                />
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
