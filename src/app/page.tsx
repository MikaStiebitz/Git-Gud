"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
    GitBranch,
    GitCommit,
    GitMerge,
    Rocket,
    CheckCircle2,
    LockIcon,
    Code,
    BookOpen,
    ChevronRight,
    Activity,
    Award,
    Star,
    BookMarked,
    ArrowRight,
    Github,
    Settings,
    ShoppingCart,
    Gamepad2,
    Terminal as TerminalIcon,
} from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";
import { PageLayout } from "~/components/layout/PageLayout";
import { ClientOnly } from "~/components/ClientOnly";
import { useLanguage } from "~/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { DifficultySelector } from "~/components/DifficultySelector";
import { Shop } from "~/components/Shop";
import { Minigames } from "~/components/Minigames";
import { getAvailableStagesForDifficulty } from "~/config/difficulties";
import type { DifficultyLevel } from "~/types";

/**
 * Animated hero commit-graph: draws itself on load and gently pulses.
 * Pure SVG, animated with GSAP through the parent timeline (classes hg-*).
 */
const HeroGraph = () => (
    <svg viewBox="0 0 340 380" className="h-full w-full" fill="none" aria-hidden="true">
        {/* main lane */}
        <path className="hg-path" d="M170 340 L170 60" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
        {/* feature branch out + merge back */}
        <path
            className="hg-path"
            d="M170 290 C170 250 250 260 250 220 L250 170 C250 130 170 140 170 100"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        {/* second branch */}
        <path
            className="hg-path"
            d="M170 240 C170 210 96 216 96 180 L96 150"
            stroke="#f472b6"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        {/* nodes bottom-up */}
        {[
            { cx: 170, cy: 340, c: "#a78bfa" },
            { cx: 170, cy: 290, c: "#a78bfa" },
            { cx: 250, cy: 220, c: "#38bdf8" },
            { cx: 170, cy: 240, c: "#a78bfa" },
            { cx: 96, cy: 180, c: "#f472b6" },
            { cx: 250, cy: 170, c: "#38bdf8" },
            { cx: 96, cy: 150, c: "#f472b6" },
            { cx: 170, cy: 100, c: "#a78bfa" },
            { cx: 170, cy: 60, c: "#c4b5fd" },
        ].map((n, i) => (
            <g key={i} className="hg-node">
                <circle cx={n.cx} cy={n.cy} r="10" fill="#171126" stroke={n.c} strokeWidth="2.5" />
                <circle cx={n.cx} cy={n.cy} r="3.5" fill={n.c} />
            </g>
        ))}
        {/* HEAD badge */}
        <g className="hg-badge">
            <rect x="196" y="46" width="72" height="26" rx="13" fill="#a78bfa" />
            <text
                x="232"
                y="63"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#171126"
                fontFamily="monospace">
                main ★
            </text>
            <path d="M186 60 L198 53 L198 67 Z" fill="#a78bfa" />
        </g>
        <g className="hg-badge">
            <rect x="24" y="137" width="62" height="24" rx="12" fill="#241a3a" stroke="#f472b6" />
            <text x="55" y="153" textAnchor="middle" fontSize="11" fill="#f472b6" fontFamily="monospace">
                fix/ui
            </text>
        </g>
        <g className="hg-badge">
            <rect x="264" y="158" width="66" height="24" rx="12" fill="#241a3a" stroke="#38bdf8" />
            <text x="297" y="174" textAnchor="middle" fontSize="11" fill="#38bdf8" fontFamily="monospace">
                feature
            </text>
        </g>
    </svg>
);

