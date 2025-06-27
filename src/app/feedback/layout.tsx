import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Feedback Board - GitGud",
    description:
        "Share feature requests, report bugs, and suggest new levels for GitGud. Help us make the platform better!",
    keywords: "feedback, feature request, bug report, git learning, suggestions",
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
