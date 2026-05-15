const common = {
    // Navigation
    "nav.home": "Home",
    "nav.terminal": "Terminal",
    "nav.playground": "Playground",
    "nav.startLearning": "Start Learning",
    "nav.language": "Language",
    "nav.installation": "Installation of Git",
    "nav.faq": "FAQ",
    "nav.scenarios": "Disaster Lab",

    // Command Categories
    "category.basics": "Basics",
    "category.branches": "Branches",
    "category.remoteRepos": "Remote Repositories",
    "category.advanced": "Advanced Commands",
    "category.history": "Commit History",
    "category.undoing": "Undoing Changes",

    // Progress
    "progress.beginner": "Beginner",
    "progress.intermediate": "Intermediate",
    "progress.expert": "Expert",
    "progress.gitMaster": "Git Master",
    "progress.points": "points",

    // Difficulty System
    "difficulty.beginner": "Beginner",
    "difficulty.advanced": "Advanced",
    "difficulty.pro": "Pro",
    "difficulty.selectTitle": "Choose Your Learning Path",
    "difficulty.selectDescription": "Select a difficulty level that matches your Git experience level",
    "difficulty.changeTitle": "Change Difficulty Level",
    "difficulty.changeDescription": "You can change this anytime to adjust the learning complexity",
    "difficulty.startLearning": "Start Learning",
    "difficulty.applyChanges": "Apply Changes",
    "difficulty.cancel": "Cancel",
    "difficulty.topicsCovered": "Topics covered",
    "difficulty.maxPoints": "Max Points",

    // Shop System
    "shop.title": "Git Shop",
    "shop.subtitle": "Spend your earned points on useful items and upgrades",
    "shop.balance": "Your Balance",
    "shop.coins": "coins",
    "shop.buy": "Buy",
    "shop.purchased": "Purchased",
    "shop.insufficient": "Not enough points",

    // Minigames
    "minigame.title": "Git Mini Games",
    "minigame.subtitle": "Practice Git skills and earn extra points",
    "minigame.play": "Play",
    "minigame.completed": "Completed",
    "minigame.playAgain": "Play Again",
    "minigame.close": "Close",

    // Minigame Names
    "minigame.branchMaster.name": "Branch Master",
    "minigame.branchMaster.description": "Create and switch between branches as fast as possible",
    "minigame.branchMaster.category": "Branching",
    "minigame.commitChampion.name": "Commit Champion",
    "minigame.commitChampion.description": "Write meaningful commit messages under pressure",
    "minigame.commitChampion.category": "Commits",
    "minigame.mergeMaster.name": "Merge Master",
    "minigame.mergeMaster.description": "Resolve merge conflicts like a pro",
    "minigame.mergeMaster.category": "Advanced",

    // Difficulty levels
    "difficulty.easy": "Easy",
    "difficulty.medium": "Medium",
    "difficulty.hard": "Hard",

    // Shop Items
    "shop.item.darkTerminal.name": "Dark Terminal Theme",
    "shop.item.darkTerminal.description": "A sleek dark terminal theme with blue accents - classic and professional",
    "shop.item.matrixTerminal.name": "Matrix Terminal Theme",
    "shop.item.matrixTerminal.description": "Green-on-black terminal theme like the Matrix movies - for the ultimate hacker feel",
    "shop.item.goldenTerminal.name": "Golden Terminal Theme",
    "shop.item.goldenTerminal.description": "A shiny gold terminal theme that shows your Git mastery to everyone",
    "shop.item.gitMascot.name": "Git Mascot Pet",
    "shop.item.gitMascot.description": "A cute animated mascot that cheers you on during difficult levels",
    "shop.item.victorySound.name": "Victory Sound Pack",
    "shop.item.victorySound.description": "Satisfying sound effects when you complete levels and solve challenges",
    "shop.item.doubleXp.name": "Double XP Weekend",
    "shop.item.doubleXp.description": "Get 2x points for completing levels for the next 7 days",
    "shop.item.emojiCommits.name": "Emoji Commit Messages",
    "shop.item.emojiCommits.description": "Add fun emoji suggestions to your commit messages for better git history",
    "shop.item.proTips.name": "Pro Git Tips",
    "shop.item.proTips.description": "Unlock useful Git commands and tricks - hidden knowledge from Git experts",
    "shop.item.gitLegend.name": "Git Legend Badge",
    "shop.item.gitLegend.description": "Exclusive badge showing you've mastered advanced Git - unlock special recognition",

    // Pro Tip Dialog
    "shop.proTip.title": "Pro Git Tip",
    "shop.proTip.subtitle": "Useful Git knowledge to level up your skills",
    "shop.proTip.another": "Another Tip",
    "shop.proTip.hide": "Hide tips",
    "shop.proTip.enable": "Enable Tips",
    "shop.proTip.disable": "Disable Tips",
    "shop.showTip": "Show Tip",

    // Shop Categories
    "shop.category.cosmetic": "Cosmetic",
    "shop.category.utility": "Utility",
    "shop.category.achievement": "Achievement",
    "shop.category.special": "Special",

    // Shop Rarity
    "shop.rarity.common": "Common",
    "shop.rarity.rare": "Rare",
    "shop.rarity.epic": "Epic",
    "shop.rarity.legendary": "Legendary",

    // Disaster Lab Scenarios
    "scenarios.pushedToMain.objective1": "Undo the 3 broken commits and restore main to a clean state",
    "scenarios.pushedToMain.hint1": "Run `git log --oneline` to see the last few commits and identify the bad ones",
    "scenarios.pushedToMain.hint2": "Use `git revert HEAD~3..HEAD` to safely undo the last 3 commits without rewriting history",
    
    "scenarios.mergeConflict.objective1": "Resolve the conflict in auth.js and complete the merge",
    "scenarios.mergeConflict.hint1": "Run `git status` to see which files have conflicts",
    "scenarios.mergeConflict.hint2": "Open auth.js, remove the <<<<<<, ======, and >>>>>> markers, keep the correct code, then `git add auth.js`",
    
    "scenarios.deletedBranch.objective1": "Recover the deleted feature/payments branch using reflog",
    "scenarios.deletedBranch.hint1": "Run `git reflog` to see a history of all recent commits including ones from deleted branches",
    "scenarios.deletedBranch.hint2": "Use `git checkout -b feature/payments <hash>` with the hash you find in reflog",
    
    "scenarios.forcePush.objective1": "Restore your colleague's commits that were wiped by the force push",
    "scenarios.forcePush.hint1": "Use `git reflog show origin/main` to find the commits that existed before the force push",
    "scenarios.forcePush.hint2": "Use `git cherry-pick <hash>` to re-apply each of your colleague's lost commits",
    
    "scenarios.committedSecrets.objective1": "Purge the .env file from the entire Git history and force push",
    "scenarios.committedSecrets.hint1": "First add .env to .gitignore so it never gets committed again",
    "scenarios.committedSecrets.hint2": "Use `git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' HEAD` to rewrite history",
};

export default common;
