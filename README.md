# Rubber Duck Store

Warehouse + store API for rubber ducks. NestJS backend, Vite React frontend, MySQL + Prisma.

See **[doc/00-overview.md](./doc/00-overview.md)** for modules and the build order.

## Local run

```bash
docker compose up -d
cd backend && cp .env.example .env && npx prisma generate && npx prisma migrate dev && npm run start:dev
cd frontend && cp .env.example .env && npm run dev
```

- API: http://localhost:3000/health
- UI: http://localhost:5173

## Hosting

One GitHub repo. **Netlify** serves `frontend/`. **Railway** runs `backend/` plus MySQL.
