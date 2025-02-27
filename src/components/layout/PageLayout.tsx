import { type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface PageLayoutProps {
    children: ReactNode;
    showLevelInfo?: boolean;
}

export function PageLayout({ children, showLevelInfo = false }: PageLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-[#1a1625] text-purple-100">
            <Navbar showLevelInfo={showLevelInfo} />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
