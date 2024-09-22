"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { GitTerminal } from "~/components/terminal";
import { GameLogic } from "~/components/game-logic";
import { ProgressBar } from "~/components/progress-bar";
import { NanoModal } from "~/components/nano-modal";

export default function GitLearningGame() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isNanoModalOpen, setIsNanoModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState({ name: "", content: "" });

  const handleCommandSuccess = () => {
    setScore((prevScore) => prevScore + 10);
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  const handleNanoCommand = (fileName: string, fileContent: string) => {
    setCurrentFile({ name: fileName, content: fileContent });
    setIsNanoModalOpen(true);
  };

  const handleSaveFile = (fileName: string, newContent: string) => {
    // This function will be passed down to the GitTerminal component
    // to update the file system
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
            <GitTerminal
              onCommandSuccess={handleCommandSuccess}
              currentLevel={currentLevel}
              onNanoCommand={handleNanoCommand}
              onSaveFile={handleSaveFile}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aktuelle Herausforderung</CardTitle>
          </CardHeader>
          <CardContent>
            <GameLogic currentLevel={currentLevel} />
          </CardContent>
        </Card>
      </div>
      <ProgressBar score={score} className="mt-6" />
      <NanoModal
        isOpen={isNanoModalOpen}
        onClose={() => setIsNanoModalOpen(false)}
        fileName={currentFile.name}
        fileContent={currentFile.content}
        onSave={(newContent) => {
          handleSaveFile(currentFile.name, newContent);
          setIsNanoModalOpen(false);
        }}
      />
    </div>
  );
}
