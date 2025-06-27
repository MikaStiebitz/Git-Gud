import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { FeedbackService } from "~/lib/feedback-service";
import type { CreateFeedbackData } from "~/types/feedback";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const status = searchParams.get("status");

        let feedback;
        if (type && type !== "all") {
            feedback = FeedbackService.getFeedbackByType(type);
        } else if (status && status !== "all") {
            feedback = FeedbackService.getFeedbackByStatus(status as "open" | "in-progress" | "closed" | "rejected");
        } else {
            feedback = FeedbackService.getAllFeedback();
        }

        // Ensure dates are properly serialized
        const serializedFeedback = feedback.map(item => ({
            ...item,
            createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
            updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
            adminComments: item.adminComments.map(comment => ({
                ...comment,
                createdAt: comment.createdAt instanceof Date ? comment.createdAt.toISOString() : comment.createdAt,
            })),
        }));

        return NextResponse.json({ feedback: serializedFeedback });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as CreateFeedbackData;
        const userIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

        // Basic validation
        if (!body.title?.trim() || !body.description?.trim() || !body.authorName?.trim()) {
            return NextResponse.json({ error: "Title, description, and author name are required" }, { status: 400 });
        }

        if (!["feature", "bug", "level"].includes(body.type)) {
            return NextResponse.json({ error: "Invalid feedback type" }, { status: 400 });
        }

        const feedback = FeedbackService.createFeedback(body, userIp);

        // Serialize dates for JSON response
        const serializedFeedback = {
            ...feedback,
            createdAt: feedback.createdAt instanceof Date ? feedback.createdAt.toISOString() : feedback.createdAt,
            updatedAt: feedback.updatedAt instanceof Date ? feedback.updatedAt.toISOString() : feedback.updatedAt,
            adminComments: feedback.adminComments.map(comment => ({
                ...comment,
                createdAt: comment.createdAt instanceof Date ? comment.createdAt.toISOString() : comment.createdAt,
            })),
        };

        return NextResponse.json({ feedback: serializedFeedback }, { status: 201 });
    } catch (error) {
        console.error("Error creating feedback:", error);
        return NextResponse.json({ error: "Failed to create feedback" }, { status: 500 });
    }
}
