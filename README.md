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

## Recent Fixes

### 1. Fix for Nano Command & Modal Colors

The nano command has been improved to correctly open the file editor modal. Modal styling has been updated to match the app's dark purple theme.

### 2. Terminal Game Logic Separation

The playground mode now correctly separates game logic from the level progression system, ensuring users can't accidentally complete levels while in playground mode.

### 3. Language Switcher

A new language toggle has been added to the navbar, allowing users to switch between English and German. The application now includes a comprehensive translation system with context.

### 4. Git Repository Re-initialization Fix

Fixed issue where Git repository was unnecessarily reset between levels. Now the repository maintains its initialization state when moving between levels, except for specific levels that require a fresh Git environment.

## Installation Instructions

To implement these fixes:

1. Create the necessary files and update the existing ones as shown in the code snippets.
2. Update the application's layout to include the LanguageProvider.
3. Modify the Terminal component to correctly handle the nano command.
4. Update the FileEditor component for better styling.
5. Add the language switcher to the navbar.
6. Fix the Git repository reset behavior to maintain initialization between levels.

## Development Roadmap

Consider these future enhancements:

- **Mobile Responsiveness**: Optimize the terminal experience for smaller screens
- **Social Sharing**: Allow users to share their progress with others
- **More Git Functionality**: Add support for remote repositories and GitHub integration
- **Custom Challenges**: Let users create and share their own Git challenges
- **Achievement System**: Add badges and achievements for completing specific tasks

## Contributing

We welcome contributions to GitGud! Whether you're fixing bugs, improving the documentation, or adding new features, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request with a clear description of your changes

## TODO

1. Make Translations simpler
2. Fix: Terminal and Challange card should have the same height
