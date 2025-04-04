import { createStage } from "./LevelCreator";
import { introLevels } from "./stages/intro";
import { filesLevels } from "./stages/files";
import { branchesLevels } from "./stages/branches";
import { mergeLevels } from "./stages/merge";
import { rebaseLevels } from "./stages/rebase";
import { remoteLevels } from "./stages/remote";

export const allStages = {
    Intro: createStage({
        id: "intro",
        name: "intro.name",
        description: "intro.description",
        icon: "🚀",
        levels: introLevels,
    }),
    Files: createStage({
        id: "files",
        name: "files.name",
        description: "files.description",
        icon: "📁",
        levels: filesLevels,
    }),
    Branches: createStage({
        id: "branches",
        name: "branches.name",
        description: "branches.description",
        icon: "🌿",
        levels: branchesLevels,
    }),
    Merge: createStage({
        id: "merge",
        name: "merge.name",
        description: "merge.description",
        icon: "🔀",
        levels: mergeLevels,
    }),
    Rebase: createStage({
        id: "rebase",
        name: "rebase.name",
        description: "rebase.description",
        icon: "🔁",
        levels: rebaseLevels,
    }),
    Remote: createStage({
        id: "remote",
        name: "remote.name",
        description: "remote.description",
        icon: "🌐",
        levels: remoteLevels,
    }),
};

// ===== Usage in LevelManager =====
/**
 * To use these levels in the LevelManager, initialize the class like this:
 *
 * export class LevelManager {
 *   private stages: Record<string, StageType>;
 *
 *   constructor() {
 *     this.stages = allStages;
 *   }
 *
 *   // Other methods...
 * }
 */
