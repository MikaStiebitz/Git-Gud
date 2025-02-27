import Link from "next/link";
import { Button } from "~/components/ui/button";
import { GitBranch, Terminal, BookCopy } from "lucide-react";

interface NavbarProps {
    showTerminalButton?: boolean;
    showStartButton?: boolean;
}

export function Navbar({ showTerminalButton = true, showStartButton = true }: NavbarProps) {
    return (
        <header className="border-b border-purple-900/20 bg-[#1a1625]">
            <nav className="container mx-auto flex h-16 items-center px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <GitBranch className="h-6 w-6 text-purple-400" />
                    <span className="text-xl font-bold text-white">GitGud</span>
                </Link>
                <div className="ml-auto flex space-x-4">
                    {showTerminalButton && (
                        <Link href="/level">
                            <Button
                                variant="ghost"
                                className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <Terminal className="mr-2 h-4 w-4" />
                                Terminal
                            </Button>
                        </Link>
                    )}
                    {showTerminalButton && (
                        <Link href="/playground">
                            <Button
                                variant="ghost"
                                className="text-purple-300 hover:bg-purple-900/50 hover:text-purple-100">
                                <BookCopy className="mr-2 h-4 w-4" />
                                Playground
                            </Button>
                        </Link>
                    )}
                    {showStartButton && (
                        <Link href="/level">
                            <Button className="bg-purple-600 text-white hover:bg-purple-700">Start Learning</Button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
