"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { GitBranch, GitCommit, GitMerge, Rocket, CheckCircle2, LockIcon } from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";
import { PageLayout } from "~/components/layout/PageLayout";
import { ClientOnly } from "~/components/ClientOnly";
import { useLanguage } from "~/contexts/LanguageContext";

export default function Home() {
    const { levelManager, progressManager } = useGameContext();
    const { t } = useLanguage();
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

    // Get stage icon component
    const getStageIcon = (stageId: string) => {
        switch (stageId) {
            case "Intro":
                return <Rocket className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />;
            case "Files":
                return <GitCommit className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />;
            case "Branches":
                return <GitBranch className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />;
            case "Merge":
                return <GitMerge className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />;
            default:
                return <GitCommit className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />;
        }
    };

    // Check if a stage is unlocked
    const isStageUnlocked = (stageId: string): boolean => {
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
    const isLevelUnlocked = (stageId: string, levelId: number): boolean => {
        if (!isStageUnlocked(stageId)) return false;

        if (levelId === 1) return true;

        // Level is unlocked if the previous level is completed
        return progressManager.isLevelCompleted(stageId, levelId - 1);
    };

    // Check if a level is completed
    const isLevelCompleted = (stageId: string, levelId: number): boolean => {
        return progressManager.isLevelCompleted(stageId, levelId);
    };

    return (
        <PageLayout>
            <div className="bg-[#1a1625]">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-8 text-center sm:py-16">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
                        {t("home.title")}
                        <span className="text-purple-400"> {t("home.title2")}</span>
                    </h1>
                    <p className="mt-4 text-base text-purple-200 sm:mt-6 sm:text-lg">{t("home.subtitle")}</p>
                    <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                        <Link href="/level" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full bg-purple-600 text-white hover:bg-purple-700 sm:w-auto">
                                {t("home.startLearning")}
                            </Button>
                        </Link>
                        <Link href="/playground" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full border-purple-700 text-purple-300 hover:bg-purple-900/50 sm:w-auto">
                                {t("home.cheatSheet")}
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Progress Path */}
                <section className="container mx-auto px-4 py-8 sm:py-16">
                    <h2 className="mb-8 text-center text-2xl font-bold text-white sm:mb-12 sm:text-3xl">
                        {t("home.learningPath")}
                    </h2>
                    <ClientOnly>
                        <div className="relative">
                            {/* Central Line - Hidden on mobile, visible on larger screens */}
                            <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-purple-900/50 lg:block" />
                            <div className="space-y-8 sm:space-y-16 lg:space-y-24">
                                {Object.entries(stages).map(([stageId, stageData], index) => {
                                    const isUnlocked = isStageUnlocked(stageId);
                                    const totalLevels = Object.keys(stageData.levels).length;
                                    const completedLevels = progress.completedLevels[stageId]?.length ?? 0;
                                    return (
                                        <div key={stageId} className="relative">
                                            {/* Stage Icon - Positioned differently on mobile vs desktop */}
                                            <div
                                                className={`flex h-8 w-8 transform items-center justify-center rounded-full sm:h-10 sm:w-10 lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:-translate-y-1/2 ${
                                                    isUnlocked ? "bg-purple-600" : "bg-gray-700"
                                                } ${stageId === progress.currentStage ? "ring-4 ring-purple-400" : ""} hidden lg:static lg:flex lg:items-center`}>
                                                {getStageIcon(stageId)}
                                            </div>
                                            <div
                                                className={`rounded-lg border p-4 sm:p-6 ${
                                                    isUnlocked
                                                        ? "border-purple-900/20 bg-purple-900/10"
                                                        : "border-gray-800/20 bg-gray-900/10"
                                                } ${index % 2 === 0 ? "lg:ml-auto lg:mr-8" : "lg:ml-8"} w-full lg:w-5/12`}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        {/* Show icon inline on mobile */}
                                                        <div className="mr-3 lg:hidden">{getStageIcon(stageId)}</div>
                                                        <h3
                                                            className={`text-lg font-bold sm:text-xl ${isUnlocked ? "text-white" : "text-gray-500"}`}>
                                                            {stageData.name}
                                                        </h3>
                                                    </div>
                                                    <div
                                                        className={`text-xs sm:text-sm ${isUnlocked ? "text-purple-400" : "text-gray-500"}`}>
                                                        {completedLevels}/{totalLevels} {t("home.completed")}
                                                    </div>
                                                </div>
                                                <p
                                                    className={`mt-2 text-sm sm:text-base ${isUnlocked ? "text-purple-200" : "text-gray-500"}`}>
                                                    {stageData.description}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {Object.entries(stageData.levels).map(([levelId, levelData]) => {
                                                        const level = parseInt(levelId);
                                                        const levelUnlocked = isLevelUnlocked(stageId, level);
                                                        const levelCompleted = isLevelCompleted(stageId, level);
                                                        return (
                                                            <Link
                                                                key={levelId}
                                                                href={
                                                                    levelUnlocked
                                                                        ? `/level?stage=${stageId}&level=${levelId}`
                                                                        : "#"
                                                                }
                                                                className={levelUnlocked ? "" : "pointer-events-none"}>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className={`flex items-center ${
                                                                        levelUnlocked
                                                                            ? levelCompleted
                                                                                ? "border-green-700 bg-green-900/20 text-green-300 hover:bg-green-900/30"
                                                                                : "border-purple-700 text-purple-300 hover:bg-purple-900/50"
                                                                            : "border-gray-800 bg-gray-900/20 text-gray-500"
                                                                    }`}>
                                                                    {levelCompleted ? (
                                                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                                                    ) : !levelUnlocked ? (
                                                                        <LockIcon className="mr-1 h-3 w-3" />
                                                                    ) : null}
                                                                    Level {levelId}
                                                                </Button>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ClientOnly>
                </section>

                {/* Level Selection */}
                <section className="container mx-auto px-4 py-8 sm:py-16">
                    <h2 className="mb-8 text-center text-2xl font-bold text-white sm:mb-12 sm:text-3xl">
                        {t("home.chooseChallenge")}
                    </h2>
                    <ClientOnly>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                            {Object.entries(stages).map(([stageId, stageData]) =>
                                Object.entries(stageData.levels).map(([levelId, levelData]) => {
                                    const level = parseInt(levelId);
                                    const levelUnlocked = isLevelUnlocked(stageId, level);
                                    const levelCompleted = isLevelCompleted(stageId, level);
                                    return (
                                        <Card
                                            key={`${stageId}-${levelId}`}
                                            className={`group relative overflow-hidden transition-all ${
                                                levelUnlocked
                                                    ? levelCompleted
                                                        ? "border-green-800/30 bg-green-900/10 hover:border-green-600"
                                                        : "border-purple-900/20 bg-purple-900/10 hover:border-purple-600"
                                                    : "border-gray-800/20 bg-gray-900/10"
                                            }`}>
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
                                                    className={`text-base font-bold sm:text-lg ${levelUnlocked ? "text-white" : "text-gray-500"}`}>
                                                    {levelData.name}
                                                </h3>
                                                <p
                                                    className={`mt-2 text-xs sm:text-sm ${levelUnlocked ? "text-purple-300" : "text-gray-500"}`}>
                                                    {levelData.description}
                                                </p>
                                                {levelUnlocked ? (
                                                    <Link href={`/level?stage=${stageId}&level=${levelId}`}>
                                                        <Button
                                                            className={`mt-4 w-full ${
                                                                levelCompleted
                                                                    ? "bg-green-600 text-white hover:bg-green-700"
                                                                    : "bg-purple-600 text-white hover:bg-purple-700"
                                                            } sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100`}
                                                            size="sm">
                                                            {levelCompleted
                                                                ? t("home.reviewLevel")
                                                                : t("home.startLevel")}
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <Button
                                                        className="mt-4 w-full cursor-not-allowed bg-gray-700 text-gray-300 opacity-50"
                                                        size="sm"
                                                        disabled>
                                                        {t("home.locked")}
                                                    </Button>
                                                )}
                                            </CardContent>
                                            {!levelUnlocked && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                    <LockIcon className="h-6 w-6 text-gray-400 sm:h-8 sm:w-8" />
                                                </div>
                                            )}
                                            {levelCompleted && (
                                                <div className="absolute right-2 top-2 rounded-full bg-green-700 p-1">
                                                    <CheckCircle2 className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                                                </div>
                                            )}
                                        </Card>
                                    );
                                }),
                            )}
                        </div>
                    </ClientOnly>
                </section>
            </div>
        </PageLayout>
    );
}
