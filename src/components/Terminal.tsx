import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useGameContext } from "~/contexts/GameContext";
import { HelpCircleIcon, RotateCcw, Send, Github, FileIcon, X, Circle } from "lucide-react";
import { useLanguage } from "~/contexts/LanguageContext";

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
    } = useGameContext();

    const { t } = useLanguage();

    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [fileAutocomplete, setFileAutocomplete] = useState<string[]>([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const outputContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when terminal output changes
    useEffect(() => {
        if (scrollAreaRef.current) {
            // Longer delay to ensure content is fully rendered
            setTimeout(() => {
                if (scrollAreaRef.current) {
                    // Get the actual scrollable div inside the ScrollArea
                    const scrollableDiv = scrollAreaRef.current.querySelector('div[style*="overflow"]');
                    if (scrollableDiv) {
                        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
                    }
                    // Fallback to the ref itself
                    scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
                }
            }, 50); // Increased from 10ms to 50ms
        }
    }, [terminalOutput]);

    // Focus input field on mount
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

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Close the autocomplete menu
        setShowAutocomplete(false);

        if (input.trim() === "next" && isLevelCompleted) {
            handleCommand("next", isPlaygroundMode); // Special case for the "next" command
        } else {
            // Special handling for nano command
            if (input.trim().startsWith("nano ")) {
                const args = input.trim().split(/\s+/);
                if (args.length > 1) {
                    const fileName = args[1] ?? "";
                    // Call handleCommand first to let it handle creating the file if needed
                    handleCommand(input, isPlaygroundMode);
                    // Then open the file editor
                    openFileEditor(fileName, isPlaygroundMode);

                    // Add to command history
                    setCommandHistory(prev => [input, ...prev.slice(0, 49)]);
                    setHistoryIndex(-1);
                    setInput("");
                    return;
                }
            }

            // Normal command processing
            handleCommand(input, isPlaygroundMode);
        }

        // Add to command history
        setCommandHistory(prev => [input, ...prev.slice(0, 49)]);
        setHistoryIndex(-1);

        // Clear input
        setInput("");
    };

    // Process Tab-autocomplete for files
    const handleTabAutocomplete = () => {
        // List of commands that can use file autocomplete
        const fileCommands = [
            "nano",
            "cat",
            "rm",
            "cd",
            "touch",
            "git add",
            "git rm",
            "git checkout",
            "git restore",
            "git mv",
            "git diff",
            "git show",
        ];

        // Check if current command is eligible for file autocomplete
        let isFileCommand = false;
        let commandPart = "";
        let filePart = "";

        // Process single-word commands
        if (input.trim().includes(" ")) {
            // Extract command part and file part
            const spaceSplit = input.trim().split(/\s+/);
            commandPart = spaceSplit[0] ?? "";

            // Special handling for git commands (two words)
            if (commandPart === "git" && spaceSplit.length > 1) {
                commandPart = `git ${spaceSplit[1]}`;
                filePart = spaceSplit.slice(2).join(" ");
            } else {
                filePart = spaceSplit.slice(1).join(" ");
            }

            // Check if it's in our list of file commands
            isFileCommand = fileCommands.some(cmd => {
                // For git commands, we need to check the full "git subcommand"
                if (cmd.startsWith("git ")) {
                    return commandPart === cmd;
                }
                // For regular commands, just check the first word
                return spaceSplit[0] === cmd;
            });
        }

        if (!isFileCommand) return;

        // Get the current directory
        const currentDir = commandProcessor.getCurrentDirectory();

        // Get files in the current directory
        const contents = fileSystem.getDirectoryContents(currentDir);
        if (!contents) return;

        // Filter files based on the current input path
        const matchingFiles = Object.keys(contents).filter(file => file.startsWith(filePart || ""));

        if (matchingFiles.length === 1) {
            // If there's only one match, complete it directly
            if (commandPart.startsWith("git ")) {
                // Format: git command filename
                setInput(`${commandPart} ${matchingFiles[0]}`);
            } else {
                // Format: command filename
                setInput(`${commandPart} ${matchingFiles[0]}`);
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
            handleTabAutocomplete();
        } else if (e.key === "Escape") {
            setShowAutocomplete(false);
        }
    };

    const handleShowHelp = () => {
        handleCommand("help", isPlaygroundMode);
    };

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

        // Default formatting
        return <div className="text-purple-300">{line}</div>;
    };

    return (
        <div
            className={`flex w-full flex-col overflow-hidden rounded-md border border-purple-800/50 bg-[#1a1625] shadow-lg md:h-[580px] ${className}`}>
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

            {/* Terminal output area - fixed height with scrolling */}
            <ScrollArea
                className="flex-grow overflow-auto px-4 py-3 font-mono text-sm text-purple-300"
                ref={scrollAreaRef}>
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
            <div className="relative">
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-grow items-center border-t border-purple-800/50 px-3 py-2">
                    <div className="mr-2 hidden sm:block">{renderFancyPrompt()}</div>
                    <Input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
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
