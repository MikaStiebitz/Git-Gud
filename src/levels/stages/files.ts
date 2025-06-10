import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const filesLevel1 = createLevel({
    id: 1,
    name: "files.level1.name",
    description: "files.level1.description",
    objectives: ["files.level1.objective1"],
    hints: ["files.level1.hint1", "files.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git add",
            requiresArgs: ["any"],
            description: "files.level1.requirement1.description",
            successMessage: "files.level1.requirement1.success",
        }),
    ],
    story: createStory({
        title: "files.level1.story.title",
        narrative: "files.level1.story.narrative",
        realWorldContext: "files.level1.story.realWorldContext",
        taskIntroduction: "files.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Project\n\nThis is a README file for our Git project."),
            createFileStructure("/src/index.js", 'console.log("Hello, world!");'),
            createFileStructure("/src/app.js", 'const app = () => {\n  console.log("App started");\n};\n\napp();'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            // All files are untracked in this level
            fileChanges: [
                { path: "/README.md", status: "untracked" },
                { path: "/src/index.js", status: "untracked" },
                { path: "/src/app.js", status: "untracked" },
            ],
        }),
    }),
});

const filesLevel2 = createLevel({
    id: 2,
    name: "files.level2.name",
    description: "files.level2.description",
    objectives: ["files.level2.objective1"],
    hints: ["files.level2.hint1", "files.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git commit",
            description: "files.level2.requirement1.description",
            successMessage: "files.level2.requirement1.success",
        }),
    ],
    story: createStory({
        title: "files.level2.story.title",
        narrative: "files.level2.story.narrative",
        realWorldContext: "files.level2.story.realWorldContext",
        taskIntroduction: "files.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Project\n\nThis is a README file for our Git project."),
            createFileStructure("/src/index.js", 'console.log("Hello, world!");'),
            createFileStructure("/src/app.js", 'const app = () => {\n  console.log("App started");\n};\n\napp();'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            // All files are already staged
            fileChanges: [
                { path: "/README.md", status: "staged" },
                { path: "/src/index.js", status: "staged" },
                { path: "/src/app.js", status: "staged" },
            ],
        }),
    }),
});

const filesLevel3 = createLevel({
    id: 3,
    name: "files.level3.name",
    description: "files.level3.description",
    objectives: ["files.level3.objective1"],
    hints: ["files.level3.hint1", "files.level3.hint2"],
    requirements: [
        createRequirement({
            command: "git rm",
            requiresArgs: ["any"],
            description: "files.level3.requirement1.description",
            successMessage: "files.level3.requirement1.success",
        }),
    ],
    story: createStory({
        title: "files.level3.story.title",
        narrative: "files.level3.story.narrative",
        realWorldContext: "files.level3.story.realWorldContext",
        taskIntroduction: "files.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Project\n\nThis is a README file for our Git project."),
            createFileStructure("/src/index.js", 'console.log("Hello, world!");'),
            createFileStructure("/src/app.js", 'const app = () => {\n  console.log("App started");\n};\n\napp();'),
            createFileStructure("/temp.txt", "This is a temporary file that should be removed."),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            // All files are already committed
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/index.js", "/src/app.js", "/temp.txt"],
                },
            ],
            // A file we want to remove
            fileChanges: [{ path: "/temp.txt", status: "committed" }],
        }),
    }),
});

export const filesLevels = {
    1: filesLevel1,
    2: filesLevel2,
    3: filesLevel3,
};
