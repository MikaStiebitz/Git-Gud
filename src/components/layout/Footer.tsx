import { Heart } from "lucide-react";
import Link from "next/link";

interface FooterProps {
    className?: string;
}

export function Footer({ className = "" }: FooterProps) {
    return (
        <footer className={`mt-auto border-t border-purple-900/20 bg-[#1a1625] py-4 ${className}`}>
            <div className="container mx-auto px-4 text-center text-purple-400">
                <p className="flex items-center justify-center">
                    GitGud - Made with <Heart className="mx-1 h-4 w-4 text-red-400" /> by{" "}
                    <Link
                        className="ml-1 text-purple-300 hover:underline"
                        href="https://github.com/MikaStiebitz"
                        passHref>
                        Mika Stiebitz
                    </Link>
                </p>
            </div>
        </footer>
    );
}
