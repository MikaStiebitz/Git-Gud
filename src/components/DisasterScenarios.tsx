"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useGameContext } from "~/contexts/GameContext";
import { Terminal } from "./Terminal";
import { GitGraph } from "./GitGraph";
import { buildCommitGraph } from "~/lib/buildCommitGraph";
import { disasterScenarios } from "~/levels/disaster-scenarios";
import { 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  Lightbulb, 
  Trophy, 
  ArrowLeft,
  Skull,
  ShieldAlert,
  Ghost,
  Key,
  Shield,
  Zap,
  RotateCcw,
  BookOpen,
  Code,
  HelpCircleIcon
} from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { PageLayout } from "~/components/layout/PageLayout";
import { highlightGitCommands } from "~/lib/textHighlighting";
import { useLanguage } from "~/contexts/LanguageContext";
import { StoryDialog } from "~/components/StoryDialog";

const DIFFICULTY_ICONS = {
  Beginner: <ShieldAlert className="w-4 h-4 text-green-400" />,
  Intermediate: <Ghost className="w-4 h-4 text-yellow-400" />,
  Advanced: <Skull className="w-4 h-4 text-red-500" />,
};

const DIFFICULTY_COLORS = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function DisasterScenarios() {
  const { 
    gitRepository, 
    fileSystem, 
    levelManager, 
    addXP, 
    addPoints,
    progressManager,
    terminalOutput,
    handleCommand: baseHandleCommand,
    isAdvancedMode,
    toggleAdvancedMode
  } = useGameContext();

  const { t } = useLanguage();
  const [activeScenarioId, setActiveScenarioId] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [showStoryDialog, setShowStoryDialog] = useState(false);

  const activeScenario = useMemo(() => 
    (disasterScenarios.find(s => s.id === activeScenarioId) || disasterScenarios[0])!
  , [activeScenarioId]);

  const levelData = useMemo(() => 
    levelManager.getLevel("Scenarios", activeScenarioId, t)
  , [activeScenarioId, levelManager, t]);

  // Load completed scenarios from progress manager
  useEffect(() => {
    const progress = progressManager.getProgress();
    const completed = progress.completedLevels["Scenarios"] || [];
    setCompletedScenarios(completed);
  }, [progressManager]);

  // Setup the scenario environment when it changes
  useEffect(() => {
    if (activeScenario) {
      levelManager.setupLevel("Scenarios", activeScenario.id, fileSystem, gitRepository);
      setIsCompleted(progressManager.isLevelCompleted("Scenarios", activeScenario.id));
      setShowSuccess(false);
    }
  }, [activeScenario, fileSystem, gitRepository, levelManager, progressManager]);

  const handleScenarioSelect = (id: number) => {
    setActiveScenarioId(id);
    setShowHints(false);
  };

  const onCommand = useCallback((command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Execute the command via the base handler
    baseHandleCommand(trimmedCommand);
    
    // Check for completion
    const [cmd, ...args] = trimmedCommand.split(/\s+/);
    if (cmd) {
      const isCorrect = levelManager.checkLevelCompletion("Scenarios", activeScenario.id, cmd, args, gitRepository);
      
      if (isCorrect) {
        // If it was the last requirement, trigger success
        const level = levelManager.getLevel("Scenarios", activeScenario.id);
        const allDone = level?.requirements.every(req => 
          req.id && level.completedRequirements?.includes(req.id)
        );
        if (allDone) {
          handleSuccess();
        }
      } else {
        // Provide gentle feedback if the command doesn't match any requirement
        // Only if it's a git command (to avoid spamming on 'ls', 'cd', etc.)
        if (cmd === "git" && !["status", "log", "help", "hint"].includes(args[0])) {
           // We'll wait a tiny bit for the normal git output to appear
           setTimeout(() => {
             // We can't easily add to terminalOutput from here without race conditions 
             // because baseHandleCommand also updates it.
             // But we can check if the command was one of the "requirements"
             const isRequirement = activeScenario.requirements.some(r => r.command.includes(cmd));
             if (isRequirement) {
                // Command was correct but maybe args were wrong?
             }
           }, 100);
        }
      }
    }
  }, [activeScenario.id, activeScenario.requirements, baseHandleCommand, gitRepository, levelManager]);

  const handleSuccess = () => {
    if (!isCompleted) {
      const scenarioXP = [100, 250, 250, 500, 500][activeScenarioId - 1] || 100;
      
      addXP(scenarioXP);
      addPoints(scenarioXP);
      progressManager.completeLevel("Scenarios", activeScenario.id);
      setCompletedScenarios(prev => [...prev, activeScenario.id]);
      setIsCompleted(true);
      setShowSuccess(true);
    }
  };

  const graphData = useMemo(() => {
    return buildCommitGraph(
      gitRepository.getCommits(),
      gitRepository.getBranches(),
      gitRepository.getCurrentBranch()
    );
  }, [gitRepository, terminalOutput]);

  const welcomeMessage = useMemo(() => [
    "Welcome to the Disaster Recovery Lab!",
    `Your mission: ${activeScenario.story?.title}`,
    "Type 'hint' anytime for guidance, or click a suggestion below."
  ], [activeScenario]);

  return (
    <PageLayout>
      <div className="flex h-[calc(100vh-64px)] bg-[#0f0c1a] overflow-hidden">
        {/* Sidebar - Scenarios List */}
        <div className="w-72 flex-shrink-0 border-r border-purple-900/20 bg-[#161225] flex flex-col">
          <div className="p-4 border-b border-purple-900/20 flex items-center justify-between">
            <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest">Scenarios</h2>
            <div className="flex items-center gap-1 rounded-full border border-yellow-600/50 bg-yellow-900/20 px-2 py-0.5 text-yellow-400">
               <Trophy className="h-3.5 w-3.5" />
               <span className="text-xs font-bold">{completedScenarios.length} / 5</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {disasterScenarios.map((scenario) => {
              const difficulty = ["Beginner", "Intermediate", "Intermediate", "Advanced", "Advanced"][scenario.id - 1];
              const isDone = completedScenarios.includes(scenario.id);
              const isActive = activeScenarioId === scenario.id;

              return (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioSelect(scenario.id)}
                  className={cn(
                    "w-full flex flex-col p-4 rounded-xl transition-all duration-300 group text-left border",
                    isActive 
                      ? "border-purple-500/50 bg-purple-900/20 ring-2 ring-purple-500/30 shadow-lg shadow-purple-900/40" 
                      : "border-purple-800/30 bg-purple-900/10 hover:border-purple-600 hover:bg-purple-900/20"
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={cn(
                      "text-sm font-bold truncate",
                      isActive ? "text-white" : "text-purple-300 group-hover:text-purple-100"
                    )}>
                      {scenario.story?.title}
                    </span>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-tight",
                      DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS]
                    )}>
                      {DIFFICULTY_ICONS[difficulty as keyof typeof DIFFICULTY_ICONS]}
                      {difficulty}
                    </div>
                    <span className="text-[10px] text-purple-500 font-mono">
                      { [100, 250, 250, 500, 500][scenario.id - 1] } XP
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content: Terminal and Info Panel */}
        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          {/* Terminal Panel (Left, 55%) */}
          <div className="flex-[0.58] flex flex-col min-w-0">
             <Terminal 
                className="h-full shadow-2xl"
                customStage="Disaster Lab"
                customLevel={activeScenario.id}
                welcomeMessage={welcomeMessage}
                commandChips={activeScenario.commandSuggestions}
             />
          </div>

          {/* Info Panel (Right, 42%) */}
          <div className="flex-[0.42] flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-1">
             {/* Challenge Card */}
             <Card className="border-purple-900/20 bg-purple-900/10 shrink-0">
                <CardHeader className="p-4 pb-2">
                   <CardTitle className="flex items-center text-base text-white">
                      <Shield className="mr-2 h-5 w-5 text-purple-400" />
                      The Situation
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                   <p className="text-sm text-purple-200 leading-relaxed">
                      {activeScenario.story?.narrative}
                   </p>
                </CardContent>
             </Card>

             {/* Task Card */}
             <Card className="border-purple-900/20 bg-purple-900/10 flex-shrink-0">
                <CardHeader className="p-4 pb-2">
                   <CardTitle className="flex items-center text-base text-white">
                      <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                      Objectives
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2">
                   {levelData?.objectives.map((objective, index) => {
                      const objectiveNumber = index + 1;
                      const hasObjectiveIds = levelData.requirements.some(req => req.objectiveId !== undefined);
                      const isStepDone = hasObjectiveIds
                          ? levelData.completedObjectives?.includes(objectiveNumber)
                          : levelData.requirements[index]?.id 
                            ? levelData.completedRequirements?.includes(levelData.requirements[index]!.id!)
                            : false;

                      return (
                         <div
                            key={index}
                            className={cn(
                              "flex items-start space-x-3 rounded-lg p-3 transition-all",
                              isStepDone ? "bg-green-500/10" : "bg-purple-900/20 hover:bg-purple-900/30"
                            )}
                         >
                            <div className={cn(
                              "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all",
                              isStepDone ? "border-green-500 bg-green-500/20" : "border-purple-500/50 bg-purple-900/40"
                            )}>
                               {isStepDone && <CheckCircle2 className="h-3 w-3 text-green-400" />}
                            </div>
                            <span className={cn(
                              "text-sm",
                              isStepDone ? "text-green-300/70 line-through" : "text-purple-100"
                            )}>
                               {objective}
                            </span>
                         </div>
                      );
                   })}
                   
                   <div className="pt-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowHints(!showHints)}
                        className="flex-1 border-purple-700/50 text-purple-300 hover:bg-purple-900/50 h-9"
                      >
                         <HelpCircleIcon className="mr-2 h-4 w-4" />
                         {showHints ? "Hide Hints" : "Need a hint?"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowStoryDialog(true)}
                        className="flex-1 border-purple-700/50 text-purple-300 hover:bg-purple-900/50 h-9"
                      >
                         <BookOpen className="mr-2 h-4 w-4" />
                         Show Story
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => levelManager.setupLevel("Scenarios", activeScenario.id, fileSystem, gitRepository)}
                        className="flex-none border-orange-900/30 text-orange-400 hover:bg-orange-900/20 h-9 px-3"
                        title="Reset Scenario"
                      >
                         <RotateCcw className="h-4 w-4" />
                      </Button>
                   </div>
                   
                   {showHints && levelData && (
                      <div className="mt-4 p-4 rounded-xl border border-purple-700/30 bg-purple-900/40 animate-in fade-in slide-in-from-top-2 duration-300">
                         <h4 className="text-xs font-bold text-purple-300 uppercase mb-2 flex items-center gap-2">
                            <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
                            Hints
                         </h4>
                         <ul className="space-y-2">
                            {levelData.hints.map((hint, i) => (
                               <li key={i} className="text-xs text-purple-200/80 leading-relaxed flex gap-2">
                                  <span className="text-purple-500">•</span>
                                  {highlightGitCommands(hint)}
                               </li>
                            ))}
                         </ul>
                      </div>
                   )}
                </CardContent>
             </Card>

             {/* Repository State Card */}
             <Card className="border-purple-900/20 bg-[#080808] flex-1 min-h-[250px] relative overflow-hidden flex flex-col">
                <CardHeader className="p-4 pb-0 shrink-0">
                   <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Repository State
                   </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center p-0">
                   <GitGraph graph={graphData} />
                </CardContent>
             </Card>
          </div>
        </div>

        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500">
             <div className="max-w-md w-full p-8 bg-[#111] border border-white/10 rounded-3xl shadow-2xl shadow-purple-500/20 text-center transform scale-100 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Scenario Cleared!</h2>
                <p className="text-slate-400 mb-8">
                  Excellent work, responder. You've successfully stabilized the repository.
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 min-w-[100px]">
                     <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">XP Earned</div>
                     <div className="text-2xl font-bold text-orange-500">+{ [100, 250, 250, 500, 500][activeScenarioId - 1] }</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 min-w-[100px]">
                     <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Bonus</div>
                     <div className="text-2xl font-bold text-yellow-500">+50</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20"
                >
                  Continue to Lab
                </button>
             </div>
          </div>
        )}
      </div>

      {activeScenario.story && (
        <StoryDialog
          isOpen={showStoryDialog}
          onClose={() => setShowStoryDialog(false)}
          story={activeScenario.story}
          isAdvancedMode={isAdvancedMode}
          onToggleAdvancedMode={toggleAdvancedMode}
        />
      )}
    </PageLayout>
  );
}
