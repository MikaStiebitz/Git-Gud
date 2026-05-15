// src/commands/index.ts
import { CommandRegistry } from "./base/CommandRegistry";

// Git Basic Commands
import { InitCommand } from "./git/InitCommand";
import { StatusCommand } from "./git/StatusCommand";
import { AddCommand } from "./git/AddCommand";
import { CommitCommand } from "./git/CommitCommand";

// Git Branch Commands
import { BranchCommand } from "./git/BranchCommand";
import { CheckoutCommand } from "./git/CheckoutCommand";
import { SwitchCommand } from "./git/SwitchCommand";
import { MergeCommand } from "./git/MergeCommand";

// Git File Operations
import { MvCommand } from "./git/MvCommand";
import { RmCommand as GitRmCommand } from "./git/RmCommand";
import { RestoreCommand } from "./git/RestoreCommand";

// Git History Commands
import { LogCommand } from "./git/LogCommand";
import { DiffCommand } from "./git/DiffCommand";
import { ShowCommand } from "./git/ShowCommand";
import { ResetCommand } from "./git/ResetCommand";
import { RevertCommand } from "./git/RevertCommand";

// Git Advanced Commands
import { RebaseCommand } from "./git/RebaseCommand";
import { StashCommand } from "./git/StashCommand";
import { CherryPickCommand } from "./git/CherryPickCommand";
import { RemoteCommand } from "./git/RemoteCommand";
import { PushCommand } from "./git/PushCommand";
import { PullCommand } from "./git/PullCommand";
import { GitHelpCommand } from "./git/HelpCommand";
import { CloneCommand } from "./git/CloneCommand";
import { BisectCommand } from "./git/BisectCommand";
import { TagCommand } from "./git/TagCommand";
import { BlameCommand } from "./git/BlameCommand";
import { ReflogCommand } from "./git/ReflogCommand";
import { GudCommand } from "./git/GudCommand";

// File System Commands
import { LsCommand } from "./filesystem/LsCommand";
import { CdCommand } from "./filesystem/CdCommand";
import { CatCommand } from "./filesystem/CatCommand";
import { NanoCommand } from "./filesystem/NanoCommand";
import { TouchCommand } from "./filesystem/TouchCommand";
import { MkdirCommand } from "./filesystem/MkdirCommand";
import { RmCommand } from "./filesystem/RmCommand";
import { PwdCommand } from "./filesystem/PwdCommand";
import { LaCommand } from "./filesystem/LaCommand";
import { LlCommand } from "./filesystem/LlCommand";

// Helper Commands
import { HelpCommand } from "./helpers/HelpCommand";
import { ClearCommand } from "./helpers/ClearCommand";
import { NextCommand } from "./helpers/NextCommand";
import { HintCommand } from "./helpers/HintCommand";

// Create a central registry for all commands
const registry = new CommandRegistry();

// Register Git Basic Commands
registry.register(new InitCommand());
registry.register(new StatusCommand());
registry.register(new AddCommand());
registry.register(new CommitCommand());

// Register Git Branch Commands
registry.register(new BranchCommand());
registry.register(new CheckoutCommand());
registry.register(new SwitchCommand());
registry.register(new MergeCommand());

// Register Git File Operations
registry.register(new MvCommand());
registry.register(new GitRmCommand());
registry.register(new RestoreCommand());

// Register Git History Commands
registry.register(new LogCommand());
registry.register(new DiffCommand());
registry.register(new ShowCommand());
registry.register(new ResetCommand());
registry.register(new RevertCommand());

// Register Git Advanced Commands
registry.register(new RebaseCommand());
registry.register(new StashCommand());
registry.register(new CherryPickCommand());
registry.register(new RemoteCommand());
registry.register(new PushCommand());
registry.register(new PullCommand());
registry.register(new GitHelpCommand());
registry.register(new CloneCommand());
registry.register(new BisectCommand());
registry.register(new TagCommand());
registry.register(new BlameCommand());
registry.register(new ReflogCommand());
registry.register(new GudCommand()); // Easter egg! 🎮

// Register File System Commands
registry.register(new LsCommand());
registry.register(new CdCommand());
registry.register(new CatCommand());
registry.register(new NanoCommand());
registry.register(new TouchCommand());
registry.register(new MkdirCommand());
registry.register(new RmCommand());
registry.register(new PwdCommand());
registry.register(new LaCommand());
registry.register(new LlCommand());

// Register Helper Commands
registry.register(new HelpCommand());
registry.register(new ClearCommand());
registry.register(new NextCommand());
registry.register(new HintCommand());

// Export the registry for use in other modules
export default registry;
