"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FileEditor } from "~/components/FileEditor";
import { ProgressBar } from "~/components/ProgressBar";
import { useGameContext } from "~/contexts/GameContext";
import { type LevelType } from "~/types";
import { HelpCircleIcon, ArrowRightIcon, RotateCcw, Shield } from "lucide-react";
import { PageLayout } from "~/components/layout/PageLayout";
import { ClientOnly } from "~/components/ClientOnly";
import dynamic from "next/dynamic";

// Dynamically import Terminal component with SSR disabled
const Terminal = dynamic(() => import("~/components/Terminal").then(mod => ({ default: mod.Terminal })), {
    ssr: false,
});

export default function LevelPage() {
    const {
        currentStage,
        currentLevel,
        isLevelCompleted,
        handleNextLevel,
        levelManager,
        progressManager,
        fileSystem,
        gitRepository,
        resetCurrentLevel,
        resetAllProgress,
        isFileEditorOpen,
        setIsFileEditorOpen,
    } = useGameContext();

    const [currentFile, setCurrentFile] = useState({ name: "", content: "" });
    const [showHints, setShowHints] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

    // Get the current level data
    const levelData: LevelType | null = levelManager.getLevel(currentStage, currentLevel);
    const progress = progressManager.getProgress();

    // Open the file editor for a specific file
    const openFileEditor = (fileName: string) => {
        const content = fileSystem.getFileContents(fileName) ?? "";
        setCurrentFile({ name: fileName, content });
        setIsFileEditorOpen(true);
    };

    // Show a list of user-editable files
    const renderEditableFiles = () => {
        // For simplicity, we'll just show README.md and index.js
        const files = [
            { name: "README.md", path: "/README.md" },
            { name: "index.js", path: "/src/index.js" },
        ];

        return (
            <div className="mt-4">
                <h3 className="mb-2 font-medium text-purple-200">Dateien zum Bearbeiten:</h3>
                <div className="space-y-1">
                    {files.map(file => (
                        <Button
                            key={file.path}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start border-purple-700 text-left text-purple-300 hover:bg-purple-900/50"
                            onClick={() => openFileEditor(file.path)}>
                            {file.name}
                        </Button>
                    ))}
                </div>
            </div>
        );
    };

    // Render the current level's challenge details
    const renderLevelChallenge = () => {
        if (!levelData) {
            return <div className="text-purple-300">Level nicht gefunden</div>;
        }

        return (
            <ClientOnly>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">{levelData.name}</h2>
                    <p className="text-purple-200">{levelData.description}</p>

                    <div>
                        <h3 className="mb-2 font-medium text-purple-200">Ziele:</h3>
                        <ul className="list-inside list-disc space-y-1 text-purple-300">
                            {levelData.objectives.map((objective, index) => (
                                <li key={index}>{objective}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowHints(!showHints)}
                            className="flex items-center border-purple-700 text-purple-300 hover:bg-purple-900/50">
                            <HelpCircleIcon className="mr-1 h-4 w-4" />
                            {showHints ? "Hinweise ausblenden" : "Hinweise anzeigen"}
                        </Button>

                        {isLevelCompleted && (
                            <Button
                                onClick={handleNextLevel}
                                className="flex items-center bg-purple-600 text-white hover:bg-purple-700">
                                <ArrowRightIcon className="mr-1 h-4 w-4" />
                                Nächstes Level
                            </Button>
                        )}
                    </div>

                    {showHints && (
                        <div className="rounded-md border border-purple-700/50 bg-purple-900/30 p-3 text-purple-200">
                            <h3 className="mb-1 font-medium">Hinweise:</h3>
                            <ul className="list-inside list-disc space-y-1">
                                {levelData.hints.map((hint, index) => (
                                    <li key={index}>{hint}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {renderEditableFiles()}

                    <div className="mt-4 border-t border-purple-900/30 pt-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                            className="text-purple-400 hover:bg-purple-900/30 hover:text-purple-200">
                            {showAdvancedOptions ? "Erweiterte Optionen ausblenden" : "Erweiterte Optionen anzeigen"}
                        </Button>

                        {showAdvancedOptions && (
                            <div className="mt-2 space-y-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-amber-800/50 text-amber-400 hover:bg-amber-900/30"
                                    onClick={resetCurrentLevel}>
                                    <RotateCcw className="mr-1 h-4 w-4" />
                                    Level zurücksetzen
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-red-800/50 text-red-400 hover:bg-red-900/30"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Möchtest du wirklich deinen gesamten Fortschritt zurücksetzen?",
                                            )
                                        ) {
                                            resetAllProgress();
                                        }
                                    }}>
                                    <RotateCcw className="mr-1 h-4 w-4" />
                                    Gesamten Fortschritt zurücksetzen
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </ClientOnly>
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
        <PageLayout showLevelInfo>
            <div className="bg-[#1a1625] text-purple-100">
                <div className="container mx-auto p-4">
                    <h1 className="mb-6 text-center text-3xl font-bold text-white">Git Lernspiel</h1>
                    <ProgressBar score={progress.score} maxScore={150} className="mb-6" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Card className="border-purple-900/20 bg-purple-900/10 md:order-2">
                            <CardHeader>
                                <CardTitle className="flex items-center text-white">
                                    <Shield className="mr-2 h-5 w-5 text-purple-400" />
                                    Aktuelle Herausforderung
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
            </div>
        </PageLayout>
    );
}
