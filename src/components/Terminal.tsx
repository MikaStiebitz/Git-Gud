"use client";

import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useGameContext } from "~/contexts/GameContext";
import { TerminalIcon, HelpCircleIcon, RotateCcw, Send } from "lucide-react";
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
        currentStage,
        currentLevel,
        isLevelCompleted,
        handleFileEdit,
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
            // Delayed scrolling to ensure new content is rendered
            setTimeout(() => {
                if (scrollAreaRef.current) {
                    scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
                }
            }, 10);
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

    // Open the file editor
    const openNanoEditor = (fileName: string) => {
        const currentDir = commandProcessor.getCurrentDirectory();
        const filePath = fileName.startsWith("/") ? fileName : `${currentDir}/${fileName}`;
        const content = fileSystem.getFileContents(filePath) ?? "";

        // Use the FileEditor via handleFileEdit function from Context
        handleFileEdit(filePath, content);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Close the autocomplete menu
        setShowAutocomplete(false);

        if (input.trim() === "next" && isLevelCompleted) {
            handleCommand("next", isPlaygroundMode); // Special case for the "next" command
        } else {
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
        if (!input.trim().startsWith("nano ") && !input.trim().startsWith("cat ")) return;

        const args = input.trim().split(/\s+/);
        if (args.length <= 1) return;

        // Get the current input path
        const currentInputPath = args[1];
        const currentDir = commandProcessor.getCurrentDirectory();

        // Get files in the current directory
        const contents = fileSystem.getDirectoryContents(currentDir);
        if (!contents) return;

        // Filter files based on the current input
        const matchingFiles = Object.keys(contents).filter(file => file.startsWith(currentInputPath ?? ""));

        if (matchingFiles.length === 1) {
            // If there's only one match, complete it directly
            setInput(`${args[0]} ${matchingFiles[0]}`);
            setShowAutocomplete(false);
        } else if (matchingFiles.length > 1) {
            // If there are multiple matches, show the autocomplete menu
            setFileAutocomplete(matchingFiles);
            setShowAutocomplete(true);
        }
    };

    // Select a suggestion from the autocomplete menu
    const selectAutocompleteOption = (file: string) => {
        const args = input.trim().split(/\s+/);
        setInput(`${args[0]} ${file}`);
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

    // Get current prompt text (shows current directory)
    const getPrompt = () => {
        const currentDir = commandProcessor.getCurrentDirectory();
        return `user@gitgud:${currentDir}$`;
    };

    return (
        <div className={`flex h-full flex-col rounded-md border bg-black ${className}`}>
            <div className="flex items-center justify-between bg-gray-900 px-3 py-1.5 text-xs text-white">
                <div className="flex items-center space-x-2">
                    <TerminalIcon className="h-4 w-4" />
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
                            className="h-6 w-6 p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
                            onClick={handleShowHelp}
                            title={t("level.showHelp")}>
                            <HelpCircleIcon className="h-4 w-4" />
                        </Button>
                    )}
                    {showResetButton && !isPlaygroundMode && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
                            onClick={handleReset}
                            title={t("level.resetLevel")}>
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <ScrollArea className="flex-grow overflow-auto p-3 font-mono text-sm text-green-500" ref={scrollAreaRef}>
                <div ref={outputContainerRef} className="pb-4">
                    {terminalOutput.map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap break-words">
                            {line}
                        </div>
                    ))}
                    {isLevelCompleted && !isPlaygroundMode && (
                        <div className="mt-2 rounded bg-green-900/30 p-2 text-center text-white">
                            {t("terminal.levelCompleted")}
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div className="relative">
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-grow items-center border-t border-gray-800 px-2 py-2 sm:px-3">
                    <span className="mr-1 hidden shrink-0 font-mono text-xs text-gray-400 sm:mr-2 sm:block">
                        {getPrompt()}
                    </span>
                    <Input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow border-none bg-transparent font-mono text-sm text-green-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder={t("terminal.enterCommand")}
                        autoComplete="off"
                        spellCheck="false"
                        onFocus={() => inputRef.current?.scrollIntoView({ behavior: "smooth" })}
                    />
                    <Button
                        type="submit"
                        size="sm"
                        variant="ghost"
                        className="ml-1 text-gray-400 hover:bg-gray-800 hover:text-white">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>

                {/* Autocomplete dropdown */}
                {showAutocomplete && fileAutocomplete.length > 0 && (
                    <div className="absolute bottom-full left-0 right-0 z-10 max-h-32 overflow-y-auto rounded-t border border-gray-700 bg-gray-900 p-1 shadow-lg">
                        {fileAutocomplete.map(file => (
                            <div
                                key={file}
                                className="cursor-pointer rounded px-2 py-1 font-mono text-sm text-green-400 hover:bg-gray-800"
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
