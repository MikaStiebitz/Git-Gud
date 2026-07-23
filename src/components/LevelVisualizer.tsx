"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGameContext } from "~/contexts/GameContext";
import { useLanguage } from "~/contexts/LanguageContext";
import { buildCommitGraph, type GraphNode } from "~/lib/buildCommitGraph";
import { GitBranch, GitCommit, ZoomIn, ZoomOut, Maximize2, X, Sparkles } from "lucide-react";

// ── Layout constants ────────────────────────────────────────────────────────
const ROW_H = 72;
const COL_W = 58;
const R = 14;
const PAD_TOP = 44;
const PAD_LEFT = 40;
const PAD_BOTTOM = 36;
const BADGE_W_CHAR = 7.2;
const BADGE_H = 22;

// Lane palette tuned to the app's dark purple theme
const LANE_COLORS = [
    "#a78bfa", // violet — main lane
    "#38bdf8", // sky
    "#34d399", // emerald
    "#fbbf24", // amber
    "#f472b6", // pink
    "#22d3ee", // cyan
    "#fb923c", // orange
    "#a3e635", // lime
];

const laneColor = (col: number): string => LANE_COLORS[col % LANE_COLORS.length]!;

const pseudoAuthors = ["Sam", "Alex", "Taylor", "Lee"];
const getPseudoAuthor = (id: string) =>
    pseudoAuthors[Math.abs(id.charCodeAt(0) || 0) % pseudoAuthors.length] ?? "Unknown";

interface LevelVisualizerProps {
    /** Optional height cap for the scrollable graph area */
    className?: string;
}

/**
 * Interactive, animated commit-graph of the player's current repository state.
 * Renders live after every terminal command: new commits pop in, edges draw
 * themselves and the HEAD halo pulses. Nodes are tappable for details and
 * branch badges highlight their history — a visual path through the level.
 */
