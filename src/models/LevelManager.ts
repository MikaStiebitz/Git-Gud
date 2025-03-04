import type { FileSystem } from "./FileSystem";
import type { GitRepository } from "./GitRepository";
import type { StageType, LevelType, FileStructure, GitState, FileChange, MergeConflict } from "~/types";
import { allStages } from "./LevelCreator";

export class LevelManager {
    private stages: Record<string, StageType>;

    constructor() {
        this.stages = allStages;
    }

    // Setup the environment for a specific level
    public setupLevel(stageId: string, levelId: number, fileSystem: FileSystem, gitRepository: GitRepository): boolean {
        try {
            const level = this.getLevel(stageId, levelId);
            if (!level) return false;

            // Reset the file system to a clean state
            this.resetFileSystem(fileSystem);

            // Set up initial file structure based on the level configuration
            if (level.initialState?.files !== undefined) {
                // If files array is provided (even if empty)
                if (level.initialState.files.length > 0) {
                    // Set up the specified files
                    this.setupFileStructure(fileSystem, level.initialState.files);
                }
                // If files is an empty array, don't create any files
            } else {
                // Default file structure if files property is not specified
                this.setupDefaultFileStructure(fileSystem);
            }

            // Set up git state if provided
            if (level.initialState?.git) {
                this.setupGitState(gitRepository, fileSystem, level.initialState.git);
            }

            return true;
        } catch (error) {
            console.error(`Error setting up level ${stageId}-${levelId}:`, error);
            return false;
        }
    }

    // Reset the file system to a clean state
    private resetFileSystem(fileSystem: FileSystem): void {
        // Create root directory
        fileSystem.mkdir("/");
    }

    // Set up the file structure based on configuration
    private setupFileStructure(fileSystem: FileSystem, files: FileStructure[]): void {
        for (const file of files) {
            // Create parent directories if they don't exist
            const dirPath = this.getDirectoryPath(file.path);
            if (dirPath && dirPath !== "/") {
                fileSystem.mkdir(dirPath);
            }

            // Create the file with content
            fileSystem.writeFile(file.path, file.content);
        }
    }

    // Set up default file structure
    private setupDefaultFileStructure(fileSystem: FileSystem): void {
        fileSystem.writeFile("/README.md", "# Git Learning Game\n\nWelcome to the Git learning game!");
        fileSystem.mkdir("/src");
        fileSystem.writeFile("/src/index.js", 'console.log("Hello, Git!");');
    }

    // Set up git state based on configuration
    private setupGitState(gitRepository: GitRepository, fileSystem: FileSystem, gitState: GitState): void {
        // Initialize git if specified
        if (gitState.initialized) {
            gitRepository.init();

            // Create branches if specified
            if (gitState.branches) {
                for (const branch of gitState.branches) {
                    gitRepository.createBranch(branch);
                }
            }

            // Create commits if specified
            if (gitState.commits) {
                for (const commit of gitState.commits) {
                    // Stage files for this commit
                    for (const filePath of commit.files) {
                        gitRepository.addFile(filePath);
                    }

                    // Commit the changes
                    gitRepository.commit(commit.message);

                    // Switch branch if needed for next commit
                    if (commit.branch && commit.branch !== gitRepository.getCurrentBranch()) {
                        gitRepository.checkout(commit.branch);
                    }
                }
            }

            // Create merge conflicts if specified
            if (gitState.mergeConflicts) {
                this.setupMergeConflicts(gitRepository, fileSystem, gitState.mergeConflicts);
            }

            // Switch to the specified branch if provided
            if (gitState.currentBranch) {
                gitRepository.checkout(gitState.currentBranch);
            }

            // Apply file changes to create modified/untracked/deleted files
            if (gitState.fileChanges) {
                this.applyFileChanges(gitRepository, fileSystem, gitState.fileChanges);
            }
        }
    }

    // Set up merge conflicts
    private setupMergeConflicts(
        gitRepository: GitRepository,
        fileSystem: FileSystem,
        conflicts: MergeConflict[],
    ): void {
        // Implementation would depend on how your GitRepository handles merge conflicts
        // This is a simplified approach
        for (const conflict of conflicts) {
            // Create conflicting changes in the specified file
            if (conflict.file && conflict.content) {
                fileSystem.writeFile(conflict.file, conflict.content);
                gitRepository.updateFileStatus(conflict.file, "modified");
            }
        }
    }

