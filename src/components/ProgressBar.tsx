import { BadgeCheck, Trophy } from "lucide-react";

interface ProgressBarProps {
    score: number;
    maxScore?: number;
    className?: string;
}

export function ProgressBar({ score, maxScore = 150, className = "" }: ProgressBarProps) {
    const percentage = Math.min(100, Math.round((score / maxScore) * 100));

    // Define milestone points
    const milestones = [
        { at: 25, label: "Anfänger", icon: <BadgeCheck className="h-4 w-4" /> },
        { at: 50, label: "Fortgeschritten", icon: <BadgeCheck className="h-4 w-4" /> },
        { at: 75, label: "Experte", icon: <BadgeCheck className="h-4 w-4" /> },
        { at: 100, label: "Git Master", icon: <Trophy className="h-4 w-4" /> },
    ];

    // Find current milestone
    const currentMilestone = milestones.filter(milestone => percentage >= milestone.at).pop();

    return (
        <div className={className}>
            <div className="mb-1 flex justify-between">
                <div className="flex items-center text-base font-medium">
                    <span>Fortschritt</span>
                    {currentMilestone && (
                        <div className="ml-2 flex items-center rounded-full border border-purple-700/50 bg-purple-900/30 px-2 py-0.5 text-xs text-purple-300">
                            {currentMilestone.icon}
                            <span className="ml-1">{currentMilestone.label}</span>
                        </div>
                    )}
                </div>
                <span className="text-sm font-medium">
                    {score}/{maxScore} Punkte ({percentage}%)
                </span>
            </div>

            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
                {/* Progress bar */}
                <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-300 ease-in-out"
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

            {/* Milestone labels - Korrigiert für richtige Ausrichtung */}
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
    );
}