export default function Home() {
    const { levelManager, progressManager, currentDifficulty, setCurrentDifficulty } = useGameContext();
    const { t } = useLanguage();
    const router = useRouter();
    const [progress, setProgress] = useState(progressManager.getProgress());
    const [showDifficultySelector, setShowDifficultySelector] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [showMinigames, setShowMinigames] = useState(false);
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);

    // Handle mounting to avoid hydration issues
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ── GSAP: hero entrance ────────────────────────────────────────────────
    // Set up exactly once. The hero markup is server-rendered and never depends on
    // `isMounted`, so it deliberately does NOT share the mount-gated effect below:
    // reverting and rebuilding the context while the entrance timeline was mid-flight
    // used to strand the secondary CTA row (Difficulty / Shop / Mini Games) at
    // opacity 0, making those buttons invisible on the live site.
    useEffect(() => {
        if (!rootRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const heroTargets = ".hero-word > span, .hero-sub, .hero-cta > *, .hero-panel";

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Hero entrance
                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                    // Belt and braces: drop the inline styles the entrance wrote so no
                    // interruption can leave a hero control stuck at opacity 0.
                    onComplete: () => gsap.set(heroTargets, { clearProps: "all" }),
                });
                tl.from(".hero-word > span", { yPercent: 120, duration: 0.9, stagger: 0.08, ease: "power4.out" })
                    .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
                    .from(".hero-cta > *", { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.45")
                    .from(
                        ".hero-panel",
                        { y: 40, opacity: 0, scale: 0.96, duration: 0.9, ease: "power4.out" },
                        "-=0.7",
                    );

                // Hero commit graph draws itself
                gsap.utils.toArray<SVGPathElement>(".hg-path").forEach((path, i) => {
                    const len = path.getTotalLength();
                    tl.fromTo(
                        path,
                        { strokeDasharray: len, strokeDashoffset: len },
                        { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
                        0.5 + i * 0.25,
                    );
                });
                tl.from(
                    ".hg-node",
                    { scale: 0, transformOrigin: "center center", stagger: 0.09, duration: 0.5, ease: "back.out(2.5)" },
                    0.9,
                );
                tl.from(
                    ".hg-badge",
                    {
                        opacity: 0,
                        scale: 0.6,
                        transformOrigin: "center center",
                        stagger: 0.12,
                        duration: 0.45,
                        ease: "back.out(2)",
                    },
                    1.7,
                );

                // Floating glow orbs — slow drift + scroll parallax
                gsap.to(".orb-a", { y: -40, x: 30, duration: 8, yoyo: true, repeat: -1, ease: "sine.inOut" });
                gsap.to(".orb-b", { y: 50, x: -20, duration: 10, yoyo: true, repeat: -1, ease: "sine.inOut" });
                gsap.to(".orb-a", {
                    yPercent: -30,
                    scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
                });
            });

            // Pointer parallax on the hero glow (all motion preferences: very subtle)
            const hero = document.querySelector<HTMLElement>(".hero-section");
            if (hero) {
                const xTo = gsap.quickTo(".orb-a", "xPercent", { duration: 0.8, ease: "power3.out" });
                const yTo = gsap.quickTo(".orb-a", "yPercent", { duration: 0.8, ease: "power3.out" });
                const onMove = (e: PointerEvent) => {
                    const r = hero.getBoundingClientRect();
                    xTo(((e.clientX - r.left) / r.width - 0.5) * 8);
                    yTo(((e.clientY - r.top) / r.height - 0.5) * 8);
                };
                hero.addEventListener("pointermove", onMove);
                return () => hero.removeEventListener("pointermove", onMove);
            }
        }, rootRef);

        return () => ctx.revert();
    }, []);

    // ── GSAP: scroll reveals, stage cards, stat counters ────────────────────
    // Gated on `isMounted` because everything below lives inside <ClientOnly> and
    // only exists after hydration. The guard means this runs once, on the mounted
    // pass, instead of being torn down and rebuilt.
    useEffect(() => {
        if (!isMounted || !rootRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Generic scroll reveals
                gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => {
                    gsap.from(el, {
                        y: 44,
                        opacity: 0,
                        duration: 0.85,
                        ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 88%" },
                    });
                });

                // Stage cards stagger in alternating from the sides
                gsap.utils.toArray<HTMLElement>("[data-stage-card]").forEach((el, i) => {
                    gsap.from(el, {
                        x: i % 2 === 0 ? 60 : -60,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 85%" },
                    });
                });

                // Learning-path spine grows with scroll
                const line = document.querySelector(".path-line-fill");
                if (line) {
                    gsap.fromTo(
                        line,
                        { scaleY: 0, transformOrigin: "top center" },
                        {
                            scaleY: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: ".path-section",
                                start: "top 60%",
                                end: "bottom 80%",
                                scrub: 0.5,
                            },
                        },
                    );
                }

                // Stat counters roll up
                gsap.utils.toArray<HTMLElement>("[data-counter]").forEach(el => {
                    const target = parseInt(el.dataset.counter ?? "0", 10);
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: target,
                        duration: 1.4,
                        ease: "power2.out",
                        scrollTrigger: { trigger: el, start: "top 92%" },
                        onUpdate: () => {
                            el.textContent = String(Math.round(obj.val));
                        },
                    });
                });
            });
        }, rootRef);

        return () => ctx.revert();
    }, [isMounted]);

    // Update progress when it changes
    useEffect(() => {
        if (!isMounted) return;

        const updateProgress = () => {
            setProgress(progressManager.getProgress());
        };

        // Initial update
        updateProgress();

        // Update on storage events (in case another tab changes the progress)
        window.addEventListener("storage", updateProgress);

        return () => {
            window.removeEventListener("storage", updateProgress);
        };
    }, [progressManager, isMounted]);

    // Check for first visit and show difficulty selector
    useEffect(() => {
        if (!isMounted) return;

        const hasVisitedBefore = localStorage.getItem("gitgud-has-visited");
        const hasSelectedDifficulty = localStorage.getItem("gitgud-difficulty");

        // Show difficulty selector if it's the first visit OR no difficulty has been selected
        if (!hasVisitedBefore || !hasSelectedDifficulty) {
            setIsFirstVisit(true);
            setShowDifficultySelector(true);
            localStorage.setItem("gitgud-has-visited", "true");
        }
    }, [isMounted]);

    // Get all stages with translated content - filtered by difficulty
    const allStages = levelManager.getAllStages(t);
    const availableStageIds = getAvailableStagesForDifficulty(currentDifficulty);
    const stages = Object.fromEntries(
        Object.entries(allStages).filter(([stageId]) => availableStageIds.includes(stageId)),
    );

    // Navigation function to use correct URL structure for [level] dynamic route
    const navigateToLevel = (stageId: string, levelId: number) => {
        router.push(`/${stageId.toLowerCase()}?stage=${stageId}&level=${levelId}`);
    };

    // Get stage icon component with animation
    const getStageIcon = (stageId: string) => {
        switch (stageId) {
            case "Intro":
                return (
                    <Rocket className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Files":
                return (
                    <GitCommit className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Branches":
                return (
                    <GitBranch className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Merge":
                return (
                    <GitMerge className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Rebase":
                return (
                    <Activity className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            case "Remote":
                return (
                    <Github className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
            default:
                return (
                    <GitCommit className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                );
        }
    };

    // Check if a stage is unlocked
    const isStageUnlocked = (stageId: string) => {
        if (stageId === "Intro") return true;

        const stageOrder = Object.keys(stages);
        const stageIndex = stageOrder.indexOf(stageId);

        if (stageIndex <= 0) return true;

        const previousStage = stageOrder[stageIndex - 1];
        if (!previousStage) return true;

        // Stage is unlocked if at least one level of the previous stage is completed
        return (progress.completedLevels[previousStage]?.length ?? 0) > 0;
    };

    // Check if a level is unlocked
    const isLevelUnlocked = (stageId: string, levelId: number) => {
        if (!isStageUnlocked(stageId)) return false;

        if (levelId === 1) return true;

        // Level is unlocked if the previous level is completed
        return progressManager.isLevelCompleted(stageId, levelId - 1);
    };

    // Check if a level is completed
    const isLevelCompleted = (stageId: string, levelId: number) => {
        return progressManager.isLevelCompleted(stageId, levelId);
    };

    // Check if current difficulty is completed
    const isDifficultyCompleted = () => {
        const availableStageIds = getAvailableStagesForDifficulty(currentDifficulty);
        return availableStageIds.every(stageId => {
            const stageData = stages[stageId];
            if (!stageData) return false;
            const totalLevels = Object.keys(stageData.levels).length;
            const completedLevels = progress.completedLevels[stageId]?.length ?? 0;
            return completedLevels === totalLevels;
        });
    };

    // Get next difficulty level
    const getNextDifficulty = (): DifficultyLevel | null => {
        const difficultyOrder: DifficultyLevel[] = ["beginner", "advanced", "pro"];
        const currentIndex = difficultyOrder.indexOf(currentDifficulty);
        if (currentIndex >= 0 && currentIndex < difficultyOrder.length - 1) {
            return difficultyOrder[currentIndex + 1]!;
        }
        return null;
    };

    // Calculate progress percentage
    const calculateProgress = (stageId: string) => {
        const stageLevels = Object.keys(stages[stageId]?.levels ?? {}).length;
        const completedLevels = progress.completedLevels[stageId]?.length ?? 0;

        return stageLevels > 0 ? (completedLevels / stageLevels) * 100 : 0;
    };

    //Changes learning path heading based on difficulty (and language)
    function learningPathHeading(): string {
        const headingKey = `home.learningPath.${currentDifficulty}`;
        const translatedHeading = t(headingKey);
        return translatedHeading === headingKey ? t("home.learningPath.default") : translatedHeading;
    }

    const completedCount = Object.values(progress.completedLevels).flat().length;

    return (
        <PageLayout>
            <div ref={rootRef} className="min-h-screen overflow-x-clip bg-[#120d1e] text-purple-100">
                {/* ── Hero ─────────────────────────────────────────────────── */}
                <section className="hero-section relative overflow-hidden">
                    {/* Layered background: Higgsfield nebula + glow orbs + grid */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <img
                            src="/hero-nebula.webp"
                            alt=""
                            className="h-full w-full [mask-image:linear-gradient(to_bottom,black_45%,transparent_100%)] object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#120d1e]/30 via-[#120d1e]/55 to-[#120d1e]"></div>
                        <div className="orb-a absolute top-10 -left-24 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl"></div>
                        <div className="orb-b absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl"></div>
                        <div className="absolute inset-0 [background-image:linear-gradient(rgba(167,139,250,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.35)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)] [background-size:56px_56px] opacity-[0.15]"></div>
                    </div>

                    <div className="container mx-auto grid items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:py-28">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
                                {t("home.title")
                                    .split(" ")
                                    .map((word, i) => (
                                        <span
                                            key={i}
                                            className="hero-word inline-block overflow-hidden pb-1 align-bottom">
                                            <span className="inline-block">{word}&nbsp;</span>
                                        </span>
                                    ))}
                                <span className="hero-word inline-block overflow-hidden pb-1 align-bottom">
                                    <span className="inline-block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                                        {t("home.title2")}
                                    </span>
                                </span>
                            </h1>

                            <p className="hero-sub mx-auto mt-6 max-w-xl text-base leading-relaxed text-purple-200/90 sm:text-lg lg:mx-0">
                                {t("home.subtitle")}
                            </p>

                            <div className="hero-cta mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                                <Link href="/intro" className="group w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        className="group relative w-full overflow-hidden bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-900/40 transition-all duration-300 hover:shadow-purple-700/40 hover:brightness-110 sm:w-auto">
                                        <span className="relative z-10 flex items-center">
                                            <Code className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                            {t("home.startLearning")}
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </span>
                                    </Button>
                                </Link>

                                <Link href="/playground" className="group w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full border-purple-600/50 bg-purple-950/30 text-purple-200 backdrop-blur-sm transition-all duration-300 hover:border-purple-500 hover:bg-purple-900/50 hover:text-purple-100 sm:w-auto">
                                        <BookOpen className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                        {t("home.cheatSheet")}
                                    </Button>
                                </Link>
                            </div>

                            {/* Secondary actions. These are the only entry points to the shop
                                and the difficulty picker, so they get solid fills instead of
                                transparent outlines — on the nebula backdrop the ghost variant
                                was effectively invisible. */}
                            <div className="hero-cta mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDifficultySelector(true)}
                                    className="border-purple-400/60 bg-purple-600/30 text-purple-50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:bg-purple-600/50 hover:text-white">
                                    <Settings className="mr-2 h-4 w-4" />
                                    {t("home.difficulty")}
                                    <ClientOnly>
                                        <span className="ml-1.5 rounded-full bg-purple-950/60 px-2 py-0.5 text-xs font-medium text-purple-100">
                                            {t(`difficulty.${currentDifficulty}`)}
                                        </span>
                                    </ClientOnly>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowShop(true)}
                                    className="border-amber-400/60 bg-amber-500/25 text-amber-50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-amber-300 hover:bg-amber-500/40 hover:text-white">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    {t("home.shop")}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowMinigames(true)}
                                    className="border-emerald-400/60 bg-emerald-500/25 text-emerald-50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-500/40 hover:text-white">
                                    <Gamepad2 className="mr-2 h-4 w-4" />
                                    {t("home.miniGames")}
                                </Button>
                            </div>
                        </div>

                        {/* Hero panel: fake window with the animated commit graph */}
                        <div className="hero-panel relative mx-auto w-full max-w-md">
                            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-purple-500/25 via-fuchsia-500/10 to-transparent blur-xl"></div>
                            <div className="overflow-hidden rounded-2xl border border-purple-500/25 bg-[#171126]/90 shadow-2xl shadow-purple-950/60 backdrop-blur-md">
                                <div className="flex items-center gap-2 border-b border-purple-800/40 px-4 py-2.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80"></span>
                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80"></span>
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/80"></span>
                                    <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-purple-300/80">
                                        <TerminalIcon className="h-3 w-3" />
                                        {t("home.heroTerminalTitle")}
                                    </span>
                                </div>
                                <div className="h-[300px] p-3 sm:h-[360px]">
                                    <HeroGraph />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Difficulty Completion Celebration */}
                {isMounted && isDifficultyCompleted() && getNextDifficulty() && (
                    <section className="container mx-auto px-4 py-6" data-reveal>
                        <div className="mx-auto max-w-2xl rounded-2xl border border-green-700/50 bg-gradient-to-r from-green-900/30 to-emerald-900/20 p-6 text-center">
                            <div className="mb-4 flex justify-center">
                                <Award className="h-12 w-12 text-yellow-400" />
                            </div>
                            <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">🎉 Difficulty Mastered!</h2>
                            <p className="mb-6 text-green-200">
                                Congratulations! You&apos;ve completed all levels in {currentDifficulty} difficulty.
                                Ready for the next challenge?
                            </p>
                            <Button
                                onClick={() => {
                                    const nextDiff = getNextDifficulty();
                                    if (nextDiff) {
                                        setCurrentDifficulty(nextDiff);
                                    }
                                }}
                                size="lg"
                                className="group bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800">
                                <ChevronRight className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                Advance to {getNextDifficulty()} Difficulty
                            </Button>
                        </div>
                    </section>
                )}

                {/* ── Stats ─────────────────────────────────────────────────── */}
                <section className="container mx-auto px-4 py-6" data-reveal>
                    <ClientOnly>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            {[
                                { label: t("home.points"), value: progress.score },
                                { label: t("home.completed"), value: completedCount },
                                { label: t("level.level"), value: progress.currentLevel },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl border border-purple-800/30 bg-gradient-to-b from-purple-900/25 to-purple-900/10 p-3 text-center backdrop-blur-sm sm:p-5">
                                    <h3 className="text-xs text-purple-400 sm:text-sm">{stat.label}</h3>
                                    <p
                                        className="text-2xl font-bold text-white tabular-nums sm:text-3xl"
                                        data-counter={stat.value}>
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                            <div className="rounded-xl border border-purple-800/30 bg-gradient-to-b from-purple-900/25 to-purple-900/10 p-3 text-center backdrop-blur-sm sm:p-5">
                                <h3 className="text-xs text-purple-400 sm:text-sm">{t("level.branch")}</h3>
                                <p className="truncate text-2xl font-bold text-white sm:text-3xl">
                                    {progress.currentStage}
                                </p>
                            </div>
                        </div>
                    </ClientOnly>
                </section>

                {/* ── Learning Path ─────────────────────────────────────────── */}
                <section className="path-section container mx-auto px-4 py-8 sm:py-16">
                    <h2 className="mb-8 text-center text-2xl font-bold text-white sm:mb-12 sm:text-3xl" data-reveal>
                        <span className="relative">
                            {learningPathHeading()}
                            <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-300"></span>
                        </span>
                    </h2>

                    <ClientOnly>
                        <div className="relative">
                            {/* Central spine that fills as you scroll */}
                            <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 overflow-hidden rounded-full bg-purple-900/40 lg:block">
                                <div className="path-line-fill h-full w-full bg-gradient-to-b from-purple-400 via-fuchsia-500 to-purple-700"></div>
                            </div>

                            <div className="space-y-10 sm:space-y-16 lg:space-y-24">
                                {Object.entries(stages).map(([stageId, stageData], index) => {
                                    const isUnlocked = isStageUnlocked(stageId);
                                    const totalLevels = Object.keys(stageData.levels).length;
                                    const completedLevels = progress.completedLevels[stageId]?.length ?? 0;
                                    const progressPercent = calculateProgress(stageId);

                                    return (
                                        <div className="relative" key={stageId}>
                                            {/* Stage Node on the spine */}
                                            <div
                                                className={`group hidden h-12 w-12 transform items-center justify-center rounded-full lg:absolute lg:top-0 lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2 ${
                                                    isUnlocked
                                                        ? "bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-lg shadow-purple-900/50"
                                                        : "bg-gray-700"
                                                } ${stageId === progress.currentStage ? "ring-4 ring-purple-400/50" : ""}`}>
                                                {isUnlocked && (
                                                    <span className="absolute -inset-2 hidden animate-ping rounded-full bg-purple-400/20 lg:inline-block"></span>
                                                )}
                                                {getStageIcon(stageId)}
                                            </div>

                                            <div
                                                data-stage-card
                                                className={`group relative rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 ${
                                                    isUnlocked
                                                        ? "border-purple-700/30 bg-gradient-to-b from-purple-900/25 to-purple-950/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-950/50"
                                                        : "border-gray-800/20 bg-gray-900/10"
                                                } ${index % 2 === 0 ? "lg:mr-12 lg:ml-auto" : "lg:mr-auto lg:ml-12"} w-full lg:w-5/12`}>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        {/* Show stage icon inline on mobile */}
                                                        <div className="relative mr-3 lg:hidden">
                                                            <div
                                                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                                                    isUnlocked
                                                                        ? "bg-gradient-to-br from-purple-500 to-fuchsia-600"
                                                                        : "bg-gray-700"
                                                                }`}>
                                                                {getStageIcon(stageId)}
                                                            </div>
                                                            {isUnlocked && (
                                                                <span className="absolute -inset-1 animate-ping rounded-full bg-purple-400/20"></span>
                                                            )}
                                                        </div>
                                                        <h3
                                                            className={`text-lg font-bold sm:text-xl ${
                                                                isUnlocked ? "text-white" : "text-gray-500"
                                                            }`}>
                                                            {stageData.name}
                                                        </h3>
                                                    </div>
                                                    <div
                                                        className={`flex items-center text-xs sm:text-sm ${
                                                            isUnlocked ? "text-purple-400" : "text-gray-500"
                                                        }`}>
                                                        <div className="flex items-center">
                                                            {completedLevels}/{totalLevels}
                                                            <Award className="ml-1 h-4 w-4" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Stage progress bar */}
                                                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-purple-900/40">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-300 transition-all duration-700"
                                                        style={{ width: `${progressPercent}%` }}></div>
                                                </div>

                                                <p
                                                    className={`mt-3 text-sm sm:text-base ${
                                                        isUnlocked ? "text-purple-200" : "text-gray-500"
                                                    }`}>
                                                    {stageData.description}
                                                </p>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {Object.entries(stageData.levels).map(([levelId]) => {
                                                        const level = parseInt(levelId);
                                                        const levelUnlocked = isLevelUnlocked(stageId, level);
                                                        const levelCompleted = isLevelCompleted(stageId, level);

                                                        return (
                                                            <div
                                                                key={levelId}
                                                                className={
                                                                    levelUnlocked
                                                                        ? "transition-transform hover:scale-105"
                                                                        : "pointer-events-none"
                                                                }
                                                                onClick={() =>
                                                                    levelUnlocked && navigateToLevel(stageId, level)
                                                                }>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className={`group flex cursor-pointer items-center ${
                                                                        levelUnlocked
                                                                            ? levelCompleted
                                                                                ? "border-green-700 bg-green-900/20 text-green-300 hover:bg-green-900/40"
                                                                                : "border-purple-700 bg-purple-900/10 text-purple-300 hover:border-purple-600 hover:bg-purple-900/30 hover:text-purple-100"
                                                                            : "border-gray-800 bg-gray-900/20 text-gray-500"
                                                                    }`}>
                                                                    {levelCompleted ? (
                                                                        <CheckCircle2 className="mr-1 h-3 w-3 text-green-400 transition-transform duration-300 group-hover:scale-110" />
                                                                    ) : !levelUnlocked ? (
                                                                        <LockIcon className="mr-1 h-3 w-3" />
                                                                    ) : (
                                                                        <Star className="mr-1 h-3 w-3 text-purple-400 transition-transform duration-300 group-hover:rotate-45" />
                                                                    )}
                                                                    Level {levelId}
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Arrow to next stage */}
                                                {isUnlocked && index < Object.keys(stages).length - 1 && (
                                                    <div className="absolute right-4 bottom-4 hidden text-purple-500 lg:block">
                                                        <ChevronRight className="h-6 w-6 animate-bounce" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ClientOnly>
                </section>

                {/* ── Features ──────────────────────────────────────────────── */}
                <section className="container mx-auto px-4 py-8 sm:py-16">
                    <h2 className="mb-8 text-center text-2xl font-bold text-white sm:mb-12 sm:text-3xl" data-reveal>
                        <span className="relative">
                            {t("home.gameFeatures")}
                            <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-300"></span>
                        </span>
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: <Activity className="h-8 w-8 text-white" />,
                                gradient: "from-green-500 to-emerald-600",
                                border: "border-green-800/30",
                                bg: "from-green-900/20 to-emerald-900/10",
                                glow: "hover:shadow-green-500/10",
                                bar: "bg-green-400",
                                title: t("home.feature1.title"),
                                description: t("home.feature1.description"),
                            },
                            {
                                icon: <Gamepad2 className="h-8 w-8 text-white" />,
                                gradient: "from-purple-500 to-indigo-600",
                                border: "border-purple-800/30",
                                bg: "from-purple-900/20 to-indigo-900/10",
                                glow: "hover:shadow-purple-500/10",
                                bar: "bg-purple-400",
                                title: t("home.feature2.title"),
                                description: t("home.feature2.description"),
                            },
                            {
                                icon: <ShoppingCart className="h-8 w-8 text-white" />,
                                gradient: "from-yellow-500 to-amber-600",
                                border: "border-yellow-800/30",
                                bg: "from-yellow-900/20 to-amber-900/10",
                                glow: "hover:shadow-yellow-500/10",
                                bar: "bg-yellow-400",
                                title: t("home.feature3.title"),
                                description: t("home.feature3.description"),
                            },
                        ].map((feature, i) => (
                            <div key={i} data-reveal>
                                <Card
                                    className={`group relative overflow-hidden ${feature.border} bg-gradient-to-br ${feature.bg} backdrop-blur-sm transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl ${feature.glow}`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                    <CardContent className="relative p-8 text-center">
                                        <div
                                            className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="mb-4 text-xl font-bold text-white">{feature.title}</h3>
                                        <p className="leading-relaxed text-purple-200">{feature.description}</p>
                                        <div className="mt-6 flex justify-center">
                                            <div className="flex space-x-1">
                                                <div className={`h-1 w-8 rounded-full ${feature.bar}`}></div>
                                                <div className={`h-1 w-4 rounded-full ${feature.bar} opacity-50`}></div>
                                                <div className={`h-1 w-2 rounded-full ${feature.bar} opacity-25`}></div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Bottom CTA ────────────────────────────────────────────── */}
                <section className="container mx-auto px-4 py-12 text-center" data-reveal>
                    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-purple-700/30 bg-gradient-to-b from-purple-900/30 to-[#171126] p-8 sm:p-12">
                        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl"></div>
                        <BookMarked className="mx-auto mb-4 h-12 w-12 text-purple-400" />
                        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">{t("home.startLearning")}</h2>
                        <p className="mb-6 text-purple-200">{t("home.subtitle")}</p>
                        <Link href="/intro">
                            <Button
                                size="lg"
                                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-900/40 transition-all duration-300 hover:brightness-110">
                                <span className="relative z-10 flex items-center">
                                    <Code className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                    {t("home.startLearning")}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>

            {/* New Gamification Dialogs */}
            <DifficultySelector
                isOpen={showDifficultySelector}
                onClose={() => {
                    setShowDifficultySelector(false);
                    setIsFirstVisit(false);
                }}
                isInitialSelection={isFirstVisit}
            />

            <Shop isOpen={showShop} onClose={() => setShowShop(false)} />

            <Minigames isOpen={showMinigames} onClose={() => setShowMinigames(false)} />
        </PageLayout>
    );
}
