import type { StageType, LevelType } from "~/types";

export class LevelManager {
    private stages: Record<string, StageType>;

    constructor() {
        this.stages = {
            Intro: {
                id: "intro",
                name: "Einführung in Git",
                description: "Lerne die Grundlagen von Git",
                icon: "🚀",
                levels: {
                    1: {
                        id: 1,
                        name: "Git initialisieren",
                        description: "Erstelle ein neues Git-Repository",
                        objectives: ["Initialisiere ein neues Git-Repository"],
                        hints: ["Verwende den Befehl git init", "Dies erstellt ein verstecktes .git Verzeichnis"],
                        requirements: [
                            {
                                command: "git init",
                                description: "Initialisiere ein Git-Repository",
                                successMessage: "Gut gemacht! Du hast ein Git-Repository erstellt.",
                            },
                        ],
                    },
                    2: {
                        id: 2,
                        name: "Repository Status",
                        description: "Überprüfe den Status deines Repositories",
                        objectives: ["Zeige den Status deines Git-Repositories an"],
                        hints: [
                            "Verwende den Befehl git status",
                            "Dieser Befehl zeigt dir den aktuellen Status deines Repositories",
                        ],
                        requirements: [
                            {
                                command: "git status",
                                description: "Zeige den Status des Repositories",
                                successMessage: "Perfekt! Du kannst nun den Status deines Repositories sehen.",
                            },
                        ],
                    },
                },
            },
            Files: {
                id: "files",
                name: "Dateioperationen",
                description: "Lerne, wie du Dateien mit Git verwaltest",
                icon: "📁",
                levels: {
                    1: {
                        id: 1,
                        name: "Änderungen stagen",
                        description: "Füge Dateien zur Staging-Area hinzu",
                        objectives: ["Füge alle Dateien zur Staging-Area hinzu"],
                        hints: [
                            "Verwende den Befehl git add .",
                            "Der Punkt steht für 'alle Dateien im aktuellen Verzeichnis'",
                        ],
                        requirements: [
                            {
                                command: "git add",
                                requiresArgs: ["."],
                                description: "Füge alle Dateien zum Staging-Bereich hinzu",
                                successMessage: "Großartig! Du hast alle Dateien zur Staging-Area hinzugefügt.",
                            },
                        ],
                    },
                    2: {
                        id: 2,
                        name: "Änderungen committen",
                        description: "Erstelle einen Commit mit deinen Änderungen",
                        objectives: ["Erstelle einen Commit mit einer Nachricht"],
                        hints: [
                            "Verwende den Befehl git commit -m 'Deine Nachricht'",
                            "Die Nachricht sollte die Änderungen beschreiben",
                        ],
                        requirements: [
                            {
                                command: "git commit",
                                requiresArgs: ["-m"],
                                description: "Erstelle einen Commit mit einer Nachricht",
                                successMessage: "Ausgezeichnet! Du hast erfolgreich einen Commit erstellt.",
                            },
                        ],
                    },
                },
            },
            Branches: {
                id: "branches",
                name: "Arbeiten mit Branches",
                description: "Lerne, wie du mit Branches arbeitest",
                icon: "🌿",
                levels: {
                    1: {
                        id: 1,
                        name: "Branches anzeigen",
                        description: "Zeige alle Branches in deinem Repository",
                        objectives: ["Zeige alle vorhandenen Branches an"],
                        hints: ["Verwende den Befehl git branch", "Dies zeigt dir alle lokalen Branches an"],
                        requirements: [
                            {
                                command: "git branch",
                                description: "Zeige alle Branches an",
                                successMessage: "Sehr gut! Du kannst nun alle Branches in deinem Repository sehen.",
                            },
                        ],
                    },
                    2: {
                        id: 2,
                        name: "Branch erstellen",
                        description: "Erstelle einen neuen Branch und wechsle zu ihm",
                        objectives: ["Erstelle einen neuen Branch namens 'feature' und wechsle zu ihm"],
                        hints: [
                            "Verwende den Befehl git checkout -b feature",
                            "Dies erstellt einen neuen Branch und wechselt gleichzeitig zu ihm",
                        ],
                        requirements: [
                            {
                                command: "git checkout",
                                requiresArgs: ["-b"],
                                description: "Erstelle einen neuen Branch und wechsle zu ihm",
                                successMessage:
                                    "Hervorragend! Du hast einen neuen Branch erstellt und zu ihm gewechselt.",
                            },
                        ],
                    },
                },
            },
            Merge: {
                id: "merge",
                name: "Branches zusammenführen",
                description: "Lerne, wie du Branches zusammenführst",
                icon: "🔀",
                levels: {
                    1: {
                        id: 1,
                        name: "Branches mergen",
                        description: "Führe einen Branch in den aktuellen Branch zusammen",
                        objectives: ["Führe den 'feature' Branch in den 'main' Branch zusammen"],
                        hints: [
                            "Verwende den Befehl git merge feature",
                            "Dies führt den feature-Branch in deinen aktuellen Branch zusammen",
                        ],
                        requirements: [
                            {
                                command: "git merge",
                                requiresArgs: ["any"],
                                description: "Führe einen Branch zusammen",
                                successMessage: "Ausgezeichnet! Du hast erfolgreich einen Branch zusammengeführt.",
                            },
                        ],
                    },
                },
            },
        };
    }

