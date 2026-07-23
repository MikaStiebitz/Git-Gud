import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

// Advanced Level 1: Git Tags
const advancedLevel1 = createLevel({
    id: 1,
    name: "advanced.level1.name",
    description: "advanced.level1.description",
    objectives: ["advanced.level1.objective1", "advanced.level1.objective2", "advanced.level1.objective3"],
    hints: ["advanced.level1.hint1", "advanced.level1.hint2", "advanced.level1.hint3", "advanced.level1.hint4"],
    requirementLogic: "all",
    requirements: [
        {
            id: "create-tag",
            command: "git tag",
            requiresArgs: ["-a"],
            description: "advanced.level1.requirement1.description",
            successMessage: "advanced.level1.requirement1.success",
        },
        {
            id: "list-tags",
            command: "git tag",
            description: "advanced.level1.requirement2.description",
            successMessage: "advanced.level1.requirement2.success",
        },
        {
            id: "push-tags",
            command: "git push",
            requiresArgs: ["--tags"],
            description: "advanced.level1.requirement3.description",
            successMessage: "advanced.level1.requirement3.success",
        },
    ],
    story: createStory({
        title: "advanced.level1.story.title",
        narrative: "advanced.level1.story.narrative",
        realWorldContext: "advanced.level1.story.realWorldContext",
        taskIntroduction: "advanced.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Production Application\n\nVersion: 1.0.0"),
            createFileStructure("/package.json", '{\n  "name": "app",\n  "version": "1.0.0"\n}'),
            createFileStructure("/src/app.js", "console.log('App v1.0.0');"),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial release v1.0.0",
                    files: ["/README.md", "/package.json", "/src/app.js"],
                },
            ],
        }),
    }),
});

// Advanced Level 2: Git Log Advanced
const advancedLevel2 = createLevel({
    id: 2,
    name: "advanced.level2.name",
    description: "advanced.level2.description",
    objectives: ["advanced.level2.objective1", "advanced.level2.objective2", "advanced.level2.objective3"],
    hints: ["advanced.level2.hint1", "advanced.level2.hint2", "advanced.level2.hint3", "advanced.level2.hint4"],
    requirementLogic: "all",
    requirements: [
        {
            id: "log-oneline",
            command: "git log",
            requiresArgs: ["--oneline"],
            description: "advanced.level2.requirement1.description",
            successMessage: "advanced.level2.requirement1.success",
        },
        {
            id: "log-author",
            command: "git log",
            requiresArgs: ["--author"],
            description: "advanced.level2.requirement2.description",
            successMessage: "advanced.level2.requirement2.success",
        },
        {
            id: "log-grep",
            command: "git log",
            requiresArgs: ["--grep"],
            description: "advanced.level2.requirement3.description",
            successMessage: "advanced.level2.requirement3.success",
        },
    ],
    story: createStory({
        title: "advanced.level2.story.title",
        narrative: "advanced.level2.story.narrative",
        realWorldContext: "advanced.level2.story.realWorldContext",
        taskIntroduction: "advanced.level2.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Project History"),
            createFileStructure("/src/feature1.js", "// Feature 1"),
            createFileStructure("/src/feature2.js", "// Feature 2"),
            createFileStructure("/src/bugfix.js", "// Bug fix"),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/README.md"],
                },
                {
                    message: "Add feature 1",
                    files: ["/src/feature1.js"],
                },
                {
                    message: "Add feature 2",
                    files: ["/src/feature2.js"],
                },
                {
                    message: "Fix critical bug",
                    files: ["/src/bugfix.js"],
                },
            ],
        }),
    }),
});

// Advanced Level 3: Git Show
const advancedLevel3 = createLevel({
    id: 3,
    name: "advanced.level3.name",
    description: "advanced.level3.description",
    objectives: ["advanced.level3.objective1"],
    hints: ["advanced.level3.hint1", "advanced.level3.hint2", "advanced.level3.hint3"],
    requirementLogic: "all",
    requirements: [
        {
            id: "show-commit",
            command: "git show",
            requiresArgs: ["<hash>"],
            description: "advanced.level3.requirement1.description",
            successMessage: "advanced.level3.requirement1.success",
        },
    ],
    story: createStory({
        title: "advanced.level3.story.title",
        narrative: "advanced.level3.story.narrative",
        realWorldContext: "advanced.level3.story.realWorldContext",
        taskIntroduction: "advanced.level3.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure("/README.md", "# Commit Inspection"),
            createFileStructure("/src/code.js", "// Latest changes"),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Add initial code",
                    files: ["/README.md", "/src/code.js"],
                },
            ],
        }),
    }),
});

const advancedLevel4 = createLevel({
    id: 4,
    name: "advanced.level4.name",
    description: "advanced.level4.description",
    objectives: ["advanced.level4.objective1", "advanced.level4.objective2", "advanced.level4.objective3"],
    hints: ["advanced.level4.hint1", "advanced.level4.hint2", "advanced.level4.hint3"],
    requirementLogic: "all",
    requirements: [
        createRequirement({
            command: "git bisect",
            requiresArgs: ["start"],
            description: "advanced.level4.requirement1.description",
            successMessage: "advanced.level4.requirement1.success",
            id: "bisect-start",
        }),
        createRequirement({
            command: "git bisect",
            requiresArgs: ["bad"],
            description: "advanced.level4.requirement2.description",
            successMessage: "advanced.level4.requirement2.success",
            id: "bisect-bad",
        }),
        createRequirement({
            command: "git bisect",
            requiresArgs: ["good"],
            description: "advanced.level4.requirement3.description",
            successMessage: "advanced.level4.requirement3.success",
            id: "bisect-good",
        }),
        createRequirement({
            command: "git bisect",
            requiresArgs: ["reset"],
            description: "advanced.level4.requirement4.description",
            successMessage: "advanced.level4.requirement4.success",
            id: "bisect-reset",
        }),
    ],
    story: createStory({
        title: "advanced.level4.story.title",
        narrative: "advanced.level4.story.narrative",
        realWorldContext: "advanced.level4.story.realWorldContext",
        taskIntroduction: "advanced.level4.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [
            createFileStructure(
                "/src/search.js",
                "// Search index\nfunction searchIndex(q) {\n  return rebuildIndex().find(q);\n}",
            ),
            createFileStructure("/src/cache.js", "// Caching layer\nconst cache = new Map();"),
            createFileStructure(
                "/src/images.js",
                "// Image loading\nfunction loadImage(src) {\n  return fetch(src);\n}",
            ),
        ],
        git: createGitState({
            initialized: true,
            currentBranch: "main",
            branches: ["main"],
            commits: [
                {
                    message: "Initial stable version",
                    files: ["/src/search.js"],
                },
                {
                    message: "Add caching layer",
                    files: ["/src/cache.js"],
                },
                {
                    message: "Optimize image loading",
                    files: ["/src/images.js"],
                },
                {
                    message: "Refactor search index",
                    files: ["/src/search.js"],
                },
            ],
        }),
    }),
});

export const advancedLevels = {
    1: advancedLevel1,
    2: advancedLevel2,
    3: advancedLevel3,
    4: advancedLevel4,
};