    // Apply file changes to create modified/untracked/deleted files
    private applyFileChanges(gitRepository: GitRepository, fileSystem: FileSystem, changes: FileChange[]): void {
        for (const change of changes) {
            switch (change.status) {
                case "modified":
                    // Update file content
                    if (change.path && change.content) {
                        fileSystem.writeFile(change.path, change.content);
                        gitRepository.updateFileStatus(change.path, "modified");
                    }
                    break;
                case "untracked":
                    // Create new untracked file
                    if (change.path && change.content) {
                        fileSystem.writeFile(change.path, change.content);
                        gitRepository.updateFileStatus(change.path, "untracked");
                    }
                    break;
                case "deleted":
                    // Delete file
                    if (change.path) {
                        fileSystem.delete(change.path);
                        gitRepository.updateFileStatus(change.path, "deleted");
                    }
                    break;
                case "staged":
                    // Create and stage file
                    if (change.path && change.content) {
                        fileSystem.writeFile(change.path, change.content);
                        gitRepository.addFile(change.path);
                    }
                    break;
            }
        }
    }

    // Helper to extract directory path from a file path
    private getDirectoryPath(filePath: string): string {
        const lastSlashIndex = filePath.lastIndexOf("/");
        if (lastSlashIndex === -1) return "/";
        return filePath.substring(0, lastSlashIndex) || "/";
    }

    // The remaining methods from the original LevelManager stay the same
    // getAllStages, getStage, getLevel, etc.

    // Get all stages with translated content
    public getAllStages(translateFunc?: (key: string) => string): Record<string, StageType> {
        if (!translateFunc) {
            return { ...this.stages };
        }

        // Create a deep copy with translated content
        const translatedStages: Record<string, StageType> = {};

        for (const [stageId, stage] of Object.entries(this.stages)) {
            translatedStages[stageId] = {
                ...stage,
                name: translateFunc(stage.name),
                description: translateFunc(stage.description),
                levels: this.getTranslatedLevels(stage.levels, translateFunc),
            };
        }

        return translatedStages;
    }

    // Get a specific stage with translated content
    public getStage(stageId: string, translateFunc?: (key: string) => string): StageType | null {
        const stage = this.stages[stageId];
        if (!stage) return null;

        if (!translateFunc) {
            return stage;
        }

        return {
            ...stage,
            name: translateFunc(stage.name),
            description: translateFunc(stage.description),
            levels: this.getTranslatedLevels(stage.levels, translateFunc),
        };
    }

    // Get a specific level with translated content
    public getLevel(stageId: string, levelId: number, translateFunc?: (key: string) => string): LevelType | null {
        const level = this.stages[stageId]?.levels[levelId];
        if (!level) return null;

        if (!translateFunc) {
            return level;
        }

        return this.translateLevel(level, translateFunc);
    }

    // Helper to translate level content
    private translateLevel(level: LevelType, translateFunc: (key: string) => string): LevelType {
        return {
            ...level,
            name: translateFunc(level.name),
            description: translateFunc(level.description),
            objectives: level.objectives.map(obj => translateFunc(obj)),
            hints: level.hints.map(hint => translateFunc(hint)),
            requirements: level.requirements.map(req => ({
                ...req,
                description: translateFunc(req.description),
                successMessage: req.successMessage ? translateFunc(req.successMessage) : undefined,
            })),
            story: level.story
                ? {
                      title: translateFunc(level.story.title),
                      narrative: translateFunc(level.story.narrative),
                      realWorldContext: translateFunc(level.story.realWorldContext),
                      taskIntroduction: translateFunc(level.story.taskIntroduction),
                  }
                : undefined,
        };
    }

    // Helper to translate all levels in a stage
    private getTranslatedLevels(
        levels: Record<number, LevelType>,
        translateFunc: (key: string) => string,
    ): Record<number, LevelType> {
        const translatedLevels: Record<number, LevelType> = {};

        for (const [levelId, level] of Object.entries(levels)) {
            translatedLevels[parseInt(levelId)] = this.translateLevel(level, translateFunc);
        }

        return translatedLevels;
    }

