export function GameLogic({ currentLevel }) {
  const challenges = [
    {
      level: 1,
      description: "Initialisiere ein neues Git-Repository",
      command: "git init",
    },
    {
      level: 2,
      description: "Überprüfe den Status deines Repositories",
      command: "git status",
    },
    {
      level: 3,
      description: "Liste den Inhalt des aktuellen Verzeichnisses auf",
      command: "ls",
    },
    {
      level: 4,
      description: "Wechsle in das 'src'-Verzeichnis",
      command: "cd src",
    },
    {
      level: 5,
      description: "Zeige den Inhalt von 'index.js' an",
      command: "cat index.js",
    },
    {
      level: 6,
      description: "Gehe zurück zum übergeordneten Verzeichnis",
      command: "cd ..",
    },
    {
      level: 7,
      description: "Bearbeite die README.md-Datei",
      command: "nano README.md",
    },
    {
      level: 8,
      description: "Füge alle Änderungen zum Staging-Bereich hinzu",
      command: "git add .",
    },
    {
      level: 9,
      description:
        'Committe deine Änderungen mit der Nachricht "Erste Änderungen"',
      command: 'git commit -m "Erste Änderungen"',
    },
    {
      level: 10,
      description: "Herzlichen Glückwunsch! Du hast alle Levels abgeschlossen!",
      command: "",
    },
  ];

  const currentChallenge =
    challenges.find((challenge) => challenge.level === currentLevel) ||
    challenges[challenges.length - 1];

  return (
    <div>
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
    </div>
  );
}