export function LevelVisualizer({ className = "" }: LevelVisualizerProps) {
    const { gitRepository, terminalOutput, currentStage, currentLevel } = useGameContext();
    const { t } = useLanguage();

    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);
    const prevNodeIdsRef = useRef<Set<string>>(new Set());
    const [selected, setSelected] = useState<GraphNode | null>(null);
    const [highlightBranch, setHighlightBranch] = useState<string | null>(null);
    const [zoom, setZoom] = useState(1);

    // Rebuild the graph whenever a command ran or the level changed
    const refreshKey = `${currentStage}-${currentLevel}-${terminalOutput.length}`;
    const { graph, branchHeads, currentBranch, initialized } = useMemo(() => {
        const isInit = gitRepository.isInitialized();
        const allCommits = gitRepository.getAllCommits();
        const heads = gitRepository.getBranchHeads();
        const branch = gitRepository.getCurrentBranch();
        const enriched = Object.fromEntries(
            Object.entries(allCommits).map(([id, c]) => [id, { ...c, author: getPseudoAuthor(id) }]),
        );
        return {
            graph: buildCommitGraph(enriched, heads, branch),
            branchHeads: heads,
            currentBranch: branch,
            initialized: isInit,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gitRepository, refreshKey]);

    const rowCount = graph.nodes.length;
    const maxRow = rowCount - 1;

    // Oldest commit at the top (like a growing tree), newest at the bottom
    const yOf = (node: GraphNode) => PAD_TOP + (maxRow - node.row) * ROW_H;
    const xOf = (node: GraphNode) => PAD_LEFT + node.col * COL_W;

    // Ancestor set for branch highlighting
    const highlightSet = useMemo(() => {
        if (!highlightBranch) return null;
        const headId = branchHeads[highlightBranch];
        if (!headId) return null;
        const byId = new Map(graph.nodes.map(n => [n.id, n]));
        const seen = new Set<string>();
        const queue = [headId];
        while (queue.length > 0) {
            const id = queue.pop()!;
            if (seen.has(id)) continue;
            seen.add(id);
            const node = byId.get(id);
            node?.parents.forEach(p => queue.push(p));
        }
        return seen;
    }, [highlightBranch, branchHeads, graph.nodes]);

    const svgWidth = PAD_LEFT + graph.colCount * COL_W + 230;
    const svgHeight = rowCount > 0 ? PAD_TOP + rowCount * ROW_H + PAD_BOTTOM : 0;

    // Clear selection when the level resets or commits disappear
    useEffect(() => {
        if (selected && !graph.nodes.some(n => n.id === selected.id)) setSelected(null);
        if (highlightBranch && !branchHeads[highlightBranch]) setHighlightBranch(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graph, branchHeads]);

    // ── Enter animations for new nodes / edges / badges ─────────────────────
    useEffect(() => {
        const container = stageRef.current;
        if (!container) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const prevIds = prevNodeIdsRef.current;
        const currentIds = new Set(graph.nodes.map(n => n.id));
        const newIds = graph.nodes.filter(n => !prevIds.has(n.id)).map(n => n.id);
        prevNodeIdsRef.current = currentIds;

        const ctx = gsap.context(() => {
            if (!reduced && newIds.length > 0) {
                const nodeEls = newIds
                    .map(id => container.querySelector(`[data-node-id="${CSS.escape(id)}"]`))
                    .filter(Boolean);
                if (nodeEls.length > 0) {
                    gsap.from(nodeEls, {
                        scale: 0,
                        transformOrigin: "center center",
                        ease: "back.out(2)",
                        duration: 0.55,
                        stagger: 0.07,
                    });
                }
                const edgeEls = Array.from(container.querySelectorAll<SVGPathElement>("path[data-edge-new='true']"));
                edgeEls.forEach(path => {
                    const len = path.getTotalLength();
                    gsap.fromTo(
                        path,
                        { strokeDasharray: len, strokeDashoffset: len },
                        { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", delay: 0.1 },
                    );
                });
                const badgeEls = container.querySelectorAll("[data-badge]");
                gsap.from(badgeEls, { opacity: 0, x: -8, duration: 0.4, ease: "power2.out", stagger: 0.04 });
            }

            // Pulsing halo around HEAD
            const halo = container.querySelector("[data-head-halo]");
            if (halo && !reduced) {
                gsap.fromTo(
                    halo,
                    { scale: 1, opacity: 0.55, transformOrigin: "center center" },
                    {
                        scale: 1.7,
                        opacity: 0,
                        duration: 1.6,
                        ease: "power1.out",
                        repeat: -1,
                        repeatDelay: 0.35,
                    },
                );
            }
        }, container);

        return () => ctx.revert();
    }, [graph]);

    // Dim non-highlighted commits when a branch is selected
    useEffect(() => {
        const container = stageRef.current;
        if (!container) return;
        const groups = Array.from(container.querySelectorAll<SVGGElement>("[data-node-group]"));
        const edges = Array.from(container.querySelectorAll<SVGPathElement>("[data-edge]"));
        gsap.to(groups, {
            opacity: (i, el) => {
                const id = (el as SVGGElement).dataset.nodeGroup!;
                return !highlightSet || highlightSet.has(id) ? 1 : 0.18;
            },
            duration: 0.35,
        });
        gsap.to(edges, {
            opacity: (i, el) => {
                const from = (el as SVGPathElement).dataset.edgeFrom!;
                const to = (el as SVGPathElement).dataset.edgeTo!;
                return !highlightSet || (highlightSet.has(from) && highlightSet.has(to)) ? 0.8 : 0.1;
            },
            duration: 0.35,
        });
    }, [highlightSet]);

    // Slide-in for the detail panel
    useEffect(() => {
        if (!detailRef.current || !selected) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;
        gsap.fromTo(detailRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
    }, [selected]);

    const applyZoom = (next: number) => {
        const clamped = Math.min(1.6, Math.max(0.45, next));
        setZoom(clamped);
    };

    // Auto-fit once when the graph outgrows the container
    const autoFittedRef = useRef(false);
    useEffect(() => {
        if (autoFittedRef.current) return;
        const el = containerRef.current;
        if (!el || svgWidth === 0) return;
        if (svgWidth > el.clientWidth) {
            autoFittedRef.current = true;
            setZoom(Math.min(1, Math.max(0.45, (el.clientWidth - 24) / svgWidth)));
        }
    }, [svgWidth]);

    const fitToView = () => {
        const el = containerRef.current;
        if (!el || svgWidth === 0) return;
        applyZoom(Math.min(1, (el.clientWidth - 24) / svgWidth));
    };

    const commitLabel = (node: GraphNode) => `C${maxRow - node.row}`;

    // ── Empty state ─────────────────────────────────────────────────────────
    if (!initialized || rowCount === 0) {
        return (
            <div
                className={`flex h-full min-h-[280px] flex-col items-center justify-center rounded-lg border border-purple-800/30 bg-[#151022]/60 p-6 text-center ${className}`}>
                <svg width="120" height="120" viewBox="0 0 120 120" className="mb-4 opacity-70">
                    <path
                        d="M60 96 L60 62 M60 62 C60 40 40 48 40 28 M60 62 C60 40 80 48 80 28"
                        stroke="#7c3aed"
                        strokeWidth="2.5"
                        strokeDasharray="5 6"
                        fill="none"
                        strokeLinecap="round">
                        <animate attributeName="stroke-dashoffset" from="44" to="0" dur="3s" repeatCount="indefinite" />
                    </path>
                    <circle cx="60" cy="96" r="9" fill="#1e1633" stroke="#a78bfa" strokeWidth="2.5" />
                    <circle
                        cx="40"
                        cy="28"
                        r="9"
                        fill="#1e1633"
                        stroke="#7c3aed"
                        strokeWidth="2.5"
                        strokeDasharray="3 4"
                    />
                    <circle
                        cx="80"
                        cy="28"
                        r="9"
                        fill="#1e1633"
                        stroke="#7c3aed"
                        strokeWidth="2.5"
                        strokeDasharray="3 4"
                    />
                </svg>
                <h3 className="mb-1 text-base font-semibold text-purple-100">{t("visualizer.emptyTitle")}</h3>
                <p className="max-w-xs text-sm text-purple-300/80">
                    {initialized ? t("visualizer.emptyCommitHint") : t("visualizer.emptyInitHint")}
                </p>
            </div>
        );
    }

    return (
        <div className={`flex h-full flex-col ${className}`}>
            {/* Toolbar: branch chips + zoom controls */}
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                    {Object.keys(branchHeads).map(branch => {
                        const isCurrent = branch === currentBranch;
                        const isHighlighted = branch === highlightBranch;
                        return (
                            <button
                                key={branch}
                                onClick={() => setHighlightBranch(isHighlighted ? null : branch)}
                                className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[11px] transition-all ${
                                    isHighlighted
                                        ? "border-purple-400 bg-purple-500/30 text-purple-100 shadow-[0_0_12px_rgba(167,139,250,0.35)]"
                                        : isCurrent
                                          ? "border-purple-500/60 bg-purple-900/40 text-purple-200"
                                          : "border-purple-800/50 bg-purple-950/40 text-purple-400 hover:border-purple-600/60 hover:text-purple-200"
                                }`}
                                title={t("visualizer.branchFilterHint")}>
                                <GitBranch className="h-3 w-3" />
                                {branch}
                                {isCurrent && <Sparkles className="h-2.5 w-2.5 text-amber-300" />}
                            </button>
                        );
                    })}
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <span className="mr-1 hidden items-center gap-1 font-mono text-[11px] text-purple-400 sm:flex">
                        <GitCommit className="h-3 w-3" />
                        {rowCount}
                    </span>
                    <button
                        onClick={() => applyZoom(zoom - 0.15)}
                        aria-label={t("visualizer.zoomOut")}
                        className="rounded-md border border-purple-800/50 bg-purple-950/40 p-1 text-purple-300 transition-colors hover:bg-purple-800/40">
                        <ZoomOut className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={() => applyZoom(zoom + 0.15)}
                        aria-label={t("visualizer.zoomIn")}
                        className="rounded-md border border-purple-800/50 bg-purple-950/40 p-1 text-purple-300 transition-colors hover:bg-purple-800/40">
                        <ZoomIn className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={fitToView}
                        aria-label={t("visualizer.fit")}
                        className="rounded-md border border-purple-800/50 bg-purple-950/40 p-1 text-purple-300 transition-colors hover:bg-purple-800/40">
                        <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Graph canvas */}
            <div
                ref={containerRef}
                className="relative flex-1 overflow-auto rounded-lg border border-purple-800/30 bg-[#120d1e]/80 [background-image:radial-gradient(rgba(167,139,250,0.08)_1px,transparent_1px)] [background-size:22px_22px]"
                onClick={() => setSelected(null)}>
                <div
                    ref={stageRef}
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "top left",
                        width: svgWidth,
                        height: svgHeight,
                    }}
                    className="transition-transform duration-300 ease-out">
                    <svg width={svgWidth} height={svgHeight} className="overflow-visible select-none">
                        <defs>
                            {LANE_COLORS.map((c, i) => (
                                <marker
                                    key={i}
                                    id={`gm-arrow-${i}`}
                                    viewBox="0 0 10 10"
                                    refX="8"
                                    refY="5"
                                    markerWidth="7"
                                    markerHeight="7"
                                    orient="auto-start-reverse">
                                    <path d="M 0 1 L 9 5 L 0 9 z" fill={c} opacity="0.9" />
                                </marker>
                            ))}
                        </defs>

                        {/* Edges: child → parent, arrow pointing at the parent */}
                        {graph.edges.map(edge => {
                            const fromNode = graph.nodes.find(n => n.id === edge.fromId);
                            const toNode = graph.nodes.find(n => n.id === edge.toId);
                            if (!fromNode || !toNode) return null;
                            const x1 = xOf(fromNode);
                            const y1 = yOf(fromNode) - R - 3;
                            const x2 = xOf(toNode);
                            const y2 = yOf(toNode) + R + 5;
                            const colorIdx = fromNode.col % LANE_COLORS.length;
                            const isNew = !prevNodeIdsRef.current.has(edge.fromId);
                            const d =
                                x1 === x2
                                    ? `M ${x1} ${y1} L ${x2} ${y2}`
                                    : `M ${x1} ${y1} C ${x1} ${y1 - ROW_H * 0.45}, ${x2} ${y2 + ROW_H * 0.45}, ${x2} ${y2}`;
                            return (
                                <path
                                    key={`${edge.fromId}-${edge.toId}`}
                                    data-edge
                                    data-edge-from={edge.fromId}
                                    data-edge-to={edge.toId}
                                    data-edge-new={isNew ? "true" : undefined}
                                    d={d}
                                    stroke={laneColor(colorIdx)}
                                    strokeWidth={2.25}
                                    fill="none"
                                    opacity={0.8}
                                    markerEnd={`url(#gm-arrow-${colorIdx})`}
                                />
                            );
                        })}

                        {/* Commit nodes */}
                        {graph.nodes.map(node => {
                            const x = xOf(node);
                            const y = yOf(node);
                            const color = laneColor(node.col);
                            const isSelected = selected?.id === node.id;
                            return (
                                <g key={node.id} data-node-group={node.id}>
                                    {node.isHead && (
                                        <circle
                                            data-head-halo
                                            cx={x}
                                            cy={y}
                                            r={R + 4}
                                            fill="none"
                                            stroke={color}
                                            strokeWidth={2}
                                        />
                                    )}
                                    <g
                                        data-node-id={node.id}
                                        className="cursor-pointer"
                                        onClick={e => {
                                            e.stopPropagation();
                                            setSelected(isSelected ? null : node);
                                        }}>
                                        <circle
                                            cx={x}
                                            cy={y}
                                            r={R}
                                            fill={isSelected ? color : "#1e1633"}
                                            stroke={color}
                                            strokeWidth={node.isMergeCommit ? 3.5 : 2.5}
                                            strokeDasharray={node.isMergeCommit ? "4 3" : undefined}
                                            style={
                                                isSelected
                                                    ? { filter: `drop-shadow(0 0 8px ${color})` }
                                                    : node.isHead
                                                      ? { filter: `drop-shadow(0 0 5px ${color}66)` }
                                                      : undefined
                                            }
                                        />
                                        <text
                                            x={x}
                                            y={y + 3.5}
                                            textAnchor="middle"
                                            fontSize={10}
                                            fontWeight={700}
                                            fill={isSelected ? "#14101e" : color}
                                            fontFamily="monospace"
                                            className="pointer-events-none">
                                            {commitLabel(node)}
                                        </text>
                                    </g>

                                    {/* Branch badges to the right of the node */}
                                    {node.branches.map((branch, bi) => {
                                        const isCurrentHead = node.isHead && branch === currentBranch;
                                        const label = isCurrentHead ? `${branch} ★` : branch;
                                        const w = label.length * BADGE_W_CHAR + 18;
                                        const bx = x + R + 12;
                                        const by = y - BADGE_H / 2 + bi * (BADGE_H + 4);
                                        return (
                                            <g
                                                key={branch}
                                                data-badge
                                                className="cursor-pointer"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setHighlightBranch(highlightBranch === branch ? null : branch);
                                                }}>
                                                <path
                                                    d={`M ${bx - 7} ${y} L ${bx} ${y - 5} L ${bx} ${y + 5} z`}
                                                    fill={isCurrentHead ? color : "#2d2344"}
                                                    opacity={0.95}
                                                />
                                                <rect
                                                    x={bx}
                                                    y={by}
                                                    width={w}
                                                    height={BADGE_H}
                                                    rx={BADGE_H / 2}
                                                    fill={isCurrentHead ? color : "#2d2344"}
                                                    stroke={color}
                                                    strokeWidth={isCurrentHead ? 0 : 1}
                                                    opacity={0.95}
                                                />
                                                <text
                                                    x={bx + w / 2}
                                                    y={by + BADGE_H / 2 + 3.5}
                                                    textAnchor="middle"
                                                    fontSize={11}
                                                    fontWeight={isCurrentHead ? 700 : 500}
                                                    fill={isCurrentHead ? "#14101e" : color}
                                                    fontFamily="monospace"
                                                    className="pointer-events-none">
                                                    {label}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Detail panel for the selected commit */}
                {selected && (
                    <div
                        ref={detailRef}
                        onClick={e => e.stopPropagation()}
                        className="sticky right-2 bottom-2 left-2 mx-2 mb-2 rounded-lg border border-purple-700/50 bg-[#1b1430]/95 p-3 shadow-xl shadow-purple-950/50 backdrop-blur-sm">
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span
                                        className="rounded px-1.5 py-0.5 font-mono text-[11px] font-bold"
                                        style={{
                                            backgroundColor: `${laneColor(selected.col)}22`,
                                            color: laneColor(selected.col),
                                        }}>
                                        {commitLabel(selected)} · {selected.shortId}
                                    </span>
                                    {selected.isHead && (
                                        <span className="rounded bg-purple-500/25 px-1.5 py-0.5 font-mono text-[11px] font-bold text-purple-200">
                                            HEAD
                                        </span>
                                    )}
                                    {selected.isMergeCommit && (
                                        <span className="rounded bg-pink-500/20 px-1.5 py-0.5 font-mono text-[11px] text-pink-300">
                                            {t("visualizer.mergeCommit")}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1.5 truncate text-sm font-medium text-purple-100">
                                    {selected.message}
                                </p>
                                <p className="mt-0.5 text-xs text-purple-400">
                                    {selected.author} · {selected.timestamp.toLocaleString()}
                                </p>
                                {selected.branches.length > 0 && (
                                    <div className="mt-1.5 flex flex-wrap gap-1">
                                        {selected.branches.map(b => (
                                            <span
                                                key={b}
                                                className="flex items-center gap-1 rounded-full border border-purple-700/50 bg-purple-950/60 px-2 py-0.5 font-mono text-[10px] text-purple-300">
                                                <GitBranch className="h-2.5 w-2.5" />
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                aria-label={t("visualizer.close")}
                                className="shrink-0 rounded-md p-1 text-purple-400 transition-colors hover:bg-purple-800/40 hover:text-purple-200">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <p className="mt-2 text-center text-[11px] text-purple-500/80">{t("visualizer.interactHint")}</p>
        </div>
    );
}
