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
    "level.branch": "Branch:",
    "level.gitStatus": "Git Status",
    "level.advancedOptions": "Advanced Options",
    "level.hideAdvancedOptions": "Hide Advanced Options",
    "level.resetLevel": "Reset Level",
    "level.resetAllProgress": "Reset All Progress",
    "level.resetConfirm": "Are you sure you want to reset all your progress?",
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
    "intro.level1.objective1": "Initialize a new Git repository",
    "intro.level1.hint1": "Use the git init command",
    "intro.level1.hint2": "This creates a hidden .git directory",
    "intro.level1.requirement1.description": "Initialize a Git repository",
    "intro.level1.requirement1.success": "Well done! You've created a Git repository.",
    "intro.level1.story.title": "Welcome to the Team",
    "intro.level1.story.narrative":
        "Welcome to your new job as a developer at TechStart! I'm Alex, your team lead.\n\nIt's your first day and we want to help you become productive quickly. We use Git for our version control - it helps us track changes in code and work together as a team.\n\nThe first thing you need to do is create a new repository for your onboarding project. We use the 'git init' command for this.",
    "intro.level1.story.realWorldContext":
        "In real development teams, Git is essential. It's the first tool you set up for a new project.",
    "intro.level1.story.taskIntroduction": "Let's create a new repository for your project.",

    "intro.level2.name": "Repository Status",
    "intro.level2.description": "Check the status of your repository",
    "intro.level2.objective1": "Display the status of your Git repository",
    "intro.level2.hint1": "Use the git status command",
    "intro.level2.hint2": "This command shows the current status of your repository",
    "intro.level2.requirement1.description": "Show the repository status",
    "intro.level2.requirement1.success": "Perfect! Now you can see the status of your repository.",
    "intro.level2.story.title": "What's Happening in Your Repo?",
    "intro.level2.story.narrative":
        "Great! You've created your first Git repository. The hidden .git directory now contains all the information Git needs.\n\nAlex stops by: \"Great job! Next you should look at what's happening in your repository. With 'git status' you can check the current state at any time.\"",
    "intro.level2.story.realWorldContext":
        "Developers run 'git status' multiple times a day to see which files have been changed and which are ready for the next commit.",
    "intro.level2.story.taskIntroduction": "Check the status of your repository with git status.",

    // Level Content - Files Stage
    "files.name": "File Operations",
    "files.description": "Learn how to manage files with Git",

    "files.level1.name": "Staging Changes",
    "files.level1.description": "Add files to the staging area",
    "files.level1.objective1": "Add all files to the staging area",
    "files.level1.hint1": "Use the git add . command",
    "files.level1.hint2": "The dot represents 'all files in the current directory'",
    "files.level1.requirement1.description": "Add all files to the staging area",
    "files.level1.requirement1.success": "Great! You've added all files to the staging area.",
    "files.level1.story.title": "Preparing Code Changes",
    "files.level1.story.narrative":
        '"Hey!" calls Sarah, your colleague, "I see you\'ve already started with Git. Next you should learn how to stage changes."\n\nShe explains: "When you modify files, you need to explicitly tell Git which changes should be included in the next commit. This is called \'staging\' and works with \'git add\'."',
    "files.level1.story.realWorldContext":
        "The staging concept is a powerful feature of Git. It allows you to commit only selected changes while others can remain in progress.",
    "files.level1.story.taskIntroduction": "Add all files to the staging area with git add .",

    "files.level2.name": "Committing Changes",
    "files.level2.description": "Create a commit with your changes",
    "files.level2.objective1": "Create a commit with a message",
    "files.level2.hint1": "Use the git commit -m 'Your message' command",
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
    "files.level3.hint1": "Use the git rm <file> command",
    "files.level3.hint2": "This removes the file from Git and also deletes it from your working directory",
    "files.level3.requirement1.description": "Remove a file using Git",
    "files.level3.requirement1.success": "Well done! You've removed the file from Git and your working directory.",
    "files.level3.story.title": "Cleaning Up",
    "files.level3.story.narrative":
        '"I see you\'ve been making good progress," says Alex as he reviews your work. "But I notice there are some temporary files or drafts we don\'t need anymore. We should clean up the repository."\n\nHe explains: "When you want to remove files that are tracked by Git, you should use \'git rm\' rather than just deleting them manually. This ensures Git properly tracks the deletion."',
    "files.level3.story.realWorldContext":
        "Keeping repositories clean by removing unnecessary files is a best practice. The git rm command ensures Git tracks the file deletion.",
    "files.level3.story.taskIntroduction": "Remove the unnecessary file from the repository using git rm.",

    // Level Content - Branches Stage
    "branches.name": "Working with Branches",
    "branches.description": "Learn how to work with branches",

    "branches.level1.name": "View Branches",
    "branches.level1.description": "Display all branches in your repository",
    "branches.level1.objective1": "Display all existing branches",
    "branches.level1.hint1": "Use the git branch command",
    "branches.level1.hint2": "This shows all local branches",
    "branches.level1.requirement1.description": "Show all branches",
    "branches.level1.requirement1.success": "Very good! Now you can see all branches in your repository.",
    "branches.level1.story.title": "Code Branches",
    "branches.level1.story.narrative":
        '"Time for something more advanced," says Alex and draws a tree with branches on a whiteboard. "These branches are like Git branches. They allow you to work on different versions of your code simultaneously."\n\nHe continues: "Currently you\'re working on the \'main\' branch. Let\'s first check which branches we have."',
    "branches.level1.story.realWorldContext":
        "Branches are a fundamental concept in Git. They enable parallel development, feature isolation, and experimental work without affecting the main code.",
    "branches.level1.story.taskIntroduction": "Display all existing branches with git branch.",

    "branches.level2.name": "Create Branch",
    "branches.level2.description": "Create a new branch and switch to it",
    "branches.level2.objective1": "Create a new branch named 'feature' and switch to it",
    "branches.level2.hint1": "Use the git checkout -b feature command",
    "branches.level2.hint2": "This creates a new branch and switches to it at the same time",
    "branches.level2.requirement1.description": "Create a new branch and switch to it",
    "branches.level2.requirement1.success": "Excellent! You've created a new branch and switched to it.",
    "branches.level2.story.title": "New Feature Development",
    "branches.level2.story.narrative":
        "\"Perfect! Now we want to implement a new feature,\" says Alex. \"For this, we'll create a new branch called 'feature' so our changes don't affect the main code.\"\n\nHe shows you how to create a branch and switch to it in one step: \"With 'git checkout -b' you can do both in one command.\"",
    "branches.level2.story.realWorldContext":
        "In professional development teams, you almost never work directly on the main branch. Instead, you create feature branches for new functionality to keep the main code stable.",
    "branches.level2.story.taskIntroduction": "Create a new branch named 'feature' and switch to it.",

    "branches.level3.name": "Switch Command",
    "branches.level3.description": "Use the modern git switch command",
    "branches.level3.objective1": "Switch between branches using the new git switch command",
    "branches.level3.hint1": "Use the git switch <branch> command",
    "branches.level3.hint2": "This is a newer alternative to git checkout for changing branches",
    "branches.level3.requirement1.description": "Switch to another branch using git switch",
    "branches.level3.requirement1.success": "Great job! You've used the modern git switch command.",
    "branches.level3.story.title": "Modern Git Commands",
    "branches.level3.story.narrative":
        '"Let me show you something new," says Sarah, joining you at your desk. "Git has been around for a while, and some of its commands have evolved. For example, there\'s now a specific command just for switching branches."\n\nShe explains: "While \'git checkout\' works for switching branches, Git introduced \'git switch\' as a more intuitive alternative specifically for branch operations."',
    "branches.level3.story.realWorldContext":
        "Git occasionally introduces new commands to improve user experience. The git switch command was introduced in Git 2.23 to make branch operations more intuitive.",
    "branches.level3.story.taskIntroduction": "Try using the git switch command to change to another branch.",

    // Level Content - Merge Stage
    "merge.name": "Merging Branches",
    "merge.description": "Learn how to merge branches",

    "merge.level1.name": "Merge Branches",
    "merge.level1.description": "Merge one branch into the current branch",
    "merge.level1.objective1": "Merge the 'feature' branch into the 'main' branch",
    "merge.level1.hint1": "Use the git merge feature command",
    "merge.level1.hint2": "This merges the feature branch into your current branch",
    "merge.level1.requirement1.description": "Merge a branch",
    "merge.level1.requirement1.success": "Excellent! You've successfully merged a branch.",
    "merge.level1.story.title": "Code Integration",
    "merge.level1.story.narrative":
        '"Great! Your feature is complete and tested," says Alex. "Now it\'s time to integrate these changes back into the main code."\n\nHe explains: "First switch to the main branch with \'git checkout main\' and then merge the feature branch with \'git merge feature\'."',
    "merge.level1.story.realWorldContext":
        "Merging is a critical part of the Git workflow. In larger teams, this is often formalized through pull requests and code reviews.",
    "merge.level1.story.taskIntroduction": "Merge the 'feature' branch into the 'main' branch.",

    "merge.level2.name": "Handling Merge Conflicts",
    "merge.level2.description": "Learn how to handle or abort merges with conflicts",
    "merge.level2.objective1": "Abort a merge with conflicts",
    "merge.level2.hint1": "Use the git merge --abort command",
    "merge.level2.hint2": "This will stop the merge process and return to the state before the merge began",
    "merge.level2.requirement1.description": "Abort a merge with conflicts",
    "merge.level2.requirement1.success": "Good job! You've successfully aborted the merge operation.",
    "merge.level2.story.title": "When Merges Go Wrong",
    "merge.level2.story.narrative":
        '"Sometimes things don\'t go as planned with merges," Alex warns. "If the same part of a file has been changed differently in the two branches you\'re merging, Git can\'t automatically combine them."\n\nHe continues: "When you encounter merge conflicts, you have two options: resolve them manually, or abort the merge if you\'re not ready to deal with them yet."',
    "merge.level2.story.realWorldContext":
        "Merge conflicts are a common part of collaborative development. Knowing how to handle them—whether by resolving or temporarily aborting—is an essential skill.",
    "merge.level2.story.taskIntroduction": "Practice aborting a merge operation using git merge --abort.",

    // Remote Stage
    "remote.name": "Remote Repositories",
    "remote.description": "Learn to work with remote repositories",

    // Remote Level 1
    "remote.level1.name": "Adding Remotes",
    "remote.level1.description": "Connect to a remote repository",
    "remote.level1.objective1": "Add a remote repository",
    "remote.level1.hint1": "Use the git remote add <name> <url> command",
    "remote.level1.hint2": "The convention is to name your main remote 'origin'",
    "remote.level1.requirement1.description": "Add a remote repository",
    "remote.level1.requirement1.success": "Excellent! You've added a remote repository.",
    "remote.level1.story.title": "Connecting Repositories",
    "remote.level1.story.narrative":
        '"Great progress so far! Now it\'s time to connect your local repository to a remote one," says Alex. "This will allow you to share your code with the team and collaborate effectively."\n\nHe explains: "The first step is to add a connection to the remote repository using \'git remote add\'. This doesn\'t transfer any code yet—it just creates the connection."',
    "remote.level1.story.realWorldContext":
        "Remote repositories are central to collaborative development workflows. Most Git-based systems like GitHub, GitLab, and Bitbucket work by hosting remote repositories that team members connect to.",
    "remote.level1.story.taskIntroduction": "Add a remote named 'origin' to your repository.",

    // Remote Level 2
    "remote.level2.name": "Pushing Changes",
    "remote.level2.description": "Send your changes to a remote repository",
    "remote.level2.objective1": "Push your commits to the remote repository",
    "remote.level2.hint1": "Use the git push <remote> <branch> command",
    "remote.level2.hint2": "For your first push to a new branch, you might need to set the upstream with -u",
    "remote.level2.requirement1.description": "Push your changes to the remote",
    "remote.level2.requirement1.success": "Perfect! You've pushed your changes to the remote repository.",
    "remote.level2.story.title": "Sharing Your Work",
    "remote.level2.story.narrative":
        '"Now that we\'ve connected to the remote repository, it\'s time to share your work with the team," says Alex. "This is done using the \'git push\' command."\n\nHe continues: "When you push, your commits are uploaded to the remote repository, making them available to other team members. This is how collaboration happens in Git."',
    "remote.level2.story.realWorldContext":
        "Pushing is how you share your work in a Git-based workflow. It's the opposite of pulling, which brings others' changes to your local repository.",
    "remote.level2.story.taskIntroduction": "Push your changes to the remote repository.",

    // Rebase Stage
    "rebase.name": "Rebasing",
    "rebase.description": "Learn how to rebase branches",

    // Rebase Level 1
    "rebase.level1.name": "Basic Rebasing",
    "rebase.level1.description": "Apply commits from one branch onto another",
    "rebase.level1.objective1": "Rebase the current branch onto another branch",
    "rebase.level1.hint1": "Use the git rebase <branch> command",
    "rebase.level1.hint2": "This rewrites history by applying your commits on top of the target branch",
    "rebase.level1.requirement1.description": "Rebase onto another branch",
    "rebase.level1.requirement1.success": "Great job! You've successfully rebased the branch.",
    "rebase.level1.story.title": "Creating a Clean History",
    "rebase.level1.story.narrative":
        '"I see you\'re getting comfortable with merging," says Sarah. "Now let\'s explore a different approach to integrating changes: rebasing."\n\nShe explains: "While merging combines histories, rebasing rewrites it by moving your commits to appear after the commits from another branch. This creates a more linear, cleaner history."',
    "rebase.level1.story.realWorldContext":
        "Rebasing is often preferred when you want to maintain a clean, linear project history. Many teams use it to integrate feature branches before merging them to the main branch.",
    "rebase.level1.story.taskIntroduction": "Try rebasing your current branch onto another branch.",

    // Rebase Level 2
    "rebase.level2.name": "Handling Rebase Conflicts",
    "rebase.level2.description": "Learn how to handle or abort rebases with conflicts",
    "rebase.level2.objective1": "Abort a rebase with conflicts",
    "rebase.level2.hint1": "Use the git rebase --abort command",
    "rebase.level2.hint2": "This will stop the rebase process and return to the state before the rebase began",
    "rebase.level2.requirement1.description": "Abort a rebase with conflicts",
    "rebase.level2.requirement1.success": "Excellent! You've successfully aborted the rebase operation.",
    "rebase.level2.story.title": "When Rebases Get Complicated",
    "rebase.level2.story.narrative":
        '"Just like merging, rebasing can lead to conflicts," Alex points out. "But resolving conflicts during a rebase can be more complex because Git applies each of your commits one by one."\n\nHe continues: "If you\'re in the middle of a rebase and decide it\'s too complex or you need to rethink your approach, you can always abort the process."',
    "rebase.level2.story.realWorldContext":
        "Knowing when and how to abort a rebase is important in real-world development. Sometimes the conflicts are too complex to resolve immediately, or you realize a different strategy would be better.",
    "rebase.level2.story.taskIntroduction": "Practice aborting a rebase operation using git rebase --abort.",
};

export default levels;
