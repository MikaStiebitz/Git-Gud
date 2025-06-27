"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "~/components/layout/PageLayout";
import { CreateFeedbackDialog } from "~/components/feedback/CreateFeedbackDialog";
import { FeedbackCard } from "~/components/feedback/FeedbackCard";
import { FeedbackFilters } from "~/components/feedback/FeedbackFilters";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { MessageSquare, Settings, EyeOff, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import type { Feedback, CreateFeedbackData, FeedbackStatus } from "~/types/feedback";

export default function FeedbackPage() {
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminKey, setAdminKey] = useState("");
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    // Load feedback data
    const fetchFeedback = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (selectedType !== "all") params.set("type", selectedType);
            if (selectedStatus !== "all") params.set("status", selectedStatus);

            const response = await fetch(`/api/feedback?${params}`);
            const data = await response.json();

            if (response.ok) {
                setFeedback(data.feedback || []);
            } else {
                console.error("Failed to fetch feedback:", data.error);
            }
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchFeedback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedType, selectedStatus]);

    // Filter feedback based on search query
    useEffect(() => {
        let filtered = feedback;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                item =>
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    item.tags.some(tag => tag.toLowerCase().includes(query)) ||
                    item.authorName.toLowerCase().includes(query),
            );
        }

        setFilteredFeedback(filtered);
    }, [feedback, searchQuery]);

    const handleCreateFeedback = async (data: CreateFeedbackData) => {
        try {
            setSubmitting(true);
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                await fetchFeedback(); // Refresh the list
            } else {
                const error = await response.json();
                console.error("Failed to create feedback:", error);
            }
        } catch (error) {
            console.error("Error creating feedback:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpvote = async (id: string) => {
        try {
            const response = await fetch(`/api/feedback/${id}/upvote`, {
                method: "POST",
            });

            if (response.ok) {
                const data = await response.json();
                setFeedback(prev => prev.map(item => (item.id === id ? data.feedback : item)));
            }
        } catch (error) {
            console.error("Error toggling upvote:", error);
        }
    };

    const handleStatusChange = async (id: string, status: FeedbackStatus) => {
        if (!isAdmin) return;

        try {
            const response = await fetch(`/api/feedback/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                await fetchFeedback();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleAddComment = async (id: string, comment: string) => {
        if (!isAdmin) return;

        try {
            const response = await fetch(`/api/feedback/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify({
                    adminComment: {
                        content: comment,
                        authorName: "Admin",
                    },
                }),
            });

            if (response.ok) {
                await fetchFeedback();
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!isAdmin) return;

        if (!confirm("Are you sure you want to delete this feedback?")) return;

        try {
            const response = await fetch(`/api/feedback/${id}`, {
                method: "DELETE",
                headers: { "x-admin-key": adminKey },
            });

            if (response.ok) {
                await fetchFeedback();
            }
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    };

    const handleAdminLogin = () => {
        // Simple admin check - in a real app you'd have proper authentication
        if (adminKey === "admin123") {
            setIsAdmin(true);
            setShowAdminPanel(false);
        } else {
            alert("Invalid admin key");
        }
    };

    const stats = {
        total: feedback.length,
        open: feedback.filter(f => f.status === "open").length,
        inProgress: feedback.filter(f => f.status === "in-progress").length,
        closed: feedback.filter(f => f.status === "closed").length,
    };

    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
                <div className="container mx-auto max-w-7xl px-4 py-8">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/30 px-4 py-2 text-sm font-medium text-purple-300">
                            <MessageSquare className="h-4 w-4" />
                            Community Feedback
                        </div>
                        <h1 className="mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-5xl font-bold text-transparent">
                            GitGud Feedback Board
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300">
                            Share your ideas, report bugs, and help us improve GitGud together! Your feedback shapes the
                            future of our platform.
                        </p>

                        <div className="mb-8 flex justify-center gap-4">
                            <CreateFeedbackDialog onSubmit={handleCreateFeedback} isLoading={submitting} />

                            {!isAdmin ? (
                                <Button
                                    variant="outline"
                                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                                    className="border-2 border-purple-500/30 px-6 py-3 text-purple-300 hover:border-purple-400 hover:bg-purple-900/20 hover:text-purple-200">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Admin Access
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAdmin(false)}
                                    className="border-2 border-red-500/30 px-6 py-3 text-red-300 hover:border-red-400 hover:bg-red-900/20 hover:text-red-200">
                                    <EyeOff className="mr-2 h-4 w-4" />
                                    Exit Admin Mode
                                </Button>
                            )}
                        </div>

                        {/* Admin Panel */}
                        {showAdminPanel && !isAdmin && (
                            <Card className="mx-auto mb-8 max-w-md border-2 border-purple-500/30 bg-slate-800/50 p-6 backdrop-blur-sm">
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <Settings className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                                        <h3 className="text-lg font-bold text-white">Admin Access</h3>
                                        <p className="text-sm text-gray-300">
                                            Enter admin credentials to manage feedback
                                        </p>
                                    </div>
                                    <Input
                                        type="password"
                                        placeholder="Enter admin key"
                                        value={adminKey}
                                        onChange={e => setAdminKey(e.target.value)}
                                        onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
                                        className="border-2 border-purple-500/30 bg-slate-700/50 text-white placeholder:text-gray-400 focus:border-purple-400"
                                    />
                                    <Button
                                        onClick={handleAdminLogin}
                                        size="sm"
                                        className="w-full bg-purple-600 hover:bg-purple-700">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Login as Admin
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {/* Stats */}
                        <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
                            <Card className="border-purple-500/30 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-purple-500/10">
                                <div className="mb-1 text-3xl font-bold text-purple-400">{stats.total}</div>
                                <div className="flex items-center gap-1 text-sm font-medium text-gray-300">
                                    <MessageSquare className="h-4 w-4" />
                                    Total Items
                                </div>
                            </Card>
                            <Card className="border-orange-500/30 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-orange-500/10">
                                <div className="mb-1 text-3xl font-bold text-orange-400">{stats.open}</div>
                                <div className="flex items-center gap-1 text-sm font-medium text-gray-300">
                                    <AlertTriangle className="h-4 w-4" />
                                    Open
                                </div>
                            </Card>
                            <Card className="border-yellow-500/30 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-yellow-500/10">
                                <div className="mb-1 text-3xl font-bold text-yellow-400">{stats.inProgress}</div>
                                <div className="flex items-center gap-1 text-sm font-medium text-gray-300">
                                    <Clock className="h-4 w-4" />
                                    In Progress
                                </div>
                            </Card>
                            <Card className="border-green-500/30 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-green-500/10">
                                <div className="mb-1 text-3xl font-bold text-green-400">{stats.closed}</div>
                                <div className="flex items-center gap-1 text-sm font-medium text-gray-300">
                                    <CheckCircle className="h-4 w-4" />
                                    Closed
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Filters */}
                    <FeedbackFilters
                        searchQuery={searchQuery}
                        selectedType={selectedType}
                        selectedStatus={selectedStatus}
                        onSearchChange={setSearchQuery}
                        onTypeChange={setSelectedType}
                        onStatusChange={setSelectedStatus}
                        totalCount={filteredFeedback.length}
                    />

                    {/* Feedback List */}
                    <div className="mt-8">
                        {loading ? (
                            <div className="grid gap-6">
                                {[1, 2, 3].map(i => (
                                    <Card key={i} className="animate-pulse p-6">
                                        <div className="flex space-x-4">
                                            <div className="flex-1 space-y-3">
                                                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                                                <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                                                <div className="h-2 w-full rounded bg-gray-200"></div>
                                                <div className="h-2 w-2/3 rounded bg-gray-200"></div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : filteredFeedback.length === 0 ? (
                            <Card className="border border-purple-500/30 bg-slate-800/50 p-12 text-center backdrop-blur-sm">
                                <MessageSquare className="mx-auto mb-6 h-16 w-16 text-purple-400" />
                                <h3 className="mb-3 text-xl font-bold text-white">No feedback found</h3>
                                <p className="mb-6 text-gray-300">
                                    {searchQuery || selectedType !== "all" || selectedStatus !== "all"
                                        ? "Try adjusting your filters or search query to find what you're looking for."
                                        : "Be the first to share your feedback and help make GitGud better!"}
                                </p>
                                {!searchQuery && selectedType === "all" && selectedStatus === "all" && (
                                    <CreateFeedbackDialog onSubmit={handleCreateFeedback} isLoading={submitting} />
                                )}
                            </Card>
                        ) : (
                            <div className="grid gap-6">
                                {filteredFeedback.map(item => (
                                    <FeedbackCard
                                        key={item.id}
                                        feedback={item}
                                        isAdmin={isAdmin}
                                        hasUpvoted={false} // In a real app, check if user has upvoted
                                        onUpvote={handleUpvote}
                                        onStatusChange={handleStatusChange}
                                        onAddComment={handleAddComment}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
