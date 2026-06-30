import { createStage } from "./LevelCreator";
import { introLevels } from "./stages/intro";
import { filesLevels } from "./stages/files";
import { branchesLevels } from "./stages/branches";
import { mergeLevels } from "./stages/merge";
import { rebaseLevels } from "./stages/rebase";
import { remoteLevels } from "./stages/remote";
import { resetLevels } from "./stages/reset";
import { stashLevels } from "./stages/stash";
import { workflowLevels } from "./stages/workflow";
import { teamworkLevels } from "./stages/teamwork";
import { advancedLevels } from "./stages/advanced";
import { archaeologyLevels } from "./stages/archaeology";
import { masteryLevels } from "./stages/mastery";
import { disasterScenarios } from "./disaster-scenarios";

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
    Workflow: createStage({
        id: "workflow",
        name: "workflow.name",
        description: "workflow.description",
        icon: "🔄",
        levels: workflowLevels,
    }),
    TeamWork: createStage({
        id: "teamwork",
        name: "teamwork.name",
        description: "teamwork.description",
        icon: "👥",
        levels: teamworkLevels,
    }),
    Reset: createStage({
        id: "reset",
        name: "reset.name",
        description: "reset.description",
        icon: "↩️",
        levels: resetLevels,
    }),
    Stash: createStage({
        id: "stash",
        name: "stash.name",
        description: "stash.description",
        icon: "📦",
        levels: stashLevels,
    }),
    Advanced: createStage({
        id: "advanced",
        name: "advanced.name",
        description: "advanced.description",
        icon: "⚡",
        levels: advancedLevels,
    }),
    Archaeology: createStage({
        id: "archaeology",
        name: "archaeology.name",
        description: "archaeology.description",
        icon: "🔍",
        levels: archaeologyLevels,
    }),
    Mastery: createStage({
        id: "mastery",
        name: "mastery.name",
        description: "mastery.description",
        icon: "👑",
        levels: masteryLevels,
    }),
    Scenarios: createStage({
        id: "scenarios",
        name: "scenarios.name",
        description: "scenarios.description",
        icon: "🔥",
        levels: Object.fromEntries(disasterScenarios.map(s => [s.id, s])),
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
