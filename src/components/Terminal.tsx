import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useGameContext } from "~/contexts/GameContext";
import { HelpCircleIcon, RotateCcw, Send, Github, FileIcon, X, Circle, ArrowUpIcon } from "lucide-react";
import { useLanguage } from "~/contexts/LanguageContext";
import commandRegistry from "../commands";

interface TerminalProps {
    className?: string;
    showHelpButton?: boolean;
    showResetButton?: boolean;
    isPlaygroundMode?: boolean;
}

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

        // Split input by semicolons to support command chaining
        const commands = input
            .split(";")
            .map(cmd => cmd.trim())
            .filter(cmd => cmd);

        // Process each command in sequence
        for (const command of commands) {
            // Special case handling for nano command
            if (command.startsWith("nano ")) {
                const args = command.split(/\s+/);
                if (args.length > 1) {
                    const fileName = args[1] ?? "";
                    // Call handleCommand first to let it handle creating the file if needed
                    handleCommand(command, isPlaygroundMode);
                    // Then open the file editor
                    openFileEditor(fileName, isPlaygroundMode);
                    continue;
                }
            }

            if (command === "git commit") {
                handleCommand(command, isPlaygroundMode);
                openCommitDialog();
                continue;
            }

            // Special case for the "next" command when level is completed
            if (command === "next" && isLevelCompleted) {
                handleCommand("next", isPlaygroundMode);
                continue;
            }

            // Normal command processing
            handleCommand(command, isPlaygroundMode);
        }

        // Add to command history (the full command with semicolons)
        setCommandHistory(prev => [input, ...prev.slice(0, 49)]);
        setHistoryIndex(-1);

        // Clear input
        setInput("");
    };

    // Get command suggestion for tab completion
    const getCommandSuggestion = (partialCommand: string): string | undefined => {
        if (!partialCommand || partialCommand.trim() === "") return undefined;

        // Normalize input (lowercase, trim spaces)
        const normalizedInput = partialCommand.toLowerCase().trim();

        // Get all tab-completion-enabled commands from registry
        const completionCommands = commandRegistry.getTabCompletionCommands();

        // Find matching commands that start with the input
        const matches = completionCommands.filter(cmd => cmd.toLowerCase().startsWith(normalizedInput));

        // Return the first match or undefined
        return matches.length > 0 ? matches[0] : undefined;
    };

    // Handle input changes and update command suggestions
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInput(newValue);

        // Get command suggestion if applicable
        const suggestion = getCommandSuggestion(newValue);
        setCommandSuggestion(suggestion ?? "");
        setShowCommandSuggestion(!!suggestion);

        // Hide file autocomplete when typing
        setShowAutocomplete(false);
    };

    // Process Tab-autocomplete for files
    const handleTabAutocomplete = () => {
        // Normalize input by removing excess spaces
        const normalizedInput = input.trim().replace(/\s+/g, " ");

        // Extract command and arguments
        const parts = normalizedInput.split(" ");
        let commandName = parts[0] ?? "";

        // Special handling for Git commands (two-word commands)
        if (commandName === "git" && parts.length > 1) {
            commandName = `git ${parts[1]}`;
        }

        // Check if this is a command that supports file completion
        const supportsFileCompletion = commandRegistry.supportsFileCompletion(commandName);

        // If command suggestion is active but we don't have file completion,
        // complete the command when Tab is pressed
        if (showCommandSuggestion && commandSuggestion && !supportsFileCompletion) {
            setInput(commandSuggestion);
            setShowCommandSuggestion(false);
            return;
        }

        if (!supportsFileCompletion) return;

        // For commands that support file completion, handle file path autocomplete
        let filePart = "";

        if (parts.length > 1) {
            // Extract the potential file path part
            if (
                commandName === "git add" ||
                commandName === "git rm" ||
                commandName === "git checkout" ||
                commandName === "git restore"
            ) {
                // For Git commands with subcommands, use the remaining parts as file path
                filePart = parts.slice(2).join(" ");
            } else {
                // For regular commands, use everything after the command as file path
                filePart = parts.slice(1).join(" ");
            }
        }

        // Get files in the current directory
        const currentDir = commandProcessor.getCurrentDirectory();
        const contents = fileSystem.getDirectoryContents(currentDir);
        if (!contents) return;

        // Filter files based on the current input path
        const matchingFiles = Object.keys(contents).filter(file => file.startsWith(filePart || ""));

        if (matchingFiles.length === 1) {
            // If there's only one match, complete it directly
            if (commandName.startsWith("git ")) {
                const commandParts = parts.slice(0, 2); // "git" and the subcommand
                setInput(`${commandParts.join(" ")} ${matchingFiles[0]}`);
            } else {
                // Format: command filename
                setInput(`${commandName} ${matchingFiles[0]}`);
            }
            setShowAutocomplete(false);
        } else if (matchingFiles.length > 1) {
            // If there are multiple matches, show the autocomplete menu
            setFileAutocomplete(matchingFiles);
            setShowAutocomplete(true);
        }
    };

    // Select a suggestion from the autocomplete menu
    const selectAutocompleteOption = (file: string) => {
        // Split current input into command and arguments
        const parts = input.trim().split(/\s+/);

        if (parts[0] === "git" && parts.length > 1) {
            // For git commands: git command filename
            setInput(`${parts[0]} ${parts[1]} ${file}`);
        } else {
            // For regular commands: command filename
            setInput(`${parts[0]} ${file}`);
        }

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
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex] ?? "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex] ?? "");
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
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

        // Format display path
        const displayPath = currentDir === "/" ? "/" : currentDir;
        const pathSegments = displayPath.split("/").filter(Boolean);
        const shortPath = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "/";

        return (
            <div className="flex items-center space-x-1">
                {/* Username segment */}
                <span className="rounded-r bg-gradient-to-r from-purple-700 to-purple-600 px-2 py-0.5 text-white">
                    user@gitgud
                </span>

                {/* Directory segment */}
                <span className="flex items-center rounded bg-gradient-to-r from-purple-600 to-purple-500 px-2 py-0.5 text-white">
                    <FileIcon className="mr-1 h-3 w-3" />
                    {shortPath}
                </span>

                {/* Git segment - only show if initialized */}
                {isGitInitialized && (
                    <span
                        className={`flex items-center rounded px-2 py-0.5 text-white ${
                            stagedCount || modifiedCount || untrackedCount
                                ? "bg-gradient-to-r from-yellow-700 to-yellow-600"
                                : "bg-gradient-to-r from-green-700 to-green-600"
                        }`}>
                        <Github className="mr-1 h-3 w-3" />
                        {branch}

                        {/* Git status indicators */}
                        {stagedCount > 0 && (
                            <span className="ml-1 flex items-center text-green-300">
                                <Circle className="mr-0.5 h-2 w-2 fill-current" />
                                {stagedCount}
                            </span>
                        )}

                        {modifiedCount > 0 && (
                            <span className="ml-1 flex items-center text-yellow-300">
                                <Circle className="mr-0.5 h-2 w-2 fill-current" />
                                {modifiedCount}
                            </span>
                        )}

                        {untrackedCount > 0 && (
                            <span className="ml-1 flex items-center text-red-300">
                                <X className="h-3 w-3" />
                                {untrackedCount}
                            </span>
                        )}

                        {/* Unpushed commits indicator */}
                        {unpushedCommitsCount > 0 && (
                            <span className="ml-1 flex items-center text-blue-300">
                                <ArrowUpIcon className="mr-0.5 h-3 w-3" />
                                {unpushedCommitsCount}
                            </span>
                        )}
                    </span>
                )}

                {/* Command prompt symbol */}
                <span className="text-purple-400">λ</span>
            </div>
        );
    };

    // Format terminal output with colorized git commands
    const renderTerminalOutput = (line: string) => {
        // Check if this is a command line (starts with $)
        if (line.startsWith("$")) {
            const cmd = line.substring(1).trim();
            const parts = cmd.split(" ");

            if (parts[0] === "git") {
                return (
                    <div>
                        <span className="text-gray-400">$</span> <span className="text-purple-400">git</span>{" "}
                        <span className="text-yellow-400">{parts.slice(1).join(" ")}</span>
                    </div>
                );
            }

            return (
                <div>
                    <span className="text-gray-400">$</span> <span className="text-green-400">{cmd}</span>
                </div>
            );
        }

        // Add folder highlighting for directory listings
        if (line.trim().endsWith("/") && !line.includes(":")) {
            return (
                <div>
                    <span className="text-blue-400">{line}</span>
                </div>
            );
        }

        // Match git status output patterns
        if (line.includes("new file:")) {
            return (
                <div>
                    <span className="text-green-400">{line}</span>
                </div>
            );
        }
        if (line.includes("modified:")) {
            return (
                <div>
                    <span className="text-yellow-400">{line}</span>
                </div>
            );
        }
        if (line.includes("deleted:")) {
            return (
                <div>
                    <span className="text-red-400">{line}</span>
                </div>
            );
        }
        if (line.includes("Initialized empty Git")) {
            return (
                <div>
                    <span className="text-green-400">{line}</span>
                </div>
            );
        }
        if (line.includes("branch")) {
            return (
                <div>
                    <span className="text-purple-400">{line}</span>
                </div>
            );
        }

        // Handle untracked files section in git status output
        if (line.trim() === "Untracked files:") {
            return (
                <div>
                    <span className="font-semibold text-red-400">{line}</span>
                </div>
            );
        }

        // Color specific files listed under "Untracked files:"
        if (
            line.trim().startsWith("  ") &&
            !line.includes(":") &&
            terminalOutput.some(l => l.includes("Untracked files:"))
        ) {
            return (
                <div>
                    <span className="text-red-400">{line}</span>
                </div>
            );
        }

        // Changes to be committed (staged files) - header
        if (line.trim() === "Changes to be committed:") {
            return (
                <div>
                    <span className="font-semibold text-green-400">{line}</span>
                </div>
            );
        }

        // Working tree clean message
        if (line.includes("working tree clean")) {
            return (
                <div>
                    <span className="text-green-400">{line}</span>
                </div>
            );
        }

        // Directory listing - highlight directories with blue
        // This is for the ls command output
        const dirRegex = /^(.+)\/$/;
        const dirMatch = dirRegex.exec(line);
        if (dirMatch) {
            return (
                <div>
                    <span className="font-medium text-blue-400">{line}</span>
                </div>
            );
        }

        // Default formatting
        return <div className="text-purple-300">{line}</div>;
    };

    return (
        <div
            className={`flex flex-col overflow-hidden rounded-md border border-purple-800/50 bg-[#1a1625] shadow-lg ${className}`}>
            {/* Terminal header */}
            <div className="flex items-center justify-between bg-purple-900/50 px-3 py-2 text-sm font-medium text-white">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="truncate">
                        {isPlaygroundMode
                            ? t("playground.gitTerminal")
                            : `${t("level.gitTerminal")} - ${currentStage} ${t("level.level")} ${currentLevel}`}
                    </span>
                </div>

                <div className="flex space-x-1">
                    {showHelpButton && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-purple-300 hover:bg-purple-800/50 hover:text-white"
                            onClick={handleShowHelp}
                            title={t("level.showHelp")}>
                            <HelpCircleIcon className="h-4 w-4" />
                        </Button>
                    )}

                    {showResetButton && !isPlaygroundMode && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-purple-300 hover:bg-purple-800/50 hover:text-white"
                            onClick={handleReset}
                            title={t("level.resetLevel")}>
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Terminal output area */}
            <ScrollArea className="h-0 min-h-0 flex-1 px-4 py-3 font-mono text-sm text-purple-300" ref={scrollAreaRef}>
                <div ref={outputContainerRef} className="pb-4">
                    {terminalOutput.map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap break-words">
                            {renderTerminalOutput(line)}
                        </div>
                    ))}

                    {isLevelCompleted && !isPlaygroundMode && (
                        <div className="mt-2 rounded bg-green-900/30 p-2 text-center text-white">
                            {t("terminal.levelCompleted")}
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Terminal input area */}
            <div className="relative border-t border-purple-800/50">
                <form onSubmit={handleFormSubmit} className="flex items-center px-3 py-2">
                    <div className="mr-2 hidden sm:block">{renderFancyPrompt()}</div>

                    {/* Command suggestion tooltip */}
                    {showCommandSuggestion && (
                        <div className="absolute left-0 top-0 z-10 mt-[-30px] rounded border border-purple-800 bg-purple-900/70 px-2 py-1 text-xs text-purple-300">
                            Press Tab to complete: <span className="font-mono font-semibold">{commandSuggestion}</span>
                        </div>
                    )}

                    <Input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="flex-grow border-none bg-transparent font-mono text-sm text-purple-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder={t("terminal.enterCommand")}
                        autoComplete="off"
                        spellCheck="false"
                        onFocus={() => inputRef.current?.scrollIntoView({ behavior: "smooth" })}
                    />

                    <Button
                        type="submit"
                        size="sm"
                        variant="ghost"
                        className="ml-1 text-purple-400 hover:bg-purple-800/50 hover:text-purple-200">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>

                {/* Autocomplete dropdown */}
                {showAutocomplete && fileAutocomplete.length > 0 && (
                    <div className="absolute bottom-full left-0 right-0 z-10 max-h-32 overflow-y-auto rounded-t border border-purple-800 bg-purple-900/70 p-1 shadow-lg">
                        {fileAutocomplete.map(file => (
                            <div
                                key={file}
                                className="cursor-pointer rounded px-2 py-1 font-mono text-sm text-purple-300 hover:bg-purple-800"
                                onClick={() => selectAutocompleteOption(file)}>
                                {file}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Terminal;
