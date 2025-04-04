"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useLanguage } from "~/contexts/LanguageContext";
import { GitCommit } from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";

export function CommitDialog() {
    const { t } = useLanguage();
    const { isCommitDialogOpen, handleCommit, closeCommitDialog } = useGameContext();
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Focus textarea when dialog opens
    useEffect(() => {
        if (isCommitDialogOpen && textareaRef.current) {
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 100);
        }
    }, [isCommitDialogOpen]);

    // Reset message when dialog closes
    useEffect(() => {
        if (!isCommitDialogOpen) {
            setMessage("");
        }
    }, [isCommitDialogOpen]);

    // Handle commit action
    const performCommit = () => {
        if (message.trim()) {
            handleCommit(message.trim());
            setMessage("");
            closeCommitDialog();
        }
    };

    // Handle keyboard shortcuts
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Ctrl+Enter or Cmd+Enter to commit
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            performCommit();
        }

        // Escape to cancel (handled by DialogContent)
    };

    // Check if device is likely mobile
    const isMobileDevice = () => {
        if (typeof window !== "undefined") {
            return (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                window.innerWidth <= 768
            );
        }
        return false;
    };

    return (
        <Dialog open={isCommitDialogOpen} onOpenChange={closeCommitDialog}>
            <DialogContent
                className="max-w-md border-purple-900/20 bg-[#1a1625] text-purple-100"
                onKeyDown={handleKeyDown}
                // Remove the built-in X button by overriding its CSS
                style={
                    {
                        "--close-button-display": "none",
                    } as React.CSSProperties
                }>
                <DialogHeader>
                    <DialogTitle className="flex items-center text-white">
                        <GitCommit className="mr-2 h-5 w-5 text-purple-400" />
                        {t("commit.title") || "Commit Message"}
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="min-h-[150px] bg-purple-900/10 font-mono text-purple-200 focus-visible:ring-purple-500"
                        placeholder={t("commit.placeholder") || "Enter a commit message describing your changes..."}
                        autoFocus={!isMobileDevice()}
                    />

                    <div className="mt-2 text-xs text-purple-400">
                        {t("commit.tip") ||
                            "First line should be a short summary. Leave a blank line then add details if needed."}
                    </div>
                </div>

                <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                    <div className="hidden text-xs text-purple-400 md:block">
                        {t("editor.escToCancel") || "Press ESC to cancel, CTRL+Enter to commit"}
                    </div>
                    <div className="flex w-full gap-2 sm:w-auto">
                        <Button
                            variant="outline"
                            onClick={closeCommitDialog}
                            className="flex-1 border-purple-700 text-purple-400 hover:bg-purple-900/30 sm:flex-auto">
                            {t("editor.cancel") || "Cancel"}
                        </Button>
                        <Button
                            onClick={performCommit}
                            disabled={!message.trim()}
                            className="flex-1 bg-purple-600 text-white hover:bg-purple-700 sm:flex-auto">
                            {t("commit.button") || "Commit Changes"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
