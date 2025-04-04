import { Github, FileIcon, X, Circle, ArrowUpIcon } from "lucide-react";
import type { TerminalPromptProps } from "../types";

export function TerminalPrompt({
    currentDirectory,
    isGitInitialized,
    branch,
    stagedCount,
    modifiedCount,
    untrackedCount,
    unpushedCommitsCount,
}: TerminalPromptProps) {
    // Format display path
    const displayPath = currentDirectory === "/" ? "/" : currentDirectory;
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
}
