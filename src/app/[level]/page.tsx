"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FileEditor } from "~/components/FileEditor";
import { ProgressBar } from "~/components/ProgressBar";
import { useGameContext } from "~/contexts/GameContext";
import { type LevelType } from "~/types";
import {
    HelpCircleIcon,
    ArrowRightIcon,
    RotateCcw,
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
import dynamic from "next/dynamic";
import { TerminalSkeleton } from "~/components/ui/TerminalSkeleton";
import { CommitDialog } from "~/components/CommitDialog";

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

export default function LevelPage() {
    const {
        currentStage,
        currentLevel,
        isLevelCompleted,
        handleNextLevel,
        levelManager,
        progressManager,
        gitRepository,
        resetCurrentLevel,
        resetAllProgress,
        isFileEditorOpen,
        setIsFileEditorOpen,
        isAdvancedMode,
        toggleAdvancedMode,
        resetTerminalForLevel,
        getEditableFiles,
        handleCommand,
        currentFile,
        openFileEditor,
        syncURLWithCurrentLevel,
        handleLevelFromUrl,
    } = useGameContext();

    const searchParams = useSearchParams();

    const levelParamProcessedRef = useRef(false);
    const { t } = useLanguage();
    const [showHints, setShowHints] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [editableFiles, setEditableFiles] = useState<Array<{ name: string; path: string }>>([]);
    const [showStoryDialog, setShowStoryDialog] = useState(false);
    const [userClosedStoryDialog, setUserClosedStoryDialog] = useState(false);
    const [urlParamsProcessed, setUrlParamsProcessed] = useState(false);

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
                currentDir = currentDir.children[segment];
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

    // Handle URL query parameters for level selection
    useEffect(() => {
        // Only process URL params once per mount
        if (typeof window !== "undefined" && !urlParamsProcessed) {
            const stageParam = searchParams.get("stage");
            const levelParam = searchParams.get("level");

            if (stageParam && levelParam) {
                const levelNum = parseInt(levelParam);
                if (!isNaN(levelNum)) {
                    // Check if level exists
                    const levelExists = levelManager.getLevel(stageParam, levelNum);
                    if (levelExists) {
                        handleLevelFromUrl(stageParam, levelNum);
                        setUrlParamsProcessed(true);
                    }
                }
            }
        }
    }, [searchParams, levelManager, handleLevelFromUrl, urlParamsProcessed]);

    // Always sync URL when component mounts or if currentStage/currentLevel changes
    useEffect(() => {
        // Only sync URL if we're not already processing URL parameters
        if (!levelParamProcessedRef.current) {
            syncURLWithCurrentLevel();
        }
    }, [currentStage, currentLevel, syncURLWithCurrentLevel]);

    // Get the current level data with translation
    const levelData: LevelType | null = levelManager.getLevel(currentStage, currentLevel, t);
    const progress = progressManager.getProgress();

    // Reset terminal once when the component mounts
    useEffect(() => {
        resetTerminalForLevel();

        return () => {
            setUrlParamsProcessed(false);
            levelParamProcessedRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // Reset the story dialog state when navigating to a new level
        setUserClosedStoryDialog(false);
        if (!isAdvancedMode) {
            setShowStoryDialog(true);
        }
        handleNextLevel();
    };

    // Story dialog display logic - Reset when levels change
    useEffect(() => {
        if (levelData?.story) {
            if (!userClosedStoryDialog) {
                if (!isAdvancedMode) {
                    setShowStoryDialog(true);
                } else {
                    setShowStoryDialog(false);
                }
            }
        } else {
            setShowStoryDialog(false);
        }
    }, [currentStage, currentLevel, levelData, isAdvancedMode, userClosedStoryDialog]);

    const handleCloseStoryDialog = () => {
        setShowStoryDialog(false);
        setUserClosedStoryDialog(true);
    };

    // Show a list of user-editable files as a hierarchical tree
    const renderEditableFiles = () => {
        if (editableFiles.length === 0) {
            return (
                <div className="mt-4">
                    <h3 className="mb-2 font-medium text-purple-200">{t("level.filesToEdit")}</h3>
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
                <h3 className="mb-2 font-medium text-purple-200">{t("level.filesToEdit")}</h3>
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
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">{levelData.name}</h2>

                        {/* Advanced Mode Toggle Button */}
                        <div className="group relative">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleAdvancedMode}
                                className={`flex items-center text-xs ${
                                    isAdvancedMode
                                        ? "border-purple-600 bg-purple-800/30 text-purple-300"
                                        : "border-purple-700 text-purple-400"
                                }`}>
                                {isAdvancedMode ? (
                                    <>
                                        <Code className="h-3 w-3 md:mr-1" />
                                        <span className="hidden md:inline">{t("level.techModeOn")}</span>
                                    </>
                                ) : (
                                    <>
                                        <BookOpen className="h-3 w-3 md:mr-1" />
                                        <span className="hidden md:inline">{t("level.storyModeOn")}</span>
                                    </>
                                )}
                            </Button>
                        </div>
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

                        {/* Story button always visible regardless of mode */}
                        {levelData?.story && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowStoryDialog(true)} // Just open, don't reset userClosedStoryDialog
                                className="flex items-center border-purple-700 text-purple-300 hover:bg-purple-900/50">
                                <BookOpen className="mr-1 h-4 w-4" />
                                {t("level.storyButton")}
                            </Button>
                        )}

                        {isLevelCompleted && (
                            <Button
                                onClick={handleNextLevelWithStory}
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

                    <div className="mt-4 flex w-full flex-col gap-4 border-t border-purple-900/30 md:flex-row">
                        <div className="pt-4 md:flex-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                                className={`group relative w-full overflow-hidden rounded-md border ${
                                    showAdvancedOptions
                                        ? "border-purple-600/50 bg-purple-800/30 text-purple-200"
                                        : "border-purple-800/40 text-purple-400 hover:border-purple-700 hover:bg-purple-900/30 hover:text-purple-100"
                                } transition-all duration-300`}>
                                <div className="flex items-center justify-center">
                                    <span
                                        className={`mr-2 transform transition-transform ${showAdvancedOptions ? "rotate-180" : ""}`}>
                                        <ChevronDown className="h-4 w-4" />
                                    </span>
                                    <span className="truncate text-sm sm:text-base">
                                        {showAdvancedOptions
                                            ? t("level.hideAdvancedOptions")
                                            : t("level.advancedOptions")}
                                    </span>
                                </div>

                                {/* Animated highlight effect */}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-500 ${showAdvancedOptions ? "w-full" : ""} `}
                                />
                            </Button>

                            {showAdvancedOptions && (
                                <div className="mt-2 space-y-2 rounded-md border border-purple-800/30 bg-purple-900/20 p-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="group w-full border-amber-800/50 text-amber-400 hover:bg-amber-900/30"
                                        onClick={resetCurrentLevel}>
                                        <div className="flex w-full items-center justify-between">
                                            <span className="flex items-center">
                                                <RotateCcw className="mr-2 h-4 w-4 transform transition-transform group-hover:rotate-180" />
                                                {t("level.resetLevel")}
                                            </span>
                                        </div>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="group w-full border-red-800/50 text-red-400 hover:bg-red-900/30"
                                        onClick={() => {
                                            if (window.confirm(t("level.resetConfirm"))) {
                                                resetAllProgress();
                                            }
                                        }}>
                                        <div className="flex w-full items-center justify-between">
                                            <span className="flex items-center">
                                                <RotateCcw className="mr-2 h-4 w-4 transform transition-transform group-hover:rotate-180" />
                                                {t("level.resetAllProgress")}
                                            </span>
                                        </div>
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="md:flex-1">{renderGitStatus()}</div>
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

                    {/* Ensuring equal heights between challenge card and terminal */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Card className="flex h-[580px] flex-col overflow-hidden border-purple-900/20 bg-purple-900/10 md:order-2">
                            <CardHeader className="shrink-0">
                                <CardTitle className="flex items-center text-white">
                                    <Shield className="mr-2 h-5 w-5 text-purple-400" />
                                    {t("level.currentChallenge")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow overflow-auto pb-4">{renderLevelChallenge()}</CardContent>
                        </Card>
                        <Terminal className="h-[580px] rounded-md" />
                    </div>

                    <FileEditor
                        isOpen={isFileEditorOpen}
                        onClose={() => setIsFileEditorOpen(false)}
                        fileName={currentFile.name}
                        initialContent={currentFile.content}
                    />

                    <CommitDialog />
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
        </PageLayout>
    );
}
