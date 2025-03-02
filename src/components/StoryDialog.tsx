"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { type StoryContext } from "~/types";
import { useLanguage } from "~/contexts/LanguageContext";
import { BookOpen, Code } from "lucide-react";

interface StoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    story: StoryContext;
    isAdvancedMode?: boolean;
    onToggleAdvancedMode?: () => void;
}

export function StoryDialog({
    isOpen,
    onClose,
    story,
    isAdvancedMode = false,
    onToggleAdvancedMode,
}: StoryDialogProps) {
    const { t } = useLanguage();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-[90vw] border-purple-900/20 bg-[#1a1625] text-purple-100 md:max-h-[80vh] md:max-w-3xl">
                <DialogHeader className="pb-2">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
                        <DialogTitle className="flex items-center text-white">
                            <BookOpen className="mr-2 h-5 w-5 text-purple-400" />
                            {story.title}
                        </DialogTitle>
                        {onToggleAdvancedMode && (
                            <Button
                                variant="outline"
                                size="sm"
                                className={`mr-6 flex items-center text-xs ${
                                    isAdvancedMode
                                        ? "border-purple-600 bg-purple-800/30 text-purple-300"
                                        : "border-purple-700 text-purple-400"
                                } mt-2 sm:mt-0`}
                                onClick={onToggleAdvancedMode}>
                                <Code className="mr-1 h-3 w-3" />
                                {isAdvancedMode ? t("level.advancedModeOn") : t("level.advancedModeOff")}
                            </Button>
                        )}
                    </div>
                </DialogHeader>

                <div className="space-y-4 overflow-y-auto py-4">
                    <div className="whitespace-pre-line text-purple-200">{story.narrative}</div>

                    <div className="rounded-md border border-purple-800/30 bg-purple-900/30 p-3">
                        <h3 className="mb-2 font-medium text-purple-400">{t("level.realWorldContext")}</h3>
                        <p className="text-purple-200">{story.realWorldContext}</p>
                    </div>

                    <div className="rounded-md border border-purple-700/50 bg-purple-900/30 p-3">
                        <h3 className="mb-2 font-medium text-purple-300">{t("level.task")}</h3>
                        <p className="text-purple-200">{story.taskIntroduction}</p>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={onClose} className="w-full bg-purple-600 text-white hover:bg-purple-700 sm:w-auto">
                        {t("level.startCoding")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
