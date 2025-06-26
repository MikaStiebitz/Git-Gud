import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.gitmastery.me";

    // Static pages
    const staticPages = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/impressum`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/installation`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/playground`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
    ];

    // Stage-based level pages (intro, files, branches, merge, rebase, remote)
    const stages = ["intro", "files", "branches", "merge", "rebase", "remote"];
    const levelPages: MetadataRoute.Sitemap = [];

    stages.forEach(stage => {
        // Each stage has different number of levels, but we'll generate for up to 10 levels per stage
        for (let level = 1; level <= 10; level++) {
            levelPages.push({
                url: `${baseUrl}/${stage}?level=${level}`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.8,
            });
        }
    });

    return [...staticPages, ...levelPages];
}
