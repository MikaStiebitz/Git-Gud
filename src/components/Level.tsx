"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Terminal } from "~/components/Terminal";
import { FileEditor } from "~/components/FileEditor";
import { ProgressBar } from "~/components/ProgressBar";
import { useGameContext } from "~/contexts/GameContext";
import { type LevelType } from "~/types";
import { HelpCircleIcon, ArrowRightIcon, RotateCcw, Shield } from "lucide-react";

export default function LevelPage() {
    const { currentStage, currentLevel, isLevelCompleted, handleNextLevel, levelManager, progressManager, fileSystem } =
        useGameContext();

    const [isFileEditorOpen, setIsFileEditorOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState({ name: "", content: "" });
    const [showHints, setShowHints] = useState(false);

    // Get the current level data
    const levelData: LevelType | null = levelManager.getLevel(currentStage, currentLevel);
    const progress = progressManager.getProgress();

    // Open the file editor for a specific file
    const openFileEditor = (fileName: string) => {
        const content = fileSystem.getFileContents(fileName) || "";
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
                <h3 className="mb-2 font-medium">Dateien zum Bearbeiten:</h3>
                <div className="space-y-1">
                    {files.map(file => (
                        <Button
                            key={file.path}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left"
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
            return <div>Level nicht gefunden</div>;
        }

        return (
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">{levelData.name}</h2>
                <p>{levelData.description}</p>

                <div>
                    <h3 className="mb-2 font-medium">Ziele:</h3>
                    <ul className="list-inside list-disc space-y-1">
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
                        className="flex items-center">
                        <HelpCircleIcon className="mr-1 h-4 w-4" />
                        {showHints ? "Hinweise ausblenden" : "Hinweise anzeigen"}
                    </Button>

                    {isLevelCompleted && (
                        <Button onClick={handleNextLevel} className="flex items-center">
                            <ArrowRightIcon className="mr-1 h-4 w-4" />
                            Nächstes Level
                        </Button>
                    )}
                </div>

                {showHints && (
                    <div className="rounded-md bg-amber-50 p-3 text-amber-900 dark:bg-amber-900/20 dark:text-amber-100">
                        <h3 className="mb-1 font-medium">Hinweise:</h3>
                        <ul className="list-inside list-disc space-y-1">
                            {levelData.hints.map((hint, index) => (
                                <li key={index}>{hint}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {renderEditableFiles()}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-center text-3xl font-bold">Git Lernspiel</h1>

            <div className="mb-4 flex items-center justify-between">
                <div className="text-lg font-medium">
                    <span className="text-muted-foreground">Stage: </span>
                    {currentStage}
                    <span className="text-muted-foreground ml-2">Level: </span>
                    {currentLevel}
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => progressManager.resetProgress()}>
                        <RotateCcw className="mr-1 h-4 w-4" />
                        Fortschritt zurücksetzen
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="md:order-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Shield className="mr-2 h-5 w-5" />
                            Aktuelle Herausforderung
                        </CardTitle>
                    </CardHeader>
                    <CardContent>{renderLevelChallenge()}</CardContent>
                </Card>

                <Card className="md:order-1">
                    <CardHeader>
                        <CardTitle>Git Terminal</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Terminal className="h-[400px] rounded-none" />
                    </CardContent>
                </Card>
            </div>

            <ProgressBar score={progress.score} maxScore={150} className="mt-6" />

            <FileEditor
                isOpen={isFileEditorOpen}
                onClose={() => setIsFileEditorOpen(false)}
                fileName={currentFile.name}
                initialContent={currentFile.content}
            />
        </div>
    );
}
