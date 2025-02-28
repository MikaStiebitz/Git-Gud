import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { GitBranch, Terminal, BookCopy, Home, Code, Languages } from "lucide-react";
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

    // Determine which page we're on
    const isHomePage = pathname === "/";
    const isLevelPage = pathname.includes("/level") || pathname === "/[level]";
    const isPlaygroundPage = pathname === "/playground";

    // Toggle language
    const toggleLanguage = () => {
        setLanguage(language === "de" ? "en" : "de");
    };

    return (
        <header className="border-b border-purple-900/20 bg-[#1a1625]">
            <nav className="container mx-auto flex h-16 items-center px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <GitBranch className="h-6 w-6 text-purple-400" />
                    <span className="text-xl font-bold text-white">GitGud</span>
                </Link>

                {showLevelInfo && (
                    <ClientOnly>
                        <span className="ml-4 text-purple-300">
                            Level {currentLevel} - {currentStage}
                        </span>
                    </ClientOnly>
                )}

                {isPlaygroundPage && <span className="ml-4 text-purple-300">{t("nav.playground")}</span>}

                <div className="ml-auto flex items-center space-x-4">
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

                    {!isLevelPage && (
                        <Link href="/level">
                            <Button
                                variant="ghost"
                                className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <Terminal className="mr-2 h-4 w-4" />
                                {t("nav.terminal")}
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

                    {isHomePage && (
                        <Link href="/level">
                            <Button className="bg-purple-600 text-white hover:bg-purple-700">
                                <Code className="mr-2 h-4 w-4" />
                                {t("nav.startLearning")}
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
