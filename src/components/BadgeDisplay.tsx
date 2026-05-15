"use client";

import { Trophy, Star, Award, Crown, Zap, ShieldAlert, Flame } from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";
import { ClientOnly } from "./ClientOnly";

interface BadgeDisplayProps {
    className?: string;
}

export function BadgeDisplay({ className = "" }: BadgeDisplayProps) {
    const { progressManager } = useGameContext();

    const purchasedItems = progressManager.getPurchasedItems();
    const progress = progressManager.getProgress();

    // Check if user has the Git Legend badge
    const hasGitLegendBadge = purchasedItems.includes("git-legend");

    // Check for other achievements
    const totalScore = progress.score;
    const completedLevels = Object.values(progress.completedLevels).reduce((acc, levels) => acc + levels.length, 0);
    const completedMinigames = progress.completedMinigames.length;

    if (!hasGitLegendBadge && totalScore < 500) {
        return null; // Don't show badge display if no achievements yet
    }

    return (
        <ClientOnly>
            <div className={`flex items-center space-x-2 ${className}`}>
                {/* Git Legend Badge */}
                {hasGitLegendBadge && (
                    <div className="group relative">
                        <div className="animate-pulse flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 shadow-lg">
                            <Crown className="h-5 w-5 text-white" />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Git Legend
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/80"></div>
                        </div>

                        {/* Sparkle effect */}
                        <div className="animate-ping absolute -right-1 -top-1 h-3 w-3 rounded-full bg-yellow-300 opacity-75"></div>
                    </div>
                )}

                {/* High Score Achievement (500+ points) */}
                {totalScore >= 500 && (
                    <div className="group relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                            <Star className="h-5 w-5 text-white" />
                        </div>

                        <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            High Achiever ({totalScore} pts)
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/80"></div>
                        </div>
                    </div>
                )}

                {/* Level Master Achievement (10+ levels) */}
                {completedLevels >= 10 && (
                    <div className="group relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                            <Trophy className="h-5 w-5 text-white" />
                        </div>

                        <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Level Master ({completedLevels} levels)
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/80"></div>
                        </div>
                    </div>
                )}

                {/* Minigame Champion (3+ minigames) */}
                {completedMinigames >= 3 && (
                    <div className="group relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                            <Award className="h-5 w-5 text-white" />
                        </div>

                        <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Minigame Champion
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/80"></div>
                        </div>
                    </div>
                )}

                {/* Double XP Badge (if active) */}
                {progressManager.isDoubleXpActive() && (
                    <div className="group relative">
                        <div className="animate-bounce flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
                            <Zap className="h-5 w-5 text-white" />
                        </div>

                        <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            2X XP Active ({progressManager.getDoubleXpRemainingHours()}h left)
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/80"></div>
                        </div>
                    </div>
                )}

                {/* First Responder Badge */}
                {(progress.completedLevels["Scenarios"]?.length ?? 0) >= 1 && (
                    <div className="group relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                            <ShieldAlert className="h-5 w-5 text-white" />
                        </div>

                        <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            First Responder
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/80"></div>
                        </div>
                    </div>
                )}

                {/* Disaster Master Badge */}
                {(progress.completedLevels["Scenarios"]?.length ?? 0) >= 5 && (
                    <div className="group relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-red-800 shadow-lg border border-orange-400/30">
                            <Flame className="h-5 w-5 text-white" />
                        </div>

                        <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Disaster Master
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/80"></div>
                        </div>
                    </div>
                )}
            </div>
        </ClientOnly>
    );
}
