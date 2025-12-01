# Team Task Manager

Collaborative task management application with user authentication, task CRUD, and a modern UI.

**Stack**
- Backend: NestJS 10, MongoDB (Mongoose)
- Frontend: Next.js 16 (App Router), Tailwind CSS
- Orchestration: Docker Compose

## Project Structure

```
team-task-manager/
├── backend/            # NestJS API
│   ├── src/
│   │   ├── auth/       # auth controller/service
│   │   ├── users/      # user controller/service
│   │   ├── tasks/      # task controller/service
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env            # backend environment (see below)
├── frontend/           # Next.js app
│   ├── app/            # routes and layout
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── tasks/page.tsx
│   ├── components/     # UI components
│   ├── context/AuthContext.tsx
│   ├── lib/api.ts
│   └── .env            # frontend environment (see below)
└── docker-compose.yml  # optional
```

## Prerequisites

- Node.js ≥ 20
- Package managers: `pnpm` for backend, `npm` for frontend
- Docker (optional for containerized run)

## Environment

Backend `.env` (example):

```
PORT=4000
MONGO_URI=mongodb://mongo:27017/team_task_manager
JWT_SECRET=replace_me
FRONTEND_ORIGIN=http://localhost:4001
```

Frontend `.env`:

```
PORT=4001
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Run with Docker

- Build and start services:

```
docker compose up -d --build
```

- URLs
  - Frontend: `http://localhost:4001`
  - Backend: `http://localhost:4000`
  - MongoDB: internal service `mongo:27017`

## Run locally (without Docker)

- Backend:

```
cd backend
pnpm install
pnpm start:dev
```

- Frontend:

```
cd frontend
npm install
npm run dev
```

## Authentication and Access

- Unauthenticated users see `Login` and cannot access `Tasks`.
- Authenticated users see `Tasks` and can `Logout`.
- Registration is available but redirects to `Tasks` after success.

## API Overview

- `POST /auth/register` — create account
- `POST /auth/login` — obtain JWT
- `GET /tasks` — list tasks (auth)
- `POST /tasks` — create task (auth)
- `GET /tasks/:id` — read task (auth)
- `PUT /tasks/:id` — update task (auth)
- `DELETE /tasks/:id` — delete task (auth)

## CORS

- Backend allows cross-origin requests from the frontend and supports preflight.
- Adjust `FRONTEND_ORIGIN` to match your deployment origin.

## Theming

- Theme tokens defined in `frontend/app/globals.css` using CSS variables.
- Update brand colors via:
  - `--brand-primary`, `--brand-secondary`, `--brand-danger`
  - `--surface`, `--surface-muted`, `--border`, `--foreground`

## Scripts

- Backend
  - `pnpm start` — start
  - `pnpm start:dev` — watch mode
  - `pnpm build` — build
  - `pnpm lint` — lint

- Frontend
  - `npm run dev` — dev server on `4001`
  - `npm run build` — build
  - `npm run start` — start on `4001`
