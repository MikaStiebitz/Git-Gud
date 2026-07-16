import type { DifficultyConfig } from "~/types";
import { allStages } from "~/levels";

// Each completed level awards this many points (see ProgressManager.completeLevel)
const POINTS_PER_LEVEL = 10;

const maxPointsForStages = (stages: string[]): number =>
    stages.reduce(
        (total, stage) => total + Object.keys(allStages[stage as keyof typeof allStages]?.levels ?? {}).length,
        0,
    ) * POINTS_PER_LEVEL;

const difficultyDefinitions: Omit<DifficultyConfig, "maxPoints">[] = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Learn Git basics",
    icon: "🌱",
    color: "green",
    stages: ["Intro", "Files", "Branches", "Remote"],
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Master advanced Git workflows",
    icon: "⚡",
    color: "yellow",
    stages: ["Merge", "Workflow", "TeamWork", "Reset", "Stash"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Expert Git techniques",
    icon: "🚀",
    color: "blue",
    stages: ["Rebase", "Advanced", "Archaeology", "Mastery"],
  },
];

// Max points are derived from the actual number of levels per difficulty
export const difficulties: DifficultyConfig[] = difficultyDefinitions.map(definition => ({
    ...definition,
    maxPoints: maxPointsForStages(definition.stages),
}));

export const getAvailableStagesForDifficulty = (difficulty: DifficultyConfig["id"]): string[] => {
    const config = difficulties.find(d => d.id === difficulty);
    return config?.stages || [];
};

export const getDifficultyConfig = (difficulty: DifficultyConfig["id"]): DifficultyConfig | null => {
    return difficulties.find(d => d.id === difficulty) || null;
};

// Find the difficulty a stage belongs to (used e.g. for the progress bar's max score)
export const getDifficultyConfigForStage = (stageId: string): DifficultyConfig | null => {
    return difficulties.find(d => d.stages.includes(stageId)) || null;
};
