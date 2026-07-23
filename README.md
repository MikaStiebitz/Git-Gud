<div align="center">
  <a href="https://gitmastery.me">
    <img src="./public/readme-banner.webp" alt="GitMastery — Master Git through play" width="100%" />
  </a>
</div>

# GitMastery: Master Git Through Play

<div align="center">
  <a href="https://gitmastery.me">
    <img src="./public/gitBranch.svg" alt="GitMastery Logo" width="140" height="140" />
  </a>

  <h3 align="center">An interactive Git learning platform that makes mastering Git fun</h3>

  <p align="center">
    <a href="https://gitmastery.me">Try It Live</a>
    ·
    <a href="#features">Features</a>
    ·
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#contributing">Contributing</a>
  </p>

  <p align="center">
    <a href="https://github.com/MikaStiebitz/Git-Mastery" target="_blank">
      <img src="https://img.shields.io/github/stars/MikaStiebitz/Git-Mastery?style=social" alt="GitHub stars" />
    </a>
    <br/>
    <b>If you find this project helpful, please consider giving it a star 🌟</b>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
    <img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  </p>
</div>

## 🚀 About The Project

**GitMastery** is an interactive learning platform designed to help developers master Git through hands-on practice. While traditional tutorials often rely on passive learning, GitMastery provides a fully simulated Git environment where you can:

- Execute real Git commands in a safe sandbox
- See immediate visual feedback
- Progress through structured, bite-sized challenges
- Learn Git intuitively through gamification

Whether you're a complete beginner or looking to level up your Git skills, GitMastery offers an engaging, interactive approach to learning this essential developer tool.

**🌐 Visit GitMastery at [gitmastery.me](https://gitmastery.me) to start your journey!**

###### No registration needed!

## ✨ Features

### 🎓 Core Learning Experience

- **🖥️ Interactive Terminal**: Practice Git commands in a realistic simulated environment
- **🎯 Structured Learning Path**: Progress through carefully designed levels of increasing complexity
- **🌳 Interactive Commit Graph**: Every level includes a live, animated visualization of your repository — watch commits, branches and merges appear as you type, tap nodes for details, and highlight any branch's history
- **📊 Visual Git Status**: See your repository status visually update as you work
- **🎮 Playground Mode**: Freely experiment with Git commands without level requirements
- **📝 Command Cheat Sheet**: Quick reference for Git commands with explanations
- **📈 Progress Tracking**: Track your learning journey with a visual progress system
- **🌍 Multi-language Support**: Available in English, German, Persian and Hindi

### 🎮 Gamification & Rewards

- **🏪 In-Game Shop**: Earn points and purchase customization items and power-ups
- **🎨 Terminal Themes**: Unlock beautiful terminal themes including Matrix, Golden, and Dark themes
- **🐱 Git Mascot Pet**: Purchase an animated mascot that cheers you on during challenging levels
- **🔊 Victory Sound Pack**: Satisfying sound effects when completing levels and achieving milestones
- **⚡ Double XP Weekends**: Boost your point earning with 2x multiplier for 7 days
- **😊 Emoji Commit Messages**: Smart emoji suggestions for better commit messages
- **🏆 Achievement Badges**: Visual recognition system with special badges and legendary status
- **🎲 Mini Games**: Practice Git skills through fun interactive challenges

## 🛠️ Tech Stack

GitMastery is built with modern web technologies to provide the best learning experience:

### Frontend Framework

- **Next.js 16** - React framework with server-side rendering, App Router, and performance optimizations
- **TypeScript** - Type-safe development with enhanced IDE support and error catching
- **Tailwind CSS** - Utility-first CSS framework for rapid, responsive design

### UI & UX

- **GSAP** - Production-grade animation engine powering the landing page and the interactive commit-graph visualizer
- **Lucide React** - Customizable SVG icon library
- **shadcn/ui** - Re-usable component system built on Radix UI and Tailwind CSS

### Game Engine & State Management

- **Custom Git Simulation** - Full Git repository simulation in the browser
- **React Context API** - Global state management for game progress, themes, and user data
- **LocalStorage** - Client-side persistence for progress, purchases, and preferences

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/MikaStiebitz/Git-Mastery
cd Git-Mastery
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

## 📚 Documentation

For developers and contributors, detailed documentation is available to help you understand the codebase:

- [Commands Implementation](./src/commands/COMMANDS.md) - How Git commands are implemented and how to add new ones
- [Levels System](./src/levels/LEVELS.md) - How levels and stages work and how to create new levels
- [Translation System](./src/translations/TRANSLATIONS.md) - How to add or modify translations

## 🤝 Contributing

We welcome contributions to GitMastery! Whether you're fixing bugs, improving the documentation, or adding new features, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

For more details on the project structure, check the documentation linked above.

## ⭐ Support This Project

If you find GitMastery helpful in your Git learning journey, please consider:

- **Giving it a star on GitHub**: Visit [github.com/MikaStiebitz/Git-Mastery](https://github.com/MikaStiebitz/Git-Mastery) and click the star button
- **Sharing it** with friends and colleagues who are learning Git
- **Contributing** to make it even better

Your support helps this educational tool reach more developers!

## 📈 Star History

<div align="center">
  <a href="https://star-history.com/#MikaStiebitz/Git-Mastery&Date">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=MikaStiebitz/Git-Mastery&type=Date&theme=dark" />
      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=MikaStiebitz/Git-Mastery&type=Date" />
      <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=MikaStiebitz/Git-Mastery&type=Date" width="600" />
    </picture>
  </a>
</div>

## 📜 License

This project is licensed under the Restricted Use License - see the LICENSE file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/MikaStiebitz">Mika Stiebitz</a>
</p>
