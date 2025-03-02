import type { StageType, LevelType } from "~/types";

export class LevelManager {
    private stages: Record<string, StageType>;

    constructor() {
        this.stages = {
            Intro: {
                id: "intro",
                name: "intro.name",
                description: "intro.description",
                icon: "🚀",
                levels: {
                    1: {
                        id: 1,
                        name: "intro.level1.name",
                        description: "intro.level1.description",
                        objectives: ["intro.level1.objective1"],
                        hints: ["intro.level1.hint1", "intro.level1.hint2"],
                        requirements: [
                            {
                                command: "git init",
                                description: "intro.level1.requirement1.description",
                                successMessage: "intro.level1.requirement1.success",
                            },
                        ],
                        resetGitRepo: true,
                        story: {
                            title: "intro.level1.story.title",
                            narrative: "intro.level1.story.narrative",
                            realWorldContext: "intro.level1.story.realWorldContext",
                            taskIntroduction: "intro.level1.story.taskIntroduction",
                        },
                    },
                    2: {
                        id: 2,
                        name: "intro.level2.name",
                        description: "intro.level2.description",
                        objectives: ["intro.level2.objective1"],
                        hints: ["intro.level2.hint1", "intro.level2.hint2"],
                        requirements: [
                            {
                                command: "git status",
                                description: "intro.level2.requirement1.description",
                                successMessage: "intro.level2.requirement1.success",
                            },
                        ],
                        story: {
                            title: "intro.level2.story.title",
                            narrative: "intro.level2.story.narrative",
                            realWorldContext: "intro.level2.story.realWorldContext",
                            taskIntroduction: "intro.level2.story.taskIntroduction",
                        },
                    },
                },
            },
            Files: {
                id: "files",
                name: "files.name",
                description: "files.description",
                icon: "📁",
                levels: {
                    1: {
                        id: 1,
                        name: "files.level1.name",
                        description: "files.level1.description",
                        objectives: ["files.level1.objective1"],
                        hints: ["files.level1.hint1", "files.level1.hint2"],
                        requirements: [
                            {
                                command: "git add",
                                requiresArgs: ["."],
                                description: "files.level1.requirement1.description",
                                successMessage: "files.level1.requirement1.success",
                            },
                        ],
                        story: {
                            title: "files.level1.story.title",
                            narrative: "files.level1.story.narrative",
                            realWorldContext: "files.level1.story.realWorldContext",
                            taskIntroduction: "files.level1.story.taskIntroduction",
                        },
                    },
                    2: {
                        id: 2,
                        name: "files.level2.name",
                        description: "files.level2.description",
                        objectives: ["files.level2.objective1"],
                        hints: ["files.level2.hint1", "files.level2.hint2"],
                        requirements: [
                            {
                                command: "git commit",
                                requiresArgs: ["-m"],
                                description: "files.level2.requirement1.description",
                                successMessage: "files.level2.requirement1.success",
                            },
                        ],
                        story: {
                            title: "files.level2.story.title",
                            narrative: "files.level2.story.narrative",
                            realWorldContext: "files.level2.story.realWorldContext",
                            taskIntroduction: "files.level2.story.taskIntroduction",
                        },
                    },
                    3: {
                        id: 3,
                        name: "files.level3.name",
                        description: "files.level3.description",
                        objectives: ["files.level3.objective1"],
                        hints: ["files.level3.hint1", "files.level3.hint2"],
                        requirements: [
                            {
                                command: "git rm",
                                requiresArgs: ["any"],
                                description: "files.level3.requirement1.description",
                                successMessage: "files.level3.requirement1.success",
                            },
                        ],
                        story: {
                            title: "files.level3.story.title",
                            narrative: "files.level3.story.narrative",
                            realWorldContext: "files.level3.story.realWorldContext",
                            taskIntroduction: "files.level3.story.taskIntroduction",
                        },
                    },
                },
            },
            Branches: {
                id: "branches",
                name: "branches.name",
                description: "branches.description",
                icon: "🌿",
                levels: {
                    1: {
                        id: 1,
                        name: "branches.level1.name",
                        description: "branches.level1.description",
                        objectives: ["branches.level1.objective1"],
                        hints: ["branches.level1.hint1", "branches.level1.hint2"],
                        requirements: [
                            {
                                command: "git branch",
                                description: "branches.level1.requirement1.description",
                                successMessage: "branches.level1.requirement1.success",
                            },
                        ],
                        story: {
                            title: "branches.level1.story.title",
                            narrative: "branches.level1.story.narrative",
                            realWorldContext: "branches.level1.story.realWorldContext",
                            taskIntroduction: "branches.level1.story.taskIntroduction",
                        },
                    },
                    2: {
                        id: 2,
                        name: "branches.level2.name",
                        description: "branches.level2.description",
                        objectives: ["branches.level2.objective1"],
                        hints: ["branches.level2.hint1", "branches.level2.hint2"],
                        requirements: [
                            {
                                command: "git checkout",
                                requiresArgs: ["-b"],
                                description: "branches.level2.requirement1.description",
                                successMessage: "branches.level2.requirement1.success",
                            },
                        ],
                        story: {
                            title: "branches.level2.story.title",
                            narrative: "branches.level2.story.narrative",
                            realWorldContext: "branches.level2.story.realWorldContext",
                            taskIntroduction: "branches.level2.story.taskIntroduction",
                        },
                    },
                    3: {
                        id: 3,
                        name: "branches.level3.name",
                        description: "branches.level3.description",
                        objectives: ["branches.level3.objective1"],
                        hints: ["branches.level3.hint1", "branches.level3.hint2"],
                        requirements: [
                            {
                                command: "git switch",
                                description: "branches.level3.requirement1.description",
                                successMessage: "branches.level3.requirement1.success",
                            },
                        ],
                        story: {
                            title: "branches.level3.story.title",
                            narrative: "branches.level3.story.narrative",
                            realWorldContext: "branches.level3.story.realWorldContext",
                            taskIntroduction: "branches.level3.story.taskIntroduction",
                        },
                    },
                },
            },
            Merge: {
                id: "merge",
                name: "merge.name",
                description: "merge.description",
                icon: "🔀",
                levels: {
                    1: {
                        id: 1,
                        name: "merge.level1.name",
                        description: "merge.level1.description",
                        objectives: ["merge.level1.objective1"],
                        hints: ["merge.level1.hint1", "merge.level1.hint2"],
                        requirements: [
                            {
                                command: "git merge",
                                requiresArgs: ["any"],
                                description: "merge.level1.requirement1.description",
                                successMessage: "merge.level1.requirement1.success",
                            },
                        ],
                        story: {
                            title: "merge.level1.story.title",
                            narrative: "merge.level1.story.narrative",
                            realWorldContext: "merge.level1.story.realWorldContext",
                            taskIntroduction: "merge.level1.story.taskIntroduction",
                        },
                    },
                    2: {
                        id: 2,
                        name: "merge.level2.name",
                        description: "merge.level2.description",
                        objectives: ["merge.level2.objective1"],
                        hints: ["merge.level2.hint1", "merge.level2.hint2"],
                        requirements: [
                            {
                                command: "git merge",
                                requiresArgs: ["--abort"],
                                description: "merge.level2.requirement1.description",
                                successMessage: "merge.level2.requirement1.success",
                            },
                        ],
                        story: {
                            title: "merge.level2.story.title",
                            narrative: "merge.level2.story.narrative",
                            realWorldContext: "merge.level2.story.realWorldContext",
                            taskIntroduction: "merge.level2.story.taskIntroduction",
                        },
                    },
                },
            },
            Remote: {
                id: "remote",
                name: "remote.name",
                description: "remote.description",
                icon: "🌐",
                levels: {
                    1: {
                        id: 1,
                        name: "remote.level1.name",
                        description: "remote.level1.description",
                        objectives: ["remote.level1.objective1"],
                        hints: ["remote.level1.hint1", "remote.level1.hint2"],
                        requirements: [
                            {
                                command: "git remote",
                                requiresArgs: ["add"],
                                description: "remote.level1.requirement1.description",
                                successMessage: "remote.level1.requirement1.success",
                            },
                        ],
                        story: {
                            title: "remote.level1.story.title",
                            narrative: "remote.level1.story.narrative",
                            realWorldContext: "remote.level1.story.realWorldContext",
                            taskIntroduction: "remote.level1.story.taskIntroduction",
                        },
                    },
                    2: {
                        id: 2,
                        name: "remote.level2.name",
                        description: "remote.level2.description",
                        objectives: ["remote.level2.objective1"],
                        hints: ["remote.level2.hint1", "remote.level2.hint2"],
                        requirements: [
                            {
                                command: "git push",
                                description: "remote.level2.requirement1.description",
                                successMessage: "remote.level2.requirement1.success",
                            },
                        ],
                        story: {
                            title: "remote.level2.story.title",
                            narrative: "remote.level2.story.narrative",
                            realWorldContext: "remote.level2.story.realWorldContext",
                            taskIntroduction: "remote.level2.story.taskIntroduction",
                        },
                    },
                },
            },
        };
    }

