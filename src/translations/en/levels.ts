const levels = {
    // Level Page
    "level.gitTerminal": "Git Terminal",
    "level.currentChallenge": "Current Challenge",
    "level.objectives": "Objectives:",
    "level.showHints": "Show Hints",
    "level.hideHints": "Hide Hints",
    "level.nextLevel": "Next Level",
    "level.filesToEdit": "Files to Edit:",
    "level.workingTreeClean": "Working tree clean",
    "level.staged": "staged",
    "level.modified": "modified",
    "level.untracked": "untracked",
    "level.gitNotInitialized": "Git is not initialized yet",
    "level.branch": "Branch",
    "level.gitStatus": "Git Status",
    "level.advancedOptions": "Advanced Options",
    "level.hideAdvancedOptions": "Hide Advanced Options",
    "level.resetLevel": "Reset Level",
    "level.resetAllProgress": "Reset All Progress",
    "level.resetConfirm": "Are you sure you want to reset all your progress?",
    "level.resetOptions": "Reset Options",
    "level.resetDescription": "Choose what you want to reset:",
    "level.resetAllConfirm": "Are you sure you want to reset ALL your progress? This cannot be undone!",
    "level.level": "Level",
    "level.levelCompleted": "Level completed!",
    "level.realWorldContext": "Real-World Context",
    "level.task": "Your Task",
    "level.startCoding": "Start Coding",
    "level.storyButton": "Show Story",
    "level.advancedModeOn": "Advanced Mode (On)",
    "level.advancedModeOff": "Advanced Mode (Off)",
    "level.notFound": "Level not found",
    "level.techModeOn": "Focus on Commands (Tech Mode)",
    "level.storyModeOn": "Show Story Context (Story Mode)",
    "level.techModeDescription":
        "Technical mode focuses on Git commands without stories or context for a faster, more direct experience.",
    "level.storyModeDescription":
        "Story mode provides real-world context and explanations to help understand why and how Git commands are used.",
    "level.editFile": "Edit file",
    "level.deleteFile": "Delete file",
    "level.confirmDelete": "Are you sure you want to delete {file}?",
    "level.hints": "Hints",

    // Level Content - Intro Stage
    "intro.name": "Introduction to Git",
    "intro.description": "Learn the basics of Git",

    "intro.level1.name": "Initialize Git",
    "intro.level1.description": "Create a new Git repository",
    "intro.level1.objective1": "Initialize a new repository",
    "intro.level1.hint1": "Use the `git init` command",
    "intro.level1.hint2": "This creates a hidden .git directory",
    "intro.level1.requirement1.description": "Initialize a Git repository",
    "intro.level1.requirement1.success": "Well done! You've created a Git repository.",
    "intro.level1.story.title": "Welcome to the Team",
    "intro.level1.story.narrative":
        "Welcome to your new job as a developer at TechStart! I'm Alex, your team lead.\n\nIt's your first day and we want to help you become productive quickly. We use Git for our version control - it helps us track changes in code and work together as a team.\n\nThe first thing you need to do is create a new repository for your onboarding project. We use the `git init` command for this.",
    "intro.level1.story.realWorldContext":
        "In real development teams, Git is essential. It's the first tool you set up for a new project.",
    "intro.level1.story.taskIntroduction": "Let's create a new repository for your project.",

    "intro.level2.name": "Repository Status",
    "intro.level2.description": "Check the status of your repository",
    "intro.level2.objective1": "Display the status of your repository",
    "intro.level2.hint1": "Use the `git status` command",
    "intro.level2.hint2": "This command shows the current status of your repository",
    "intro.level2.requirement1.description": "Show the repository status",
    "intro.level2.requirement1.success": "Perfect! Now you can see the status of your repository.",
    "intro.level2.story.title": "What's Happening in Your Repo?",
    "intro.level2.story.narrative":
        "Great! You've created your first Git repository. The hidden .git directory now contains all the information Git needs.\n\nAlex stops by: \"Great job! Next you should look at what's happening in your repository. With `git status` you can check the current state at any time.\"",
    "intro.level2.story.realWorldContext":
        "Developers run `git status` multiple times a day to see which files have been changed and which are ready for the next commit.",
    "intro.level2.story.taskIntroduction": "Check the status of your repository with `git status`.",

    "intro.level3.name": "Cloning Repositories",
    "intro.level3.description": "Learn to clone existing repositories",
    "intro.level3.objective1": "Clone a remote repository",
    "intro.level3.objective2": "Navigate into the cloned repository",
    "intro.level3.hint1": "Use the `git clone <url>` command",
    "intro.level3.hint2": "After cloning, use `cd` to navigate into the repository folder",
    "intro.level3.hint3": "The repository URL can be any valid Git repository URL",
    "intro.level3.requirement1.description": "Clone a remote repository",
    "intro.level3.requirement1.success": "Great! You've cloned the repository.",
    "intro.level3.requirement2.description": "Navigate into the cloned repository using cd",
    "intro.level3.requirement2.success": "Perfect! You're now inside the cloned repository.",
    "intro.level3.story.title": "Joining an Existing Project",
    "intro.level3.story.narrative":
        "Your first week at TechStart is going great! Alex calls you over with exciting news.\n\n\"We have a team project that needs your help,\" he says. \"The codebase is already on our Git server. You'll need to clone it to your local machine to start working on it.\"\n\nHe explains: \"When you join an existing project, you don't start from scratch. Instead, you clone the remote repository, which creates a complete copy on your machine—including all the code, history, and branches.\"\n\n\"Think of it like checking out a book from the library, except you get the entire library's records too! Use `git clone <repository-url>` to get started.\"\n\n\"Once cloned, you can navigate into the project folder with `cd <folder-name>` and start working immediately. All the project's history and changes are available to you.\"",
    "intro.level3.story.realWorldContext":
        "Cloning is how developers join existing projects. Whether contributing to open source or joining a new team, git clone is typically the first command you run.",
    "intro.level3.story.taskIntroduction": "Clone a repository and navigate into it to start working on the project.",

    // Level Content - Files Stage
    "files.name": "File Operations",
    "files.description": "Learn how to manage files with Git",

    "files.level1.name": "Staging Changes",
    "files.level1.description": "Add files to the staging area",
    "files.level1.objective1": "Add all files to the staging area",
    "files.level1.hint1": "Use the `git add .` command",
    "files.level1.hint2": "The dot represents 'all files in the current directory'",
    "files.level1.requirement1.description": "Add all files to the staging area",
    "files.level1.requirement1.success": "Great! You've added all files to the staging area.",
    "files.level1.story.title": "Preparing Code Changes",
    "files.level1.story.narrative":
        '"Hey!" calls Sarah, your colleague, "I see you\'ve already started with Git. Next you should learn how to stage changes."\n\nShe explains: "When you modify files, you need to explicitly tell Git which changes should be included in the next commit. This is called \'staging\' and works with `git add`."',
    "files.level1.story.realWorldContext":
        "The staging concept is a powerful feature of Git. It allows you to commit only selected changes while others can remain in progress.",
    "files.level1.story.taskIntroduction": "Add all files to the staging area with `git add .`.",

    "files.level2.name": "Committing Changes",
    "files.level2.description": "Create a commit with your changes",
    "files.level2.objective1": "Create a commit with a message",
    "files.level2.hint1": "Use the `git commit -m 'Your message'` command",
    "files.level2.hint2": "The message should describe your changes",
    "files.level2.requirement1.description": "Create a commit with a message",
    "files.level2.requirement1.success": "Excellent! You've successfully created a commit.",
    "files.level2.story.title": "Your First Commit",
    "files.level2.story.narrative":
        '"Great job!" says Alex when he sees your progress. "You\'ve added changes to the staging area. Now it\'s time for your first commit."\n\nHe explains: "A commit is like a snapshot of your project at a specific point in time. Each commit needs a message that describes what was changed. This is important for traceability."',
    "files.level2.story.realWorldContext":
        "Good commit messages are extremely important in development teams. They help everyone understand why a change was made, not just what was changed.",
    "files.level2.story.taskIntroduction": "Create your first commit with a meaningful message.",

    "files.level3.name": "Removing Files",
    "files.level3.description": "Learn how to remove files from Git",
    "files.level3.objective1": "Remove a file from both the working directory and the index",
    "files.level3.hint1": "Use the `git rm <file>` command",
    "files.level3.hint2": "This removes the file from Git and also deletes it from your working directory",
    "files.level3.requirement1.description": "Remove a file using Git",
    "files.level3.requirement1.success": "Well done! You've removed the file from Git and your working directory.",
    "files.level3.story.title": "Cleaning Up",
    "files.level3.story.narrative":
        '"I see you\'ve been making good progress," says Alex as he reviews your work. "But I notice there are some temporary files or drafts we don\'t need anymore. We should clean up the repository."\n\nHe explains: "When you want to remove files that are tracked by Git, you should use `git rm` rather than just deleting them manually. This ensures Git properly tracks the deletion."',
    "files.level3.story.realWorldContext":
        "Keeping repositories clean by removing unnecessary files is a best practice. The `git rm` command ensures Git tracks the file deletion.",
    "files.level3.story.taskIntroduction": "Remove the unnecessary file from the repository using `git rm`.",

    // Level Content - Branches Stage
    "branches.name": "Working with Branches",
    "branches.description": "Learn how to work with branches",

    "branches.level1.name": "View Branches",
    "branches.level1.description": "Display all branches in your repository",
    "branches.level1.objective1": "Display all existing branches",
    "branches.level1.hint1": "Use the `git branch` command",
    "branches.level1.hint2": "This shows all local branches",
    "branches.level1.requirement1.description": "Show all branches",
    "branches.level1.requirement1.success": "Very good! Now you can see all branches in your repository.",
    "branches.level1.story.title": "Code Branches",
    "branches.level1.story.narrative":
        '"Time for something more advanced," says Alex and he draws a tree with branches on a whiteboard. "These branches are like Git branches. They allow you to work on different versions of your code simultaneously."\n\nHe continues: "Currently you\'re working on the \'main\' branch. Let\'s first check which branches we have."',
    "branches.level1.story.realWorldContext":
        "Branches are a fundamental concept in Git. They enable parallel development, feature isolation, and experimental work without affecting the main code.",
    "branches.level1.story.taskIntroduction": "Display all existing branches with git branch.",

    "branches.level2.name": "Create and Switch to Branch",
    "branches.level2.description": "Create a new branch and switch to it",
    "branches.level2.objective1": "Create a new branch named 'feature' and switch to it",
    "branches.level2.hint1": "Use the `git switch -c feature` command",
    "branches.level2.hint2": "The -c flag creates a new branch and switches to it in one step",
    "branches.level2.requirement1.description": "Create a new branch and switch to it using git switch -c",
    "branches.level2.requirement1.success":
        "Excellent! You've created a new branch and switched to it using the modern git switch command.",
    "branches.level2.story.title": "Modern Branch Creation",
    "branches.level2.story.narrative":
        "\"Perfect! Now we want to implement a new feature,\" says Alex. \"For this, we'll create a new branch called 'feature' so our changes don't affect the main code.\"\n\nHe shows you the modern approach: \"Git introduced the `git switch` command to make branch operations clearer. Use `git switch -c feature` to create and switch to the new branch in one step. This is the preferred modern way instead of the older `git checkout -b`.\"",
    "branches.level2.story.realWorldContext":
        "In professional development teams, you almost never work directly on the main branch. The `git switch` command, introduced in Git 2.23, provides a cleaner, more intuitive way to work with branches compared to the older checkout command.",
    "branches.level2.story.taskIntroduction":
        "Create a new branch named 'feature' and switch to it using `git switch -c`.",

    "branches.level3.name": "Switch Between Branches",
    "branches.level3.description": "Switch between existing branches",
    "branches.level3.objective1": "Switch between branches",
    "branches.level3.hint1": "Use the `git switch <branch>` command",
    "branches.level3.hint2": "This switches to an existing branch",
    "branches.level3.requirement1.description": "Switch to another branch using git switch",
    "branches.level3.requirement1.success": "Great job! You've switched between branches using git switch.",
    "branches.level3.story.title": "Branch Navigation",
    "branches.level3.story.narrative":
        "\"Now that you know how to create branches, let's practice moving between them,\" says Sarah. \"This is something you'll do constantly in real development work.\"\n\nShe explains: \"You can switch to any existing branch using `git switch <branch-name>`. This is much clearer than the old `git checkout` which could be confusing because it did many different things.\"",
    "branches.level3.story.realWorldContext":
        "Switching between branches is one of the most common Git operations. The dedicated `git switch` command makes the intent clear and reduces confusion compared to the multipurpose checkout command.",
    "branches.level3.story.taskIntroduction": "Practice switching to another branch using `git switch`.",

    "branches.level4.name": "Switch Branches with Checkout",
    "branches.level4.description": "Learn the classic command for switching branches",
    "branches.level4.objective1": "Switch to another branch with the classic command",
    "branches.level4.hint1": "Use the command `git checkout <branch-name>`",
    "branches.level4.hint2": "checkout is the older command for switching branches",
    "branches.level4.requirement1.description": "Switch to another branch using git checkout",
    "branches.level4.requirement1.success": "Great! You now know both ways to switch branches.",
    "branches.level4.story.title": "The Classic Approach",
    "branches.level4.story.narrative":
        '"It\'s important to know git checkout too," Alex explains. "While git switch is the modern way, you\'ll see checkout in older projects, tutorials, and documentation all the time."\n\nHe adds: "checkout can do many things - switch branches, restore files, and more. That\'s why Git introduced switch and restore - to make intentions clearer."',
    "branches.level4.story.realWorldContext":
        "git checkout was THE command for branch operations for years. Many developers and tools still use it. Knowing both makes you more versatile across different projects and teams.",
    "branches.level4.story.taskIntroduction": "Switch to another branch using the classic git checkout command.",

    "branches.level5.name": "Create Branch with Switch",
    "branches.level5.description": "Create and switch to a new branch in one step",
    "branches.level5.objective1": "Create a new branch",
    "branches.level5.hint1": "Use the command `git switch -c <new-branch-name>`",
    "branches.level5.hint2": "The -c flag tells switch to create a new branch",
    "branches.level5.requirement1.description": "Create and switch to a new branch using git switch -c",
    "branches.level5.requirement1.success": "Perfect! You now master both methods of creating branches.",
    "branches.level5.story.title": "Quick Branch Creation",
    "branches.level5.story.narrative":
        '"Another handy trick," Sarah says. "You can use \'git switch -c\' to create a new branch and switch to it at the same time."\n\nShe explains: "This is the modern way in Git. The -c flag stands for \'create\' and does exactly the same as the older \'git checkout -b\', but it\'s clearer and more intuitive."',
    "branches.level5.story.realWorldContext":
        "The switch -c pattern is the modern, recommended method for creating and switching branches. It was introduced in Git 2.23 to separate branch operations from other checkout functions and make them more intuitive.",
    "branches.level5.story.taskIntroduction": "Create a new branch using git switch -c and automatically switch to it.",

    // Level Content - Merge Stage
    "merge.name": "Merging Branches",
    "merge.description": "Learn how to merge branches",

    "merge.level1.name": "Merging Feature Branch",
    "merge.level1.description": "Merge a feature branch into the development branch",
    "merge.level1.objective1": "Merge the 'feature/user-auth' branch into the 'develop' branch",
    "merge.level1.hint1": "You're already on the develop branch",
    "merge.level1.hint2": "Use `git merge feature/user-auth` to integrate the feature branch",
    "merge.level1.requirement1.description": "Merge the feature branch",
    "merge.level1.requirement1.success": "Excellent! The feature has been integrated into develop.",
    "merge.level1.story.title": "Code Review and Integration",
    "merge.level1.story.narrative":
        '"Your feature is done!", says Sarah, the team lead. "But before we push it to main, we need to merge it into the develop branch and test it."\n\nShe explains: "In professional teams, we never merge directly into main. First feature → develop for testing, then develop → main for production."',
    "merge.level1.story.realWorldContext":
        "🔍 Best Practice: Pull Requests\n\nIn real projects, you would now create a Pull Request (PR) or Merge Request (MR) on GitHub/GitLab:\n\n1️⃣ You push your feature branch\n\n2️⃣ You open a PR: feature/user-auth → develop\n\n3️⃣ Team members review your code\n\n4️⃣ After approval, the PR gets merged\n\nThis enables code reviews, discussions, and automatic tests before merging! 🚀",
    "merge.level1.story.taskIntroduction":
        "Merge the 'feature/user-auth' branch into the 'develop' branch (you're already on develop).",

    "merge.level2.name": "Production Deploy",
    "merge.level2.description": "Merge tested code into the main branch",
    "merge.level2.objective1": "Merge the 'develop' branch into the 'main' branch",
    "merge.level2.hint1": "You're already on the main branch",
    "merge.level2.hint2": "Use `git merge develop` to integrate the tested code",
    "merge.level2.requirement1.description": "Merge develop into main",
    "merge.level2.requirement1.success": "Perfect! The code is now in production.",
    "merge.level2.story.title": "Production Release",
    "merge.level2.story.narrative":
        '"Awesome! The feature runs perfectly on develop and all tests are green," says Sarah. "Now we can merge it into main and deploy."\n\nShe emphasizes: "main is our production branch. Only tested, stable code goes in here. That\'s why we tested on develop first!"',
    "merge.level2.story.realWorldContext":
        "Git Flow Workflow 🌊\n\n📦 main: Production-ready code\n\n🔧 develop: Integration and testing\n\n✨ feature/*: New features\n\nThis workflow prevents untested code from reaching production. Many teams also use release branches!",
    "merge.level2.story.taskIntroduction": "Merge the 'develop' branch into the 'main' branch.",

    "merge.level3.name": "Handling Merge Conflicts",
    "merge.level3.description": "Learn how to handle or abort merges with conflicts",
    "merge.level3.objective1": "Abort a merge with conflicts",
    "merge.level3.hint1": "Use the `git merge --abort` command",
    "merge.level3.hint2": "This will stop the merge process and return to the state before the merge began",
    "merge.level3.requirement1.description": "Abort a merge with conflicts",
    "merge.level3.requirement1.success": "Good job! You've successfully aborted the merge operation.",
    "merge.level3.story.title": "When Merges Go Wrong",
    "merge.level3.story.narrative":
        '"Sometimes merges don\'t go as planned," warns Sarah. "When the same part of a file has been changed differently in both branches, a merge conflict occurs."\n\nShe explains: "You have two options: Either you resolve the conflict manually, or you abort the merge with `git merge --abort` and prepare better."',
    "merge.level3.story.realWorldContext":
        "Merge conflicts are a common part of collaborative development. Knowing how to handle them—whether by resolving or temporarily aborting—is an essential skill.",
    "merge.level3.story.taskIntroduction": "Practice aborting a merge operation using git merge --abort.",

    // Stash Stage
    "stash.name": "Git Stash",
    "stash.description": "Learn to temporarily save your changes",

    "stash.level1.name": "Stash Your Work",
    "stash.level1.description": "Learn to temporarily save changes and switch between branches",
    "stash.level1.objective1": "Save your work-in-progress changes",
    "stash.level1.objective2": "Switch to the hotfix branch to handle urgent issue",
    "stash.level1.objective3": "Return to feature branch to continue your work",
    "stash.level1.objective4": "Restore your stashed changes",
    "stash.level1.hint1": "Use 'git stash' to temporarily save your changes",
    "stash.level1.hint2": "Switch branches with 'git switch <branch-name>' or 'git checkout <branch-name>'",
    "stash.level1.hint3": "Bring back your changes with 'git stash pop'",
    "stash.level1.hint4": "Check the stash list with 'git stash list'",
    "stash.level1.requirement1.description": "Stash your work-in-progress changes",
    "stash.level1.requirement1.success": "✅ Great! Your changes are safely stashed away!",
    "stash.level1.requirement2.description": "Switch to the hotfix branch",
    "stash.level1.requirement2.success": "✅ Perfect! You're on the hotfix branch now.",
    "stash.level1.requirement3.description": "Return to the feature branch",
    "stash.level1.requirement3.success": "✅ Good! Back to the feature branch.",
    "stash.level1.requirement4.description": "Restore your stashed changes",
    "stash.level1.requirement4.success": "✅ Excellent! Your changes are restored!",
    "stash.level1.story.title": "Emergency Interrupt",
    "stash.level1.story.narrative":
        "You're deep in the zone, working on a new feature. Your code is half-done, tests are broken, and suddenly... Slack explodes! 💥\n\n\"URGENT: Production is down! Need hotfix NOW!\" 🚨\n\nYou can't commit this mess, but you also can't leave it. What do you do?\n\n**Enter git stash** - your emergency save button! 🎯\n\nThink of it like pressing pause on a video game. Your work gets saved in a special place, your workspace becomes clean, and you can switch tasks. When you come back, just hit resume (git stash pop) and continue exactly where you left off!",
    "stash.level1.story.realWorldContext":
        "In real development, interruptions happen constantly. Product managers need 'quick changes', bugs appear in production, and teammates need urgent code reviews. Git stash is your survival tool for context switching without losing your flow.",
    "stash.level1.story.taskIntroduction":
        "Let's practice the stash workflow: save your work, handle the emergency, then resume!",

    "stash.level2.name": "Multi-Task Juggling",
    "stash.level2.description": "Master switching between multiple tasks using stash",
    "stash.level2.objective1": "Stash your current incomplete work",
    "stash.level2.objective2": "Switch to main branch to create new feature branch",
    "stash.level2.objective3": "Create a new feature branch",
    "stash.level2.objective4": "Return to your old task branch",
    "stash.level2.objective5": "Restore your stashed work",
    "stash.level2.hint1": "Start by stashing: git stash",
    "stash.level2.hint2": "Switch to main: git switch main (or git checkout main)",
    "stash.level2.hint3": "Create new branch: git switch -c feature/new-task (or git checkout -b feature/new-task)",
    "stash.level2.hint4": "Go back to old task: git switch feature/old-task",
    "stash.level2.hint5": "Restore work: git stash pop",
    "stash.level2.requirement1.description": "Stash your incomplete work",
    "stash.level2.requirement1.success": "✅ Work stashed! Ready to switch tasks.",
    "stash.level2.requirement2.description": "Switch to main branch",
    "stash.level2.requirement2.success": "✅ On main branch now.",
    "stash.level2.requirement3.description": "Create feature/new-task branch",
    "stash.level2.requirement3.success": "✅ New branch created!",
    "stash.level2.requirement4.description": "Return to feature/old-task",
    "stash.level2.requirement4.success": "✅ Back to your old task.",
    "stash.level2.requirement5.description": "Restore your stashed work",
    "stash.level2.requirement5.success": "✅ Perfect! Work restored!",
    "stash.level2.story.title": "Multi-Tasking Master",
    "stash.level2.story.narrative":
        '"Hey, can you quickly work on this new feature request?", your Product Owner asks.\n\nYou\'re in the middle of another task. Previously you\'d have to commit everything or lose changes.\n\n"Stash is perfect for this," explains your Senior Developer Marc. "Save your current work, create a new branch for the new task, and later just retrieve the old work."',
    "stash.level2.story.realWorldContext":
        "**Stash in Team Life**\n\nDevelopers often juggle multiple tasks:\n\n- Sprint Planning changes priorities\n- Urgent bugs interrupt features\n- Code reviews require context switches\n- Meetings interrupt flow\n\n**Git Stash makes context-switching painless!**\n\nWithout Stash you'd have to either:\n- Commit unfinished code (bad for history)\n- Discard changes (work lost)\n- Stay in dirty state (can't switch)\n\nWith Stash: Save, switch, work, return - all clean! ✨",
    "stash.level2.story.taskIntroduction":
        "Stash your work, switch to main, create new branch, return to old task and retrieve your work.",

    "stash.level3.name": "Managing Stashes",
    "stash.level3.description": "Learn to list and manage stash entries",
    "stash.level3.objective1": "View all stashed changes",
    "stash.level3.objective2": "Restore the most recent stash",
    "stash.level3.hint1": "Use 'git stash list' to see all stashes",
    "stash.level3.hint2": "Retrieve stash with 'git stash pop'",
    "stash.level3.hint3": "Stashes are stored like a stack (LIFO - Last In, First Out)",
    "stash.level3.requirement1.description": "List all stash entries",
    "stash.level3.requirement1.success": "✅ Stashes displayed!",
    "stash.level3.requirement2.description": "Retrieve latest stash",
    "stash.level3.requirement2.success": "✅ Stash restored!",
    "stash.level3.story.title": "Stash Organization",
    "stash.level3.story.narrative":
        '"Wait, where did I stash those changes again?", you wonder.\n\n"Use `git stash list`," says Lisa. "It shows all saved stashes. With `git stash pop` you retrieve the latest and remove it from the stash."\n\nShe continues: "There\'s also `git stash apply` - it applies the stash but keeps it. Useful when you need the same changes multiple times!"',
    "stash.level3.story.realWorldContext":
        "**Stash Management Commands**\n\n`git stash list` - Shows all stashes\n\n`git stash pop` - Applies and deletes stash\n\n`git stash apply` - Applies stash, keeps it\n\n`git stash drop` - Deletes a stash\n\n`git stash clear` - Deletes all stashes\n\n**Pro Tip**: Name your stashes with `git stash push -m \"WIP: Feature X\"` - makes the list more organized!",
    "stash.level3.story.taskIntroduction": "List your stashes and retrieve the latest one.",

    // Remote Stage
    "remote.name": "Remote Repositories",
    "remote.description": "Learn to work with remote repositories",

    // Remote Level 1
    "remote.level1.name": "Adding Remotes",
    "remote.level1.description": "Connect to a remote repository",
    "remote.level1.objective1": "Add a remote repository",
    "remote.level1.hint1": "Use the `git remote add <name> <url>` command",
    "remote.level1.hint2": "The convention is to name your main remote 'origin'",
    "remote.level1.requirement1.description": "Add a remote repository",
    "remote.level1.requirement1.success": "Excellent! You've added a remote repository.",
    "remote.level1.story.title": "Connecting Repositories",
    "remote.level1.story.narrative":
        '"Great progress so far! Now it\'s time to connect your local repository to a remote one," says Alex. "This will allow you to share your code with the team and collaborate effectively."\n\nHe explains: "The first step is to add a connection to the remote repository using `git remote add`. This doesn\'t transfer any code yet—it just creates the connection."',
    "remote.level1.story.realWorldContext":
        "Remote repositories are central to collaborative development workflows. Most Git-based systems like GitHub, GitLab, and Bitbucket work by hosting remote repositories that team members connect to.",
    "remote.level1.story.taskIntroduction": "Add a remote named 'origin' to your repository.",

    // Remote Level 2
    "remote.level2.name": "Pushing Commits to Remote",
    "remote.level2.description": "Learn when and how to upload your commits",
    "remote.level2.objective1": "Push your local commits to the remote repository",
    "remote.level2.objective2": "Understand the difference between local commit and remote push",
    "remote.level2.hint1": "Use `git push origin main` to push to the main branch",
    "remote.level2.hint2":
        "IMPORTANT: Push AFTER you've made a commit! Push uploads your commits, not individual files.",
    "remote.level2.hint3": "Tip: Use `git log` to see what commits you have",
    "remote.level2.requirement1.description": "Push your commits to the remote",
    "remote.level2.requirement1.success": "Perfect! Your commits are now available in the remote repository.",
    "remote.level2.story.title": "From Local to Remote Repository",
    "remote.level2.story.narrative":
        '"Let me show you how the Git workflow works," Alex says, drawing a diagram:\n\n1️⃣ You change files (Working Directory)\n2️⃣ You stage them with `git add` (Staging Area)\n3️⃣ You commit them with `git commit` (Local Repository)\n4️⃣ You push with `git push` (Remote Repository)\n\n"Important to understand: git push uploads your COMMITS, not individual files! You must make a commit before you can push. Your local commits only exist on your computer until you push them."',
    "remote.level2.story.realWorldContext":
        "The difference between local and remote repository is fundamental: Local commits only exist on your machine. Only through git push do they become visible to your team. This means: You can make as many local commits as you want and then push them all at once!",
    "remote.level2.story.taskIntroduction":
        "You've already made a commit. Now push this commit to the remote repository using `git push origin main`.",

    "remote.level3.name": "Push Feature Branch",
    "remote.level3.description": "Push a feature branch to the remote repository",
    "remote.level3.objective1": "Push your feature branch with all its commits",
    "remote.level3.hint1": "Use `git push origin <branch-name>`",
    "remote.level3.hint2": "You can also use `git push -u origin <branch-name>` to set the upstream",
    "remote.level3.requirement1.description": "Push a feature branch to the remote",
    "remote.level3.requirement1.success": "Excellent! Your feature branch is now available in the remote repository.",
    "remote.level3.story.title": "Sharing Features",
    "remote.level3.story.narrative":
        '"You\'ve been working on a great new feature on a separate branch," Sarah says. "Now it\'s time to push this branch to the remote repository so other team members can see and review your work."\n\nShe explains: "When pushing a branch for the first time, you should use the -u (or --set-upstream) option. This links your local branch with the remote branch, making future pushes and pulls easier."',
    "remote.level3.story.realWorldContext":
        "In professional teams, new features are typically developed on separate branches and then pushed for review before being merged into the main codebase. This is a central part of the pull request workflow.",
    "remote.level3.story.taskIntroduction": "Push your feature branch to the remote repository so others can see it.",

    // Reset Stage
    "reset.name": "Undoing Commits",
    "reset.description": "Learn how to undo commits and go back in history",

    "reset.level1.name": "Soft Reset - Keep Changes",
    "reset.level1.description": "Go back to a previous commit but keep your changes",
    "reset.level1.objective1": "Undo the last commit while keeping changes staged",
    "reset.level1.objective2": "Reset to HEAD (current commit) to understand the concept",
    "reset.level1.objective3": "Reset to a specific previous commit using HEAD~n notation",
    "reset.level1.hint1": "Start simple: `git reset --soft HEAD~1` (undo last commit)",
    "reset.level1.hint2": "View commit history first: `git log --oneline`",
    "reset.level1.hint3": "`git reset --soft HEAD` keeps everything as is (no change)",
    "reset.level1.hint4": "`git reset --soft HEAD~2` goes back 2 commits",
    "reset.level1.hint5": "Files stay staged after --soft reset - perfect for fixing commit messages!",
    "reset.level1.hint6": "Use `git status` to see what's staged after reset",
    "reset.level1.requirement1.description": "Undo the last commit using --soft",
    "reset.level1.requirement1.success": "✅ Good! The commit is gone but files are still staged!",
    "reset.level1.requirement2.description": "Reset to HEAD to understand the concept",
    "reset.level1.requirement2.success": "✅ Perfect! Reset to HEAD means 'stay where you are' - no changes!",
    "reset.level1.requirement3.description": "Reset to an earlier commit using HEAD~n",
    "reset.level1.requirement3.success": "✅ Excellent! You've mastered HEAD~n notation for soft resets!",
    "reset.level1.story.title": "Understanding git reset --soft",
    "reset.level1.story.narrative":
        `🔄 **Understanding git reset --soft**

**The Situation:**
You're working on a feature and made 5 commits. But looking back, you realize:
- Commit 5: "Add database config" - Oops! This has sensitive credentials! 🔐
- Commit 4: "Update API endpoints" - This is good ✅
- Commit 3: "Add authentication" - Good ✅
- Commit 2: "Setup routing" - Good ✅
- Commit 1: "Initial project setup" - Good ✅

You need to undo commit 5, fix it, and commit again properly!

**What is git reset --soft?**
Think of Git commits like a stack of boxes 📦📦📦. Each box is a commit.

\`git reset --soft\` removes boxes from the top of the stack, BUT keeps all the items (your changes) on a staging table, ready to be packed into a new box!

**Three Ways to Use git reset --soft:**

**1. Reset to the previous commit (most common):**
\`git reset --soft HEAD~1\`
- HEAD = "where you are now" (the top box)
- ~1 = "go back 1 box"
- Result: Last commit removed, but changes stay staged!

**2. Reset to HEAD (educational - does nothing):**
\`git reset --soft HEAD\`
- This means "reset to where I already am"
- Nothing happens! Good for understanding the concept.

**3. Reset to an older commit:**
\`git reset --soft HEAD~3\`
- Goes back 3 commits
- All changes from those 3 commits stay staged
- Perfect for combining multiple commits into one!

**Your Mission:**

**Step 1:** Remove the last commit (the one with credentials)
\`git reset --soft HEAD~1\`
Check with \`git status\` - your files are still staged! ✨

**Step 2:** Try resetting to HEAD (educational)
\`git reset --soft HEAD\`
Notice: Nothing changed! You're already at HEAD.

**Step 3:** Go back further to practice
\`git reset --soft HEAD~2\`
Now you've removed 2 commits, but files are still staged!

**Remember:**
- 📦 Commits are removed from history
- ✅ Files stay in staging area
- 🎯 Perfect for fixing commit messages or combining commits
- ⚠️  Only use on commits you haven't pushed yet!

Let's practice these three techniques! 🚀`,
    "reset.level1.story.realWorldContext":
        "git reset --soft is super useful when you want to fix your last commit without losing the work. You can edit the changes and then commit again.",
    "reset.level1.story.taskIntroduction": "Practice using git reset --soft with different targets: HEAD~1, HEAD, and HEAD~2.",

    "reset.level2.name": "Hard Reset - Discard Everything",
    "reset.level2.description": "Go back to a previous commit and discard all changes",
    "reset.level2.objective1": "Completely discard the last buggy commit",
    "reset.level2.objective2": "Reset to HEAD to understand it does nothing",
    "reset.level2.objective3": "Jump back multiple commits and discard everything",
    "reset.level2.hint1": "⚠️  WARNING: --hard is DESTRUCTIVE! All changes are permanently lost!",
    "reset.level2.hint2": "Check what you'll lose first: git log --oneline",
    "reset.level2.hint3": "git reset --hard HEAD~1 removes last commit AND all changes",
    "reset.level2.hint4": "git reset --hard HEAD does nothing (already at HEAD)",
    "reset.level2.hint5": "git reset --hard HEAD~3 goes back 3 commits, deletes everything",
    "reset.level2.hint6": "Use this when you want to throw away bad code completely",
    "reset.level2.hint7": "💡 In real life: Only use --hard on code you haven't pushed!",
    "reset.level2.requirement1.description": "Discard the last commit using --hard",
    "reset.level2.requirement1.success": "💥 Commit and all changes destroyed! No going back!",
    "reset.level2.requirement2.description": "Reset to HEAD (educational - does nothing)",
    "reset.level2.requirement2.success": "✅ Nothing changed - you're already at HEAD!",
    "reset.level2.requirement3.description": "Discard multiple commits using --hard",
    "reset.level2.requirement3.success": "💥 Multiple commits destroyed! Workspace is clean again!",
    "reset.level2.story.title": "Understanding git reset --hard - THE NUCLEAR OPTION",
    "reset.level2.story.narrative":
        `⚠️  **Understanding git reset --hard - THE NUCLEAR OPTION**

**The Situation:**
It's Friday evening. You've been experimenting with a new feature all day:
- Commit 6: "Try experimental algorithm v3" - Completely broken! 💀
- Commit 5: "Try experimental algorithm v2" - Still broken! 🐛
- Commit 4: "Try experimental algorithm v1" - Nope! ❌
- Commit 3: "Add user dashboard" - This was working! ✅
- Commit 2: "Add user authentication" - Good ✅
- Commit 1: "Initial project" - Good ✅

You realize: These experiments are garbage. You want them GONE. Forever. 💣

**What is git reset --hard?**
Remember the boxes metaphor? 📦📦📦

\`git reset --soft\` removed boxes but kept the items on the staging table.

\`git reset --hard\` removes boxes AND throws all items in the trash! 🗑️

**⚠️  CRITICAL: This is DESTRUCTIVE and PERMANENT!**
- Commits are deleted from history
- ALL file changes are deleted
- Working directory is cleaned
- Staging area is cleared
- **THERE IS NO UNDO!**

**Three Ways to Use git reset --hard:**

**1. Destroy the last commit (most common):**
\`git reset --hard HEAD~1\`
- Removes the last commit
- Deletes all changes in that commit
- Working directory looks like the previous commit
- ⚠️  Changes are GONE FOREVER!

**2. Reset to HEAD (educational - does nothing):**
\`git reset --hard HEAD\`
- Means "make my workspace look like HEAD"
- Since you're already at HEAD, nothing changes
- Good for understanding: HEAD = current position

**3. Destroy multiple commits:**
\`git reset --hard HEAD~4\`
- Goes back 4 commits
- All 4 commits are DELETED from history
- All changes in those commits are DELETED
- It's like they never existed! 👻

**When to Use --hard:**
- ✅ Experiment failed, throw it away
- ✅ Broke everything, need to start over
- ✅ Committed secrets/passwords by accident
- ❌ NOT on commits you've already pushed!
- ❌ NOT if you might need the changes later!

**Your Mission:**

**Step 1:** Destroy the last broken commit
\`git reset --hard HEAD~1\`
Check with \`git status\` - workspace is clean! 🧹

**Step 2:** Try resetting to HEAD (safe practice)
\`git reset --hard HEAD\`
Nothing happens - you're already there!

**Step 3:** Destroy multiple failed experiments
\`git reset --hard HEAD~3\`
All 3 bad commits are gone! It's like Friday never happened! 😅

**Remember:**
- 💥 This is the NUCLEAR OPTION
- 🗑️  Everything is deleted - commits AND changes
- ⏪ Can't be undone (unless you have the commit hash)
- 🎯 Only use when you're 100% sure
- ⚠️  NEVER use on pushed commits!

**Fun Fact:** Professional developers say "I'm going hard reset on this" when they want to start over completely! 🔥

Ready to practice safe destruction? Let's go! 💪`,
    "reset.level2.story.realWorldContext":
        "--hard reset is a powerful but dangerous tool. It's used when you really need a clean slate. In teams, be careful with reset on pushed commits - it can confuse others.",
    "reset.level2.story.taskIntroduction": "Practice the nuclear option: use git reset --hard to completely discard commits and changes.",

    "reset.level3.name": "Reset to Specific Commit",
    "reset.level3.description": "Go back to a specific commit in history",
    "reset.level3.objective1": "View commit history and identify the good commit",
    "reset.level3.objective2": "Reset to a specific commit using its hash",
    "reset.level3.hint1": "First, check your commit history: git log --oneline",
    "reset.level3.hint2": "Each commit has a unique hash (like 'a1b2c3d')",
    "reset.level3.hint3": "git reset --soft <commit-hash> keeps changes staged",
    "reset.level3.hint4": "git reset --hard <commit-hash> destroys everything after that commit",
    "reset.level3.hint5": "Commit hashes are permanent IDs - HEAD~n is relative",
    "reset.level3.hint6": "Pro tip: You only need the first 7 characters of the hash!",
    "reset.level3.hint7": "Find 'Version 2 - Good version' and use its hash",
    "reset.level3.requirement1.description": "View commit history to identify the good commit",
    "reset.level3.requirement1.success": "✅ Good! Now you can see all commits and their hashes!",
    "reset.level3.requirement2.description": "Reset to a specific commit using its hash",
    "reset.level3.requirement2.success": "🎯 Perfect! You've mastered resetting to specific commit hashes!",
    "reset.level3.story.title": "Advanced Reset: Using Commit Hashes",
    "reset.level3.story.narrative":
        `🎯 **Advanced Reset: Using Commit Hashes**

**The Situation:**
Your project has grown. You're now at commit 8, but you need to go back to commit 3.

Using \`HEAD~5\` to count back 5 commits is annoying and error-prone. What if someone adds a commit while you're working? The count changes!

**The Professional Solution: Commit Hashes**

Every commit has a unique ID (hash), like a fingerprint:
\`a1b2c3d - "Version 2 - Good version"\`

This hash NEVER changes! It's permanent and unique.

**Current Situation:**
- Commit 8: "Attempted fix v3" - Still broken! 💔
- Commit 7: "Attempted fix v2" - Nope! 🐛
- Commit 6: "Attempted fix v1" - Failed! ❌
- Commit 5: "Add broken feature" - Started the mess 🔥
- Commit 4: "Update styling" - Cosmetic ✨
- Commit 3: "Version 2 - GOOD VERSION" - Last known good state! ✅
- Commit 2: "Version 1" - Initial version ✅
- Commit 1: "Initial commit" - Foundation ✅

**Your Mission:**

**Step 1: Find the Good Commit**
Run: \`git log --oneline\`

You'll see something like:
\`\`\`
f7e8a9b Attempted fix v3
d6c7b8a Attempted fix v2
c5b6a7f Attempted fix v1
b4a5c6e Add broken feature
a3b4c5d Update styling
9a2b3c4 Version 2 - Good version  ← THIS ONE!
8a1b2c3 Version 1
7a0b1c2 Initial commit
\`\`\`

**Step 2: Reset to That Commit**
\`git reset --soft 9a2b3c4\`
(Use the actual hash you see!)

OR (more destructive):
\`git reset --hard 9a2b3c4\`

**HEAD~n vs Commit Hash:**

**Relative (HEAD~n):**
- \`HEAD~1\` = "previous commit"
- \`HEAD~5\` = "5 commits ago"
- ❌ Changes if new commits are added
- ✅ Quick for recent commits

**Absolute (Commit Hash):**
- \`git reset --soft a1b2c3d\`
- ✅ Permanent reference
- ✅ Never changes
- ✅ Professional approach
- 🎯 Best for going back to specific known-good states

**Pro Tips:**
- Only need first 7 characters: \`9a2b3c4\` instead of full hash
- You can copy hashes from \`git log\`
- Hashes work with ANY git command: \`git show a1b2c3d\`
- Save important commit hashes in notes for easy rollback!

**Real-World Scenario:**
"Hey team, if the deploy breaks, rollback to commit 9a2b3c4 - that's our last stable version!"

**In CI/CD Systems:**
Production deploys often use commit hashes for precise version control:
\`\`\`
deploy.sh --commit=9a2b3c4
\`\`\`

Let's practice professional-grade Git! 🚀`,
    "reset.level3.story.realWorldContext":
        "Using commit hashes is the professional way to reference specific points in history. They're permanent, unambiguous, and work across all team members' repositories.",
    "reset.level3.story.taskIntroduction": "Use git log to find commit hashes, then use git reset with a specific hash.",

    // Rebase Stage
    "rebase.name": "Rebasing",
    "rebase.description": "Learn how to rebase branches",

    // Rebase Level 1
    "rebase.level1.name": "Basic Rebasing",
    "rebase.level1.description": "Apply commits from one branch onto another",
    "rebase.level1.objective1": "Rebase the current branch onto another branch",
    "rebase.level1.hint1": "You're on the feature branch - rebase it onto main with: git rebase main",
    "rebase.level1.hint2": "This rewrites history by applying your commits on top of main's latest commits",
    "rebase.level1.hint3": "Use 'git log --oneline' to see the commit history after rebasing",
    "rebase.level1.requirement1.description": "Rebase onto another branch",
    "rebase.level1.requirement1.success": "Great job! You've successfully rebased the branch.",
    "rebase.level1.story.title": "Creating a Clean History",
    "rebase.level1.story.narrative":
        '"I see you\'re getting comfortable with merging," says Sarah. "Now let\'s explore a different approach to integrating changes: rebasing."\n\nShe explains: "While merging combines histories, rebasing rewrites it by moving your commits to appear after the commits from another branch. This creates a more linear, cleaner history."',
    "rebase.level1.story.realWorldContext":
        "Rebasing is often preferred when you want to maintain a clean, linear project history. Many teams use it to integrate feature branches before merging them to the main branch.",
    "rebase.level1.story.taskIntroduction": "You're on the feature branch. Rebase it onto main using: git rebase main",

    // Rebase Level 2
    "rebase.level2.name": "Handling Rebase Conflicts",
    "rebase.level2.description": "Learn how to handle or abort rebases with conflicts",
    "rebase.level2.objective1": "Abort a rebase with conflicts",
    "rebase.level2.hint1": "Use the `git rebase --abort` command",
    "rebase.level2.hint2": "This will stop the rebase process and return to the state before the rebase began",
    "rebase.level2.requirement1.description": "Abort a rebase with conflicts",
    "rebase.level2.requirement1.success": "Excellent! You've successfully aborted the rebase operation.",
    "rebase.level2.story.title": "When Rebases Get Complicated",
    "rebase.level2.story.narrative":
        '"Just like merging, rebasing can lead to conflicts," Alex points out. "But resolving conflicts during a rebase can be more complex because Git applies each of your commits one by one."\n\nHe continues: "If you\'re in the middle of a rebase and decide it\'s too complex or you need to rethink your approach, you can always abort the process."',
    "rebase.level2.story.realWorldContext":
        "Knowing when and how to abort a rebase is important in real-world development. Sometimes the conflicts are too complex to resolve immediately, or you realize a different strategy would be better.",
    "rebase.level2.story.taskIntroduction": "Practice aborting a rebase operation using git rebase --abort.",

    // Rebase Level 3
    "rebase.level3.name": "Interactive Rebasing",
    "rebase.level3.description": "Learn how to use interactive rebasing to modify commit history",
    "rebase.level3.objective1": "Start an interactive rebase session",
    "rebase.level3.hint1": "Use the `git rebase -i` command",
    "rebase.level3.hint2": "Interactive rebasing allows you to reorder, edit, squash, or delete commits",
    "rebase.level3.requirement1.description": "Start an interactive rebase",
    "rebase.level3.requirement1.success": "Perfect! You've started an interactive rebase session.",
    "rebase.level3.story.title": "Cleaning Up History",
    "rebase.level3.story.narrative":
        '"Your feature is looking good," says Alex, reviewing your code. "But I notice you have several small commits with typo fixes and minor changes. Before we merge this to main, let\'s clean up the commit history."\n\nHe explains, "Git offers a powerful tool called interactive rebasing that lets you modify your commit history. You can combine small commits, reword commit messages, or even delete commits entirely."',
    "rebase.level3.story.realWorldContext":
        "Interactive rebasing is commonly used to create a clean, coherent commit history before merging feature branches. This makes the codebase history more readable and meaningful.",
    "rebase.level3.story.taskIntroduction": "Start an interactive rebase session to modify your commit history.",

    // Rebase Level 4
    "rebase.level4.name": "Rebasing onto Main",
    "rebase.level4.description": "Learn the workflow of rebasing feature branches onto updated main branches",
    "rebase.level4.objective1": "Rebase your feature branch onto the updated main branch",
    "rebase.level4.hint1": "Use `git rebase main` while on your feature branch",
    "rebase.level4.hint2": "This will apply your feature changes on top of the latest main branch changes",
    "rebase.level4.requirement1.description": "Rebase feature onto main",
    "rebase.level4.requirement1.success": "Excellent! You've rebased your feature branch onto the latest main branch.",
    "rebase.level4.story.title": "Staying Up to Date",
    "rebase.level4.story.narrative":
        '"I see that while you\'ve been working on your feature, someone else has pushed changes to the main branch," Sarah points out. "Before we merge your work, you should incorporate these latest changes."\n\nShe continues, "Instead of merging main into your branch, which creates a merge commit, I recommend rebasing your branch onto main. This keeps the history cleaner."',
    "rebase.level4.story.realWorldContext":
        "In collaborative environments, main branches are frequently updated. Rebasing feature branches onto main is a common workflow that helps avoid merge conflicts and keeps feature branches up to date.",
    "rebase.level4.story.taskIntroduction":
        "Rebase your feature branch onto the updated main branch to incorporate the latest changes.",

    // Advanced Stage
    "advanced.name": "Advanced Git Techniques",
    "advanced.description": "Master advanced Git features and workflows",

    // Advanced Level 1: Git Tags
    "advanced.level1.name": "Version Tagging",
    "advanced.level1.description": "Learn to mark important points in history with tags",
    "advanced.level1.objective1": "Create an annotated tag for a release",
    "advanced.level1.objective2": "List all tags in the repository",
    "advanced.level1.objective3": "Push tags to remote repository",
    "advanced.level1.hint1": "Create an annotated tag with: git tag -a v1.0.1 -m 'Bug fix release'",
    "advanced.level1.hint2": "List all tags with: git tag",
    "advanced.level1.hint3": "Annotated tags include author info and a message",
    "advanced.level1.hint4": "Tags are used to mark release points (v1.0, v2.0, etc.)",
    "advanced.level1.requirement1.description": "Create a version tag",
    "advanced.level1.requirement1.success": "Excellent! You've tagged this commit as a release point.",
    "advanced.level1.requirement2.description": "List all tags to see your new tag",
    "advanced.level1.requirement2.success": "Perfect! You can see all tags in the repository.",
    "advanced.level1.requirement3.description": "Push tags to the remote repository",
    "advanced.level1.requirement3.success": "Excellent! Your tags are now available to the team.",
    "advanced.level1.story.title": "Marking Milestones",
    "advanced.level1.story.narrative":
        "\"We're about to deploy version 1.0 to production,\" announces your team lead. \"Before we do, we need to tag this commit. Tags are like bookmarks in your Git history - they mark important points like releases.\"\n\nShe continues: \"Unlike branches that move with new commits, tags stay fixed. This means we can always go back to exactly what we shipped in v1.0, even years later.\"\n\n\"In professional teams, every production release gets tagged. It's essential for debugging, rollbacks, and changelogs.\"",
    "advanced.level1.story.realWorldContext":
        "Tags are industry standard for marking releases. They enable semantic versioning (v1.0.0), make rollbacks safe, and help teams communicate about specific versions.",
    "advanced.level1.story.taskIntroduction": "Create an annotated tag to mark this release: git tag -a v1.0.1 -m 'Bug fix release'",

    // Advanced Level 2: Git Log Advanced
    "advanced.level2.name": "Advanced Commit History",
    "advanced.level2.description": "Master advanced techniques to explore repository history",
    "advanced.level2.objective1": "View condensed commit history",
    "advanced.level2.objective2": "Filter commits by author or date",
    "advanced.level2.objective3": "Search commit messages",
    "advanced.level2.hint1": "View one-line commit history with: git log --oneline",
    "advanced.level2.hint2": "Show commit history with graph: git log --graph --oneline",
    "advanced.level2.hint3": "Limit to last N commits: git log --oneline -n 5",
    "advanced.level2.hint4": "Search in commit messages: git log --grep='fix'",
    "advanced.level2.requirement1.description": "View compact commit history",
    "advanced.level2.requirement1.success": "Perfect! You've explored the commit history.",
    "advanced.level2.requirement2.description": "Filter commits by author",
    "advanced.level2.requirement2.success": "Great! You can now find commits by specific authors.",
    "advanced.level2.requirement3.description": "Search commit messages for specific text",
    "advanced.level2.requirement3.success": "Excellent! You can now search through commit messages.",
    "advanced.level2.story.title": "Exploring History",
    "advanced.level2.story.narrative":
        "\"A bug was introduced somewhere in the last 50 commits,\" your colleague sighs. \"How do I find it?\"\n\nYour senior developer smiles: \"Git log is your detective tool. The default format shows everything, but that's overwhelming. Let me show you the power tools.\"\n\n\"git log --oneline shows each commit in one line - perfect for scanning. Add --graph to see branch structure. Use --grep to search commit messages. These skills turn you from a Git user into a Git detective.\"",
    "advanced.level2.story.realWorldContext":
        "Mastering git log is essential for debugging, code archaeology, and understanding project evolution. Professional developers use these flags daily.",
    "advanced.level2.story.taskIntroduction": "Explore the commit history using: git log --oneline",

    // Advanced Level 3: Git Show
    "advanced.level3.name": "Inspecting Commits",
    "advanced.level3.description": "Learn to inspect specific commits in detail",
    "advanced.level3.objective1": "Inspect a specific commit using its hash",
    "advanced.level3.hint1": "First use 'git log --oneline' to find a commit hash",
    "advanced.level3.hint2": "Show a specific commit: git show <commit-hash>",
    "advanced.level3.hint3": "git show displays the commit message, author, date, and diff with file changes",
    "advanced.level3.requirement1.description": "Inspect a commit using its hash",
    "advanced.level3.requirement1.success": "Great! You've inspected the commit details and file changes.",
    "advanced.level3.story.title": "Commit Forensics",
    "advanced.level3.story.narrative":
        "\"This commit broke something, but I can't tell what changed,\" says your teammate.\n\n\"Use git show!\" you respond confidently. \"It shows you everything about a commit: the message, who made it, when, and most importantly - the actual code changes.\"\n\n\"It's like a magnifying glass for commits. Essential for code reviews, debugging, and understanding what colleagues changed.\"",
    "advanced.level3.story.realWorldContext":
        "git show is a fundamental tool for code review and debugging. It's used constantly in pull requests and when investigating issues.",
    "advanced.level3.story.taskIntroduction": "Inspect the latest commit using: git show",

    // Workflow Stage
    "workflow.name": "Git Workflows",
    "workflow.description": "Master professional Git workflows and collaboration patterns",

    "workflow.level1.name": "Feature Branch Workflow",
    "workflow.level1.description": "Learn the industry-standard feature branch workflow used by teams worldwide",
    "workflow.level1.objective1": "Create a feature branch from main",
    "workflow.level1.objective2": "Make commits with descriptive messages",
    "workflow.level1.objective3": "Push your feature branch to remote",
    "workflow.level1.objective4": "Switch back to main branch",
    "workflow.level1.objective5": "Merge your feature branch back to main",
    "workflow.level1.objective6": "Complete the feature branch workflow",
    "workflow.level1.hint1": "Start by creating a feature branch: 'git switch -c feature/user-auth'",
    "workflow.level1.hint2": "Modify the auth.js file, then use 'git add' to stage your changes",
    "workflow.level1.hint3": "Commit with: 'git commit'",
    "workflow.level1.hint4": "Push to remote: 'git push origin feature/user-auth'",
    "workflow.level1.hint5": "Switch back to main: 'git switch main'",
    "workflow.level1.hint6": "Finally merge: 'git merge feature/user-auth'",
    "workflow.level1.requirement1.description": "Create a new feature branch with 'git switch -c <branch>'",
    "workflow.level1.requirement1.success": "Feature branch created successfully!",
    "workflow.level1.requirement2.description": "Stage your changes (modify a file first!)",
    "workflow.level1.requirement2.success": "Changes staged!",
    "workflow.level1.requirement3.description": "Commit your changes with a descriptive message",
    "workflow.level1.requirement3.success": "Changes committed!",
    "workflow.level1.requirement4.description": "Push your feature branch to remote (git push origin <your-branch>)",
    "workflow.level1.requirement4.success": "Feature branch pushed to remote!",
    "workflow.level1.requirement5.description": "Switch back to main branch with 'git switch main'",
    "workflow.level1.requirement5.success": "Switched to main branch!",
    "workflow.level1.requirement6.description": "Merge your feature branch into main",
    "workflow.level1.requirement6.success": "Feature successfully merged! This is how real teams integrate new features.",
    "workflow.level1.story.title": "The Feature Factory",
    "workflow.level1.story.narrative":
        `You're a developer at TechCorp, and the team follows strict Git workflows. Your manager Sarah just assigned you a new feature: implementing user authentication.

"Remember," Sarah says, "we never commit directly to main. Always use feature branches, and make sure your commits tell a story."

**What's a Feature Branch?**
A feature branch is a separate branch where you develop a new feature in isolation. This allows you to:
- Work without affecting the stable main branch
- Get code reviewed before merging
- Easily abandon or modify work without impacting others

**The Complete Workflow:**
1. Create a feature branch from main: \`git switch -c feature/user-auth\`
2. Make changes to files and stage them with \`git add\`
3. Commit changes with descriptive messages
4. Push your branch to remote: \`git push origin feature/user-auth\`
5. Switch back to main: \`git switch main\`
6. Merge the feature: \`git merge feature/user-auth\`

**What are Pull Requests (PRs)?**
In real teams, after step 4 (pushing your branch), you'd create a **Pull Request** on GitHub/GitLab instead of merging directly:

**Pull Request Workflow:**
1. You push your feature branch to the remote repository
2. On GitHub/GitLab, you open a Pull Request from \`feature/user-auth\` to \`main\`
3. Your teammates receive a notification
4. They review your code, leave comments, and suggest improvements
5. You make changes based on feedback and push again
6. Once approved, someone merges the PR into main
7. Your feature is now part of the main codebase!

**Why Pull Requests Matter:**
- **Code Quality**: Multiple eyes catch bugs and suggest improvements
- **Knowledge Sharing**: Team learns about changes before they go live
- **Documentation**: PR descriptions explain WHY changes were made
- **Discussion**: Complex decisions are discussed and recorded
- **Safety**: Prevents broken code from reaching production

In this level, we're simulating the workflow by having you push and merge directly to learn the Git commands. In real projects, you'd always use Pull Requests for team collaboration!`,
    "workflow.level1.story.realWorldContext":
        "Feature branch workflow is the industry standard. Developers create isolated branches, push them to remote repos (GitHub/GitLab), create Pull Requests for code review, and merge after approval. This collaborative approach prevents unstable code from reaching production and improves code quality through peer review.",
    "workflow.level1.story.taskIntroduction":
        "Master the complete feature branch workflow: create, commit, push, and merge. This is how professional teams ship features every day.",

    "workflow.level2.name": "Hotfix Workflow",
    "workflow.level2.description": "Handle urgent production fixes with the hotfix workflow",
    "workflow.level2.objective1": "Create a hotfix branch from main",
    "workflow.level2.objective2": "Stage and commit the fix",
    "workflow.level2.objective3": "Switch back to main",
    "workflow.level2.objective4": "Merge the hotfix branch",
    "workflow.level2.hint1": "Hotfixes branch directly from main/master",
    "workflow.level2.hint2": "Use descriptive hotfix names like 'hotfix/critical-security-patch'",
    "workflow.level2.hint3": "Hotfixes should be merged back to both main and develop branches",
    "workflow.level2.hint4": "Always tag hotfix releases for tracking",
    "workflow.level2.requirement1.description": "Create a hotfix branch for the security issue",
    "workflow.level2.requirement1.success": "Hotfix branch created!",
    "workflow.level2.requirement2.description": "Stage your security fixes",
    "workflow.level2.requirement2.success": "Security fixes staged!",
    "workflow.level2.requirement3.description": "Commit the critical security patch",
    "workflow.level2.requirement3.success": "Security patch committed!",
    "workflow.level2.requirement4.description": "Switch back to main branch",
    "workflow.level2.requirement4.success": "Switched to main branch!",
    "workflow.level2.requirement5.description": "Merge the hotfix into main",
    "workflow.level2.requirement5.success": "Hotfix merged successfully!",
    "workflow.level2.story.title": "Code Red: Production Emergency",
    "workflow.level2.story.narrative":
        `🚨 URGENT: Production is down! 🚨

At 2:47 AM, your phone buzzes with alerts. The payment system is failing, and customers can't complete purchases. The bug tracker shows a critical security vulnerability was introduced in the latest release.

As the on-call developer, you need to:
1. Immediately create a hotfix branch: \`git switch -c hotfix/security-patch\`
2. Fix the critical security issue in the code
3. Stage and commit your fixes
4. Switch back to main: \`git switch main\`
5. Merge the hotfix: \`git merge hotfix/security-patch\`

Every minute costs the company thousands. This is what separates junior developers from senior ones - grace under pressure and knowing the right Git workflows.

Time is money. Let's fix this!`,
    "workflow.level2.story.realWorldContext":
        "Production hotfixes are critical for maintaining system stability and require immediate, focused workflow execution.",
    "workflow.level2.story.taskIntroduction": "Master the hotfix workflow for emergency production fixes.",

    "workflow.level3.name": "Git Flow Mastery",
    "workflow.level3.description": "Master the complete Git Flow workflow with release branches",
    "workflow.level3.objective1": "Create a release branch from develop",
    "workflow.level3.objective2": "Prepare and commit release changes",
    "workflow.level3.objective3": "Merge release to main",
    "workflow.level3.objective4": "Tag the release version",
    "workflow.level3.hint1": "Start on develop and create release branch: 'git switch -c release/2.0.0'",
    "workflow.level3.hint2": "Make final adjustments and commit your release preparation",
    "workflow.level3.hint3": "Switch to main: 'git switch main'",
    "workflow.level3.hint4": "Merge the release: 'git merge release/2.0.0'",
    "workflow.level3.hint5": "Tag the release: 'git tag v2.0.0'",
    "workflow.level3.hint6": "In real projects, you'd also merge back to develop",
    "workflow.level3.requirement1.description": "Create a release branch (e.g., 'release/2.0.0')",
    "workflow.level3.requirement1.success": "Release branch created!",
    "workflow.level3.requirement2.description": "Stage your release preparation changes",
    "workflow.level3.requirement2.success": "Release changes staged!",
    "workflow.level3.requirement3.description": "Commit release preparation with a clear message",
    "workflow.level3.requirement3.success": "Release preparation committed!",
    "workflow.level3.requirement4.description": "Switch to main branch to prepare for release merge",
    "workflow.level3.requirement4.success": "Switched to main!",
    "workflow.level3.requirement5.description": "Merge your release branch into main",
    "workflow.level3.requirement5.success": "Release merged to main!",
    "workflow.level3.requirement6.description": "Tag the release with version number (e.g., 'v2.0.0')",
    "workflow.level3.requirement6.success": "Release tagged! Version 2.0.0 is now live in production!",
    "workflow.level3.story.title": "The Release Manager",
    "workflow.level3.story.narrative":
        `Congratulations! You've been promoted to Release Manager at GitFlow Inc., a company that ships software every two weeks like clockwork.

Your job is to orchestrate the release of version 2.0, which includes:
- Three new features from different teams
- Two critical bug fixes
- Performance improvements
- Updated documentation

**The Release Workflow:**

1. **Create Release Branch**: Start from develop and create a release branch
   \`git switch -c release/2.0.0\`

2. **Final Preparations**: Update version numbers, CHANGELOG, etc.
   - Edit files as needed
   - \`git add .\`
   - \`git commit -m "Prepare release 2.0.0"\`

3. **Merge to Main**: Deploy to production
   - \`git switch main\`
   - \`git merge release/2.0.0\`

4. **Tag the Release**: Mark this version in history
   \`git tag v2.0.0\`

This creates a permanent marker for this release. In real projects, you'd also:
- Merge back to develop to keep it in sync
- Delete the release branch
- Push everything to remote
- Deploy to production

This is enterprise-level Git management. Welcome to the big leagues!`,
    "workflow.level3.story.realWorldContext":
        "Release branches are used in Git Flow to prepare production releases. They allow final bug fixes and documentation updates without blocking ongoing development. The release is tagged for easy reference and rollback if needed.",
    "workflow.level3.story.taskIntroduction":
        "Learn the professional release workflow: branch, prepare, merge, and tag. This is how teams ship stable software to production.",

    // Teamwork Stage
    "teamwork.name": "Team Collaboration",
    "teamwork.description": "Learn to work effectively with teams using Git collaboration techniques",

    "teamwork.level1.name": "Team Collaboration Basics",
    "teamwork.level1.description": "Learn how to work effectively with a team using Git",
    "teamwork.level1.objective1": "Pull the latest team code from remote",
    "teamwork.level1.objective2": "Create a new feature branch for your work",
    "teamwork.level1.objective3": "Edit team.md and add your name to the team members list",
    "teamwork.level1.objective4": "Stage your changes",
    "teamwork.level1.objective5": "Commit your changes",
    "teamwork.level1.objective6": "Push your changes to the remote repository",
    "teamwork.level1.hint1": "Use 'git pull origin main' to get the latest team code",
    "teamwork.level1.hint2": "Create a new branch with 'git switch -c feature/YOUR-NAME'",
    "teamwork.level1.hint3": "Edit the team.md file to add your name and role",
    "teamwork.level1.hint4": "Stage all changes with 'git add .'",
    "teamwork.level1.hint5": "Commit with a clear message: 'git commit -m \"Add my profile\"'",
    "teamwork.level1.hint6": "Push your branch with 'git push origin feature/YOUR-NAME' or 'git push --set-upstream origin feature/YOUR-NAME'",
    "teamwork.level1.requirement1.description": "Pull the latest changes from the team repository",
    "teamwork.level1.requirement1.success": "Latest changes pulled successfully!",
    "teamwork.level1.requirement2.description": "Create your feature branch for team profile",
    "teamwork.level1.requirement2.success": "Feature branch created!",
    "teamwork.level1.requirement3.description": "Edit team.md and add your name to the list",
    "teamwork.level1.requirement3.success": "File modified! Your name has been added.",
    "teamwork.level1.requirement4.description": "Stage your team profile changes",
    "teamwork.level1.requirement4.success": "Changes staged!",
    "teamwork.level1.requirement5.description": "Commit your team profile with a descriptive message",
    "teamwork.level1.requirement5.success": "Team profile committed!",
    "teamwork.level1.requirement6.description": "Push your changes to the remote repository",
    "teamwork.level1.requirement6.success": "Changes pushed to remote!",
    "teamwork.level1.story.title": "Welcome to the Dev Team",
    "teamwork.level1.story.narrative":
        `🎉 Congratulations! You've just been hired as a developer at InnovateCorp, a fast-growing tech startup.

Your team lead, Alex, walks you through your first day:

"Welcome to the team! We use Git for everything here. The codebase is our shared workspace, and everyone contributes to it daily. Your first task is simple but important - add your profile to our team page."

"Remember," Alex continues, "we have 12 developers working on this project. Everyone needs to stay synchronized. Always \`git pull\` before you push, and make sure your commit messages are clear so the rest of us know what you're working on."

Your mission:
1. Get the latest code from the team repository with \`git pull origin main\`
2. Create your feature branch: \`git switch -c feature/team-profile\`
3. Add your developer profile to the team page
4. Stage changes: \`git add .\`
5. Commit your changes: \`git commit -m "Add my profile"\`
6. Push your branch: \`git push origin feature/team-profile\`

This is real-world team development. Let's make your first contribution!`,
    "teamwork.level1.story.realWorldContext":
        "Team collaboration is the heart of software development. Learning to work with shared repositories is essential for any developer.",
    "teamwork.level1.story.taskIntroduction":
        "Learn the fundamentals of team-based Git workflow and make your first collaborative contribution.",

    "teamwork.level2.name": "Handling Merge Conflicts in Teams",
    "teamwork.level2.description": "Resolve merge conflicts that occur when multiple developers work on the same files",
    "teamwork.level2.objective1": "Stage and commit your local changes",
    "teamwork.level2.objective2": "Pull remote changes (triggers conflict)",
    "teamwork.level2.objective3": "Resolve merge conflict markers",
    "teamwork.level2.objective4": "Stage and commit the merged solution",
    "teamwork.level2.hint1": "Use 'cat /src/auth/login.js' to see your current uncommitted changes",
    "teamwork.level2.hint2": "Use 'git status' to confirm the file is modified",
    "teamwork.level2.hint3": "Commit with 'git add /src/auth/login.js' then 'git commit -m \"message\"'",
    "teamwork.level2.hint4": "Pull with 'git pull origin main' - this will trigger the conflict!",
    "teamwork.level2.hint5": "Look for conflict markers: <<<<<<<, =======, >>>>>>>",
    "teamwork.level2.hint6": "Edit login.js to combine both your and Sarah's improvements",
    "teamwork.level2.hint7": "The best solution keeps BOTH: Sarah's email check AND your stricter lengths",
    "teamwork.level2.hint8": "After resolving: 'git add .' then 'git commit -m \"Resolve merge conflict\"'",
    "teamwork.level2.requirement1.description": "Stage your local changes to login.js",
    "teamwork.level2.requirement1.success": "Local changes staged!",
    "teamwork.level2.requirement2.description": "Commit your local changes first",
    "teamwork.level2.requirement2.success": "Local changes committed!",
    "teamwork.level2.requirement3.description": "Pull Sarah's changes to trigger the conflict",
    "teamwork.level2.requirement3.success": "Conflicting changes pulled! Check login.js for conflict markers.",
    "teamwork.level2.requirement4.description": "Stage the resolved conflict",
    "teamwork.level2.requirement4.success": "Conflict resolution staged!",
    "teamwork.level2.requirement5.description": "Commit the merge resolution",
    "teamwork.level2.requirement5.success": "Merge conflict resolved!",
    "teamwork.level2.story.title": "The Great Merge Conflict Crisis",
    "teamwork.level2.story.narrative":
        `⚠️ Welcome to your first merge conflict!

**The Situation:**
You've been working on \`/src/auth/login.js\` this morning. You've improved the password validation to be stricter (minimum 5 chars for username, 10 for password). Great work!

But while you were coding, your teammate Sarah also pushed changes to the SAME FILE! She added email validation logic. Now you both have different versions of the same lines of code.

**Your Mission:**

**1. Check your local changes:** Run \`cat /src/auth/login.js\` to see YOUR improvements (already done, but not committed yet!)

**2. Commit YOUR changes first:**
\` git add /src/auth/login.js
git commit -m "Improve password validation requirements"
\`

**3. Now try to pull Sarah's changes:**
\` git pull origin main \`

**4. 💥 MERGE CONFLICT!** Git can't automatically merge because you and Sarah both modified the same lines! You'll see conflict markers in the file:
\`<<<<<<< HEAD
(your changes)
=======
(Sarah's changes)
>>>>>>> abc1234\`

**5. Resolve the conflict:**
- Edit \`/src/auth/login.js\` to combine the best of both versions
- Remove the conflict markers (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`)
- Keep both your stricter password length AND Sarah's email validation!

