# Admin

Admin dashboard for Bharat Knowledge — manage people profiles, sources, and claims.

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running (used by the server)
- Server running on port 3001

### Setup

```bash
# From the monorepo root
npm install

# Create your env file
cp admin/.env.example admin/.env.local

# Run the server (in a separate terminal)
cd server && npm run dev

# Run the admin
cd admin && npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001/api/v1` |

## Tech Stack

- Next.js 15 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui (radix-nova)
- Lucide React

## Features

### People Management

- **Dashboard** — overview with counts by status
- **People list** — table with search, status filter, and pagination
- **Add Person** — create form with validation and auto-slug
- **Edit Person** — update form pre-filled with existing data
- **Delete Person** — confirmation dialog before deletion
- **Error handling** — API errors, network errors, duplicate slug detection
- **Loading states** — spinners and skeleton indicators

### API Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/v1/people` | List people (paginated, searchable, filterable) |
| `GET` | `/api/v1/people/:slug` | Get person by slug |
| `POST` | `/api/v1/people` | Create a new person |
| `PATCH` | `/api/v1/people/:id` | Update a person |
| `DELETE` | `/api/v1/people/:id` | Delete a person |

## Project Structure

```
admin/src/
├── app/
│   ├── layout.tsx              # Root layout with sidebar
│   ├── page.tsx                # Dashboard
│   ├── globals.css             # Tailwind + theme variables
│   └── people/
│       ├── page.tsx            # People list
│       ├── new/
│       │   └── page.tsx        # Create person
│       └── [slug]/
│           └── edit/
│               └── page.tsx    # Edit person
├── components/
│   ├── layout/
│   │   └── sidebar.tsx         # Admin sidebar navigation
│   ├── people/
│   │   ├── delete-dialog.tsx   # Delete confirmation dialog
│   │   ├── pagination.tsx      # Page navigation
│   │   ├── people-table.tsx    # People data table
│   │   └── status-badge.tsx    # Status indicator badge
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── api/
│   │   ├── client.ts           # Centralized API client
│   │   └── people.ts           # People API functions
│   └── utils.ts                # cn() utility
└── types/
    └── people.ts               # TypeScript types
```
