import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
    createMergeConflictContent,
} from "../LevelCreator";

const mergeLevel1 = createLevel({
    id: 1,
    name: "merge.level1.name",
    description: "merge.level1.description",
    objectives: ["merge.level1.objective1"],
    hints: ["merge.level1.hint1", "merge.level1.hint2"],
    requirements: [
        createRequirement({
            command: "git merge",
            requiresArgs: ["any"],
            description: "merge.level1.requirement1.description",
            successMessage: "merge.level1.requirement1.success",
        }),
    ],
    story: createStory({
        title: "merge.level1.story.title",
        narrative: "merge.level1.story.narrative",
        realWorldContext: "merge.level1.story.realWorldContext",
        taskIntroduction: "merge.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Merge Project\n\nA project for learning about Git merges."),
            createFileStructure("/src/main.js", 'console.log("Main branch");'),
            createFileStructure("/src/feature.js", 'console.log("Feature implementation");'),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature"],
            commits: [
                // Initial commit on main
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js"],
                },
                // Switch to feature branch and add feature.js
                {
                    message: "Add feature implementation",
                    files: ["/src/feature.js"],
                    branch: "feature",
                },
                // Switch back to main for the user to merge
                {
                    message: "",
                    files: [],
                    branch: "main",
                },
            ],
        }),
    }),
});

const mergeLevel2 = createLevel({
    id: 2,
    name: "merge.level2.name",
    description: "merge.level2.description",
    objectives: ["merge.level2.objective1"],
    hints: ["merge.level2.hint1", "merge.level2.hint2"],
    requirements: [
        createRequirement({
            command: "git merge",
            requiresArgs: ["--abort"],
            description: "merge.level2.requirement1.description",
            successMessage: "merge.level2.requirement1.success",
        }),
    ],
    story: createStory({
        title: "merge.level2.story.title",
        narrative: "merge.level2.story.narrative",
        realWorldContext: "merge.level2.story.realWorldContext",
        taskIntroduction: "merge.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure(
                "/README.md",
                "# Merge Conflict Project\n\nA project for learning about merge conflicts.",
            ),
            createFileStructure("/src/main.js", 'console.log("Main branch");'),
            // This file will be different in both branches
            createFileStructure(
                "/src/config.js",
                '// Configuration file\nconst config = {\n  port: 3000,\n  host: "localhost",\n  debug: true\n};\n\nmodule.exports = config;',
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main", "feature"],
            commits: [
                // Initial commit on main
                {
                    message: "Initial commit",
                    files: ["/README.md", "/src/main.js", "/src/config.js"],
                },
                // Change to config.js on the feature branch
                {
                    message: "Update config for production",
                    files: ["/src/config.js"],
                    branch: "feature",
                },
                // Change to config.js on the main branch
                {
                    message: "Update config for debugging",
                    files: ["/src/config.js"],
                    branch: "main",
                },
            ],
            // Simulate merge conflict
            mergeConflicts: [
                {
                    file: "/src/config.js",
                    content: createMergeConflictContent(
                        '// Configuration file\nconst config = {\n  port: 3000,\n  host: "localhost",\n  debug: true\n};\n\nmodule.exports = config;',
                        '// Configuration file\nconst config = {\n  port: 8080,\n  host: "example.com",\n  debug: false\n};\n\nmodule.exports = config;',
                    ),
                    branch1: "main",
                    branch2: "feature",
                },
            ],
        }),
    }),
});

export const mergeLevels = {
    1: mergeLevel1,
    2: mergeLevel2,
};
