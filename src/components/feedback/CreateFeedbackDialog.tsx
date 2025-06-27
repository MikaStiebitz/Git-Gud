"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Plus, Tag } from "lucide-react";
import type { FeedbackType, CreateFeedbackData } from "~/types/feedback";

interface CreateFeedbackDialogProps {
    onSubmit: (data: CreateFeedbackData) => void;
    isLoading?: boolean;
}

export function CreateFeedbackDialog({ onSubmit, isLoading }: CreateFeedbackDialogProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "feature" as FeedbackType,
        authorName: "",
        tags: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim() || !formData.authorName.trim()) {
            return;
        }

        const tags = formData.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        onSubmit({
            title: formData.title.trim(),
            description: formData.description.trim(),
            type: formData.type,
            authorName: formData.authorName.trim(),
            tags,
        });

        // Reset form
        setFormData({
            title: "",
            description: "",
            type: "feature",
            authorName: "",
            tags: "",
        });

        setOpen(false);
    };

    const typeOptions = [
        { value: "feature", label: "Feature Request", color: "bg-gradient-to-r from-blue-500 to-blue-600" },
        { value: "bug", label: "Bug Report", color: "bg-gradient-to-r from-red-500 to-red-600" },
        { value: "level", label: "Level Request", color: "bg-gradient-to-r from-green-500 to-green-600" },
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="transform bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl">
                    <Plus className="mr-2 h-5 w-5" />
                    Submit Feedback
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto border-purple-500/30 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 sm:max-w-[600px]">
                <DialogHeader className="pb-4">
                    <DialogTitle className="text-2xl font-bold text-white">Submit Feedback</DialogTitle>
                    <DialogDescription className="text-base text-gray-300">
                        Share your ideas, report bugs, or request new levels. Help us make GitGud better for everyone!
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="authorName" className="block text-sm font-semibold text-gray-200">
                            Your Name *
                        </label>
                        <Input
                            id="authorName"
                            placeholder="Enter your name"
                            value={formData.authorName}
                            onChange={e => setFormData({ ...formData, authorName: e.target.value })}
                            required
                            className="rounded-lg border-2 border-purple-500/30 bg-slate-800/50 px-4 py-3 text-white placeholder:text-gray-400 focus:border-purple-400"
                        />
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="type" className="block text-sm font-semibold text-gray-200">
                            Feedback Type *
                        </label>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {typeOptions.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: option.value as FeedbackType })}
                                    className={`rounded-xl border-2 p-4 text-sm font-medium transition-all duration-200 ${
                                        formData.type === option.value
                                            ? `${option.color} scale-105 transform border-transparent text-white shadow-lg`
                                            : "border-purple-500/30 bg-slate-800/50 text-gray-300 hover:border-purple-400/50 hover:bg-slate-700/50"
                                    }`}>
                                    <div className="mb-1 text-lg">{option.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-200">
                            Title *
                        </label>
                        <Input
                            id="title"
                            placeholder="Brief, descriptive title"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                            className="rounded-lg border-2 border-purple-500/30 bg-slate-800/50 px-4 py-3 text-white placeholder:text-gray-400 focus:border-purple-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-200">
                            Description *
                        </label>
                        <Textarea
                            id="description"
                            placeholder="Provide detailed information about your request or issue..."
                            rows={5}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                            className="resize-none rounded-lg border-2 border-purple-500/30 bg-slate-800/50 px-4 py-3 text-white placeholder:text-gray-400 focus:border-purple-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="tags" className="block text-sm font-semibold text-gray-200">
                            Tags (optional)
                        </label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="tags"
                                placeholder="ui, performance, beginner (comma-separated)"
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                className="rounded-lg border-2 border-purple-500/30 bg-slate-800/50 py-3 pl-10 text-white placeholder:text-gray-400 focus:border-purple-400"
                            />
                        </div>
                        <p className="text-xs text-gray-400">Add relevant tags to help categorize your feedback</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isLoading}
                            className="border-purple-500/30 px-6 py-2 text-gray-300 hover:bg-slate-800/50 hover:text-white">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 hover:from-purple-700 hover:to-blue-700">
                            {isLoading ? "Submitting..." : "Submit Feedback"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
