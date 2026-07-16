import type { Metadata } from "next";
import { getPageUrl } from "~/lib/site";

export const metadata: Metadata = {
    title: "Git Arcade - Git Mastery | Play Git Minigames",
    description:
        "Sharpen your Git skills with quick arcade minigames: order commands to build a graph, race to create branches, write commit messages, and resolve merge conflicts.",
    openGraph: {
        title: "Git Arcade - Git Mastery",
        description: "Play quick Git minigames and earn coins",
        url: getPageUrl("/arcade"),
        siteName: "Git Mastery",
        images: [
            {
                url: "/home-screen.png",
                width: 1200,
                height: 630,
                alt: "Git Mastery Arcade",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Git Arcade - Git Mastery",
        description: "Play quick Git minigames and earn coins",
        images: ["/home-screen.png"],
    },
    alternates: {
        canonical: "/arcade",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ArcadeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
