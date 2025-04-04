import { useState, useRef, useEffect } from "react";
import { useGameContext } from "~/contexts/GameContext";
import { useLanguage } from "~/contexts/LanguageContext";
import { TerminalHeader } from "./models/Header";
import { TerminalOutput } from "./models/Output";
import { TerminalInput } from "./models/Input";
import { TerminalPrompt } from "./models/Prompt";
import { CommandService } from "./services/Command";
import { HistoryService } from "./services/History";
import { AutocompleteService } from "./services/Autocomplete";
import { OutputFormatterService } from "./services/OutputFormatter";
import type { TerminalProps } from "./types";

export function Terminal({
    className,
    showHelpButton = true,
    showResetButton = true,
    isPlaygroundMode = false,
}: TerminalProps) {
    const {
        terminalOutput,
        handleCommand,
        resetCurrentLevel,
        commandProcessor,
        fileSystem,
        gitRepository,
        currentStage,
        currentLevel,
        isLevelCompleted,
        openFileEditor,
        openCommitDialog,
    } = useGameContext();

    const { t } = useLanguage();

    // Initialize OOP service classes
    const commandService = new CommandService(
        handleCommand,
        isPlaygroundMode,
        isLevelCompleted,
        openFileEditor,
        openCommitDialog,
    );

    const historyService = new HistoryService();

    const autocompleteService = new AutocompleteService(commandProcessor, fileSystem);

    const outputFormatter = new OutputFormatterService(terminalOutput);

    // Terminal state
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [fileAutocomplete, setFileAutocomplete] = useState<string[]>([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [commandSuggestion, setCommandSuggestion] = useState<string>("");
    const [showCommandSuggestion, setShowCommandSuggestion] = useState<boolean>(false);

    // References for DOM manipulation
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const outputContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when terminal output changes
    useEffect(() => {
        if (scrollAreaRef.current) {
            // We need to find the actual scrollable viewport inside the Radix UI ScrollArea
            const scrollableViewport = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
            if (scrollableViewport) {
                // Use requestAnimationFrame to ensure this happens after the render is complete
                requestAnimationFrame(() => {
                    scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
                });
            }
        }
    }, [terminalOutput]);

    // Focus input field on mount (not on mobile devices)
    useEffect(() => {
        if (inputRef.current && !isMobileDevice()) {
            inputRef.current.focus();
        }
    }, []);

    // Check if device is likely mobile
    const isMobileDevice = () => {
        if (typeof window !== "undefined") {
            return (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                window.innerWidth <= 768
            );
        }
        return false;
    };

    // Handle form submission (user presses Enter)
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Close the autocomplete menu
        setShowAutocomplete(false);
        setShowCommandSuggestion(false);

        // Execute command via service
        commandService.executeCommand(input);

        // Add to command history
        historyService.addToHistory(input);
        setCommandHistory(historyService.getHistoryCommands());
        setHistoryIndex(historyService.getCurrentIndex());

        // Clear input
        setInput("");
    };

    // Handle input changes and update command suggestions
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInput(newValue);

        // Get command suggestion if applicable
        const suggestion = autocompleteService.getCommandSuggestion(newValue);
        setCommandSuggestion(suggestion ?? "");
        setShowCommandSuggestion(!!suggestion);

        // Hide file autocomplete when typing
        setShowAutocomplete(false);
    };

    // Process Tab-autocomplete for files
    const handleTabAutocomplete = () => {
        const result = autocompleteService.processTabAutocomplete(input);

        if (result.fileMatches.length === 1) {
            // If there's only one match, complete it directly
            setInput(autocompleteService.generateCompletedCommand(input, result.fileMatches[0] ?? ""));
            setShowAutocomplete(false);
        } else if (result.fileMatches.length > 1) {
            // If there are multiple matches, show the autocomplete menu
            setFileAutocomplete(result.fileMatches);
            setShowAutocomplete(true);
        }

        // Update command suggestions
        setCommandSuggestion(result.commandSuggestion);
        setShowCommandSuggestion(result.showCommandSuggestion);
    };

    // Select a suggestion from the autocomplete menu
    const selectAutocompleteOption = (file: string) => {
        setInput(autocompleteService.generateCompletedCommand(input, file));
        setShowAutocomplete(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Handle keyboard shortcuts and navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Handle command history navigation with up/down arrows
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const historyState = historyService.navigateUp();
            setHistoryIndex(historyState.index);
            if (historyState.index >= 0) {
                setInput(historyState.commands[historyState.index] ?? "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const historyState = historyService.navigateDown();
            setHistoryIndex(historyState.index);
            if (historyState.index >= 0) {
                setInput(historyState.commands[historyState.index] ?? "");
            } else {
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();

            // If we have a command suggestion, use it
            if (showCommandSuggestion && commandSuggestion) {
                setInput(commandSuggestion);
                setShowCommandSuggestion(false);
                return;
            }

            // Otherwise, try file autocomplete
            handleTabAutocomplete();
        } else if (e.key === "Escape") {
            // Escape key closes all popups
            setShowAutocomplete(false);
            setShowCommandSuggestion(false);
        }
    };

    // Handle help button click
    const handleShowHelp = () => {
        handleCommand("help", isPlaygroundMode);
    };

    // Handle reset button click with confirmation
    const handleReset = () => {
        if (window.confirm(t("level.resetConfirm"))) {
            resetCurrentLevel();
        }
    };

    // Render a fancy Oh My Posh-like prompt
    const renderFancyPrompt = () => {
        const currentDir = commandProcessor.getCurrentDirectory();
        const isGitInitialized = gitRepository.isInitialized();
        const branch = isGitInitialized ? gitRepository.getCurrentBranch() : "";

        // Get git status info
        const status = gitRepository.getStatus();
        const stagedCount = Object.values(status).filter(s => s === "staged").length;
        const modifiedCount = Object.values(status).filter(s => s === "modified").length;
        const untrackedCount = Object.values(status).filter(s => s === "untracked").length;

        // Check for unpushed commits
        const unpushedCommitsCount = gitRepository.getUnpushedCommitCount();

        return (
            <TerminalPrompt
                currentDirectory={currentDir}
                isGitInitialized={isGitInitialized}
                branch={branch}
                stagedCount={stagedCount}
                modifiedCount={modifiedCount}
                untrackedCount={untrackedCount}
                unpushedCommitsCount={unpushedCommitsCount}
            />
        );
    };

    return (
        <div
            className={`flex flex-col overflow-hidden rounded-md border border-purple-800/50 bg-[#1a1625] shadow-lg ${className}`}>
            <TerminalHeader
                isPlaygroundMode={isPlaygroundMode}
                currentStage={currentStage}
                currentLevel={currentLevel}
                showHelpButton={showHelpButton}
                showResetButton={showResetButton}
                handleShowHelp={handleShowHelp}
                handleReset={handleReset}
                t={t}
            />

            <TerminalOutput
                terminalOutput={terminalOutput}
                isLevelCompleted={isLevelCompleted}
                isPlaygroundMode={isPlaygroundMode}
                scrollAreaRef={scrollAreaRef}
                outputContainerRef={outputContainerRef}
                renderTerminalOutput={line => outputFormatter.renderTerminalOutput(line)}
                t={t}
            />

            <TerminalInput
                input={input}
                inputRef={inputRef}
                handleFormSubmit={handleFormSubmit}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                commandSuggestion={commandSuggestion}
                showCommandSuggestion={showCommandSuggestion}
                showAutocomplete={showAutocomplete}
                fileAutocomplete={fileAutocomplete}
                selectAutocompleteOption={selectAutocompleteOption}
                renderFancyPrompt={renderFancyPrompt}
                t={t}
            />
        </div>
    );
}
