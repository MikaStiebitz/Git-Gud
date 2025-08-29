/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    // Ensure trailing slash consistency
    trailingSlash: false,

    // ESLint configuration
    eslint: {
        // Allow production builds to successfully complete even if there are ESLint warnings
        ignoreDuringBuilds: false, // Keep linting active but don't fail on warnings
    },

    // Enable experimental features for better SEO
    experimental: {
        optimizePackageImports: ["lucide-react", "@radix-ui/react-accordion", "@radix-ui/react-dialog"],
    },

    // Add headers for better SEO
    async headers() {
        return [
            // Remove global X-Robots-Tag to allow page-specific robots meta tags to work
            // Individual pages control their own indexing via metadata
        ];
    },

    // Ensure proper redirects
    async redirects() {
        return [
            // Redirect /level?stage=intro&level=X to /intro?level=X (and similar for other stages)
            {
                source: "/level",
                has: [
                    { type: "query", key: "stage", value: "intro" },
                    { type: "query", key: "level", value: "(?<level>\\d+)" },
                ],
                destination: "/intro?level=:level",
                permanent: true,
            },
            {
                source: "/level",
                has: [
                    { type: "query", key: "stage", value: "files" },
                    { type: "query", key: "level", value: "(?<level>\\d+)" },
                ],
                destination: "/files?level=:level",
                permanent: true,
            },
            {
                source: "/level",
                has: [
                    { type: "query", key: "stage", value: "branches" },
                    { type: "query", key: "level", value: "(?<level>\\d+)" },
                ],
                destination: "/branches?level=:level",
                permanent: true,
            },
            {
                source: "/level",
                has: [
                    { type: "query", key: "stage", value: "merge" },
                    { type: "query", key: "level", value: "(?<level>\\d+)" },
                ],
                destination: "/merge?level=:level",
                permanent: true,
            },
            {
                source: "/level",
                has: [
                    { type: "query", key: "stage", value: "rebase" },
                    { type: "query", key: "level", value: "(?<level>\\d+)" },
                ],
                destination: "/rebase?level=:level",
                permanent: true,
            },
            {
                source: "/level",
                has: [
                    { type: "query", key: "stage", value: "remote" },
                    { type: "query", key: "level", value: "(?<level>\\d+)" },
                ],
                destination: "/remote?level=:level",
                permanent: true,
            },
            // Redirect /level without parameters to homepage
            {
                source: "/level",
                destination: "/",
                permanent: true,
            },
        ];
    },
};

export default config;
