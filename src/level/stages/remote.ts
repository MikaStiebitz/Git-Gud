import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const remoteLevel1 = createLevel({
    id: 1,
    name: "remote.level1.name",
    description: "remote.level1.description",
    objectives: ["remote.level1.objective1"],
    hints: ["remote.level1.hint1", "remote.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git remote",
            requiresArgs: ["add"],
            description: "remote.level1.requirement1.description",
            successMessage: "remote.level1.requirement1.success",
        }),
    ],
    story: createStory({
        title: "remote.level1.story.title",
        narrative: "remote.level1.story.narrative",
        realWorldContext: "remote.level1.story.realWorldContext",
        taskIntroduction: "remote.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Remote Project\n\nA project for learning about remote repositories."),
            createFileStructure("/src/index.js", 'console.log("Hello from the local repository");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/index.js"],
                },
            ],
        }),
    }),
});

const remoteLevel2 = createLevel({
    id: 2,
    name: "remote.level2.name",
    description: "remote.level2.description",
    objectives: ["remote.level2.objective1"],
    hints: ["remote.level2.hint1", "remote.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git push",
            description: "remote.level2.requirement1.description",
            successMessage: "remote.level2.requirement1.success",
        }),
    ],
    story: createStory({
        title: "remote.level2.story.title",
        narrative: "remote.level2.story.narrative",
        realWorldContext: "remote.level2.story.realWorldContext",
        taskIntroduction: "remote.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Remote Project\n\nA project for learning about remote repositories."),
            createFileStructure("/src/index.js", 'console.log("Hello from the local repository");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/index.js"],
                },
            ],
            // Remote already added for this level
            fileChanges: [],
        }),
    }),
});

export const remoteLevels = {
    1: remoteLevel1,
    2: remoteLevel2,
};
