import { Heart } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "~/contexts/LanguageContext";
import { ProTipDisplay } from "../ProTipDisplay";

interface FooterProps {
    className?: string;
}

export function Footer({ className = "" }: FooterProps) {
    const { t } = useLanguage();

    return (
        <footer className={`mt-auto bg-[#1a1625] ${className}`}>
            {/* Pro Tips Bar - only shows if purchased */}
            <ProTipDisplay />

            {/* Regular Footer Content */}
            <div className="border-t border-purple-900/20 py-4">
                <div className="container mx-auto px-4 text-center text-purple-400">
                    <p className="flex flex-col items-center justify-center sm:flex-row">
                        <span className="flex items-center">
                            Git Mastery - Made with <Heart className="mx-1 h-4 w-4 text-red-400" /> by{" "}
                            <Link
                                className="ml-1 text-purple-300 hover:underline"
                                href="https://github.com/MikaStiebitz"
                                passHref>
                                Mika Stiebitz
                            </Link>
                        </span>
                        <span className="mx-2 hidden sm:inline">|</span>
                        <Link href="/impressum" className="mt-1 text-purple-300 hover:underline sm:mt-0">
                            {t("footer.legalNotice")}
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
