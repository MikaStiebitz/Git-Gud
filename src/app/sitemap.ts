import type { MetadataRoute } from "next";
import { allStages } from "~/levels";
import { getPageUrl } from "~/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = getPageUrl();

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
        {
            url: `${baseUrl}/arcade`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        },
        // Impressum is excluded from sitemap (has noindex)
    ];

    // Stage-based level pages - generate URLs for all actual levels
    const levelPages: MetadataRoute.Sitemap = [];

    Object.values(allStages).forEach(stage => {
        const stageId = stage.id.toLowerCase();
        const numLevels = Object.keys(stage.levels).length;

        // Generate URL for each level in this stage
        for (let level = 1; level <= numLevels; level++) {
            levelPages.push({
                url: `${baseUrl}/${stageId}?stage=${stage.id}&level=${level}`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.8,
            });
        }
    });

    return [...staticPages, ...levelPages];
}
