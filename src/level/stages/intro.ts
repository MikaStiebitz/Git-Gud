import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const introLevel1 = createLevel({
    id: 1,
    name: "intro.level1.name",
    description: "intro.level1.description",
    objectives: ["intro.level1.objective1"],
    hints: ["intro.level1.hint1", "intro.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git init",
            description: "intro.level1.requirement1.description",
            successMessage: "intro.level1.requirement1.success",
        }),
    ],
    resetGitRepo: true,
    story: createStory({
        title: "intro.level1.story.title",
        narrative: "intro.level1.story.narrative",
        realWorldContext: "intro.level1.story.realWorldContext",
        taskIntroduction: "intro.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [],
        git: createGitState({
            initialized: false, // Git not initialized for this level
        }),
    }),
});

const introLevel2 = createLevel({
    id: 2,
    name: "intro.level2.name",
    description: "intro.level2.description",
    objectives: ["intro.level2.objective1"],
    hints: ["intro.level2.hint1", "intro.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git status",
            description: "intro.level2.requirement1.description",
            successMessage: "intro.level2.requirement1.success",
        }),
    ],
    story: createStory({
        title: "intro.level2.story.title",
        narrative: "intro.level2.story.narrative",
        realWorldContext: "intro.level2.story.realWorldContext",
        taskIntroduction: "intro.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Learning Game\n\nWelcome to the Git learning game!"),
            createFileStructure("/src/index.js", 'console.log("Hello, Git!");'),
        ],
        git: createGitState({
            initialized: true, // Git already initialized for this level
            currentBranch: "main",
        }),
    }),
});

export const introLevels = {
    1: introLevel1,
    2: introLevel2,
};
