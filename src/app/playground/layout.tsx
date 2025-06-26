import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Git Playground - GitGud | Practice Git Commands",
    description:
        "Practice Git commands in a safe sandbox environment. Experiment with Git operations without fear of breaking anything.",
    openGraph: {
        title: "Git Playground - GitGud",
        description: "Practice Git commands in a safe sandbox environment",
        url: "https://www.gitmastery.me/playground",
        siteName: "GitGud",
        images: [
            {
                url: "/home-screen.png",
                width: 1200,
                height: 630,
                alt: "GitGud Playground",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Git Playground - GitGud",
        description: "Practice Git commands in a safe sandbox environment",
        images: ["/home-screen.png"],
    },
    alternates: {
        canonical: "/playground",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
    return children;
}
