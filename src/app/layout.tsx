import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Script from "next/script";
import { GameProvider } from "~/contexts/GameContext";
import { LanguageProvider } from "~/contexts/LanguageContext";
import { TerminalThemeWrapper } from "~/components/TerminalThemeWrapper";
import { env } from "~/env";
import { getPageUrl, getSiteUrl } from "~/lib/site";

const cloudflareAnalyticsToken = env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;

export const metadata: Metadata = {
    title: "GitMastery - Master Git Through Play | Interactive Git Learning Platform",
    description:
        "Learn Git commands and concepts through fun, interactive challenges. Practice Git in a safe environment with visual feedback and structured learning paths.",
    keywords: "git, learn git, git tutorial, git commands, git practice, git visualization, interactive git learning",
    metadataBase: new URL(getSiteUrl()),
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
        title: "GitMastery - Master Git Through Play",
        description: "Learn Git commands and concepts through fun, interactive challenges",
        url: getPageUrl(),
        siteName: "GitMastery",
        images: [
            {
                url: "/home-screen.png",
                width: 1200,
                height: 630,
                alt: "GitMastery - Learn Git Through Play",
            },
        ],
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "GitMastery - Master Git Through Play",
        description: "Learn Git commands and concepts through fun, interactive challenges",
        images: ["/home-screen.png"],
    },
    icons: [
        // PNG set first — Google Search prefers raster icons at 48px multiples
        { rel: "icon", url: "/icon-48.png", type: "image/png", sizes: "48x48" },
        { rel: "icon", url: "/icon-96.png", type: "image/png", sizes: "96x96" },
        { rel: "icon", url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { rel: "icon", url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
        { rel: "shortcut icon", url: "/favicon.ico" },
        { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body className="dark overflow-x-hidden">
                {cloudflareAnalyticsToken ? (
                    <Script
                        defer
                        src="https://static.cloudflareinsights.com/beacon.min.js"
                        data-cf-beacon={JSON.stringify({ token: cloudflareAnalyticsToken })}
                    />
                ) : null}
                <LanguageProvider>
                    <GameProvider>
                        <TerminalThemeWrapper>{children}</TerminalThemeWrapper>
                    </GameProvider>
                </LanguageProvider>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            name: "GitMastery - Learn Git Through Play",
                            description: "An interactive Git learning platform with hands-on practice",
                            url: getPageUrl(),
                            applicationCategory: "EducationalApplication",
                            operatingSystem: "Web",
                            inLanguage: "en",
                            publisher: {
                                "@type": "Organization",
                                name: "GitMastery",
                                url: getPageUrl(),
                            },
                            offers: {
                                "@type": "Offer",
                                price: "0",
                                priceCurrency: "USD",
                            },
                            aggregateRating: {
                                "@type": "AggregateRating",
                                ratingValue: "4.8",
                                reviewCount: "150",
                            },
                        }),
                    }}
                />
            </body>
        </html>
    );
}
