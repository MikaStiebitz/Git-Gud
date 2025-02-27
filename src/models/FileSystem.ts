import { FileSystemItem } from "../types";

export class FileSystem {
    private root: FileSystemItem;

    constructor(initialFileSystem?: FileSystemItem) {
        this.root = initialFileSystem || {
            type: "directory",
            name: "/",
            children: {
                "README.md": {
                    type: "file",
                    name: "README.md",
                    content: "# Git Learning Game\n\nWelcome to the Git learning game!",
                },
                src: {
                    type: "directory",
                    name: "src",
                    children: {
                        "index.js": {
                            type: "file",
                            name: "index.js",
                            content: 'console.log("Hello, Git!");',
                        },
                    },
                },
            },
        };
    }

    // Get the contents of a directory
    public getDirectoryContents(path: string): Record<string, FileSystemItem> | null {
        const item = this.getItemAtPath(path);
        if (item && item.type === "directory") {
            return item.children || {};
        }
        return null;
    }

    // Get the contents of a file
    public getFileContents(path: string): string | null {
        const item = this.getItemAtPath(path);
        if (item && item.type === "file") {
            return item.content || "";
        }
        return null;
    }

    // Create or update a file
    public writeFile(path: string, content: string): boolean {
        const parts = path.split("/").filter(p => p.length > 0);
        if (parts.length === 0) return false;

        const fileName = parts.pop()!;
        let currentDir = this.root;

        // Navigate to the directory
        for (const part of parts) {
            if (!currentDir.children || !currentDir.children[part]) {
                // Create directory if it doesn't exist
                if (!currentDir.children) currentDir.children = {};
                currentDir.children[part] = {
                    type: "directory",
                    name: part,
                    children: {},
                };
            }
            currentDir = currentDir.children[part];
            if (currentDir.type !== "directory") return false;
        }

        // Create or update the file
        if (!currentDir.children) currentDir.children = {};
        currentDir.children[fileName] = {
            type: "file",
            name: fileName,
            content,
            lastModified: new Date(),
        };

        return true;
    }

    // Delete a file or directory
    public delete(path: string): boolean {
        const parts = path.split("/").filter(p => p.length > 0);
        if (parts.length === 0) return false;

        const name = parts.pop()!;
        const parentPath = "/" + parts.join("/");
        const parent = this.getItemAtPath(parentPath);

        if (parent && parent.type === "directory" && parent.children && parent.children[name]) {
            delete parent.children[name];
            return true;
        }

        return false;
    }

    // Create a directory
    public mkdir(path: string): boolean {
        const parts = path.split("/").filter(p => p.length > 0);
        let currentDir = this.root;

        for (const part of parts) {
            if (!currentDir.children) currentDir.children = {};

            if (!currentDir.children[part]) {
                currentDir.children[part] = {
                    type: "directory",
                    name: part,
                    children: {},
                };
            }

            currentDir = currentDir.children[part];
            if (currentDir.type !== "directory") return false;
        }

        return true;
    }

    // Get an item (file or directory) at a specific path
    private getItemAtPath(path: string): FileSystemItem | null {
        if (path === "/" || path === "") return this.root;

        const parts = path.split("/").filter(p => p.length > 0);
        let current: FileSystemItem = this.root;

        for (const part of parts) {
            if (!current.children || !current.children[part]) {
                return null;
            }
            current = current.children[part];
        }

        return current;
    }

    // Get the entire file system (for debugging)
    public getFileSystem(): FileSystemItem {
        return this.root;
    }
}
