/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const siteUrl = process.env.SITE_URL ?? "";
const siteHost =
    siteUrl
        .replace(/^https?:\/\//, "")
        .split("/")[0]
        ?.toLowerCase() ?? "";
const siteUsesGithubPagesDomain = siteHost.endsWith("github.io");
const hasCustomDomain =
    Boolean(process.env.GITHUB_PAGES_CUSTOM_DOMAIN) || Boolean(siteHost && !siteUsesGithubPagesDomain);
const useRepoBasePath = isGitHubActions && repositoryName && !hasCustomDomain;
const basePath = useRepoBasePath ? `/${repositoryName}` : "";

/** @type {import("next").NextConfig} */
const config = {
    // Static export for GitHub Pages
    output: "export",

    // GitHub project pages are served from /<repo-name>/
    basePath,
    assetPrefix: basePath || undefined,

    // Exported pages work best with folder-style routes
    trailingSlash: true,

    // next/image optimization requires a server runtime
    images: {
        unoptimized: true,
    },

    // Enable React 19 features
    experimental: {
        // Better development experience with server components HMR
        serverComponentsHmrCache: true,
    },
    
    // Allow Next.js HMR in dev environment
    allowedDevOrigins: ['172.16.0.2', 'localhost'],
};

export default config;
