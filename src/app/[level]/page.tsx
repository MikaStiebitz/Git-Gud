"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FileEditor } from "~/components/FileEditor";
import { ProgressBar } from "~/components/ProgressBar";
import { useGameContext } from "~/contexts/GameContext";
import { type LevelType } from "~/types";
import { HelpCircleIcon, ArrowRightIcon, RotateCcw, Shield, BookOpen, Code } from "lucide-react";
import { PageLayout } from "~/components/layout/PageLayout";
import { ClientOnly } from "~/components/ClientOnly";
import { useLanguage } from "~/contexts/LanguageContext";
import { StoryDialog } from "~/components/StoryDialog";
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
        isAdvancedMode,
        toggleAdvancedMode,
        resetTerminalForLevel,
        getEditableFiles,
    } = useGameContext();

    const { t } = useLanguage();
    const [currentFile, setCurrentFile] = useState({ name: "", content: "" });
    const [showHints, setShowHints] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [showStoryDialog, setShowStoryDialog] = useState(false);
    const [editableFiles, setEditableFiles] = useState<Array<{ name: string; path: string }>>([]);

    // Get the current level data
    const levelData: LevelType | null = levelManager.getLevel(currentStage, currentLevel);
    const progress = progressManager.getProgress();

    // Reset terminal once when the component mounts
    useEffect(() => {
        resetTerminalForLevel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update editable files when terminal output changes (indicator of file system changes)
    const updateEditableFiles = useCallback(() => {
        setEditableFiles(getEditableFiles());
    }, [getEditableFiles]);

    useEffect(() => {
        updateEditableFiles();
    }, [updateEditableFiles]);

    // Monitor for file system changes
    useEffect(() => {
        // Set up an interval to check for file changes
        const intervalId = setInterval(() => {
            updateEditableFiles();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [updateEditableFiles]);

    // Open the file editor for a specific file
    const openFileEditor = (fileName: string) => {
        const content = fileSystem.getFileContents(fileName) ?? "";
        setCurrentFile({ name: fileName, content });
        setIsFileEditorOpen(true);
    };

    useEffect(() => {
        if (levelData?.story && !isAdvancedMode) {
            setShowStoryDialog(true);
        }
    }, [currentStage, currentLevel, levelData, isAdvancedMode]);

    // Show a list of user-editable files
    const renderEditableFiles = () => {
        if (editableFiles.length === 0) {
            return (
                <div className="mt-4">
                    <h3 className="mb-2 font-medium text-purple-200">{t("level.filesToEdit")}</h3>
                    <p className="text-sm text-purple-400">No editable files found.</p>
                </div>
            );
        }

        return (
            <div className="mt-4">
                <h3 className="mb-2 font-medium text-purple-200">{t("level.filesToEdit")}</h3>
                <div className="space-y-1">
                    {editableFiles.map(file => (
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
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">{levelData.name}</h2>

                        {/* Advanced Mode Toggle Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleAdvancedMode}
                            className={`flex items-center text-xs ${
                                isAdvancedMode
                                    ? "border-purple-600 bg-purple-800/30 text-purple-300"
                                    : "border-purple-700 text-purple-400"
                            }`}>
                            <Code className="mr-1 h-3 w-3" />
                            {isAdvancedMode ? t("level.advancedModeOn") : t("level.advancedModeOff")}
                        </Button>
                    </div>

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

                        {/* Story button only if not in advanced mode */}
                        {levelData.story && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowStoryDialog(true)}
                                className="flex items-center border-purple-700 text-purple-300 hover:bg-purple-900/50">
                                <BookOpen className="mr-1 h-4 w-4" />
                                {t("level.storyButton")}
                            </Button>
                        )}

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

    return (
        <PageLayout showLevelInfo>
            <div className="bg-[#1a1625] text-purple-100">
                <div className="container mx-auto p-4">
                    <h1 className="mb-6 text-center text-3xl font-bold text-white">Git Learning Game</h1>
                    <ProgressBar score={progress.score} maxScore={150} className="mb-6" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Card className="border-purple-900/20 bg-purple-900/10 md:order-2">
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
                        <Card className="border-purple-900/20 bg-purple-900/10 md:order-1">
                            <CardHeader>
                                <CardTitle className="text-white">{t("level.gitTerminal")}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Terminal className="h-[400px] rounded-none" />
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
            {levelData?.story && (
                <StoryDialog
                    isOpen={showStoryDialog}
                    onClose={() => setShowStoryDialog(false)}
                    story={levelData.story}
                    isAdvancedMode={isAdvancedMode}
                    onToggleAdvancedMode={toggleAdvancedMode}
                />
            )}
        </PageLayout>
    );
}
