# Feedback Board Feature

## Overview

The GitGud Feedback Board is a comprehensive feature that allows users to submit feature requests, bug reports, and level suggestions without requiring user registration. It includes an admin panel for managing submissions.

## Features

### User Features

- **Submit Feedback**: Users can create feature requests, bug reports, or level suggestions
- **Upvoting System**: Users can upvote existing feedback items
- **Search & Filter**: Search by title/description and filter by type and status
- **Real-time Updates**: See latest submissions and their status
- **No Registration Required**: Users only need to provide their name

### Admin Features

- **Status Management**: Change feedback status (Open, In Progress, Closed, Rejected)
- **Comment System**: Add admin comments to provide updates
- **Delete Items**: Remove inappropriate or duplicate submissions
- **Simple Authentication**: Basic admin key system (admin123)

## File Structure

```
src/
├── app/
│   ├── feedback/
│   │   ├── page.tsx           # Main feedback board page
│   │   └── layout.tsx         # Feedback page layout
│   └── api/
│       └── feedback/
│           ├── route.ts       # Main API endpoints (GET, POST)
│           └── [id]/
│               ├── route.ts   # Update/Delete feedback (PATCH, DELETE)
│               └── upvote/
│                   └── route.ts # Upvote toggle (POST)
├── components/
│   └── feedback/
│       ├── CreateFeedbackDialog.tsx  # Form for creating feedback
│       ├── FeedbackCard.tsx          # Individual feedback item display
│       └── FeedbackFilters.tsx       # Search and filter controls
├── types/
│   └── feedback.ts            # TypeScript type definitions
└── lib/
    └── feedback-service.ts    # Backend service (in-memory storage)
```

## API Endpoints

### GET /api/feedback

Fetch all feedback items with optional filtering:

- `?type=feature|bug|level` - Filter by type
- `?status=open|in-progress|closed|rejected` - Filter by status

### POST /api/feedback

Create new feedback item:

```json
{
    "title": "string",
    "description": "string",
    "type": "feature|bug|level",
    "authorName": "string",
    "tags": ["string"]
}
```

### POST /api/feedback/[id]/upvote

Toggle upvote for a feedback item (uses IP tracking)

### PATCH /api/feedback/[id]

Update feedback (admin only):

```json
{
    "status": "open|in-progress|closed|rejected",
    "adminComment": {
        "content": "string",
        "authorName": "string"
    }
}
```

### DELETE /api/feedback/[id]

Delete feedback item (admin only)

## Data Storage

Currently uses in-memory storage for demonstration. In production, replace `FeedbackService` with a proper database implementation (PostgreSQL, MongoDB, etc.).

## Admin Access

Default admin key: `admin123`

In production, implement proper authentication with:

- JWT tokens
- Role-based access control
- Secure admin routes
- User management

## UI Components

### Badge System

- Feature requests: Blue badge with ✨ icon
- Bug reports: Red badge with 🐛 icon
- Level requests: Green badge with 🎯 icon

### Status Indicators

- Open: Orange badge with warning icon
- In Progress: Yellow badge with clock icon
- Closed: Green badge with check icon
- Rejected: Red badge with X icon

### Responsive Design

- Mobile-friendly interface
- Touch-optimized interactions
- Collapsible admin menu
- Adaptive card layouts

## Usage

1. **Navigation**: Click "Feedback" in the main navigation
2. **Submit Feedback**: Click "Submit Feedback" button
3. **Browse**: Use filters and search to find relevant items
4. **Upvote**: Click the upvote button on items you support
5. **Admin**: Click "Admin" button and enter admin key for management features

## Future Enhancements

- User authentication system
- DB save
- Email notifications for status changes
- Rich text editing for descriptions
- File attachments for bug reports
- API rate limiting
- Spam detection
- Export functionality
- Analytics dashboard
