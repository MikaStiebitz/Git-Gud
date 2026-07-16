"use client";

import { useState } from "react";
import { PageLayout } from "~/components/layout/PageLayout";
import { ClientOnly } from "~/components/ClientOnly";
import { useLanguage } from "~/contexts/LanguageContext";
import { useGameContext } from "~/contexts/GameContext";
import { MinigameGrid } from "~/components/minigames/MinigameGrid";
import { MINIGAMES } from "~/components/minigames/registry";
import { Button } from "~/components/ui/button";
import { Gamepad2, Coins, ArrowLeft } from "lucide-react";

export default function ArcadePage() {
    const { t } = useLanguage();
    const { progressManager, currentDifficulty } = useGameContext();
    const [activeMinigame, setActiveMinigame] = useState<string | null>(null);

    const activeDef = MINIGAMES.find(game => game.id === activeMinigame) ?? null;

    const handleComplete = (gameId: string, score: number) => {
        progressManager.completeMinigame(gameId, score);
        setActiveMinigame(null);
    };

    return (
        <PageLayout>
            <section className="container mx-auto px-4 py-8 sm:py-12">
                {activeDef ? (
                    <div className="mx-auto max-w-3xl">
                        <Button
                            variant="ghost"
                            onClick={() => setActiveMinigame(null)}
                            className="mb-4 text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t("arcade.backToArcade")}
                        </Button>
                        <activeDef.Component
                            onComplete={score => handleComplete(activeDef.id, score)}
                            onClose={() => setActiveMinigame(null)}
                            difficulty={currentDifficulty}
                        />
                    </div>
                ) : (
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h1 className="flex items-center text-2xl font-bold text-white sm:text-3xl">
                                    <Gamepad2 className="mr-3 h-7 w-7 text-purple-400" />
                                    {t("arcade.title")}
                                </h1>
                                <p className="mt-2 max-w-2xl text-sm text-purple-300 sm:text-base">
                                    {t("arcade.subtitle")}
                                </p>
                            </div>
                            <ClientOnly>
                                <div className="flex items-center gap-2 rounded-full border border-yellow-600/50 bg-yellow-900/20 px-4 py-2 text-yellow-400">
                                    <Coins className="h-5 w-5" />
                                    <span className="font-semibold">{progressManager.getCoins()}</span>
                                    <span className="text-sm text-yellow-500/80">{t("shop.coins")}</span>
                                </div>
                            </ClientOnly>
                        </div>

                        <ClientOnly
                            fallback={<div className="py-12 text-center text-purple-400">{t("arcade.title")}…</div>}>
                            <MinigameGrid
                                completedMinigames={progressManager.getCompletedMinigames()}
                                onPlay={setActiveMinigame}
                            />
                        </ClientOnly>
                    </div>
                )}
            </section>
        </PageLayout>
    );
}
