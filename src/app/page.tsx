"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { GitTerminal } from "~/components/terminal";
import { GameLogic } from "~/components/game-logic";
import { ProgressBar } from "~/components/progress-bar";

export default function GitLearningGame(): React.ReactElement {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);

  const handleCommandSuccess = (): void => {
    setScore((prevScore) => prevScore + 10);
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Git Learning Game</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Git Terminal</CardTitle>
          </CardHeader>
          <CardContent>
            <GitTerminal onCommandSuccess={handleCommandSuccess} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <GameLogic currentLevel={currentLevel} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar score={score} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
