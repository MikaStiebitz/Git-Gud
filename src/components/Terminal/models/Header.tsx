import { Button } from "~/components/ui/button";
import { HelpCircleIcon, RotateCcw } from "lucide-react";
import type { TerminalHeaderProps } from "../types";

export function TerminalHeader({
    isPlaygroundMode,
    currentStage,
    currentLevel,
    showHelpButton,
    showResetButton,
    handleShowHelp,
    handleReset,
    t,
}: TerminalHeaderProps) {
    return (
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
    );
}
