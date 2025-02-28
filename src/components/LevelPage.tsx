"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FileEditor } from "~/components/FileEditor";
import { ProgressBar } from "~/components/ProgressBar";
import { useGameContext } from "~/contexts/GameContext";
import { type LevelType } from "~/types";
import { HelpCircleIcon, ArrowRightIcon, RotateCcw, Shield, ChevronUp, ChevronDown } from "lucide-react";
import { PageLayout } from "~/components/layout/PageLayout";
import { ClientOnly } from "~/components/ClientOnly";
import { useLanguage } from "~/contexts/LanguageContext";
import dynamic from "next/dynamic";

// Dynamically import Terminal component with SSR disabled
const Terminal = dynamic(() => import("~/components/Terminal").then(mod => ({ default: mod.Terminal })), {
    ssr: false,
});

export default function LevelPage() {
    const {
        currentStage,
        currentLevel,
        isLevelCompleted,
        handleNextLevel,
        levelManager,
        progressManager,
        fileSystem,
        gitRepository,
        resetCurrentLevel,
        resetAllProgress,
        isFileEditorOpen,
        setIsFileEditorOpen,
    } = useGameContext();

    const { t } = useLanguage();
    const [currentFile, setCurrentFile] = useState({ name: "", content: "" });
    const [showHints, setShowHints] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [terminalCollapsed, setTerminalCollapsed] = useState(false);
    const [challengeCollapsed, setChallengeCollapsed] = useState(false);

    // Get the current level data
    const levelData: LevelType | null = levelManager.getLevel(currentStage, currentLevel);
    const progress = progressManager.getProgress();

    // Open the file editor for a specific file
    const openFileEditor = (fileName: string) => {
        const content = fileSystem.getFileContents(fileName) ?? "";
        setCurrentFile({ name: fileName, content });
        setIsFileEditorOpen(true);
    };

    // Show a list of user-editable files
    const renderEditableFiles = () => {
        // For simplicity, we'll just show README.md and index.js
        const files = [
            { name: "README.md", path: "/README.md" },
            { name: "index.js", path: "/src/index.js" },
        ];

        return (
            <div className="mt-4">
                <h3 className="mb-2 font-medium text-purple-200">{t("level.filesToEdit")}</h3>
                <div className="space-y-1">
                    {files.map(file => (
                        <Button
                            key={file.path}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start border-purple-700 text-left text-purple-300 hover:bg-purple-900/50"
                            onClick={() => openFileEditor(file.path)}>
                            {file.name}
                        </Button>
                    ))}
                </div>
            </div>
        );
    };

    // Render the current level's challenge details
    const renderLevelChallenge = () => {
        if (!levelData) {
            return <div className="text-purple-300">{t("level.notFound")}</div>;
        }

        return (
            <ClientOnly>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">{levelData.name}</h2>
                    <p className="text-purple-200">{levelData.description}</p>

                    <div>
                        <h3 className="mb-2 font-medium text-purple-200">{t("level.objectives")}</h3>
                        <ul className="list-inside list-disc space-y-1 text-purple-300">
                            {levelData.objectives.map((objective, index) => (
                                <li key={index}>{objective}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowHints(!showHints)}
                            className="flex items-center border-purple-700 text-purple-300 hover:bg-purple-900/50">
                            <HelpCircleIcon className="mr-1 h-4 w-4" />
                            {showHints ? t("level.hideHints") : t("level.showHints")}
                        </Button>

                        {isLevelCompleted && (
                            <Button
                                onClick={handleNextLevel}
                                className="flex items-center bg-purple-600 text-white hover:bg-purple-700">
                                <ArrowRightIcon className="mr-1 h-4 w-4" />
                                {t("level.nextLevel")}
                            </Button>
                        )}
                    </div>

                    {showHints && (
                        <div className="rounded-md border border-purple-700/50 bg-purple-900/30 p-3 text-purple-200">
                            <h3 className="mb-1 font-medium">{t("level.hints")}:</h3>
                            <ul className="list-inside list-disc space-y-1">
                                {levelData.hints.map((hint, index) => (
                                    <li key={index}>{hint}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {renderEditableFiles()}

                    <div className="mt-4 border-t border-purple-900/30 pt-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                            className="text-purple-400 hover:bg-purple-900/30 hover:text-purple-200">
                            {showAdvancedOptions ? t("level.hideAdvancedOptions") : t("level.advancedOptions")}
                        </Button>

                        {showAdvancedOptions && (
                            <div className="mt-2 space-y-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-amber-800/50 text-amber-400 hover:bg-amber-900/30"
                                    onClick={resetCurrentLevel}>
                                    <RotateCcw className="mr-1 h-4 w-4" />
                                    {t("level.resetLevel")}
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-red-800/50 text-red-400 hover:bg-red-900/30"
                                    onClick={() => {
                                        if (window.confirm(t("level.resetConfirm"))) {
                                            resetAllProgress();
                                        }
                                    }}>
                                    <RotateCcw className="mr-1 h-4 w-4" />
                                    {t("level.resetAllProgress")}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </ClientOnly>
        );
    };

    // Information about Git status
    const renderGitStatus = () => {
        const status = gitRepository.getStatus();
        const branch = gitRepository.getCurrentBranch();
        const isInitialized = gitRepository.isInitialized();

        if (!isInitialized) {
            return (
                <div className="mt-4 rounded border border-purple-800/30 bg-purple-900/30 px-3 py-2 text-sm">
                    <span className="text-yellow-400">⚠️ {t("level.gitNotInitialized")}</span>
                </div>
            );
        }

        const stagedCount = Object.values(status).filter(s => s === "staged").length;
        const modifiedCount = Object.values(status).filter(s => s === "modified").length;
        const untrackedCount = Object.values(status).filter(s => s === "untracked").length;

        return (
            <div className="mt-4 rounded border border-purple-800/30 bg-purple-900/30 px-3 py-2 text-sm">
                <div className="flex items-center justify-between">
                    <span>
                        <span className="text-purple-400">{t("level.branch")}</span>{" "}
                        <span className="text-purple-200">{branch}</span>
                    </span>
                    <span className="text-xs text-purple-500">{t("level.gitStatus")}</span>
                </div>

                {stagedCount > 0 && (
                    <div className="mt-1">
                        <span className="text-green-400">
                            ● {stagedCount} {t("level.staged")}
                        </span>
                    </div>
                )}

                {modifiedCount > 0 && (
                    <div className="mt-1">
                        <span className="text-amber-400">
                            ● {modifiedCount} {t("level.modified")}
                        </span>
                    </div>
                )}

                {untrackedCount > 0 && (
                    <div className="mt-1">
                        <span className="text-red-400">
                            ● {untrackedCount} {t("level.untracked")}
                        </span>
                    </div>
                )}

                {stagedCount === 0 && modifiedCount === 0 && untrackedCount === 0 && (
                    <div className="mt-1">
                        <span className="text-green-400">✓ {t("level.workingTreeClean")}</span>
                    </div>
                )}
            </div>
        );
    };

    // Toggle collapsible card sections on mobile
    const toggleTerminal = () => {
        setTerminalCollapsed(!terminalCollapsed);
        // If opening terminal, ensure challenge is collapsed on mobile
        if (terminalCollapsed && window.innerWidth < 768) {
            setChallengeCollapsed(true);
        }
    };

    const toggleChallenge = () => {
        setChallengeCollapsed(!challengeCollapsed);
        // If opening challenge, ensure terminal is collapsed on mobile
        if (challengeCollapsed && window.innerWidth < 768) {
            setTerminalCollapsed(true);
        }
    };

    return (
        <PageLayout showLevelInfo>
            <div className="bg-[#1a1625] text-purple-100">
                <div className="container mx-auto p-4">
                    <h1 className="mb-6 text-center text-3xl font-bold text-white">Git Learning Game</h1>
                    <ProgressBar score={progress.score} maxScore={150} className="mb-6" />

                    {/* Mobile collapsible controls */}
                    <div className="mb-4 flex flex-col gap-2 md:hidden">
                        <Button
                            variant="outline"
                            onClick={toggleTerminal}
                            className="flex w-full items-center justify-between border-purple-700 text-purple-200">
                            <span className="flex items-center">
                                <Shield className="mr-2 h-5 w-5 text-purple-400" />
                                {t("level.gitTerminal")}
                            </span>
                            {terminalCollapsed ? (
                                <ChevronDown className="h-5 w-5" />
                            ) : (
                                <ChevronUp className="h-5 w-5" />
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={toggleChallenge}
                            className="flex w-full items-center justify-between border-purple-700 text-purple-200">
                            <span className="flex items-center">
                                <Shield className="mr-2 h-5 w-5 text-purple-400" />
                                {t("level.currentChallenge")}
                            </span>
                            {challengeCollapsed ? (
                                <ChevronDown className="h-5 w-5" />
                            ) : (
                                <ChevronUp className="h-5 w-5" />
                            )}
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Terminal Card - Hidden when collapsed on mobile */}
                        <Card
                            className={`border-purple-900/20 bg-purple-900/10 md:order-1 ${terminalCollapsed ? "hidden md:block" : ""}`}>
                            <CardHeader className="md:block">
                                <CardTitle className="text-white">{t("level.gitTerminal")}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Terminal className="h-[350px] rounded-none md:h-[400px]" />
                            </CardContent>
                        </Card>

                        {/* Challenge Card - Hidden when collapsed on mobile */}
                        <Card
                            className={`border-purple-900/20 bg-purple-900/10 md:order-2 ${challengeCollapsed ? "hidden md:block" : ""}`}>
                            <CardHeader>
                                <CardTitle className="flex items-center text-white">
                                    <Shield className="mr-2 h-5 w-5 text-purple-400" />
                                    {t("level.currentChallenge")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {renderLevelChallenge()}
                                {renderGitStatus()}
                            </CardContent>
                        </Card>
                    </div>
                    <FileEditor
                        isOpen={isFileEditorOpen}
                        onClose={() => setIsFileEditorOpen(false)}
                        fileName={currentFile.name}
                        initialContent={currentFile.content}
                    />
                </div>
            </div>
        </PageLayout>
    );
}
