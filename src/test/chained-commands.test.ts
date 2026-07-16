import { describe, it, expect } from "vitest";
import { splitChainedCommands } from "../commands/base/CommandParser";

describe("splitChainedCommands - '&&' and ';' chaining (issue #68)", () => {
    it("should split commands chained with '&&'", () => {
        const parts = splitChainedCommands('git add . && git commit -m "2.0.0"');

        expect(parts).toEqual(["git add .", 'git commit -m "2.0.0"']);
    });

    it("should split commands chained with ';'", () => {
        const parts = splitChainedCommands("git add .; git status");

        expect(parts).toEqual(["git add .", "git status"]);
    });

    it("should split mixed '&&' and ';' chains", () => {
        const parts = splitChainedCommands("git add . && git commit -m 'msg'; git status");

        expect(parts).toEqual(["git add .", "git commit -m 'msg'", "git status"]);
    });

    it("should not split on '&&' inside double quotes", () => {
        const parts = splitChainedCommands('git commit -m "fix && cleanup"');

        expect(parts).toEqual(['git commit -m "fix && cleanup"']);
    });

    it("should not split on ';' inside single quotes", () => {
        const parts = splitChainedCommands("git commit -m 'first; second'");

        expect(parts).toEqual(["git commit -m 'first; second'"]);
    });

    it("should return a single command unchanged", () => {
        const parts = splitChainedCommands("git status");

        expect(parts).toEqual(["git status"]);
    });

    it("should drop empty segments", () => {
        const parts = splitChainedCommands("git add . && ; git status &&");

        expect(parts).toEqual(["git add .", "git status"]);
    });
});
