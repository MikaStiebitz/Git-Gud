import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Installation Guide - GitGud | Interactive Git Learning Platform",
    description:
        "Learn how to install and set up Git on your system. Step-by-step installation guide for Windows, macOS, and Linux.",
    openGraph: {
        title: "Installation Guide - GitGud",
        description: "Learn how to install and set up Git on your system",
        url: "https://www.gitmastery.me/installation",
        siteName: "GitGud",
        images: [
            {
                url: "/home-screen.png",
                width: 1200,
                height: 630,
                alt: "GitGud Installation Guide",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Installation Guide - GitGud",
        description: "Learn how to install and set up Git on your system",
        images: ["/home-screen.png"],
    },
    alternates: {
        canonical: "/installation",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function InstallationLayout({ children }: { children: React.ReactNode }) {
    return children;
}
