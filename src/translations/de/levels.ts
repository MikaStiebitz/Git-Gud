const level = {
    // Level Page

    "level.gitTerminal": "Git Terminal",
    "level.currentChallenge": "Aktuelle Herausforderung",
    "level.objectives": "Ziele:",
    "level.showHints": "Hinweise anzeigen",
    "level.hideHints": "Hinweise ausblenden",
    "level.nextLevel": "Nächstes Level",
    "level.filesToEdit": "Dateien zum Bearbeiten:",
    "level.workingTreeClean": "Working tree clean",
    "level.staged": "staged",
    "level.modified": "modified",
    "level.untracked": "untracked",
    "level.gitNotInitialized": "Git ist noch nicht initialisiert",
    "level.branch": "Branch:",
    "level.gitStatus": "Git Status",
    "level.advancedOptions": "Erweiterte Optionen anzeigen",
    "level.hideAdvancedOptions": "Erweiterte Optionen ausblenden",
    "level.resetLevel": "Level zurücksetzen",
    "level.resetAllProgress": "Gesamten Fortschritt zurücksetzen",
    "level.resetConfirm": "Möchtest du wirklich deinen gesamten Fortschritt zurücksetzen?",
    "level.level": "Level",
    "level.levelCompleted": "Level abgeschlossen!",
    "level.realWorldContext": "Kontext in der echten Welt",
    "level.task": "Deine Aufgabe",
    "level.startCoding": "Mit dem Coding beginnen",
    "level.storyButton": "Story anzeigen",
    "level.advancedModeOn": "Fortgeschrittenen-Modus (An)",
    "level.advancedModeOff": "Fortgeschrittenen-Modus (Aus)",
    "level.notFound": "Level nicht gefunden",
    "level.techModeOn": "Fokus auf Befehle (Tech-Modus)",
    "level.storyModeOn": "Story-Kontext anzeigen (Story-Modus)",
    "level.techModeDescription":
        "Der technische Modus konzentriert sich auf Git-Befehle ohne Geschichten oder Kontext für ein schnelleres, direkteres Erlebnis.",
    "level.storyModeDescription":
        "Der Story-Modus bietet Kontext aus der realen Welt und Erklärungen, um zu verstehen, warum und wie Git-Befehle verwendet werden.",
    "level.editFile": "Datei bearbeiten",
    "level.deleteFile": "Datei löschen",
    "level.confirmDelete": "Möchten Sie {file} wirklich löschen?",
    "level.hints": "Hinweise",

    // Level Content - Intro Stage
    "intro.name": "Einführung in Git",
    "intro.description": "Lerne die Grundlagen von Git",

    "intro.level1.name": "Git initialisieren",
    "intro.level1.description": "Erstelle ein neues Git-Repository",
    "intro.level1.objective1": "Initialisiere ein neues Git-Repository",
    "intro.level1.hint1": "Verwende den Befehl git init",
    "intro.level1.hint2": "Dies erstellt ein verstecktes .git-Verzeichnis",
    "intro.level1.requirement1.description": "Initialisiere ein Git-Repository",
    "intro.level1.requirement1.success": "Gut gemacht! Du hast ein Git-Repository erstellt.",
    "intro.level1.story.title": "Willkommen im Team",
    "intro.level1.story.narrative":
        "Herzlich willkommen in deinem neuen Job als Entwickler bei TechStart! Ich bin Alex, dein Team-Lead.\n\nEs ist dein erster Tag und wir wollen dir helfen, schnell produktiv zu werden. Wir nutzen Git für unsere Versionskontrolle - damit verfolgen wir Änderungen im Code und arbeiten im Team zusammen.\n\nAls erstes musst du ein neues Repository für dein Onboarding-Projekt anlegen. Dafür nutzen wir den Befehl 'git init'.",
    "intro.level1.story.realWorldContext":
        "In echten Entwicklerteams ist Git unverzichtbar. Es ist das erste Tool, das du bei einem neuen Projekt einrichtest.",
    "intro.level1.story.taskIntroduction": "Lass uns ein neues Repository für dein Projekt erstellen.",

    "intro.level2.name": "Repository Status",
    "intro.level2.description": "Überprüfe den Status deines Repositories",
    "intro.level2.objective1": "Zeige den Status deines Git-Repositories an",
    "intro.level2.hint1": "Verwende den Befehl git status",
    "intro.level2.hint2": "Dieser Befehl zeigt dir den aktuellen Status deines Repositories",
    "intro.level2.requirement1.description": "Zeige den Status des Repositories",
    "intro.level2.requirement1.success": "Perfekt! Du kannst nun den Status deines Repositories sehen.",
    "intro.level2.story.title": "Was ist los in deinem Repo?",
    "intro.level2.story.narrative":
        "Großartig! Du hast dein erstes Git-Repository erstellt. Das versteckte .git-Verzeichnis enthält nun alle Informationen, die Git braucht.\n\nAlex schaut vorbei: \"Super! Als nächstes solltest du dir anschauen, was in deinem Repository passiert. Mit 'git status' kannst du jederzeit den aktuellen Zustand überprüfen.\"",
    "intro.level2.story.realWorldContext":
        "Entwickler führen 'git status' mehrmals täglich aus, um zu sehen, welche Dateien geändert wurden und welche für den nächsten Commit bereit sind.",
    "intro.level2.story.taskIntroduction": "Überprüfe den Status deines Repositories mit git status.",

    // Level Content - Files Stage
    "files.name": "Dateioperationen",
    "files.description": "Lerne, wie du Dateien mit Git verwaltest",

    "files.level1.name": "Änderungen stagen",
    "files.level1.description": "Füge Dateien zur Staging-Area hinzu",
    "files.level1.objective1": "Füge alle Dateien zur Staging-Area hinzu",
    "files.level1.hint1": "Verwende den Befehl git add .",
    "files.level1.hint2": "Der Punkt steht für 'alle Dateien im aktuellen Verzeichnis'",
    "files.level1.requirement1.description": "Füge alle Dateien zum Staging-Bereich hinzu",
    "files.level1.requirement1.success": "Großartig! Du hast alle Dateien zur Staging-Area hinzugefügt.",
    "files.level1.story.title": "Code-Änderungen vorbereiten",
    "files.level1.story.narrative":
        '"Hey!" ruft Sarah, deine Kollegin, "ich sehe, du hast schon mit Git angefangen. Als nächstes solltest du lernen, wie man Änderungen staged."\n\nSie erklärt: "Wenn du Dateien änderst, musst du Git explizit sagen, welche Änderungen in den nächsten Commit aufgenommen werden sollen. Das nennt man \'Staging\' und funktioniert mit \'git add\'."',
    "files.level1.story.realWorldContext":
        "Das Staging-Konzept ist ein mächtiges Feature von Git. Es erlaubt dir, nur ausgewählte Änderungen zu committen, während andere noch in Bearbeitung bleiben können.",
    "files.level1.story.taskIntroduction": "Füge alle Dateien zur Staging-Area hinzu mit git add .",

    "files.level2.name": "Änderungen committen",
    "files.level2.description": "Erstelle einen Commit mit deinen Änderungen",
    "files.level2.objective1": "Erstelle einen Commit mit einer Nachricht",
    "files.level2.hint1": "Verwende den Befehl git commit -m 'Deine Nachricht'",
    "files.level2.hint2": "Die Nachricht sollte die Änderungen beschreiben",
    "files.level2.requirement1.description": "Erstelle einen Commit mit einer Nachricht",
    "files.level2.requirement1.success": "Ausgezeichnet! Du hast erfolgreich einen Commit erstellt.",
    "files.level2.story.title": "Dein erster Commit",
    "files.level2.story.narrative":
        '"Super gemacht!" sagt Alex, als er deine Fortschritte sieht. "Du hast Änderungen zur Staging-Area hinzugefügt. Jetzt ist es Zeit für deinen ersten Commit."\n\nEr erklärt: "Ein Commit ist wie ein Snapshot deines Projekts zu einem bestimmten Zeitpunkt. Jeder Commit braucht eine Nachricht, die beschreibt, was geändert wurde. Das ist wichtig für die Nachvollziehbarkeit."',
    "files.level2.story.realWorldContext":
        "Gute Commit-Nachrichten sind in Entwicklerteams extrem wichtig. Sie helfen allen zu verstehen, warum eine Änderung gemacht wurde, nicht nur was geändert wurde.",
    "files.level2.story.taskIntroduction": "Erstelle deinen ersten Commit mit einer aussagekräftigen Nachricht.",

    "files.level3.name": "Dateien entfernen",
    "files.level3.description": "Lerne, wie man Dateien aus Git entfernt",
    "files.level3.objective1": "Entferne eine Datei sowohl aus dem Arbeitsverzeichnis als auch aus dem Index",
    "files.level3.hint1": "Verwende den Befehl git rm <Datei>",
    "files.level3.hint2": "Dies entfernt die Datei aus Git und löscht sie auch aus deinem Arbeitsverzeichnis",
    "files.level3.requirement1.description": "Entferne eine Datei mit Git",
    "files.level3.requirement1.success":
        "Gut gemacht! Du hast die Datei aus Git und deinem Arbeitsverzeichnis entfernt.",
    "files.level3.story.title": "Aufräumen",
    "files.level3.story.narrative":
        '"Ich sehe, du machst gute Fortschritte", sagt Alex, während er deine Arbeit überprüft. "Aber ich bemerke, dass es einige temporäre Dateien oder Entwürfe gibt, die wir nicht mehr brauchen. Wir sollten das Repository aufräumen."\n\nEr erklärt: "Wenn du Dateien entfernen möchtest, die von Git verfolgt werden, solltest du \'git rm\' verwenden, anstatt sie manuell zu löschen. So wird sichergestellt, dass Git die Löschung richtig verfolgt."',
    "files.level3.story.realWorldContext":
        "Repositories sauber zu halten, indem unnötige Dateien entfernt werden, ist eine bewährte Methode. Der Befehl git rm stellt sicher, dass Git die Dateientfernung verfolgt.",
    "files.level3.story.taskIntroduction": "Entferne die unnötige Datei aus dem Repository mit git rm.",

    // Level Content - Branches Stage
    "branches.name": "Arbeiten mit Branches",
    "branches.description": "Lerne, wie du mit Branches arbeitest",

    "branches.level1.name": "Branches anzeigen",
    "branches.level1.description": "Zeige alle Branches in deinem Repository",
    "branches.level1.objective1": "Zeige alle vorhandenen Branches an",
    "branches.level1.hint1": "Verwende den Befehl git branch",
    "branches.level1.hint2": "Dies zeigt dir alle lokalen Branches an",
    "branches.level1.requirement1.description": "Zeige alle Branches an",
    "branches.level1.requirement1.success": "Sehr gut! Du kannst nun alle Branches in deinem Repository sehen.",
    "branches.level1.story.title": "Verzweigungen im Code",
    "branches.level1.story.narrative":
        '"Zeit für etwas Fortgeschritteneres", sagt Alex und zeichnet einen Baum mit Zweigen auf ein Whiteboard. "Diese Zweige sind wie Git-Branches. Sie erlauben dir, an verschiedenen Versionen deines Codes gleichzeitig zu arbeiten."\n\nEr erklärt weiter: "Derzeit arbeitest du auf dem \'main\'-Branch. Lass uns zuerst überprüfen, welche Branches wir haben."',
    "branches.level1.story.realWorldContext":
        "Branches sind ein fundamentales Konzept in Git. Sie ermöglichen parallele Entwicklung, Feature-Isolation und experimentelles Arbeiten ohne den Hauptcode zu beeinträchtigen.",
    "branches.level1.story.taskIntroduction": "Zeige dir alle vorhandenen Branches mit git branch an.",

    "branches.level2.name": "Branch erstellen",
    "branches.level2.description": "Erstelle einen neuen Branch und wechsle zu ihm",
    "branches.level2.objective1": "Erstelle einen neuen Branch namens 'feature' und wechsle zu ihm",
    "branches.level2.hint1": "Verwende den Befehl git checkout -b feature",
    "branches.level2.hint2": "Dies erstellt einen neuen Branch und wechselt gleichzeitig zu ihm",
    "branches.level2.requirement1.description": "Erstelle einen neuen Branch und wechsle zu ihm",
    "branches.level2.requirement1.success": "Hervorragend! Du hast einen neuen Branch erstellt und zu ihm gewechselt.",
    "branches.level2.story.title": "Neue Feature-Entwicklung",
    "branches.level2.story.narrative":
        '"Perfekt! Jetzt wollen wir ein neues Feature implementieren", sagt Alex. "Dafür erstellen wir einen neuen Branch namens \'feature\', damit unsere Änderungen den Hauptcode nicht beeinflussen."\n\nEr zeigt dir, wie man gleichzeitig einen Branch erstellt und zu ihm wechselt: "Mit \'git checkout -b\' kannst du beides in einem Schritt erledigen."',
    "branches.level2.story.realWorldContext":
        "In professionellen Entwicklungsteams arbeitet man fast nie direkt im main-Branch. Stattdessen erstellt man Feature-Branches für neue Funktionen, um den Hauptcode stabil zu halten.",
    "branches.level2.story.taskIntroduction": "Erstelle einen neuen Branch namens 'feature' und wechsle zu ihm.",

    "branches.level3.name": "Switch-Befehl",
    "branches.level3.description": "Verwende den modernen git switch Befehl",
    "branches.level3.objective1": "Wechsle zwischen Branches mit dem neuen git switch Befehl",
    "branches.level3.hint1": "Verwende den Befehl git switch <branch>",
    "branches.level3.hint2": "Dies ist eine neuere Alternative zu git checkout für den Wechsel von Branches",
    "branches.level3.requirement1.description": "Wechsle zu einem anderen Branch mit git switch",
    "branches.level3.requirement1.success": "Großartig! Du hast den modernen git switch Befehl verwendet.",
    "branches.level3.story.title": "Moderne Git-Befehle",
    "branches.level3.story.narrative":
        '"Lass mich dir etwas Neues zeigen", sagt Sarah und gesellt sich zu dir an deinen Schreibtisch. "Git gibt es schon eine Weile, und einige seiner Befehle haben sich weiterentwickelt. Zum Beispiel gibt es jetzt einen speziellen Befehl nur für den Wechsel von Branches."\n\nSie erklärt: "Während \'git checkout\' für den Wechsel von Branches funktioniert, hat Git \'git switch\' als intuitivere Alternative speziell für Branch-Operationen eingeführt."',
    "branches.level3.story.realWorldContext":
        "Git führt gelegentlich neue Befehle ein, um die Benutzererfahrung zu verbessern. Der Befehl git switch wurde in Git 2.23 eingeführt, um Branch-Operationen intuitiver zu gestalten.",
    "branches.level3.story.taskIntroduction":
        "Versuche, den git switch Befehl zu verwenden, um zu einem anderen Branch zu wechseln.",

    // Level Content - Merge Stage
    "merge.name": "Branches zusammenführen",
    "merge.description": "Lerne, wie du Branches zusammenführst",

    "merge.level1.name": "Branches mergen",
    "merge.level1.description": "Führe einen Branch in den aktuellen Branch zusammen",
    "merge.level1.objective1": "Führe den 'feature' Branch in den 'main' Branch zusammen",
    "merge.level1.hint1": "Verwende den Befehl git merge feature",
    "merge.level1.hint2": "Dies führt den feature-Branch in deinen aktuellen Branch zusammen",
    "merge.level1.requirement1.description": "Führe einen Branch zusammen",
    "merge.level1.requirement1.success": "Ausgezeichnet! Du hast erfolgreich einen Branch zusammengeführt.",
    "merge.level1.story.title": "Code-Integration",
    "merge.level1.story.narrative":
        '"Super! Dein Feature ist fertig und getestet", sagt Alex. "Jetzt ist es Zeit, diese Änderungen zurück in den Hauptcode zu integrieren."\n\nEr erklärt: "Wechsle zuerst zum main-Branch mit \'git checkout main\' und führe dann den feature-Branch mit \'git merge feature\' zusammen."',
    "merge.level1.story.realWorldContext":
        "Das Zusammenführen (Merging) ist ein kritischer Teil des Git-Workflows. In größeren Teams wird dies oft durch Pull Requests und Code Reviews formalisiert.",
    "merge.level1.story.taskIntroduction": "Führe den 'feature'-Branch in den 'main'-Branch zusammen.",

    "merge.level2.name": "Umgang mit Merge-Konflikten",
    "merge.level2.description": "Lerne, wie man mit Konflikten umgeht oder Merges abbricht",
    "merge.level2.objective1": "Brich einen Merge mit Konflikten ab",
    "merge.level2.hint1": "Verwende den Befehl git merge --abort",
    "merge.level2.hint2": "Dies stoppt den Merge-Prozess und kehrt zum Zustand vor dem Merge zurück",
    "merge.level2.requirement1.description": "Brich einen Merge mit Konflikten ab",
    "merge.level2.requirement1.success": "Gut gemacht! Du hast den Merge-Vorgang erfolgreich abgebrochen.",
    "merge.level2.story.title": "Wenn Merges schief gehen",
    "merge.level2.story.narrative":
        '"Manchmal laufen Merges nicht wie geplant", warnt Alex. "Wenn der gleiche Teil einer Datei in den beiden Branches, die du zusammenführen möchtest, unterschiedlich geändert wurde, kann Git sie nicht automatisch kombinieren."\n\nEr fährt fort: "Wenn du auf Merge-Konflikte stößt, hast du zwei Möglichkeiten: sie manuell lösen oder den Merge abbrechen, wenn du noch nicht bereit bist, dich damit zu befassen."',
    "merge.level2.story.realWorldContext":
        "Merge-Konflikte sind ein häufiger Teil der kollaborativen Entwicklung. Zu wissen, wie man mit ihnen umgeht – ob durch Lösung oder vorübergehendes Abbrechen – ist eine wesentliche Fähigkeit.",
    "merge.level2.story.taskIntroduction": "Übe das Abbrechen eines Merge-Vorgangs mit git merge --abort.",

    // Remote Stage
    "remote.name": "Remote-Repositories",
    "remote.description": "Lerne, mit Remote-Repositories zu arbeiten",

    // Remote Level 1
    "remote.level1.name": "Remotes hinzufügen",
    "remote.level1.description": "Verbinde dich mit einem Remote-Repository",
    "remote.level1.objective1": "Füge ein Remote-Repository hinzu",
    "remote.level1.hint1": "Verwende den Befehl git remote add <name> <url>",
    "remote.level1.hint2": "Üblicherweise nennt man sein Haupt-Remote 'origin'",
    "remote.level1.requirement1.description": "Füge ein Remote-Repository hinzu",
    "remote.level1.requirement1.success": "Ausgezeichnet! Du hast ein Remote-Repository hinzugefügt.",
    "remote.level1.story.title": "Repositories verbinden",
    "remote.level1.story.narrative":
        '"Großartige Fortschritte bisher! Jetzt ist es Zeit, dein lokales Repository mit einem Remote-Repository zu verbinden", sagt Alex. "Dies wird es dir ermöglichen, deinen Code mit dem Team zu teilen und effektiv zusammenzuarbeiten."\n\nEr erklärt: "Der erste Schritt ist, eine Verbindung zum Remote-Repository mit \'git remote add\' herzustellen. Dies überträgt noch keinen Code – es erstellt nur die Verbindung."',
    "remote.level1.story.realWorldContext":
        "Remote-Repositories sind zentral für kollaborative Entwicklungs-Workflows. Die meisten Git-basierten Systeme wie GitHub, GitLab und Bitbucket funktionieren, indem sie Remote-Repositories hosten, mit denen sich Teammitglieder verbinden.",
    "remote.level1.story.taskIntroduction": "Füge ein Remote namens 'origin' zu deinem Repository hinzu.",

    // Remote Level 2
    "remote.level2.name": "Änderungen pushen",
    "remote.level2.description": "Sende deine Änderungen an ein Remote-Repository",
    "remote.level2.objective1": "Pushe deine Commits in das Remote-Repository",
    "remote.level2.hint1": "Verwende den Befehl git push <remote> <branch>",
    "remote.level2.hint2":
        "Für deinen ersten Push zu einem neuen Branch musst du möglicherweise das Upstream mit -u setzen",
    "remote.level2.requirement1.description": "Pushe deine Änderungen zum Remote",
    "remote.level2.requirement1.success": "Perfekt! Du hast deine Änderungen zum Remote-Repository gepusht.",
    "remote.level2.story.title": "Deine Arbeit teilen",
    "remote.level2.story.narrative":
        '"Jetzt, da wir mit dem Remote-Repository verbunden sind, ist es Zeit, deine Arbeit mit dem Team zu teilen", sagt Alex. "Dies geschieht mit dem Befehl \'git push\'."\n\nEr fährt fort: "Wenn du pushst, werden deine Commits in das Remote-Repository hochgeladen, wodurch sie für andere Teammitglieder verfügbar werden. So funktioniert Zusammenarbeit in Git."',
    "remote.level2.story.realWorldContext":
        "Pushen ist die Art und Weise, wie du deine Arbeit in einem Git-basierten Workflow teilst. Es ist das Gegenteil von Pulling, das die Änderungen anderer in dein lokales Repository bringt.",
    "remote.level2.story.taskIntroduction": "Pushe deine Änderungen zum Remote-Repository.",

    // Rebase Stage
    "rebase.name": "Rebasing",
    "rebase.description": "Lerne, wie du Branches rebasen kannst",

    // Rebase Level 1
    "rebase.level1.name": "Grundlegendes Rebasing",
    "rebase.level1.description": "Wende Commits von einem Branch auf einen anderen an",
    "rebase.level1.objective1": "Rebase den aktuellen Branch auf einen anderen Branch",
    "rebase.level1.hint1": "Verwende den Befehl git rebase <branch>",
    "rebase.level1.hint2": "Dies schreibt die Historie um, indem deine Commits auf den Ziel-Branch angewendet werden",
    "rebase.level1.requirement1.description": "Rebase auf einen anderen Branch",
    "rebase.level1.requirement1.success": "Großartig! Du hast den Branch erfolgreich rebasiert.",
    "rebase.level1.story.title": "Erstellen einer sauberen Historie",
    "rebase.level1.story.narrative":
        '"Ich sehe, du wirst vertraut mit dem Mergen", sagt Sarah. "Lass uns jetzt einen anderen Ansatz zur Integration von Änderungen erkunden: Rebasing."\n\nSie erklärt: "Während das Mergen Historien zusammenführt, schreibt Rebasing sie um, indem deine Commits so verschoben werden, dass sie nach den Commits eines anderen Branches erscheinen. Dies erzeugt eine linearere, sauberere Historie."',
    "rebase.level1.story.realWorldContext":
        "Rebasing wird oft bevorzugt, wenn du eine saubere, lineare Projekthistorie beibehalten möchtest. Viele Teams nutzen es, um Feature-Branches zu integrieren, bevor sie in den Hauptbranch gemerged werden.",
    "rebase.level1.story.taskIntroduction": "Versuche, deinen aktuellen Branch auf einen anderen Branch zu rebasen.",

    // Rebase Level 2
    "rebase.level2.name": "Umgang mit Rebase-Konflikten",
    "rebase.level2.description": "Lerne, wie man mit Rebase-Konflikten umgeht oder Rebases abbricht",
    "rebase.level2.objective1": "Brich einen Rebase mit Konflikten ab",
    "rebase.level2.hint1": "Verwende den Befehl git rebase --abort",
    "rebase.level2.hint2": "Dies stoppt den Rebase-Prozess und kehrt zum Zustand vor dem Rebase zurück",
    "rebase.level2.requirement1.description": "Brich einen Rebase mit Konflikten ab",
    "rebase.level2.requirement1.success": "Ausgezeichnet! Du hast den Rebase-Vorgang erfolgreich abgebrochen.",
    "rebase.level2.story.title": "Wenn Rebases kompliziert werden",
    "rebase.level2.story.narrative":
        '"Genau wie beim Mergen kann Rebasing zu Konflikten führen", weist Alex darauf hin. "Aber das Lösen von Konflikten während eines Rebases kann komplexer sein, weil Git jeden deiner Commits einzeln anwendet."\n\nEr fährt fort: "Wenn du mitten in einem Rebase bist und entscheidest, dass es zu komplex ist oder du deinen Ansatz überdenken musst, kannst du den Prozess jederzeit abbrechen."',
    "rebase.level2.story.realWorldContext":
        "Zu wissen, wann und wie man einen Rebase abbricht, ist in der realen Entwicklung wichtig. Manchmal sind die Konflikte zu komplex, um sie sofort zu lösen, oder du erkennst, dass eine andere Strategie besser wäre.",
    "rebase.level2.story.taskIntroduction": "Übe das Abbrechen eines Rebase-Vorgangs mit git rebase --abort.",
};

export default level;
