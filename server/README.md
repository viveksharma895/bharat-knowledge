# Server

This is the NestJS backend API for Bharat Knowledge.

## Getting Started

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start:prod
```

## Tech Stack

- NestJS 10
- TypeScript
- Mongoose
- @nestjs/config

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - Secret for JWT authentication
