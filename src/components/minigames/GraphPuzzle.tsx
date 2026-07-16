"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { GitGraph as GitGraphIcon, Timer, Trophy, X, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useLanguage } from "~/contexts/LanguageContext";

interface GraphPuzzleProps {
    onComplete: (score: number) => void;
    onClose: () => void;
    difficulty?: "beginner" | "advanced" | "pro";
}

interface Puzzle {
    goal: string;
    // Target history rendered like `git log --oneline --graph` (newest first)
    diagram: string[];
    // The correct command order (top = first command to run)
    steps: string[];
    difficulty: "beginner" | "advanced" | "pro";
}

const PUZZLES: Puzzle[] = [
    {
        goal: "Create a feature branch, commit on it, then merge it back into main.",
        diagram: ["*   c3 (main) Merge feature", "|\\", "| * c2 (feature) Add feature", "|/", "* c1 Initial commit"],
        steps: [
            "git switch -c feature",
            "git add .",
            'git commit -m "Add feature"',
            "git switch main",
            "git merge feature",
        ],
        difficulty: "beginner",
    },
    {
        goal: "Stage a file, commit it, and tag that commit as v1.0.0.",
        diagram: ["* c2 (HEAD -> main, tag: v1.0.0) Add readme", "* c1 Initial commit"],
        steps: ["git add README.md", 'git commit -m "Add readme"', "git tag v1.0.0"],
        difficulty: "beginner",
    },
    {
        goal: "Create a branch from main, but leave main checked out afterwards.",
        diagram: ["* c1 (HEAD -> main, dev) Initial commit"],
        steps: ["git branch dev", "git switch main"],
        difficulty: "beginner",
    },
    {
        goal: "Rebase your feature branch onto main, then fast-forward main to it.",
        diagram: ["* c3 (HEAD -> main, feature) Feature work", "* c2 Update main", "* c1 Initial commit"],
        steps: ["git switch feature", "git rebase main", "git switch main", "git merge feature"],
        difficulty: "advanced",
    },
    {
        goal: "Stash your work, switch to main to hotfix, commit, then restore your work.",
        diagram: ["* c2 (main) Hotfix", "* c1 Initial commit", "", "stash@{0}: WIP on feature"],
        steps: ["git stash", "git switch main", "git add .", 'git commit -m "Hotfix"', "git stash pop"],
        difficulty: "advanced",
    },
    {
        goal: "Cherry-pick commit abc123 onto main and tag the result as v2.0.0.",
        diagram: ["* d9 (HEAD -> main, tag: v2.0.0) Cherry-picked change", "* c1 Initial commit"],
        steps: ["git switch main", "git cherry-pick abc123", "git tag v2.0.0"],
        difficulty: "pro",
    },
    {
        goal: "Undo the last commit but keep the changes staged, then re-commit with a new message.",
        diagram: ["* e1 (HEAD -> main) Reworded commit", "* c1 Initial commit"],
        steps: ["git reset --soft HEAD~1", 'git commit -m "Reworded commit"'],
        difficulty: "pro",
    },
    {
        goal: "Interactively rebase the last 3 commits, then force-update the remote.",
        diagram: ["* f3 (HEAD -> main) Squashed work", "* c1 Initial commit"],
        steps: ["git rebase -i HEAD~3", "git push --force-with-lease"],
        difficulty: "pro",
    },
];

const ROUNDS = 5;
const TIME_LIMIT = 90;

// Fisher–Yates shuffle (non-mutating)
function shuffle<T>(input: T[]): T[] {
    const arr = [...input];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
}

