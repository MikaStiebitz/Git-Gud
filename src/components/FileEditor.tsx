"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useGameContext } from "~/contexts/GameContext";
import { useLanguage } from "~/contexts/LanguageContext";
import { Save, X } from "lucide-react";

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

    // Reset content when the file changes
    useEffect(() => {
        setContent(initialContent);
        setIsDirty(false);
    }, [initialContent, fileName]);

    const handleSave = () => {
        if (isDirty) {
            handleFileEdit(fileName, content);
        }
        onClose();
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsDirty(true);
    };

    const handleCancel = () => {
        if (isDirty && !window.confirm(t("editor.unsavedChanges"))) {
            return;
        }
        onClose();
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-[90vw] border-purple-900/20 bg-[#1a1625] text-purple-100 md:max-h-[80vh] md:max-w-3xl">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="mr-2 flex items-center text-white">
                        <span className="max-w-[200px] truncate md:max-w-md">{fileName}</span>
                        <span className="ml-2 text-xs text-purple-400">
                            {isDirty ? `(${t("editor.unsaved")})` : ""}
                        </span>
                    </DialogTitle>
                    <Button variant="ghost" size="sm" onClick={handleCancel} className="text-purple-400">
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="relative h-[50vh] flex-grow overflow-hidden rounded border border-purple-800/30 md:max-h-[60vh]">
                    <div className="absolute left-0 top-0 z-10 w-full bg-purple-900/50 px-3 py-1 text-xs text-purple-300">
                        {t("editor.fileContent")}
                    </div>
                    <Textarea
                        value={content}
                        onChange={handleContentChange}
                        className="h-full min-h-[200px] resize-none bg-purple-900/10 pt-7 font-mono text-sm text-purple-200"
                        autoFocus={!isMobileDevice()}
                    />
                </div>

                <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                    <div className="hidden text-xs text-purple-400 md:block">{t("editor.escToCancel")}</div>
                    <div className="flex w-full gap-2 sm:w-auto">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="flex-1 border-purple-700 text-purple-300 hover:bg-purple-900/50 sm:flex-auto">
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
