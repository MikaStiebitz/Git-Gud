# Levels System Documentation

This document explains how the levels and stages system works in GitGud and how to add new levels.

## Level Architecture

The level system is organized into:

- **Stages**: Collection of related levels (e.g., "Intro", "Branches")
- **Levels**: Individual challenges within each stage
- **Requirements**: Specific tasks to complete a level

## Level Structure

Each level is defined using the following structure:

```typescript
export interface LevelType {
    id: number;
    name: string;
    description: string;
    objectives: string[];
    hints: string[];
    requirements: LevelRequirement[];
    requirementLogic?: "any" | "all";
    completedRequirements?: string[];
    story?: StoryContext;
    resetGitRepo?: boolean;
    initialState?: LevelInitialState;
}
```

The `LevelRequirement` defines what the user needs to do to complete the level:

```typescript
export type LevelRequirement = {
    id?: string;
    command: string;
    requiresArgs?: string[];
    description: string;
    successMessage?: string;
};
```

## Creating a New Level

Levels are created using the helper functions in `src/level/LevelCreator.ts`:

1. **Create a new level in the appropriate stage file**:

```typescript
// In src/level/stages/my-stage.ts
import {
    createLevel,
    createRequirement,
    createStory,
    createInitialState,
    createFileStructure,
    createGitState,
} from "../LevelCreator";

const myStageLevel1 = createLevel({
    id: 1,
    name: "mystage.level1.name", // Translation key
    description: "mystage.level1.description", // Translation key
    objectives: ["mystage.level1.objective1"], // Translation keys
    hints: ["mystage.level1.hint1", "mystage.level1.hint2"], // Translation keys
    requirements: [
        createRequirement({
            command: "git command", // The command that completes this level
            requiresArgs: ["optional", "required", "args"],
            description: "mystage.level1.requirement1.description",
            successMessage: "mystage.level1.requirement1.success",
        }),
    ],
    story: createStory({
        title: "mystage.level1.story.title",
        narrative: "mystage.level1.story.narrative",
        realWorldContext: "mystage.level1.story.realWorldContext",
        taskIntroduction: "mystage.level1.story.taskIntroduction",
    }),
    initialState: createInitialState({
        files: [createFileStructure("/path/to/file.ext", "file content")],
        git: createGitState({
            initialized: true, // Start with git initialized
            currentBranch: "main",
            branches: ["main", "feature"],
            commits: [
                {
                    message: "Initial commit",
                    files: ["/path/to/file.ext"],
                },
            ],
        }),
    }),
});

export const myStageLevels = {
    1: myStageLevel1,
    // Add more levels here
};
```

2. **Add the stage to the allStages object in `src/level/index.ts`**:

```typescript
import { myStageLevels } from "./stages/my-stage";

export const allStages = {
    // ...existing stages,
    MyStage: createStage({
        id: "mystage",
        name: "mystage.name",
        description: "mystage.description",
        icon: "🔍",
        levels: myStageLevels,
    }),
};
```

## Level Requirements

Requirements define what a user must do to complete a level. The main ways to define requirements are:

1. **Command Match**: User must execute a specific command

    ```typescript
    createRequirement({
        command: "git init",
        description: "Initialize a git repository",
    });
    ```

2. **Command with Arguments**: User must execute a command with specific arguments

    ```typescript
    createRequirement({
        command: "git checkout",
        requiresArgs: ["-b"], // Required argument
        description: "Create a new branch",
    });
    ```

3. **Special Case - Any Argument**: User must provide any argument
    ```typescript
    createRequirement({
        command: "git add",
        requiresArgs: ["any"], // Any argument will satisfy this
        description: "Add a file to staging",
    });
    ```

## Level Initial State

The initial state controls how the environment is set up when the level starts:

1. **Files**: Create initial files in the file system

    ```typescript
    files: [
        createFileStructure("/README.md", "# Project\n\nThis is a README file"),
        createFileStructure("/src/index.js", 'console.log("Hello world");'),
    ];
    ```

2. **Git State**: Set up Git repository state
    ```typescript
    git: createGitState({
        initialized: true,
        currentBranch: "main",
        branches: ["main", "feature"],
        commits: [
            {
                message: "Initial commit",
                files: ["/README.md"],
            },
            {
                message: "Add feature",
                files: ["/src/feature.js"],
                branch: "feature", // Switch to this branch for this commit
            },
        ],
        fileChanges: [
            {
                path: "/README.md",
                content: "Updated content",
                status: "modified",
            },
        ],
    });
    ```

## Level Translations

All user-facing strings should use translation keys rather than hardcoded strings. Add the corresponding translations to:

- `src/translations/en/levels.ts` for English
- `src/translations/de/levels.ts` for German
- Add more language files as needed

Follow this naming convention for keys:

```
stageid.level#.elementtype.elementname
```

Example:

```
intro.level1.hint1: "Use the git init command"
```

## Testing Your Level

To test your level:

1. Add it to the code as described above
2. Add all necessary translations
3. Run the application and navigate to your level
4. Try to complete it by following the objectives
5. Check all edge cases (wrong commands, incomplete steps, etc.)
