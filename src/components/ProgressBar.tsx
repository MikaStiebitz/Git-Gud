import { BadgeCheck, Trophy, Coins, Flame } from "lucide-react";
import { ClientOnly } from "./ClientOnly";
import { useLanguage } from "~/contexts/LanguageContext";

interface ProgressBarProps {
    score: number;
    coins: number;
    maxScore: number;
    isDoubleXpActive?: boolean;
    doubleXpHoursLeft?: number;
    className?: string;
}

export function ProgressBar({
    score,
    coins,
    maxScore,
    isDoubleXpActive = false,
    doubleXpHoursLeft = 0,
    className = "",
}: ProgressBarProps) {
    const { t } = useLanguage();
    const percentage = Math.min(100, Math.round((score / maxScore) * 100));

    // Define milestone points
    const milestones = [
        { at: 25, label: t("progress.beginner"), icon: <BadgeCheck className="h-4 w-4" /> },
        { at: 50, label: t("progress.intermediate"), icon: <BadgeCheck className="h-4 w-4" /> },
        { at: 75, label: t("progress.expert"), icon: <BadgeCheck className="h-4 w-4" /> },
        { at: 100, label: t("progress.gitMaster"), icon: <Trophy className="h-4 w-4" /> },
    ];

    // Find current milestone
    const currentMilestone = milestones.filter(milestone => percentage >= milestone.at).pop();

    return (
        <ClientOnly fallback={<div className={className}>Loading progress...</div>}>
            <div className={className}>
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center text-base font-medium">
                        <span>{t("progress.title")}</span>
                        {currentMilestone && (
                            <div className="ml-2 flex items-center rounded-full border border-purple-700/50 bg-purple-900/30 px-2 py-0.5 text-xs text-purple-300">
                                {currentMilestone.icon}
                                <span className="ml-1">{currentMilestone.label}</span>
                            </div>
                        )}
                        {/* Double XP Indicator */}
                        {isDoubleXpActive && (
                            <div className="animate-pulse ml-2 flex items-center rounded-full border border-orange-500/50 bg-gradient-to-r from-orange-600/30 to-red-600/30 px-2 py-0.5 text-xs text-orange-300">
                                <Flame className="mr-1 h-3 w-3" />
                                <span>2x XP</span>
                                {doubleXpHoursLeft > 0 && (
                                    <span className="ml-1 text-orange-400">({doubleXpHoursLeft}h)</span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                        {/* Score Display */}
                        <span className="text-purple-300">
                            {score}/{maxScore} {t("progress.points")} ({percentage}%)
                        </span>
                        {/* Coins Display */}
                        <div className="flex items-center gap-1 rounded-full border border-yellow-600/50 bg-yellow-900/20 px-2 py-0.5 text-yellow-400">
                            <Coins className="h-3.5 w-3.5" />
                            <span>{coins}</span>
                        </div>
                    </div>
                </div>

                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
                    {/* Progress bar with optional glow effect for Double XP */}
                    <div
                        className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${
                            isDoubleXpActive
                                ? "bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-lg shadow-orange-500/50"
                                : "bg-gradient-to-r from-purple-500 to-purple-700"
                        }`}
                        style={{ width: `${percentage}%` }}
                    />

                    {/* Milestone markers */}
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 h-full w-0.5 ${
                                percentage >= milestone.at ? "bg-white" : "bg-gray-600"
                            }`}
                            style={{ left: `${milestone.at}%` }}
                            title={milestone.label}
                        />
                    ))}
                </div>

                {/* Milestone labels - Adjusted for correct alignment */}
                <div className="relative mt-1 h-4 w-full text-xs">
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className={`absolute ${percentage >= milestone.at ? "text-purple-400" : "text-gray-500"}`}
                            style={{
                                left: `calc(${milestone.at}% - 8px)`,
                                transform: "translateX(-50%)",
                            }}>
                            {milestone.at}%
                        </div>
                    ))}
                </div>
            </div>
        </ClientOnly>
    );
}
