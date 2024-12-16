"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Terminal } from "~/components/Terminal";
import { Intro } from "~/components/level/Intro";
import { Files } from "~/components/level/Files";
import { Branches } from "~/components/level/Branches";
import { Merge } from "~/components/level/Merge";
import { ProgressBar } from "~/components/ProgessBar";
import { NanoModal } from "~/components/NanoModal";
import { Button } from "~/components/ui/button";

const groups = ["Intro", "Files", "Branches", "Merge"];

export default function Level() {
    const [currentGroup, setCurrentGroup] = useState<string>(groups[0]!);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [isNanoModalOpen, setIsNanoModalOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState({ name: "", content: "" });
    const [isLevelCompleted, setIsLevelCompleted] = useState(false);

    const handleCommandSuccess = () => {
        setScore(prevScore => prevScore + 10);
        setIsLevelCompleted(true);
    };

    const handleNextLevel = () => {
        if (currentLevel < 2) {
            setCurrentLevel(prevLevel => prevLevel + 1);
        } else {
            const currentGroupIndex = groups.indexOf(currentGroup);
            if (currentGroupIndex < groups.length - 1) {
                setCurrentGroup(groups[currentGroupIndex + 1]!);
                setCurrentLevel(1);
            } else {
                // Game completed
                alert("Herzlichen Glückwunsch! Sie haben das Git-Lernspiel abgeschlossen!");
            }
        }
        setIsLevelCompleted(false);
    };

    const handleNanoCommand = (fileName: string, fileContent: string) => {
        setCurrentFile({ name: fileName, content: fileContent });
        setIsNanoModalOpen(true);
    };

    const handleSaveFile = (fileName: string, newContent: string) => {
        // This function will be passed down to the Terminal component
        // to update the file system
    };

    const renderCurrentGroup = () => {
        switch (currentGroup) {
            case "Intro":
                return <Intro currentLevel={currentLevel} />;
            case "Files":
                return <Files currentLevel={currentLevel} />;
            case "Branches":
                return <Branches currentLevel={currentLevel} />;
            case "Merge":
                return <Merge currentLevel={currentLevel} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-center text-3xl font-bold">Git Lernspiel</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Git Terminal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Terminal
                            onCommandSuccess={handleCommandSuccess}
                            currentGroup={currentGroup}
                            currentLevel={currentLevel}
                            onNanoCommand={handleNanoCommand}
                            onSaveFile={handleSaveFile}
                            isLevelCompleted={isLevelCompleted}
                            handleNextLevel={handleNextLevel}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Aktuelle Herausforderung</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderCurrentGroup()}
                        {isLevelCompleted && (
                            <Button className="mt-4 w-full" onClick={handleNextLevel}>
                                Nächstes Level
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
            <ProgressBar score={score} className="mt-6" />
            <NanoModal
                isOpen={isNanoModalOpen}
                onClose={() => setIsNanoModalOpen(false)}
                fileName={currentFile.name}
                fileContent={currentFile.content}
                onSave={(fileName, newContent) => {
                    handleSaveFile(fileName, newContent);
                    setIsNanoModalOpen(false);
                }}
            />
        </div>
    );
}
