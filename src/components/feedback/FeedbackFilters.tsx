"use client";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Search, Filter, X } from "lucide-react";

interface FeedbackFiltersProps {
    searchQuery: string;
    selectedType: string;
    selectedStatus: string;
    onSearchChange: (query: string) => void;
    onTypeChange: (type: string) => void;
    onStatusChange: (status: string) => void;
    totalCount: number;
}

const typeOptions = [
    { value: "all", label: "All Types", icon: "🔍" },
    { value: "feature", label: "Features", icon: "✨" },
    { value: "bug", label: "Bugs", icon: "🐛" },
    { value: "level", label: "Levels", icon: "🎯" },
];

const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "open", label: "Open" },
    { value: "in-progress", label: "In Progress" },
    { value: "closed", label: "Closed" },
    { value: "rejected", label: "Rejected" },
];

export function FeedbackFilters({
    searchQuery,
    selectedType,
    selectedStatus,
    onSearchChange,
    onTypeChange,
    onStatusChange,
    totalCount,
}: FeedbackFiltersProps) {
    const activeFiltersCount = [selectedType !== "all", selectedStatus !== "all", searchQuery.length > 0].filter(
        Boolean,
    ).length;

    const clearAllFilters = () => {
        onSearchChange("");
        onTypeChange("all");
        onStatusChange("all");
    };

    return (
        <div className="space-y-6 rounded-xl border border-purple-500/30 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <Input
                    placeholder="Search feedback by title, description, tags, or author..."
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    className="rounded-lg border-2 border-purple-500/30 bg-slate-700/50 py-3 pl-12 pr-12 text-base text-white placeholder:text-gray-400 focus:border-purple-400"
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full p-1 text-gray-400 hover:bg-slate-600/50 hover:text-gray-200">
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-purple-400" />
                    <span className="text-sm font-bold text-gray-200">Filter by Type:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {typeOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => onTypeChange(option.value)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                selectedType === option.value
                                    ? "scale-105 transform bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                                    : "border border-purple-500/20 bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:shadow-md"
                            }`}>
                            <span className="text-base">{option.icon}</span>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-200">Filter by Status:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {statusOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => onStatusChange(option.value)}
                            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                selectedStatus === option.value
                                    ? "scale-105 transform bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                                    : "border border-purple-500/20 bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:shadow-md"
                            }`}>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Summary and Clear Filters */}
            <div className="flex items-center justify-between border-t border-purple-500/30 pt-4">
                <div className="flex items-center gap-3">
                    <span className="text-base font-medium text-gray-200">
                        {totalCount} {totalCount === 1 ? "item" : "items"} found
                    </span>
                    {activeFiltersCount > 0 && (
                        <Badge
                            variant="secondary"
                            className="border border-purple-500/30 bg-purple-900/50 px-3 py-1 text-xs text-purple-300">
                            {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} active
                        </Badge>
                    )}
                </div>

                {activeFiltersCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="px-4 py-2 text-gray-300 hover:bg-slate-600/50 hover:text-white">
                        <X className="mr-2 h-4 w-4" />
                        Clear all filters
                    </Button>
                )}
            </div>
        </div>
    );
}
