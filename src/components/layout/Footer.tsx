import { Heart } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "~/contexts/LanguageContext";

interface FooterProps {
    className?: string;
}

export function Footer({ className = "" }: FooterProps) {
    const { language } = useLanguage();

    return (
        <footer className={`mt-auto border-t border-purple-900/20 bg-[#1a1625] py-4 ${className}`}>
            <div className="container mx-auto px-4 text-center text-purple-400">
                <p className="flex flex-col items-center justify-center sm:flex-row">
                    <span className="flex items-center">
                        GitGud - Made with <Heart className="mx-1 h-4 w-4 text-red-400" /> by{" "}
                        <Link
                            className="ml-1 text-purple-300 hover:underline"
                            href="https://github.com/MikaStiebitz"
                            passHref>
                            Mika Stiebitz
                        </Link>
                    </span>
                    <span className="mx-2 hidden sm:inline">|</span>
                    <Link href="/impressum" className="mt-1 text-purple-300 hover:underline sm:mt-0">
                        {language === "de" ? "Impressum" : "Legal Notice"}
                    </Link>
                </p>
            </div>
        </footer>
    );
}
