"use client";

import { PageLayout } from "~/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLanguage } from "~/contexts/LanguageContext";
import {
    HelpCircle,
    GitBranch,
    GitCommit,
    GitMerge,
    History,
    Users,
    Github,
    Code,
    Workflow,
    Search,
    Terminal,
    ServerCrash,
    CheckCircle,
    Folder,
    Download,
} from "lucide-react";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

interface FAQItem {
    id: string;
    icon: React.ReactNode;
    question: string;
    answer: string;
}

interface FAQSection {
    category: string;
    items: FAQItem[];
}

export default function FAQPage() {
    const { t } = useLanguage();

    // FAQ items with their icons and categories
    const faqItems: FAQSection[] = [
        // Basics
        {
            category: "basics",
            items: [
                {
                    id: "what-is-git",
                    icon: <GitBranch className="h-5 w-5 text-purple-400" />,
                    question: t("faq.whatIsGit.question"),
                    answer: t("faq.whatIsGit.answer"),
                },
                {
                    id: "why-created",
                    icon: <History className="h-5 w-5 text-purple-400" />,
                    question: t("faq.whyCreated.question"),
                    answer: t("faq.whyCreated.answer"),
                },
                {
                    id: "vs-other-vcs",
                    icon: <Search className="h-5 w-5 text-purple-400" />,
                    question: t("faq.vsOtherVcs.question"),
                    answer: t("faq.vsOtherVcs.answer"),
                },
                {
                    id: "benefits",
                    icon: <CheckCircle className="h-5 w-5 text-purple-400" />,
                    question: t("faq.benefits.question"),
                    answer: t("faq.benefits.answer"),
                },
                {
                    id: "git-vs-github",
                    icon: <Github className="h-5 w-5 text-purple-400" />,
                    question: t("faq.gitVsGithub.question"),
                    answer: t("faq.gitVsGithub.answer"),
                },
            ],
        },
        // Concepts
        {
            category: "concepts",
            items: [
                {
                    id: "repositories",
                    icon: <Folder className="h-5 w-5 text-purple-400" />,
                    question: t("faq.repositories.question"),
                    answer: t("faq.repositories.answer"),
                },
                {
                    id: "commits",
                    icon: <GitCommit className="h-5 w-5 text-purple-400" />,
                    question: t("faq.commits.question"),
                    answer: t("faq.commits.answer"),
                },
                {
                    id: "branches",
                    icon: <GitBranch className="h-5 w-5 text-purple-400" />,
                    question: t("faq.branches.question"),
                    answer: t("faq.branches.answer"),
                },
                {
                    id: "merge",
                    icon: <GitMerge className="h-5 w-5 text-purple-400" />,
                    question: t("faq.merge.question"),
                    answer: t("faq.merge.answer"),
                },
                {
                    id: "workflow",
                    icon: <Workflow className="h-5 w-5 text-purple-400" />,
                    question: t("faq.workflow.question"),
                    answer: t("faq.workflow.answer"),
                },
            ],
        },
        // Usage
        {
            category: "usage",
            items: [
                {
                    id: "when-use",
                    icon: <HelpCircle className="h-5 w-5 text-purple-400" />,
                    question: t("faq.whenUse.question"),
                    answer: t("faq.whenUse.answer"),
                },
                {
                    id: "small-projects",
                    icon: <Code className="h-5 w-5 text-purple-400" />,
                    question: t("faq.smallProjects.question"),
                    answer: t("faq.smallProjects.answer"),
                },
                {
                    id: "team-collaboration",
                    icon: <Users className="h-5 w-5 text-purple-400" />,
                    question: t("faq.teamCollaboration.question"),
                    answer: t("faq.teamCollaboration.answer"),
                },
                {
                    id: "command-line",
                    icon: <Terminal className="h-5 w-5 text-purple-400" />,
                    question: t("faq.commandLine.question"),
                    answer: t("faq.commandLine.answer"),
                },
                {
                    id: "hosting",
                    icon: <ServerCrash className="h-5 w-5 text-purple-400" />,
                    question: t("faq.hosting.question"),
                    answer: t("faq.hosting.answer"),
                },
            ],
        },
    ];

    // Helper function to render a FAQ section
    const renderFAQSection = (category: string, items: FAQItem[]) => (
        <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-white">{t(`faq.categories.${category}`)}</h2>
            <Accordion type="single" collapsible className="space-y-3">
                {items.map(item => (
                    <AccordionItem
                        key={item.id}
                        value={item.id}
                        className="overflow-hidden rounded-md border border-purple-800/40">
                        <AccordionTrigger className="px-4 py-3 hover:bg-purple-900/30 hover:no-underline">
                            <div className="flex items-center text-left">
                                <span className="mr-3 flex-shrink-0">{item.icon}</span>
                                <span className="font-medium text-purple-100">{item.question}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-t border-purple-800/40 bg-purple-900/20 px-4 py-3 text-purple-200">
                            <div className="pl-9">{item.answer}</div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );

    return (
        <PageLayout>
            <div className="min-h-screen bg-[#1a1625] text-purple-100">
                <div className="container mx-auto p-4 py-8">
                    <h1 className="mb-6 text-center text-3xl font-bold text-white">{t("faq.title")}</h1>

                    <Card className="mb-8 border-purple-900/20 bg-purple-900/10">
                        <CardHeader>
                            <CardTitle className="flex items-center text-white">
                                <HelpCircle className="mr-2 h-6 w-6 text-purple-400" />
                                {t("faq.subtitle")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-6 text-purple-200">{t("faq.intro")}</p>

                            {/* Render each FAQ section */}
                            {faqItems.map(section => renderFAQSection(section.category, section.items))}

                            {/* Final encouragement section */}
                            <div className="mt-8 rounded-lg border border-purple-700/30 bg-purple-900/30 p-6 text-center">
                                <h3 className="mb-3 text-lg font-semibold text-white">{t("faq.readyToStart.title")}</h3>
                                <p className="mb-4 text-purple-200">{t("faq.readyToStart.text")}</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <Link href="/installation">
                                        <Button className="bg-purple-600 text-white hover:bg-purple-700">
                                            <Download className="mr-2 h-4 w-4" />
                                            {t("faq.readyToStart.installButton")}
                                        </Button>
                                    </Link>
                                    <Link href="/level">
                                        <Button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800">
                                            <Code className="mr-2 h-4 w-4" />
                                            {t("faq.readyToStart.practiceButton")}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
}
