import type { HistoryState } from "../types";

export class HistoryService {
    private history: string[] = [];
    private historyIndex = -1;

    addToHistory(command: string): void {
        // Don't add empty commands or duplicates of the last command
        if (!command.trim() || (this.history.length > 0 && this.history[0] === command)) {
            this.historyIndex = -1;
            return;
        }

        this.history = [command, ...this.history.slice(0, 49)]; // Keep last 50 commands
        this.historyIndex = -1; // Reset to no selection
    }

    navigateUp(): HistoryState {
        if (this.history.length === 0) {
            return {
                commands: this.history,
                index: this.historyIndex,
            };
        }

        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex += 1;
        }

        return {
            commands: this.history,
            index: this.historyIndex,
        };
    }

    navigateDown(): HistoryState {
        if (this.historyIndex > 0) {
            this.historyIndex -= 1;
        } else {
            this.historyIndex = -1; // Reset to no selection
        }

        return {
            commands: this.history,
            index: this.historyIndex,
        };
    }

    setIndex(index: number): void {
        this.historyIndex = index;
    }

    getCurrentIndex(): number {
        return this.historyIndex;
    }

    getHistoryCommands(): string[] {
        return [...this.history]; // Return a copy
    }

    reset(): void {
        this.history = [];
        this.historyIndex = -1;
    }
}
