"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Play, Trophy } from "lucide-react";
import { useLanguage } from "~/contexts/LanguageContext";
import { MINIGAMES, difficultyColorClasses } from "~/components/minigames/registry";

interface MinigameGridProps {
    completedMinigames: string[];
    onPlay: (gameId: string) => void;
    className?: string;
}

export function MinigameGrid({ completedMinigames, onPlay, className = "" }: MinigameGridProps) {
    const { t } = useLanguage();

    return (
        <div
            className={`grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
            {MINIGAMES.map(game => {
                const isCompleted = completedMinigames.includes(game.id);
                const colorClasses = difficultyColorClasses(game.difficulty);
                const [textColor, borderColor] = colorClasses.split(" ");

                return (
                    <Card
                        key={game.id}
                        className={`border transition-all duration-300 hover:scale-105 ${colorClasses} ${
                            isCompleted ? "opacity-60" : ""
                        } flex flex-col`}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className={textColor}>{game.icon}</div>
                                    <CardTitle className={`text-lg ${textColor}`}>{t(game.nameKey)}</CardTitle>
                                </div>
                                <span className={`rounded-full px-2 py-1 text-xs capitalize ${textColor} ${borderColor}`}>
                                    {t(`difficulty.${game.difficulty}`)}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col">
                            <div className="flex-1 space-y-4">
                                <p className="text-sm text-purple-200">{t(game.descriptionKey)}</p>
                            </div>

                            <div className="mb-2 mt-4 text-center">
                                <div className="text-sm text-purple-400">
                                    <strong>{t(game.categoryKey)}</strong> • +{game.coins} {t("shop.coins")}
                                </div>
                            </div>

                            <Button
                                onClick={() => onPlay(game.id)}
                                className="w-full bg-purple-600 text-white hover:bg-purple-700">
                                {isCompleted ? (
                                    <>
                                        <Trophy className="mr-2 h-4 w-4" />
                                        {t("minigame.playAgain")}
                                    </>
                                ) : (
                                    <>
                                        <Play className="mr-2 h-4 w-4" />
                                        {t("minigame.play")}
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
