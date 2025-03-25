"use client";

import { useState } from "react";
import { PageLayout } from "~/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useLanguage } from "~/contexts/LanguageContext";
import { Grid2X2, Apple, Terminal, Download, ExternalLink } from "lucide-react";

export default function InstallationPage() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<"windows" | "linux" | "mac">("windows");

    const renderCommand = (command: string, index: number) => (
        <div key={index} className="py-0.5">
            {command}
        </div>
    );

    return (
        <PageLayout>
            <div className="min-h-screen bg-[#1a1625] text-purple-100">
                <div className="container mx-auto p-4 py-8">
                    <h1 className="mb-6 text-center text-3xl font-bold text-white">{t("installation.title")}</h1>

                    <Card className="mb-8 border-purple-900/20 bg-purple-900/10">
                        <CardHeader>
                            <CardTitle className="text-white">{t("installation.subtitle")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-purple-200">
                            <p>{t("installation.intro")}</p>

                            {/* OS Selection Tabs */}
                            <div className="flex flex-wrap gap-2 pt-4">
                                <Button
                                    variant={activeTab === "windows" ? "default" : "outline"}
                                    className={`flex items-center ${activeTab === "windows" ? "bg-purple-600 text-white" : "border-purple-700 text-purple-300"}`}
                                    onClick={() => setActiveTab("windows")}>
                                    <Grid2X2 className="mr-2 h-4 w-4" />
                                    Windows
                                </Button>
                                <Button
                                    variant={activeTab === "linux" ? "default" : "outline"}
                                    className={`flex items-center ${activeTab === "linux" ? "bg-purple-600 text-white" : "border-purple-700 text-purple-300"}`}
                                    onClick={() => setActiveTab("linux")}>
                                    <Terminal className="mr-2 h-4 w-4" />
                                    Linux
                                </Button>
                                <Button
                                    variant={activeTab === "mac" ? "default" : "outline"}
                                    className={`flex items-center ${activeTab === "mac" ? "bg-purple-600 text-white" : "border-purple-700 text-purple-300"}`}
                                    onClick={() => setActiveTab("mac")}>
                                    <Apple className="mr-2 h-4 w-4" />
                                    macOS
                                </Button>
                            </div>

                            {/* Windows Installation Instructions */}
                            {activeTab === "windows" && (
                                <div className="mt-6 space-y-6">
                                    <h2 className="text-xl font-semibold text-white">
                                        {t("installation.windows.title")}
                                    </h2>

                                    <div className="space-y-4">
                                        <h3 className="flex items-center text-lg font-medium text-purple-300">
                                            <Download className="mr-2 h-5 w-5" />
                                            {t("installation.windows.download")}
                                        </h3>
                                        <ol className="ml-6 list-decimal space-y-2 text-purple-200">
                                            <li>{t("installation.windows.step1")}</li>
                                            <li>{t("installation.windows.step2")}</li>
                                            <li>{t("installation.windows.step3")}</li>
                                        </ol>

                                        <div className="flex justify-center">
                                            <a
                                                href="https://git-scm.com/download/win"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center rounded bg-purple-700 px-4 py-2 text-white transition-all hover:bg-purple-600">
                                                <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                                {t("installation.download")}
                                                <ExternalLink className="ml-1 h-3.5 w-3.5" />
                                            </a>
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.windows.install")}
                                        </h3>
                                        <ol className="ml-6 list-decimal space-y-2 text-purple-200">
                                            <li>{t("installation.windows.step4")}</li>
                                            <li>{t("installation.windows.step5")}</li>
                                            <li>{t("installation.windows.step6")}</li>
                                            <li>{t("installation.windows.step7")}</li>
                                        </ol>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.config")}
                                        </h3>
                                        <p>{t("installation.configDesc")}</p>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            {[
                                                'git config --global user.name "Your Name"',
                                                'git config --global user.email "your.email@example.com"',
                                            ].map((cmd, index) => renderCommand(cmd, index))}
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.verification")}
                                        </h3>
                                        <p>{t("installation.verificationDesc")}</p>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            git --version
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Linux Installation Instructions */}
                            {activeTab === "linux" && (
                                <div className="mt-6 space-y-6">
                                    <h2 className="text-xl font-semibold text-white">
                                        {t("installation.linux.title")}
                                    </h2>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.linux.debian")}
                                        </h3>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            {renderCommand("sudo apt update", 0)}
                                            {renderCommand("sudo apt install git", 1)}
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.linux.fedora")}
                                        </h3>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            {renderCommand("sudo dnf install git", 0)}
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.linux.arch")}
                                        </h3>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            {renderCommand("sudo pacman -S git", 0)}
                                        </div>

                                        <div className="flex justify-center">
                                            <a
                                                href="https://git-scm.com/download/linux"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center rounded bg-purple-700 px-4 py-2 text-white transition-all hover:bg-purple-600">
                                                <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                                {t("installation.moreDistros")}
                                                <ExternalLink className="ml-1 h-3.5 w-3.5" />
                                            </a>
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.config")}
                                        </h3>
                                        <p>{t("installation.configDesc")}</p>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            {[
                                                'git config --global user.name "Your Name"',
                                                'git config --global user.email "your.email@example.com"',
                                            ].map((cmd, index) => renderCommand(cmd, index))}
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.verification")}
                                        </h3>
                                        <p>{t("installation.verificationDesc")}</p>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            git --version
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* macOS Installation Instructions */}
                            {activeTab === "mac" && (
                                <div className="mt-6 space-y-6">
                                    <h2 className="text-xl font-semibold text-white">{t("installation.mac.title")}</h2>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.mac.option1")}
                                        </h3>
                                        <p>{t("installation.mac.option1Desc")}</p>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            git --version
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.mac.option2")}
                                        </h3>
                                        <ol className="ml-6 list-decimal space-y-2 text-purple-200">
                                            <li>{t("installation.mac.step1")}</li>
                                            <li>{t("installation.mac.step2")}</li>
                                            <li>{t("installation.mac.step3")}</li>
                                        </ol>

                                        <div className="flex justify-center">
                                            <a
                                                href="https://git-scm.com/download/mac"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center rounded bg-purple-700 px-4 py-2 text-white transition-all hover:bg-purple-600">
                                                <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                                {t("installation.download")}
                                                <ExternalLink className="ml-1 h-3.5 w-3.5" />
                                            </a>
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.mac.brew")}
                                        </h3>
                                        <p>{t("installation.mac.brewDesc")}</p>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            {renderCommand(
                                                '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
                                                0,
                                            )}
                                            {renderCommand("brew install git", 1)}
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.config")}
                                        </h3>
                                        <p>{t("installation.configDesc")}</p>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            {renderCommand('git config --global user.name "Your Name"', 0)}
                                            {renderCommand(
                                                'git config --global user.email "your.email@example.com"',
                                                1,
                                            )}
                                        </div>

                                        <h3 className="text-lg font-medium text-purple-300">
                                            {t("installation.verification")}
                                        </h3>
                                        <p>{t("installation.verificationDesc")}</p>
                                        <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                            git --version
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Additional Tips and Resources */}
                    <Card className="mb-6 border-purple-900/20 bg-purple-900/10">
                        <CardHeader>
                            <CardTitle className="text-white">{t("installation.additionalSettings.title")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-purple-200">
                            <p>{t("installation.additionalSettings.intro")}</p>

                            <h3 className="text-lg font-medium text-purple-300">
                                {t("installation.additionalSettings.lineEndings")}
                            </h3>
                            <p>{t("installation.additionalSettings.lineEndingsDesc")}</p>
                            <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                {renderCommand("# Windows", 0)}
                                {renderCommand("git config --global core.autocrlf true", 1)}
                                {renderCommand("", 2)}
                                {renderCommand("# macOS/Linux", 3)}
                                {renderCommand("git config --global core.autocrlf input", 4)}
                            </div>

                            <h3 className="text-lg font-medium text-purple-300">
                                {t("installation.additionalSettings.defaultBranch")}
                            </h3>
                            <p>{t("installation.additionalSettings.defaultBranchDesc")}</p>
                            <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                {renderCommand("git config --global init.defaultBranch main", 0)}
                            </div>

                            <h3 className="text-lg font-medium text-purple-300">
                                {t("installation.additionalSettings.editor")}
                            </h3>
                            <p>{t("installation.additionalSettings.editorDesc")}</p>
                            <div className="overflow-x-auto rounded bg-black/30 p-3 font-mono text-sm text-green-400">
                                {renderCommand("# For VSCode", 0)}
                                {renderCommand('git config --global core.editor "code --wait"', 1)}
                                {renderCommand("", 2)}
                                {renderCommand("# For Vim", 3)}
                                {renderCommand("git config --global core.editor vim", 4)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-900/20 bg-purple-900/10">
                        <CardHeader>
                            <CardTitle className="text-white">{t("installation.resources.title")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-purple-200">
                            <h3 className="text-lg font-medium text-purple-300">{t("installation.resources.gui")}</h3>
                            <ul className="ml-6 list-disc space-y-2">
                                <li>
                                    <strong>GitHub Desktop</strong> - {t("installation.resources.githubDesktop")}
                                    <a
                                        href="https://desktop.github.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 inline-flex items-center text-purple-400 hover:text-purple-300 hover:underline">
                                        {t("installation.resources.download")}
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </li>
                                <li>
                                    <strong>GitKraken</strong> - {t("installation.resources.gitkraken")}
                                    <a
                                        href="https://www.gitkraken.com/download"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 inline-flex items-center text-purple-400 hover:text-purple-300 hover:underline">
                                        {t("installation.resources.download")}
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </li>
                                <li>
                                    <strong>Sourcetree</strong> - {t("installation.resources.sourcetree")}
                                    <a
                                        href="https://www.sourcetreeapp.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 inline-flex items-center text-purple-400 hover:text-purple-300 hover:underline">
                                        {t("installation.resources.download")}
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </li>
                            </ul>

                            <h3 className="text-lg font-medium text-purple-300">
                                {t("installation.resources.editors")}
                            </h3>
                            <ul className="ml-6 list-disc space-y-2">
                                <li>
                                    <strong>Visual Studio Code</strong> - {t("installation.resources.vscode")}
                                    <a
                                        href="https://code.visualstudio.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 inline-flex items-center text-purple-400 hover:text-purple-300 hover:underline">
                                        {t("installation.resources.download")}
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </li>
                                <li>
                                    <strong>Atom</strong> - {t("installation.resources.atom")}
                                    <a
                                        href="https://atom.io/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 inline-flex items-center text-purple-400 hover:text-purple-300 hover:underline">
                                        {t("installation.resources.download")}
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </li>
                                <li>
                                    <strong>Sublime Text</strong> - {t("installation.resources.sublime")}
                                    <a
                                        href="https://www.sublimetext.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 inline-flex items-center text-purple-400 hover:text-purple-300 hover:underline">
                                        {t("installation.resources.download")}
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </li>
                            </ul>

                            <h3 className="text-lg font-medium text-purple-300">{t("installation.resources.docs")}</h3>
                            <ul className="ml-6 list-disc space-y-2">
                                <li>
                                    <a
                                        href="https://git-scm.com/doc"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:text-purple-300 hover:underline">
                                        {t("installation.resources.officialDocs")}
                                        <ExternalLink className="ml-1 inline-block h-3 w-3" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://git-scm.com/book/en/v2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:text-purple-300 hover:underline">
                                        {t("installation.resources.proGitBook")}
                                        <ExternalLink className="ml-1 inline-block h-3 w-3" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://docs.github.com/en/get-started/quickstart/set-up-git"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:text-purple-300 hover:underline">
                                        {t("installation.resources.githubGuide")}
                                        <ExternalLink className="ml-1 inline-block h-3 w-3" />
                                    </a>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
}
