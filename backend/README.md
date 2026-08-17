# Backend

NestJS API + Prisma + MySQL.

```bash
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

`GET /health` → `{ "ok": true }`
