import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { FeedbackService } from "~/lib/feedback-service";
import type { UpdateFeedbackData } from "~/types/feedback";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = (await request.json()) as UpdateFeedbackData;

        // Simple admin check - in a real app you'd check authentication
        const isAdmin =
            request.headers.get("x-admin-key") === "admin123" ||
            request.headers.get("authorization")?.includes("admin");

        if (!isAdmin) {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }

        const feedback = FeedbackService.updateFeedback(id, body);

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
        console.error("Error updating feedback:", error);
        return NextResponse.json({ error: "Failed to update feedback" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        // Simple admin check - in a real app you'd check authentication
        const isAdmin =
            request.headers.get("x-admin-key") === "admin123" ||
            request.headers.get("authorization")?.includes("admin");

        if (!isAdmin) {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }

        const success = FeedbackService.deleteFeedback(id);

        if (!success) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 });
    }
}
