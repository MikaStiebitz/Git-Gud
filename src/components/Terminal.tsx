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
    } = useGameContext();

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
            // Verzögertes Scrollen, um sicherzustellen, dass der neue Inhalt gerendert wurde
            setTimeout(() => {
                if (scrollAreaRef.current) {
                    scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
                }
            }, 10);
        }
    }, [terminalOutput]);

    // Focus input field on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Öffne den Datei-Editor
    const openFileEditor = (fileName: string) => {
        const currentDir = commandProcessor.getCurrentDirectory();
        const filePath = fileName.startsWith("/") ? fileName : `${currentDir}/${fileName}`;
        const content = fileSystem.getFileContents(filePath) ?? "";

        // Verwende den FileEditor über die FileEdit-Funktion aus dem Context
        handleFileEdit(filePath, content);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Close the autocomplete menu
        setShowAutocomplete(false);

        // Special handling for nano command
        if (input.trim().startsWith("nano ")) {
            const args = input.trim().split(/\s+/);
            if (args.length > 1) {
                const fileName = args[1];
                // Add to terminal output
                handleCommand(input);
                // Open file editor
                openFileEditor(fileName ?? "");
                // Clear input
                setInput("");
                return;
            }
        } else if (input.trim() === "next" && isLevelCompleted) {
            handleCommand("next"); // Special case for the "next" command
        } else {
            // Normal command processing
            handleCommand(input);
        }

        // Add to command history
        setCommandHistory(prev => [input, ...prev.slice(0, 49)]);
        setHistoryIndex(-1);

        // Clear input
        setInput("");
    };

    // Verarbeite Tab-Autocomplete für Dateien
    const handleTabAutocomplete = () => {
        if (!input.trim().startsWith("nano ") && !input.trim().startsWith("cat ")) return;

        const args = input.trim().split(/\s+/);
        if (args.length <= 1) return;

        // Holen Sie sich den aktuellen Eingabepfad
        const currentInputPath = args[1];
        const currentDir = commandProcessor.getCurrentDirectory();

        // Holen Sie sich Dateien im aktuellen Verzeichnis
        const contents = fileSystem.getDirectoryContents(currentDir);
        if (!contents) return;

        // Filtern Sie Dateien basierend auf der aktuellen Eingabe
        const matchingFiles = Object.keys(contents).filter(file => file.startsWith(currentInputPath ?? ""));

        if (matchingFiles.length === 1) {
            // Wenn es nur eine Übereinstimmung gibt, vervollständigen Sie sie direkt
            setInput(`${args[0]} ${matchingFiles[0]}`);
            setShowAutocomplete(false);
        } else if (matchingFiles.length > 1) {
            // Wenn es mehrere Übereinstimmungen gibt, zeigen Sie das Autocomplete-Menü an
            setFileAutocomplete(matchingFiles);
            setShowAutocomplete(true);
        }
    };

    // Wählen Sie einen Vorschlag aus dem Autocomplete-Menü
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
        return `user@gitgud:${currentDir}$`;
    };

    return (
        <div className={`flex h-full flex-col rounded-md border bg-black ${className}`}>
            <div className="flex items-center justify-between bg-gray-900 px-3 py-1.5 text-xs text-white">
                <div className="flex items-center space-x-2">
                    <TerminalIcon className="h-4 w-4" />
                    <span>
                        {isPlaygroundMode
                            ? "Git Terminal - Playground Mode"
                            : `Git Terminal - ${currentStage} Level ${currentLevel}`}
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
                    {showResetButton && !isPlaygroundMode && (
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

            <ScrollArea className="flex-grow overflow-auto p-3 font-mono text-sm text-green-500" ref={scrollAreaRef}>
                <div ref={outputContainerRef} style={{ maxHeight: "350px" }}>
                    {terminalOutput.map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap break-words">
                            {line}
                        </div>
                    ))}
                    {isLevelCompleted && !isPlaygroundMode && (
                        <div className="mt-2 rounded bg-green-900/30 p-2 text-center text-white">
                            Level abgeschlossen! 🎉 Gib &apos;next&apos; ein oder klicke auf den Button &quot;Nächstes
                            Level&quot;.
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div className="relative">
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

                {/* Autocomplete-Dropdown */}
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
