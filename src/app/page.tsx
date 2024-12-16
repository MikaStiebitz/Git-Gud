import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { GitBranch, GitCommit, GitMerge, GitPullRequest, Rocket, Terminal } from "lucide-react";
import Link from "next/link";

const stages = {
    Intro: {
        description: "In this stage you will learn the basics of git.",
        icon: "🚀",
        levels: {
            1: { command: "git init" },
            2: { command: "git status" },
        },
    },
    Files: {
        description: "In this stage you will learn how to work with files in git.",
        icon: "📁",
        levels: {
            1: { command: "git add ." },
            2: { command: "git commit", requiresArgs: ["-m"] },
        },
    },
    Branches: {
        description: "In this stage you will learn how to work with branches in git.",
        icon: "🌿",
        levels: {
            1: { command: "git branch" },
            2: { command: "git checkout", requiresArgs: ["-b"] },
        },
    },
    Merge: {
        description: "In this stage you will learn how to merge branches in git.",
        icon: "🔀",
        levels: {
            1: { command: "git merge", requiresArgs: ["any"] },
        },
    },
};

export default function Home() {
    return (
        <div className="min-h-screen bg-[#1a1625]">
            {/* Header */}
            <header className="border-b border-purple-900/20">
                <nav className="container mx-auto flex h-16 items-center px-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <GitBranch className="h-6 w-6 text-purple-400" />
                        <span className="text-xl font-bold text-white">GitGame</span>
                    </Link>
                    <div className="ml-auto flex space-x-4">
                        <Link href="/terminal">
                            <Button
                                variant="ghost"
                                className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <Terminal className="mr-2 h-4 w-4" />
                                Terminal
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                            Sign In
                        </Button>
                        <Button className="bg-purple-600 text-white hover:bg-purple-700">Get Started</Button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Master Git Through
                    <span className="text-purple-400"> Play</span>
                </h1>
                <p className="mt-6 text-lg text-purple-200">
                    Learn Git commands and concepts through an interactive game. Progress through levels, complete
                    challenges, and become a Git expert.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
                        Start Learning
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                        View Curriculum
                    </Button>
                </div>
            </section>

            {/* Progress Path */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="mb-12 text-center text-3xl font-bold text-white">Your Learning Path</h2>
                <div className="relative">
                    <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-purple-900/50" />
                    <div className="space-y-12">
                        {Object.entries(stages).map(([stage, data], index) => (
                            <div key={stage} className="relative">
                                <div
                                    className={`absolute left-1/2 h-8 w-8 -translate-x-1/2 transform rounded-full bg-purple-600 p-2 ${
                                        index === 0 ? "ring-4 ring-purple-400" : ""
                                    }`}>
                                    {index === 0 && <Rocket className="h-4 w-4 text-white" />}
                                    {index === 1 && <GitCommit className="h-4 w-4 text-white" />}
                                    {index === 2 && <GitBranch className="h-4 w-4 text-white" />}
                                    {index === 3 && <GitMerge className="h-4 w-4 text-white" />}
                                </div>
                                <div
                                    className={`relative ml-8 rounded-lg border border-purple-900/20 bg-purple-900/10 p-6 pl-12 ${
                                        index % 2 === 0 ? "lg:ml-auto lg:pl-6 lg:pr-12" : ""
                                    } lg:w-1/2`}>
                                    <h3 className="text-xl font-bold text-white">{stage}</h3>
                                    <p className="mt-2 text-purple-200">{data.description}</p>
                                    <div className="mt-4 flex gap-2">
                                        {Object.entries(data.levels).map(([level, levelData]) => (
                                            <Button
                                                key={level}
                                                variant="outline"
                                                size="sm"
                                                className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                                                Level {level}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Level Selection */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="mb-12 text-center text-3xl font-bold text-white">Choose Your Challenge</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Object.entries(stages).map(([stage, data]) =>
                        Object.entries(data.levels).map(([level, levelData]) => (
                            <Card
                                key={`${stage}-${level}`}
                                className="group relative overflow-hidden border-purple-900/20 bg-purple-900/10 transition-all hover:border-purple-600">
                                <CardContent className="p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-2xl">{data.icon}</span>
                                        <span className="rounded-full bg-purple-900/50 px-2 py-1 text-xs text-purple-300">
                                            Level {level}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{stage}</h3>
                                    <p className="mt-2 text-sm text-purple-300">Learn: {levelData.command}</p>
                                    <Button
                                        className="mt-4 w-full bg-purple-600 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        size="sm">
                                        Start Level
                                    </Button>
                                </CardContent>
                            </Card>
                        )),
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-purple-900/20 py-8">
                <div className="container mx-auto px-4 text-center text-purple-400">
                    <p>&copy; {new Date().getFullYear()} GitGame. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
