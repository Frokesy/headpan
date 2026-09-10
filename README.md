# Headpan

Headpan is an npm-workspaces monorepo containing the Next.js marketplace and a Fastify/PostgreSQL API.

## Workspace layout

```text
app/                 Next.js web application
apps/api/            Fastify API and SQL migrations
packages/contracts/  Types shared by the web app and API
compose.yaml          Local PostgreSQL service
```

The web app intentionally remains at the repository root, so existing routes, imports, and deployment settings continue to work while the backend lives in its own workspace.

## Local setup

```bash
npm install
cp apps/api/.env.example apps/api/.env
docker compose up -d postgres
npm run db:migrate
```

Run the applications in separate terminals:

```bash
npm run dev:web
npm run dev:api
```

- Web: http://localhost:3000
- API health: http://localhost:4008/api/v1/health

Use `npm run typecheck` to check the web app, API, and shared contracts. Use `npm run build` and `npm run build:api` for production builds.

The planned backend work is tracked in [BACKEND_CHECKLIST.md](./BACKEND_CHECKLIST.md).
