import type { HistoryState } from "../types";

export class HistoryService {
    private history: string[] = [];
    private historyIndex = -1;

    addToHistory(command: string): void {
        this.history = [command, ...this.history.slice(0, 49)];
        this.historyIndex = -1;
    }

    navigateUp(): HistoryState {
        if (this.historyIndex < this.history.length - 1) {
            const newIndex = this.historyIndex + 1;
            return {
                commands: this.history,
                index: newIndex,
            };
        }

        return {
            commands: this.history,
            index: this.historyIndex,
        };
    }

    navigateDown(): HistoryState {
        if (this.historyIndex > 0) {
            const newIndex = this.historyIndex - 1;
            return {
                commands: this.history,
                index: newIndex,
            };
        } else if (this.historyIndex === 0) {
            return {
                commands: this.history,
                index: -1,
            };
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
        return this.history;
    }
}
