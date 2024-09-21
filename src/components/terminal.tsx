"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import * as git from "isomorphic-git";
import LightningFS from "@isomorphic-git/lightning-fs";
import "xterm/css/xterm.css";

interface GitTerminalProps {
  onCommandSuccess: () => void;
}

export function GitTerminal({
  onCommandSuccess,
}: GitTerminalProps): React.ReactElement {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [fs, setFs] = useState<LightningFS | null>(null);
  const [currentDir, setCurrentDir] = useState<string>("/");

  useEffect(() => {
    const fs = new LightningFS("fs");
    setFs(fs);

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#1E1E1E",
      },
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    if (terminalRef.current) {
      term.open(terminalRef.current);
      // Delay the fitAddon.fit() call to ensure the terminal is fully rendered
      setTimeout(() => {
        fitAddon.fit();
      }, 0);
    }

    term.writeln("Welcome to the Git terminal simulator!");
    term.writeln("Type your Git commands below:");
    term.write("\r\n$ ");

    term.onKey(
      ({ key, domEvent }: { key: string; domEvent: KeyboardEvent }) => {
        const printable =
          !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.keyCode === 13) {
          const line = term.buffer.active.getLine(term.buffer.active.cursorY);
          if (line) {
            const command = line.translateToString().replace(/^\$\s*/, "");
            executeCommand(command, term, fs);
          }
        } else if (printable) {
          term.write(key);
        }
      },
    );

    return () => {
      term.dispose();
    };
  }, []);

  const executeCommand = async (
    command: string,
    term: Terminal,
    fs: LightningFS | null,
  ) => {
    term.writeln("");
    const [cmd, ...args] = command.split(" ");

    try {
      switch (cmd) {
        case "git":
          await handleGitCommand(args, term, fs);
          break;
        case "cd":
          handleCdCommand(args[0], term);
          break;
        case "ls":
          await handleLsCommand(term, fs);
          break;
        case "pwd":
          term.writeln(currentDir);
          break;
        default:
          term.writeln(`Command not found: ${cmd}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        term.writeln(`Error: ${error.message}`);
      } else {
        term.writeln("An unknown error occurred");
      }
    }

    term.write("\r\n$ ");
  };

  const handleGitCommand = async (
    args: string[],
    term: Terminal,
    fs: LightningFS | null,
  ) => {
    if (!fs) return;

    const [subcommand, ...subargs] = args;

    switch (subcommand) {
      case "init":
        await git.init({ fs, dir: currentDir });
        term.writeln("Initialized empty Git repository");
        onCommandSuccess();
        break;
      case "status":
        const status = await git.status({ fs, dir: currentDir, filepath: "." });
        term.writeln(JSON.stringify(status, null, 2));
        break;
      case "add":
        await git.add({ fs, dir: currentDir, filepath: subargs[0] ?? "." });
        term.writeln(`Added ${subargs[0]} to staging area`);
        onCommandSuccess();
        break;
      case "commit":
        if (subargs[0] === "-m") {
          await git.commit({
            fs,
            dir: currentDir,
            message: subargs[1],
            author: { name: "User", email: "user@example.com" },
          });
          term.writeln(`Created commit with message: ${subargs[1]}`);
          onCommandSuccess();
        } else {
          term.writeln('Usage: git commit -m "commit message"');
        }
        break;
      default:
        term.writeln(`Git subcommand not implemented: ${subcommand}`);
    }
  };

  const handleCdCommand = (dir: string | undefined, term: Terminal) => {
    if (dir === "..") {
      const newDir = currentDir.split("/").slice(0, -1).join("/") || "/";
      setCurrentDir(newDir);
      term.writeln(`Changed directory to ${newDir}`);
    } else {
      const newDir = `${currentDir === "/" ? "" : currentDir}/${dir}`;
      setCurrentDir(newDir);
      term.writeln(`Changed directory to ${newDir}`);
    }
  };

  const handleLsCommand = async (term: Terminal, fs: LightningFS | null) => {
    if (!fs) return;
    const files = await fs.promises.readdir(currentDir);
    term.writeln(files.join("  "));
  };

  return <div ref={terminalRef} style={{ height: "400px" }} />;
}
