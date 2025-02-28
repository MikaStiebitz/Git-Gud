"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useGameContext } from "~/contexts/GameContext";
import { useLanguage } from "~/contexts/LanguageContext";

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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] max-w-3xl border-purple-900/20 bg-[#1a1625] text-purple-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-white">
                        <span className="truncate">{fileName}</span>
                        <span className="ml-2 text-xs text-purple-400">
                            {isDirty ? `(${t("editor.unsaved")})` : ""}
                        </span>
                    </DialogTitle>
                </DialogHeader>

                <div className="relative max-h-[60vh] overflow-hidden rounded border border-purple-800/30">
                    <div className="absolute left-0 top-0 z-10 w-full bg-purple-900/50 px-3 py-1 text-xs text-purple-300">
                        {t("editor.fileContent")}
                    </div>
                    <Textarea
                        value={content}
                        onChange={handleContentChange}
                        className="min-h-[200px] resize-none bg-purple-900/10 pt-7 font-mono text-sm text-purple-200"
                        autoFocus
                    />
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                    <div className="text-xs text-purple-400">{t("editor.escToCancel")}</div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                            {t("editor.cancel")}
                        </Button>
                        <Button onClick={handleSave} className="bg-purple-600 text-white hover:bg-purple-700">
                            {t("editor.save")}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
