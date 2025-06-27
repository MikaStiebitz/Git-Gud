"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import {
    ArrowUp,
    Calendar,
    MessageSquare,
    MoreVertical,
    Trash2,
    Edit,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
} from "lucide-react";
import type { Feedback, FeedbackStatus } from "~/types/feedback";

interface FeedbackCardProps {
    feedback: Feedback;
    isAdmin?: boolean;
    hasUpvoted?: boolean;
    onUpvote: (id: string) => void;
    onStatusChange: (id: string, status: FeedbackStatus) => void;
    onAddComment: (id: string, comment: string) => void;
    onDelete: (id: string) => void;
}

const typeConfig = {
    feature: { label: "Feature", color: "info" as const, icon: "✨" },
    bug: { label: "Bug", color: "destructive" as const, icon: "🐛" },
    level: { label: "Level", color: "success" as const, icon: "🎯" },
} as const;

const statusConfig = {
    open: { label: "Open", color: "secondary" as const, icon: AlertCircle },
    "in-progress": { label: "In Progress", color: "warning" as const, icon: Clock },
    closed: { label: "Closed", color: "success" as const, icon: CheckCircle },
    rejected: { label: "Rejected", color: "destructive" as const, icon: XCircle },
} as const;

export function FeedbackCard({
    feedback,
    isAdmin = false,
    hasUpvoted = false,
    onUpvote,
    onStatusChange,
    onAddComment,
    onDelete,
}: FeedbackCardProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [showCommentDialog, setShowCommentDialog] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [showAdminMenu, setShowAdminMenu] = useState(false);

    const typeInfo = typeConfig[feedback.type];
    const statusInfo = statusConfig[feedback.status];
    const StatusIcon = statusInfo.icon;

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(feedback.id, newComment.trim());
            setNewComment("");
            setShowCommentDialog(false);
        }
    };

    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        if (!dateObj || isNaN(dateObj.getTime())) {
            return "Invalid Date";
        }
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(dateObj);
    };

    return (
        <>
            <Card className="border border-l-4 border-purple-500/30 border-l-transparent bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-l-purple-500 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="mb-3 flex items-center gap-3">
                            <Badge
                                variant={typeInfo.color}
                                className="rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm">
                                <span className="mr-1.5">{typeInfo.icon}</span>
                                {typeInfo.label}
                            </Badge>
                            <Badge
                                variant={statusInfo.color}
                                className="rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm">
                                <StatusIcon className="mr-1.5 h-3 w-3" />
                                {statusInfo.label}
                            </Badge>
                            {feedback.tags.map(tag => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="rounded-md border-purple-500/30 bg-slate-700/50 px-2 py-1 text-xs text-purple-300">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>

                        <h3
                            className="mb-3 line-clamp-2 cursor-pointer text-xl font-bold leading-tight text-white transition-colors hover:text-purple-400"
                            onClick={() => setShowDetails(true)}>
                            {feedback.title}
                        </h3>

                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-300">
                            {feedback.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-6">
                                <span className="flex items-center gap-2 rounded-md bg-slate-700/50 px-2 py-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(feedback.createdAt)}
                                </span>
                                <span className="font-medium text-gray-300">by {feedback.authorName}</span>
                                {feedback.adminComments.length > 0 && (
                                    <span className="flex items-center gap-1 rounded-md border border-purple-500/30 bg-purple-900/50 px-2 py-1 text-purple-300">
                                        <MessageSquare className="h-3 w-3" />
                                        {feedback.adminComments.length} comment
                                        {feedback.adminComments.length !== 1 ? "s" : ""}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onUpvote(feedback.id)}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        hasUpvoted
                                            ? "transform bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md hover:scale-105 hover:shadow-lg"
                                            : "border border-purple-500/30 bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:shadow-md"
                                    }`}>
                                    <ArrowUp className="h-4 w-4" />
                                    <span className="font-bold">{feedback.upvotes}</span>
                                </button>

                                {isAdmin && (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowAdminMenu(!showAdminMenu)}
                                            className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-slate-600/50 hover:text-white">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>

                                        {showAdminMenu && (
                                            <>
                                                {/* Backdrop */}
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setShowAdminMenu(false)}
                                                />
                                                {/* Menu */}
                                                <div className="absolute right-0 top-8 z-50 min-w-[160px] rounded-lg border border-purple-500/30 bg-slate-800 py-2 shadow-xl backdrop-blur-sm">
                                                    <button
                                                        onClick={() => {
                                                            setShowCommentDialog(true);
                                                            setShowAdminMenu(false);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-300 transition-colors hover:bg-purple-900/30 hover:text-purple-300">
                                                        <Edit className="h-4 w-4" />
                                                        Add Comment
                                                    </button>
                                                    <div className="my-1 border-t border-purple-500/30" />
                                                    <button
                                                        onClick={() => {
                                                            onDelete(feedback.id);
                                                            setShowAdminMenu(false);
                                                        }}
                                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-400 transition-colors hover:bg-red-900/30 hover:text-red-300">
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {isAdmin && (
                            <div className="mt-4 border-t border-purple-500/30 pt-4">
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(statusConfig).map(([status, config]) => {
                                        const Icon = config.icon;
                                        return (
                                            <button
                                                key={status}
                                                onClick={() => onStatusChange(feedback.id, status as FeedbackStatus)}
                                                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
                                                    feedback.status === status
                                                        ? "bg-purple-500 text-white shadow-md"
                                                        : "border border-purple-500/30 bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                                                }`}>
                                                <Icon className="h-3 w-3" />
                                                {config.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* Details Dialog */}
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <div className="mb-2 flex items-center gap-2">
                            <Badge variant={typeInfo.color}>
                                {typeInfo.icon} {typeInfo.label}
                            </Badge>
                            <Badge variant={statusInfo.color}>
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {statusInfo.label}
                            </Badge>
                        </div>
                        <DialogTitle>{feedback.title}</DialogTitle>
                        <DialogDescription>
                            Submitted by {feedback.authorName} on {formatDate(feedback.createdAt)}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <h4 className="mb-2 font-medium">Description</h4>
                            <p className="whitespace-pre-wrap text-gray-600">{feedback.description}</p>
                        </div>

                        {feedback.tags.length > 0 && (
                            <div>
                                <h4 className="mb-2 font-medium">Tags</h4>
                                <div className="flex gap-2">
                                    {feedback.tags.map(tag => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {feedback.adminComments.length > 0 && (
                            <div>
                                <h4 className="mb-2 font-medium">Admin Comments</h4>
                                <div className="space-y-2">
                                    {feedback.adminComments.map(comment => (
                                        <div key={comment.id} className="rounded bg-gray-50 p-3">
                                            <div className="mb-1 flex items-center justify-between">
                                                <span className="text-sm font-medium text-blue-600">
                                                    {comment.authorName} (Admin)
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(comment.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-sm">{comment.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add Comment Dialog */}
            <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Admin Comment</DialogTitle>
                        <DialogDescription>
                            Add a comment to provide updates or feedback on this item.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Textarea
                            placeholder="Enter your comment..."
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            rows={4}
                        />

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowCommentDialog(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddComment}>Add Comment</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
