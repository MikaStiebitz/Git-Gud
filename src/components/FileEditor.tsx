"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useGameContext } from "~/contexts/GameContext";
import { useLanguage } from "~/contexts/LanguageContext";
import { Save } from "lucide-react";

interface FileEditorProps {
    isOpen: boolean;
    onClose: () => void;
    fileName: string;
    initialContent?: string;
}

export function FileEditor({ isOpen, onClose, fileName, initialContent = "" }: FileEditorProps) {
    const { handleFileEdit } = useGameContext();
    const { t } = useLanguage();
    const [content, setContent] = useState(initialContent);
    const [isDirty, setIsDirty] = useState(false);

    // Reset content when the file or mode changes - with useCallback for performance
    useEffect(() => {
        setContent(initialContent);
        setIsDirty(false);
    }, [initialContent, fileName]);

    // Memoize handlers for better performance
    const handleSave = useCallback(() => {
        if (isDirty) {
            handleFileEdit(fileName, content);
        }
        onClose();
    }, [isDirty, fileName, content, handleFileEdit, onClose]);

    const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsDirty(true);
    }, []);

    const handleCancel = useCallback(() => {
        if (isDirty && !window.confirm(t("editor.unsavedChanges"))) {
            return;
        }
        onClose();
    }, [isDirty, onClose, t]);

    // Check if device is likely mobile - memoized for performance
    const isMobileDevice = useCallback(() => {
        if (typeof window !== "undefined") {
            return (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                window.innerWidth <= 768
            );
        }
        return false;
    }, []);

    // Calculate editor height based on viewport - memoized for performance
    const getEditorHeight = useCallback(() => {
        // Base height on viewport size, smaller percentage for small screens
        const isMobile = isMobileDevice();
        const heightPercentage = isMobile ? 40 : 60;
        return `${Math.min(heightPercentage, 60)}vh`;
    }, [isMobileDevice]);

    // Handle keyboard shortcuts - memoized for performance
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            // Support Ctrl+Enter or Cmd+Enter to save
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                handleSave();
            }

            // Use Escape to cancel
            if (e.key === "Escape") {
                e.preventDefault();
                handleCancel();
            }
        },
        [handleSave, handleCancel],
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <DialogContent
                className="h-[90vh] max-h-[90vh] max-w-5xl border-purple-900/20 bg-[#1a1625] p-3 text-purple-100 sm:h-[85vh] sm:max-h-[85vh] sm:p-6 md:h-[80vh] md:max-h-[80vh]"
                onKeyDown={handleKeyDown}
                // Remove the built-in X button by overriding its CSS
                style={
                    {
                        "--close-button-display": "none",
                    } as React.CSSProperties
                }>
                <DialogHeader className="mb-2 flex flex-row items-center justify-between">
                    <DialogTitle className="mr-2 flex items-center text-white">
                        <span className="max-w-[150px] truncate sm:max-w-[200px] md:max-w-md">{fileName}</span>
                        <span className="ml-2 text-xs text-purple-400">
                            {isDirty ? `(${t("editor.unsaved")})` : ""}
                        </span>
                    </DialogTitle>
                </DialogHeader>

                <div
                    className="relative flex-grow overflow-hidden rounded border border-purple-800/30"
                    style={{ height: getEditorHeight() }}>
                    <div className="absolute left-0 top-0 z-10 w-full bg-purple-900/50 px-3 py-1 text-xs text-purple-300">
                        {t("editor.fileContent")}
                    </div>
                    <Textarea
                        value={content}
                        onChange={handleContentChange}
                        className="h-full w-full resize-none bg-purple-900/10 pt-7 font-mono text-xs text-purple-200 focus-visible:ring-purple-500 sm:text-sm"
                        autoFocus={!isMobileDevice()}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <DialogFooter className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                    <div className="hidden text-xs text-purple-400 md:block">{t("editor.escToCancel")}</div>
                    <div className="flex w-full gap-2 sm:w-auto">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="flex-1 border-purple-700 text-purple-400 hover:bg-purple-900/30 sm:flex-auto">
                            {t("editor.cancel")}
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="flex-1 bg-purple-600 text-white hover:bg-purple-700 sm:flex-auto">
                            <Save className="mr-2 h-4 w-4 md:hidden" />
                            {t("editor.save")}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
