import type { ReactNode, RefObject } from "react";

export interface TerminalProps {
    className?: string;
    showHelpButton?: boolean;
    showResetButton?: boolean;
    isPlaygroundMode?: boolean;
}

export interface TerminalHeaderProps {
    isPlaygroundMode: boolean;
    currentStage: string;
    currentLevel: number;
    showHelpButton: boolean;
    showResetButton: boolean;
    handleShowHelp: () => void;
    handleReset: () => void;
    t: (key: string) => string;
}

export interface TerminalOutputProps {
    terminalOutput: string[];
    isLevelCompleted: boolean;
    isPlaygroundMode: boolean;
    scrollAreaRef: RefObject<HTMLDivElement>;
    outputContainerRef: RefObject<HTMLDivElement>;
    renderTerminalOutput: (line: string) => ReactNode;
    t: (key: string) => string;
}

export interface TerminalInputProps {
    input: string;
    inputRef: RefObject<HTMLInputElement>;
    handleFormSubmit: (e: React.FormEvent) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    commandSuggestion: string;
    showCommandSuggestion: boolean;
    showAutocomplete: boolean;
    fileAutocomplete: string[];
    selectAutocompleteOption: (file: string) => void;
    renderFancyPrompt: () => ReactNode;
    t: (key: string) => string;
}

export interface TerminalPromptProps {
    currentDirectory: string;
    isGitInitialized: boolean;
    branch: string;
    stagedCount: number;
    modifiedCount: number;
    untrackedCount: number;
    unpushedCommitsCount: number;
}

export interface HistoryState {
    commands: string[];
    index: number;
}

export interface AutocompleteState {
    fileMatches: string[];
    showMenu: boolean;
    commandSuggestion: string;
    showCommandSuggestion: boolean;
}
