"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { GitBranch, TerminalIcon, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Terminal() {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState<string[]>([]);
    const [showTip, setShowTip] = useState(false);

    const currentLevel = {
        number: 1,
        stage: "Intro",
        instruction: "Initialize a new Git repository",
        command: "git init",
        tip: "This command creates a new .git subdirectory in your current working directory",
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOutput(prev => [...prev, `$ ${command}`]);
        if (command.trim().toLowerCase() === currentLevel.command) {
            setOutput(prev => [...prev, "Initialized empty Git repository in .git/"]);
            // Here you would typically move to the next level
        } else {
            setOutput(prev => [...prev, "Command not recognized. Try again."]);
        }
        setCommand("");
    };

    return (
        <div className="min-h-screen bg-[#1a1625] text-purple-100">
            {/* Header */}
            <header className="border-b border-purple-900/20">
                <nav className="container mx-auto flex h-16 items-center px-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <GitBranch className="h-6 w-6 text-purple-400" />
                        <span className="text-xl font-bold text-white">GitGame</span>
                    </Link>
                    <span className="ml-4 text-purple-300">Terminal</span>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Card className="border-purple-900/20 bg-[#1f1b2e] text-purple-100">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="text-2xl text-white">
                                Level {currentLevel.number}: {currentLevel.stage}
                            </span>
                            <TerminalIcon className="h-6 w-6 text-purple-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-lg font-medium text-purple-200">{currentLevel.instruction}</p>
                        <div className="mb-4 h-64 overflow-y-auto rounded bg-[#13111b] p-4 font-mono text-green-400">
                            {output.map((line, index) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="flex space-x-2">
                            <Input
                                type="text"
                                placeholder="Enter Git command..."
                                value={command}
                                onChange={e => setCommand(e.target.value)}
                                className="flex-grow border-purple-700 bg-[#13111b] text-green-400 placeholder-purple-400"
                            />
                            <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
                                Execute
                            </Button>
                        </form>
                        <div className="mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-700 text-purple-300 hover:bg-purple-900/50"
                                onClick={() => setShowTip(!showTip)}>
                                <Lightbulb className="mr-2 h-4 w-4" />
                                {showTip ? "Hide" : "Show"} Tip
                            </Button>
                            {showTip && <p className="mt-2 text-sm text-green-400">{currentLevel.tip}</p>}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