    // Get all stages with translated content
    public getAllStages(translateFunc?: (key: string) => string): Record<string, StageType> {
        if (!translateFunc) {
            return { ...this.stages };
        }

        // Create a deep copy with translated content
        const translatedStages: Record<string, StageType> = {};

        for (const [stageId, stage] of Object.entries(this.stages)) {
            translatedStages[stageId] = {
                ...stage,
                name: translateFunc(stage.name),
                description: translateFunc(stage.description),
                levels: this.getTranslatedLevels(stage.levels, translateFunc),
            };
        }

        return translatedStages;
    }

    // Get a specific stage with translated content
    public getStage(stageId: string, translateFunc?: (key: string) => string): StageType | null {
        const stage = this.stages[stageId];
        if (!stage) return null;

        if (!translateFunc) {
            return stage;
        }

        return {
            ...stage,
            name: translateFunc(stage.name),
            description: translateFunc(stage.description),
            levels: this.getTranslatedLevels(stage.levels, translateFunc),
        };
    }

    // Get a specific level with translated content
    public getLevel(stageId: string, levelId: number, translateFunc?: (key: string) => string): LevelType | null {
        const level = this.stages[stageId]?.levels[levelId];
        if (!level) return null;

        if (!translateFunc) {
            return level;
        }

        return this.translateLevel(level, translateFunc);
    }

    // Helper to translate level content
    private translateLevel(level: LevelType, translateFunc: (key: string) => string): LevelType {
        return {
            ...level,
            name: translateFunc(level.name),
            description: translateFunc(level.description),
            objectives: level.objectives.map(obj => translateFunc(obj)),
            hints: level.hints.map(hint => translateFunc(hint)),
            requirements: level.requirements.map(req => ({
                ...req,
                description: translateFunc(req.description),
                successMessage: req.successMessage ? translateFunc(req.successMessage) : undefined,
            })),
            story: {
                title: translateFunc(level.story.title),
                narrative: translateFunc(level.story.narrative),
                realWorldContext: translateFunc(level.story.realWorldContext),
                taskIntroduction: translateFunc(level.story.taskIntroduction),
            },
        };
    }

    // Helper to translate all levels in a stage
    private getTranslatedLevels(
        levels: Record<number, LevelType>,
        translateFunc: (key: string) => string,
    ): Record<number, LevelType> {
        const translatedLevels: Record<number, LevelType> = {};

        for (const [levelId, level] of Object.entries(levels)) {
            translatedLevels[parseInt(levelId)] = this.translateLevel(level, translateFunc);
        }

        return translatedLevels;
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
