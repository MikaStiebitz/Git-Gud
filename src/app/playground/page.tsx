"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { TerminalIcon, Search, BookOpen, Command } from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";
import { PageLayout } from "~/components/layout/PageLayout";
import { useLanguage } from "~/contexts/LanguageContext";
import type { CommandType } from "~/types";

// Dynamically import Terminal component with SSR disabled
const Terminal = dynamic(() => import("~/components/Terminal").then(mod => ({ default: mod.Terminal })), {
    ssr: false,
});

export default function Playground() {
    const { resetTerminalForPlayground } = useGameContext();
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCommand, setSelectedCommand] = useState<CommandType | null>(null);

    useEffect(() => {
        resetTerminalForPlayground();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Git commands for the cheat sheet
    const gitCommands = [
        {
            category: t("category.basics"),
            commands: [
                {
                    name: "git init",
                    description: t("Initializes a new Git repository"),
                    usage: "git init",
                    example: "git init",
                    explanation: t(
                        "This command creates a new Git repository in your current directory. It creates a hidden .git directory that contains all Git metadata.",
                    ),
                },
                {
                    name: "git status",
                    description: t("Shows the status of the repository"),
                    usage: "git status",
                    example: "git status",
                    explanation: t(
                        "This lets you see the current status of your repository - which files have been changed, which are staged, etc.",
                    ),
                },
                {
                    name: "git add",
                    description: t("Adds file contents to the index"),
                    usage: "git add <file> or git add .",
                    example: "git add index.html",
                    explanation: t(
                        "With this command, you mark changes for the next commit. Use 'git add .' to mark all changes in the current directory.",
                    ),
                },
                {
                    name: "git commit",
                    description: t("Records changes to the repository"),
                    usage: 'git commit -m "<message>"',
                    example: 'git commit -m "Fix bug in login form"',
                    explanation: t(
                        "Creates a new commit with all staged changes. The message should be a short, precise description of what was changed.",
                    ),
                },
            ],
        },
        {
            category: t("category.branches"),
            commands: [
                {
                    name: "git branch",
                    description: t("Lists, creates, or deletes branches"),
                    usage: "git branch [name] [--delete]",
                    example: "git branch feature-login",
                    explanation: t(
                        "Without parameters, this command lists all existing branches. With a name, it creates a new branch (but doesn't switch to it).",
                    ),
                },
                {
                    name: "git checkout",
                    description: t("Switches branches or restores files"),
                    usage: "git checkout <branch> or git checkout -b <new-branch>",
                    example: "git checkout -b feature-login",
                    explanation: t(
                        "Switches to another branch. With '-b', it creates a new branch and immediately switches to it.",
                    ),
                },
                {
                    name: "git merge",
                    description: t("Joins two or more development histories"),
                    usage: "git merge <branch>",
                    example: "git merge feature-login",
                    explanation: t(
                        "Integrates changes from the specified branch into the current branch. This creates a merge commit if it's not a fast-forward situation.",
                    ),
                },
            ],
        },
        {
            category: t("category.remoteRepos"),
            commands: [
                {
                    name: "git clone",
                    description: t("Clones a repository into a new directory"),
                    usage: "git clone <url>",
                    example: "git clone https://github.com/user/repo.git",
                    explanation: t("Creates a local copy of a remote repository, including all branches and history."),
                },
                {
                    name: "git pull",
                    description: t("Fetches and integrates changes from a remote repository"),
                    usage: "git pull [remote] [branch]",
                    example: "git pull origin main",
                    explanation: t(
                        "Combines 'git fetch' and 'git merge' to fetch changes from a remote branch and integrate them into your current branch.",
                    ),
                },
                {
                    name: "git push",
                    description: t("Updates remote references and associated objects"),
                    usage: "git push [remote] [branch]",
                    example: "git push origin main",
                    explanation: t(
                        "Sends your local commits to a remote repository. Others can then see and fetch your changes.",
                    ),
                },
            ],
        },
        {
            category: t("category.advanced"),
            commands: [
                {
                    name: "git rebase",
                    description: t("Reapplies commits on top of another base"),
                    usage: "git rebase <base>",
                    example: "git rebase main",
                    explanation: t(
                        "Transfers your changes onto the latest version of the base branch. This creates a cleaner history than merges.",
                    ),
                },
                {
                    name: "git stash",
                    description: t("Stashes changes temporarily"),
                    usage: "git stash [pop]",
                    example: "git stash",
                    explanation: t(
                        "Saves your uncommitted changes temporarily, allowing you to return to a clean working directory. Use 'pop' to reapply the stashed changes.",
                    ),
                },
                {
                    name: "git log",
                    description: t("Shows the commit history"),
                    usage: "git log",
                    example: "git log --oneline",
                    explanation: t(
                        "Shows the commit history with details like author, date, and message. You can customize the output with various flags.",
                    ),
                },
            ],
        },
    ];

    // Filter commands based on search term
    const filteredCommands = !searchTerm
        ? gitCommands
        : gitCommands
              .map(category => ({
                  category: category.category,
                  commands: category.commands.filter(
                      cmd =>
                          cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cmd.description.toLowerCase().includes(searchTerm.toLowerCase()),
                  ),
              }))
              .filter(category => category.commands.length > 0);

    return (
        <PageLayout>
            <div className="bg-[#1a1625] text-purple-100">
                <div className="container mx-auto p-4">
                    <h1 className="mb-6 text-center text-3xl font-bold text-white">{t("playground.title")}</h1>
                    <p className="mb-8 text-center text-lg text-purple-300">{t("playground.subtitle")}</p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Terminal Side */}
                        <Card className="border-purple-900/20 bg-purple-900/10">
                            <CardHeader>
                                <CardTitle className="flex items-center text-white">
                                    <TerminalIcon className="mr-2 h-5 w-5 text-purple-400" />
                                    {t("playground.gitTerminal")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Terminal
                                    className="h-[500px] rounded-none"
                                    showHelpButton={true}
                                    showResetButton={false}
                                    isPlaygroundMode={true}
                                />
                            </CardContent>
                        </Card>
                        {/* Cheat Sheet Side */}
                        <Card className="border-purple-900/20 bg-purple-900/10">
                            <CardHeader>
                                <CardTitle className="flex items-center text-white">
                                    <BookOpen className="mr-2 h-5 w-5 text-purple-400" />
                                    {t("playground.gitCheatSheet")}
                                </CardTitle>
                                <div className="relative mt-2">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-purple-400" />
                                    <Input
                                        placeholder={t("playground.searchCommands")}
                                        className="border-purple-800 bg-purple-900/30 pl-8 text-purple-200 placeholder:text-purple-500"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[420px] overflow-y-auto pr-2">
                                    {filteredCommands.map((category, index) => (
                                        <div key={index} className="mb-6">
                                            <h3 className="mb-2 font-medium text-purple-300">{category.category}</h3>
                                            <div className="space-y-2">
                                                {category.commands.map((command, cmdIndex) => (
                                                    <div
                                                        key={cmdIndex}
                                                        className={`cursor-pointer rounded-md border border-purple-800/40 p-2.5 transition-colors hover:bg-purple-800/20 ${
                                                            selectedCommand === command
                                                                ? "border-purple-600/60 bg-purple-800/30"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            setSelectedCommand(
                                                                selectedCommand === command ? null : command,
                                                            )
                                                        }>
                                                        <div className="flex items-center justify-between">
                                                            <span className="flex items-center font-mono text-sm font-semibold text-white">
                                                                <Command className="mr-1.5 h-3.5 w-3.5 text-purple-400" />
                                                                {command.name}
                                                            </span>
                                                            <span className="text-xs text-purple-400">
                                                                {selectedCommand === command ? "▼" : "▶"}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1 text-sm text-purple-300">
                                                            {command.description}
                                                        </div>
                                                        {selectedCommand === command && (
                                                            <div className="mt-3 rounded border border-purple-800/30 bg-purple-900/20 p-3">
                                                                <div className="mb-2">
                                                                    <span className="text-xs font-medium text-purple-400">
                                                                        {t("playground.usage")}
                                                                    </span>
                                                                    <pre className="mt-1 overflow-x-auto rounded bg-black/20 p-1.5 font-mono text-xs text-green-400">
                                                                        {command.usage}
                                                                    </pre>
                                                                </div>
                                                                <div className="mb-2">
                                                                    <span className="text-xs font-medium text-purple-400">
                                                                        {t("playground.example")}
                                                                    </span>
                                                                    <pre className="mt-1 overflow-x-auto rounded bg-black/20 p-1.5 font-mono text-xs text-green-400">
                                                                        {command.example}
                                                                    </pre>
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs font-medium text-purple-400">
                                                                        {t("playground.explanation")}
                                                                    </span>
                                                                    <p className="mt-1 text-xs text-purple-200">
                                                                        {command.explanation}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    {filteredCommands.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <Search className="mb-2 h-8 w-8 text-purple-500" />
                                            <p className="text-purple-400">
                                                {t("playground.noCommands")} &quot;{searchTerm}&quot;
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 text-purple-400"
                                                onClick={() => setSearchTerm("")}>
                                                {t("playground.resetSearch")}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
