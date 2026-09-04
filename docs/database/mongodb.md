# MongoDB Atlas Setup & Database Foundation

This guide explains how to configure **MongoDB Atlas** for the Bharat Knowledge
`server` application and verify the connection end-to-end.

> **Security note:** Never commit real credentials. Only
> `server/.env.example` (with placeholders) is committed. The real
> `server/.env` is ignored by Git.

---

## 1. Prerequisites

- A MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- Node.js + npm (already required by this monorepo)

---

## 2. Create a MongoDB Atlas account

1. Go to <https://www.mongodb.com/cloud/atlas> and sign up (free tier is fine).
2. Confirm your email address.

---

## 3. Create a development cluster

1. In the Atlas UI, click **Build a Database** / **Create**.
2. Choose **M0 (Shared)** — the free tier.
3. Pick a cloud provider and region close to you (e.g. AWS `ap-south-1`).
4. Name the cluster (e.g. `bharat-knowledge-cluster`) and click **Create**.

---

## 4. Create a database user

1. Under **Security → Database Access → Add New Database User**.
2. Use a **dedicated user** only for this app (e.g. `bk_dev`).
3. **Authentication Method:** Password.
4. Use a **strong password** (store it securely — you will not see it again).
5. Grant the **minimum required permission** (e.g. `Read and write to any
   database`, or a custom role limited to `bharat_knowledge`).

---

## 5. Configure Network Access

1. Under **Security → Network Access → Add IP Address**.
2. For local development, add your current IP address.
3. For testing from anywhere (not recommended for production), you may allow
   `0.0.0.0/0`, but prefer restricting to your IP during development and
   tightening this for any later deployment.

---

## 6. Get the MongoDB connection string

1. In Atlas, click **Connect → Drivers**.
2. Select the **Node.js** driver (version 4.1 or later).
3. Copy the connection string, for example:

   ```text
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```

4. Replace the database part so the database is `bharat_knowledge`:

   ```text
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bharat_knowledge
   ```

---

## 7. Where to place `MONGODB_URI`

1. Copy the placeholder file:

   ```bash
   cp server/.env.example server/.env
   ```

   (On Windows PowerShell: `Copy-Item server/.env.example server/.env`)

2. Edit `server/.env` and set your real values:

   ```env
   PORT=3001
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bharat_knowledge
   ```

3. The database `bharat_knowledge` does **not** need to be created manually —
   MongoDB Atlas creates it automatically when data is first written.

> The app reads both `PORT` and `MONGODB_URI` from the environment. If
> `MONGODB_URI` is missing, the server fails with a clear error and does **not**
> start with a silent undefined connection.

---

## 8. Start the server

From the monorepo root:

```bash
npm run dev:server
```

Or from the `server` directory:

```bash
npm run start:dev
```

On a successful connection you should see:

```text
MongoDB connected successfully
NestJS application started on http://localhost:3001/api/v1
```

The full connection string (including username/password) is **never** logged.

---

## 9. Verify the connection

Hit the health endpoint:

```bash
curl http://localhost:3001/api/v1/health
```

Expected JSON when connected:

```json
{
  "success": true,
  "service": "bharat-knowledge-api",
  "database": "connected"
}
```

If the database is unavailable, the response reports:

```json
{
  "success": false,
  "service": "bharat-knowledge-api",
  "database": "disconnected"
}
```

---

## 10. Basic security rules

- Use a **dedicated database user** with the **least privilege** needed.
- Use a **strong, unique password**.
- **Never commit** `.env` or any real credentials.
- Keep `.env` ignored by Git (already configured in `server/.gitignore`).
- Restrict **Network Access** to your IP during development.
- **Never expose MongoDB directly to the client/admin**. All database access
  flows through the NestJS API only:

  ```text
  Client ──► NestJS API ──► MongoDB Atlas
  Admin  ──► NestJS API ──► MongoDB Atlas
  ```
