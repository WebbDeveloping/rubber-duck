# 03 — Project setup

Do this first. Goal: empty apps that boot and talk to MySQL.

## Suggested repo layout

```text
rubber-duck-store/
  doc/                 ← these files
  backend/             ← NestJS (or Express)
  frontend/            ← React + Vite
  README.md            ← short pointer to doc/00-overview.md
```

## Backend checklist

1. Scaffold NestJS app in `backend/`.
2. Add Prisma + MySQL connection (`DATABASE_URL`).
3. Create schema from [02-data-model.md](./02-data-model.md); run migrate / push.
4. Generate Prisma client.
5. Add global validation (`class-validator` / pipes).
6. Enable CORS for the frontend origin.
7. Health route e.g. `GET /health` → `{ "ok": true }`.

## Frontend checklist

1. Scaffold Vite React (TypeScript) in `frontend/`.
2. Set API base URL via env (`VITE_API_URL=http://localhost:3000`).
3. Add a simple router if needed (`/ducks`, `/ducks/new`, `/ducks/:id/edit`).
4. Shared fetch/axios client with JSON headers.

## Env examples

```bash
# backend/.env
DATABASE_URL="mysql://user:pass@localhost:3306/rubber_duck_store"
PORT=3000

# frontend/.env
VITE_API_URL=http://localhost:3000
```

## Done when

- `backend` starts without errors
- Prisma can connect and migrate
- `frontend` loads a placeholder page
- Browser can call `GET /health` (CORS OK)

Next: [04-warehouse-backend.md](./04-warehouse-backend.md)
