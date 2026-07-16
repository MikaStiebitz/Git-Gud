import type { FileSystem } from "./FileSystem";
import type { GitRepository } from "./GitRepository";
import type { StageType, LevelType, LevelRequirement, FileStructure, GitState, FileChange, MergeConflict, DifficultyLevel } from "~/types";
import { allStages } from "../levels";
import { getAvailableStagesForDifficulty } from "~/config/difficulties";

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
            this.resetGitRepository(gitRepository);
            this.resetLevelState(level);

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

            // Set up git state if provided - check for success
            if (level.initialState?.git) {
                const gitSetupSuccess = this.setupGitState(gitRepository, fileSystem, level.initialState.git);
                if (!gitSetupSuccess) {
                    console.error(`Failed to setup git state for level ${stageId}-${levelId}`);
                    return false;
                }
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

    private resetGitRepository(gitRepository: GitRepository): void {
        gitRepository.reset();
    }

    private resetLevelState(level: LevelType): void {
        level.completedRequirements = [];
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
    private setupGitState(gitRepository: GitRepository, fileSystem: FileSystem, gitState: GitState): boolean {
        try {
            // Initialize git if specified
            if (gitState.initialized) {
                gitRepository.init();

                // Add a default remote if none specified
                const remotes = gitRepository.getRemotes();
                if (Object.keys(remotes).length === 0) {
                    gitRepository.addRemote("origin", "https://github.com/user/repo.git");
                }

                // Create branches if specified
                if (gitState.branches) {
                    const existingBranches = gitRepository.getBranches();
                    for (const branch of gitState.branches) {
                        // Skip branches that already exist (e.g. the default "main" created by init())
                        if (existingBranches.includes(branch)) {
                            continue;
                        }
                        if (!gitRepository.createBranch(branch)) {
                            console.warn(`Failed to create branch: ${branch}`);
                            return false;
                        }
                    }
                }

                // Create commits if specified
                if (gitState.commits) {
                    for (const commit of gitState.commits) {
                        // Switch branch BEFORE committing if needed
                        if (commit.branch && commit.branch !== gitRepository.getCurrentBranch()) {
                            const checkoutResult = gitRepository.checkout(commit.branch);
                            if (!checkoutResult.success) {
                                console.warn(`Failed to checkout branch: ${commit.branch}`);
                                return false;
                            }
                        }

                        // Only commit if there's a message (empty message = just switch branch)
                        if (commit.message) {
                            // Stage files for this commit
                            for (const filePath of commit.files) {
                                gitRepository.addFile(filePath);
                            }

                            // Commit the changes. Branch-marker commits legitimately have no
                            // files (e.g. "Create develop branch"), so allow empty commits here.
                            const allowEmpty = commit.files.length === 0;
                            const commitId = gitRepository.commit(commit.message, allowEmpty);
                            if (!commitId) {
                                console.warn(`Failed to create commit: ${commit.message}`);
                                return false;
                            }
                        }
                    }
                }

                // Create merge conflicts if specified
                if (gitState.mergeConflicts) {
                    this.setupMergeConflicts(gitRepository, fileSystem, gitState.mergeConflicts);
                }

                // Switch to the specified branch if provided
                if (gitState.currentBranch) {
                    const checkoutResult = gitRepository.checkout(gitState.currentBranch);
                    if (!checkoutResult.success) {
                        console.warn(`Failed to checkout final branch: ${gitState.currentBranch}`);
                        return false;
                    }
                }

                // Apply file changes to create modified/untracked/deleted files
                if (gitState.fileChanges) {
                    this.applyFileChanges(gitRepository, fileSystem, gitState.fileChanges);
                }

                // Set up remote commits if specified
                if (gitState.remoteCommits) {
                    for (const remoteCommitSet of gitState.remoteCommits) {
                        gitRepository.setRemoteCommits(remoteCommitSet.branch, remoteCommitSet.commits);
                    }
                }
            }
            return true;
        } catch (error) {
            console.error("Error during git state setup:", error);
            return false;
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
                    // Create new untracked file (only if content is provided)
                    if (change.path) {
                        if (change.content) {
                            fileSystem.writeFile(change.path, change.content);
                        }
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
                    // Stage file (create it first if content is provided)
                    if (change.path) {
                        if (change.content) {
                            fileSystem.writeFile(change.path, change.content);
                        }
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

    // Evaluate repository-state guards for a requirement.
    // Returns true if every guard that is defined passes (and true when none are defined),
    // so it can be AND-combined with command/argument matching.
    public passesStateGuards(requirement: LevelRequirement, gitRepository: GitRepository): boolean {
        // Tag must exist (specific name, or "*" for any tag)
        if (requirement.checkTagExists !== undefined) {
            const tags = gitRepository.getTags();
            if (requirement.checkTagExists === "*") {
                if (tags.size === 0) return false;
            } else if (!tags.has(requirement.checkTagExists)) {
                return false;
            }
        }

        // A merge commit must exist in the current branch's history
        if (requirement.checkMergeExists) {
            const history = new Set(gitRepository.getCommitHistory());
            const allCommits = gitRepository.getAllCommits();
            const hasMerge = Object.entries(allCommits).some(
                ([id, commit]) => history.has(id) && (commit.isMergeCommit || (commit.parents?.length ?? 0) > 1),
            );
            if (!hasMerge) return false;
        }

        // Current branch must have at least N commits
        if (requirement.checkCommitCountAtLeast !== undefined) {
            if (gitRepository.getCommitHistory().length < requirement.checkCommitCountAtLeast) {
                return false;
            }
        }

        // Some commit on the current branch must contain this substring
        if (requirement.checkCommitMessageContains !== undefined) {
            const needle = requirement.checkCommitMessageContains.toLowerCase();
            const history = gitRepository.getCommitHistory();
            const commits = gitRepository.getCommits();
            const found = history.some(id => commits[id]?.message.toLowerCase().includes(needle));
            if (!found) return false;
        }

        return true;
    }

    // True if this requirement defines any repository-state guard
    private hasStateGuards(requirement: LevelRequirement): boolean {
        return (
            requirement.checkTagExists !== undefined ||
            requirement.checkMergeExists !== undefined ||
            requirement.checkCommitCountAtLeast !== undefined ||
            requirement.checkCommitMessageContains !== undefined
        );
    }

    // Check if all changed files are staged (for git add level)
    private areAllFilesStaged(gitRepository: GitRepository): boolean {
        const status = gitRepository.getStatus();

        let hasStaged = false;
        let hasUnstaged = false;

        for (const [file, fileStatus] of Object.entries(status)) {
            // Skip .git files
            if (file.startsWith("/.git") || file.includes("/.git/") || file.startsWith(".git")) {
                continue;
            }

            if (fileStatus === "staged") {
                hasStaged = true;
            } else if (fileStatus === "modified" || fileStatus === "untracked" || fileStatus === "deleted") {
                hasUnstaged = true;
            }
            // "committed" files are ignored - they don't need to be staged
        }

        // Return true if there's at least one staged file and no unstaged changes
        return hasStaged && !hasUnstaged;
    }

    // Check state-based requirements (file changes, file existence, branch existence)
    public checkStateBasedRequirements(
        stageId: string,
        levelId: number,
        gitRepository: GitRepository,
        fileSystem: FileSystem
    ): boolean {
        const level = this.getLevel(stageId, levelId);
        if (!level) return false;

        // Initialize completed requirements array if not present
        if (!level.completedRequirements) {
            level.completedRequirements = [];
        }

        // Initialize completed objectives array if not present
        if (!level.completedObjectives) {
            level.completedObjectives = [];
        }

        let anyRequirementCompleted = false;

        // For 'all' logic (sequential), only check the NEXT uncompleted requirement
        let requirementsToCheck;
        if (level.requirementLogic === "all") {
            const nextRequirementIndex = level.requirements.findIndex(
                req => !req.id || !(level.completedRequirements || []).includes(req.id)
            );
            requirementsToCheck = nextRequirementIndex >= 0
                ? [level.requirements[nextRequirementIndex]]
                : [];
        } else {
            requirementsToCheck = level.requirements.filter(
                req => !req.id || !(level.completedRequirements || []).includes(req.id)
            );
        }

        for (const requirement of requirementsToCheck) {
            if (!requirement) continue;

            let stateCheckPassed = false;

            // Check if file has been changed/modified
            if (requirement.checkFileChanged) {
                const filePath = requirement.checkFileChanged;
                const normalizedPath = filePath.startsWith("/") ? filePath.substring(1) : filePath;
                const status = gitRepository.getStatus();
                const fileStatus = status[normalizedPath];
                // File is considered changed if it's modified, staged, or untracked (new)
                if (fileStatus === "modified" || fileStatus === "staged" || fileStatus === "untracked") {
                    stateCheckPassed = true;
                }
            }

            // Check if file exists
            if (requirement.checkFileExists) {
                const filePath = requirement.checkFileExists;
                const content = fileSystem.getFileContents(filePath);
                if (content !== null) {
                    stateCheckPassed = true;
                }
            }

            // Check if branch exists
            if (requirement.checkBranchExists) {
                const branches = gitRepository.getBranches();
                if (branches.includes(requirement.checkBranchExists)) {
                    stateCheckPassed = true;
                }
            }

            // Repository-state guards (tags, merges, commit counts, commit messages)
            if (this.hasStateGuards(requirement) && this.passesStateGuards(requirement, gitRepository)) {
                stateCheckPassed = true;
            }

            // If any state check passed, mark requirement as completed
            if (stateCheckPassed && requirement.id && !level.completedRequirements.includes(requirement.id)) {
                level.completedRequirements.push(requirement.id);
                anyRequirementCompleted = true;

                // Check if this completes an objective
                if (requirement.objectiveId !== undefined) {
                    const objectiveRequirements = level.requirements.filter(
                        req => req.objectiveId === requirement.objectiveId
                    );
                    const allObjectiveRequirementsCompleted = objectiveRequirements.every(
                        req => !req.id || level.completedRequirements?.includes(req.id)
                    );
                    if (allObjectiveRequirementsCompleted && !level.completedObjectives?.includes(requirement.objectiveId)) {
                        level.completedObjectives?.push(requirement.objectiveId);
                    }
                }
            }
        }

        // For 'all' logic, check if all requirements have been completed
        if (level.requirementLogic === "all") {
            return level.requirements.every(
                req => !req.id || level.completedRequirements?.includes(req.id)
            );
        }

        return anyRequirementCompleted;
    }

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
        // Find stage by ID (need to search through stages object)
        // Support both lowercase ID (e.g., "intro") and capitalized key (e.g., "Intro")
        const stageEntry = Object.values(this.stages).find(stage =>
            stage.id === stageId || stage.id === stageId.toLowerCase()
        );
        if (!stageEntry) return null;

        const level = stageEntry.levels[levelId];
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
    public checkLevelCompletion(
        stageId: string,
        levelId: number,
        command: string,
        args: string[],
        gitRepository: GitRepository,
    ): boolean {
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

        // Initialize completed objectives array if not present
        if (!level.completedObjectives) {
            level.completedObjectives = [];
        }

        // Track if the current command satisfies any requirement
        let requirementSatisfied = false;

        // Special case for Git commands
        if (command === "git") {
            const gitCommand = args[0]; // e.g., "init", "status", etc.
            const gitArgs = args.slice(1); // The remaining parameters

            console.log(`Git command: ${gitCommand}, Git args:`, gitArgs);

            // For 'all' logic (sequential), only check the NEXT uncompleted requirement
            let requirementsToCheck;
            if (level.requirementLogic === "all") {
                // Find the first uncompleted requirement (sequential mode)
                const nextRequirementIndex = level.requirements.findIndex(
                    req => !req.id || !(level.completedRequirements || []).includes(req.id)
                );
                requirementsToCheck = nextRequirementIndex >= 0
                    ? [level.requirements[nextRequirementIndex]]
                    : [];
            } else {
                // For 'any' logic, check all uncompleted requirements
                requirementsToCheck = level.requirements.filter(
                    req => !req.id || !(level.completedRequirements || []).includes(req.id)
                );
            }

            for (const requirement of requirementsToCheck) {
                if (!requirement) continue; // Safety check

                // Repository-state guards must hold for this requirement to count.
                // A command may match textually, but the guard verifies the actual result.
                if (this.hasStateGuards(requirement) && !this.passesStateGuards(requirement, gitRepository)) {
                    continue;
                }

                // Special case for git add level
                if (requirement.command === "git add" && gitCommand === "add") {
                    // Check if all files are staged after the command
                    if (this.areAllFilesStaged(gitRepository)) {
                        if (requirement.id) {
                            level.completedRequirements.push(requirement.id);
                        }

                        // Check if this completes an objective
                        if (requirement.objectiveId !== undefined) {
                            // Get all requirements with the same objectiveId
                            const objectiveRequirements = level.requirements.filter(
                                req => req.objectiveId === requirement.objectiveId
                            );

                            // Check if all requirements for this objective are completed
                            const allObjectiveRequirementsCompleted = objectiveRequirements.every(
                                req => !req.id || level.completedRequirements?.includes(req.id)
                            );

                            // If all requirements for this objective are completed, mark objective as complete
                            if (allObjectiveRequirementsCompleted && !level.completedObjectives?.includes(requirement.objectiveId)) {
                                level.completedObjectives?.push(requirement.objectiveId);
                            }
                        }

                        requirementSatisfied = true;
                        break; // Only one requirement per command
                    }
                }

                // Check if command matches (including alternative commands)
                const commandMatches =
                    requirement.command === `git ${gitCommand}` ||
                    requirement.command === command ||
                    requirement.command === gitCommand ||
                    (requirement.alternativeCommands && requirement.alternativeCommands.some(altCmd => {
                        // Handle different formats of alternative commands
                        const altParts = altCmd.split(' ');

                        // Case 1: "git checkout" matches gitCommand "checkout"
                        if (altParts[0] === 'git' && altParts.length >= 2) {
                            return altParts[1] === gitCommand;
                        }

                        // Case 2: "checkout" matches gitCommand "checkout"
                        if (altParts.length === 1) {
                            return altParts[0] === gitCommand;
                        }

                        // Case 3: Full command match "git checkout" === "git checkout"
                        return altCmd === `git ${gitCommand}`;
                    }));

                if (commandMatches) {
                    console.log("Command matches!");

                    // Check arguments if required
                    if (requirement.requiresArgs) {
                        const allArgsMatch = requirement.requiresArgs.every(reqArg => {
                            if (reqArg === "any") {
                                return gitArgs.length > 0;
                            }

                            // Special case: -c and -b are equivalent for branch creation
                            // git switch -c === git checkout -b
                            if (reqArg === "-c" && gitCommand === "checkout") {
                                return gitArgs.includes("-b");
                            }
                            if (reqArg === "-b" && gitCommand === "switch") {
                                return gitArgs.includes("-c");
                            }

                            // Special placeholder: require a commit hash (prevents HEAD~n shortcuts)
                            if (reqArg === "<hash>") {
                                const hexLike = /^(?:[0-9a-f]{7,})$/i;
                                // Accept if any arg is a real commit id or a short hex-ish prefix
                                const commitIds = Object.keys(gitRepository.getCommits());
                                return gitArgs.some(a => hexLike.test(a) || commitIds.some(id => id.startsWith(a)));
                            }

                            // Check for exact match first
                            if (gitArgs.includes(reqArg)) {
                                return true;
                            }

                            // For long flags that take values (like --author="sam" or --author=sam or --grep=text)
                            if (reqArg.startsWith("--")) {
                                return gitArgs.some(arg => arg === reqArg || arg.startsWith(reqArg + "="));
                            }

                            // For short flags like -S that take values (like -S "value" or -Svalue)
                            if (reqArg.startsWith("-") && reqArg.length === 2) {
                                return gitArgs.some(arg => arg === reqArg || arg.startsWith(reqArg));
                            }

                            // General flag matching (fallback)
                            return false;
                        });

                        console.log("Args required:", requirement.requiresArgs);
                        console.log("Args match:", allArgsMatch);

                        if (!allArgsMatch) continue;
                    }

                    // Mark this requirement as completed
                    if (requirement.id) {
                        level.completedRequirements.push(requirement.id);
                    }

                    // Check if this completes an objective
                    if (requirement.objectiveId !== undefined) {
                        // Get all requirements with the same objectiveId
                        const objectiveRequirements = level.requirements.filter(
                            req => req.objectiveId === requirement.objectiveId
                        );

                        // Check if all requirements for this objective are completed
                        const allObjectiveRequirementsCompleted = objectiveRequirements.every(
                            req => !req.id || level.completedRequirements?.includes(req.id)
                        );

                        // If all requirements for this objective are completed, mark objective as complete
                        if (allObjectiveRequirementsCompleted && !level.completedObjectives?.includes(requirement.objectiveId)) {
                            level.completedObjectives?.push(requirement.objectiveId);
                        }
                    }

                    requirementSatisfied = true;
                    break; // Only one requirement per command
                }
            }
        } else if (command === "next") {
            // Special case for the "next" command
            return false; // The "next" command does not complete any level
        } else {
            // Non-Git commands
            // For 'all' logic (sequential), only check the NEXT uncompleted requirement
            let requirementsToCheck;
            if (level.requirementLogic === "all") {
                // Find the first uncompleted requirement (sequential mode)
                const nextRequirementIndex = level.requirements.findIndex(
                    req => !req.id || !(level.completedRequirements || []).includes(req.id)
                );
                requirementsToCheck = nextRequirementIndex >= 0
                    ? [level.requirements[nextRequirementIndex]]
                    : [];
            } else {
                // For 'any' logic, check all uncompleted requirements
                requirementsToCheck = level.requirements.filter(
                    req => !req.id || !(level.completedRequirements || []).includes(req.id)
                );
            }

            for (const requirement of requirementsToCheck) {
                if (!requirement) continue; // Safety check

                // Repository-state guards must hold for this requirement to count.
                // A command may match textually, but the guard verifies the actual result.
                if (this.hasStateGuards(requirement) && !this.passesStateGuards(requirement, gitRepository)) {
                    continue;
                }

                if (requirement.command === command) {
                    if (requirement.requiresArgs) {
                        const allArgsMatch = requirement.requiresArgs.every(reqArg => {
                            if (reqArg === "any") {
                                return args.length > 0;
                            }
                            // Check for exact match
                            if (args.includes(reqArg)) {
                                return true;
                            }
                            // For flags that take values (like --author="sam" or --author=sam),
                            // check if any arg starts with the required flag
                            if (reqArg.startsWith("--")) {
                                return args.some(arg => arg === reqArg || arg.startsWith(reqArg + "="));
                            }
                            // For short flags like -S that take values (like -S "value" or -Svalue)
                            if (reqArg.startsWith("-") && reqArg.length === 2) {
                                return args.some(arg => arg === reqArg || arg.startsWith(reqArg));
                            }
                            return false;
                        });

                        if (!allArgsMatch) continue;
                    }

                    // Mark this requirement as completed
                    if (requirement.id) {
                        level.completedRequirements.push(requirement.id);
                    }

                    // Check if this completes an objective
                    if (requirement.objectiveId !== undefined) {
                        // Get all requirements with the same objectiveId
                        const objectiveRequirements = level.requirements.filter(
                            req => req.objectiveId === requirement.objectiveId
                        );

                        // Check if all requirements for this objective are completed
                        const allObjectiveRequirementsCompleted = objectiveRequirements.every(
                            req => !req.id || level.completedRequirements?.includes(req.id)
                        );

                        // If all requirements for this objective are completed, mark objective as complete
                        if (allObjectiveRequirementsCompleted && !level.completedObjectives?.includes(requirement.objectiveId)) {
                            level.completedObjectives?.push(requirement.objectiveId);
                        }
                    }

                    requirementSatisfied = true;
                    break; // Only one requirement per command
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
    public getNextLevel(stageId: string, levelId: number, difficulty?: DifficultyLevel): { stageId: string | undefined; levelId: number } {
        const stage = this.getStage(stageId);
        if (!stage) return { stageId, levelId };

        const levelIds = Object.keys(stage.levels).map(id => parseInt(id));
        const maxLevelId = Math.max(...levelIds);

        if (levelId < maxLevelId) {
            // Move to the next level in the same stage
            return { stageId, levelId: levelId + 1 };
        } else {
            // Move to the first level of the next stage
            if (difficulty) {
                // Use difficulty-specific stages
                const availableStageIds = getAvailableStagesForDifficulty(difficulty);

                const currentStageIndex = availableStageIds.indexOf(stageId);

                if (currentStageIndex < availableStageIds.length - 1) {
                    const nextStageId = availableStageIds[currentStageIndex + 1];
                    return { stageId: nextStageId, levelId: 1 };
                }
            } else {
                // Fallback to all stages if no difficulty specified
                const stageIds = Object.keys(this.stages);
                const currentStageIndex = stageIds.indexOf(stageId);

                if (currentStageIndex < stageIds.length - 1) {
                    const nextStageId = stageIds[currentStageIndex + 1];
                    return { stageId: nextStageId, levelId: 1 };
                }
            }
        }

        // No next level - difficulty/game completed
        return { stageId: undefined, levelId };
    }

    // Add a custom level (for extensibility)
    public addCustomLevel(stageId: string, level: LevelType): boolean {
        const stage = this.getStage(stageId);
        if (!stage) return false;

        stage.levels[level.id] = level;
        return true;
    }
}
