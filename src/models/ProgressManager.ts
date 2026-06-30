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
                coins: 0,
                lastSavedAt: new Date().toISOString(),
                purchasedItems: [],
                completedMinigames: [],
                minigameScores: {},
                doubleXpUntil: null,
            };
            this.saveProgress();
        }

        // Migration for existing users who don't have the new properties
        if (!this.progress) {
            console.error("Progress not initialized properly");
            return;
        }

        if (!this.progress.purchasedItems) {
            this.progress.purchasedItems = [];
        }
        if (!this.progress.completedMinigames) {
            this.progress.completedMinigames = [];
        }
        if (!this.progress.minigameScores) {
            this.progress.minigameScores = {};
        }
        if (this.progress.doubleXpUntil === undefined || this.progress.doubleXpUntil === null) {
            this.progress.doubleXpUntil = null;
        }
        if (this.progress.gitGudActivated === undefined) {
            this.progress.gitGudActivated = false;
        }
        if (!this.progress.coins) {
            // Migration: existing users get coins equal to their score
            this.progress.coins = this.progress.score || 0;
        }
    }

    // Get current progress
    public getProgress(): UserProgress {
        return { ...this.progress };
    }

    // Mark a level as completed
    public completeLevel(stage: string, level: number, score = 10): void {
        if (!this.progress.completedLevels[stage]) {
            this.progress.completedLevels[stage] = [];
        }

        if (!this.progress.completedLevels[stage].includes(level)) {
            this.progress.completedLevels[stage].push(level);

            // Apply double XP if active
            const finalScore = this.isDoubleXpActive() ? score * 2 : score;

            // Add to score (progress points - never decreases)
            this.progress.score += finalScore;

            // Add to coins (shop currency - can be spent)
            this.progress.coins += finalScore;
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
            coins: 0,
            lastSavedAt: new Date().toISOString(),
            purchasedItems: [],
            completedMinigames: [],
            minigameScores: {},
        };
        this.saveProgress();
    }

    // Shop functionality
    public spendPoints(amount: number): boolean {
        if (this.progress.coins >= amount) {
            this.progress.coins -= amount;
            this.progress.lastSavedAt = new Date().toISOString();
            this.saveProgress();
            return true;
        }
        return false;
    }

    public addCoins(amount: number): void {
        // Apply double XP to coin rewards if active
        const finalAmount = this.isDoubleXpActive() ? amount * 2 : amount;
        this.progress.coins += finalAmount;
        this.progress.lastSavedAt = new Date().toISOString();
        this.saveProgress();
    }

    public getCoins(): number {
        return this.progress.coins;
    }

    public addScore(amount: number): void {
        // Apply double XP to score rewards if active
        const finalAmount = this.isDoubleXpActive() ? amount * 2 : amount;
        this.progress.score += finalAmount;
        this.progress.lastSavedAt = new Date().toISOString();
        this.saveProgress();
    }

    public purchaseItem(itemId: string): boolean {
        if (!this.progress.purchasedItems.includes(itemId)) {
            this.progress.purchasedItems.push(itemId);
            this.progress.lastSavedAt = new Date().toISOString();
            this.saveProgress();
            return true;
        }
        return false;
    }

    public isPurchased(itemId: string): boolean {
        return this.progress.purchasedItems.includes(itemId);
    }

    public getPurchasedItems(): string[] {
        return [...this.progress.purchasedItems];
    }

    // Minigame functionality - Only gives coins, not score
    public completeMinigame(gameId: string, coinReward: number): void {
        if (!this.progress.completedMinigames.includes(gameId)) {
            this.progress.completedMinigames.push(gameId);

            // Minigames only give coins (with double XP if active)
            this.addCoins(coinReward);
        }

        // Update high score if better
        const currentHighScore = this.progress.minigameScores[gameId] || 0;
        if (coinReward > currentHighScore) {
            this.progress.minigameScores[gameId] = coinReward;
        }

        this.progress.lastSavedAt = new Date().toISOString();
        this.saveProgress();
    }

    public isMinigameCompleted(gameId: string): boolean {
        return this.progress.completedMinigames.includes(gameId);
    }

    public getMinigameScore(gameId: string): number {
        return this.progress.minigameScores[gameId] || 0;
    }

    public getCompletedMinigames(): string[] {
        return [...this.progress.completedMinigames];
    }

    // Save progress to localStorage
    private saveProgress(): void {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.progress));
            } catch (error) {
                // Handle localStorage quota exceeded or other errors
                if (error instanceof Error) {
                    if (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                        console.warn("localStorage quota exceeded. Game progress may not persist.", error);
                    } else if (error.name === "SecurityError") {
                        console.warn("localStorage access denied (possibly private browsing). Game progress will not persist.", error);
                    } else {
                        console.error("Failed to save progress:", error);
                    }
                }
            }
        }
    }

    // Load progress from localStorage
    private loadProgress(): UserProgress | null {
        if (typeof window !== "undefined") {
            try {
                const savedData = localStorage.getItem(this.STORAGE_KEY);
                if (savedData) {
                    return JSON.parse(savedData) as UserProgress;
                }
            } catch (error) {
                // Handle both parse errors and access errors
                if (error instanceof Error) {
                    if (error.name === "SyntaxError") {
                        console.error("Failed to parse saved progress (corrupted data)", error);
                    } else if (error.name === "SecurityError") {
                        console.warn("localStorage access denied (possibly private browsing).");
                    } else {
                        console.error("Failed to load progress:", error);
                    }
                }
            }
        }
        return null;
    }

    // Check if double XP is currently active
    public isDoubleXpActive(): boolean {
        if (!this.progress.doubleXpUntil) return false;

        const expiryDate = new Date(this.progress.doubleXpUntil);
        const now = new Date();

        return now < expiryDate;
    }

    // Activate double XP for 7 days
    public activateDoubleXp(): void {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7); // 7 days from now

        this.progress.doubleXpUntil = expiryDate.toISOString();
        this.saveProgress();
    }

    // Get remaining double XP time in hours
    public getDoubleXpRemainingHours(): number {
        if (!this.isDoubleXpActive()) return 0;

        const expiryDate = new Date(this.progress.doubleXpUntil!);
        const now = new Date();
        const diffMs = expiryDate.getTime() - now.getTime();

        return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60))); // Convert to hours
    }

    // Git Gud Easter Egg functionality
    public hasActivatedGitGud(): boolean {
        return this.progress.gitGudActivated || false;
    }

    public activateGitGud(): boolean {
        if (this.progress.gitGudActivated) {
            return false; // Already activated
        }

        this.progress.gitGudActivated = true;

        // Secret bonus: score + coins!
        const bonus = this.isDoubleXpActive() ? 100 : 50;
        this.progress.score += bonus;
        this.progress.coins += bonus;

        this.progress.lastSavedAt = new Date().toISOString();
        this.saveProgress();
        return true; // First time activation
    }
}
