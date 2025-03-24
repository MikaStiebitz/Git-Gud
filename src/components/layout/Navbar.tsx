import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { GitBranch, Terminal, BookCopy, Home, Code, Languages, Menu, X, Github, Star } from "lucide-react";
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
    const [starAnimation, setStarAnimation] = useState(false);
    const [starRotation, setStarRotation] = useState(0);

    // Determine which page we're on
    const isHomePage = pathname === "/";
    const isPlaygroundPage = pathname === "/playground";

    // Toggle language
    const toggleLanguage = () => {
        setLanguage(language === "de" ? "en" : "de");
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Effect to periodically animate the star button
    useEffect(() => {
        // Random rotation for the star animation
        const getRandomRotation = () => (Math.random() > 0.5 ? 20 : -20);

        // Animate every 30 seconds
        const animationInterval = setInterval(() => {
            setStarAnimation(true);
            setStarRotation(getRandomRotation());

            // Reset after animation completes
            setTimeout(() => {
                setStarAnimation(false);
                setStarRotation(0);
            }, 2000);
        }, 30000); // Every 30 seconds to be less intrusive

        // Initial animation after 8 seconds
        const initialTimeout = setTimeout(() => {
            setStarAnimation(true);
            setStarRotation(getRandomRotation());

            setTimeout(() => {
                setStarAnimation(false);
                setStarRotation(0);
            }, 2000);
        }, 8000);

        return () => {
            clearInterval(animationInterval);
            clearTimeout(initialTimeout);
        };
    }, []);

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
                    {/* GitHub star button - elegant with tooltip */}
                    <a
                        href="https://github.com/MikaStiebitz/Git-Gud"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-purple-800/50"
                        aria-label="Star us on GitHub">
                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Star us on GitHub
                            {/* Tooltip arrow */}
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/80"></span>
                        </span>

                        {/* Star Icon with animations */}
                        <Star
                            className={`h-5 w-5 transition-all duration-300 ${
                                starAnimation
                                    ? "animate-pulse text-yellow-300 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                                    : "text-purple-400 group-hover:text-yellow-300"
                            } group-hover:scale-110`}
                            style={{
                                transform: starAnimation
                                    ? `rotate(${starRotation}deg) scale(1.2)`
                                    : "rotate(0) scale(1)",
                            }}
                        />

                        {/* Animation ring */}
                        {starAnimation && (
                            <span className="animate-ping absolute inset-0 rounded-full bg-yellow-400/20"></span>
                        )}
                    </a>

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
                <div className="ml-auto flex items-center space-x-2 md:hidden">
                    {/* GitHub star for mobile */}
                    <a
                        href="https://github.com/MikaStiebitz/Git-Gud"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-purple-800/50"
                        aria-label="Star us on GitHub">
                        <Star
                            className={`h-5 w-5 ${starAnimation ? "animate-pulse text-yellow-300" : "text-purple-400"}`}
                            style={{
                                transform: starAnimation ? `rotate(${starRotation}deg)` : "rotate(0)",
                            }}
                        />
                        {starAnimation && (
                            <span className="animate-ping absolute inset-0 rounded-full bg-yellow-400/20"></span>
                        )}
                    </a>

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

                        {/* GitHub star for mobile menu (with text) */}
                        <a
                            href="https://github.com/MikaStiebitz/Git-Gud"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center rounded-md border border-purple-800/40 bg-purple-900/20 px-3 py-2 text-purple-300">
                            <Star className="mr-2 h-4 w-4 text-yellow-300" />
                            <span>Star us on GitHub</span>
                        </a>

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
