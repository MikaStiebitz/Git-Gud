const faq = {
    "faq.title": "Häufig gestellte Fragen zu Git",
    "faq.subtitle": "Alles, was du über Git wissen musst",
    "faq.intro":
        "Git ist ein leistungsstarkes und weit verbreitetes Versionskontrollsystem. Hier findest du Antworten auf häufige Fragen zu Git, seinem Zweck und seiner Anwendung in der Softwareentwicklung.",

    // Categories
    "faq.categories.basics": "Git-Grundlagen",
    "faq.categories.concepts": "Schlüsselkonzepte",
    "faq.categories.usage": "Praktische Anwendung",

    // Basics Section
    "faq.whatIsGit.question": "Was ist Git?",
    "faq.whatIsGit.answer":
        "Git ist ein verteiltes Versionskontrollsystem, das Änderungen an Dateien im Laufe der Zeit verfolgt. Es ermöglicht mehreren Personen, an Projekten zusammenzuarbeiten, eine Historie von Änderungen zu führen und bei Bedarf zu früheren Versionen zurückzukehren. Im Gegensatz zu zentralisierten Versionskontrollsystemen erhält bei Git jeder Entwickler eine vollständige Kopie des Repositories, was Offline-Arbeit ermöglicht und Redundanz bietet.",

    "faq.whyCreated.question": "Warum wurde Git entwickelt?",
    "faq.whyCreated.answer":
        "Git wurde 2005 von Linus Torvalds für die Entwicklung des Linux-Kernels erschaffen. Torvalds benötigte ein verteiltes Versionskontrollsystem, das schnell ist, nicht-lineare Entwicklung mit tausenden parallelen Branches unterstützt und große Projekte wie den Linux-Kernel effizient verwalten kann. Die vorhandenen Tools konnten diese Anforderungen nicht erfüllen, daher entwickelte er Git. Der Name 'Git' ist britischer Slang für 'unangenehme Person', den Torvalds scherzhaft auf die Software (und sich selbst) anwandte.",

    "faq.vsOtherVcs.question": "Wie unterscheidet sich Git von anderen Versionskontrollsystemen?",
    "faq.vsOtherVcs.answer":
        "Git unterscheidet sich von älteren Systemen wie SVN (Subversion) oder CVS in mehreren wesentlichen Punkten:\n\n• Es ist verteilt statt zentralisiert und gibt jedem Entwickler eine vollständige Kopie des Repositories\n• Es ist für nicht-lineare Entwicklung mit robusten Branching- und Merging-Fähigkeiten konzipiert\n• Es ist viel schneller, besonders bei Operationen wie Branching und Merging\n• Es verwendet einen anderen Ansatz zur Datenspeicherung und konzentriert sich auf Snapshots statt auf Dateiunterschieden\n• Es bietet bessere Datenintegrität durch die Verwendung von SHA-1-Hashes\n• Es ermöglicht umfangreiche Offline-Operationen",

    "faq.benefits.question": "Welche Hauptvorteile bietet Git?",
    "faq.benefits.answer":
        "Git bietet zahlreiche Vorteile für die Softwareentwicklung:\n\n• Geschwindigkeit und Effizienz, besonders bei großen Projekten\n• Leistungsstarke Branching- und Merging-Funktionen, die nicht-lineare Entwicklung unterstützen\n• Verteilte Natur, die Redundanz bietet und Offline-Arbeit ermöglicht\n• Umfassende Unterstützung für parallele Entwicklungsabläufe\n• Hervorragende Datenintegrität und Änderungsverfolgung\n• Robustes Ökosystem mit Tools und Hosting-Diensten wie GitHub, GitLab und Bitbucket\n• Umfangreiche Akzeptanz in der Branche, wodurch es eine wertvolle Fähigkeit für Entwickler ist\n• Freie und Open-Source-Software",

    "faq.gitVsGithub.question": "Was ist der Unterschied zwischen Git und GitHub?",
    "faq.gitVsGithub.answer":
        "Git ist das Versionskontrollsystem selbst – das Software-Tool, das du auf deinem Computer installierst, um Änderungen an deinen Dateien zu verfolgen. GitHub hingegen ist ein webbasierter Hosting-Dienst für Git-Repositories. GitHub fügt zusätzliche Funktionen wie Pull Requests, Issue-Tracking, Code-Reviews und andere Kollaborationstools hinzu. Ähnliche Dienste sind GitLab und Bitbucket. Denke an Git als das Werkzeug und GitHub als einen Dienst, der auf diesem Werkzeug aufbaut, um es benutzerfreundlicher zu machen und kollaborative Funktionen hinzuzufügen.",

    // Concepts Section
    "faq.repositories.question": "Was sind Repositories in Git?",
    "faq.repositories.answer":
        "Ein Repository (oder 'Repo') ist die grundlegende Einheit in Git. Es enthält alle Dateien deines Projekts und die gesamte Historie der Änderungen an diesen Dateien. Technisch gesehen ist ein Git-Repository das .git-Verzeichnis in deinem Projekt, das alle Metadaten und die Objektdatenbank für dein Projekt speichert. Wenn du ein Repository klonst, erhältst du eine Kopie dieser gesamten Historie. Repositories können lokal (auf deinem Gerät) oder remote (auf einem Server wie GitHub) sein.",

    "faq.commits.question": "Was sind Commits und warum sind sie wichtig?",
    "faq.commits.answer":
        "Commits sind Schnappschüsse deines gesamten Repositories zu bestimmten Zeitpunkten. Jeder Commit hat eine eindeutige Kennung (Hash) und enthält Informationen darüber, was geändert wurde, wer die Änderung vorgenommen hat, wann und eine Nachricht, die die Änderung beschreibt. Commits sind wichtig, weil sie:\n\n• Eine Historie der Entwicklung deines Projekts erstellen\n• Es dir ermöglichen, zu früheren Zuständen deines Projekts zurückzukehren\n• Helfen zu identifizieren, wann und von wem bestimmte Änderungen eingeführt wurden\n• Die Zusammenarbeit durch klare Referenzpunkte ermöglichen\n\nGute Commit-Nachrichten sind entscheidend, um später beim Überprüfen des Codes das 'Warum' hinter Änderungen zu verstehen.",

    "faq.branches.question": "Was sind Branches und wie funktionieren sie?",
    "faq.branches.answer":
        "Branches in Git sind einfach bewegliche Zeiger auf Commits. Sie ermöglichen parallele Entwicklungslinien, sodass an verschiedenen Funktionen oder Fehlerbehebungen gleichzeitig gearbeitet werden kann, ohne sich gegenseitig zu stören. Der Standard-Branch heißt in der Regel 'main' (früher 'master').\n\nWenn du einen Branch erstellst, erstellst du im Wesentlichen einen neuen Zeiger auf den aktuellen Commit. Wenn du neue Commits in diesem Branch machst, bewegt sich der Zeiger automatisch vorwärts. Dies ermöglicht es dir, einfach zwischen verschiedenen Zuständen deines Projekts zu wechseln und Änderungen von einem Branch in einen anderen zu übernehmen, wenn sie bereit sind.",

    "faq.merge.question": "Was ist Merging und wie entstehen Merge-Konflikte?",
    "faq.merge.answer":
        "Merging ist der Prozess des Zusammenführens von Änderungen aus einem Branch in einen anderen. Wenn zum Beispiel eine Funktion in einem Feature-Branch abgeschlossen ist, würdest du sie in den Hauptbranch mergen. Git verarbeitet das Merging automatisch, wenn sich die Änderungen nicht überschneiden.\n\nMerge-Konflikte treten auf, wenn der gleiche Teil einer Datei in den beiden zu mergenden Branches unterschiedlich geändert wurde. Git kann nicht automatisch bestimmen, welche Version verwendet werden soll, und markiert daher die Datei als konfliktbehaftet. Die Konfliktmarkierungen in der Datei zeigen beide Versionen des Codes, und du musst die Datei bearbeiten, um die endgültige Version zu erstellen, bevor du den Merge abschließt.",

    "faq.workflow.question": "Wie sieht ein typischer Git-Workflow aus?",
    "faq.workflow.answer":
        "Ein gängiger Git-Workflow könnte wie folgt aussehen:\n\n1. Erstelle einen Branch für eine neue Funktion oder Fehlerbehebung\n2. Nimm Änderungen vor und committe sie in deinen Branch\n3. Pushe deinen Branch in das Remote-Repository\n4. Erstelle einen Pull Request (auf GitHub/GitLab) oder fordere einen Code-Review an\n5. Nimm bei Bedarf zusätzliche Änderungen vor\n6. Merge den Branch in den Hauptbranch, wenn er genehmigt wurde\n7. Lösche den Feature-Branch, sobald er gemerged wurde\n\nEs gibt mehrere etablierte Workflow-Modelle wie GitHub Flow, GitFlow und Trunk-Based Development, die jeweils eigene Ansätze für Branches, Releases und Deployments haben.",

    // Usage Section
    "faq.whenUse.question": "Wann sollte ich Git verwenden?",
    "faq.whenUse.answer":
        "Du solltest Git für praktisch jedes Projekt verwenden, bei dem du Änderungen im Laufe der Zeit verfolgen musst, insbesondere wenn es sich um Code handelt. Dazu gehören:\n\n• Softwareentwicklungsprojekte jeder Größe\n• Dokumentationsprojekte\n• Konfigurationsdateien\n• Schreibprojekte wie Bücher oder Artikel\n• Jedes kollaborative Projekt, bei dem mehrere Personen an denselben Dateien arbeiten müssen\n\nSelbst für Solo-Projekte bietet Git wertvolle Funktionen wie Verlaufsverfolgung, die Möglichkeit, sicher mit Änderungen zu experimentieren, und Backup-Fähigkeiten.",

    "faq.smallProjects.question": "Ist Git für kleine Projekte übertrieben?",
    "faq.smallProjects.answer":
        "Obwohl Git leistungsstarke Funktionen hat, die für große, komplexe Projekte entwickelt wurden, ist es auch für kleine Projekte wertvoll. Selbst für kleine oder persönliche Projekte bietet Git:\n\n• Ein Sicherheitsnetz, das es dir ermöglicht, Änderungen rückgängig zu machen, wenn etwas kaputt geht\n• Eine vollständige Historie deiner Arbeit\n• Die Möglichkeit, gleichzeitig an mehreren Funktionen mit Branches zu arbeiten\n• Einfaches Backup der gesamten Historie deines Projekts in Remote-Repositories\n• Potenzial für zukünftige Zusammenarbeit\n\nDie anfängliche Investition in das Erlernen von Git zahlt sich selbst bei kleinen Projekten mit diesen Vorteilen aus.",

    "faq.teamCollaboration.question": "Wie hilft Git bei der Teamzusammenarbeit?",
    "faq.teamCollaboration.answer":
        "Git verbessert die Teamzusammenarbeit auf viele Arten:\n\n• Mehrere Entwickler können gleichzeitig an demselben Projekt arbeiten, ohne die Arbeit der anderen zu überschreiben\n• Änderungen werden klar mit Autorinformationen und Zeitstempeln nachverfolgt\n• Branching ermöglicht separate Arbeit an verschiedenen Funktionen ohne Störungen\n• Pull Requests (auf Plattformen wie GitHub) erleichtern Code-Reviews\n• Konflikte werden automatisch erkannt, wenn sie auftreten\n• Die Projekthistorie sorgt für Verantwortlichkeit und Transparenz\n• Remote-Repositories stellen sicher, dass jeder Zugriff auf den neuesten Code hat\n• Issue-Tracking und Projektmanagement-Tools integrieren sich gut in Git-Workflows",

    "faq.commandLine.question": "Muss ich für Git die Kommandozeile verwenden?",
    "faq.commandLine.answer":
        "Nein, du musst nicht die Kommandozeile verwenden, obwohl das Verständnis der Git-Befehle hilfreich sein kann. Es gibt viele grafische Benutzeroberflächen (GUIs) für Git, darunter:\n\n• GitHub Desktop: Eine einfache, benutzerfreundliche Oberfläche\n• GitKraken: Ein leistungsstarker plattformübergreifender Git-Client\n• Sourcetree: Funktionsreicher Git-Client für Windows und Mac\n• Git Extensions: Open-Source-UI für Windows\n• TortoiseGit: Windows-Shell-Schnittstelle für Git\n\nDarüber hinaus haben die meisten modernen IDEs wie Visual Studio Code, IntelliJ IDEA und andere eine integrierte Git-Integration, die es dir ermöglicht, gängige Git-Operationen direkt aus dem Editor auszuführen.",

    "faq.hosting.question": "Wo kann ich meine Git-Repositories hosten?",
    "faq.hosting.answer":
        "Es gibt mehrere beliebte Dienste zum Hosten von Git-Repositories:\n\n• GitHub: Die beliebteste Plattform mit vielen Kollaborationsfunktionen\n• GitLab: Bietet eine vollständige DevOps-Plattform mit CI/CD-Funktionen\n• Bitbucket: Integriert sich gut mit anderen Atlassian-Produkten wie Jira\n• Azure DevOps: Microsofts Lösung mit umfangreicher Integration in ihr Ökosystem\n• Self-Hosted-Optionen: GitLab Community Edition oder Gitea für das Hosting auf eigenen Servern\n\nDie meisten dieser Dienste bieten kostenlose Stufen für öffentliche Repositories und einzelne Entwickler, mit kostenpflichtigen Plänen für private Repositories und Teams.",

    // Call to action
    "faq.readyToStart.title": "Bereit, mit Git zu starten?",
    "faq.readyToStart.text":
        "Jetzt, da du die Grundlagen von Git verstehst, bist du bereit, es in deinen Projekten einzusetzen!",
    "faq.readyToStart.installButton": "Git installieren",
    "faq.readyToStart.practiceButton": "Git-Befehle üben",
};

export default faq;
