# team-task-manager

Full-Stack Assessment Task

team-task-manager/
├── backend/ # NestJS API
│ ├── src/
│ │ ├── auth/
│ │ ├── users/
│ │ ├── tasks/
│ │ ├── common/
│ │ ├── app.module.ts
│ │ └── main.ts
│ ├── package.json
│ ├── tsconfig.json
│ ├── .env
│ └── ...
├── frontend/ # Next.js App Router
│ ├── app/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── login/
│ │ │ └── page.tsx
│ │ ├── register/
│ │ │ └── page.tsx
│ │ └── tasks/
│ │ └── page.tsx
│ ├── lib/
│ │ └── api.ts
│ ├── context/
│ │ └── AuthContext.tsx
│ ├── package.json
│ └── ...
└── docker-compose.yml # optional
