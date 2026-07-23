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
            id: "git-add",
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
            id: "git-commit",
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
            id: "git-rm",
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

const filesLevel4 = createLevel({
    id: 4,
    name: "files.level4.name",
    description: "files.level4.description",
    objectives: ["files.level4.objective1", "files.level4.objective2"],
    hints: ["files.level4.hint1", "files.level4.hint2", "files.level4.hint3"],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            command: "git mv",
            requiresArgs: ["any"],
            description: "files.level4.requirement1.description",
            successMessage: "files.level4.requirement1.success",
            id: "git-mv-rename",
        }),
        createRequirement({
            command: "git commit",
            requiresArgs: ["-m"],
            description: "files.level4.requirement2.description",
            successMessage: "files.level4.requirement2.success",
            id: "commit-rename",
        }),
    ],
    story: createStory({
        title: "files.level4.story.title",
        narrative: "files.level4.story.narrative",
        realWorldContext: "files.level4.story.realWorldContext",
        taskIntroduction: "files.level4.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Git Project\n\nThis is a README file for our Git project."),
            createFileStructure("/src/index.js", 'console.log("Hello, world!");'),
            createFileStructure(
                "/src/app-config.js",
                'const config = {\n  appName: "TechStart",\n  version: "1.0.0",\n};\n\nmodule.exports = config;',
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            // All files are already committed
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/index.js", "/src/app-config.js"],
                },
            ],
            // The file we want to rename
            fileChanges: [{ path: "/src/app-config.js", status: "committed" }],
        }),
    }),
});

export const filesLevels = {
    1: filesLevel1,
    2: filesLevel2,
    3: filesLevel3,
    4: filesLevel4,
};
