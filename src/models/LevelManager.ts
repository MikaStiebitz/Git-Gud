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
                        // Neu: Story-Kontext für jedes Level
                        story: {
                            title: "Willkommen im Team",
                            narrative: `Herzlich willkommen in deinem neuen Job als Entwickler bei TechStart! Ich bin Alex, dein Team-Lead.

              Es ist dein erster Tag und wir wollen dir helfen, schnell produktiv zu werden. Wir nutzen Git für unsere Versionskontrolle - damit verfolgen wir Änderungen im Code und arbeiten im Team zusammen.

              Als erstes musst du ein neues Repository für dein Onboarding-Projekt anlegen. Dafür nutzen wir den Befehl 'git init'.`,
                            realWorldContext:
                                "In echten Entwicklerteams ist Git unverzichtbar. Es ist das erste Tool, das du bei einem neuen Projekt einrichtest.",
                            taskIntroduction: "Lass uns ein neues Repository für dein Projekt erstellen.",
                        },
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
                        story: {
                            title: "Was ist los in deinem Repo?",
                            narrative: `Großartig! Du hast dein erstes Git-Repository erstellt. Das versteckte .git-Verzeichnis enthält nun alle Informationen, die Git braucht.

              Alex schaut vorbei: "Super! Als nächstes solltest du dir anschauen, was in deinem Repository passiert. Mit 'git status' kannst du jederzeit den aktuellen Zustand überprüfen."`,
                            realWorldContext:
                                "Entwickler führen 'git status' mehrmals täglich aus, um zu sehen, welche Dateien geändert wurden und welche für den nächsten Commit bereit sind.",
                            taskIntroduction: "Überprüfe den Status deines Repositories mit git status.",
                        },
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
                        story: {
                            title: "Code-Änderungen vorbereiten",
                            narrative: `"Hey!" ruft Sarah, deine Kollegin, "ich sehe, du hast schon mit Git angefangen. Als nächstes solltest du lernen, wie man Änderungen staged."

              Sie erklärt: "Wenn du Dateien änderst, musst du Git explizit sagen, welche Änderungen in den nächsten Commit aufgenommen werden sollen. Das nennt man 'Staging' und funktioniert mit 'git add'."`,
                            realWorldContext:
                                "Das Staging-Konzept ist ein mächtiges Feature von Git. Es erlaubt dir, nur ausgewählte Änderungen zu committen, während andere noch in Bearbeitung bleiben können.",
                            taskIntroduction: "Füge alle Dateien zur Staging-Area hinzu mit git add .",
                        },
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
                        story: {
                            title: "Dein erster Commit",
                            narrative: `"Super gemacht!" sagt Alex, als er deine Fortschritte sieht. "Du hast Änderungen zur Staging-Area hinzugefügt. Jetzt ist es Zeit für deinen ersten Commit."

              Er erklärt: "Ein Commit ist wie ein Snapshot deines Projekts zu einem bestimmten Zeitpunkt. Jeder Commit braucht eine Nachricht, die beschreibt, was geändert wurde. Das ist wichtig für die Nachvollziehbarkeit."`,
                            realWorldContext:
                                "Gute Commit-Nachrichten sind in Entwicklerteams extrem wichtig. Sie helfen allen zu verstehen, warum eine Änderung gemacht wurde, nicht nur was geändert wurde.",
                            taskIntroduction: "Erstelle deinen ersten Commit mit einer aussagekräftigen Nachricht.",
                        },
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
                        story: {
                            title: "Verzweigungen im Code",
                            narrative: `"Zeit für etwas Fortgeschritteneres", sagt Alex und zeichnet einen Baum mit Zweigen auf ein Whiteboard. "Diese Zweige sind wie Git-Branches. Sie erlauben dir, an verschiedenen Versionen deines Codes gleichzeitig zu arbeiten."

              Er erklärt weiter: "Derzeit arbeitest du auf dem 'main'-Branch. Lass uns zuerst überprüfen, welche Branches wir haben."`,
                            realWorldContext:
                                "Branches sind ein fundamentales Konzept in Git. Sie ermöglichen parallele Entwicklung, Feature-Isolation und experimentelles Arbeiten ohne den Hauptcode zu beeinträchtigen.",
                            taskIntroduction: "Zeige dir alle vorhandenen Branches mit git branch an.",
                        },
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
                        story: {
                            title: "Neue Feature-Entwicklung",
                            narrative: `"Perfekt! Jetzt wollen wir ein neues Feature implementieren", sagt Alex. "Dafür erstellen wir einen neuen Branch namens 'feature', damit unsere Änderungen den Hauptcode nicht beeinflussen."

              Er zeigt dir, wie man gleichzeitig einen Branch erstellt und zu ihm wechselt: "Mit 'git checkout -b' kannst du beides in einem Schritt erledigen."`,
                            realWorldContext:
                                "In professionellen Entwicklungsteams arbeitet man fast nie direkt im main-Branch. Stattdessen erstellt man Feature-Branches für neue Funktionen, um den Hauptcode stabil zu halten.",
                            taskIntroduction: "Erstelle einen neuen Branch namens 'feature' und wechsle zu ihm.",
                        },
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
                        story: {
                            title: "Code-Integration",
                            narrative: `"Super! Dein Feature ist fertig und getestet", sagt Alex. "Jetzt ist es Zeit, diese Änderungen zurück in den Hauptcode zu integrieren."

              Er erklärt: "Wechsle zuerst zum main-Branch mit 'git checkout main' und führe dann den feature-Branch mit 'git merge feature' zusammen."`,
                            realWorldContext:
                                "Das Zusammenführen (Merging) ist ein kritischer Teil des Git-Workflows. In größeren Teams wird dies oft durch Pull Requests und Code Reviews formalisiert.",
                            taskIntroduction: "Führe den 'feature'-Branch in den 'main'-Branch zusammen.",
                        },
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
        return this.stages[stageId] ?? null;
    }

    // Get a specific level within a stage
    public getLevel(stageId: string, levelId: number): LevelType | null {
        return this.stages[stageId]?.levels[levelId] ?? null;
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
                if (
                    requirement.command === `git ${gitCommand}` ||
                    requirement.command === command ||
                    requirement.command === gitCommand
                ) {
                    // Dieser Fall ist wichtig für "git init" etc.

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
        } else if (command === "next") {
            // Spezieller Fall für den "next"-Befehl
            return false; // Der "next"-Befehl schließt kein Level ab, sondern navigiert zum nächsten
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
    public getNextLevel(stageId: string, levelId: number): { stageId: string | undefined; levelId: number } {
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
