# Bharat Knowledge

A full-stack application with client, admin, and server workspaces.

## Project Structure

```
bharat-knowledge/
├── client/          # Next.js frontend application
├── server/          # NestJS backend API
├── admin/           # Next.js admin dashboard
├── docs/            # Documentation
└── package.json     # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v8+)
- MongoDB

### Installation

```bash
npm install
```

### Development

Run each workspace in development mode:

```bash
# Client (port 3000)
npm run dev:client

# Server (port 3001)
npm run dev:server

# Admin (port 3002)
npm run dev:admin
```

### Environment Variables

Each workspace has its own `.env.example` file. Copy it to `.env` and fill in the required values:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
cp admin/.env.example admin/.env
```

## Tech Stack

- **Client & Admin:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Server:** NestJS, TypeScript, Mongoose, @nestjs/config
