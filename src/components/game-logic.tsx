import React from "react";

interface Challenge {
  level: number;
  description: string;
  command: string;
}

interface GameLogicProps {
  currentLevel: number;
}

export function GameLogic({
  currentLevel,
}: GameLogicProps): React.ReactElement {
  const challenges: Challenge[] = [
    {
      level: 1,
      description: "Initialize a new Git repository",
      command: "git init",
    },
    {
      level: 2,
      description: "Check the status of your repository",
      command: "git status",
    },
    {
      level: 3,
      description: "Create a new file called 'example.txt'",
      command: "echo 'Hello, Git!' > example.txt",
    },
    {
      level: 4,
      description: "Stage the new file",
      command: "git add example.txt",
    },
    {
      level: 5,
      description: 'Commit your changes with the message "Initial commit"',
      command: 'git commit -m "Initial commit"',
    },
    { level: 6, description: "Check the status again", command: "git status" },
    // Add more challenges as needed
  ];

  const currentChallenge =
    challenges.find((challenge) => challenge.level === currentLevel) ||
    challenges[challenges.length - 1];

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">
        Level {currentChallenge?.level}
      </h2>
      <p className="mb-4">{currentChallenge?.description}</p>
      <p className="text-muted-foreground text-sm">
        Hint: Try using the command{" "}
        <code className="bg-muted rounded p-1">
          {currentChallenge?.command}
        </code>
      </p>
    </div>
  );
}
