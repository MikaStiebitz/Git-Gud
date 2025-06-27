export type FeedbackType = "feature" | "bug" | "level";

export type FeedbackStatus = "open" | "in-progress" | "closed" | "rejected";

export interface Feedback {
    id: string;
    title: string;
    description: string;
    type: FeedbackType;
    status: FeedbackStatus;
    authorName: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    upvotes: number;
    upvotedBy: string[]; // Array of IP addresses or session IDs
    tags: string[];
    adminComments: AdminComment[];
}

export interface AdminComment {
    id: string;
    content: string;
    authorName: string;
    createdAt: Date | string;
    isAdmin: boolean;
}

export interface CreateFeedbackData {
    title: string;
    description: string;
    type: FeedbackType;
    authorName: string;
    tags?: string[];
}

export interface UpdateFeedbackData {
    status?: FeedbackStatus;
    tags?: string[];
    adminComment?: {
        content: string;
        authorName: string;
    };
}
