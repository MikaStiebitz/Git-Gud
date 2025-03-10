# GitGud - Interactive Git Learning Platform

<p align="center">
  <img src="./public/gitBranch.svg" alt="GitGud Logo" width="120" height="120" />
</p>

<p align="center">
  <strong>Learn Git through play - A modern interactive learning experience</strong>
</p>

## Overview

GitGud is a modern, interactive platform designed to help developers master Git through hands-on learning. Instead of passive tutorials, GitGud provides a fully simulated Git environment where you can practice commands and see real-time results in a gamified experience.

## Features

- **Interactive Terminal**: Practice Git commands in a simulated environment
- **Structured Learning Path**: Progress through carefully designed levels of increasing complexity
- **Visual Git Status**: See your repository status visually update as you work
- **Playground Mode**: Freely experiment with Git commands without level requirements
- **Command Cheat Sheet**: Quick reference for Git commands with explanations
- **Progress Tracking**: Track your learning journey with a visual progress system
- **Multi-language Support**: Available in both English and German

## Getting Started

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/gitgud.git
    cd gitgud
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to start learning Git!

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide React Icons

## Installation Instructions

To implement these fixes:

1. Create the necessary files and update the existing ones as shown in the code snippets.
2. Update the application's layout to include the LanguageProvider.
3. Modify the Terminal component to correctly handle the nano command.
4. Update the FileEditor component for better styling.
5. Add the language switcher to the navbar.
6. Fix the Git repository reset behavior to maintain initialization between levels.

## Contributing

We welcome contributions to GitGud! Whether you're fixing bugs, improving the documentation, or adding new features, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request with a clear description of your changes

## TODO

1. git add <filename> not properly working, only git add . (after git add <filename> its tracked but still untracked)
2. In Level add all files, git add . is not the only solution.
3. terminal tab suggestion menu should also work with one space between command
4. More Rebasing levels
5. Terminal command suggestion (example: i type git a and the terminal always looks for the best suggestion and displays git add and the user can apply this suggestion with tab)
6. git push is not working