**6. Complete the merge:**
\`git add .
git commit -m "Merge Sarah's email validation with my password improvements"\`

**Pro Tip:** The best resolution often combines both changes! In this case, keep:
- Sarah's email validation logic (\`username.includes('@')\`)
- Your stricter length requirements (\`username.length >= 5\` and \`password.length >= 10\`)

This is completely normal in team development! Merge conflicts happen when multiple developers work on the same code. The key is resolving them thoughtfully.`,
    "teamwork.level2.story.realWorldContext":
        "Merge conflicts are inevitable in team development. Learning to resolve them quickly and correctly is a crucial skill.",
    "teamwork.level2.story.taskIntroduction":
        "Master merge conflict resolution to become a confident team collaborator.",

    "teamwork.level3.name": "Code Review Workflow",
    "teamwork.level3.description": "Learn to participate in code reviews and collaborate through pull requests",
    "teamwork.level3.objective1": "Create a new feature branch",
    "teamwork.level3.objective2": "Stage your completed work",
    "teamwork.level3.objective3": "Commit with a clear message",
    "teamwork.level3.objective4": "Push your branch for team review",
    "teamwork.level3.hint1": "Create a feature branch: git switch -c feature/password-reset",
    "teamwork.level3.hint2": "Alternative (classic): git checkout -b feature/password-reset",
    "teamwork.level3.hint3": "Stage all changes: git add .",
    "teamwork.level3.hint4": "Commit with a descriptive message: git commit -m \"Add password reset functionality\"",
    "teamwork.level3.hint5": "Push to remote: git push origin feature/password-reset",
    "teamwork.level3.hint6": "Alternative with shorthand: git push -u origin feature/password-reset",
    "teamwork.level3.hint7": "Note: Use the branch name you created (not 'feature/password-reset' if you chose a different name)",
    "teamwork.level3.requirement1.description": "Create a branch for code review demonstration",
    "teamwork.level3.requirement1.success": "Feature branch created! ✨",
    "teamwork.level3.requirement2.description": "Stage your code for review",
    "teamwork.level3.requirement2.success": "Code staged for review! 📦",
    "teamwork.level3.requirement3.description": "Commit with a clear, reviewable message",
    "teamwork.level3.requirement3.success": "Code committed with clear message! 💬",
    "teamwork.level3.requirement4.description": "Push your branch for code review",
    "teamwork.level3.requirement4.success": "Code pushed for team review! 🚀 In real teams, you'd now create a Pull Request!",
    "teamwork.level3.story.title": "The Code Review Culture",
    "teamwork.level3.story.narrative":
        `📝 Welcome to InnovateCorp's Code Review Process!

**The Situation:**
You've just finished implementing the password reset feature. The code works perfectly in your local tests! 🎉

But wait - at InnovateCorp, no code goes to production without a code review. It's not about trust - it's about quality, knowledge sharing, and catching bugs before customers see them.

**Why Code Reviews Matter:**
- **Quality:** Sarah might catch a security issue you missed
- **Knowledge Sharing:** Mike learns from your clever solution
- **Better Code:** Multiple perspectives make better software
- **Team Growth:** Everyone becomes a better developer

**Your Task:**
You need to prepare your password reset feature for team review. Follow the professional workflow:

**Step 1: Create a Feature Branch**
Never work directly on \`main\`! Create a dedicated branch for your feature.

**Step 2: Stage Your Work**
Add your completed files to the staging area.

**Step 3: Commit with a Clear Message**
Write a commit message that explains what you built. Your teammates should understand your changes without reading every line of code.

**Step 4: Push to Remote**
Upload your feature branch so your team can review it. In real teams, you'd then create a Pull Request on GitHub/GitLab.

**Remember:** The key to great code reviews is clear communication. Your branch name, commit messages, and code should tell a story!

Let's get your code ready for the team! 🚀`,
    "teamwork.level3.story.realWorldContext":
        "Code reviews are standard practice in professional development. They improve code quality, catch bugs early, and help teams learn from each other. Most companies use Pull Requests (GitHub) or Merge Requests (GitLab) for this process.",
    "teamwork.level3.story.taskIntroduction":
        "Learn the professional workflow for preparing code for team review through branches, commits, and push operations.",

    // Archaeology Stage
    "archaeology.name": "Git Archaeology",
    "archaeology.description": "Investigate code history and perform Git forensics like a detective",

    // Mastery Stage
    "mastery.name": "Git Mastery",
    "mastery.description": "The ultimate Git challenges for true masters",

    "mastery.level1.name": "Multi-Branch Merge Challenge",
    "mastery.level1.description": "Master complex merges across multiple branches with conflicts",
    "mastery.level1.objective1": "Merge multiple feature branches simultaneously",
    "mastery.level1.objective2": "Resolve complex merge conflicts",
    "mastery.level1.objective3": "Stage the resolved conflicts",
    "mastery.level1.objective4": "Complete the multi-way merge",
    "mastery.level1.hint1": "Use git merge to merge multiple branches at once",
    "mastery.level1.hint2": "Analyze each conflict carefully - they may interact",
    "mastery.level1.hint3": "The best solution often combines elements from all branches",
    "mastery.level1.hint4": "Test your merged code before committing",
    "mastery.level1.requirement1.description": "Merge all feature branches into main",
    "mastery.level1.requirement1.success": "Complex merge initiated! Now resolve the conflicts.",
    "mastery.level1.requirement2.description": "Stage all resolved files",
    "mastery.level1.requirement2.success": "Conflicts resolved and staged!",
    "mastery.level1.requirement3.description": "Complete the merge with a commit",
    "mastery.level1.requirement3.success": "Master-level merge completed! You've conquered multi-way merges!",
    "mastery.level1.story.title": "The Integration Challenge",
    "mastery.level1.story.narrative":
        "Three teams have been working in parallel for the quarterly release. Each team developed critical features on separate branches. Now it's integration day, and you're the lead developer responsible for merging everything together. The challenge: all three branches modified shared utility files. You must merge all branches and resolve the conflicts to create a coherent, working system.",
    "mastery.level1.story.realWorldContext":
        "Complex multi-branch merges are common in large projects with multiple parallel development streams. Mastering this skill is essential for senior developers and technical leads.",
    "mastery.level1.story.taskIntroduction":
        "Merge three feature branches with overlapping changes and resolve all conflicts to create a unified codebase.",

    "mastery.level2.name": "Git Hooks and Automation",
    "mastery.level2.description": "Implement Git hooks to automate workflows and enforce quality standards",
    "mastery.level2.objective1": "Create pre-commit hooks for code quality",
    "mastery.level2.objective2": "Set up post-commit hooks for notifications",
    "mastery.level2.objective3": "Implement server-side hooks",
    "mastery.level2.objective4": "Build automated workflow pipelines",
    "mastery.level2.hint1": "Pre-commit hooks run before commits are created",
    "mastery.level2.hint2": "Post-commit hooks run after successful commits",
    "mastery.level2.hint3": "Use exit codes to prevent commits in pre-commit hooks",
    "mastery.level2.hint4": "Server-side hooks control what can be pushed",
    "mastery.level2.requirement1.description": "Make the pre-commit hook executable",
    "mastery.level2.requirement1.success": "Pre-commit hook activated!",
    "mastery.level2.requirement2.description": "Stage files to test the pre-commit hook",
    "mastery.level2.requirement2.success": "Files staged!",
    "mastery.level2.requirement3.description": "Attempt a commit to trigger the quality checks",
    "mastery.level2.requirement3.success": "Quality checks passed!",
    "mastery.level2.story.title": "The Quality Guardian",
    "mastery.level2.story.narrative":
        `⚡ You've been promoted to DevOps Engineer, and your first mission is to implement the "Quality Guardian" - an automated system that prevents bad code from entering the repository.

The development team has been growing rapidly, and with growth comes inconsistency:
- Commits without proper testing
- Code style violations
- Secrets accidentally committed
- Broken builds pushed to main

Your team lead, Sarah, explains the vision:

"We need automation to enforce our quality standards. Every commit should be automatically checked for:
- Linting and code style
- Unit test passage
- Security vulnerabilities
- Commit message standards"

"Git hooks are perfect for this. They're scripts that run at specific points in the Git workflow. Think of them as quality gates that code must pass through."

The hook ecosystem:
- pre-commit: Run checks before commits are created
- pre-push: Validate before pushing to remote
- post-commit: Send notifications or trigger builds
- Server-side hooks: Control what can be pushed

Your mission:
1. Implement a pre-commit hook for quality checks
2. Set up automated testing and linting
3. Create notification systems
4. Build a comprehensive quality pipeline

This is infrastructure work that will benefit every developer on your team. You're not just writing code - you're building the foundation for code quality.`,
    "mastery.level2.story.realWorldContext":
        "Git hooks are essential for implementing automated quality assurance and workflow automation in professional development environments.",
    "mastery.level2.story.taskIntroduction":
        "Master Git hooks to build automated quality systems that enforce standards and improve team productivity.",

    "mastery.level3.name": "Git Mastery: The Final Challenge",
    "mastery.level3.description": "Combine all advanced Git techniques to solve a complex real-world scenario",
    "mastery.level3.objective1": "Orchestrate a complex release with multiple hotfixes",
    "mastery.level3.objective2": "Handle emergency rollbacks and recovery",
    "mastery.level3.objective3": "Coordinate with multiple teams simultaneously",
    "mastery.level3.objective4": "Demonstrate mastery of all techniques",
    "mastery.level3.hint1": "This challenge combines everything you've learned",
    "mastery.level3.hint2": "Think strategically about branch management",
    "mastery.level3.hint3": "Communication is as important as technical skills",
    "mastery.level3.hint4": "Document your decisions for the team",
    "mastery.level3.requirement1.description": "Create an emergency rollback branch",
    "mastery.level3.requirement1.success": "Emergency procedures initiated!",
    "mastery.level3.requirement2.description": "Cherry-pick critical fixes",
    "mastery.level3.requirement2.success": "Critical fixes applied!",
    "mastery.level3.requirement3.description": "Tag the emergency release",
    "mastery.level3.requirement3.success": "Emergency release tagged!",
    "mastery.level3.requirement4.description": "Push the emergency release tags",
    "mastery.level3.requirement4.success": "🎉 MASTERY ACHIEVED! You are now a Git Master!",
    "mastery.level3.story.title": "The Ultimate Git Challenge: Black Friday Crisis",
    "mastery.level3.story.narrative":
        `🚨 BLACK FRIDAY, 2:00 AM - THE ULTIMATE TEST

You are the Senior DevOps Engineer at MegaCorp, and you're facing the perfect storm of Git challenges on the biggest shopping day of the year.

The situation:
- Production is partially broken due to a bad deployment
- Three different teams pushed hotfixes simultaneously
- The payment system is failing intermittently
- Customer support is overwhelmed
- The CEO is asking for hourly updates
- Black Friday traffic is 50x normal levels

Your CTO calls an emergency meeting:

"This is why we hired you. Everything we've built, everything we've learned, comes down to this moment. We need someone who can navigate complex Git operations under extreme pressure."

The challenge involves:
1. **Emergency Rollback**: Quickly revert the problematic deployment
2. **Selective Recovery**: Cherry-pick only the good changes
3. **Hotfix Coordination**: Merge critical fixes from multiple teams
4. **Release Management**: Create and deploy emergency patches
5. **Team Communication**: Coordinate across development, QA, and operations

You must use every Git technique in your arsenal:
- \`git rebase -i\` to clean up messy commits
- \`git cherry-pick <commit-hash>\` to select only working features (copies specific commits from one branch to another)
- Advanced merging with \`git merge\` to combine team efforts
- \`git bisect\` to find the exact problem commit (binary search through history to find bugs)
- \`git reflog\` to recover from mistakes
- \`git tag\` and branches for release management
- \`git mv <old> <new>\` to rename files while preserving Git history

**What is git cherry-pick?**
Cherry-picking allows you to copy specific commits from one branch to another. Instead of merging entire branches, you can pick and choose individual commits. Perfect for applying hotfixes from one branch to another!

Example: \`git cherry-pick abc123\` - applies commit abc123 to your current branch

**What is git bisect?**
Bisect helps you find which commit introduced a bug using binary search. Git will checkout commits for you to test, and you tell it "good" or "bad" until it finds the problematic commit.

Example:
\`git bisect start\`
\`git bisect bad\` (current commit is broken)
\`git bisect good abc123\` (this old commit worked)
Git will then guide you through testing commits until it finds the first bad one!

**What is git mv?**
Move or rename files while keeping Git history intact. Better than manually renaming files because Git tracks the rename.

Example: \`git mv old-name.js new-name.js\`

This isn't just about Git commands - it's about leadership, decision-making under pressure, and the ability to think systematically when everything is on fire.

The company's Black Friday revenue depends on you. Millions of customers are waiting. Your team is looking to you for guidance.

This is your moment. Show them what a Git Master can do.

Ready to prove your mastery? The clock is ticking...`,
    "mastery.level3.story.realWorldContext":
        "Real-world Git mastery involves orchestrating complex operations under pressure, managing multiple stakeholders, and making critical decisions that affect business operations.",
    "mastery.level3.story.taskIntroduction":
        "This is the ultimate Git challenge - combine all your skills to handle a complex, high-pressure emergency scenario.",

    // Archaeology Stage Levels
    "archaeology.level1.name": "Git Blame - Code Archaeology",
    "archaeology.level1.description": "Investigate code history to understand changes and find the origin of bugs",
    "archaeology.level1.objective1": "Find who wrote specific lines",
    "archaeology.level1.objective2": "Track down the history of a bug",
    "archaeology.level1.objective3": "Understand the context of code changes",
    "archaeology.level1.objective4": "Find related commits and changes",
    "archaeology.level1.hint1": "git blame shows who last modified each line",
    "archaeology.level1.hint2": "Use -L option to blame specific line ranges",
    "archaeology.level1.hint3": "Combine blame with log to understand context",
    "archaeology.level1.hint4": "Look for patterns in commit messages",
    "archaeology.level1.requirement1.description": "Investigate who wrote the validation logic",
    "archaeology.level1.requirement1.success": "Code authorship revealed!",
    "archaeology.level1.requirement2.description": "Check recent commit history for context",
    "archaeology.level1.requirement2.success": "Recent history examined!",
    "archaeology.level1.requirement3.description": "Examine the details of a specific commit",
    "archaeology.level1.requirement3.success": "Commit details analyzed!",
    "archaeology.level1.story.title": "The Case of the Mysterious Bug",
    "archaeology.level1.story.narrative": "A critical bug in the validation code is affecting 23% of European customers. The code was written by 4 different developers over 18 months. Your senior developer explains: 'Welcome to code archaeology! Git isn't just version control - it's your time machine. Every line has a story.' Use git blame, git log, and git show to investigate the bug and understand why the code was written this way.",
    "archaeology.level1.story.realWorldContext": "Code archaeology skills are essential for maintaining large, long-lived codebases with multiple contributors over time.",
    "archaeology.level1.story.taskIntroduction": "Learn to investigate code history and track down the source of bugs using Git forensic tools.",

    "archaeology.level2.name": "Commit Forensics with Git Log",
    "archaeology.level2.description": "Master advanced techniques to investigate complex code history",
    "archaeology.level2.objective1": "Use advanced log filtering to find specific changes",
    "archaeology.level2.objective2": "Track file renames and moves",
    "archaeology.level2.objective3": "Find commits by content changes",
    "archaeology.level2.objective4": "Analyze commit patterns and trends",
    "archaeology.level2.hint1": "Use --grep to search commit messages",
    "archaeology.level2.hint2": "Use -S to find when specific text was added/removed",
    "archaeology.level2.hint3": "Use --follow to track files through renames",
    "archaeology.level2.hint4": "Combine filters for powerful searches",
    "archaeology.level2.requirement1.description": "Find all commits related to security",
    "archaeology.level2.requirement1.success": "Security-related commits found!",
    "archaeology.level2.requirement2.description": "Find commits that added or removed 'password' text",
    "archaeology.level2.requirement2.success": "Password-related changes tracked!",
    "archaeology.level2.requirement3.description": "Find all commits by Sarah to understand her contributions",
    "archaeology.level2.requirement3.success": "Sarah's contribution history analyzed!",
    "archaeology.level2.story.title": "The Security Audit Trail",
    "archaeology.level2.story.narrative": "Your company received a security audit. The auditors want a complete history of all security-related changes: authentication, password handling, encryption. The codebase has 2,847 commits over 3 years. Your security lead explains Git's search capabilities: --grep for messages, -S for code content, --author for contributors. Build a comprehensive audit trail using advanced git log techniques.",
    "archaeology.level2.story.realWorldContext": "Advanced Git log techniques are essential for security audits, code reviews, and understanding complex project histories.",
    "archaeology.level2.story.taskIntroduction": "Master advanced Git log techniques for comprehensive code history investigation and forensic analysis.",

    "archaeology.level3.name": "Git Reflog - The Time Machine",
    "archaeology.level3.description": "Use Git reflog to recover lost commits and understand repository state changes",
    "archaeology.level3.objective1": "Understand what reflog tracks",
    "archaeology.level3.objective2": "Recover accidentally deleted commits",
    "archaeology.level3.objective3": "Find lost branch references",
    "archaeology.level3.objective4": "Restore previous repository states",
    "archaeology.level3.hint1": "Reflog tracks all HEAD movements",
    "archaeology.level3.hint2": "Use git reflog to see recent actions",
    "archaeology.level3.hint3": "git reset --hard can use reflog references",
    "archaeology.level3.hint4": "Reflog entries expire after 90 days by default",
    "archaeology.level3.requirement1.description": "Check the reflog to see recent HEAD movements",
    "archaeology.level3.requirement1.success": "Reflog history examined!",
    "archaeology.level3.requirement2.description": "Reset to a previous state using reflog reference",
    "archaeology.level3.requirement2.success": "Repository state restored!",
    "archaeology.level3.requirement3.description": "Create a recovery branch from a reflog entry",
    "archaeology.level3.requirement3.success": "Recovery branch created!",
    "archaeology.level3.story.title": "The Great Git Disaster Recovery",
    "archaeology.level3.story.narrative": "It's Friday 4:30 PM. Your teammate Jake panics: 'I accidentally ran git reset --hard and lost two weeks of work! The authentication system, UI components, tests - all gone!' But you remember: Git never forgets. Git reflog tracks every commit, branch switch, merge, and reset. Even 'deleted' commits exist in reflog for 90 days. Your mission: examine the reflog, find the lost commits, and recover Jake's work. Time to be the hero!",
    "archaeology.level3.story.realWorldContext": "Git reflog is a powerful recovery tool that can save developers from catastrophic data loss scenarios.",
    "archaeology.level3.story.taskIntroduction": "Master Git reflog to become the hero who can recover 'lost' work and save the day for your teammates.",

};

export default levels;
