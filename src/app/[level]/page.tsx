"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FileEditor } from "~/components/FileEditor";
import { ProgressBar } from "~/components/ProgressBar";
import { useGameContext } from "~/contexts/GameContext";
import { type LevelType } from "~/types";
import { highlightGitCommands } from "~/lib/textHighlighting";
import {
    HelpCircleIcon,
    ArrowRightIcon,
    Shield,
    BookOpen,
    Code,
    Pencil,
    Trash2,
    ChevronDown,
    ChevronRight,
    FileIcon,
    Folder,
} from "lucide-react";
import { PageLayout } from "~/components/layout/PageLayout";
import { ClientOnly } from "~/components/ClientOnly";
import { useLanguage } from "~/contexts/LanguageContext";
import { StoryDialog } from "~/components/StoryDialog";
import { GitMascot } from "~/components/GitMascot";
import dynamic from "next/dynamic";
import { TerminalSkeleton } from "~/components/ui/TerminalSkeleton";
import { CommitDialog } from "~/components/CommitDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import { RotateCcw } from "lucide-react";

// Dynamically import Terminal component with SSR disabled
const Terminal = dynamic(() => import("~/components/Terminal").then(mod => ({ default: mod.Terminal })), {
    ssr: false,
    loading: () => <TerminalSkeleton className="h-[580px]" />,
});

// File tree node type definition
interface FileTreeNode {
    name: string;
    path: string;
    isDirectory: boolean;
    children: Record<string, FileTreeNode>;
}