    // Get all stages
    public getAllStages(): Record<string, StageType> {
        return { ...this.stages };
    }

    // Get a specific stage
    public getStage(stageId: string): StageType | null {
        return this.stages[stageId] || null;
    }

    // Get a specific level within a stage
    public getLevel(stageId: string, levelId: number): LevelType | null {
        return this.stages[stageId]?.levels[levelId] || null;
    }

    // Check if a command completes a level requirement
    public checkLevelCompletion(stageId: string, levelId: number, command: string, args: string[]): boolean {
        console.log(`Checking level completion for stage: ${stageId}, level: ${levelId}`);
        console.log(`Command: ${command}, args:`, args);

        const level = this.getLevel(stageId, levelId);
        if (!level) {
            console.log("Level not found");
            return false;
        }

        // Spezialfall für Git-Befehle
        if (command === "git") {
            const gitCommand = args[0]; // z.B. "init", "status", etc.
            const gitArgs = args.slice(1); // Die restlichen Parameter

            console.log(`Git command: ${gitCommand}, Git args:`, gitArgs);

            for (const requirement of level.requirements) {
                console.log("Checking requirement:", requirement);

                // Überprüfe, ob dies der richtige Git-Befehl ist
                // Bei git init wird direkt "git init" überprüft
                if (requirement.command === `git ${gitCommand}` || requirement.command === command) {
                    console.log("Command matches!");

                    // Überprüfe die Argumente, falls erforderlich
                    if (requirement.requiresArgs) {
                        const allArgsMatch = requirement.requiresArgs.every(reqArg => {
                            if (reqArg === "any") {
                                return gitArgs.length > 0;
                            }
                            return gitArgs.includes(reqArg);
                        });

                        console.log("Args required:", requirement.requiresArgs);
                        console.log("Args match:", allArgsMatch);

                        if (!allArgsMatch) return false;
                    }

                    return true;
                }
            }
        } else {
            // Nicht-Git-Befehle
            for (const requirement of level.requirements) {
                if (requirement.command === command) {
                    if (requirement.requiresArgs) {
                        const allArgsMatch = requirement.requiresArgs.every(reqArg => {
                            if (reqArg === "any") {
                                return args.length > 0;
                            }
                            return args.includes(reqArg);
                        });

                        if (!allArgsMatch) return false;
                    }

                    return true;
                }
            }
        }

        return false;
    }

    // Get next level information
    public getNextLevel(stageId: string, levelId: number): { stageId: string; levelId: number } {
        const stage = this.getStage(stageId);
        if (!stage) return { stageId, levelId };

        const levelIds = Object.keys(stage.levels).map(id => parseInt(id));
        const maxLevelId = Math.max(...levelIds);

        if (levelId < maxLevelId) {
            // Move to the next level in the same stage
            return { stageId, levelId: levelId + 1 };
        } else {
            // Move to the first level of the next stage
            const stageIds = Object.keys(this.stages);
            const currentStageIndex = stageIds.indexOf(stageId);

            if (currentStageIndex < stageIds.length - 1) {
                const nextStageId = stageIds[currentStageIndex + 1];
                return { stageId: nextStageId, levelId: 1 };
            }
        }

        // No next level - game completed
        return { stageId, levelId };
    }

    // Add a custom level (for extensibility)
    public addCustomLevel(stageId: string, level: LevelType): boolean {
        const stage = this.getStage(stageId);
        if (!stage) return false;

        stage.levels[level.id] = level;
        return true;
    }
}
