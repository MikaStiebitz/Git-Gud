import { ScrollArea } from "~/components/ui/scroll-area";
import type { TerminalOutputProps } from "../types";

export interface ExtendedTerminalOutputProps extends TerminalOutputProps {
    welcomeMessage?: string[];
}

export function TerminalOutput({
    terminalOutput,
    isLevelCompleted,
    isPlaygroundMode,
    scrollAreaRef,
    outputContainerRef,
    renderTerminalOutput,
    t,
    welcomeMessage,
}: ExtendedTerminalOutputProps) {
    return (
        <div className="min-h-0 flex-1">
            <ScrollArea className="h-full px-6 py-5 font-mono text-sm text-purple-300" ref={scrollAreaRef}>
                <div ref={outputContainerRef} className="pb-4">
                    {welcomeMessage && (
                        <div className="mb-4 space-y-1">
                            {welcomeMessage.map((line, i) => (
                                <div key={`welcome-${i}`} className="text-purple-400 font-bold">
                                    {line}
                                </div>
                            ))}
                            <div className="border-b border-purple-800/30 my-2"></div>
                        </div>
                    )}
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
        </div>
    );
}
