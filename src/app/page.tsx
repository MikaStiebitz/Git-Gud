"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
    GitBranch,
    GitCommit,
    GitMerge,
    Rocket,
    CheckCircle2,
    LockIcon,
    Code,
    BookOpen,
    Sparkles,
    ChevronRight,
    Activity,
    Award,
    Star,
    BookMarked,
    Zap,
    ArrowRight,
    Github,
} from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";
import { PageLayout } from "~/components/layout/PageLayout";
import { ClientOnly } from "~/components/ClientOnly";
import { useLanguage } from "~/contexts/LanguageContext";
import { useRouter } from "next/navigation";

// Animation helper component
const AnimatedElement = ({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${className} ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

export default function Home() {
    const { levelManager, progressManager } = useGameContext();
    const { t } = useLanguage();
    const router = useRouter();
    const [progress, setProgress] = useState(progressManager.getProgress());

    // Update progress when it changes
    useEffect(() => {
        const updateProgress = () => {
            setProgress(progressManager.getProgress());
        };

        // Initial update
        updateProgress();

        // Update on storage events (in case another tab changes the progress)
        window.addEventListener("storage", updateProgress);

        return () => {
            window.removeEventListener("storage", updateProgress);
        };
    }, [progressManager]);

    // Get all stages with translated content
    const stages = levelManager.getAllStages(t);

    // Navigation function to use correct URL structure for [level] dynamic route
    const navigateToLevel = (stageId: string, levelId: number) => {
        // Set the progress first - this ensures GameContext has the right data
        progressManager.setCurrentLevel(stageId, levelId);

        // Navigate using the correct URL structure for [level] dynamic route
        router.push(`/${stageId.toLowerCase()}?level=${levelId}`);
    };

    // Get stage icon component with animation
    const getStageIcon = (stageId: string) => {
        switch (stageId) {
            case "Intro":
                return (
                    <Rocket className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Files":
                return (
                    <GitCommit className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Branches":
                return (
                    <GitBranch className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Merge":
                return (
                    <GitMerge className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Rebase":
                return (
                    <Activity className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Remote":
                return (
                    <Github className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            default:
                return (
                    <GitCommit className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
        }
    };

    // Check if a stage is unlocked
    const isStageUnlocked = (stageId: string) => {
        if (stageId === "Intro") return true;

        const stageOrder = Object.keys(stages);
        const stageIndex = stageOrder.indexOf(stageId);

        if (stageIndex <= 0) return true;

        const previousStage = stageOrder[stageIndex - 1];
        if (!previousStage) return true;

        // Stage is unlocked if at least one level of the previous stage is completed
        return (progress.completedLevels[previousStage]?.length ?? 0) > 0;
    };

    // Check if a level is unlocked
    const isLevelUnlocked = (stageId: string, levelId: number) => {
        if (!isStageUnlocked(stageId)) return false;

        if (levelId === 1) return true;

        // Level is unlocked if the previous level is completed
        return progressManager.isLevelCompleted(stageId, levelId - 1);
    };

    // Check if a level is completed
    const isLevelCompleted = (stageId: string, levelId: number) => {
        return progressManager.isLevelCompleted(stageId, levelId);
    };

    // Calculate progress percentage
    const calculateProgress = (stageId: string) => {
        const stageLevels = Object.keys(stages[stageId]?.levels ?? {}).length;
        const completedLevels = progress.completedLevels[stageId]?.length ?? 0;

        return stageLevels > 0 ? (completedLevels / stageLevels) * 100 : 0;
    };

    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-b from-[#1a1625] to-[#231c33] text-purple-100">
                {/* Hero Section with animation */}
                <section className="container relative mx-auto overflow-hidden px-4 py-12 text-center sm:py-20">
                    {/* Background decoration */}
                    <div className="absolute left-0 top-0 -z-10 h-64 w-64 rotate-45 rounded-full bg-purple-600/10 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rotate-45 rounded-full bg-indigo-600/10 blur-3xl"></div>

                    <AnimatedElement>
                        <div className="mb-4 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-900/30 p-4">
                                <GitBranch className="h-10 w-10 text-purple-400" />
                            </div>
                        </div>
                    </AnimatedElement>

                    <AnimatedElement delay={200}>
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
                            {t("home.title")}
                            <span className="relative ml-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                                {t("home.title2")}
                                <span className="absolute -right-6 -top-6">
                                    <Sparkles className="animate-pulse h-6 w-6 text-purple-400" />
                                </span>
                            </span>
                        </h1>
                    </AnimatedElement>

                    <AnimatedElement delay={400}>
                        <p className="mx-auto mt-4 max-w-2xl text-base text-purple-200 sm:mt-6 sm:text-lg">
                            {t("home.subtitle")}
                        </p>
                    </AnimatedElement>

                    <AnimatedElement delay={600}>
                        <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                            <Link href="/intro" className="group w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="group relative w-full overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 text-white transition-all duration-300 hover:from-purple-700 hover:to-purple-800 sm:w-auto">
                                    <span className="relative z-10 flex items-center">
                                        <Code className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                        {t("home.startLearning")}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                    <span className="absolute bottom-0 left-0 h-1 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
                                </Button>
                            </Link>
                            <Link href="/playground" className="group w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full border-purple-700 text-purple-300 transition-all duration-300 hover:border-purple-600 hover:bg-purple-900/50 hover:text-purple-200 sm:w-auto">
                                    <BookOpen className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                    {t("home.cheatSheet")}
                                </Button>
                            </Link>
                        </div>
                    </AnimatedElement>
                </section>

                {/* Animated Stats Section */}
                <AnimatedElement>
                    <section className="container mx-auto py-6">
                        <ClientOnly>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="rounded-lg border border-purple-800/30 bg-purple-900/20 p-4 text-center">
                                    <h3 className="text-xs text-purple-400 sm:text-sm">{t("progress.points")}</h3>
                                    <p className="text-2xl font-bold text-white">{progress.score}</p>
                                </div>
                                <div className="rounded-lg border border-purple-800/30 bg-purple-900/20 p-4 text-center">
                                    <h3 className="text-xs text-purple-400 sm:text-sm">{t("home.completed")}</h3>
                                    <p className="text-2xl font-bold text-white">
                                        {Object.values(progress.completedLevels).flat().length}
                                    </p>
                                </div>
                                <div className="rounded-lg border border-purple-800/30 bg-purple-900/20 p-4 text-center">
                                    <h3 className="text-xs text-purple-400 sm:text-sm">{t("level.level")}</h3>
                                    <p className="text-2xl font-bold text-white">{progress.currentLevel}</p>
                                </div>
                                <div className="rounded-lg border border-purple-800/30 bg-purple-900/20 p-4 text-center">
                                    <h3 className="text-xs text-purple-400 sm:text-sm">{t("level.branch")}</h3>
                                    <p className="text-2xl font-bold text-white">{progress.currentStage}</p>
                                </div>
                            </div>
                        </ClientOnly>
                    </section>
                </AnimatedElement>

                {/* Progress Path - Enhanced with animations */}
                <section className="container mx-auto px-4 py-8 sm:py-16">
                    <AnimatedElement>
                        <h2 className="mb-8 text-center text-2xl font-bold text-white sm:mb-12 sm:text-3xl">
                            <span className="relative">
                                {t("home.learningPath")}
                                <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-purple-300"></span>
                            </span>
                        </h2>
                    </AnimatedElement>

                    <ClientOnly>
                        <div className="relative">
                            {/* Central Line - Enhanced with animation */}
                            <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-purple-900/50 to-purple-600/50 lg:block">
                                <div className="animate-pulse absolute h-full w-full bg-gradient-to-b from-purple-500/20 to-purple-800/20"></div>
                            </div>

                            <div className="space-y-10 sm:space-y-16 lg:space-y-24">
                                {Object.entries(stages).map(([stageId, stageData], index) => {
                                    const isUnlocked = isStageUnlocked(stageId);
                                    const totalLevels = Object.keys(stageData.levels).length;
                                    const completedLevels = progress.completedLevels[stageId]?.length ?? 0;
                                    const progressPercent = calculateProgress(stageId);

                                    return (
                                        <AnimatedElement key={stageId} delay={index * 150}>
                                            <div className="relative">
                                                {/* Stage Node - Enhanced with glow and animation */}
                                                <div
                                                    className={`group hidden h-12 w-12 transform items-center justify-center rounded-full lg:absolute lg:left-1/2 lg:top-0 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2 ${
                                                        isUnlocked
                                                            ? "bg-gradient-to-br from-purple-500 to-purple-700"
                                                            : "bg-gray-700"
                                                    } ${stageId === progress.currentStage ? "ring-4 ring-purple-400/50" : ""}`}>
                                                    {isUnlocked && (
                                                        <span className="animate-ping absolute -inset-2 hidden rounded-full bg-purple-400/20 lg:inline-block"></span>
                                                    )}
                                                    {getStageIcon(stageId)}
                                                </div>

                                                <div
                                                    className={`group relative rounded-lg border p-6 transition-all duration-300 hover:shadow-lg ${
                                                        isUnlocked
                                                            ? "border-purple-700/30 bg-purple-900/20 hover:border-purple-600/50 hover:bg-purple-900/30"
                                                            : "border-gray-800/20 bg-gray-900/10"
                                                    } ${index % 2 === 0 ? "lg:ml-auto lg:mr-12" : "lg:ml-12 lg:mr-auto"} w-full lg:w-5/12`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            {/* Show stage icon inline on mobile */}
                                                            <div className="relative mr-3 lg:hidden">
                                                                <div
                                                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                                                        isUnlocked
                                                                            ? "bg-gradient-to-br from-purple-500 to-purple-700"
                                                                            : "bg-gray-700"
                                                                    }`}>
                                                                    {getStageIcon(stageId)}
                                                                </div>
                                                                {isUnlocked && (
                                                                    <span className="animate-ping absolute -inset-1 rounded-full bg-purple-400/20"></span>
                                                                )}
                                                            </div>
                                                            <h3
                                                                className={`text-lg font-bold sm:text-xl ${
                                                                    isUnlocked ? "text-white" : "text-gray-500"
                                                                }`}>
                                                                {stageData.name}
                                                            </h3>
                                                        </div>
                                                        <div
                                                            className={`flex items-center text-xs sm:text-sm ${
                                                                isUnlocked ? "text-purple-400" : "text-gray-500"
                                                            }`}>
                                                            <div className="flex items-center">
                                                                {completedLevels}/{totalLevels}
                                                                <Award className="ml-1 h-4 w-4" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stage progress bar */}
                                                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-purple-900/40">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-700"
                                                            style={{ width: `${progressPercent}%` }}></div>
                                                    </div>

                                                    <p
                                                        className={`mt-3 text-sm sm:text-base ${
                                                            isUnlocked ? "text-purple-200" : "text-gray-500"
                                                        }`}>
                                                        {stageData.description}
                                                    </p>

                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {Object.entries(stageData.levels).map(([levelId]) => {
                                                            const level = parseInt(levelId);
                                                            const levelUnlocked = isLevelUnlocked(stageId, level);
                                                            const levelCompleted = isLevelCompleted(stageId, level);

                                                            return (
                                                                <div
                                                                    key={levelId}
                                                                    className={
                                                                        levelUnlocked
                                                                            ? "transition-transform hover:scale-105"
                                                                            : "pointer-events-none"
                                                                    }
                                                                    onClick={() =>
                                                                        levelUnlocked && navigateToLevel(stageId, level)
                                                                    }>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className={`group flex cursor-pointer items-center ${
                                                                            levelUnlocked
                                                                                ? levelCompleted
                                                                                    ? "border-green-700 bg-green-900/20 text-green-300 hover:bg-green-900/40"
                                                                                    : "border-purple-700 bg-purple-900/10 text-purple-300 hover:border-purple-600 hover:bg-purple-900/30 hover:text-purple-100"
                                                                                : "border-gray-800 bg-gray-900/20 text-gray-500"
                                                                        }`}>
                                                                        {levelCompleted ? (
                                                                            <CheckCircle2 className="mr-1 h-3 w-3 text-green-400 transition-transform duration-300 group-hover:scale-110" />
                                                                        ) : !levelUnlocked ? (
                                                                            <LockIcon className="mr-1 h-3 w-3" />
                                                                        ) : (
                                                                            <Star className="mr-1 h-3 w-3 text-purple-400 transition-transform duration-300 group-hover:rotate-45" />
                                                                        )}
                                                                        Level {levelId}
                                                                    </Button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Arrow to next stage */}
                                                    {isUnlocked && index < Object.keys(stages).length - 1 && (
                                                        <div className="absolute -bottom-8 right-4 hidden text-purple-500 lg:block">
                                                            <ChevronRight className="animate-bounce h-6 w-6" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </AnimatedElement>
                                    );
                                })}
                            </div>
                        </div>
                    </ClientOnly>
                </section>

                {/* Enhanced Level Selection Grid */}
                <section className="container mx-auto px-4 py-8 sm:py-16">
                    <AnimatedElement>
                        <h2 className="mb-8 text-center text-2xl font-bold text-white sm:mb-12 sm:text-3xl">
                            <span className="relative">
                                {t("home.chooseChallenge")}
                                <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-purple-300"></span>
                            </span>
                        </h2>
                    </AnimatedElement>

                    <ClientOnly>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                            {Object.entries(stages).map(([stageId, stageData], stageIndex) =>
                                Object.entries(stageData.levels).map(([levelId, levelData], levelIndex) => {
                                    const level = parseInt(levelId);
                                    const levelUnlocked = isLevelUnlocked(stageId, level);
                                    const levelCompleted = isLevelCompleted(stageId, level);
                                    const delay = stageIndex * 100 + levelIndex * 50;

                                    return (
                                        <AnimatedElement key={`${stageId}-${levelId}`} delay={delay}>
                                            <Card
                                                className={`group relative overflow-hidden transition-all duration-300 ${
                                                    levelUnlocked
                                                        ? levelCompleted
                                                            ? "border-green-800/30 bg-green-900/10 hover:translate-y-[-5px] hover:border-green-600 hover:shadow-lg"
                                                            : "border-purple-900/20 bg-purple-900/10 hover:translate-y-[-5px] hover:border-purple-600 hover:shadow-lg"
                                                        : "border-gray-800/20 bg-gray-900/10"
                                                }`}>
                                                {/* Background glow effect */}
                                                {levelUnlocked && (
                                                    <div
                                                        className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                                                            levelCompleted ? "bg-green-500/5" : "bg-purple-500/5"
                                                        }`}></div>
                                                )}

                                                <CardContent className="p-4 sm:p-6">
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <span className="text-xl sm:text-2xl">{stageData.icon}</span>
                                                        <span
                                                            className={`rounded-full px-2 py-1 text-xs ${
                                                                levelUnlocked
                                                                    ? levelCompleted
                                                                        ? "bg-green-900/50 text-green-300"
                                                                        : "bg-purple-900/50 text-purple-300"
                                                                    : "bg-gray-800/50 text-gray-400"
                                                            }`}>
                                                            Level {levelId}
                                                        </span>
                                                    </div>

                                                    <h3
                                                        className={`text-base font-bold sm:text-lg ${
                                                            levelUnlocked ? "text-white" : "text-gray-500"
                                                        }`}>
                                                        {levelData.name}
                                                    </h3>

                                                    <p
                                                        className={`mt-2 text-xs sm:text-sm ${
                                                            levelUnlocked ? "text-purple-300" : "text-gray-500"
                                                        }`}>
                                                        {levelData.description}
                                                    </p>

                                                    {levelUnlocked ? (
                                                        <Button
                                                            onClick={() => navigateToLevel(stageId, level)}
                                                            className={`mt-4 w-full ${
                                                                levelCompleted
                                                                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                                                                    : "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
                                                            } group transition-all duration-300 sm:opacity-100 sm:group-hover:shadow-md`}
                                                            size="sm">
                                                            {levelCompleted ? (
                                                                <>
                                                                    <CheckCircle2 className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                                                    {t("home.reviewLevel")}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Zap className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                                                    {t("home.startLevel")}
                                                                </>
                                                            )}
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            className="mt-4 w-full cursor-not-allowed bg-gray-700 text-gray-300 opacity-50"
                                                            size="sm"
                                                            disabled>
                                                            <LockIcon className="mr-2 h-4 w-4" />
                                                            {t("home.locked")}
                                                        </Button>
                                                    )}

                                                    {/* Status indicators */}
                                                    {levelCompleted && (
                                                        <div className="absolute right-2 top-2 rounded-full bg-green-700 p-1">
                                                            <CheckCircle2 className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                                                        </div>
                                                    )}

                                                    {!levelUnlocked && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                                            <LockIcon className="h-8 w-8 text-gray-400 sm:h-10 sm:w-10" />
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </AnimatedElement>
                                    );
                                }),
                            )}
                        </div>
                    </ClientOnly>
                </section>

                {/* Call to action at the bottom */}
                <AnimatedElement>
                    <section className="container mx-auto px-4 py-12 text-center">
                        <div className="mx-auto max-w-3xl rounded-lg border border-purple-700/30 bg-purple-900/20 p-8">
                            <BookMarked className="mx-auto mb-4 h-12 w-12 text-purple-400" />
                            <h2 className="mb-4 text-2xl font-bold text-white">{t("home.startLearning")}</h2>
                            <p className="mb-6 text-purple-200">{t("home.subtitle")}</p>
                            <Link href="/intro">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 text-white transition-all duration-300 hover:from-purple-700 hover:to-purple-800">
                                    <span className="relative z-10 flex items-center">
                                        <Code className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                        {t("home.startLearning")}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                    <span className="absolute bottom-0 left-0 h-1 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
                                </Button>
                            </Link>
                        </div>
                    </section>
                </AnimatedElement>
            </div>
        </PageLayout>
    );
}
