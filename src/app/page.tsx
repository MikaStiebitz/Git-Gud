"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "~/components/ui/button";
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
    ArrowRight,
    ArrowUpRight,
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

/** SVG film grain as data-URI — kills the flat gradient look. */
const NOISE_URI =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const MARQUEE_COMMANDS = [
    "git init",
    "git add .",
    "git commit",
    "git branch",
    "git switch",
    "git merge",
    "git rebase",
    "git stash",
    "git cherry-pick",
    "git bisect",
    "git revert",
    "git push",
];

/** Split a string into per-char spans for staggered clip reveals. */
const SplitChars = ({ text }: { text: string }) => (
    <>
        {text.split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
                <span data-char className="inline-block">
                    {ch === " " ? " " : ch}
                </span>
            </span>
        ))}
    </>
);

/** Editorial section header: ghost index + char-revealed heading. */
const SectionHeader = ({ index, title }: { index: string; title: string }) => (
    <div className="section-head relative mb-10 sm:mb-14">
        <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-0 -z-10 font-mono text-[7rem] leading-none font-bold text-transparent select-none sm:-top-16 sm:text-[11rem]"
            style={{ WebkitTextStroke: "1.5px rgba(168,85,247,0.16)" }}>
            {index}
        </span>
        <div className="flex items-end gap-4">
            <h2 data-chars className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                <SplitChars text={title} />
            </h2>
            <span className="mb-2 hidden h-px flex-1 bg-gradient-to-r from-purple-500/60 to-transparent sm:block"></span>
            <span className="mb-1 hidden font-mono text-xs tracking-[0.3em] text-purple-500/80 uppercase sm:block">
                /{index}
            </span>
        </div>
    </div>
);

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

    // ── GSAP: hero timeline, marquee, scroll reveals, parallax, counters ────
    useEffect(() => {
        if (!rootRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Hero entrance
                const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
                tl.from(".hero-overline > *", { y: 18, opacity: 0, duration: 0.5, stagger: 0.06 })
                    .from(
                        ".hero-word > span",
                        { yPercent: 120, duration: 0.9, stagger: 0.08, ease: "power4.out" },
                        "-=0.25",
                    )
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

                // Blinking terminal cursor in the overline
                gsap.to(".hero-cursor", { opacity: 0, duration: 0.55, repeat: -1, yoyo: true, ease: "steps(1)" });

                // Ghost word behind the hero drifts on scroll
                gsap.to(".hero-ghost", {
                    yPercent: 35,
                    scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
                });

                // Floating glow orbs — slow drift + scroll parallax
                gsap.to(".orb-a", { y: -40, x: 30, duration: 8, yoyo: true, repeat: -1, ease: "sine.inOut" });
                gsap.to(".orb-b", { y: 50, x: -20, duration: 10, yoyo: true, repeat: -1, ease: "sine.inOut" });

                // Command marquee: endless drift + skew that follows scroll velocity
                const track = document.querySelector<HTMLElement>(".marquee-track");
                if (track) {
                    gsap.to(track, { xPercent: -50, ease: "none", duration: 30, repeat: -1 });
                    const skewTo = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power2.out" });
                    ScrollTrigger.create({
                        trigger: ".marquee-band",
                        start: "top bottom",
                        end: "bottom top",
                        onUpdate: self => skewTo(gsap.utils.clamp(-8, 8, self.getVelocity() / -220)),
                    });
                }

                // Char-level clip reveals for section headings
                gsap.utils.toArray<HTMLElement>("[data-chars]").forEach(el => {
                    gsap.from(el.querySelectorAll("[data-char]"), {
                        yPercent: 115,
                        duration: 0.7,
                        stagger: 0.022,
                        ease: "power4.out",
                        scrollTrigger: { trigger: el, start: "top 88%" },
                    });
                });

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

                // Giant CTA: fill sweep on hover
                const cta = document.querySelector<HTMLElement>(".giant-cta");
                if (cta) {
                    const fill = cta.querySelector<HTMLElement>(".giant-cta-fill");
                    const arrow = cta.querySelector<HTMLElement>(".giant-cta-arrow");
                    if (fill && arrow) {
                        const enter = () => {
                            gsap.to(fill, { scaleX: 1, duration: 0.5, ease: "power3.out" });
                            gsap.to(arrow, { x: 10, y: -10, duration: 0.4, ease: "power3.out" });
                        };
                        const leave = () => {
                            gsap.to(fill, { scaleX: 0, duration: 0.5, ease: "power3.inOut" });
                            gsap.to(arrow, { x: 0, y: 0, duration: 0.4, ease: "power3.inOut" });
                        };
                        cta.addEventListener("mouseenter", enter);
                        cta.addEventListener("mouseleave", leave);
                        return () => {
                            cta.removeEventListener("mouseenter", enter);
                            cta.removeEventListener("mouseleave", leave);
                        };
                    }
                }
            });

            // Cursor spotlight over the hero — all motion preferences (very subtle)
            const hero = document.querySelector<HTMLElement>(".hero-section");
            const spot = document.querySelector<HTMLElement>(".hero-spot");
            if (hero && spot) {
                const xTo = gsap.quickTo(spot, "x", { duration: 0.55, ease: "power3.out" });
                const yTo = gsap.quickTo(spot, "y", { duration: 0.55, ease: "power3.out" });
                const onMove = (e: PointerEvent) => {
                    const r = hero.getBoundingClientRect();
                    xTo(e.clientX - r.left - 300);
                    yTo(e.clientY - r.top - 300);
                };
                hero.addEventListener("pointermove", onMove);
                return () => hero.removeEventListener("pointermove", onMove);
            }
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
                {/* Film grain over everything */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
                    style={{ backgroundImage: NOISE_URI }}></div>

                {/* ── Hero ─────────────────────────────────────────────────── */}
                <section className="hero-section relative overflow-hidden">
                    {/* Layered background: Higgsfield nebula + glow orbs + grid + spotlight */}
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
                        {/* cursor spotlight */}
                        <div className="hero-spot absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-purple-500/12 mix-blend-screen blur-[90px]"></div>
                        {/* giant ghost word */}
                        <span
                            aria-hidden="true"
                            className="hero-ghost absolute -bottom-10 left-0 hidden font-mono text-[16rem] leading-none font-bold text-transparent select-none xl:block"
                            style={{ WebkitTextStroke: "1.5px rgba(168,85,247,0.09)" }}>
                            branch
                        </span>
                    </div>

                    <div className="container mx-auto grid items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:py-28">
                        <div className="text-center lg:text-left">
                            {/* Overline: terminal-style label instead of a pill */}
                            <div className="hero-overline mb-7 flex items-center justify-center gap-3 lg:justify-start">
                                <span className="h-px w-10 bg-purple-500/70"></span>
                                <span className="font-mono text-[11px] tracking-[0.35em] text-purple-300/90 uppercase sm:text-xs">
                                    {t("home.badge")}
                                </span>
                                <span className="hero-cursor inline-block h-3.5 w-[7px] bg-purple-400"></span>
                            </div>

                            <h1 className="text-5xl font-bold tracking-[-0.03em] text-white sm:text-6xl md:text-7xl xl:text-[5.4rem] xl:leading-[0.95]">
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

                            {/* Secondary actions as understated text links */}
                            <div className="hero-cta mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
                                <button
                                    onClick={() => setShowDifficultySelector(true)}
                                    className="group flex items-center gap-1.5 font-mono text-xs tracking-wide text-purple-400 uppercase transition-colors hover:text-purple-200">
                                    <Settings className="h-3.5 w-3.5" />
                                    Difficulty
                                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                </button>
                                <button
                                    onClick={() => setShowShop(true)}
                                    className="group flex items-center gap-1.5 font-mono text-xs tracking-wide text-yellow-500/80 uppercase transition-colors hover:text-yellow-300">
                                    <ShoppingCart className="h-3.5 w-3.5" />
                                    Shop
                                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                </button>
                                <button
                                    onClick={() => setShowMinigames(true)}
                                    className="group flex items-center gap-1.5 font-mono text-xs tracking-wide text-green-500/80 uppercase transition-colors hover:text-green-300">
                                    <Gamepad2 className="h-3.5 w-3.5" />
                                    Mini Games
                                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                </button>
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

                {/* ── Command marquee ──────────────────────────────────────── */}
                <div className="marquee-band relative -rotate-1 border-y border-purple-800/40 bg-[#171126]/70 py-3 backdrop-blur-sm sm:py-4">
                    <div className="marquee-track flex w-max items-center whitespace-nowrap will-change-transform">
                        {[0, 1].map(copy => (
                            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
                                {MARQUEE_COMMANDS.map((cmd, i) => (
                                    <span key={`${copy}-${i}`} className="flex items-center">
                                        <span
                                            className="px-6 font-mono text-xl font-bold text-transparent sm:text-2xl"
                                            style={{ WebkitTextStroke: "1px rgba(196,181,253,0.55)" }}>
                                            {cmd}
                                        </span>
                                        <Star className="h-3 w-3 fill-fuchsia-500/70 text-fuchsia-500/70" />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

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

                {/* ── Stats: hairline editorial band ───────────────────────── */}
                <section className="container mx-auto px-4 py-12 sm:py-16" data-reveal>
                    <ClientOnly>
                        <div className="grid grid-cols-2 divide-purple-800/40 border-y border-purple-800/40 sm:grid-cols-4 sm:divide-x">
                            {[
                                { label: t("home.points"), value: progress.score, counter: true },
                                { label: t("home.completed"), value: completedCount, counter: true },
                                { label: t("level.level"), value: progress.currentLevel, counter: true },
                                { label: t("level.branch"), value: progress.currentStage, counter: false },
                            ].map((stat, i) => (
                                <div key={i} className="px-4 py-6 text-center sm:py-8">
                                    <p
                                        className="truncate text-4xl font-bold text-white tabular-nums sm:text-5xl"
                                        {...(stat.counter ? { "data-counter": stat.value } : {})}>
                                        {stat.value}
                                    </p>
                                    <h3 className="mt-2 font-mono text-[10px] tracking-[0.3em] text-purple-400 uppercase sm:text-xs">
                                        {stat.label}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </ClientOnly>
                </section>

                {/* ── Learning Path ─────────────────────────────────────────── */}
                <section className="path-section container mx-auto px-4 py-8 sm:py-16">
                    <SectionHeader index="01" title={learningPathHeading()} />

                    <ClientOnly>
                        <div className="relative">
                            {/* Central spine that fills as you scroll */}
                            <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 overflow-hidden bg-purple-900/40 lg:block">
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
                                                className={`group relative overflow-hidden rounded-xl p-px ${
                                                    isUnlocked
                                                        ? "bg-gradient-to-b from-purple-500/40 via-purple-800/20 to-transparent"
                                                        : "bg-gray-800/40"
                                                } ${index % 2 === 0 ? "lg:mr-12 lg:ml-auto" : "lg:mr-auto lg:ml-12"} w-full lg:w-5/12`}>
                                                <div
                                                    className={`relative rounded-[calc(0.75rem-1px)] p-6 transition-colors duration-300 ${
                                                        isUnlocked
                                                            ? "bg-[#171126]/95 group-hover:bg-[#1b1430]/95"
                                                            : "bg-gray-900/60"
                                                    }`}>
                                                    {/* index watermark */}
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -top-3 right-3 font-mono text-6xl font-bold text-transparent select-none"
                                                        style={{ WebkitTextStroke: "1px rgba(168,85,247,0.14)" }}>
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>

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
                                                            className={`flex items-center font-mono text-xs sm:text-sm ${
                                                                isUnlocked ? "text-purple-400" : "text-gray-500"
                                                            }`}>
                                                            <div className="flex items-center">
                                                                {completedLevels}/{totalLevels}
                                                                <Award className="ml-1 h-4 w-4" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stage progress bar */}
                                                    <div className="mt-3 h-px w-full overflow-hidden bg-purple-900/50">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 transition-all duration-700"
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
                                                                            ? "transition-transform hover:-translate-y-0.5"
                                                                            : "pointer-events-none"
                                                                    }
                                                                    onClick={() =>
                                                                        levelUnlocked && navigateToLevel(stageId, level)
                                                                    }>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className={`group flex cursor-pointer items-center rounded-md font-mono text-xs ${
                                                                            levelUnlocked
                                                                                ? levelCompleted
                                                                                    ? "border-green-700/60 bg-green-950/30 text-green-300 hover:bg-green-900/40"
                                                                                    : "border-purple-700/60 bg-transparent text-purple-300 hover:border-purple-400 hover:bg-purple-900/30 hover:text-purple-100"
                                                                                : "border-gray-800 bg-transparent text-gray-600"
                                                                        }`}>
                                                                        {levelCompleted ? (
                                                                            <CheckCircle2 className="mr-1 h-3 w-3 text-green-400 transition-transform duration-300 group-hover:scale-110" />
                                                                        ) : !levelUnlocked ? (
                                                                            <LockIcon className="mr-1 h-3 w-3" />
                                                                        ) : (
                                                                            <Star className="mr-1 h-3 w-3 text-purple-400 transition-transform duration-300 group-hover:rotate-45" />
                                                                        )}
                                                                        L{levelId}
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
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ClientOnly>
                </section>

                {/* ── Features ──────────────────────────────────────────────── */}
                <section className="container mx-auto px-4 py-8 sm:py-16">
                    <SectionHeader index="02" title={t("home.gameFeatures")} />

                    <div className="grid gap-px overflow-hidden rounded-xl border border-purple-800/40 bg-purple-800/40 md:grid-cols-3">
                        {[
                            {
                                icon: <Activity className="h-6 w-6 text-green-400" />,
                                accent: "text-green-400",
                                bar: "from-green-400/80 to-emerald-500/0",
                                title: t("home.feature1.title"),
                                description: t("home.feature1.description"),
                            },
                            {
                                icon: <Gamepad2 className="h-6 w-6 text-purple-400" />,
                                accent: "text-purple-400",
                                bar: "from-purple-400/80 to-fuchsia-500/0",
                                title: t("home.feature2.title"),
                                description: t("home.feature2.description"),
                            },
                            {
                                icon: <ShoppingCart className="h-6 w-6 text-yellow-400" />,
                                accent: "text-yellow-400",
                                bar: "from-yellow-400/80 to-amber-500/0",
                                title: t("home.feature3.title"),
                                description: t("home.feature3.description"),
                            },
                        ].map((feature, i) => (
                            <div key={i} data-reveal className="group relative bg-[#151022] p-8 sm:p-10">
                                {/* hover sweep line */}
                                <span
                                    className={`absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r ${feature.bar} transition-transform duration-500 group-hover:scale-x-100`}></span>
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-purple-700/50 bg-purple-950/40 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                                        {feature.icon}
                                    </div>
                                    <span
                                        aria-hidden="true"
                                        className={`font-mono text-xs tracking-[0.3em] uppercase opacity-60 ${feature.accent}`}>
                                        0{i + 1}
                                    </span>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                                <p className="leading-relaxed text-purple-200/90">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Giant CTA ─────────────────────────────────────────────── */}
                <section className="container mx-auto px-4 py-16 sm:py-24" data-reveal>
                    <Link
                        href="/intro"
                        className="giant-cta group relative block overflow-hidden border-y border-purple-800/40 py-10 sm:py-14">
                        {/* fill sweep */}
                        <span className="giant-cta-fill absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 will-change-transform"></span>
                        <span className="relative z-10 flex items-center justify-between gap-4 px-2 sm:px-6">
                            <span className="text-4xl font-bold tracking-tight text-white transition-colors duration-300 sm:text-6xl lg:text-7xl">
                                {t("home.startLearning")}
                            </span>
                            <ArrowUpRight className="giant-cta-arrow h-10 w-10 shrink-0 text-purple-400 transition-colors duration-300 group-hover:text-white sm:h-16 sm:w-16" />
                        </span>
                        <span className="relative z-10 mt-2 block px-2 font-mono text-xs tracking-[0.3em] text-purple-400 uppercase transition-colors duration-300 group-hover:text-purple-100 sm:px-6">
                            gitmastery.me — {t("home.badge")}
                        </span>
                    </Link>
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
