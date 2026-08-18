# Rubber Duck Store

A full-stack shop for rubber ducks: a public storefront, a warehouse admin, and a NestJS API that quotes packaging and price from live inventory.

Built as a portfolio project to show a clean split between catalog management and checkout logic, with tests around the pricing and packaging rules.

## What it does

**Storefront** (`/`)
- Home, shop, product, about, and contact pages
- Browse ducks by color and size
- Place an order quote (packaging + itemized total)

**Warehouse admin** (`/admin`)
- Inventory dashboard
- Create, edit, and delete ducks
- Review order quotes against stock

**API**
- CRUD for ducks, with soft delete and stock checks
- `POST /orders` returns package type, protections, and a price breakdown (quotes are not persisted)

## Architecture

Two Nest modules share one MySQL database:

```text
frontend (React + Vite)
  storefront  →  GET /ducks, POST /orders
  admin       →  GET/POST/PATCH/DELETE /ducks

backend (NestJS)
  warehouse   inventory
  store       packaging + pricing
  prisma      MySQL
```

Checkout logic uses two patterns so the rules stay easy to change:

- **Strategy** — duck size maps to wood / cardboard / plastic; shipping mode (land, air, sea) adds protections
- **Chain of responsibility** — price is built in steps: base cost → bulk discount → package adjustment → country fee → shipping

Each step appends a line to `details`, so the UI can show how the total was calculated.

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router |
| Backend | NestJS, class-validator, Prisma |
| Database | MySQL 8 |
| Tests | Jest (services for ducks, orders, packaging, pricing) |
| Hosting | Netlify (`frontend/`), Railway (`backend/` + MySQL) |

## Run locally

Needs Node.js 20+ and Docker.

```bash
docker compose up -d
```

**API**

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

**UI** (new terminal)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

| App | URL |
| --- | --- |
| Storefront | http://localhost:5173 |
| Warehouse | http://localhost:5173/admin |
| Health check | http://localhost:3000/health |

Default env is already set for local MySQL (`duck` / `duck`) and `VITE_API_URL=http://localhost:3000`.

## API at a glance

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | `{ "ok": true }` |
| `GET` | `/ducks` | Active inventory |
| `POST` | `/ducks` | Add stock (merges matching color, size, and price) |
| `PATCH` | `/ducks/:id` | Update a duck |
| `DELETE` | `/ducks/:id` | Soft delete |
| `POST` | `/orders` | Quote packaging and price |

Example order body:

```json
{
  "color": "Red",
  "size": "Large",
  "quantity": 150,
  "destinationCountry": "USA",
  "shippingMode": "Air"
}
```

Example response:

```json
{
  "packageType": "Wood",
  "protections": ["Polystyrene balls"],
  "totalToPay": 5986.8,
  "details": [
    { "code": "BASE", "description": "quantity × price", "amount": 1500 },
    { "code": "BULK_DISCOUNT", "description": "20% off (quantity > 100)", "amount": -300 },
    { "code": "PACKAGE_WOOD", "description": "Wood package +5%", "amount": 60 },
    { "code": "COUNTRY_USA", "description": "USA +18%", "amount": 226.8 },
    { "code": "SHIPPING_AIR", "description": "Air shipping $30 × quantity", "amount": 4500 }
  ]
}
```

## Tests

```bash
cd backend && npm test
```

Covers inventory rules, packaging strategies, and the pricing chain.

## Deploy

One repo, two services:

1. **Railway** — root directory `backend`, MySQL plugin, start with `npx prisma migrate deploy && npm run start:prod`
2. **Netlify** — already configured in `netlify.toml` to build `frontend/`

Set `VITE_API_URL` on Netlify to the Railway API URL, and `FRONTEND_ORIGIN` on Railway to the Netlify site URL.
