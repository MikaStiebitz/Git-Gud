import type { ReactNode, ComponentType } from "react";
import { GitBranch, GitCommit, GitMerge, GitGraph } from "lucide-react";
import { BranchMaster } from "./BranchMaster";
import { CommitChampion } from "./CommitChampion";
import { MergeMaster } from "./MergeMaster";
import { GraphPuzzle } from "./GraphPuzzle";

export type MinigameDifficulty = "easy" | "medium" | "hard";

export interface MinigameComponentProps {
    onComplete: (score: number) => void;
    onClose: () => void;
    difficulty?: "beginner" | "advanced" | "pro";
}

export interface MinigameDef {
    id: string;
    nameKey: string;
    descriptionKey: string;
    categoryKey: string;
    difficulty: MinigameDifficulty;
    coins: number;
    icon: ReactNode;
    Component: ComponentType<MinigameComponentProps>;
}

// Single source of truth for every minigame, consumed by both the home dialog
// and the /arcade page.
export const MINIGAMES: MinigameDef[] = [
    {
        id: "branch-master",
        nameKey: "minigame.branchMaster.name",
        descriptionKey: "minigame.branchMaster.description",
        categoryKey: "minigame.branchMaster.category",
        difficulty: "easy",
        coins: 10,
        icon: <GitBranch className="h-6 w-6" />,
        Component: BranchMaster,
    },
    {
        id: "graph-puzzle",
        nameKey: "minigame.graphPuzzle.name",
        descriptionKey: "minigame.graphPuzzle.description",
        categoryKey: "minigame.graphPuzzle.category",
        difficulty: "medium",
        coins: 25,
        icon: <GitGraph className="h-6 w-6" />,
        Component: GraphPuzzle,
    },
    {
        id: "commit-champion",
        nameKey: "minigame.commitChampion.name",
        descriptionKey: "minigame.commitChampion.description",
        categoryKey: "minigame.commitChampion.category",
        difficulty: "medium",
        coins: 20,
        icon: <GitCommit className="h-6 w-6" />,
        Component: CommitChampion,
    },
    {
        id: "merge-master",
        nameKey: "minigame.mergeMaster.name",
        descriptionKey: "minigame.mergeMaster.description",
        categoryKey: "minigame.mergeMaster.category",
        difficulty: "hard",
        coins: 30,
        icon: <GitMerge className="h-6 w-6" />,
        Component: MergeMaster,
    },
];

export const difficultyColorClasses = (difficulty: MinigameDifficulty): string => {
    switch (difficulty) {
        case "easy":
            return "text-green-400 border-green-600 bg-green-900/20";
        case "medium":
            return "text-yellow-400 border-yellow-600 bg-yellow-900/20";
        case "hard":
            return "text-red-400 border-red-600 bg-red-900/20";
    }
};
