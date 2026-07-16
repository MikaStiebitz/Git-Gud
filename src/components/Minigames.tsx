"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import { VisuallyHidden } from "~/components/ui/visually-hidden";
import { Gamepad2 } from "lucide-react";
import { useLanguage } from "~/contexts/LanguageContext";
import { useGameContext } from "~/contexts/GameContext";
import { MinigameGrid } from "~/components/minigames/MinigameGrid";
import { MINIGAMES } from "~/components/minigames/registry";

interface MinigamesProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Minigames({ isOpen, onClose }: MinigamesProps) {
    const { t } = useLanguage();
    const { progressManager, currentDifficulty } = useGameContext();
    const [activeMinigame, setActiveMinigame] = useState<string | null>(null);

    const activeDef = MINIGAMES.find(game => game.id === activeMinigame) ?? null;

    const handleMinigameComplete = (gameId: string, score: number) => {
        progressManager.completeMinigame(gameId, score);
        setActiveMinigame(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="mx-2 w-[calc(100vw-1rem)] max-w-4xl border-purple-900/20 bg-[#1a1625] text-purple-100 sm:mx-6 sm:w-[calc(100vw-3rem)] md:mx-0 md:w-full"
                showClose={!activeMinigame} // Hide X button when a minigame is active
            >
                {activeDef ? (
                    <>
                        <DialogHeader>
                            <VisuallyHidden>
                                <DialogTitle>{t(activeDef.nameKey)}</DialogTitle>
                            </VisuallyHidden>
                        </DialogHeader>
                        <div>
                            <activeDef.Component
                                onComplete={score => handleMinigameComplete(activeDef.id, score)}
                                onClose={() => setActiveMinigame(null)}
                                difficulty={currentDifficulty}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center text-xl text-white sm:text-2xl">
                                <Gamepad2 className="mr-2 h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />
                                {t("minigame.title")}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-purple-300 sm:text-base">
                                {t("minigame.subtitle")}
                            </DialogDescription>
                        </DialogHeader>

                        <MinigameGrid
                            completedMinigames={progressManager.getCompletedMinigames()}
                            onPlay={setActiveMinigame}
                        />

                        <div className="mt-6 flex justify-center">
                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                                {t("minigame.close")}
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
