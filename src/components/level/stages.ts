export const stages = {
    Intro: {
        1: { command: "git init" },
        2: { command: "git status" },
    },
    Files: {
        1: { command: "git add ." },
        2: { command: "git commit", requiresArgs: ["-m"] },
    },
    Branches: {
        1: { command: "git branch" },
        2: { command: "git checkout", requiresArgs: ["-b"] },
    },
    Merge: {
        1: { command: "git merge", requiresArgs: ["any"] },
    },
};
