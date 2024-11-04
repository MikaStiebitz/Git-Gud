import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Git Gud",
    description: "A GIT gameified learning platform",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>{children}</body>
        </html>
    );
}
