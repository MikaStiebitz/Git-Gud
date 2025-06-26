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
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value: "index, follow",
                    },
                ],
            },
        ];
    },

    // Ensure proper redirects
    async redirects() {
        return [
            // Add any necessary redirects here
            // Example: redirect www to non-www or vice versa
        ];
    },
};

export default config;
