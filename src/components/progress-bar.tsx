import React from "react";

interface ProgressBarProps {
  score: number;
}

export function ProgressBar({ score }: ProgressBarProps): React.ReactElement {
  const maxScore = 100; // Adjust as needed
  const percentage = (score / maxScore) * 100;

  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="text-primary text-base font-medium">Progress</span>
        <span className="text-primary text-sm font-medium">
          {score}/{maxScore}
        </span>
      </div>
      <div className="bg-muted h-2.5 w-full rounded-full">
        <div
          className="bg-primary h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