export function GraphPuzzle({ onComplete, onClose, difficulty = "beginner" }: GraphPuzzleProps) {
    const { t } = useLanguage();

    const pool = PUZZLES.filter(p => p.difficulty === difficulty);
    const puzzles = (pool.length > 0 ? pool : PUZZLES).slice(0, ROUNDS);

    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [gameOver, setGameOver] = useState(false);
    const [placed, setPlaced] = useState<string[]>([]);
    const [remaining, setRemaining] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

    const current = puzzles[round];

    const loadRound = useCallback((index: number) => {
        const puzzle = puzzles[index];
        if (!puzzle) return;
        setPlaced([]);
        setRemaining(shuffle(puzzle.steps));
        setFeedback(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [round]);

    // Initialise the first round on mount
    useEffect(() => {
        setRemaining(shuffle(puzzles[0]?.steps ?? []));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Countdown timer
    useEffect(() => {
        if (gameOver || feedback === "correct") return;
        if (timeLeft <= 0) {
            setGameOver(true);
            return;
        }
        const id = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearTimeout(id);
    }, [timeLeft, gameOver, feedback]);

    const pickChip = (chip: string, index: number) => {
        if (feedback) return;
        setPlaced(prev => [...prev, chip]);
        setRemaining(prev => prev.filter((_, i) => i !== index));
    };

    const removeChip = (index: number) => {
        if (feedback) return;
        const chip = placed[index];
        if (chip === undefined) return;
        setPlaced(prev => prev.filter((_, i) => i !== index));
        setRemaining(prev => [...prev, chip]);
    };

    const resetRound = () => {
        if (!current) return;
        setPlaced([]);
        setRemaining(shuffle(current.steps));
        setFeedback(null);
    };

    const checkOrder = () => {
        if (!current) return;
        const correct = placed.length === current.steps.length && placed.every((cmd, i) => cmd === current.steps[i]);

        if (correct) {
            setFeedback("correct");
            // More time left = more points; base 20 per puzzle
            const bonus = Math.round((timeLeft / TIME_LIMIT) * 10);
            const gained = 20 + bonus;
            const newScore = score + gained;
            setScore(newScore);

            setTimeout(() => {
                if (round + 1 >= puzzles.length) {
                    setGameOver(true);
                } else {
                    const next = round + 1;
                    setRound(next);
                    loadRound(next);
                }
            }, 1400);
        } else {
            setFeedback("wrong");
            setTimeout(() => setFeedback(null), 1200);
        }
    };

    if (gameOver) {
        return (
            <Card className="border-purple-700 bg-purple-900/20">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center text-white">
                        <Trophy className="mr-2 h-6 w-6 text-yellow-400" />
                        {t("minigame.graphPuzzle.name")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <div>
                        <p className="text-sm text-purple-300">{t("minigame.finalScore")}</p>
                        <p className="text-4xl font-bold text-white">{score}</p>
                    </div>
                    <div className="flex justify-center gap-3">
                        <Button
                            onClick={() => onComplete(score)}
                            className="bg-purple-600 text-white hover:bg-purple-700">
                            <Trophy className="mr-2 h-4 w-4" />
                            {t("minigame.claimReward")}
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                            <X className="mr-2 h-4 w-4" />
                            {t("minigame.close")}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!current) return null;

    return (
        <Card className="border-purple-700 bg-purple-900/20">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-white">
                        <GitGraphIcon className="mr-2 h-5 w-5 text-purple-400" />
                        {t("minigame.graphPuzzle.name")}
                    </CardTitle>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center text-purple-300">
                            <Timer className="mr-1 h-4 w-4" />
                            {timeLeft}s
                        </span>
                        <span className="text-purple-300">
                            {round + 1}/{puzzles.length}
                        </span>
                        <span className="font-semibold text-yellow-400">{score}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-5">
                <div>
                    <p className="mb-1 text-sm text-purple-300">{t("minigame.graphPuzzle.goal")}</p>
                    <p className="text-base text-white">{current.goal}</p>
                </div>

                {/* Target graph */}
                <div className="overflow-x-auto rounded-md border border-purple-800/40 bg-[#140f1f] p-3">
                    <pre className="font-mono text-xs leading-relaxed text-purple-200">{current.diagram.join("\n")}</pre>
                </div>

                {/* Ordered sequence */}
                <div>
                    <p className="mb-2 text-sm text-purple-300">{t("minigame.graphPuzzle.yourOrder")}</p>
                    <div className="min-h-[3rem] space-y-2 rounded-md border border-dashed border-purple-700/50 p-2">
                        {placed.length === 0 && (
                            <p className="py-2 text-center text-xs text-purple-500">
                                {t("minigame.graphPuzzle.tapHint")}
                            </p>
                        )}
                        {placed.map((chip, i) => (
                            <button
                                key={`${chip}-${i}`}
                                onClick={() => removeChip(i)}
                                disabled={feedback === "correct"}
                                className="flex w-full items-center justify-between rounded border border-purple-600/60 bg-purple-800/40 px-3 py-2 text-left font-mono text-xs text-purple-100 transition-colors hover:border-red-500/60 hover:bg-red-900/20">
                                <span>
                                    <span className="mr-2 text-purple-400">{i + 1}.</span>
                                    {chip}
                                </span>
                                <X className="h-3.5 w-3.5 text-purple-400" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Command pool */}
                {remaining.length > 0 && (
                    <div>
                        <p className="mb-2 text-sm text-purple-300">{t("minigame.graphPuzzle.commands")}</p>
                        <div className="flex flex-wrap gap-2">
                            {remaining.map((chip, i) => (
                                <button
                                    key={`${chip}-${i}`}
                                    onClick={() => pickChip(chip, i)}
                                    disabled={feedback === "correct"}
                                    className="rounded border border-purple-700/60 bg-purple-900/40 px-3 py-2 font-mono text-xs text-purple-100 transition-colors hover:border-purple-500 hover:bg-purple-800/50">
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {feedback && (
                    <div
                        className={`flex items-center justify-center rounded-md p-2 text-sm ${
                            feedback === "correct"
                                ? "border border-green-700 bg-green-900/40 text-green-300"
                                : "border border-red-700 bg-red-900/40 text-red-300"
                        }`}>
                        {feedback === "correct" ? (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {t("minigame.graphPuzzle.correct")}
                            </>
                        ) : (
                            <>
                                <XCircle className="mr-2 h-4 w-4" />
                                {t("minigame.graphPuzzle.wrong")}
                            </>
                        )}
                    </div>
                )}

                <div className="flex gap-3">
                    <Button
                        onClick={checkOrder}
                        disabled={remaining.length > 0 || feedback === "correct"}
                        className="flex-1 bg-purple-600 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-600">
                        {t("minigame.graphPuzzle.check")}
                    </Button>
                    <Button
                        onClick={resetRound}
                        variant="outline"
                        disabled={feedback === "correct" || placed.length === 0}
                        className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
