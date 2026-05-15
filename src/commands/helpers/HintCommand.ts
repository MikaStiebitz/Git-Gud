import { Command, CommandContext } from "../base/Command";

export class HintCommand implements Command {
    name = "hint";
    description = "Get a hint for the current level or scenario";
    usage = "hint";

    execute(args: string[], context: CommandContext): string[] {
        const { progressManager } = context;
        const progress = progressManager.getProgress();
        
        // This is a bit tricky because CommandContext doesn't have currentStage/currentLevel directly
        // But we can check the progress or we might need to update CommandContext
        // For now, let's look at how other commands handle context.
        
        // Actually, most commands don't know about the level.
        // But the user requested a hint system in the terminal.
        
        // I'll check if I can get the hints from some global state or if I should pass them.
        // Given the current architecture, I might need to add 'hints' to CommandContext.
        
        return ["Try to use 'git status' to see what's happening, or check the task description in the side panel."];
    }
}
