/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    tabWidth: 4,
    bracketSameLine: true,
    printWidth: 120,
    arrowParens: "avoid",
};

export default config;
