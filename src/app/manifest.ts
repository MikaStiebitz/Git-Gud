import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "GitMastery - Interactive Git Learning Platform",
        short_name: "GitMastery",
        description: "Learn Git commands and concepts through fun, interactive challenges",
        start_url: "/",
        display: "standalone",
        background_color: "#120d1e",
        theme_color: "#120d1e",
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
        categories: ["education", "developer"],
        lang: "en",
    };
}
