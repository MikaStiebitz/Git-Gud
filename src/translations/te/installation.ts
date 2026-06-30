const installation = {
    "installation.title": "Git Installation Guide",
    "installation.subtitle": "Getting Started with Git",
    "installation.intro":
        "This guide will help you install and configure Git on your operating system. Choose your platform below to get started.",
    "installation.download": "Download Git",
    "installation.moreDistros": "More Linux Distributions",

    // Windows
    "installation.windows.title": "Installing Git on Windows",
    "installation.windows.download": "Download Git for Windows",
    "installation.windows.step1": "Visit the official Git website at git-scm.com/downloads.",
    "installation.windows.step2": "Click on the Windows download link.",
    "installation.windows.step3": "The download should start automatically.",
    "installation.windows.install": "Install Git on Windows",
    "installation.windows.step4": "Run the downloaded executable file.",
    "installation.windows.step5":
        "Follow the installation wizard. The default options are generally suitable for most users.",
    "installation.windows.step6":
        "During installation, select 'Use Git from the Windows Command Prompt' to add Git to your PATH.",
    "installation.windows.step7": "Complete the installation process and click 'Finish'.",

    // Linux
    "installation.linux.title": "Installing Git on Linux",
    "installation.linux.debian": "Debian/Ubuntu and Derivatives",
    "installation.linux.fedora": "Fedora/RHEL/CentOS",
    "installation.linux.arch": "Arch Linux",

    // Mac
    "installation.mac.title": "Installing Git on macOS",
    "installation.mac.option1": "Option 1: Command Line Tools",
    "installation.mac.option1Desc":
        "The easiest way to install Git on a Mac is to open Terminal and type 'git --version'. If Git is not installed, you'll be prompted to install the Command Line Tools.",
    "installation.mac.option2": "Option 2: Download Git Installer",
    "installation.mac.step1": "Visit the official Git website at git-scm.com/downloads.",
    "installation.mac.step2": "Click on the macOS download link.",
    "installation.mac.step3": "Install the downloaded package following the prompts.",
    "installation.mac.brew": "Option 3: Using Homebrew",
    "installation.mac.brewDesc": "If you have Homebrew installed, you can install Git with the following commands:",

    // Common Configuration
    "installation.config": "Configure Git",
    "installation.configDesc":
        "After installation, you need to set up your user name and email address. This information is used with every Git commit.",
    "installation.verification": "Verify Installation",
    "installation.verificationDesc":
        "To confirm that Git has been installed correctly, open a terminal or command prompt and run:",

    // SSH Key Generation
    "installation.ssh.title": "Generate SSH Keys",
    "installation.ssh.intro":
        "SSH keys enable secure connection to Git hosting services like GitHub, GitLab, or Bitbucket without entering passwords for every push/pull.",
    "installation.ssh.generate": "Create SSH Key",
    "installation.ssh.generateDesc":
        "Run the following command to create a new SSH key. Replace the email address with your own:",
    "installation.ssh.saveLocation": "Confirm Save Location",
    "installation.ssh.saveLocationDesc":
        "When asked where to save the key, press Enter for the default location:",
    "installation.ssh.passphrase": "Passphrase (Optional)",
    "installation.ssh.passphraseDesc":
        "You can enter a passphrase for additional security or press Enter to continue:",
    "installation.ssh.copyKey": "Copy Public Key",
    "installation.ssh.copyKeyDesc":
        "Copy the contents of your public SSH key to the clipboard:",
    "installation.ssh.windows.copyKey": "For Windows (Git Bash/PowerShell):",
    "installation.ssh.mac.copyKey": "For macOS:",
    "installation.ssh.linux.copyKey": "For Linux:",

    // GitHub/GitLab Connection
    "installation.github.title": "Connect to GitHub",
    "installation.github.intro":
        "GitHub is the most popular Git hosting service. Here's how to add your SSH key:",
    "installation.github.step1": "Go to GitHub.com and sign in to your account",
    "installation.github.step2": "Click on your profile picture (top right) → Settings",
    "installation.github.step3": "Click on 'SSH and GPG keys' in the left sidebar",
    "installation.github.step4": "Click on 'New SSH key'",
    "installation.github.step5": "Enter a descriptive title (e.g., 'My Laptop')",
    "installation.github.step6": "Paste your copied SSH key into the 'Key' field",
    "installation.github.step7": "Click on 'Add SSH key'",
    "installation.github.test": "Test Connection",
    "installation.github.testDesc": "Test the SSH connection to GitHub with this command:",
    "installation.github.testSuccess": "On successful connection, you'll see a welcome message from GitHub.",

    "installation.gitlab.title": "Connect to GitLab",
    "installation.gitlab.intro":
        "GitLab is another popular Git hosting platform. Here's how to add your SSH key:",
    "installation.gitlab.step1": "Go to GitLab.com and sign in to your account",
    "installation.gitlab.step2": "Click on your profile picture (top right) → Edit profile",
    "installation.gitlab.step3": "Click on 'SSH Keys' in the left sidebar",
    "installation.gitlab.step4": "Paste your SSH key into the 'Key' field",
    "installation.gitlab.step5": "Enter a descriptive title",
    "installation.gitlab.step6": "Select an expiration date (optional but recommended)",
    "installation.gitlab.step7": "Click on 'Add key'",
    "installation.gitlab.test": "Test Connection",
    "installation.gitlab.testDesc": "Test the SSH connection to GitLab:",

    // First Repository Setup
    "installation.firstRepo.title": "Set Up First Repository",
    "installation.firstRepo.intro":
        "After Git is configured and SSH connection is set up, you can start working:",
    "installation.firstRepo.clone": "Clone Existing Repository",
    "installation.firstRepo.cloneDesc": "To clone an existing repository from GitHub/GitLab:",
    "installation.firstRepo.create": "Create New Repository",
    "installation.firstRepo.createDesc": "To create a new local repository:",
    "installation.firstRepo.connect": "Connect Local Repository to Remote",
    "installation.firstRepo.connectDesc": "To connect a local repository to a remote repository:",

    // Troubleshooting
    "installation.troubleshooting.title": "Troubleshooting",
    "installation.troubleshooting.intro":
        "Here are solutions to common problems during Git installation and configuration:",
    "installation.troubleshooting.commandNotFound": "Error: 'git' command not found",
    "installation.troubleshooting.commandNotFoundSolution":
        "• Check if Git was installed correctly\n• Make sure Git is added to your PATH\n• Restart terminal/command prompt\n• On Windows: Use Git Bash or manually add Git to PATH",
    "installation.troubleshooting.permissionDenied": "Error: Permission denied (publickey)",
    "installation.troubleshooting.permissionDeniedSolution":
        "• Check if your SSH key is correctly added to GitHub/GitLab\n• Make sure you're using the SSH clone URL (not HTTPS)\n• Test SSH connection with 'ssh -T git@github.com'\n• Check if SSH agent is running: 'ssh-add -l'",
    "installation.troubleshooting.httpsToSsh": "Switch from HTTPS to SSH",
    "installation.troubleshooting.httpsToSshSolution":
        "If you already cloned a repository with HTTPS, you can switch to SSH authentication:",
    "installation.troubleshooting.sslError": "SSL Certificate Error",
    "installation.troubleshooting.sslErrorSolution":
        "In corporate networks or proxy servers, SSL issues may occur:\n• Temporary: 'git config --global http.sslVerify false' (not recommended)\n• Better: Configure Git for your proxy or use corporate certificate",
    "installation.troubleshooting.lineEndingIssues": "Line Ending Issues",
    "installation.troubleshooting.lineEndingIssuesSolution":
        "In mixed operating system teams:\n• Windows: 'git config --global core.autocrlf true'\n• macOS/Linux: 'git config --global core.autocrlf input'\n• Alternative: Use .gitattributes file for precise control",
    "installation.troubleshooting.mergeConflicts": "First Aid for Merge Conflicts",
    "installation.troubleshooting.mergeConflictsSolution":
        "• Use 'git status' to see affected files\n• Edit files manually or use a merge tool\n• After editing: 'git add .' and 'git commit'\n• If unsure: 'git merge --abort' to cancel the merge",

    // Enhanced Platform Details
    "installation.windows.enhanced.title": "Detailed Windows Installation",
    "installation.windows.enhanced.prereq": "Prerequisites",
    "installation.windows.enhanced.prereqDesc":
        "• Windows 7 or newer\n• Administrator rights for installation\n• Internet access for download",
    "installation.windows.enhanced.installerOptions": "Important Installer Options",
    "installation.windows.enhanced.installerOptionsDesc":
        "During installation, choose these options:\n• 'Git from the command line and also from 3rd-party software'\n• 'Use bundled OpenSSH'\n• 'Use the OpenSSL library'\n• 'Checkout Windows-style, commit Unix-style line endings'\n• 'Use Windows' default console window'",
    "installation.windows.enhanced.postInstall": "After Installation",
    "installation.windows.enhanced.postInstallDesc":
        "• Git Bash is available in context menu (right-click in folders)\n• Git GUI provides a graphical interface\n• Windows Terminal or PowerShell can also be used",

    "installation.linux.enhanced.title": "Detailed Linux Installation",
    "installation.linux.enhanced.package": "Using Package Manager",
    "installation.linux.enhanced.packageDesc":
        "Installation via package manager is the recommended method for Linux:",
    "installation.linux.enhanced.source": "Compile from Source (Advanced)",
    "installation.linux.enhanced.sourceDesc":
        "For the latest version or special configurations:",
    "installation.linux.enhanced.sourceSteps":
        "# Install dependencies (Ubuntu/Debian)\nsudo apt-get install make libssl-dev libghc-zlib-dev libcurl4-gnutls-dev libncurses5-dev autoconf build-essential\n\n# Download Git source\nwget https://github.com/git/git/archive/v2.43.0.tar.gz\ntar -zxf v2.43.0.tar.gz\ncd git-2.43.0\n\n# Compile and install\nmake configure\n./configure --prefix=/usr/local\nmake all\nsudo make install",

    "installation.mac.enhanced.title": "Detailed macOS Installation",
    "installation.mac.enhanced.xcode": "Xcode Command Line Tools",
    "installation.mac.enhanced.xcodeDesc":
        "The simplest method for macOS users:\n• Open Terminal (Applications → Utilities → Terminal)\n• Type 'git --version'\n• If Git is not installed, you'll be prompted to install\n• Click 'Install' to install Command Line Tools",
    "installation.mac.enhanced.homebrew": "Homebrew (Recommended)",
    "installation.mac.enhanced.homebrewDesc":
        "Homebrew is a package manager for macOS that simplifies developer tool management:",
    "installation.mac.enhanced.homebrewSteps":
        "# Install Homebrew (if not already present)\n/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"\n\n# Install Git\nbrew install git\n\n# Update Git (later)\nbrew upgrade git",
    "installation.mac.enhanced.macports": "MacPorts (Alternative)",
    "installation.mac.enhanced.macportsDesc":
        "If you use MacPorts:\n• sudo port install git +universal\n• sudo port install git-flow (optional)",

    // Additional Settings
    "installation.additionalSettings.title": "Additional Configuration",
    "installation.additionalSettings.intro":
        "Here are some recommended additional settings to configure Git for optimal use:",
    "installation.additionalSettings.lineEndings": "Configure Line Endings",
    "installation.additionalSettings.lineEndingsDesc":
        "Different operating systems handle line endings differently. Configure Git to handle them properly:",
    "installation.additionalSettings.defaultBranch": "Set Default Branch Name",
    "installation.additionalSettings.defaultBranchDesc":
        "Modern Git workflows typically use 'main' as the default branch name instead of 'master':",
    "installation.additionalSettings.editor": "Configure Default Editor",
    "installation.additionalSettings.editorDesc":
        "Set your preferred text editor for Git commit messages and other operations:",

    // Resources
    "installation.resources.title": "Additional Resources",
    "installation.resources.download": "Download",
    "installation.resources.gui": "Git GUI Clients",
    "installation.resources.githubDesktop": "Simple and user-friendly Git client by GitHub",
    "installation.resources.gitkraken": "Powerful Git client with visual commit history",
    "installation.resources.sourcetree": "Free Git client for Windows and Mac",
    "installation.resources.editors": "Git-friendly Code Editors",
    "installation.resources.vscode": "Free code editor with built-in Git support",
    "installation.resources.atom": "Free code editor with Git integration",
    "installation.resources.sublime": "Popular text editor with Git plugins",
    "installation.resources.docs": "Documentation",
    "installation.resources.officialDocs": "Official Git Documentation",
    "installation.resources.proGitBook": "Pro Git Book (Free)",
    "installation.resources.githubGuide": "GitHub's Guide to Setting Up Git",
};

export default installation;
