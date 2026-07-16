"use client";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Card, CardContent } from "~/components/ui/card";
import { Palette, Lock, Check } from "lucide-react";
import { useTerminalTheme } from "~/contexts/TerminalThemeContext";
import { useLanguage } from "~/contexts/LanguageContext";

interface TerminalThemeSwitcherProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TerminalThemeSwitcher({ isOpen, onClose }: TerminalThemeSwitcherProps) {
    const { currentTheme, availableThemes, setTheme, isThemeUnlocked } = useTerminalTheme();
    const { t } = useLanguage();

    const handleThemeSelect = (themeId: string) => {
        if (isThemeUnlocked(themeId)) {
            setTheme(themeId);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl border-purple-900/20 bg-[#1a1625] text-purple-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-xl text-white">
                        <Palette className="mr-2 h-5 w-5 text-purple-400" />
                        {t("themes.title")}
                    </DialogTitle>
                    <p className="text-purple-300">{t("themes.subtitle")}</p>
                </DialogHeader>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {availableThemes.map(theme => {
                        const isUnlocked = isThemeUnlocked(theme.id);
                        const isActive = currentTheme.id === theme.id;

                        return (
                            <Card
                                key={theme.id}
                                className={`cursor-pointer border transition-all duration-300 ${
                                    isActive
                                        ? "border-purple-400 bg-purple-900/30"
                                        : "border-purple-800/30 hover:border-purple-600/50"
                                } ${!isUnlocked ? "opacity-50" : "hover:scale-105"} `}
                                onClick={() => handleThemeSelect(theme.id)}>
                                <CardContent className="p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="font-medium text-white">{theme.name}</h3>
                                        <div className="flex items-center space-x-2">
                                            {isActive && <Check className="h-4 w-4 text-green-400" />}
                                            {!isUnlocked && <Lock className="h-4 w-4 text-gray-400" />}
                                        </div>
                                    </div>

                                    {/* Theme Preview */}
                                    <div
                                        className="rounded border p-2 font-mono text-xs"
                                        style={{
                                            backgroundColor: theme.colors.background,
                                            borderColor: theme.colors.border,
                                            color: theme.colors.text,
                                        }}>
                                        <div className="mb-1 flex items-center space-x-1">
                                            <span style={{ color: theme.colors.prompt }}>git-mastery:~$</span>
                                            <span>git status</span>
                                        </div>
                                        <div style={{ color: theme.colors.success }} className="mb-1">
                                            On branch main
                                        </div>
                                        <div style={{ color: theme.colors.warning }}>
                                            Changes not staged for commit:
                                        </div>
                                        <div style={{ color: theme.colors.accent }} className="ml-2">
                                            modified: README.md
                                        </div>
                                    </div>

                                    {!isUnlocked && (
                                        <p className="mt-2 text-xs text-gray-400">{t("themes.unlockHint")}</p>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-6 flex justify-center">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="border-purple-700 text-purple-300 hover:bg-purple-900/50">
                        {t("themes.close")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
