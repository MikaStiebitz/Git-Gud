const levels = {
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
    "level.branch": "Branch",
    "level.gitStatus": "Git Status",
    "level.advancedOptions": "Erweiterte Optionen anzeigen",
    "level.hideAdvancedOptions": "Erweiterte Optionen ausblenden",
    "level.resetLevel": "Level zurücksetzen",
    "level.resetAllProgress": "Gesamten Fortschritt zurücksetzen",
    "level.resetConfirm": "Möchtest du wirklich deinen gesamten Fortschritt zurücksetzen?",
    "level.resetOptions": "Reset-Optionen",
    "level.resetDescription": "Wähle aus, was du zurücksetzen möchtest:",
    "level.resetAllConfirm": "Möchtest du wirklich ALL deinen Fortschritt zurücksetzen? Das kann nicht rückgängig gemacht werden!",
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
    "intro.level1.objective1": "Initialisiere ein neues Repository",
    "intro.level1.hint1": "Verwende den Befehl `git init`",
    "intro.level1.hint2": "Dies erstellt ein verstecktes .git-Verzeichnis",
    "intro.level1.requirement1.description": "Initialisiere ein Git-Repository",
    "intro.level1.requirement1.success": "Gut gemacht! Du hast ein Git-Repository erstellt.",
    "intro.level1.story.title": "Willkommen im Team",
    "intro.level1.story.narrative":
        "Herzlich willkommen in deinem neuen Job als Entwickler bei TechStart! Ich bin Alex, dein Team-Lead.\n\nEs ist dein erster Tag und wir wollen dir helfen, schnell produktiv zu werden. Wir nutzen Git für unsere Versionskontrolle - damit verfolgen wir Änderungen im Code und arbeiten im Team zusammen.\n\nAls erstes musst du ein neues Repository für dein Onboarding-Projekt anlegen. Dafür nutzen wir den Befehl `git init`.",
    "intro.level1.story.realWorldContext":
        "In echten Entwicklerteams ist Git unverzichtbar. Es ist das erste Tool, das du bei einem neuen Projekt einrichtest.",
    "intro.level1.story.taskIntroduction": "Lass uns ein neues Repository für dein Projekt erstellen.",

    "intro.level2.name": "Repository Status",
    "intro.level2.description": "Überprüfe den Status deines Repositories",
    "intro.level2.objective1": "Zeige den Status deines Repositories an",
    "intro.level2.hint1": "Verwende den Befehl `git status`",
    "intro.level2.hint2": "Dieser Befehl zeigt dir den aktuellen Status deines Repositories",
    "intro.level2.requirement1.description": "Zeige den Status des Repositories",
    "intro.level2.requirement1.success": "Perfekt! Du kannst nun den Status deines Repositories sehen.",
    "intro.level2.story.title": "Was ist los in deinem Repo?",
    "intro.level2.story.narrative":
        "Großartig! Du hast dein erstes Git-Repository erstellt. Das versteckte .git-Verzeichnis enthält nun alle Informationen, die Git braucht.\n\nAlex schaut vorbei: \"Super! Als nächstes solltest du dir anschauen, was in deinem Repository passiert. Mit `git status` kannst du jederzeit den aktuellen Zustand überprüfen.\"",
    "intro.level2.story.realWorldContext":
        "Entwickler führen `git status` mehrmals täglich aus, um zu sehen, welche Dateien geändert wurden und welche für den nächsten Commit bereit sind.",
    "intro.level2.story.taskIntroduction": "Überprüfe den Status deines Repositories mit `git status`.",

    "intro.level3.name": "Repositories klonen",
    "intro.level3.description": "Lerne, bestehende Repositories zu klonen",
    "intro.level3.objective1": "Klone ein Remote-Repository",
    "intro.level3.objective2": "Navigiere in das geklonte Repository",
    "intro.level3.hint1": "Verwende den Befehl `git clone <url>`",
    "intro.level3.hint2": "Nach dem Klonen verwende `cd`, um in den Repository-Ordner zu navigieren",
    "intro.level3.hint3": "Die Repository-URL kann jede gültige Git-Repository-URL sein",
    "intro.level3.requirement1.description": "Klone ein Remote-Repository",
    "intro.level3.requirement1.success": "Großartig! Du hast das Repository geklont.",
    "intro.level3.requirement2.description": "Navigiere mit cd in das geklonte Repository",
    "intro.level3.requirement2.success": "Perfekt! Du bist jetzt im geklonten Repository.",
    "intro.level3.story.title": "Einem existierenden Projekt beitreten",
    "intro.level3.story.narrative":
        "Deine erste Woche bei TechStart läuft großartig! Alex ruft dich mit aufregenden Neuigkeiten.\n\n\"Wir haben ein Team-Projekt, bei dem wir deine Hilfe brauchen\", sagt er. \"Die Codebasis ist bereits auf unserem Git-Server. Du musst sie auf deinen lokalen Rechner klonen, um damit arbeiten zu können.\"\n\nEr erklärt: \"Wenn du einem existierenden Projekt beitrittst, fängst du nicht bei Null an. Stattdessen klonst du das Remote-Repository, was eine vollständige Kopie auf deinem Rechner erstellt - inklusive des gesamten Codes, der Historie und aller Branches.\"\n\n\"Stell es dir vor wie ein Buch aus der Bibliothek auszuleihen, nur dass du auch noch alle Bibliotheksaufzeichnungen dazu bekommst! Verwende `git clone <repository-url>` um loszulegen.\"\n\n\"Sobald geklont, kannst du mit `cd <ordner-name>` in den Projekt-Ordner wechseln und sofort mit der Arbeit beginnen. Die gesamte Projekthistorie und alle Änderungen stehen dir zur Verfügung.\"",
    "intro.level3.story.realWorldContext":
        "Das Klonen ist die Art und Weise, wie Entwickler existierenden Projekten beitreten. Ob beim Beitragen zu Open Source oder beim Eintritt in ein neues Team, git clone ist typischerweise der erste Befehl, den du ausführst.",
    "intro.level3.story.taskIntroduction": "Klone ein Repository und navigiere hinein, um mit der Arbeit am Projekt zu beginnen.",

    // Level Content - Files Stage
    "files.name": "Dateioperationen",
    "files.description": "Lerne, wie du Dateien mit Git verwaltest",

    "files.level1.name": "Änderungen stagen",
    "files.level1.description": "Füge Dateien zur Staging-Area hinzu",
    "files.level1.objective1": "Füge alle Dateien zur Staging-Area hinzu",
    "files.level1.hint1": "Verwende den Befehl `git add .`",
    "files.level1.hint2": "Der Punkt steht für 'alle Dateien im aktuellen Verzeichnis'",
    "files.level1.requirement1.description": "Füge alle Dateien zum Staging-Bereich hinzu",
    "files.level1.requirement1.success": "Großartig! Du hast alle Dateien zur Staging-Area hinzugefügt.",
    "files.level1.story.title": "Code-Änderungen vorbereiten",
    "files.level1.story.narrative":
        '"Hey!" ruft Sarah, deine Kollegin, "ich sehe, du hast schon mit Git angefangen. Als nächstes solltest du lernen, wie man Änderungen staged."\n\nSie erklärt: "Wenn du Dateien änderst, musst du Git explizit sagen, welche Änderungen in den nächsten Commit aufgenommen werden sollen. Das nennt man \'Staging\' und funktioniert mit `git add`."',
    "files.level1.story.realWorldContext":
        "Das Staging-Konzept ist ein mächtiges Feature von Git. Es erlaubt dir, nur ausgewählte Änderungen zu committen, während andere noch in Bearbeitung bleiben können.",
    "files.level1.story.taskIntroduction": "Füge alle Dateien zur Staging-Area hinzu mit `git add .`.",

    "files.level2.name": "Änderungen committen",
    "files.level2.description": "Erstelle einen Commit mit deinen Änderungen",
    "files.level2.objective1": "Erstelle einen Commit mit einer Nachricht",
    "files.level2.hint1": "Verwende den Befehl `git commit -m 'Deine Nachricht'`",
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
    "files.level3.hint1": "Verwende den Befehl `git rm <Datei>`",
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
    "branches.level1.hint1": "Verwende den Befehl `git branch`",
    "branches.level1.hint2": "Dies zeigt dir alle lokalen Branches an",
    "branches.level1.requirement1.description": "Zeige alle Branches an",
    "branches.level1.requirement1.success": "Sehr gut! Du kannst nun alle Branches in deinem Repository sehen.",
    "branches.level1.story.title": "Verzweigungen im Code",
    "branches.level1.story.narrative":
        '"Zeit für etwas Fortgeschritteneres", sagt Alex und zeichnet einen Baum mit Zweigen auf ein Whiteboard. "Diese Zweige sind wie Git-Branches. Sie erlauben dir, an verschiedenen Versionen deines Codes gleichzeitig zu arbeiten."\n\nEr erklärt weiter: "Derzeit arbeitest du auf dem \'main\'-Branch. Lass uns zuerst überprüfen, welche Branches wir haben."',
    "branches.level1.story.realWorldContext":
        "Branches sind ein fundamentales Konzept in Git. Sie ermöglichen parallele Entwicklung, Feature-Isolation und experimentelles Arbeiten ohne den Hauptcode zu beeinträchtigen.",
    "branches.level1.story.taskIntroduction": "Zeige dir alle vorhandenen Branches mit git branch an.",

    "branches.level2.name": "Branch erstellen und wechseln",
    "branches.level2.description": "Erstelle einen neuen Branch und wechsle zu ihm",
    "branches.level2.objective1": "Erstelle einen neuen Branch namens 'feature' und wechsle zu ihm",
    "branches.level2.hint1": "Verwende den Befehl `git switch -c feature`",
    "branches.level2.hint2": "Das -c Flag erstellt einen neuen Branch und wechselt in einem Schritt zu ihm",
    "branches.level2.requirement1.description": "Erstelle einen neuen Branch und wechsle zu ihm mit git switch -c",
    "branches.level2.requirement1.success":
        "Hervorragend! Du hast einen neuen Branch erstellt und zu ihm gewechselt mit dem modernen git switch Befehl.",
    "branches.level2.story.title": "Moderne Branch-Erstellung",
    "branches.level2.story.narrative":
        "\"Perfekt! Jetzt wollen wir ein neues Feature implementieren\", sagt Alex. \"Dafür erstellen wir einen neuen Branch namens 'feature', damit unsere Änderungen den Hauptcode nicht beeinflussen.\"\n\nEr zeigt dir den modernen Ansatz: \"Git hat den 'git switch' Befehl eingeführt, um Branch-Operationen klarer zu machen. Verwende 'git switch -c feature', um den neuen Branch zu erstellen und gleichzeitig zu ihm zu wechseln. Das ist der bevorzugte moderne Weg anstelle des älteren 'git checkout -b'.\"",
    "branches.level2.story.realWorldContext":
        "In professionellen Entwicklungsteams arbeitet man fast nie direkt im main-Branch. Der git switch Befehl, eingeführt in Git 2.23, bietet eine sauberere, intuitivere Art mit Branches zu arbeiten verglichen mit dem älteren checkout Befehl.",
    "branches.level2.story.taskIntroduction":
        "Erstelle einen neuen Branch namens 'feature' und wechsle zu ihm mit git switch -c.",

    "branches.level3.name": "Zwischen Branches wechseln",
    "branches.level3.description": "Wechsle zwischen bestehenden Branches",
    "branches.level3.objective1": "Wechsle zwischen Branches",
    "branches.level3.hint1": "Verwende den Befehl `git switch <branch>`",
    "branches.level3.hint2": "Dies wechselt zu einem bestehenden Branch",
    "branches.level3.requirement1.description": "Wechsle zu einem anderen Branch mit git switch",
    "branches.level3.requirement1.success": "Großartig! Du hast zwischen Branches gewechselt mit git switch.",
    "branches.level3.story.title": "Branch-Navigation",
    "branches.level3.story.narrative":
        '"Jetzt da du weißt, wie man Branches erstellt, lass uns das Wechseln zwischen ihnen üben", sagt Sarah. "Das ist etwas, was du ständig in der echten Entwicklungsarbeit machen wirst."\n\nSie erklärt: "Du kannst zu jedem bestehenden Branch wechseln mit \'git switch <branch-name>\'. Das ist viel klarer als das alte \'git checkout\', welches verwirrend sein konnte, weil es viele verschiedene Dinge getan hat."',
    "branches.level3.story.realWorldContext":
        "Das Wechseln zwischen Branches ist eine der häufigsten Git-Operationen. Der dedizierte git switch Befehl macht die Absicht klar und reduziert Verwirrung verglichen mit dem Mehrzweck-checkout Befehl.",
    "branches.level3.story.taskIntroduction": "Übe das Wechseln zu einem anderen Branch mit git switch.",

    "branches.level4.name": "Branches mit Checkout wechseln",
    "branches.level4.description": "Lerne den klassischen Befehl zum Wechseln von Branches",
    "branches.level4.objective1": "Wechsle zu einem anderen Branch mit dem klassischen Befehl",
    "branches.level4.hint1": "Verwende den Befehl `git checkout <branch-name>`",
    "branches.level4.hint2": "checkout ist der ältere Befehl zum Wechseln von Branches",
    "branches.level4.requirement1.description": "Wechsle zu einem anderen Branch mit git checkout",
    "branches.level4.requirement1.success": "Sehr gut! Du kennst jetzt beide Wege, zwischen Branches zu wechseln.",
    "branches.level4.story.title": "Der klassische Ansatz",
    "branches.level4.story.narrative":
        '"Es ist wichtig, auch git checkout zu kennen", erklärt Alex. "Obwohl git switch der moderne Weg ist, wirst du checkout in älteren Projekten, Tutorials und Dokumentationen oft sehen."\n\nEr fügt hinzu: "checkout kann viele Dinge tun - Branches wechseln, Dateien wiederherstellen, und mehr. Das ist der Grund, warum Git die Befehle switch und restore eingeführt hat - um die Absichten klarer zu machen."',
    "branches.level4.story.realWorldContext":
        "git checkout war jahrelang DER Befehl für Branch-Operationen. Viele Entwickler und Tools verwenden ihn noch. Beide zu kennen macht dich flexibler im Umgang mit verschiedenen Projekten und Teams.",
    "branches.level4.story.taskIntroduction": "Wechsle zu einem anderen Branch mit dem klassischen git checkout Befehl.",

    "branches.level5.name": "Branch erstellen mit Switch",
    "branches.level5.description": "Erstelle und wechsle zu einem neuen Branch in einem Schritt",
    "branches.level5.objective1": "Erstelle einen neuen Branch",
    "branches.level5.hint1": "Verwende den Befehl `git switch -c <neuer-branch-name>`",
    "branches.level5.hint2": "Das -c Flag sagt switch, einen neuen Branch zu erstellen",
    "branches.level5.requirement1.description": "Erstelle und wechsle zu einem neuen Branch mit git switch -c",
    "branches.level5.requirement1.success":
        "Perfekt! Du beherrschst jetzt beide Methoden zum Erstellen von Branches.",
    "branches.level5.story.title": "Schnelles Branch-Erstellen",
    "branches.level5.story.narrative":
        '"Ein weiterer praktischer Trick", sagt Sarah. "Du kannst mit \'git switch -c\' einen neuen Branch erstellen und gleichzeitig zu ihm wechseln."\n\nSie erklärt: "Das ist der moderne Weg in Git. Das -c Flag steht für \'create\' und macht genau dasselbe wie das ältere \'git checkout -b\', ist aber klarer und intuitiver."',
    "branches.level5.story.realWorldContext":
        "Das switch -c Pattern ist die moderne, empfohlene Methode zum Erstellen und Wechseln von Branches. Es wurde in Git 2.23 eingeführt, um die Branch-Operationen von anderen checkout-Funktionen zu trennen und intuitiver zu machen.",
    "branches.level5.story.taskIntroduction":
        "Erstelle einen neuen Branch mit git switch -c und wechsle automatisch zu ihm.",

    // Level Content - Merge Stage
    "merge.name": "Branches zusammenführen",
    "merge.description": "Lerne, wie du Branches zusammenführst",

    "merge.level1.name": "Feature-Branch zusammenführen",
    "merge.level1.description": "Merge einen Feature-Branch in den Development-Branch",
    "merge.level1.objective1": "Führe den 'feature/user-auth' Branch in den 'develop' Branch zusammen",
    "merge.level1.hint1": "Du bist bereits auf dem develop-Branch",
    "merge.level1.hint2": "Verwende `git merge feature/user-auth` um den Feature-Branch zu integrieren",
    "merge.level1.requirement1.description": "Führe den Feature-Branch zusammen",
    "merge.level1.requirement1.success": "Ausgezeichnet! Das Feature wurde in develop integriert.",
    "merge.level1.story.title": "Code-Review und Integration",
    "merge.level1.story.narrative":
        '"Dein Feature ist fertig!", sagt Sarah, die Team Lead. "Aber bevor wir es in main pushen, müssen wir es erst in den develop-Branch mergen und testen."\n\nSie erklärt: "In professionellen Teams mergen wir nie direkt in main. Erst feature → develop für Tests, dann develop → main für Production."',
    "merge.level1.story.realWorldContext":
        "🔍 Best Practice: Pull Requests\n\nIn echten Projekten würdest du jetzt einen Pull Request (PR) oder Merge Request (MR) auf GitHub/GitLab erstellen:\n\n1️⃣ Du pushst deinen Feature-Branch\n\n2️⃣ Du öffnest einen PR: feature/user-auth → develop\n\n3️⃣ Team-Mitglieder reviewen deinen Code\n\n4️⃣ Nach Approval wird der PR gemerged\n\nDas ermöglicht Code-Reviews, Diskussionen und automatische Tests vor dem Merge! 🚀",
    "merge.level1.story.taskIntroduction":
        "Führe den 'feature/user-auth'-Branch in den 'develop'-Branch zusammen (du bist bereits auf develop).",

    "merge.level2.name": "Production Deploy",
    "merge.level2.description": "Merge getesteten Code in den main-Branch",
    "merge.level2.objective1": "Führe den 'develop' Branch in den 'main' Branch zusammen",
    "merge.level2.hint1": "Du bist bereits auf dem main-Branch",
    "merge.level2.hint2": "Verwende `git merge develop` um den getesteten Code zu integrieren",
    "merge.level2.requirement1.description": "Führe develop in main zusammen",
    "merge.level2.requirement1.success": "Perfekt! Der Code ist nun in Production.",
    "merge.level2.story.title": "Production Release",
    "merge.level2.story.narrative":
        '"Super! Das Feature läuft perfekt auf develop und alle Tests sind grün", sagt Sarah. "Jetzt können wir es in main mergen und deployen."\n\nSie betont: "main ist unser Production-Branch. Nur getesteter, stabiler Code kommt hier rein. Deshalb haben wir vorher in develop getestet!"',
    "merge.level2.story.realWorldContext":
        "Git Flow Workflow 🌊\n\n📦 main: Production-ready Code\n\n🔧 develop: Integration und Testing\n\n✨ feature/*: Neue Features\n\nDieser Workflow verhindert, dass ungetesteter Code in Production landet. Viele Teams nutzen zusätzlich auch noch release-Branches!",
    "merge.level2.story.taskIntroduction": "Führe den 'develop'-Branch in den 'main'-Branch zusammen.",

    "merge.level3.name": "Umgang mit Merge-Konflikten",
    "merge.level3.description": "Lerne, wie man mit Konflikten umgeht oder Merges abbricht",
    "merge.level3.objective1": "Brich einen Merge mit Konflikten ab",
    "merge.level3.hint1": "Verwende den Befehl `git merge --abort`",
    "merge.level3.hint2": "Dies stoppt den Merge-Prozess und kehrt zum Zustand vor dem Merge zurück",
    "merge.level3.requirement1.description": "Brich einen Merge mit Konflikten ab",
    "merge.level3.requirement1.success": "Gut gemacht! Du hast den Merge-Vorgang erfolgreich abgebrochen.",
    "merge.level3.story.title": "Wenn Merges schief gehen",
    "merge.level3.story.narrative":
        '"Manchmal laufen Merges nicht wie geplant", warnt Sarah. "Wenn der gleiche Teil einer Datei in beiden Branches unterschiedlich geändert wurde, entsteht ein Merge-Konflikt."\n\nSie erklärt: "Du hast zwei Optionen: Entweder du löst den Konflikt manuell, oder du brichst den Merge mit `git merge --abort` ab und bereitest dich besser vor."',
    "merge.level3.story.realWorldContext":
        "Merge-Konflikte sind ein häufiger Teil der kollaborativen Entwicklung. Zu wissen, wie man mit ihnen umgeht – ob durch Lösung oder vorübergehendes Abbrechen – ist eine wesentliche Fähigkeit.",
    "merge.level3.story.taskIntroduction": "Übe das Abbrechen eines Merge-Vorgangs mit git merge --abort.",

    // Stash Stage
    "stash.name": "Git Stash",
    "stash.description": "Lerne, Änderungen vorübergehend zu speichern",

    "stash.level1.name": "Arbeit Stashen",
    "stash.level1.description": "Lerne Änderungen temporär zu speichern und zwischen Branches zu wechseln",
    "stash.level1.objective1": "Speichere deine Work-in-Progress Änderungen",
    "stash.level1.objective2": "Wechsle zum hotfix Branch um dringende Probleme zu beheben",
    "stash.level1.objective3": "Kehre zum feature Branch zurück um deine Arbeit fortzusetzen",
    "stash.level1.objective4": "Stelle deine gestashten Änderungen wieder her",
    "stash.level1.hint1": "Verwende 'git stash' um deine Änderungen temporär zu speichern",
    "stash.level1.hint2": "Wechsle Branches mit 'git switch <branch-name>' oder 'git checkout <branch-name>'",
    "stash.level1.hint3": "Hole deine Änderungen mit 'git stash pop' zurück",
    "stash.level1.hint4": "Prüfe die Stash-Liste mit 'git stash list'",
    "stash.level1.requirement1.description": "Stashe deine Work-in-Progress Änderungen",
    "stash.level1.requirement1.success": "✅ Super! Deine Änderungen sind sicher gestasht!",
    "stash.level1.requirement2.description": "Wechsle zum hotfix Branch",
    "stash.level1.requirement2.success": "✅ Perfekt! Du bist jetzt auf dem hotfix Branch.",
    "stash.level1.requirement3.description": "Kehre zum feature Branch zurück",
    "stash.level1.requirement3.success": "✅ Gut! Zurück zum feature Branch.",
    "stash.level1.requirement4.description": "Stelle deine gestashten Änderungen wieder her",
    "stash.level1.requirement4.success": "✅ Ausgezeichnet! Deine Änderungen sind wiederhergestellt!",
    "stash.level1.story.title": "Notfall-Unterbrechung",
    "stash.level1.story.narrative":
        "Du bist voll konzentriert an einem neuen Feature. Dein Code ist halb fertig, die Tests sind kaputt, und plötzlich... Slack explodiert! 💥\n\n\"DRINGEND: Production ist down! Brauchen SOFORT einen Hotfix!\" 🚨\n\nDu kannst dieses Chaos nicht committen, aber du kannst es auch nicht einfach liegen lassen. Was tust du?\n\n**Enter git stash** - dein Notfall-Speicher-Button! 🎯\n\nStell es dir vor wie die Pause-Taste bei einem Videospiel. Deine Arbeit wird an einem speziellen Ort gespeichert, dein Workspace wird sauber, und du kannst die Aufgabe wechseln. Wenn du zurückkommst, drückst du einfach Resume (git stash pop) und machst genau da weiter, wo du aufgehört hast!",
    "stash.level1.story.realWorldContext":
        "In der echten Entwicklung passieren ständig Unterbrechungen. Product Manager brauchen 'schnelle Änderungen', Bugs erscheinen in Production, und Teammates brauchen dringende Code-Reviews. Git stash ist dein Überlebens-Tool für Context-Switching ohne deinen Flow zu verlieren.",
    "stash.level1.story.taskIntroduction":
        "Lass uns den Stash-Workflow üben: Speichere deine Arbeit, erledige den Notfall, dann mach weiter!",

    "stash.level2.name": "Multi-Task Jonglieren",
    "stash.level2.description": "Meistere das Wechseln zwischen mehreren Aufgaben mit Stash",
    "stash.level2.objective1": "Stashe deine aktuelle unfertige Arbeit",
    "stash.level2.objective2": "Wechsle zum main Branch um einen neuen Feature Branch zu erstellen",
    "stash.level2.objective3": "Erstelle einen neuen Feature Branch",
    "stash.level2.objective4": "Kehre zu deinem alten Task Branch zurück",
    "stash.level2.objective5": "Stelle deine gestashte Arbeit wieder her",
    "stash.level2.hint1": "Starte mit dem Stashen: git stash",
    "stash.level2.hint2": "Wechsle zu main: git switch main (oder git checkout main)",
    "stash.level2.hint3": "Erstelle neuen Branch: git switch -c feature/new-task (oder git checkout -b feature/new-task)",
    "stash.level2.hint4": "Gehe zurück zum alten Task: git switch feature/old-task",
    "stash.level2.hint5": "Stelle Arbeit wieder her: git stash pop",
    "stash.level2.requirement1.description": "Stashe deine unfertige Arbeit",
    "stash.level2.requirement1.success": "✅ Arbeit gestasht! Bereit zum Task-Wechsel.",
    "stash.level2.requirement2.description": "Wechsle zum main Branch",
    "stash.level2.requirement2.success": "✅ Jetzt auf main Branch.",
    "stash.level2.requirement3.description": "Erstelle feature/new-task Branch",
    "stash.level2.requirement3.success": "✅ Neuer Branch erstellt!",
    "stash.level2.requirement4.description": "Kehre zu feature/old-task zurück",
    "stash.level2.requirement4.success": "✅ Zurück zu deinem alten Task.",
    "stash.level2.requirement5.description": "Stelle deine gestashte Arbeit wieder her",
    "stash.level2.requirement5.success": "✅ Perfekt! Arbeit wiederhergestellt!",
    "stash.level2.story.title": "Multi-Tasking Meister",
    "stash.level2.story.narrative":
        '"Hey, kannst du schnell mal an der neuen Feature-Anfrage arbeiten?", fragt dein Product Owner.\n\nDu sitzt mitten in einer anderen Aufgabe. Früher hättest du alles committen müssen oder die Änderungen verloren.\n\n"Stash ist perfekt dafür", erklärt dein Senior Developer Marc. "Sichere deine aktuelle Arbeit, erstelle einen neuen Branch für die neue Aufgabe, und später holst du die alte Arbeit einfach zurück."',
    "stash.level2.story.realWorldContext":
        "**Stash im Team-Alltag**\n\nDeveloper jonglieren oft mehrere Tasks gleichzeitig:\n\n- Sprint Planning ändert Prioritäten\n- Urgent Bugs unterbrechen Features\n- Code Reviews erfordern Context-Switches\n- Meetings unterbrechen den Flow\n\n**Git Stash macht Context-Switching schmerzlos!**\n\nOhne Stash müsstest du entweder:\n- Unfertigen Code committen (schlecht für die History)\n- Änderungen verwerfen (Arbeit verloren)\n- In einem dreckigen State bleiben (kann nicht wechseln)\n\nMit Stash: Sichere, wechsle, arbeite, kehre zurück - alles sauber! ✨",
    "stash.level2.story.taskIntroduction":
        "Stashe deine Arbeit, wechsle zu main, erstelle einen neuen Branch, kehre zurück zur alten Aufgabe und hole deine Arbeit zurück.",

    "stash.level3.name": "Stash Verwalten",
    "stash.level3.description": "Lerne Stash-Einträge anzuzeigen und zu verwalten",
    "stash.level3.objective1": "Zeige alle gestashten Änderungen an",
    "stash.level3.objective2": "Stelle den neuesten Stash wieder her",
    "stash.level3.hint1": "Verwende 'git stash list' um alle Stashes zu sehen",
    "stash.level3.hint2": "Hole den Stash mit 'git stash pop' zurück",
    "stash.level3.hint3": "Stashes werden wie ein Stack gespeichert (LIFO - Last In, First Out)",
    "stash.level3.requirement1.description": "Liste alle Stash-Einträge auf",
    "stash.level3.requirement1.success": "✅ Stashes angezeigt!",
    "stash.level3.requirement2.description": "Hole den neuesten Stash zurück",
    "stash.level3.requirement2.success": "✅ Stash wiederhergestellt!",
    "stash.level3.story.title": "Stash-Organisation",
    "stash.level3.story.narrative":
        '"Moment, wo habe ich die Änderungen nochmal gestasht?", fragst du dich.\n\n"Verwende `git stash list`", sagt Lisa. "Das zeigt dir alle gespeicherten Stashes. Mit `git stash pop` holst du den neuesten zurück und entfernst ihn aus dem Stash."\n\nSie erklärt weiter: "Es gibt auch `git stash apply` - das wendet den Stash an, aber lässt ihn im Stash. Nützlich wenn du die gleichen Änderungen mehrmals brauchst!"',
    "stash.level3.story.realWorldContext":
        "**Stash Management Commands**\n\n`git stash list` - Zeigt alle Stashes\n\n`git stash pop` - Wendet Stash an und löscht ihn\n\n`git stash apply` - Wendet Stash an, behält ihn\n\n`git stash drop` - Löscht einen Stash\n\n`git stash clear` - Löscht alle Stashes\n\n**Pro Tip**: Du kannst Stashes Namen geben mit `git stash push -m \"WIP: Feature X\"` - das macht die Liste übersichtlicher!",
    "stash.level3.story.taskIntroduction": "Liste deine Stashes auf und hole den neuesten zurück.",

    // Remote Stage
    "remote.name": "Remote-Repositories",
    "remote.description": "Lerne, mit Remote-Repositories zu arbeiten",

    // Remote Level 1
    "remote.level1.name": "Remotes hinzufügen",
    "remote.level1.description": "Verbinde dich mit einem Remote-Repository",
    "remote.level1.objective1": "Füge ein Remote-Repository hinzu",
    "remote.level1.hint1": "Verwende den Befehl `git remote add <name> <url>`",
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
    "remote.level2.name": "Commits zum Remote pushen",
    "remote.level2.description": "Lerne, wann und wie du deine Commits hochlädst",
    "remote.level2.objective1": "Pushe deine lokalen Commits zum Remote-Repository",
    "remote.level2.objective2": "Verstehe den Unterschied zwischen lokalem Commit und Remote Push",
    "remote.level2.hint1": "Verwende `git push origin main` um zum main-Branch zu pushen",
    "remote.level2.hint2":
        "WICHTIG: Push erst NACHDEM du einen Commit gemacht hast! Push lädt deine Commits hoch, nicht einzelne Dateien.",
    "remote.level2.hint3": "Tipp: Verwende `git log` um zu sehen, welche Commits du hast",
    "remote.level2.requirement1.description": "Pushe deine Commits zum Remote",
    "remote.level2.requirement1.success": "Perfekt! Deine Commits sind jetzt im Remote-Repository verfügbar.",
    "remote.level2.story.title": "Vom lokalen zum Remote-Repository",
    "remote.level2.story.narrative":
        '"Lass mich dir zeigen, wie der Git-Workflow funktioniert", sagt Alex und zeichnet ein Diagramm:\n\n1️⃣ Du änderst Dateien (Working Directory)\n2️⃣ Du staged sie mit `git add` (Staging Area)\n3️⃣ Du commitest sie mit `git commit` (Lokales Repository)\n4️⃣ Du pushst mit `git push` (Remote Repository)\n\n"Wichtig zu verstehen: git push lädt deine COMMITS hoch, nicht einzelne Dateien! Du musst erst einen Commit machen, bevor du pushen kannst. Deine lokalen Commits existieren nur auf deinem Computer, bis du sie pushst."',
    "remote.level2.story.realWorldContext":
        "Der Unterschied zwischen lokalem und Remote-Repository ist fundamental: Lokale Commits sind nur auf deinem Rechner. Erst durch git push werden sie für dein Team sichtbar. Das bedeutet: Du kannst beliebig viele lokale Commits machen und dann alle auf einmal pushen!",
    "remote.level2.story.taskIntroduction":
        "Du hast bereits einen Commit gemacht. Jetzt pushe diesen Commit zum Remote-Repository mit `git push origin main`.",

    "remote.level3.name": "Feature Branch pushen",
    "remote.level3.description": "Pushe einen Feature Branch zum Remote-Repository",
    "remote.level3.objective1": "Pushe deinen Feature Branch mit allen seinen Commits",
    "remote.level3.hint1": "Verwende `git push origin <branch-name>`",
    "remote.level3.hint2": "Du kannst auch `git push -u origin <branch-name>` verwenden, um das Upstream zu setzen",
    "remote.level3.requirement1.description": "Pushe einen Feature Branch zum Remote",
    "remote.level3.requirement1.success":
        "Ausgezeichnet! Dein Feature Branch ist jetzt im Remote-Repository verfügbar.",
    "remote.level3.story.title": "Features teilen",
    "remote.level3.story.narrative":
        '"Du hast an einem tollen neuen Feature auf einem separaten Branch gearbeitet", sagt Sarah. "Jetzt ist es Zeit, diesen Branch ins Remote-Repository zu pushen, damit andere Teammitglieder deine Arbeit sehen und reviewen können."\n\nSie erklärt: "Wenn du einen Branch zum ersten Mal pushst, solltest du die -u (oder --set-upstream) Option verwenden. Das verknüpft deinen lokalen Branch mit dem Remote-Branch, was zukünftige Pushs und Pulls einfacher macht."',
    "remote.level3.story.realWorldContext":
        "In professionellen Teams werden neue Features typischerweise auf separaten Branches entwickelt und dann zur Review gepusht, bevor sie in den Hauptcode gemerged werden. Das ist ein zentraler Teil des Pull-Request-Workflows.",
    "remote.level3.story.taskIntroduction":
        "Pushe deinen Feature Branch zum Remote-Repository, damit andere ihn sehen können.",

    // Reset Stage
    "reset.name": "Commits zurücknehmen",
    "reset.description": "Lerne, wie du Commits rückgängig machst und in der Historie zurückgehst",

    "reset.level1.name": "Soft Reset - Änderungen behalten",
    "reset.level1.description": "Gehe zu einem früheren Commit zurück, behalte aber deine Änderungen",
    "reset.level1.objective1": "Mache den letzten Commit rückgängig während die Änderungen gestaged bleiben",
    "reset.level1.objective2": "Setze auf HEAD (aktuellen Commit) zurück um das Konzept zu verstehen",
    "reset.level1.objective3": "Setze auf einen spezifischen früheren Commit zurück mit HEAD~n Notation",
    "reset.level1.hint1": "Starte einfach: git reset --soft HEAD~1 (letzten Commit rückgängig machen)",
    "reset.level1.hint2": "Sieh dir zuerst die Commit-Historie an: git log --oneline",
    "reset.level1.hint3": "git reset --soft HEAD behält alles wie es ist (keine Änderung)",
    "reset.level1.hint4": "git reset --soft HEAD~2 geht 2 Commits zurück",
    "reset.level1.hint5": "Dateien bleiben nach --soft reset gestaged - perfekt zum Fixen von Commit-Nachrichten!",
    "reset.level1.hint6": "Verwende git status um zu sehen was nach dem Reset gestaged ist",
    "reset.level1.requirement1.description": "Mache den letzten Commit mit --soft rückgängig",
    "reset.level1.requirement1.success":
        "✅ Gut! Der Commit ist weg aber Dateien sind noch gestaged!",
    "reset.level1.requirement2.description": "Setze auf HEAD zurück um das Konzept zu verstehen",
    "reset.level1.requirement2.success": "✅ Perfekt! Reset auf HEAD bedeutet 'bleib wo du bist' - keine Änderungen!",
    "reset.level1.requirement3.description": "Setze auf einen früheren Commit zurück mit HEAD~n",
    "reset.level1.requirement3.success": "✅ Ausgezeichnet! Du hast die HEAD~n Notation für Soft Resets gemeistert!",
    "reset.level1.story.title": "Einen Fehler korrigieren",
    "reset.level1.story.narrative":
        '"Oh nein!", ruft Alex aus. "Ich habe gerade gesehen, dass der letzte Commit einen Fehler in der Commit-Nachricht hat und die Config-Datei falsch ist. Zum Glück gibt es git reset --soft!"\n\nEr erklärt: "Mit --soft kannst du zu einem früheren Commit zurückgehen, aber alle deine Änderungen bleiben im Staging-Bereich. Das ist perfekt, wenn du nur die Commit-Nachricht ändern oder Dateien zum Commit hinzufügen/entfernen möchtest."',
    "reset.level1.story.realWorldContext":
        "git reset --soft ist super nützlich, wenn du deinen letzten Commit korrigieren möchtest, ohne die Arbeit zu verlieren. Du kannst die Änderungen bearbeiten und dann erneut committen.",
    "reset.level1.story.taskIntroduction":
        "Verwende git reset --soft HEAD~1, um den letzten Commit rückgängig zu machen, aber die Änderungen zu behalten.",

    "reset.level2.name": "Hard Reset - Alles verwerfen",
    "reset.level2.description": "Gehe zu einem früheren Commit zurück und verwerfe alle Änderungen",
    "reset.level2.objective1": "Verwerfe den letzten buggy Commit komplett",
    "reset.level2.objective2": "Setze auf HEAD zurück um zu verstehen dass es nichts tut",
    "reset.level2.objective3": "Spring mehrere Commits zurück und verwerfe alles",
    "reset.level2.hint1": "⚠️ WARNUNG: --hard ist DESTRUKTIV! Alle Änderungen gehen permanent verloren!",
    "reset.level2.hint2": "Prüfe zuerst was du verlieren wirst: git log --oneline",
    "reset.level2.hint3": "git reset --hard HEAD~1 entfernt letzten Commit UND alle Änderungen",
    "reset.level2.hint4": "git reset --hard HEAD tut nichts (bereits bei HEAD)",
    "reset.level2.hint5": "git reset --hard HEAD~3 geht 3 Commits zurück, löscht alles",
    "reset.level2.hint6": "Nach --hard sind Änderungen WEG - keine Staging-Area, kein Working Directory",
    "reset.level2.hint7": "In Notfällen: git reflog kann helfen verlorene Commits wiederherzustellen",
    "reset.level2.requirement1.description": "Verwerfe den letzten Commit komplett mit --hard",
    "reset.level2.requirement1.success": "✅ Commit und Änderungen komplett gelöscht! Zurück zu einem sauberen Zustand.",
    "reset.level2.requirement2.description": "Setze auf HEAD zurück (keine Änderung)",
    "reset.level2.requirement2.success": "✅ Richtig! --hard HEAD ändert nichts - du bist bereits dort.",
    "reset.level2.requirement3.description": "Spring mehrere Commits zurück mit HEAD~n",
    "reset.level2.requirement3.success": "✅ Perfekt! Mehrere Commits entfernt, komplett sauberer Zustand!",
    "reset.level2.story.title": "Einen Neuanfang machen",
    "reset.level2.story.narrative":
        '"Manchmal läuft experimenteller Code völlig schief", sagt Alex ernst. "Der letzte Commit hat Bugs eingeführt und die Codebase ist jetzt instabil. Wir müssen komplett zur letzten funktionierenden Version zurück."\n\nEr warnt: "git reset --hard ist wie ein Zurückspulen der Zeit. Es entfernt Commits UND verwirft alle Änderungen im Arbeitsverzeichnis. Verwende es mit Vorsicht!"',
    "reset.level2.story.realWorldContext":
        "--hard reset ist ein mächtiges aber gefährliches Tool. Es wird verwendet, wenn du wirklich einen sauberen Slate brauchst. In Teams solltest du vorsichtig sein mit reset auf gepushten Commits - das kann andere verwirren.",
    "reset.level2.story.taskIntroduction":
        "Verwende git reset --hard HEAD~1, um zum vorherigen Commit zurückzukehren und alles zu verwerfen.",

    "reset.level3.name": "Reset zu einem spezifischen Commit",
    "reset.level3.description": "Gehe zu einem spezifischen Commit in der History zurück",
    "reset.level3.objective1": "Zeige die Commit-Historie an und identifiziere den guten Commit",
    "reset.level3.objective2": "Setze zu einem spezifischen Commit mit seinem Hash zurück",
    "reset.level3.hint1": "Verwende `git log --oneline` um Commits und ihre Hashes zu sehen",
    "reset.level3.hint2": "Dann verwende `git reset --soft HEAD~2`, um zwei Commits zurückzugehen",
    "reset.level3.hint3": "Du kannst auch einen Commit-Hash verwenden: git reset --soft abc1234",
    "reset.level3.hint4": "Suche nach 'Good version with styling' in der Historie",
    "reset.level3.hint5": "Tipp: Es ist wahrscheinlich bei HEAD~5 oder HEAD~6",
    "reset.level3.hint6": "Nach dem Reset verwende git status um zu sehen was gestaged ist",
    "reset.level3.hint7": "Du kannst die unerwünschten Dateien aus der Staging-Area entfernen",
    "reset.level3.requirement1.description": "Reset zu einem älteren Commit",
    "reset.level3.requirement1.success": "Perfekt! Du kannst jetzt zu jedem Punkt in der History zurückkehren.",
    "reset.level3.requirement2.description": "Finde und reset zum 'good version' Commit",
    "reset.level3.requirement2.success": "✅ Exzellent! Du hast den guten Commit gefunden und alle schlechten Commits entfernt!",
    "reset.level3.story.title": "Zeitreise in Git",
    "reset.level3.story.narrative":
        '"Manchmal musst du mehrere Commits zurückgehen", erklärt Sarah. "Du kannst HEAD~2 für zwei Commits zurück verwenden, HEAD~3 für drei, und so weiter. Oder du kannst den spezifischen Commit-Hash verwenden."\n\nSie zeigt dir: "git log zeigt dir alle Commits mit ihren Hashes. Du kannst dann git reset <hash> verwenden, um zu diesem exakten Punkt zurückzugehen."',
    "reset.level3.story.realWorldContext":
        "Die Fähigkeit, zu jedem Punkt in der History zurückzukehren, ist eine von Gits mächtigsten Features. Es gibt dir Sicherheit beim Experimentieren - du kannst immer zurück.",
    "reset.level3.story.taskIntroduction": "Verwende git reset, um zu einem früheren Commit in der History zurückzugehen.",

    // Rebase Stage
    "rebase.name": "Rebasing",
    "rebase.description": "Lerne, wie du Branches rebasen kannst",

    // Rebase Level 1
    "rebase.level1.name": "Grundlegendes Rebasing",
    "rebase.level1.description": "Wende Commits von einem Branch auf einen anderen an",
    "rebase.level1.objective1": "Rebase den aktuellen Branch auf einen anderen Branch",
    "rebase.level1.hint1": "Du bist auf dem feature Branch - rebase ihn auf main mit: git rebase main",
    "rebase.level1.hint2": "Dies schreibt die Historie um, indem deine Commits auf mains neueste Commits angewendet werden",
    "rebase.level1.hint3": "Verwende 'git log --oneline' um die Commit-Historie nach dem Rebase zu sehen",
    "rebase.level1.requirement1.description": "Rebase auf einen anderen Branch",
    "rebase.level1.requirement1.success": "Großartig! Du hast den Branch erfolgreich rebasiert.",
    "rebase.level1.story.title": "Erstellen einer sauberen Historie",
    "rebase.level1.story.narrative":
        '"Ich sehe, du wirst vertraut mit dem Mergen", sagt Sarah. "Lass uns jetzt einen anderen Ansatz zur Integration von Änderungen erkunden: Rebasing."\n\nSie erklärt: "Während das Mergen Historien zusammenführt, schreibt Rebasing sie um, indem deine Commits so verschoben werden, dass sie nach den Commits eines anderen Branches erscheinen. Dies erzeugt eine linearere, sauberere Historie."',
    "rebase.level1.story.realWorldContext":
        "Rebasing wird oft bevorzugt, wenn du eine saubere, lineare Projekthistorie beibehalten möchtest. Viele Teams nutzen es, um Feature-Branches zu integrieren, bevor sie in den Hauptbranch gemerged werden.",
    "rebase.level1.story.taskIntroduction": "Du bist auf dem feature Branch. Rebase ihn auf main mit: git rebase main",

    // Rebase Level 2
    "rebase.level2.name": "Umgang mit Rebase-Konflikten",
    "rebase.level2.description": "Lerne, wie man mit Rebase-Konflikten umgeht oder Rebases abbricht",
    "rebase.level2.objective1": "Brich einen Rebase mit Konflikten ab",
    "rebase.level2.hint1": "Verwende den Befehl `git rebase --abort`",
    "rebase.level2.hint2": "Dies stoppt den Rebase-Prozess und kehrt zum Zustand vor dem Rebase zurück",
    "rebase.level2.requirement1.description": "Brich einen Rebase mit Konflikten ab",
    "rebase.level2.requirement1.success": "Ausgezeichnet! Du hast den Rebase-Vorgang erfolgreich abgebrochen.",
    "rebase.level2.story.title": "Wenn Rebases kompliziert werden",
    "rebase.level2.story.narrative":
        '"Genau wie beim Mergen kann Rebasing zu Konflikten führen", weist Alex darauf hin. "Aber das Lösen von Konflikten während eines Rebases kann komplexer sein, weil Git jeden deiner Commits einzeln anwendet."\n\nEr fährt fort: "Wenn du mitten in einem Rebase bist und entscheidest, dass es zu komplex ist oder du deinen Ansatz überdenken musst, kannst du den Prozess jederzeit abbrechen."',
    "rebase.level2.story.realWorldContext":
        "Zu wissen, wann und wie man einen Rebase abbricht, ist in der realen Entwicklung wichtig. Manchmal sind die Konflikte zu komplex, um sie sofort zu lösen, oder du erkennst, dass eine andere Strategie besser wäre.",
    "rebase.level2.story.taskIntroduction": "Übe das Abbrechen eines Rebase-Vorgangs mit git rebase --abort.",

    // Rebase Level 3
    "rebase.level3.name": "Interaktives Rebasing",
    "rebase.level3.description": "Lerne, wie man interaktives Rebasing nutzt, um die Commit-Historie zu ändern",
    "rebase.level3.objective1": "Starte eine interaktive Rebasing-Sitzung",
    "rebase.level3.hint1": "Verwende den Befehl `git rebase -i`",
    "rebase.level3.hint2":
        "Interaktives Rebasing ermöglicht dir, Commits zu ordnen, zu bearbeiten, zusammenzuführen oder zu löschen",
    "rebase.level3.requirement1.description": "Starte ein interaktives Rebase",
    "rebase.level3.requirement1.success": "Perfekt! Du hast eine interaktive Rebasing-Sitzung gestartet.",
    "rebase.level3.story.title": "Aufräumen der Historie",
    "rebase.level3.story.narrative":
        '"Dein Feature sieht gut aus", sagt Alex, während er deinen Code überprüft. "Aber ich sehe, dass du mehrere kleine Commits mit Tippfehler-Korrekturen und kleinen Änderungen hast. Bevor wir das in den main-Branch mergen, sollten wir die Commit-Historie aufräumen."\n\nEr erklärt: "Git bietet ein mächtiges Werkzeug namens interaktives Rebasing, mit dem du deine Commit-Historie ändern kannst. Du kannst kleine Commits zusammenführen, Commit-Nachrichten umformulieren oder sogar Commits komplett löschen."',
    "rebase.level3.story.realWorldContext":
        "Interaktives Rebasing wird häufig verwendet, um eine saubere, zusammenhängende Commit-Historie zu erstellen, bevor Feature-Branches gemerged werden. Dies macht die Codebase-Historie lesbarer und aussagekräftiger.",
    "rebase.level3.story.taskIntroduction":
        "Starte eine interaktive Rebasing-Sitzung, um deine Commit-Historie zu modifizieren.",

    // Rebase Level 4
    "rebase.level4.name": "Rebasing auf Main",
    "rebase.level4.description":
        "Lerne den Workflow des Rebasings von Feature-Branches auf aktualisierte Main-Branches",
    "rebase.level4.objective1": "Rebase deinen Feature-Branch auf den aktualisierten Main-Branch",
    "rebase.level4.hint1": "Verwende `git rebase main` während du auf deinem Feature-Branch bist",
    "rebase.level4.hint2": "Dies wird deine Feature-Änderungen auf den neuesten Stand des Main-Branches anwenden",
    "rebase.level4.requirement1.description": "Rebase Feature auf Main",
    "rebase.level4.requirement1.success":
        "Ausgezeichnet! Du hast deinen Feature-Branch auf den neuesten Main-Branch rebasiert.",
    "rebase.level4.story.title": "Auf dem neuesten Stand bleiben",
    "rebase.level4.story.narrative":
        '"Ich sehe, dass während du an deinem Feature gearbeitet hast, jemand anderes Änderungen zum Main-Branch gepusht hat", weist Sarah hin. "Bevor wir deine Arbeit mergen, solltest du diese neuesten Änderungen einarbeiten."\n\nSie fährt fort: "Anstatt Main in deinen Branch zu mergen, was einen Merge-Commit erzeugt, empfehle ich, deinen Branch auf Main zu rebasen. Das hält die Historie sauberer."',
    "rebase.level4.story.realWorldContext":
        "In kollaborativen Umgebungen werden Main-Branches häufig aktualisiert. Das Rebasing von Feature-Branches auf Main ist ein gängiger Workflow, der hilft, Merge-Konflikte zu vermeiden und Feature-Branches auf dem neuesten Stand zu halten.",
    "rebase.level4.story.taskIntroduction":
        "Rebase deinen Feature-Branch auf den aktualisierten Main-Branch, um die neuesten Änderungen einzuarbeiten.",

    // Advanced Stage
    "advanced.name": "Fortgeschrittene Git-Techniken",
    "advanced.description": "Meistere fortgeschrittene Git-Features und Workflows",

    // Advanced Level 1: Git Tags
    "advanced.level1.name": "Versions-Tagging",
    "advanced.level1.description": "Lerne, wichtige Punkte in der Historie mit Tags zu markieren",
    "advanced.level1.objective1": "Erstelle einen annotierten Tag für ein Release",
    "advanced.level1.objective2": "Liste alle Tags im Repository auf",
    "advanced.level1.objective3": "Pushe Tags zum Remote-Repository",
    "advanced.level1.hint1": "Erstelle einen annotierten Tag mit: git tag -a v1.0.1 -m 'Bug fix release'",
    "advanced.level1.hint2": "Liste alle Tags auf mit: git tag",
    "advanced.level1.hint3": "Annotierte Tags enthalten Autor-Informationen und eine Nachricht",
    "advanced.level1.hint4": "Tags werden verwendet, um Release-Punkte zu markieren (v1.0, v2.0, etc.)",
    "advanced.level1.requirement1.description": "Erstelle einen Versions-Tag",
    "advanced.level1.requirement1.success": "Ausgezeichnet! Du hast diesen Commit als Release-Punkt markiert.",
    "advanced.level1.requirement2.description": "Liste alle Tags auf, um deinen neuen Tag zu sehen",
    "advanced.level1.requirement2.success": "Perfekt! Du kannst alle Tags im Repository sehen.",
    "advanced.level1.requirement3.description": "Pushe die Tags zum Remote-Repository",
    "advanced.level1.requirement3.success": "Ausgezeichnet! Deine Tags sind jetzt für das Team verfügbar.",
    "advanced.level1.story.title": "Meilensteine markieren",
    "advanced.level1.story.narrative":
        "\"Wir werden gleich Version 1.0 in Produktion deployen\", verkündet dein Team Lead. \"Bevor wir das tun, müssen wir diesen Commit taggen. Tags sind wie Lesezeichen in deiner Git-Historie - sie markieren wichtige Punkte wie Releases.\"\n\nSie fährt fort: \"Anders als Branches, die sich mit neuen Commits bewegen, bleiben Tags fix. Das bedeutet, wir können immer zurück zu genau dem Stand gehen, den wir in v1.0 ausgeliefert haben, selbst Jahre später.\"\n\n\"In professionellen Teams bekommt jedes Produktions-Release einen Tag. Das ist essenziell für Debugging, Rollbacks und Changelogs.\"",
    "advanced.level1.story.realWorldContext":
        "Tags sind Industriestandard für das Markieren von Releases. Sie ermöglichen semantische Versionierung (v1.0.0), machen Rollbacks sicher und helfen Teams, über spezifische Versionen zu kommunizieren.",
    "advanced.level1.story.taskIntroduction": "Erstelle einen annotierten Tag um dieses Release zu markieren: git tag -a v1.0.1 -m 'Bug fix release'",

    // Advanced Level 2: Git Log Advanced
    "advanced.level2.name": "Fortgeschrittene Commit-Historie",
    "advanced.level2.description": "Meistere fortgeschrittene Techniken um die Repository-Historie zu erkunden",
    "advanced.level2.objective1": "Zeige komprimierte Commit-Historie an",
    "advanced.level2.objective2": "Filtere Commits nach Autor oder Datum",
    "advanced.level2.objective3": "Durchsuche Commit-Nachrichten",
    "advanced.level2.hint1": "Zeige einzeilige Commit-Historie mit: git log --oneline",
    "advanced.level2.hint2": "Zeige Commit-Historie mit Graph: git log --graph --oneline",
    "advanced.level2.hint3": "Begrenze auf die letzten N Commits: git log --oneline -n 5",
    "advanced.level2.hint4": "Suche in Commit-Nachrichten: git log --grep='fix'",
    "advanced.level2.requirement1.description": "Zeige kompakte Commit-Historie an",
    "advanced.level2.requirement1.success": "Perfekt! Du hast die Commit-Historie erkundet.",
    "advanced.level2.requirement2.description": "Filtere Commits nach Autor",
    "advanced.level2.requirement2.success": "Großartig! Du kannst jetzt Commits von bestimmten Autoren finden.",
    "advanced.level2.requirement3.description": "Durchsuche Commit-Nachrichten nach Text",
    "advanced.level2.requirement3.success": "Ausgezeichnet! Du kannst jetzt durch Commit-Nachrichten suchen.",
    "advanced.level2.story.title": "Historie erkunden",
    "advanced.level2.story.narrative":
        "\"Ein Bug wurde irgendwo in den letzten 50 Commits eingeführt\", seufzt dein Kollege. \"Wie finde ich ihn?\"\n\nDein Senior Developer lächelt: \"Git log ist dein Detektiv-Werkzeug. Das Standard-Format zeigt alles, aber das ist überwältigend. Lass mich dir die Power-Tools zeigen.\"\n\n\"git log --oneline zeigt jeden Commit in einer Zeile - perfekt zum Scannen. Füge --graph hinzu, um die Branch-Struktur zu sehen. Verwende --grep, um Commit-Nachrichten zu durchsuchen. Diese Skills verwandeln dich von einem Git-Nutzer in einen Git-Detektiv.\"",
    "advanced.level2.story.realWorldContext":
        "Git log zu meistern ist essenziell für Debugging, Code-Archäologie und das Verstehen der Projekt-Evolution. Professionelle Entwickler nutzen diese Flags täglich.",
    "advanced.level2.story.taskIntroduction": "Erkunde die Commit-Historie mit: git log --oneline",

    // Advanced Level 3: Git Show
    "advanced.level3.name": "Commits inspizieren",
    "advanced.level3.description": "Lerne, spezifische Commits im Detail zu inspizieren",
    "advanced.level3.objective1": "Inspiziere einen spezifischen Commit mit seinem Hash",
    "advanced.level3.hint1": "Nutze zuerst 'git log --oneline' um einen Commit-Hash zu finden",
    "advanced.level3.hint2": "Zeige einen spezifischen Commit: git show <commit-hash>",
    "advanced.level3.hint3": "git show zeigt die Commit-Nachricht, Autor, Datum und Diff mit Dateiänderungen an",
    "advanced.level3.requirement1.description": "Inspiziere einen Commit mit seinem Hash",
    "advanced.level3.requirement1.success": "Großartig! Du hast die Commit-Details und Dateiänderungen inspiziert.",
    "advanced.level3.story.title": "Commit-Forensik",
    "advanced.level3.story.narrative":
        "\"Dieser Commit hat etwas kaputt gemacht, aber ich kann nicht erkennen, was sich geändert hat\", sagt dein Teamkollege.\n\n\"Verwende git show!\", antwortest du selbstbewusst. \"Es zeigt dir alles über einen Commit: die Nachricht, wer ihn gemacht hat, wann, und am wichtigsten - die tatsächlichen Code-Änderungen.\"\n\n\"Es ist wie eine Lupe für Commits. Essenziell für Code-Reviews, Debugging und das Verstehen dessen, was Kollegen geändert haben.\"",
    "advanced.level3.story.realWorldContext":
        "git show ist ein fundamentales Werkzeug für Code-Review und Debugging. Es wird ständig in Pull Requests und bei der Untersuchung von Problemen verwendet.",
    "advanced.level3.story.taskIntroduction": "Inspiziere den letzten Commit mit: git show",

    // Archaeology Stage
    "archaeology.name": "Git-Archäologie",
    "archaeology.description": "Untersuche Code-Historie und führe Git-Forensik wie ein Detektiv durch",

    // Mastery Stage
    "mastery.name": "Git-Meisterschaft",
    "mastery.description": "Die ultimativen Git-Herausforderungen für wahre Meister",

    // Archaeology Stage Levels
    "archaeology.level1.name": "Git Blame - Code-Archäologie",
    "archaeology.level1.description": "Untersuche Code-Historie um Änderungen zu verstehen und den Ursprung von Bugs zu finden",
    "archaeology.level1.objective1": "Finde heraus wer bestimmte Zeilen geschrieben hat",
    "archaeology.level1.objective2": "Verfolge die Historie eines Bugs",
    "archaeology.level1.objective3": "Verstehe den Kontext von Code-Änderungen",
    "archaeology.level1.objective4": "Finde verwandte Commits und Änderungen",
    "archaeology.level1.hint1": "git blame zeigt wer jede Zeile zuletzt geändert hat",
    "archaeology.level1.hint2": "Verwende die -L Option um spezifische Zeilenbereiche zu untersuchen",
    "archaeology.level1.hint3": "Kombiniere blame mit log um den Kontext zu verstehen",
    "archaeology.level1.hint4": "Suche nach Mustern in Commit-Nachrichten",
    "archaeology.level1.requirement1.description": "Untersuche wer die Validierungslogik geschrieben hat",
    "archaeology.level1.requirement1.success": "Code-Urheberschaft aufgedeckt!",
    "archaeology.level1.requirement2.description": "Prüfe die aktuelle Commit-Historie für Kontext",
    "archaeology.level1.requirement2.success": "Aktuelle Historie untersucht!",
    "archaeology.level1.requirement3.description": "Untersuche die Details eines spezifischen Commits",
    "archaeology.level1.requirement3.success": "Commit-Details analysiert!",
    "archaeology.level1.story.title": "Der Fall des mysteriösen Bugs",
    "archaeology.level1.story.narrative": "Ein kritischer Bug im Validierungscode betrifft 23% der europäischen Kunden. Der Code wurde von 4 verschiedenen Entwicklern über 18 Monate geschrieben. Dein Senior-Entwickler erklärt: 'Willkommen bei der Code-Archäologie! Git ist nicht nur Versionskontrolle - es ist deine Zeitmaschine. Jede Zeile hat eine Geschichte.' Nutze git blame, git log und git show um den Bug zu untersuchen und zu verstehen warum der Code so geschrieben wurde.",
    "archaeology.level1.story.realWorldContext": "Code-Archäologie-Fähigkeiten sind essenziell für die Wartung großer, langlebiger Codebasen mit mehreren Mitwirkenden.",
    "archaeology.level1.story.taskIntroduction": "Lerne Code-Historie zu untersuchen und die Quelle von Bugs mithilfe von Git-Forensik-Tools aufzuspüren.",

    "archaeology.level2.name": "Commit-Forensik mit Git Log",
    "archaeology.level2.description": "Beherrsche fortgeschrittene Techniken zur Untersuchung komplexer Code-Historie",
    "archaeology.level2.objective1": "Verwende erweiterte Log-Filter um spezifische Änderungen zu finden",
    "archaeology.level2.objective2": "Verfolge Datei-Umbenennungen und -Verschiebungen",
    "archaeology.level2.objective3": "Finde Commits anhand von Inhaltsänderungen",
    "archaeology.level2.objective4": "Analysiere Commit-Muster und Trends",
    "archaeology.level2.hint1": "Verwende --grep um Commit-Nachrichten zu durchsuchen",
    "archaeology.level2.hint2": "Verwende -S um zu finden wann spezifischer Text hinzugefügt/entfernt wurde",
    "archaeology.level2.hint3": "Verwende --follow um Dateien durch Umbenennungen zu verfolgen",
    "archaeology.level2.hint4": "Kombiniere Filter für mächtige Suchen",
    "archaeology.level2.requirement1.description": "Finde alle Commits die mit Security zu tun haben",
    "archaeology.level2.requirement1.success": "Sicherheitsrelevante Commits gefunden!",
    "archaeology.level2.requirement2.description": "Finde Commits die 'password' Text hinzugefügt oder entfernt haben",
    "archaeology.level2.requirement2.success": "Passwort-bezogene Änderungen verfolgt!",
    "archaeology.level2.requirement3.description": "Finde alle Commits von Sarah um ihre Beiträge zu verstehen",
    "archaeology.level2.requirement3.success": "Sarahs Beitrags-Historie analysiert!",
    "archaeology.level2.story.title": "Der Security-Audit-Pfad",
    "archaeology.level2.story.narrative": "Deine Firma erhielt ein Security-Audit. Die Auditoren wollen eine vollständige Historie aller sicherheitsrelevanten Änderungen: Authentifizierung, Passwort-Handling, Verschlüsselung. Die Codebase hat 2.847 Commits über 3 Jahre. Dein Security-Lead erklärt Gits Such-Fähigkeiten: --grep für Nachrichten, -S für Code-Inhalt, --author für Mitwirkende. Erstelle einen umfassenden Audit-Trail mit fortgeschrittenen git log Techniken.",
    "archaeology.level2.story.realWorldContext": "Fortgeschrittene Git-Log-Techniken sind essenziell für Security-Audits, Code-Reviews und das Verstehen komplexer Projekt-Historien.",
    "archaeology.level2.story.taskIntroduction": "Beherrsche fortgeschrittene Git-Log-Techniken für umfassende Code-Historie-Untersuchung und forensische Analyse.",

    "archaeology.level3.name": "Git Reflog - Die Zeitmaschine",
    "archaeology.level3.description": "Verwende Git reflog um verlorene Commits wiederherzustellen und Repository-Zustandsänderungen zu verstehen",
    "archaeology.level3.objective1": "Verstehe was reflog verfolgt",
    "archaeology.level3.objective2": "Stelle versehentlich gelöschte Commits wieder her",
    "archaeology.level3.objective3": "Finde verlorene Branch-Referenzen",
    "archaeology.level3.objective4": "Stelle frühere Repository-Zustände wieder her",
    "archaeology.level3.hint1": "Reflog verfolgt alle HEAD-Bewegungen",
    "archaeology.level3.hint2": "Verwende git reflog um kürzliche Aktionen zu sehen",
    "archaeology.level3.hint3": "git reset --hard kann reflog-Referenzen verwenden",
    "archaeology.level3.hint4": "Reflog-Einträge verfallen standardmäßig nach 90 Tagen",
    "archaeology.level3.requirement1.description": "Prüfe das reflog um kürzliche HEAD-Bewegungen zu sehen",
    "archaeology.level3.requirement1.success": "Reflog-Historie untersucht!",
    "archaeology.level3.requirement2.description": "Setze auf einen früheren Zustand mit reflog-Referenz zurück",
    "archaeology.level3.requirement2.success": "Repository-Zustand wiederhergestellt!",
    "archaeology.level3.requirement3.description": "Erstelle einen Recovery-Branch von einem reflog-Eintrag",
    "archaeology.level3.requirement3.success": "Recovery-Branch erstellt!",
    "archaeology.level3.story.title": "Die große Git-Katastrophen-Wiederherstellung",
    "archaeology.level3.story.narrative": "Es ist Freitag 16:30 Uhr. Dein Teamkollege Jake gerät in Panik: 'Ich habe versehentlich git reset --hard ausgeführt und zwei Wochen Arbeit verloren! Das Authentifizierungssystem, UI-Komponenten, Tests - alles weg!' Aber du erinnerst dich: Git vergisst nie. Git reflog verfolgt jeden Commit, Branch-Wechsel, Merge und Reset. Selbst 'gelöschte' Commits existieren im reflog für 90 Tage. Deine Mission: Untersuche das reflog, finde die verlorenen Commits und stelle Jakes Arbeit wieder her. Zeit der Held zu sein!",
    "archaeology.level3.story.realWorldContext": "Git reflog ist ein mächtiges Wiederherstellungs-Tool das Entwickler vor katastrophalen Datenverlusten retten kann.",
    "archaeology.level3.story.taskIntroduction": "Beherrsche Git reflog um der Held zu werden der 'verlorene' Arbeit wiederherstellen und den Tag retten kann.",

    // Workflow Stage
    "workflow.name": "Git Workflows",
    "workflow.description": "Lerne professionelle Git-Workflows für Teamarbeit",

    "workflow.level1.name": "Feature Branch Workflow",
    "workflow.level1.description": "Lerne den branchenüblichen Feature-Branch-Workflow, der von Teams weltweit verwendet wird",
    "workflow.level1.objective1": "Erstelle einen Feature-Branch von main",
    "workflow.level1.objective2": "Mache Commits mit beschreibenden Nachrichten",
    "workflow.level1.objective3": "Push deinen Feature-Branch zum Remote",
    "workflow.level1.objective4": "Wechsle zurück zum main Branch",
    "workflow.level1.objective5": "Merge deinen Feature-Branch zurück zu main",
    "workflow.level1.objective6": "Vervollständige den Feature-Branch-Workflow",
    "workflow.level1.hint1": "Beginne mit der Erstellung eines Feature-Branches: 'git switch -c feature/user-auth'",
    "workflow.level1.hint2": "Modifiziere die auth.js Datei, dann verwende 'git add' um deine Änderungen zu stagen",
    "workflow.level1.hint3": "Committe mit: 'git commit'",
    "workflow.level1.hint4": "Push zum Remote: 'git push origin feature/user-auth'",
    "workflow.level1.hint5": "Wechsle zurück zu main: 'git switch main'",
    "workflow.level1.hint6": "Abschließend merge: 'git merge feature/user-auth'",
    "workflow.level1.requirement1.description": "Erstelle einen neuen Feature-Branch mit 'git switch -c <branch>'",
    "workflow.level1.requirement1.success": "Feature-Branch erfolgreich erstellt!",
    "workflow.level1.requirement2.description": "Stage deine Änderungen (modifiziere zuerst eine Datei!)",
    "workflow.level1.requirement2.success": "Änderungen gestaged!",
    "workflow.level1.requirement3.description": "Committe deine Änderungen mit einer beschreibenden Nachricht",
    "workflow.level1.requirement3.success": "Änderungen committed!",
    "workflow.level1.requirement4.description": "Push deinen Feature-Branch zum Remote (git push origin <dein-branch>)",
    "workflow.level1.requirement4.success": "Feature-Branch zum Remote gepusht!",
    "workflow.level1.requirement5.description": "Wechsle zurück zum main Branch mit 'git switch main'",
    "workflow.level1.requirement5.success": "Zu main Branch gewechselt!",
    "workflow.level1.requirement6.description": "Merge deinen Feature-Branch in main",
    "workflow.level1.requirement6.success": "Feature erfolgreich gemergt! So integrieren echte Teams neue Features.",
    "workflow.level1.story.title": "Die Feature-Fabrik",
    "workflow.level1.story.narrative":
        `Du bist Entwickler bei TechCorp und das Team folgt strikten Git-Workflows. Deine Managerin Sarah hat dir gerade ein neues Feature zugewiesen: die Implementierung der Benutzer-Authentifizierung.

"Denk dran," sagt Sarah, "wir committen nie direkt auf main. Verwende immer Feature-Branches und stelle sicher, dass deine Commits eine Geschichte erzählen."

**Was ist ein Feature-Branch?**
Ein Feature-Branch ist ein separater Branch, auf dem du ein neues Feature isoliert entwickelst. Das ermöglicht dir:
- Zu arbeiten ohne den stabilen main Branch zu beeinflussen
- Code-Reviews zu bekommen bevor du mergst
- Arbeit einfach zu verwerfen oder zu ändern ohne andere zu beeinflussen

**Der komplette Workflow:**
1. Erstelle einen Feature-Branch von main: \`git switch -c feature/user-auth\`
2. Ändere Dateien und stage sie mit \`git add\`
3. Committe Änderungen mit beschreibenden Nachrichten
4. Pushe deinen Branch zum Remote: \`git push origin feature/user-auth\`
5. Wechsle zurück zu main: \`git switch main\`
6. Merge das Feature: \`git merge feature/user-auth\`

**Was sind Pull Requests (PRs)?**
In echten Teams würdest du nach Schritt 4 (Push deines Branches) einen **Pull Request** auf GitHub/GitLab erstellen statt direkt zu mergen:

**Pull Request Workflow:**
1. Du pushst deinen Feature-Branch zum Remote-Repository
2. Auf GitHub/GitLab öffnest du einen Pull Request von \`feature/user-auth\` zu \`main\`
3. Deine Teamkollegen erhalten eine Benachrichtigung
4. Sie reviewen deinen Code, hinterlassen Kommentare und schlagen Verbesserungen vor
5. Du machst Änderungen basierend auf dem Feedback und pushst erneut
6. Nach der Genehmigung merged jemand den PR in main
7. Dein Feature ist jetzt Teil der main Codebasis!

**Warum Pull Requests wichtig sind:**
- **Code-Qualität**: Mehrere Augen fangen Bugs und schlagen Verbesserungen vor
- **Wissensaustausch**: Das Team lernt über Änderungen bevor sie live gehen
- **Dokumentation**: PR-Beschreibungen erklären WARUM Änderungen gemacht wurden
- **Diskussion**: Komplexe Entscheidungen werden diskutiert und aufgezeichnet
- **Sicherheit**: Verhindert, dass fehlerhafter Code in Produktion gelangt

In diesem Level simulieren wir den Workflow indem du pushst und direkt mergst, um die Git-Befehle zu lernen. In echten Projekten würdest du immer Pull Requests für Team-Kollaboration verwenden!`,
    "workflow.level1.story.realWorldContext":
        "Der Feature-Branch-Workflow ist der Industriestandard. Entwickler erstellen isolierte Branches, pushen sie zu Remote-Repos (GitHub/GitLab), erstellen Pull Requests für Code-Reviews und mergen nach Genehmigung. Dieser kollaborative Ansatz verhindert, dass instabiler Code in Produktion gelangt und verbessert die Code-Qualität durch Peer-Reviews.",
    "workflow.level1.story.taskIntroduction":
        "Meistere den kompletten Feature-Branch-Workflow: erstellen, committen, pushen und mergen. So liefern professionelle Teams täglich Features aus.",

    "workflow.level2.name": "Hotfix-Workflow",
    "workflow.level2.description": "Behandle dringende Produktions-Fixes mit dem Hotfix-Workflow",
    "workflow.level2.objective1": "Erstelle einen Hotfix-Branch von main",
    "workflow.level2.objective2": "Änderungen stagen und committen",
    "workflow.level2.objective3": "Zurück zu main wechseln",
    "workflow.level2.objective4": "Hotfix-Branch mergen",
    "workflow.level2.hint1": "Hotfixes branchen direkt von main/master",
    "workflow.level2.hint2": "Verwende beschreibende Hotfix-Namen wie 'hotfix/critical-security-patch'",
    "workflow.level2.hint3": "Hotfixes sollten zurück zu main und develop Branches gemergt werden",
    "workflow.level2.hint4": "Tagge Hotfix-Releases immer für die Nachverfolgung",
    "workflow.level2.requirement1.description": "Erstelle einen Hotfix-Branch für das Sicherheitsproblem",
    "workflow.level2.requirement1.success": "Hotfix-Branch erstellt!",
    "workflow.level2.requirement2.description": "Stage deine Sicherheits-Fixes",
    "workflow.level2.requirement2.success": "Sicherheits-Fixes gestaged!",
    "workflow.level2.requirement3.description": "Committe den kritischen Sicherheits-Patch",
    "workflow.level2.requirement3.success": "Sicherheits-Patch committed!",
    "workflow.level2.requirement4.description": "Wechsle zurück zum main Branch",
    "workflow.level2.requirement4.success": "Zu main Branch gewechselt!",
    "workflow.level2.requirement5.description": "Merge den Hotfix in main",
    "workflow.level2.requirement5.success": "Hotfix erfolgreich gemergt!",
    "workflow.level2.story.title": "Code Rot: Produktions-Notfall",
    "workflow.level2.story.narrative":
        `🚨 DRINGEND: Produktion ist down! 🚨

Um 2:47 Uhr morgens vibriert dein Telefon mit Alarmen. Das Zahlungssystem fällt aus und Kunden können keine Käufe abschließen. Der Bug-Tracker zeigt eine kritische Sicherheitslücke, die im letzten Release eingeführt wurde.

Als Bereitschafts-Entwickler musst du:
1. Sofort einen Hotfix-Branch erstellen: \`git switch -c hotfix/security-patch\`
2. Das kritische Sicherheitsproblem im Code beheben
3. Deine Fixes stagen und committen
4. Zurück zu main wechseln: \`git switch main\`
5. Den Hotfix mergen: \`git merge hotfix/security-patch\`

Jede Minute kostet das Unternehmen Tausende. Das unterscheidet Junior- von Senior-Entwicklern - Anmut unter Druck und das Wissen um die richtigen Git-Workflows.

Zeit ist Geld. Lass uns das fixen!`,
    "workflow.level2.story.realWorldContext":
        "Produktions-Hotfixes sind kritisch für die Aufrechterhaltung der Systemstabilität und erfordern sofortige, fokussierte Workflow-Ausführung.",
    "workflow.level2.story.taskIntroduction": "Meistere den Hotfix-Workflow für Notfall-Produktions-Fixes.",

    "workflow.level3.name": "Git Flow Meisterschaft",
    "workflow.level3.description": "Meistere den kompletten Git-Flow-Workflow mit Release-Branches",
    "workflow.level3.objective1": "Erstelle einen Release-Branch von develop",
    "workflow.level3.objective2": "Bereite vor und committe Release-Änderungen",
    "workflow.level3.objective3": "Merge das Release zu main",
    "workflow.level3.objective4": "Tagge die Release-Version",
    "workflow.level3.hint1": "Starte auf develop und erstelle Release-Branch: 'git switch -c release/2.0.0'",
    "workflow.level3.hint2": "Mache finale Anpassungen und committe deine Release-Vorbereitung",
    "workflow.level3.hint3": "Wechsle zu main: 'git switch main'",
    "workflow.level3.hint4": "Merge das Release: 'git merge release/2.0.0'",
    "workflow.level3.hint5": "Tagge das Release: 'git tag v2.0.0'",
    "workflow.level3.hint6": "In echten Projekten würdest du auch zurück zu develop mergen",
    "workflow.level3.requirement1.description": "Erstelle einen Release-Branch (z.B. 'release/2.0.0')",
    "workflow.level3.requirement1.success": "Release-Branch erstellt!",
    "workflow.level3.requirement2.description": "Stage deine Release-Vorbereitungs-Änderungen",
    "workflow.level3.requirement2.success": "Release-Änderungen gestaged!",
    "workflow.level3.requirement3.description": "Committe die Release-Vorbereitung mit einer klaren Nachricht",
    "workflow.level3.requirement3.success": "Release-Vorbereitung committed!",
    "workflow.level3.requirement4.description": "Wechsle zum main Branch um für den Release-Merge vorzubereiten",
    "workflow.level3.requirement4.success": "Zu main gewechselt!",
    "workflow.level3.requirement5.description": "Merge deinen Release-Branch in main",
    "workflow.level3.requirement5.success": "Release zu main gemergt!",
    "workflow.level3.requirement6.description": "Tagge das Release mit Versionsnummer (z.B. 'v2.0.0')",
    "workflow.level3.requirement6.success": "Release getaggt! Version 2.0.0 ist jetzt live in Produktion!",
    "workflow.level3.story.title": "Der Release-Manager",
    "workflow.level3.story.narrative":
        `Glückwunsch! Du wurdest zum Release-Manager bei GitFlow Inc. befördert, einem Unternehmen das alle zwei Wochen wie ein Uhrwerk Software ausliefert.

Deine Aufgabe ist es, das Release der Version 2.0 zu orchestrieren, welches beinhaltet:
- Drei neue Features von verschiedenen Teams
- Zwei kritische Bug-Fixes
- Performance-Verbesserungen
- Aktualisierte Dokumentation

**Der Release-Workflow:**

1. **Release-Branch erstellen**: Starte von develop und erstelle einen Release-Branch
   \`git switch -c release/2.0.0\`

2. **Finale Vorbereitungen**: Versionsnummern aktualisieren, CHANGELOG, etc.
   - Dateien nach Bedarf bearbeiten
   - \`git add .\`
   - \`git commit -m "Release 2.0.0 vorbereiten"\`

3. **Zu Main mergen**: In Produktion deployen
   - \`git switch main\`
   - \`git merge release/2.0.0\`

4. **Release taggen**: Diese Version in der Historie markieren
   \`git tag v2.0.0\`

Das erstellt einen permanenten Marker für dieses Release. In echten Projekten würdest du auch:
- Zurück zu develop mergen um es synchron zu halten
- Den Release-Branch löschen
- Alles zum Remote pushen
- In Produktion deployen

Das ist Git-Management auf Enterprise-Level. Willkommen in der großen Liga!`,
    "workflow.level3.story.realWorldContext":
        "Release-Branches werden in Git Flow verwendet um Produktions-Releases vorzubereiten. Sie ermöglichen finale Bug-Fixes und Dokumentations-Updates ohne die laufende Entwicklung zu blockieren. Das Release wird für einfache Referenz und Rollback bei Bedarf getaggt.",
    "workflow.level3.story.taskIntroduction":
        "Lerne den professionellen Release-Workflow: branchen, vorbereiten, mergen und taggen. So liefern Teams stabile Software in Produktion aus.",

    // Teamwork Stage
    "teamwork.name": "Team-Kollaboration",
    "teamwork.description": "Lerne effektiv mit Teams zu arbeiten mit Git-Kollaborations-Techniken",

    "teamwork.level1.name": "Team-Kollaboration Grundlagen",
    "teamwork.level1.description": "Lerne wie man effektiv mit einem Team mit Git arbeitet",
    "teamwork.level1.objective1": "Hole den neuesten Team-Code vom Remote",
    "teamwork.level1.objective2": "Erstelle einen neuen Feature-Branch für deine Arbeit",
    "teamwork.level1.objective3": "Bearbeite team.md und füge deinen Namen zur Liste hinzu",
    "teamwork.level1.objective4": "Stage deine Änderungen",
    "teamwork.level1.objective5": "Committe deine Änderungen",
    "teamwork.level1.objective6": "Push deine Änderungen zum Remote",
    "teamwork.level1.hint1": "Starte mit: 'git pull origin main' um die neueste Version zu holen",
    "teamwork.level1.hint2": "Erstelle deinen Feature-Branch: 'git switch -c feature/my-feature'",
    "teamwork.level1.hint3": "Modifiziere Dateien, dann stage mit 'git add'",
    "teamwork.level1.hint4": "Stage alle Änderungen mit: 'git add .'",
    "teamwork.level1.hint5": "Committe mit: 'git commit -m \"Mein Profil hinzufügen\"'",
    "teamwork.level1.hint6": "Push zum Remote: 'git push origin feature/my-feature'",
    "teamwork.level1.requirement1.description": "Hole die neuesten Änderungen vom Remote (git pull origin main)",
    "teamwork.level1.requirement1.success": "Neueste Team-Änderungen geholt!",
    "teamwork.level1.requirement2.description": "Erstelle einen Feature-Branch für deine Arbeit",
    "teamwork.level1.requirement2.success": "Feature-Branch erstellt!",
    "teamwork.level1.requirement3.description": "Bearbeite team.md und füge deinen Namen hinzu",
    "teamwork.level1.requirement3.success": "Datei geändert! Dein Name wurde hinzugefügt.",
    "teamwork.level1.requirement4.description": "Stage deine Änderungen",
    "teamwork.level1.requirement4.success": "Änderungen gestaged!",
    "teamwork.level1.requirement5.description": "Committe deine Änderungen mit einer klaren Nachricht",
    "teamwork.level1.requirement5.success": "Änderungen committed!",
    "teamwork.level1.requirement6.description": "Push deinen Feature-Branch zum Remote",
    "teamwork.level1.requirement6.success": "Feature-Branch zum Remote gepusht! Dein Team kann deine Arbeit jetzt sehen.",
    "teamwork.level1.story.title": "Dein erster Tag im Team",
    "teamwork.level1.story.narrative":
        `Es ist dein erster Tag bei DevTeam Pro, einem schnell wachsenden Startup. Du sitzt neben María, deiner Team-Leiterin.

"Willkommen im Team!" sagt sie enthusiastisch. "Wir arbeiten alle am gleichen Codebase. Hier ist, wie wir zusammenarbeiten:"

**Der Team-Workflow:**

1. **Immer mit Pull starten**: Bevor du mit der Arbeit beginnst, hole die neuesten Änderungen
   \`git pull origin main\`
   Das stellt sicher, dass du mit dem neuesten Code arbeitest

2. **Feature-Branch erstellen**: Niemals direkt auf main arbeiten
   \`git switch -c feature/my-awesome-feature\`

3. **Deine Arbeit machen**: Dateien ändern, testen, debuggen

4. **Stage und Commit**: Änderungen speichern
   \`git add .\`
   \`git commit -m "Beschreibende Nachricht"\`

5. **Zum Remote pushen**: Deine Arbeit mit dem Team teilen
   \`git push origin feature/my-awesome-feature\`

"In echten Teams," erklärt María, "würdest du nach dem Push einen Pull Request erstellen. Deine Teamkollegen würden deinen Code reviewen, Feedback geben und nach Genehmigung würdest du in main mergen."

"Lass uns mit deinem ersten Feature beginnen!"`,
    "teamwork.level1.story.realWorldContext":
        "Team-Kollaboration mit Git ist fundamental in der modernen Softwareentwicklung. Entwickler synchronisieren sich ständig mit Remote-Repositories, arbeiten auf Feature-Branches und teilen ihre Arbeit mit dem Team.",
    "teamwork.level1.story.taskIntroduction":
        "Lerne den grundlegenden Team-Kollaborations-Workflow: pull, branch, commit, push.",

    "teamwork.level2.name": "Merge-Konflikte behandeln",
    "teamwork.level2.description": "Lerne wie man Merge-Konflikte löst wenn mehrere Personen am gleichen Code arbeiten",
    "teamwork.level2.objective1": "Verstehe die Konflikt-Situation",
    "teamwork.level2.objective2": "Löse den Merge-Konflikt",
    "teamwork.level2.objective3": "Committe die gelösten Änderungen",
    "teamwork.level2.hint1": "Wenn ein Merge-Konflikt auftritt, wird Git Konflikt-Marker in die Datei einfügen",
    "teamwork.level2.hint2": "Öffne die konfliktbehaftete Datei und suche nach <<<<<<<, =======, und >>>>>>>",
    "teamwork.level2.hint3": "Entscheide welchen Code du behalten willst und entferne die Konflikt-Marker",
    "teamwork.level2.objective4": "Stage und committe die gemergete Lösung",
    "teamwork.level2.hint4": "Nach dem Bearbeiten der Datei, stage sie mit 'git add <datei>'",
    "teamwork.level2.hint5": "Schließe den Merge ab mit 'git commit'",
    "teamwork.level2.hint6": "Editiere login.js um sowohl deine als auch Sarahs Verbesserungen zu kombinieren",
    "teamwork.level2.hint7": "Die beste Lösung behält BEIDES: Sarahs E-Mail-Check UND deine strengeren Längenvorgaben",
    "teamwork.level2.hint8": "Nach dem Lösen: 'git add .' dann 'git commit -m \"Merge-Konflikt lösen\"'",
    "teamwork.level2.requirement1.description": "Editiere die konfliktbehaftete Datei um Konflikt-Marker zu entfernen",
    "teamwork.level2.requirement1.success": "Konfliktbehaftete Datei bearbeitet!",
    "teamwork.level2.requirement2.description": "Stage die gelöste Datei",
    "teamwork.level2.requirement2.success": "Konflikt gelöst und gestaged!",
    "teamwork.level2.requirement3.description": "Committe die Merge-Resolution",
    "teamwork.level2.requirement3.success": "Merge-Konflikt erfolgreich gelöst! Das ist eine wertvolle Team-Fähigkeit.",
    "teamwork.level2.requirement4.description": "Stage den gelösten Konflikt",
    "teamwork.level2.requirement4.success": "Konflikt-Lösung gestaged!",
    "teamwork.level2.requirement5.description": "Committe die Merge-Resolution",
    "teamwork.level2.requirement5.success": "Merge-Konflikt gelöst!",
    "teamwork.level2.story.title": "Die Konflikt-Zone",
    "teamwork.level2.story.narrative":
        `Du arbeitest an einem Feature während dein Teamkollege Jake am gleichen File arbeitet. Ihr habt beide dieselbe Funktion modifiziert!

Als du versuchst deinen Code zu mergen, siehst du:

\`\`\`
CONFLICT (content): Merge conflict in app.js
Automatic merge failed; fix conflicts and then commit the result.
\`\`\`

**Was ist passiert?**
Git konnte nicht automatisch entscheiden welche Änderungen beibehalten werden sollen, weil ihr beide dieselben Zeilen modifiziert habt.

**Die Datei sieht jetzt so aus:**
\`\`\`javascript
<<<<<<< HEAD (Deine Änderungen)
function calculate() {
  return price * 1.2; // Mit 20% Steuer
}
=======
function calculate() {
  return price * 1.15; // Mit 15% Steuer
}
>>>>>>> feature/jakes-changes
\`\`\`

**Wie man löst:**
1. Öffne die konfliktbehaftete Datei im Editor
2. Finde die Konflikt-Marker (<<<<<<<, =======, >>>>>>>)
3. Entscheide welchen Code du behalten willst (oder kombiniere beide)
4. Entferne alle Konflikt-Marker
5. Speichere die Datei
6. Stage: \`git add app.js\`
7. Committe: \`git commit\` (Git wird eine Standard-Merge-Nachricht vorschlagen)

"Hey," ruft Jake herüber, "tut mir leid wegen des Konflikts! Die Steuer ist eigentlich 20% - nimm deine Version!"

Zeit das zu fixen und weiterzumachen!`,
    "teamwork.level2.story.realWorldContext":
        "Merge-Konflikte treten in jedem Team auf. Die Fähigkeit sie schnell und korrekt zu lösen ist eine essenzielle Entwickler-Fähigkeit. In echten Projekten kommunizierst du mit Teamkollegen um zu entscheiden welche Änderungen beibehalten werden sollen.",
    "teamwork.level2.story.taskIntroduction":
        "Meistere die Konflikt-Resolution: editieren, stagen und committen um Merge-Konflikte zu beheben.",

    "teamwork.level3.name": "Code-Review-Workflow",
    "teamwork.level3.description": "Lerne den Prozess von Pull Requests und Code-Reviews",
    "teamwork.level3.objective1": "Push deinen Feature-Branch",
    "teamwork.level3.objective2": "Simuliere einen Code-Review-Prozess",
    "teamwork.level3.objective3": "Merge nach Review-Genehmigung",
    "teamwork.level3.objective4": "Push deinen Branch für Team-Review",
    "teamwork.level3.hint1": "Erstelle einen Feature-Branch und mache Änderungen",
    "teamwork.level3.hint2": "Push zum Remote um einen PR zu 'öffnen'",
    "teamwork.level3.hint3": "Nach dem Review, merge deinen Branch",
    "teamwork.level3.hint4": "In echten Projekten würdest du GitHub/GitLab für PRs verwenden",
    "teamwork.level3.hint5": "Push zum Remote: git push origin feature/password-reset",
    "teamwork.level3.hint6": "Alternative mit Kurzform: git push -u origin feature/password-reset",
    "teamwork.level3.hint7": "Hinweis: Verwende den Branch-Namen den du erstellt hast (nicht 'feature/password-reset' falls du einen anderen Namen gewählt hast)",
    "teamwork.level3.requirement1.description": "Erstelle einen Feature-Branch",
    "teamwork.level3.requirement1.success": "Feature-Branch erstellt!",
    "teamwork.level3.requirement2.description": "Mache und committe Änderungen",
    "teamwork.level3.requirement2.success": "Änderungen committed!",
    "teamwork.level3.requirement3.description": "Push deinen Branch zum Remote",
    "teamwork.level3.requirement3.success": "Branch zum Remote gepusht - bereit für Review!",
    "teamwork.level3.requirement4.description": "Wechsle zu main Branch",
    "teamwork.level3.requirement4.success": "Zu main gewechselt!",
    "teamwork.level3.requirement5.description": "Merge deinen Feature-Branch nach 'Review'",
    "teamwork.level3.requirement5.success": "Code gereviewed und gemergt! So liefern professionelle Teams qualitativ hochwertigen Code.",
    "teamwork.level3.story.title": "Der Code-Review",
    "teamwork.level3.story.narrative":
        `Du hast gerade ein wichtiges Feature fertiggestellt: ein neues Dashboard für deine App. Zeit es durch Code-Review zu bekommen!

**Der Pull-Request-Prozess:**

1. **Push deinen Branch**: Deine Arbeit auf den Remote-Server hochladen
   \`git push origin feature/dashboard\`

2. **PR auf GitHub/GitLab öffnen**: (Wir simulieren das hier)
   - Gehe zu deinem Projekt auf GitHub
   - Klicke "New Pull Request"
   - Wähle deinen Branch und Ziel-Branch (main)
   - Schreibe eine klare Beschreibung:
     - Was ändert dieser PR?
     - Warum ist diese Änderung nötig?
     - Screenshots beifügen falls UI-Änderungen
   - Request reviewers aus deinem Team

3. **Review-Prozess**:
   Deine Teamkollegen werden:
   - Deinen Code Zeile für Zeile lesen
   - Kommentare und Vorschläge hinterlassen
   - Fragen zu Design-Entscheidungen stellen
   - Bugs oder Verbesserungen vorschlagen

4. **Adressiere Feedback**:
   - Mache angeforderte Änderungen
   - Push erneut zum gleichen Branch
   - Der PR wird automatisch aktualisiert

5. **Genehmigung und Merge**:
   Sobald genehmigt:
   - Jemand (oft du) klickt "Merge Pull Request"
   - Dein Code ist jetzt Teil von main!
   - Branch kann gelöscht werden

**Warum Code-Reviews wichtig sind:**
✓ Fängt Bugs früh
✓ Teilt Wissen im Team
✓ Verbessert Code-Qualität
✓ Mentoring-Möglichkeit
✓ Dokumentiert Entscheidungen

Deine Reviewerin Sarah kommentiert: "Großartige Arbeit! Nur ein paar kleine Vorschläge..." Nach Behebung der Vorschläge: "LGTM! 🚀" (Looks Good To Me)

Zeit zu mergen!`,
    "teamwork.level3.story.realWorldContext":
        "Pull Requests und Code-Reviews sind der Standard in professionellen Teams. Sie stellen sicher, dass Code-Qualität hoch bleibt, Wissen geteilt wird und Bugs früh gefangen werden. Plattformen wie GitHub, GitLab und Bitbucket bieten robuste PR-Workflows mit inline Kommentaren, automatisierten Tests und Genehmigungsprozessen.",
    "teamwork.level3.story.taskIntroduction":
        "Lerne den Pull-Request-Workflow: push, review und merge. Das ist wie professionelle Teams Code liefern.",

    // Mastery Stage
    "mastery.level1.name": "Multi-Branch Merge Challenge",
    "mastery.level1.description": "Meistere komplexe Merges über mehrere Branches mit Konflikten",
    "mastery.level1.objective1": "Merge mehrere Feature-Branches gleichzeitig",
    "mastery.level1.objective2": "Löse komplexe Merge-Konflikte",
    "mastery.level1.objective3": "Stage die gelösten Konflikte",
    "mastery.level1.objective4": "Vervollständige den Multi-Way-Merge",
    "mastery.level1.hint1": "Verwende git merge um mehrere Branches auf einmal zu mergen",
    "mastery.level1.hint2": "Analysiere jeden Konflikt sorgfältig - sie können interagieren",
    "mastery.level1.hint3": "Die beste Lösung kombiniert oft Elemente von allen Branches",
    "mastery.level1.hint4": "Teste deinen gemergten Code vor dem Committen",
    "mastery.level1.requirement1.description": "Merge alle Feature-Branches in main",
    "mastery.level1.requirement1.success": "Komplexer Merge initiiert! Jetzt löse die Konflikte.",
    "mastery.level1.requirement2.description": "Stage alle gelösten Dateien",
    "mastery.level1.requirement2.success": "Konflikte gelöst und gestaged!",
    "mastery.level1.requirement3.description": "Vervollständige den Merge mit einem Commit",
    "mastery.level1.requirement3.success": "Master-Level Merge abgeschlossen! Du hast Multi-Way-Merges erobert!",
    "mastery.level1.story.title": "Die Integrations-Challenge",
    "mastery.level1.story.narrative":
        "Drei Teams haben parallel für das Quartals-Release gearbeitet. Jedes Team hat kritische Features auf separaten Branches entwickelt. Jetzt ist Integrations-Tag und du bist der Lead Developer, der für das Mergen von allem verantwortlich ist. Die Herausforderung: Alle drei Branches haben gemeinsame Utility-Dateien modifiziert. Du musst alle Branches mergen und die Konflikte lösen um ein kohärentes, funktionierendes System zu schaffen.",
    "mastery.level1.story.realWorldContext":
        "Komplexe Multi-Branch-Merges sind üblich in großen Projekten mit mehreren parallelen Entwicklungs-Streams. Diese Fähigkeit zu meistern ist essentiell für Senior Developers und Technical Leads.",
    "mastery.level1.story.taskIntroduction":
        "Merge drei Feature-Branches mit überlappenden Änderungen und löse alle Konflikte um eine vereinte Codebasis zu schaffen.",

    "mastery.level2.name": "Git Hooks und Automatisierung",
    "mastery.level2.description": "Automatisiere Workflows mit Git Hooks",
    "mastery.level2.objective1": "Verstehe Hook-Konzepte",
    "mastery.level2.objective2": "Erstelle einen Pre-Commit-Hook",
    "mastery.level2.objective3": "Teste Hook-Automatisierung",
    "mastery.level2.objective4": "Implementiere Hook-basierte Qualitätsprüfungen",
    "mastery.level2.hint1": "Git Hooks sind Skripte die bei bestimmten Git-Events ausgeführt werden",
    "mastery.level2.hint2": "Pre-Commit-Hooks laufen bevor ein Commit erstellt wird",
    "mastery.level2.hint3": "Hooks befinden sich im .git/hooks/ Verzeichnis",
    "mastery.level2.hint4": "Häufige Hooks: pre-commit, pre-push, post-commit",
    "mastery.level2.hint5": "Hooks können Tests ausführen, Code linten oder Nachrichten validieren",
    "mastery.level2.hint6": "Wenn ein Pre-Commit-Hook fehlschlägt, wird der Commit abgebrochen",
    "mastery.level2.requirement1.description": "Committe Änderungen um Hook-Konzepte zu lernen",
    "mastery.level2.requirement1.success": "Hook-Automatisierung verstanden!",
    "mastery.level2.requirement2.description": "Implementiere Pre-Commit-Validierung",
    "mastery.level2.requirement2.success": "Pre-Commit-Hook implementiert!",
    "mastery.level2.requirement3.description": "Teste Hook-Automatisierung mit Commits",
    "mastery.level2.requirement3.success": "Hook-basierte Automatisierung gemeistert!",
    "mastery.level2.story.title": "Der Automatisierungs-Architekt",
    "mastery.level2.story.narrative":
        `Du bist jetzt Senior Developer bei AutomationFirst Inc. und dein Team verschwendet Stunden mit dem Fixen von Problemen die automatisch hätten gefangen werden können.

**Das Problem:**
- Entwickler committen Code mit Linting-Fehlern
- Tests werden vergessen vor dem Push
- Commit-Nachrichten sind inkonsistent
- Sensible Daten landen versehentlich in Commits

**Die Lösung: Git Hooks**

Git Hooks sind Skripte die automatisch bei Git-Events laufen:

**Pre-Commit Hook:**
Läuft BEVOR ein Commit erstellt wird
\`\`\`bash
#!/bin/sh
# .git/hooks/pre-commit

# Linting ausführen
npm run lint || exit 1

# Tests ausführen
npm test || exit 1

# Nach sensiblen Daten suchen
grep -r "API_KEY" . && exit 1

echo "✓ Alle Prüfungen bestanden!"
\`\`\`

**Pre-Push Hook:**
Läuft bevor Code zum Remote gepusht wird
\`\`\`bash
#!/bin/sh
# .git/hooks/pre-push

# Vollständige Test-Suite ausführen
npm run test:full || exit 1
\`\`\`

**Commit-Msg Hook:**
Validiert Commit-Nachrichten
\`\`\`bash
#!/bin/sh
# .git/hooks/commit-msg

# Erzwingt Format: "type: message"
grep -E "^(feat|fix|docs|style|refactor|test|chore): .+" $1 || exit 1
\`\`\`

**Post-Commit Hook:**
Läuft NACH einem erfolgreichen Commit
\`\`\`bash
#!/bin/sh
# .git/hooks/post-commit

# Benachrichtige das Team
curl -X POST "https://slack.com/api/chat.postMessage" -d "New commit!"
\`\`\`

**Warum Hooks wichtig sind:**
✓ Fängt Fehler früh (bevor Code-Review)
✓ Erzwingt Team-Standards
✓ Automatisiert langweilige Aufgaben
✓ Verhindert versehentliche Probleme
✓ Spart Stunden an Debugging-Zeit

**Beispiel aus der Praxis:**
Bei großen Projekten wie React oder Vue:
- Hooks validieren Commit-Nachrichtenformate
- Führen Code-Formatierung automatisch aus (Prettier)
- Führen Tests für geänderte Dateien aus
- Prüfen auf TypeScript-Fehler
- Scannen nach Sicherheitslücken

Dein Team implementiert jetzt einen Pre-Commit-Hook der:
1. ESLint ausführt (Code-Qualität)
2. Unit-Tests ausführt
3. Nach TODO-Kommentaren sucht
4. Commit-Nachrichten validiert

Zeit zu automatisieren!`,
    "mastery.level2.story.realWorldContext":
        "Git Hooks sind essenzielle Automatisierungs-Tools in professionellen Teams. Sie erzwingen Qualitätsstandards, verhindern häufige Fehler und automatisieren wiederkehrende Aufgaben. Große Open-Source-Projekte verwenden intensiv Hooks um Code-Qualität zu erhalten.",
    "mastery.level2.story.taskIntroduction":
        "Verstehe Git Hooks und wie sie Workflows automatisieren und Code-Qualität erzwingen.",

    "mastery.level3.name": "Die ultimative Git-Herausforderung",
    "mastery.level3.description": "Kombiniere alles was du gelernt hast in einer komplexen, praxisnahen Herausforderung",
    "mastery.level3.objective1": "Multi-Branch-Feature-Entwicklung bewältigen",
    "mastery.level3.objective2": "Merge-Konflikte lösen",
    "mastery.level3.objective3": "Saubere Historie mit Rebase aufrechterhalten",
    "mastery.level3.objective4": "Koordiniere mit Remote-Repository",
    "mastery.level3.hint1": "Das ist ein Szenario aus der Praxis - verwende alle Fähigkeiten die du gelernt hast",
    "mastery.level3.hint2": "Erstelle Feature-Branches für verschiedene Aufgaben",
    "mastery.level3.hint3": "Verwende rebase um Historie sauber zu halten",
    "mastery.level3.hint4": "Behandle Merge-Konflikte sorgfältig",
    "mastery.level3.hint5": "Halte dich mit Remote mit pull und push synchron",
    "mastery.level3.hint6": "Verwende aussagekräftige Commit-Nachrichten",
    "mastery.level3.requirement1.description": "Erstelle und merge mehrere Feature-Branches",
    "mastery.level3.requirement1.success": "Multi-Branch-Workflow gemeistert!",
    "mastery.level3.requirement2.description": "Behandle Konflikte professionell",
    "mastery.level3.requirement2.success": "Konflikt-Resolution gemeistert!",
    "mastery.level3.requirement3.description": "Halte saubere Git-Historie aufrecht",
    "mastery.level3.requirement3.success": "Saubere Historie erreicht!",
    "mastery.level3.requirement4.description": "Synchronisiere erfolgreich mit Remote",
    "mastery.level3.requirement4.success": "Remote-Koordination gemeistert! Du bist jetzt ein Git-Meister!",
    "mastery.level3.story.title": "Die ultimative Git-Challenge: Projekt-Launch-Tag",
    "mastery.level3.story.narrative":
        `🚀 **Heute ist Launch-Tag für dein Startup!** 🚀

Du bist Lead Developer bei QuickShip, einem vielversprechenden Startup. In 8 Stunden launched ihr die App. Aber es gibt Chaos:

**Die Situation:**
- 3 kritische Features müssen fertiggestellt werden
- Ein Produktions-Bug muss gefixt werden (HOTFIX!)
- Dein Teamkollege hat Änderungen gepusht die mit deinen kollidieren
- Die Release-Branch muss vorbereitet werden
- Alles muss zur richtigen Zeit gemergt werden

**Deine Mission:**

**Phase 1: Hotfix (DRINGEND!)**
Production ist broken! User können sich nicht einloggen.
- Erstelle hotfix-Branch von main
- Fixe auth.js
- Merge zurück zu main UND develop
- Tag v1.0.1

**Phase 2: Feature-Entwicklung**
Du arbeitest an 3 Features gleichzeitig:

Feature A: Payment-Integration
- Branch: feature/payment
- Files: payment.js
- Status: In progress

Feature B: Email-Benachrichtigungen
- Branch: feature/email
- Files: email.js
- Status: Ready to merge

Feature C: User-Dashboard
- Branch: feature/dashboard
- Files: dashboard.js
- Status: Wartet auf Review

**Phase 3: Merge-Konflikt-Chaos**
Dein Kollege Maria hat ihre Änderungen gepusht. Als du pullst:
\`\`\`
CONFLICT in app.js
CONFLICT in config.js
\`\`\`
Du musst entscheiden welcher Code beibehalten wird.

**Phase 4: Release-Vorbereitung**
- Erstelle release/2.0.0 von develop
- Update VERSION file
- Update CHANGELOG.md
- Merge zu main
- Tag v2.0.0
- Push alles!

**Phase 5: Clean-Up**
- Rebase feature-Branches wenn nötig
- Squash unwichtige Commits
- Schreibe perfekte Commit-Nachrichten
- Stelle sicher alle Branches sind synchronisiert

**Erfolgskriterien:**
✓ Hotfix ist deployed (v1.0.1 getaggt)
✓ Alle 3 Features sind sauber gemergt
✓ Keine Konflikte bleiben übrig
✓ Git-Historie ist sauber und linear
✓ Release v2.0.0 ist auf main
✓ Remote ist vollständig synchronisiert
✓ Dokumentation ist aktualisiert

**Timing ist kritisch:**
- Hotfix: 30 Minuten
- Feature-Merges: 1 Stunde
- Konflikt-Resolution: 45 Minuten
- Release-Prep: 1 Stunde
- Launch: 8:00 PM pünktlich!

"Okay Team," sagt dein CTO über Slack, "alle Eyes on Launch. Wir vertrauen dir bei Git. Du hast das!"

Das ist es. Alles wofür du trainiert hast. Zeit zu zeigen was du drauf hast!

**Erinnerung: Die Werkzeuge die du hast:**
- \`git branch\` - Branch-Verwaltung
- \`git switch/checkout\` - Branch-Navigation (bevorzuge git switch!)
- \`git merge\` - Änderungen kombinieren
- \`git rebase\` - Historie umschreiben
- \`git cherry-pick <commit-hash>\` - Selektive Commits (kopiert spezifische Commits von einem Branch zum anderen)
- \`git stash\` - Arbeit temporär speichern
- \`git pull/push\` - Remote-Sync
- \`git tag\` - Releases markieren
- \`git log\` - Historie untersuchen
- \`git reflog\` - Notfall-Wiederherstellung
- \`git bisect\` - Binäre Suche nach Bugs in der History
- \`git mv <alt> <neu>\` - Dateien umbenennen mit Git-History-Tracking

**Was ist git cherry-pick?**
Cherry-picking erlaubt dir, spezifische Commits von einem Branch zu einem anderen zu kopieren. Statt ganze Branches zu mergen, kannst du einzelne Commits auswählen. Perfekt um Hotfixes von einem Branch zum anderen zu übertragen!

Beispiel: \`git cherry-pick abc123\` - wendet Commit abc123 auf deinen aktuellen Branch an

**Was ist git bisect?**
Bisect hilft dir herauszufinden, welcher Commit einen Bug eingeführt hat, mittels binärer Suche. Git wird Commits für dich auschecken zum Testen, und du sagst ihm "good" oder "bad" bis es den problematischen Commit findet.

Beispiel:
\`git bisect start\`
\`git bisect bad\` (aktueller Commit ist kaputt)
\`git bisect good abc123\` (dieser alte Commit funktionierte)
Git führt dich dann durch das Testen von Commits bis es den ersten kaputten findet!

**Was ist git mv?**
Verschiebe oder benenne Dateien um während die Git-Historie erhalten bleibt. Besser als manuelles Umbenennen weil Git die Umbenennung verfolgt.

Beispiel: \`git mv alter-name.js neuer-name.js\`

Viel Erfolg, Git-Meister! 🚀`,
    "mastery.level3.story.realWorldContext":
        "Das ist ein realistisches Szenario das Lead Developers täglich erleben: Multiple Branches jonglieren, Konflikte lösen, Hotfixes koordinieren und Release-Management - alles während der Druck hoch ist. Die Fähigkeit mit komplexen Git-Situationen umzugehen unterscheidet Senior Developers von Juniors.",
    "mastery.level3.story.taskIntroduction":
        "Beweise deine Git-Meisterschaft indem du einen komplexen, praxisnahen Projekt-Launch mit mehreren Features, Hotfixes, Konflikten und Release-Management bewältigst.",

};

export default levels;
