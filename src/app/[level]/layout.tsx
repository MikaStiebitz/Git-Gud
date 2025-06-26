import type { Metadata } from "next";

interface Props {
    params: Promise<{ level: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { level } = await params;

    const levelNames: Record<string, string> = {
        intro: "Introduction to Git",
        files: "Working with Files",
        branches: "Git Branches",
        merge: "Merging Changes",
        rebase: "Rebasing",
        remote: "Remote Repositories",
    };

    const levelName = levelNames[level] || `Level ${level}`;

    return {
        title: `${levelName} - GitGud | Interactive Git Learning`,
        description: `Learn ${levelName.toLowerCase()} through interactive Git challenges. Practice Git commands in a safe environment with step-by-step guidance.`,
        openGraph: {
            title: `${levelName} - GitGud`,
            description: `Learn ${levelName.toLowerCase()} through interactive Git challenges`,
            url: `https://www.gitmastery.me/${level}`,
            siteName: "GitGud",
            images: [
                {
                    url: "/home-screen.png",
                    width: 1200,
                    height: 630,
                    alt: `GitGud - ${levelName}`,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${levelName} - GitGud`,
            description: `Learn ${levelName.toLowerCase()} through interactive Git challenges`,
            images: ["/home-screen.png"],
        },
        alternates: {
            canonical: `/${level}`,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default function LevelLayout({ children }: { children: React.ReactNode }) {
    return children;
}
