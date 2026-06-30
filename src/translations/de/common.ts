const common = {
    // Navigation
    "nav.home": "Home",
    "nav.terminal": "Terminal",
    "nav.playground": "Playground",
    "nav.startLearning": "Starte Lernen",
    "nav.language": "Sprache",
    "nav.installation": "Installation von Git",
    "nav.faq": "FAQ",
    "nav.scenarios": "Disaster-Labor",

    // Command Categories
    "category.basics": "Grundlagen",
    "category.branches": "Branches",
    "category.remoteRepos": "Remote-Repositories",
    "category.advanced": "Fortgeschrittene Befehle",
    "category.history": "Commit-Historie",
    "category.undoing": "Änderungen rückgängig machen",

    // Progress
    "progress.beginner": "Anfänger",
    "progress.intermediate": "Fortgeschritten",
    "progress.expert": "Experte",
    "progress.gitMaster": "Git Master",
    "progress.points": "Punkte",

    // Difficulty System
    "difficulty.beginner": "Anfänger",
    "difficulty.advanced": "Fortgeschritten",
    "difficulty.pro": "Profi",
    "difficulty.selectTitle": "Wähle deinen Lernpfad",
    "difficulty.selectDescription": "Wähle einen Schwierigkeitsgrad, der zu deinem Git-Erfahrungslevel passt",
    "difficulty.changeTitle": "Schwierigkeitsgrad ändern",
    "difficulty.changeDescription": "Du kannst dies jederzeit ändern, um die Lernkomplexität anzupassen",
    "difficulty.startLearning": "Lernen starten",
    "difficulty.applyChanges": "Änderungen anwenden",
    "difficulty.cancel": "Abbrechen",
    "difficulty.topicsCovered": "Behandelte Themen",
    "difficulty.maxPoints": "Max Punkte",

    // Shop System
    "shop.title": "Git Shop",
    "shop.subtitle": "Gib deine verdienten Punkte für nützliche Items und Upgrades aus",
    "shop.balance": "Dein Guthaben",
    "shop.coins": "Münzen",
    "shop.buy": "Kaufen",
    "shop.purchased": "Gekauft",
    "shop.insufficient": "Nicht genug Punkte",

    // Minigames
    "minigame.title": "Git Mini-Spiele",
    "minigame.subtitle": "Übe Git-Fähigkeiten und verdiene extra Punkte",
    "minigame.play": "Spielen",
    "minigame.completed": "Abgeschlossen",
    "minigame.playAgain": "Nochmal spielen",
    "minigame.close": "Schließen",

    // Minigame Names
    "minigame.branchMaster.name": "Branch Meister",
    "minigame.branchMaster.description": "Erstelle und wechsle so schnell wie möglich zwischen Branches",
    "minigame.branchMaster.category": "Branching",
    "minigame.commitChampion.name": "Commit Champion",
    "minigame.commitChampion.description": "Schreibe aussagekräftige Commit-Nachrichten unter Zeitdruck",
    "minigame.commitChampion.category": "Commits",
    "minigame.mergeMaster.name": "Merge Meister",
    "minigame.mergeMaster.description": "Löse Merge-Konflikte wie ein Profi",
    "minigame.mergeMaster.category": "Fortgeschritten",

    // Difficulty levels
    "difficulty.easy": "Einfach",
    "difficulty.medium": "Mittel",
    "difficulty.hard": "Schwer",

    // Shop Items
    "shop.item.darkTerminal.name": "Dunkles Terminal-Design",
    "shop.item.darkTerminal.description": "Ein elegantes dunkles Terminal-Design mit blauen Akzenten - klassisch und professionell",
    "shop.item.matrixTerminal.name": "Matrix Terminal-Design",
    "shop.item.matrixTerminal.description": "Grün-auf-schwarz Terminal-Design wie in den Matrix-Filmen - für das ultimative Hacker-Gefühl",
    "shop.item.goldenTerminal.name": "Goldenes Terminal-Design",
    "shop.item.goldenTerminal.description": "Ein glänzendes goldenes Terminal-Design, das allen deine Git-Meisterschaft zeigt",
    "shop.item.gitMascot.name": "Git Maskottchen-Haustier",
    "shop.item.gitMascot.description": "Ein niedliches animiertes Maskottchen, das dich bei schwierigen Levels anfeuert",
    "shop.item.victorySound.name": "Siegessound-Paket",
    "shop.item.victorySound.description": "Befriedigende Soundeffekte beim Abschließen von Levels und Lösen von Herausforderungen",
    "shop.item.doubleXp.name": "Doppel-XP Wochenende",
    "shop.item.doubleXp.description": "Erhalte 2x Punkte für abgeschlossene Levels für die nächsten 7 Tage",
        "shop.item.emojiCommits.name": "Emoji Commit-Nachrichten",
    "shop.item.emojiCommits.description": "Füge lustige Emoji-Vorschläge zu deinen Commit-Nachrichten hinzu für bessere Git-Historie",
    "shop.item.proTips.name": "Pro Git-Tipps",
    "shop.item.proTips.description": "Schalte nützliche Git-Befehle und Tricks frei - geheimes Wissen von Git-Experten",
    "shop.item.gitLegend.name": "Git-Legende Abzeichen",
    "shop.item.gitLegend.description": "Exklusives Abzeichen, das zeigt, dass du fortgeschrittene Git-Befehle gemeistert hast",

    // Pro Tip Dialog
    "shop.proTip.title": "Pro Git-Tipp",
    "shop.proTip.subtitle": "Nützliches Git-Wissen um deine Skills zu verbessern",
    "shop.proTip.another": "Weiterer Tipp",
    "shop.proTip.hide": "Tipps ausblenden",
    "shop.proTip.enable": "Tipps aktivieren",
    "shop.proTip.disable": "Tipps deaktivieren",
    "shop.showTip": "Tipp anzeigen",

    // Shop Categories
    "shop.category.cosmetic": "Kosmetik",
    "shop.category.utility": "Nützlich",
    "shop.category.achievement": "Erfolg",
    "shop.category.special": "Spezial",

    // Shop Rarity
    "shop.rarity.common": "Gewöhnlich",
    "shop.rarity.rare": "Selten",
    "shop.rarity.epic": "Episch",
    "shop.rarity.legendary": "Legendär",

    // Disaster Lab Scenarios (English placeholders)
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
