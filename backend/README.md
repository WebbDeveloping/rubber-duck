# Backend

NestJS API + Prisma + MySQL.

```bash
cp .env.example .env
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

`GET /health` → `{ "ok": true }`

`POST /orders` quotes packaging and price (does not persist):

```json
{
  "color": "Red",
  "size": "Large",
  "quantity": 150,
  "destinationCountry": "USA",
  "shippingMode": "Air"
}
```
