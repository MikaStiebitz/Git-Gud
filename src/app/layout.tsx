import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { GameProvider } from "~/contexts/GameContext";
import { LanguageProvider } from "~/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: "GitGud - Learn Git Through Play",
    description:
        "A gamified Git learning platform that helps you master Git commands and concepts through interactive challenges.",
    icons: [{ rel: "icon", url: "/gitBranch.svg" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body className="dark">
                <Analytics />
                <LanguageProvider>
                    <GameProvider>{children}</GameProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
