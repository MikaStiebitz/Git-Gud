import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { GitBranch, Terminal, BookCopy, Home, Code, Languages, Menu, X } from "lucide-react";
import { useGameContext } from "~/contexts/GameContext";
import { useLanguage } from "~/contexts/LanguageContext";
import { ClientOnly } from "~/components/ClientOnly";

interface NavbarProps {
    showLevelInfo?: boolean;
}

export function Navbar({ showLevelInfo = false }: NavbarProps) {
    const pathname = usePathname();
    const { currentStage, currentLevel } = useGameContext();
    const { language, setLanguage, t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Determine which page we're on
    const isHomePage = pathname === "/";
    const isLevelPage = pathname.includes("/level") || pathname === "/[level]";
    const isPlaygroundPage = pathname === "/playground";

    // Toggle language
    const toggleLanguage = () => {
        setLanguage(language === "de" ? "en" : "de");
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="border-b border-purple-900/20 bg-[#1a1625]">
            <nav className="container mx-auto flex h-16 items-center px-4">
                {/* Logo and brand */}
                <Link href="/" className="flex items-center space-x-2">
                    <GitBranch className="h-6 w-6 text-purple-400" />
                    <span className="text-xl font-bold text-white">GitGud</span>
                </Link>

                {/* Current level info - only show on larger screens when relevant */}
                {showLevelInfo && (
                    <ClientOnly>
                        <span className="ml-4 hidden text-purple-300 md:block">
                            Level {currentLevel} - {currentStage}
                        </span>
                    </ClientOnly>
                )}

                {/* Show playground text on relevant pages */}
                {isPlaygroundPage && (
                    <span className="ml-4 hidden text-purple-300 md:block">{t("nav.playground")}</span>
                )}

                {/* Desktop navigation */}
                <div className="ml-auto hidden items-center space-x-4 md:flex">
                    {/* Language toggle */}
                    <Button
                        variant="ghost"
                        onClick={toggleLanguage}
                        className="flex items-center text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                        <Languages className="mr-2 h-4 w-4" />
                        {language === "de" ? "EN" : "DE"}
                    </Button>

                    {!isHomePage && (
                        <Link href="/">
                            <Button
                                variant="ghost"
                                className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <Home className="mr-2 h-4 w-4" />
                                {t("nav.home")}
                            </Button>
                        </Link>
                    )}

                    {!isPlaygroundPage && (
                        <Link href="/playground">
                            <Button
                                variant="ghost"
                                className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <BookCopy className="mr-2 h-4 w-4" />
                                {t("nav.playground")}
                            </Button>
                        </Link>
                    )}

                    <Link href="/level">
                        <Button className="bg-purple-600 text-white hover:bg-purple-700">
                            <Code className="mr-2 h-4 w-4" />
                            {t("nav.startLearning")}
                        </Button>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="ml-auto flex md:hidden">
                    <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="text-purple-300">
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </nav>

            {/* Mobile navigation menu */}
            {mobileMenuOpen && (
                <div className="border-t border-purple-900/20 bg-[#1a1625] md:hidden">
                    <div className="flex flex-col space-y-2 p-4">
                        {/* Current level info for mobile */}
                        {showLevelInfo && (
                            <ClientOnly>
                                <div className="mb-2 text-purple-300">
                                    Level {currentLevel} - {currentStage}
                                </div>
                            </ClientOnly>
                        )}

                        {/* Language toggle for mobile */}
                        <Button
                            variant="ghost"
                            onClick={toggleLanguage}
                            className="flex w-full items-center justify-start text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                            <Languages className="mr-2 h-4 w-4" />
                            {language === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
                        </Button>

                        {/* Navigation links */}
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                            <Button
                                variant="ghost"
                                className="flex w-full items-center justify-start text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <Home className="mr-2 h-4 w-4" />
                                {t("nav.home")}
                            </Button>
                        </Link>

                        <Link href="/level" onClick={() => setMobileMenuOpen(false)}>
                            <Button
                                variant="ghost"
                                className="flex w-full items-center justify-start text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <Terminal className="mr-2 h-4 w-4" />
                                {t("nav.terminal")}
                            </Button>
                        </Link>

                        <Link href="/playground" onClick={() => setMobileMenuOpen(false)}>
                            <Button
                                variant="ghost"
                                className="flex w-full items-center justify-start text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <BookCopy className="mr-2 h-4 w-4" />
                                {t("nav.playground")}
                            </Button>
                        </Link>

                        {isHomePage && (
                            <Link href="/level" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="mt-2 w-full bg-purple-600 text-white hover:bg-purple-700">
                                    <Code className="mr-2 h-4 w-4" />
                                    {t("nav.startLearning")}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
