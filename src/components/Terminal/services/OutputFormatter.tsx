import React from "react";

export class OutputFormatterService {
    constructor(private terminalOutput: string[]) {}

    renderTerminalOutput(line: string): React.ReactNode {
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
            this.terminalOutput.some(l => l.includes("Untracked files:"))
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
    }
}
