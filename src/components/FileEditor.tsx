"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useGameContext } from "~/contexts/GameContext";

interface FileEditorProps {
    isOpen: boolean;
    onClose: () => void;
    fileName: string;
    initialContent?: string;
}

export function FileEditor({ isOpen, onClose, fileName, initialContent = "" }: FileEditorProps) {
    const { handleFileEdit } = useGameContext();
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
        if (isDirty && !window.confirm("Du hast ungespeicherte Änderungen. Möchtest du wirklich abbrechen?")) {
            return;
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <span className="truncate">{fileName}</span>
                        <span className="text-muted-foreground ml-2 text-xs">{isDirty ? "(Ungespeichert)" : ""}</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="relative max-h-[60vh] overflow-hidden rounded border">
                    <div className="bg-muted text-muted-foreground absolute left-0 top-0 z-10 w-full px-3 py-1 text-xs">
                        Dateiinhalt
                    </div>
                    <Textarea
                        value={content}
                        onChange={handleContentChange}
                        className="min-h-[200px] resize-none pt-7 font-mono text-sm"
                        autoFocus
                    />
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                    <div className="text-muted-foreground text-xs">
                        Drücke ESC zum Abbrechen, CTRL+Enter zum Speichern
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={handleCancel}>
                            Abbrechen
                        </Button>
                        <Button onClick={handleSave}>Speichern</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
