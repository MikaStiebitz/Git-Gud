"use client";

import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useGameContext } from "~/contexts/GameContext";
import { TerminalIcon, HelpCircleIcon, RotateCcw } from "lucide-react";

interface TerminalProps {
    className?: string;
    showHelpButton?: boolean;
    showResetButton?: boolean;
}

export function Terminal({ className, showHelpButton = true, showResetButton = true }: TerminalProps) {
    const {
        terminalOutput,
        handleCommand,
        resetCurrentLevel,
        commandProcessor,
        currentStage,
        currentLevel,
        isLevelCompleted,
    } = useGameContext();

    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when terminal output changes
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [terminalOutput]);

    // Focus input field on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Process the command
        handleCommand(input);

        // Add to command history
        setCommandHistory(prev => [input, ...prev.slice(0, 49)]);
        setHistoryIndex(-1);

        // Clear input
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Handle command history navigation with up/down arrows
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            // TODO: Implement command auto-completion
        }
    };

    const handleShowHelp = () => {
        handleCommand("help");
    };

    const handleReset = () => {
        if (
            window.confirm(
                "Möchtest du dieses Level wirklich zurücksetzen? Dein Fortschritt in diesem Level geht verloren.",
            )
        ) {
            resetCurrentLevel();
        }
    };

    // Get current prompt text (shows current directory)
    const getPrompt = () => {
        const currentDir = commandProcessor.getCurrentDirectory();
        return `user@gitgame:${currentDir}$`;
    };

    return (
        <div className={`flex h-full flex-col rounded-md border bg-black ${className}`}>
            <div className="flex items-center justify-between bg-gray-900 px-3 py-1.5 text-xs text-white">
                <div className="flex items-center space-x-2">
                    <TerminalIcon className="h-4 w-4" />
                    <span>
                        Git Terminal - {currentStage} Level {currentLevel}
                    </span>
                </div>
                <div className="flex space-x-1">
                    {showHelpButton && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
                            onClick={handleShowHelp}
                            title="Show Help">
                            <HelpCircleIcon className="h-4 w-4" />
                        </Button>
                    )}
                    {showResetButton && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
                            onClick={handleReset}
                            title="Reset Level">
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <ScrollArea className="flex-grow p-3 font-mono text-sm text-green-500" ref={scrollAreaRef}>
                {terminalOutput.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words">
                        {line}
                    </div>
                ))}
                {isLevelCompleted && (
                    <div className="mt-2 rounded bg-green-900/30 p-2 text-center text-white">
                        Level abgeschlossen! 🎉 Gib 'next' ein oder klicke auf den Button "Nächstes Level".
                    </div>
                )}
            </ScrollArea>

            <form onSubmit={handleFormSubmit} className="flex items-center border-t border-gray-800 px-3 py-2">
                <span className="mr-2 shrink-0 font-mono text-xs text-gray-400">{getPrompt()}</span>
                <Input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow border-none bg-transparent font-mono text-sm text-green-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Gib einen Befehl ein..."
                    autoComplete="off"
                    spellCheck="false"
                />
                <Button
                    type="submit"
                    size="sm"
                    variant="ghost"
                    className="ml-1 text-gray-400 hover:bg-gray-800 hover:text-white">
                    ↵
                </Button>
            </form>
        </div>
    );
}
