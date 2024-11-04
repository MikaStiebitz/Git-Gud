export function ProgressBar({ score, className }) {
    const maxScore = 100; // Adjust as needed
    const percentage = (score / maxScore) * 100;

    return (
        <div className={className}>
            <div className="mb-1 flex justify-between">
                <span className="text-primary text-base font-medium">Fortschritt</span>
                <span className="text-primary text-sm font-medium">
                    {score}/{maxScore}
                </span>
            </div>
            <div className="bg-muted h-2.5 w-full rounded-full">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
}
