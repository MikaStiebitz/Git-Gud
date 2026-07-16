"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import { CheckCircle2, Settings } from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";
import { useLanguage } from "~/contexts/LanguageContext";
import { difficulties } from "~/config/difficulties";
import { allStages } from "~/levels";
import type { DifficultyLevel } from "~/types";

interface DifficultySelectorProps {
    isOpen: boolean;
    onClose: () => void;
    isInitialSelection?: boolean;
}

export function DifficultySelector({ isOpen, onClose, isInitialSelection = false }: DifficultySelectorProps) {
    const { currentDifficulty, setCurrentDifficulty } = useGameContext();
    const { t } = useLanguage();
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>(currentDifficulty);

    // Updates selectedDifficulty whenever currentDifficulty changes
    useEffect(() => {
        setSelectedDifficulty(currentDifficulty);
    }, [currentDifficulty]);

    const handleConfirm = () => {
        setCurrentDifficulty(selectedDifficulty);
        onClose();
    };

    const getDifficultyColorClasses = (difficulty: DifficultyLevel, isSelected: boolean) => {
        const baseClasses = "transition-all duration-300 cursor-pointer";

        if (isSelected) {
            switch (difficulty) {
                case "beginner":
                    return `${baseClasses} border-green-500/50 bg-green-900/20 ring-2 ring-green-500/30`;
                case "advanced":
                    return `${baseClasses} border-blue-500/50 bg-blue-900/20 ring-2 ring-blue-500/30`;
                case "pro":
                    return `${baseClasses} border-purple-500/50 bg-purple-900/20 ring-2 ring-purple-500/30`;
            }
        }

        switch (difficulty) {
            case "beginner":
                return `${baseClasses} border-green-800/30 bg-green-900/10 hover:border-green-600 hover:bg-green-900/20`;
            case "advanced":
                return `${baseClasses} border-blue-800/30 bg-blue-900/10 hover:border-blue-600 hover:bg-blue-900/20`;
            case "pro":
                return `${baseClasses} border-purple-800/30 bg-purple-900/10 hover:border-purple-600 hover:bg-purple-900/20`;
            default:
                return baseClasses;
        }
    };

    const getDifficultyTextColor = (difficulty: DifficultyLevel) => {
        switch (difficulty) {
            case "beginner":
                return "text-green-400";
            case "advanced":
                return "text-blue-400";
            case "pro":
                return "text-purple-400";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => !isInitialSelection && onClose()}>
            <DialogContent
                className="z-50 mx-2 max-h-[90vh] w-[calc(100vw-1rem)] max-w-4xl overflow-y-auto border-purple-900/20 bg-[#1a1625] text-purple-100 sm:mx-6 sm:w-[calc(100vw-3rem)] md:mx-0 md:w-full"
                onPointerDownOutside={e => isInitialSelection && e.preventDefault()}
                onEscapeKeyDown={e => isInitialSelection && e.preventDefault()}
                showClose={!isInitialSelection}>
                {isInitialSelection && (
                    <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 transform px-2 sm:top-2">
                        <div className="whitespace-nowrap rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-semibold text-white sm:px-4">
                            {t("difficulty.firstTime")}
                        </div>
                    </div>
                )}

                <DialogHeader className="mt-8 text-center sm:mt-3">
                    <DialogTitle className="flex items-center justify-center text-xl text-white sm:text-2xl">
                        <Settings className="mr-2 h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />
                        {isInitialSelection ? t("difficulty.welcomeTitle") : t("difficulty.changeTitle")}
                    </DialogTitle>
                    <DialogDescription className="px-2 text-sm text-purple-300 sm:px-0 sm:text-base">
                        {isInitialSelection ? t("difficulty.welcomeDescription") : t("difficulty.changeDescription")}
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-3">
                    {difficulties.map(diff => (
                        <Card
                            key={diff.id}
                            className={`flex flex-col ${getDifficultyColorClasses(diff.id, selectedDifficulty === diff.id)}`}
                            onClick={() => setSelectedDifficulty(diff.id)}>
                            <CardHeader className="p-3 text-center sm:p-6">
                                <div className="mx-auto mb-2 text-3xl sm:text-4xl">{diff.icon}</div>
                                <CardTitle className={`text-lg sm:text-xl ${getDifficultyTextColor(diff.id)}`}>
                                    {t(`difficulty.${diff.id}`)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col space-y-2 p-3 sm:space-y-3 sm:p-6">
                                <p className="text-center text-xs text-purple-200 sm:text-sm">
                                    {t(`difficulty.${diff.id}.description`)}
                                </p>

                                <div className="flex flex-1 flex-col space-y-2">
                                    <div className="text-xs text-purple-400">
                                        <strong>{t("difficulty.topicsCovered")}:</strong>
                                    </div>
                                    <div className="flex min-h-[60px] flex-wrap content-start gap-1">
                                        {diff.stages.map(stage => (
                                            <span
                                                key={stage}
                                                className={`rounded-full px-2 py-1 text-xs ${getDifficultyTextColor(diff.id)} bg-opacity-20`}
                                                style={{ backgroundColor: `var(--${diff.color}-900)` }}>
                                                {t(allStages[stage as keyof typeof allStages]?.name ?? stage)}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2 text-center">
                                    <div className="text-xs text-purple-400">
                                        {t("difficulty.maxPoints")}: {diff.maxPoints}
                                    </div>
                                </div>

                                <div className="flex justify-center pt-2">
                                    {selectedDifficulty === diff.id ? (
                                        <CheckCircle2 className={`h-6 w-6 ${getDifficultyTextColor(diff.id)}`} />
                                    ) : (
                                        <div className="h-6 w-6" />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-4 flex flex-col justify-center space-y-2 sm:mt-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                    {!isInitialSelection && (
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="w-full border-purple-700 text-purple-300 hover:bg-purple-900/50 sm:w-auto">
                            {t("difficulty.cancel")}
                        </Button>
                    )}
                    <Button
                        onClick={handleConfirm}
                        className={`w-full sm:w-auto ${
                            selectedDifficulty === "beginner"
                                ? "bg-green-600 hover:bg-green-700"
                                : selectedDifficulty === "advanced"
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-purple-600 hover:bg-purple-700"
                        } text-white`}>
                        {isInitialSelection ? t("difficulty.startLearning") : t("difficulty.applyChanges")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
