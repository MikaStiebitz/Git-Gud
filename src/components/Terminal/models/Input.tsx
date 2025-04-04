import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Send } from "lucide-react";
import type { TerminalInputProps } from "../types";

export function TerminalInput({
    input,
    inputRef,
    handleFormSubmit,
    handleInputChange,
    handleKeyDown,
    commandSuggestion,
    showCommandSuggestion,
    showAutocomplete,
    fileAutocomplete,
    selectAutocompleteOption,
    renderFancyPrompt,
    t,
}: TerminalInputProps) {
    return (
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
    );
}
