const installation = {
    "installation.title": "Git Installations-Anleitung",
    "installation.subtitle": "Erste Schritte mit Git",
    "installation.intro":
        "Diese Anleitung hilft dir bei der Installation und Konfiguration von Git auf deinem Betriebssystem. Wähle unten deine Plattform aus, um zu beginnen.",
    "installation.download": "Git herunterladen",
    "installation.moreDistros": "Weitere Linux-Distributionen",

    // Windows
    "installation.windows.title": "Git auf Windows installieren",
    "installation.windows.download": "Git für Windows herunterladen",
    "installation.windows.step1": "Besuche die offizielle Git-Website unter git-scm.com/downloads.",
    "installation.windows.step2": "Klicke auf den Windows-Download-Link.",
    "installation.windows.step3": "Der Download sollte automatisch starten.",
    "installation.windows.install": "Git auf Windows installieren",
    "installation.windows.step4": "Führe die heruntergeladene ausführbare Datei aus.",
    "installation.windows.step5":
        "Folge dem Installationsassistenten. Die Standardoptionen sind in der Regel für die meisten Benutzer geeignet.",
    "installation.windows.step6":
        "Wähle während der Installation 'Git from the Windows Command Prompt verwenden', um Git zu deinem PATH hinzuzufügen.",
    "installation.windows.step7": "Schließe den Installationsprozess ab und klicke auf 'Fertigstellen'.",

    // Linux
    "installation.linux.title": "Git auf Linux installieren",
    "installation.linux.debian": "Debian/Ubuntu und Derivate",
    "installation.linux.fedora": "Fedora/RHEL/CentOS",
    "installation.linux.arch": "Arch Linux",

    // Mac
    "installation.mac.title": "Git auf macOS installieren",
    "installation.mac.option1": "Option 1: Command Line Tools",
    "installation.mac.option1Desc":
        "Der einfachste Weg, Git auf einem Mac zu installieren, ist das Terminal zu öffnen und 'git --version' einzugeben. Wenn Git nicht installiert ist, wirst du zur Installation der Command Line Tools aufgefordert.",
    "installation.mac.option2": "Option 2: Git-Installer herunterladen",
    "installation.mac.step1": "Besuche die offizielle Git-Website unter git-scm.com/downloads.",
    "installation.mac.step2": "Klicke auf den macOS-Download-Link.",
    "installation.mac.step3": "Installiere das heruntergeladene Paket gemäß den Anweisungen.",
    "installation.mac.brew": "Option 3: Mit Homebrew",
    "installation.mac.brewDesc":
        "Wenn du Homebrew installiert hast, kannst du Git mit den folgenden Befehlen installieren:",

    // Common Configuration
    "installation.config": "Git konfigurieren",
    "installation.configDesc":
        "Nach der Installation musst du deinen Benutzernamen und deine E-Mail-Adresse einrichten. Diese Informationen werden bei jedem Git-Commit verwendet.",
    "installation.verification": "Installation überprüfen",
    "installation.verificationDesc":
        "Um zu bestätigen, dass Git korrekt installiert wurde, öffne ein Terminal oder eine Eingabeaufforderung und führe aus:",

    // SSH Key Generation
    "installation.ssh.title": "SSH-Schlüssel generieren",
    "installation.ssh.intro":
        "SSH-Schlüssel ermöglichen eine sichere Verbindung zu Git-Hosting-Diensten wie GitHub, GitLab oder Bitbucket ohne Passwort-Eingabe bei jedem Push/Pull.",
    "installation.ssh.generate": "SSH-Schlüssel erstellen",
    "installation.ssh.generateDesc":
        "Führe den folgenden Befehl aus, um einen neuen SSH-Schlüssel zu erstellen. Ersetze die E-Mail-Adresse durch deine eigene:",
    "installation.ssh.saveLocation": "Speicherort bestätigen",
    "installation.ssh.saveLocationDesc":
        "Wenn du gefragt wirst, wo der Schlüssel gespeichert werden soll, drücke Enter für den Standardspeicherort:",
    "installation.ssh.passphrase": "Passphrase (optional)",
    "installation.ssh.passphraseDesc":
        "Du kannst eine Passphrase für zusätzliche Sicherheit eingeben oder Enter drücken, um fortzufahren:",
    "installation.ssh.copyKey": "Öffentlichen Schlüssel kopieren",
    "installation.ssh.copyKeyDesc":
        "Kopiere den Inhalt deines öffentlichen SSH-Schlüssels in die Zwischenablage:",
    "installation.ssh.windows.copyKey": "Für Windows (Git Bash/PowerShell):",
    "installation.ssh.mac.copyKey": "Für macOS:",
    "installation.ssh.linux.copyKey": "Für Linux:",

    // GitHub/GitLab Connection
    "installation.github.title": "Mit GitHub verbinden",
    "installation.github.intro":
        "GitHub ist der beliebteste Git-Hosting-Dienst. Hier erfährst du, wie du deinen SSH-Schlüssel hinzufügst:",
    "installation.github.step1": "Gehe zu GitHub.com und melde dich in deinem Account an",
    "installation.github.step2": "Klicke auf dein Profilbild (oben rechts) → Settings",
    "installation.github.step3": "Klicke in der linken Seitenleiste auf 'SSH and GPG keys'",
    "installation.github.step4": "Klicke auf 'New SSH key'",
    "installation.github.step5": "Gib einen aussagekräftigen Titel ein (z.B. 'Mein Laptop')",
    "installation.github.step6": "Füge den kopierten SSH-Schlüssel in das 'Key' Feld ein",
    "installation.github.step7": "Klicke auf 'Add SSH key'",
    "installation.github.test": "Verbindung testen",
    "installation.github.testDesc": "Teste die SSH-Verbindung zu GitHub mit diesem Befehl:",
    "installation.github.testSuccess": "Bei erfolgreicher Verbindung siehst du eine Willkommensnachricht von GitHub.",

    "installation.gitlab.title": "Mit GitLab verbinden",
    "installation.gitlab.intro":
        "GitLab ist eine weitere beliebte Git-Hosting-Plattform. So fügst du deinen SSH-Schlüssel hinzu:",
    "installation.gitlab.step1": "Gehe zu GitLab.com und melde dich in deinem Account an",
    "installation.gitlab.step2": "Klicke auf dein Profilbild (oben rechts) → Edit profile",
    "installation.gitlab.step3": "Klicke in der linken Seitenleiste auf 'SSH Keys'",
    "installation.gitlab.step4": "Füge den SSH-Schlüssel in das 'Key' Feld ein",
    "installation.gitlab.step5": "Gib einen aussagekräftigen Titel ein",
    "installation.gitlab.step6": "Wähle ein Ablaufdatum (optional, aber empfohlen)",
    "installation.gitlab.step7": "Klicke auf 'Add key'",
    "installation.gitlab.test": "Verbindung testen",
    "installation.gitlab.testDesc": "Teste die SSH-Verbindung zu GitLab:",

    // First Repository Setup
    "installation.firstRepo.title": "Erstes Repository einrichten",
    "installation.firstRepo.intro":
        "Nachdem Git konfiguriert und die SSH-Verbindung eingerichtet ist, kannst du mit der Arbeit beginnen:",
    "installation.firstRepo.clone": "Bestehendes Repository klonen",
    "installation.firstRepo.cloneDesc": "Um ein bestehendes Repository von GitHub/GitLab zu klonen:",
    "installation.firstRepo.create": "Neues Repository erstellen",
    "installation.firstRepo.createDesc": "Um ein neues lokales Repository zu erstellen:",
    "installation.firstRepo.connect": "Lokales Repository mit Remote verbinden",
    "installation.firstRepo.connectDesc": "Um ein lokales Repository mit einem Remote-Repository zu verbinden:",

    // Troubleshooting
    "installation.troubleshooting.title": "Fehlerbehebung",
    "installation.troubleshooting.intro":
        "Hier findest du Lösungen für häufige Probleme bei der Git-Installation und -Konfiguration:",
    "installation.troubleshooting.commandNotFound": "Fehler: 'git' Befehl nicht gefunden",
    "installation.troubleshooting.commandNotFoundSolution":
        "• Überprüfe, ob Git korrekt installiert wurde\n• Stelle sicher, dass Git zu deinem PATH hinzugefügt wurde\n• Starte das Terminal/die Eingabeaufforderung neu\n• Bei Windows: Verwende Git Bash oder füge Git manuell zum PATH hinzu",
    "installation.troubleshooting.permissionDenied": "Fehler: Permission denied (publickey)",
    "installation.troubleshooting.permissionDeniedSolution":
        "• Überprüfe, ob dein SSH-Schlüssel korrekt zu GitHub/GitLab hinzugefügt wurde\n• Stelle sicher, dass du den SSH-Clone-URL verwendest (nicht HTTPS)\n• Teste die SSH-Verbindung mit 'ssh -T git@github.com'\n• Überprüfe, ob der SSH-Agent läuft: 'ssh-add -l'",
    "installation.troubleshooting.httpsToSsh": "Von HTTPS zu SSH wechseln",
    "installation.troubleshooting.httpsToSshSolution":
        "Wenn du bereits ein Repository mit HTTPS geklont hast, kannst du zur SSH-Authentifizierung wechseln:",
    "installation.troubleshooting.sslError": "SSL-Zertifikat Fehler",
    "installation.troubleshooting.sslErrorSolution":
        "Bei Unternehmensnetzwerken oder Proxy-Servern können SSL-Probleme auftreten:\n• Vorübergehend: 'git config --global http.sslVerify false' (nicht empfohlen)\n• Besser: Konfiguriere Git für deinen Proxy oder verwende das Unternehmenszertifikat",
    "installation.troubleshooting.lineEndingIssues": "Zeilenenden-Probleme",
    "installation.troubleshooting.lineEndingIssuesSolution":
        "Bei gemischten Betriebssystemen in einem Team:\n• Windows: 'git config --global core.autocrlf true'\n• macOS/Linux: 'git config --global core.autocrlf input'\n• Alternative: Verwende eine .gitattributes Datei für präzise Kontrolle",
    "installation.troubleshooting.mergeConflicts": "Erste Hilfe bei Merge-Konflikten",
    "installation.troubleshooting.mergeConflictsSolution":
        "• Verwende 'git status' um betroffene Dateien zu sehen\n• Bearbeite die Dateien manuell oder verwende ein Merge-Tool\n• Nach der Bearbeitung: 'git add .' und 'git commit'\n• Bei Unsicherheit: 'git merge --abort' um den Merge abzubrechen",

    // Enhanced Platform Details
    "installation.windows.enhanced.title": "Detaillierte Windows-Installation",
    "installation.windows.enhanced.prereq": "Voraussetzungen",
    "installation.windows.enhanced.prereqDesc":
        "• Windows 7 oder neuer\n• Administratorrechte für die Installation\n• Internetzugang für den Download",
    "installation.windows.enhanced.installerOptions": "Wichtige Installer-Optionen",
    "installation.windows.enhanced.installerOptionsDesc":
        "Während der Installation solltest du folgende Optionen wählen:\n• 'Git from the command line and also from 3rd-party software'\n• 'Use bundled OpenSSH'\n• 'Use the OpenSSL library'\n• 'Checkout Windows-style, commit Unix-style line endings'\n• 'Use Windows' default console window'",
    "installation.windows.enhanced.postInstall": "Nach der Installation",
    "installation.windows.enhanced.postInstallDesc":
        "• Git Bash ist verfügbar im Kontextmenü (Rechtsklick in Ordnern)\n• Git GUI bietet eine grafische Oberfläche\n• Windows Terminal oder PowerShell können auch verwendet werden",

    "installation.linux.enhanced.title": "Detaillierte Linux-Installation",
    "installation.linux.enhanced.package": "Paketmanager verwenden",
    "installation.linux.enhanced.packageDesc":
        "Die Installation über den Paketmanager ist die empfohlene Methode für Linux:",
    "installation.linux.enhanced.source": "Aus Quellcode kompilieren (Fortgeschritten)",
    "installation.linux.enhanced.sourceDesc":
        "Für die neueste Version oder spezielle Konfigurationen:",
    "installation.linux.enhanced.sourceSteps":
        "# Abhängigkeiten installieren (Ubuntu/Debian)\nsudo apt-get install make libssl-dev libghc-zlib-dev libcurl4-gnutls-dev libncurses5-dev autoconf build-essential\n\n# Git Quellcode herunterladen\nwget https://github.com/git/git/archive/v2.43.0.tar.gz\ntar -zxf v2.43.0.tar.gz\ncd git-2.43.0\n\n# Kompilieren und installieren\nmake configure\n./configure --prefix=/usr/local\nmake all\nsudo make install",

    "installation.mac.enhanced.title": "Detaillierte macOS-Installation",
    "installation.mac.enhanced.xcode": "Xcode Command Line Tools",
    "installation.mac.enhanced.xcodeDesc":
        "Die einfachste Methode für macOS-Benutzer:\n• Öffne Terminal (Programme → Dienstprogramme → Terminal)\n• Gib 'git --version' ein\n• Falls Git nicht installiert ist, wirst du zur Installation aufgefordert\n• Klicke 'Installieren' um die Command Line Tools zu installieren",
    "installation.mac.enhanced.homebrew": "Homebrew (Empfohlen)",
    "installation.mac.enhanced.homebrewDesc":
        "Homebrew ist ein Paketmanager für macOS, der die Verwaltung von Entwicklertools vereinfacht:",
    "installation.mac.enhanced.homebrewSteps":
        "# Homebrew installieren (falls noch nicht vorhanden)\n/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"\n\n# Git installieren\nbrew install git\n\n# Git aktualisieren (später)\nbrew upgrade git",
    "installation.mac.enhanced.macports": "MacPorts (Alternative)",
    "installation.mac.enhanced.macportsDesc":
        "Falls du MacPorts verwendest:\n• sudo port install git +universal\n• sudo port install git-flow (optional)",

    // Additional Settings
    "installation.additionalSettings.title": "Zusätzliche Konfiguration",
    "installation.additionalSettings.intro":
        "Hier sind einige empfohlene zusätzliche Einstellungen, um Git für die optimale Nutzung zu konfigurieren:",
    "installation.additionalSettings.lineEndings": "Zeilenenden konfigurieren",
    "installation.additionalSettings.lineEndingsDesc":
        "Verschiedene Betriebssysteme behandeln Zeilenenden unterschiedlich. Konfiguriere Git, um sie richtig zu handhaben:",
    "installation.additionalSettings.defaultBranch": "Standard-Branch-Namen festlegen",
    "installation.additionalSettings.defaultBranchDesc":
        "Moderne Git-Workflows verwenden typischerweise 'main' als Standard-Branch-Namen anstelle von 'master':",
    "installation.additionalSettings.editor": "Standard-Editor konfigurieren",
    "installation.additionalSettings.editorDesc":
        "Lege deinen bevorzugten Texteditor für Git-Commit-Nachrichten und andere Operationen fest:",

    // Resources
    "installation.resources.title": "Zusätzliche Ressourcen",
    "installation.resources.download": "Herunterladen",
    "installation.resources.gui": "Git GUI-Clients",
    "installation.resources.githubDesktop": "Einfacher und benutzerfreundlicher Git-Client von GitHub",
    "installation.resources.gitkraken": "Leistungsstarker Git-Client mit visueller Commit-Historie",
    "installation.resources.sourcetree": "Kostenloser Git-Client für Windows und Mac",
    "installation.resources.editors": "Git-freundliche Code-Editoren",
    "installation.resources.vscode": "Kostenloser Code-Editor mit integrierter Git-Unterstützung",
    "installation.resources.atom": "Kostenloser Code-Editor mit Git-Integration",
    "installation.resources.sublime": "Beliebter Texteditor mit Git-Plugins",
    "installation.resources.docs": "Dokumentation",
    "installation.resources.officialDocs": "Offizielle Git-Dokumentation",
    "installation.resources.proGitBook": "Pro Git Buch (Kostenlos)",
    "installation.resources.githubGuide": "GitHub's Anleitung zur Einrichtung von Git",
};

export default installation;
