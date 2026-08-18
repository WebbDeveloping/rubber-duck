# Rubber Duck Store

Warehouse + store API for rubber ducks. NestJS backend, Vite React frontend, MySQL + Prisma.

## Local run

```bash
docker compose up -d
cd backend && cp .env.example .env && npx prisma generate && npx prisma migrate deploy && npm run start:dev
cd frontend && cp .env.example .env && npm run dev
```

- API: http://localhost:3000/health
- Storefront: http://localhost:5173
- Warehouse admin: http://localhost:5173/admin/inventory

## Hosting

One GitHub repo. **Netlify** serves `frontend/`. **Railway** runs `backend/` plus MySQL.
