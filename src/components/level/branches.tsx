import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function Branches({ currentLevel }) {
  const challenges = [
    {
      level: 1,
      description: "Zeige alle vorhandenen Branches an",
      command: "git branch",
    },
    {
      level: 2,
      description:
        "Erstelle einen neuen Branch namens 'feature' und wechsle zu ihm",
      command: "git checkout -b feature",
    },
  ];

  const currentChallenge =
    challenges.find((challenge) => challenge.level === currentLevel) ||
    challenges[challenges.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Arbeiten mit Branches</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="mb-2 text-xl font-semibold">
          Level {currentChallenge.level}
        </h2>
        <p className="mb-4">{currentChallenge.description}</p>
        {currentChallenge.command && (
          <p className="text-muted-foreground text-sm">
            Tipp: Versuche den Befehl{" "}
            <code className="bg-muted rounded p-1">
              {currentChallenge.command}
            </code>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
