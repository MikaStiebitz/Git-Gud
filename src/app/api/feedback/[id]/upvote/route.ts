import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { FeedbackService } from "~/lib/feedback-service";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const userIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

        const feedback = FeedbackService.toggleUpvote(id, userIp);

        if (!feedback) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
        }

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

        return NextResponse.json({ feedback: serializedFeedback });
    } catch (error) {
        console.error("Error toggling upvote:", error);
        return NextResponse.json({ error: "Failed to toggle upvote" }, { status: 500 });
    }
}