    // Check if a command completes a level requirement
    public checkLevelCompletion(stageId: string, levelId: number, command: string, args: string[]): boolean {
        console.log(`Checking level completion for stage: ${stageId}, level: ${levelId}`);
        console.log(`Command: ${command}, args:`, args);

        const level = this.getLevel(stageId, levelId);
        if (!level) {
            console.log("Level not found");
            return false;
        }

        // Initialize completed requirements array if not present
        if (!level.completedRequirements) {
            level.completedRequirements = [];
        }

        // Track if the current command satisfies any requirement
        let requirementSatisfied = false;

        // Special case for Git commands
        if (command === "git") {
            const gitCommand = args[0]; // e.g., "init", "status", etc.
            const gitArgs = args.slice(1); // The remaining parameters

            console.log(`Git command: ${gitCommand}, Git args:`, gitArgs);

            for (const requirement of level.requirements) {
                // Skip already completed requirements
                if (requirement.id && level.completedRequirements.includes(requirement.id)) {
                    continue;
                }

                // Check if this is the right Git command
                if (
                    requirement.command === `git ${gitCommand}` ||
                    requirement.command === command ||
                    requirement.command === gitCommand
                ) {
                    console.log("Command matches!");

                    // Check arguments if required
                    if (requirement.requiresArgs) {
                        const allArgsMatch = requirement.requiresArgs.every(reqArg => {
                            if (reqArg === "any") {
                                return gitArgs.length > 0;
                            }
                            return gitArgs.includes(reqArg);
                        });

                        console.log("Args required:", requirement.requiresArgs);
                        console.log("Args match:", allArgsMatch);

                        if (!allArgsMatch) continue;
                    }

                    // Mark this requirement as completed
                    if (requirement.id) {
                        level.completedRequirements.push(requirement.id);
                    }
                    requirementSatisfied = true;
                }
            }
        } else if (command === "next") {
            // Special case for the "next" command
            return false; // The "next" command does not complete any level
        } else {
            // Non-Git commands
            for (const requirement of level.requirements) {
                // Skip already completed requirements
                if (requirement.id && level.completedRequirements.includes(requirement.id)) {
                    continue;
                }

                if (requirement.command === command) {
                    if (requirement.requiresArgs) {
                        const allArgsMatch = requirement.requiresArgs.every(reqArg => {
                            if (reqArg === "any") {
                                return args.length > 0;
                            }
                            return args.includes(reqArg);
                        });

                        if (!allArgsMatch) continue;
                    }

                    // Mark this requirement as completed
                    if (requirement.id) {
                        level.completedRequirements.push(requirement.id);
                    }
                    requirementSatisfied = true;
                }
            }
        }

        // For single requirement or 'any' logic, return true if any requirement is satisfied
        if (level.requirementLogic !== "all" || level.requirements.length === 1) {
            return requirementSatisfied;
        }

        // For 'all' logic, check if all requirements have been completed
        const allRequirementsCompleted = level.requirements.every(
            req => !req.id || level.completedRequirements?.includes(req.id),
        );

        return allRequirementsCompleted;
    }

    // Get next level information
    public getNextLevel(stageId: string, levelId: number): { stageId: string | undefined; levelId: number } {
        const stage = this.getStage(stageId);
        if (!stage) return { stageId, levelId };

        const levelIds = Object.keys(stage.levels).map(id => parseInt(id));
        const maxLevelId = Math.max(...levelIds);

        if (levelId < maxLevelId) {
            // Move to the next level in the same stage
            return { stageId, levelId: levelId + 1 };
        } else {
            // Move to the first level of the next stage
            const stageIds = Object.keys(this.stages);
            const currentStageIndex = stageIds.indexOf(stageId);

            if (currentStageIndex < stageIds.length - 1) {
                const nextStageId = stageIds[currentStageIndex + 1];
                return { stageId: nextStageId, levelId: 1 };
            }
        }

        // No next level - game completed
        return { stageId, levelId };
    }

    // Add a custom level (for extensibility)
    public addCustomLevel(stageId: string, level: LevelType): boolean {
        const stage = this.getStage(stageId);
        if (!stage) return false;

        stage.levels[level.id] = level;
        return true;
    }
}
