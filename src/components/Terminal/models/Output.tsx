import { ScrollArea } from "~/components/ui/scroll-area";
import type { TerminalOutputProps } from "../types";

export function TerminalOutput({
    terminalOutput,
    isLevelCompleted,
    isPlaygroundMode,
    scrollAreaRef,
    outputContainerRef,
    renderTerminalOutput,
    t,
}: TerminalOutputProps) {
    return (
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
    );
}
