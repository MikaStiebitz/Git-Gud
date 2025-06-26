import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { GameProvider } from "~/contexts/GameContext";
import { LanguageProvider } from "~/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: "GitGud - Master Git Through Play | Interactive Git Learning Platform",
    description:
        "Learn Git commands and concepts through fun, interactive challenges. Practice Git in a safe environment with visual feedback and structured learning paths.",
    keywords: "git, learn git, git tutorial, git commands, git practice, git visualization, interactive git learning",
    metadataBase: new URL("https://www.gitmastery.me"),
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "uBk1r7zKOTAgc6Srm3LfgzG4EaKwr83nhTGqw77BubI",
    },
    openGraph: {
        title: "GitGud - Master Git Through Play",
        description: "Learn Git commands and concepts through fun, interactive challenges",
        url: "https://www.gitmastery.me",
        siteName: "GitGud",
        images: [
            {
                url: "/home-screen.png",
                width: 1200,
                height: 630,
                alt: "GitGud - Learn Git Through Play",
            },
        ],
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "GitGud - Master Git Through Play",
        description: "Learn Git commands and concepts through fun, interactive challenges",
        images: ["/home-screen.png"],
    },
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            name: "GitGud - Learn Git Through Play",
                            description: "An interactive Git learning platform with hands-on practice",
                            url: "https://www.gitmastery.me",
                            applicationCategory: "EducationalApplication",
                            operatingSystem: "Web",
                            inLanguage: "en",
                            publisher: {
                                "@type": "Organization",
                                name: "GitGud",
                                url: "https://www.gitmastery.me",
                            },
                            offers: {
                                "@type": "Offer",
                                price: "0",
                                priceCurrency: "USD",
                            },
                        }),
                    }}
                />
            </body>
        </html>
    );
}
