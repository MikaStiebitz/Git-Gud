import type { UserProgress } from "../types";

export class ProgressManager {
    private progress: UserProgress;
    private readonly STORAGE_KEY = "git-game-progress";

    constructor() {
        const savedProgress = this.loadProgress();

        if (savedProgress) {
            this.progress = savedProgress;
        } else {
            this.progress = {
                completedLevels: {},
                currentStage: "Intro",
                currentLevel: 1,
                score: 0,
                lastSavedAt: new Date().toISOString(),
            };
            this.saveProgress();
        }
    }

    // Get current progress
    public getProgress(): UserProgress {
        return { ...this.progress };
    }

    // Mark a level as completed
    public completeLevel(stage: string, level: number, score: number = 10): void {
        if (!this.progress.completedLevels[stage]) {
            this.progress.completedLevels[stage] = [];
        }

        if (!this.progress.completedLevels[stage].includes(level)) {
            this.progress.completedLevels[stage].push(level);
            this.progress.score += score;
        }

        this.progress.lastSavedAt = new Date().toISOString();
        this.saveProgress();
    }

    // Set current stage and level
    public setCurrentLevel(stage: string, level: number): void {
        this.progress.currentStage = stage;
        this.progress.currentLevel = level;
        this.progress.lastSavedAt = new Date().toISOString();
        this.saveProgress();
    }

    // Check if a level is completed
    public isLevelCompleted(stage: string, level: number): boolean {
        return !!this.progress.completedLevels[stage]?.includes(level);
    }

    // Reset all progress
    public resetProgress(): void {
        this.progress = {
            completedLevels: {},
            currentStage: "Intro",
            currentLevel: 1,
            score: 0,
            lastSavedAt: new Date().toISOString(),
        };
        this.saveProgress();
    }

    // Save progress to localStorage
    private saveProgress(): void {
        if (typeof window !== "undefined") {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.progress));
        }
    }

    // Load progress from localStorage
    private loadProgress(): UserProgress | null {
        if (typeof window !== "undefined") {
            const savedData = localStorage.getItem(this.STORAGE_KEY);
            if (savedData) {
                try {
                    return JSON.parse(savedData) as UserProgress;
                } catch (e) {
                    console.error("Failed to parse saved progress", e);
                }
            }
        }
        return null;
    }
}