function LevelPageContent() {
    const {
        currentStage,
        currentLevel,
        isLevelCompleted,
        handleNextLevel,
        levelManager,
        progressManager,
        gitRepository,
        isFileEditorOpen,
        setIsFileEditorOpen,
        isAdvancedMode,
        toggleAdvancedMode,
        getEditableFiles,
        handleCommand,
        currentFile,
        openFileEditor,
        syncURLWithCurrentLevel,
        handleLevelFromUrl,
        shouldShowStoryDialog,
        setShouldShowStoryDialog,
        resetCurrentLevel,
        resetAllProgress,
    } = useGameContext();

    const searchParams = useSearchParams();

    const levelParamProcessedRef = useRef(false);
    const { t } = useLanguage();
    const [showHints, setShowHints] = useState(false);
    const [editableFiles, setEditableFiles] = useState<Array<{ name: string; path: string }>>([]);
    const [showStoryDialog, setShowStoryDialog] = useState(false);
    const [userClosedStoryDialog, setUserClosedStoryDialog] = useState(false);
    const [urlParamsProcessed, setUrlParamsProcessed] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    // Reset hints when level changes
    useEffect(() => {
        setShowHints(false);
    }, [currentStage, currentLevel]);

    // Helper function to convert flat file list to tree structure
    const getFileTree = (files: Array<{ name: string; path: string }>): FileTreeNode => {
        const root: FileTreeNode = {
            name: "/",
            path: "/",
            isDirectory: true,
            children: {},
        };

        // Sort files to ensure parent directories are processed before their children
        const sortedFiles = [...files].sort((a, b) => a.path.localeCompare(b.path));

        for (const file of sortedFiles) {
            // Split path into segments
            const segments = file.path.split("/").filter(Boolean);

            if (segments.length === 0) continue; // Skip root

            const fileName = segments.pop() ?? "";

            // Navigate to the correct directory
            let currentDir = root;
            for (const segment of segments) {
                // Create directory if it doesn't exist
                if (!currentDir.children[segment]) {
                    currentDir.children[segment] = {
                        name: segment,
                        path: `${currentDir.path === "/" ? "" : currentDir.path}/${segment}`,
                        isDirectory: true,
                        children: {},
                    };
                }
                currentDir = currentDir.children[segment]!;
            }

            // Add file to the directory
            currentDir.children[fileName] = {
                name: fileName,
                path: file.path,
                isDirectory: false,
                children: {},
            };
        }

        return root;
    };

    // Recursive component to render a file tree item
    const FileTreeItem = ({
        item,
        level = 0,
        onEditFile,
        onDeleteFile,
    }: {
        item: FileTreeNode;
        level?: number;
        onEditFile: (path: string) => void;
        onDeleteFile: (path: string, name: string) => void;
    }) => {
        const [isOpen, setIsOpen] = useState(level === 0); // Root is open by default

        if (item.isDirectory) {
            // Directory
            const hasChildren = Object.keys(item.children).length > 0;

            return (
                <div className="mb-1">
                    <div
                        className="flex cursor-pointer items-center rounded px-2 py-0.5 hover:bg-purple-900/30"
                        onClick={() => setIsOpen(!isOpen)}>
                        <span className="mr-1 text-purple-400">
                            {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </span>
                        <Folder className="mr-1 h-3.5 w-3.5 text-purple-400" />
                        <span className="font-medium text-purple-300">{item.name === "/" ? "root" : item.name}</span>
                    </div>

                    {isOpen && hasChildren && (
                        <div className="ml-4 border-l border-purple-800/50 pl-2">
                            {Object.values(item.children)
                                .sort((a, b) => {
                                    // Directories first, then files
                                    if (a.isDirectory && !b.isDirectory) return -1;
                                    if (!a.isDirectory && b.isDirectory) return 1;
                                    return a.name.localeCompare(b.name);
                                })
                                .map(child => (
                                    <FileTreeItem
                                        key={child.path}
                                        item={child}
                                        level={level + 1}
                                        onEditFile={onEditFile}
                                        onDeleteFile={onDeleteFile}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            );
        } else {
            // File
            return (
                <div className="mb-1 flex items-center justify-between rounded px-2 py-0.5 hover:bg-purple-900/30">
                    <div className="flex items-center truncate text-left text-purple-300" title={item.path}>
                        <FileIcon className="mr-1 h-3 w-3 text-purple-400" />
                        <span>{item.name}</span>
                    </div>
                    <div className="flex">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-6 w-6 p-0 text-purple-300 hover:bg-purple-800/50 hover:text-purple-100"
                            onClick={() => onEditFile(item.path)}
                            title={t("level.editFile")}>
                            <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-6 w-6 p-0 text-purple-300 hover:bg-red-900/30 hover:text-red-300"
                            onClick={() => onDeleteFile(item.path, item.name)}
                            title={t("level.deleteFile")}>
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            );
        }
    };

    // Handle URL query parameters for level selection - HIGHEST PRIORITY
    useEffect(() => {
        if (typeof window !== "undefined") {
            const stageParam = searchParams.get("stage");
            const levelParam = searchParams.get("level");

            if (stageParam && levelParam) {
                const levelNum = parseInt(levelParam);
                if (!isNaN(levelNum)) {
                    // Check if level exists
                    const levelExists = levelManager.getLevel(stageParam, levelNum);
                    if (levelExists) {
                        // Always call handleLevelFromUrl to ensure terminal is correctly initialized
                        // The function already checks if an update is needed internally
                        console.log(`Loading level from URL: ${stageParam}-${levelNum}`);
                        handleLevelFromUrl(stageParam, levelNum);
                        setUrlParamsProcessed(true);
                        levelParamProcessedRef.current = true;
                    }
                }
            } else {
                // No URL params, load from localStorage and sync URL
                console.log("No URL params found, loading from localStorage");
                const progress = progressManager.getProgress();
                if (progress.currentStage && progress.currentLevel) {
                    // Always call to ensure terminal is correctly initialized
                    handleLevelFromUrl(progress.currentStage, progress.currentLevel);
                }
                setUrlParamsProcessed(true);
                // Sync URL to match current state
                syncURLWithCurrentLevel();
            }
        }
    }, [searchParams, levelManager, handleLevelFromUrl, progressManager, syncURLWithCurrentLevel]);

    // Sync URL after level changes (including next level)
    useEffect(() => {
        // Always sync URL when stage or level changes, but only after URL params are processed
        if (urlParamsProcessed) {
            console.log(`Syncing URL: ${currentStage}-${currentLevel}`);
            syncURLWithCurrentLevel();
        }
    }, [currentStage, currentLevel, syncURLWithCurrentLevel, urlParamsProcessed]);

    // Get the current level data with translation
    const levelData: LevelType | null = levelManager.getLevel(currentStage, currentLevel, t);
    const progress = progressManager.getProgress();

    // Get difficulty config for max points
    const difficultyStages = {
        beginner: ["Intro", "Files", "Branches", "Remote"],
        advanced: ["Merge", "Workflow", "TeamWork", "Reset", "Stash"],
        pro: ["Rebase", "Advanced", "Archaeology", "Mastery"],
    };

    // Determine current difficulty based on stage
    let currentDifficultyMaxPoints = 150; // Default
    if (difficultyStages.beginner.includes(currentStage)) {
        currentDifficultyMaxPoints = 150;
    } else if (difficultyStages.advanced.includes(currentStage)) {
        currentDifficultyMaxPoints = 150;
    } else if (difficultyStages.pro.includes(currentStage)) {
        currentDifficultyMaxPoints = 150;
    }

    // Get double XP info
    const isDoubleXpActive = progressManager.isDoubleXpActive();
    const doubleXpHoursLeft = progressManager.getDoubleXpRemainingHours();

    // Reset URL params state when the component unmounts
    useEffect(() => {
        return () => {
            setUrlParamsProcessed(false);
            levelParamProcessedRef.current = false;
        };
    }, []);

    // Update editable files when terminal output changes (indicator of file system changes)
    const updateEditableFiles = useCallback(() => {
        setEditableFiles(getEditableFiles());
    }, [getEditableFiles]);

    useEffect(() => {
        updateEditableFiles();
    }, [updateEditableFiles]);

    // Handle next level navigation and reset story dialog state
    const handleNextLevelWithStory = () => {
        // Call handleNextLevel and check if there's actually a next level
        const nextLevelInfo = handleNextLevel();

        // Only show story dialog if there's actually a next level (not redirecting to home)
        if (nextLevelInfo && nextLevelInfo.stageId && typeof nextLevelInfo.levelId === "number") {
            // Reset the story dialog state when navigating to a new level
            setUserClosedStoryDialog(false);
            if (!isAdvancedMode) {
                setShowStoryDialog(true);
            }
        }
        // If nextLevelInfo is null or undefined, it means difficulty is completed and redirect is happening
    };

    // Story dialog display logic - Reset when levels change or triggered by GameContext
    useEffect(() => {
        if (levelData?.story) {
            if (!userClosedStoryDialog || shouldShowStoryDialog) {
                if (!isAdvancedMode) {
                    setShowStoryDialog(true);
                } else {
                    setShowStoryDialog(false);
                }

                // Reset the trigger flag
                if (shouldShowStoryDialog) {
                    setShouldShowStoryDialog(false);
                }
            }
        } else {
            setShowStoryDialog(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStage, currentLevel, levelData, isAdvancedMode, userClosedStoryDialog, shouldShowStoryDialog]);

    const handleCloseStoryDialog = () => {
        setShowStoryDialog(false);
        setUserClosedStoryDialog(true);
    };

    // Show a list of user-editable files as a hierarchical tree
    const renderEditableFiles = () => {
        const isGitInitialized = gitRepository.isInitialized();

        if (editableFiles.length === 0) {
            return (
                <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium text-purple-200">{t("level.filesToEdit")}</h3>
                        {!isGitInitialized && (
                            <span className="text-xs text-yellow-400">⚠️ {t("level.gitNotInitialized")}</span>
                        )}
                    </div>
                    <p className="text-sm text-purple-400">No editable files found.</p>
                </div>
            );
        }

        // Create file tree structure for hierarchical view
        const fileTree = getFileTree(editableFiles);

        const handleEditFile = (path: string) => {
            openFileEditor(path);
        };

        const handleDeleteFile = (path: string, name: string) => {
            if (window.confirm(t("level.confirmDelete").replace("{file}", name))) {
                handleCommand(`rm ${path}`, false);
                updateEditableFiles();
            }
        };

        return (
            <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium text-purple-200">{t("level.filesToEdit")}</h3>
                    {!isGitInitialized && (
                        <span className="text-xs text-yellow-400">⚠️ {t("level.gitNotInitialized")}</span>
                    )}
                </div>
                <div className="rounded border border-purple-800/30 bg-purple-900/10 p-3">
                    <FileTreeItem item={fileTree} onEditFile={handleEditFile} onDeleteFile={handleDeleteFile} />
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
                <div className="space-y-6">
                    {/* Header Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white sm:text-xl">{levelData.name}</h2>
                        </div>
                        <p className="text-sm text-purple-200 sm:text-base">{levelData.description}</p>
                    </div>

                    {/* Objectives Section */}
                    <div className="space-y-3">
                        <h3 className="flex items-center text-sm font-medium text-purple-200 sm:text-base">
                            {t("level.objectives")}
                        </h3>
                        <div className="space-y-2">
                            {levelData.objectives.map((objective, index) => {
                                const objectiveNumber = index + 1;
                                const hasObjectiveIds = levelData.requirements.some(
                                    req => req.objectiveId !== undefined,
                                );
                                const isCompleted = hasObjectiveIds
                                    ? levelData.completedObjectives?.includes(objectiveNumber) || false
                                    : levelData.requirements[index]?.id
                                      ? levelData.completedRequirements?.includes(levelData.requirements[index]!.id!) ||
                                        false
                                      : false;

                                return (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3 rounded-lg bg-purple-900/20 p-3 transition-all hover:bg-purple-900/30">
                                        <div
                                            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                                isCompleted
                                                    ? "border-green-500 bg-green-500/20"
                                                    : "border-purple-500/50 bg-purple-900/40"
                                            }`}>
                                            {isCompleted && (
                                                <svg
                                                    className="h-3 w-3 text-green-400"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span
                                            className={`text-sm sm:text-base ${isCompleted ? "text-green-300 line-through" : "text-purple-300"}`}>
                                            {objective}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowHints(!showHints)}
                            className="flex flex-1 items-center justify-center border-purple-700 text-purple-300 hover:bg-purple-900/50">
                            <HelpCircleIcon className="mr-2 h-4 w-4" />
                            <span className="text-sm">{showHints ? t("level.hideHints") : t("level.showHints")}</span>
                        </Button>

                        {levelData?.story && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowStoryDialog(true)}
                                className="flex flex-1 items-center justify-center border-purple-700 text-purple-300 hover:bg-purple-900/50">
                                <BookOpen className="mr-2 h-4 w-4" />
                                <span className="text-sm">{t("level.storyButton")}</span>
                            </Button>
                        )}

                        {isLevelCompleted && (
                            <Button
                                onClick={handleNextLevelWithStory}
                                size="sm"
                                className="flex flex-1 items-center justify-center bg-purple-600 text-white hover:bg-purple-700">
                                <ArrowRightIcon className="mr-2 h-4 w-4" />
                                <span className="text-sm">{t("level.nextLevel")}</span>
                            </Button>
                        )}
                    </div>

                    {/* Hints Section */}
                    {showHints && (
                        <div className="mt-1 rounded-lg border border-purple-700/50 bg-purple-900/30 p-3">
                            <h3 className="mb-2 flex items-center text-sm font-medium text-purple-200">
                                <HelpCircleIcon className="mr-2 h-4 w-4" />
                                {t("level.hints")}
                            </h3>
                            <ul className="space-y-2 text-sm text-purple-200">
                                {levelData.hints.map((hint, index) => (
                                    <li key={index} className="flex items-baseline">
                                        <span className="mr-2 flex-shrink-0">•</span>
                                        <span>{highlightGitCommands(hint)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {renderEditableFiles()}
                </div>
            </ClientOnly>
        );
    };

    return (
        <PageLayout showLevelInfo>
            <div className="bg-[#1a1625] text-purple-100">
                <div className="container mx-auto p-2 sm:p-4">
                    <h1 className="mb-4 text-center text-2xl font-bold text-white sm:mb-6 sm:text-3xl">
                        Git Learning Game
                    </h1>
                    <ProgressBar
                        score={progress.score}
                        coins={progress.coins}
                        maxScore={currentDifficultyMaxPoints}
                        isDoubleXpActive={isDoubleXpActive}
                        doubleXpHoursLeft={doubleXpHoursLeft}
                        className="mb-4 sm:mb-6"
                    />

                    {/* Mobile-optimized layout: Stack vertically on mobile, side-by-side on desktop */}
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
                        {/* Challenge Card - Always show first on mobile for context */}
                        <Card className="order-1 flex flex-col overflow-hidden border-purple-900/20 bg-purple-900/10 lg:order-2 lg:h-[580px]">
                            <CardHeader className="shrink-0 p-3 sm:p-6 sm:pb-0">
                                <CardTitle className="flex items-center justify-between text-base text-white sm:text-lg">
                                    <div className="flex items-center">
                                        <Shield className="mr-2 h-4 w-4 text-purple-400 sm:h-5 sm:w-5" />
                                        {t("level.currentChallenge")}
                                    </div>
                                    {/* Mode Toggle in top right corner */}
                                    <div className="group relative">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={toggleAdvancedMode}
                                            className={`h-8 w-8 rounded-full p-0 transition-all hover:bg-purple-800/50 ${
                                                isAdvancedMode
                                                    ? "bg-purple-600/30 text-purple-300"
                                                    : "text-purple-400 hover:text-purple-300"
                                            }`}>
                                            {isAdvancedMode ? (
                                                <Code className="h-4 w-4" />
                                            ) : (
                                                <BookOpen className="h-4 w-4" />
                                            )}
                                        </Button>
                                        {/* Modern Tooltip */}
                                        <div className="absolute top-full right-0 z-50 mt-2 hidden rounded-lg bg-gray-900/95 px-3 py-2 text-xs text-white shadow-lg backdrop-blur-sm group-hover:block">
                                            <div className="absolute -top-1 right-3 h-2 w-2 rotate-45 bg-gray-900/95"></div>
                                            {isAdvancedMode ? t("level.techModeOn") : t("level.storyModeOn")}
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow overflow-auto p-3 pb-4 sm:p-6">
                                {renderLevelChallenge()}
                            </CardContent>
                        </Card>

                        {/* Terminal - Second on mobile, optimized height */}
                        {urlParamsProcessed ? (
                            <Terminal
                                className="order-2 h-[450px] rounded-md sm:h-[500px] lg:order-1 lg:h-[580px]"
                                onResetClick={() => setShowResetModal(true)}
                            />
                        ) : (
                            <TerminalSkeleton className="order-2 h-[450px] rounded-md sm:h-[500px] lg:order-1 lg:h-[580px]" />
                        )}
                    </div>

                    <FileEditor
                        isOpen={isFileEditorOpen}
                        onClose={() => setIsFileEditorOpen(false)}
                        fileName={currentFile.name}
                        initialContent={currentFile.content}
                    />

                    <CommitDialog />

                    {/* Git Mascot - only show if purchased */}
                    <ClientOnly>
                        <GitMascot
                            isActive={progressManager.getPurchasedItems().includes("git-mascot")}
                            onEncouragement={() => {
                                // Could add sound effects here later
                                console.log("Mascot is encouraging the player!");
                            }}
                        />
                    </ClientOnly>
                </div>
            </div>
            {levelData?.story && (
                <StoryDialog
                    isOpen={showStoryDialog}
                    onClose={handleCloseStoryDialog}
                    story={levelData.story}
                    isAdvancedMode={isAdvancedMode}
                    onToggleAdvancedMode={toggleAdvancedMode}
                />
            )}

            {/* Reset Modal */}
            <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
                <DialogContent className="border-gray-700/50 bg-gray-900/95 backdrop-blur-sm">
                    <DialogHeader>
                        <DialogTitle className="text-white">{t("level.resetOptions")}</DialogTitle>
                        <DialogDescription className="text-gray-300">{t("level.resetDescription")}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full border-orange-500/30 bg-orange-500/10 text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/20"
                            onClick={() => {
                                resetCurrentLevel();
                                setShowResetModal(false);
                            }}>
                            <div className="flex w-full items-center justify-center">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                <span>{t("level.resetLevel")}</span>
                            </div>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-500/50 hover:bg-red-500/20"
                            onClick={() => {
                                if (window.confirm(t("level.resetAllConfirm"))) {
                                    resetAllProgress();
                                    setShowResetModal(false);
                                }
                            }}>
                            <div className="flex w-full items-center justify-center">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                <span>{t("level.resetAllProgress")}</span>
                            </div>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </PageLayout>
    );
}

export default function LevelPage() {
    return (
        <Suspense fallback={<TerminalSkeleton className="h-[580px]" />}>
            <LevelPageContent />
        </Suspense>
    );
}
