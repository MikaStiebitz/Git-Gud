import type { Feedback, CreateFeedbackData, UpdateFeedbackData, FeedbackStatus } from "~/types/feedback";

// In-memory storage (in a real app, this would be a database)
const feedbackStore: Feedback[] = [
    {
        id: "1",
        title: "Add dark mode support",
        description:
            "It would be great to have a dark theme option for better experience during night coding sessions.",
        type: "feature",
        status: "in-progress",
        authorName: "DevUser123",
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:20:00Z"),
        upvotes: 15,
        upvotedBy: ["ip1", "ip2", "ip3"],
        tags: ["ui", "accessibility"],
        adminComments: [
            {
                id: "c1",
                content: "Great suggestion! We're currently working on this feature.",
                authorName: "Admin",
                createdAt: new Date("2024-01-16T09:00:00Z"),
                isAdmin: true,
            },
        ],
    },
    {
        id: "2",
        title: "Terminal input lag on large repositories",
        description: "When working with repositories that have many files, the terminal becomes slow and unresponsive.",
        type: "bug",
        status: "open",
        authorName: "GitMaster",
        createdAt: new Date("2024-01-18T16:45:00Z"),
        updatedAt: new Date("2024-01-18T16:45:00Z"),
        upvotes: 8,
        upvotedBy: ["ip4", "ip5"],
        tags: ["performance", "terminal"],
        adminComments: [],
    },
    {
        id: "3",
        title: "Advanced merge conflict resolution level",
        description: "Add a challenging level that teaches how to resolve complex merge conflicts with multiple files.",
        type: "level",
        status: "open",
        authorName: "LearningEnthusiast",
        createdAt: new Date("2024-01-20T11:20:00Z"),
        updatedAt: new Date("2024-01-20T11:20:00Z"),
        upvotes: 12,
        upvotedBy: ["ip6", "ip7", "ip8"],
        tags: ["advanced", "merge"],
        adminComments: [],
    },
];

let nextId = 4;

export class FeedbackService {
    static getAllFeedback(): Feedback[] {
        return feedbackStore.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    static getFeedbackById(id: string): Feedback | undefined {
        return feedbackStore.find(f => f.id === id);
    }

    static createFeedback(data: CreateFeedbackData, _userIp: string): Feedback {
        const now = new Date();
        const feedback: Feedback = {
            id: (nextId++).toString(),
            title: data.title,
            description: data.description,
            type: data.type,
            status: "open",
            authorName: data.authorName,
            createdAt: now,
            updatedAt: now,
            upvotes: 0,
            upvotedBy: [],
            tags: data.tags || [],
            adminComments: [],
        };

        feedbackStore.push(feedback);
        return feedback;
    }

    static updateFeedback(id: string, data: UpdateFeedbackData): Feedback | null {
        const feedback = feedbackStore.find(f => f.id === id);
        if (!feedback) return null;

        if (data.status) {
            feedback.status = data.status;
        }

        if (data.tags) {
            feedback.tags = data.tags;
        }

        if (data.adminComment) {
            const comment = {
                id: `c${Date.now()}`,
                content: data.adminComment.content,
                authorName: data.adminComment.authorName,
                createdAt: new Date(),
                isAdmin: true,
            };
            feedback.adminComments.push(comment);
        }

        feedback.updatedAt = new Date();
        return feedback;
    }

    static deleteFeedback(id: string): boolean {
        const index = feedbackStore.findIndex(f => f.id === id);
        if (index === -1) return false;

        feedbackStore.splice(index, 1);
        return true;
    }

    static toggleUpvote(id: string, userIp: string): Feedback | null {
        const feedback = feedbackStore.find(f => f.id === id);
        if (!feedback) return null;

        const hasUpvoted = feedback.upvotedBy.includes(userIp);

        if (hasUpvoted) {
            feedback.upvotedBy = feedback.upvotedBy.filter(ip => ip !== userIp);
            feedback.upvotes = Math.max(0, feedback.upvotes - 1);
        } else {
            feedback.upvotedBy.push(userIp);
            feedback.upvotes += 1;
        }

        feedback.updatedAt = new Date();
        return feedback;
    }

    static getFeedbackByType(type: string): Feedback[] {
        if (type === "all") return this.getAllFeedback();
        return feedbackStore.filter(f => f.type === type).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    static getFeedbackByStatus(status: FeedbackStatus): Feedback[] {
        return feedbackStore
            .filter(f => f.status === status)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
}
