const faq = {
    "faq.title": "Frequently Asked Questions about Git",
    "faq.subtitle": "Everything You Need to Know About Git",
    "faq.intro":
        "Git is a powerful and widely used version control system. Here are answers to common questions about Git, its purpose, and how it's used in software development.",

    // Categories
    "faq.categories.basics": "Git Basics",
    "faq.categories.concepts": "Key Concepts",
    "faq.categories.usage": "Practical Usage",

    // Basics Section
    "faq.whatIsGit.question": "What is Git?",
    "faq.whatIsGit.answer":
        "Git is a distributed version control system that tracks changes to files over time. It allows multiple people to collaborate on projects, maintain a history of changes, and revert to previous versions if needed. Unlike centralized version control systems, Git provides each developer with a complete copy of the repository, allowing for offline work and providing redundancy.",

    "faq.whyCreated.question": "Why was Git created?",
    "faq.whyCreated.answer":
        "Git was created by Linus Torvalds in 2005 for the development of the Linux kernel. Torvalds needed a distributed version control system that was fast, supported non-linear development with thousands of parallel branches, and could handle large projects like the Linux kernel efficiently. Existing tools at the time couldn't meet these requirements, so he developed Git. The name 'git' is British slang for 'unpleasant person', which Torvalds jokingly applied to the software (and himself).",

    "faq.vsOtherVcs.question": "How does Git differ from other version control systems?",
    "faq.vsOtherVcs.answer":
        "Git differs from older systems like SVN (Subversion) or CVS in several key ways:\n\n• It's distributed rather than centralized, giving each developer a full copy of the repository\n• It's designed for non-linear development with robust branching and merging capabilities\n• It's much faster, especially for operations like branching and merging\n• It uses a different approach to storing data, focusing on snapshots rather than file differences\n• It has better data integrity through its use of SHA-1 hashes\n• It provides strong support for offline operations",

    "faq.benefits.question": "What are the main benefits of using Git?",
    "faq.benefits.answer":
        "Git offers numerous advantages for software development:\n\n• Speed and efficiency, especially for large projects\n• Powerful branching and merging capabilities that support non-linear development\n• Distributed nature that provides redundancy and enables offline work\n• Strong support for parallel development workflows\n• Excellent data integrity and change tracking\n• Robust ecosystem with tools and hosting services like GitHub, GitLab, and Bitbucket\n• Extensive adoption in the industry, making it a valuable skill for developers\n• Free and open-source software",

    "faq.gitVsGithub.question": "What's the difference between Git and GitHub?",
    "faq.gitVsGithub.answer":
        "Git is the version control system itself—the software tool you install on your computer to track changes to your files. GitHub, on the other hand, is a web-based hosting service for Git repositories. GitHub adds additional features like pull requests, issue tracking, code reviews, and other collaboration tools. Similar services include GitLab and Bitbucket. Think of Git as the tool and GitHub as a service built around that tool to make it more user-friendly and to add collaborative features.",

    // Concepts Section
    "faq.repositories.question": "What are repositories in Git?",
    "faq.repositories.answer":
        "A repository (or 'repo') is the fundamental unit in Git. It contains all of your project's files and the entire history of changes made to those files. Technically, a Git repository is the .git directory in your project that stores all the metadata and object database for your project. When you clone a repository, you get a copy of this entire history. Repositories can be local (on your machine) or remote (on a server like GitHub).",

    "faq.commits.question": "What are commits and why are they important?",
    "faq.commits.answer":
        "Commits are snapshots of your entire repository at specific points in time. Each commit has a unique identifier (hash) and includes information about what changed, who made the change, when, and a message describing the change. Commits are important because they:\n\n• Create a history of your project's development\n• Allow you to go back to previous states of your project\n• Help identify when and by whom specific changes were introduced\n• Enable collaboration by providing clear points of reference\n\nGood commit messages are vital for understanding the 'why' behind changes when revisiting code later.",

    "faq.branches.question": "What are branches and how do they work?",
    "faq.branches.answer":
        "Branches in Git are simply movable pointers to commits. They allow parallel lines of development, so different features or fixes can be worked on simultaneously without interfering with each other. The default branch is usually called 'main' (previously 'master').\n\nWhen you create a branch, you're essentially creating a new pointer to the current commit. As you make new commits on that branch, the pointer moves forward automatically. This allows you to switch between different states of your project easily and to merge changes from one branch into another when ready.",

    "faq.merge.question": "What is merging and how do merge conflicts occur?",
    "faq.merge.answer":
        "Merging is the process of combining changes from one branch into another. For example, when a feature is complete in a feature branch, you would merge it into the main branch. Git automatically handles the merging when the changes don't overlap.\n\nMerge conflicts occur when the same part of a file has been changed differently in the two branches being merged. Git can't automatically determine which version to use, so it marks the file as having a conflict that must be resolved manually. The conflict markers in the file show both versions of the code, and you need to edit the file to create the final version before completing the merge.",

    "faq.workflow.question": "What is a typical Git workflow?",
    "faq.workflow.answer":
        "A common Git workflow might look like this:\n\n1. Create a branch for a new feature or bug fix\n2. Make changes and commit them to your branch\n3. Push your branch to the remote repository\n4. Create a pull request (on GitHub/GitLab) or request a code review\n5. Make additional changes if requested\n6. Merge the branch into the main branch when approved\n7. Delete the feature branch once it's merged\n\nThere are several established workflow models like GitHub Flow, GitFlow, and Trunk-Based Development, each with their own approach to branches, releases, and deployments.",

    // Usage Section
    "faq.whenUse.question": "When should I use Git?",
    "faq.whenUse.answer":
        "You should use Git for virtually any project where you need to track changes over time, especially if it involves code. This includes:\n\n• Software development projects of any size\n• Documentation projects\n• Configuration files\n• Writing projects like books or articles\n• Any collaborative project where multiple people need to work on the same files\n\nEven for solo projects, Git provides valuable features like history tracking, the ability to experiment with changes safely, and backup capabilities.",

    "faq.smallProjects.question": "Is Git overkill for small projects?",
    "faq.smallProjects.answer":
        "While Git has powerful features designed to handle large, complex projects, it's still valuable for small projects. Even for small or personal projects, Git provides:\n\n• A safety net that lets you revert changes if something breaks\n• A complete history of your work\n• The ability to work on multiple features simultaneously using branches\n• Easy backup of your project's entire history to remote repositories\n• Potential for collaboration in the future\n\nThe initial investment in learning Git pays off even for small projects with these benefits.",

    "faq.teamCollaboration.question": "How does Git help team collaboration?",
    "faq.teamCollaboration.answer":
        "Git enhances team collaboration in many ways:\n\n• Multiple developers can work on the same project simultaneously without overwriting each other's work\n• Changes are clearly tracked with author information and timestamps\n• Branching allows separate work on different features without interference\n• Pull requests (on platforms like GitHub) facilitate code reviews\n• Conflicts are identified automatically when they occur\n• Project history provides accountability and transparency\n• Remote repositories ensure everyone has access to the latest code\n• Issue tracking and project management tools integrate well with Git workflows",

    "faq.commandLine.question": "Do I have to use the command line for Git?",
    "faq.commandLine.answer":
        "No, you don't have to use the command line, although understanding Git commands can be helpful. There are many graphical user interfaces (GUIs) available for Git, including:\n\n• GitHub Desktop: A simple, user-friendly interface\n• GitKraken: A powerful cross-platform Git client\n• Sourcetree: Feature-rich Git client for Windows and Mac\n• Git Extensions: Open-source UI for Windows\n• TortoiseGit: Windows shell interface for Git\n\nAdditionally, most modern IDEs like Visual Studio Code, IntelliJ IDEA, and others have built-in Git integration, allowing you to perform common Git operations directly from the editor.",

    "faq.hosting.question": "Where can I host my Git repositories?",
    "faq.hosting.answer":
        "There are several popular services for hosting Git repositories:\n\n• GitHub: The most popular platform, with many collaboration features\n• GitLab: Features a complete DevOps platform with CI/CD capabilities\n• Bitbucket: Integrates well with other Atlassian products like Jira\n• Azure DevOps: Microsoft's solution with extensive integration into their ecosystem\n• Self-hosted options: GitLab Community Edition or Gitea for hosting on your own servers\n\nMost of these services offer free tiers for public repositories and individual developers, with paid plans for private repositories and teams.",

    // Call to action
    "faq.readyToStart.title": "Ready to Get Started with Git?",
    "faq.readyToStart.text":
        "Now that you understand the basics of Git, you're ready to start using it in your projects!",
    "faq.readyToStart.installButton": "Install Git",
    "faq.readyToStart.practiceButton": "Practice Git Commands",
};

export default faq;
