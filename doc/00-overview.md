# Rubber Duck Store — Project Overview

Online shop that sells rubber ducks. Build order is numbered so you can implement phase by phase.

## Stack (recommended)

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | React (Vite) | Matches the brief; fast local DX |
| Backend | NestJS | Fits modules, DI, and the design-pattern work in Store |
| Database | MySQL + Prisma | Integer IDs, soft-delete, clear relational model |

Alternatives allowed by the brief: Express instead of NestJS; MongoDB instead of MySQL. Stick to one stack for the whole project.

## Modules

1. **Warehouse** — CRUD for ducks (backend + frontend)
2. **Store** — order endpoint only (backend): packaging + pricing rules

## Doc reading order

| Order | File | Purpose |
|-------|------|---------|
| 1 | [01-decisions.md](./01-decisions.md) | Stack picks, open questions, assumptions |
| 2 | [02-data-model.md](./02-data-model.md) | Duck entity, enums, soft delete |
| 3 | [03-setup.md](./03-setup.md) | Repo layout, tooling, first run |
| 4 | [04-warehouse-backend.md](./04-warehouse-backend.md) | Duck API |
| 5 | [05-warehouse-frontend.md](./05-warehouse-frontend.md) | List / add / edit / delete UI |
| 6 | [06-store-packaging.md](./06-store-packaging.md) | Packaging & protection rules + patterns |
| 7 | [07-store-pricing.md](./07-store-pricing.md) | Total-to-pay rules + patterns |
| 8 | [08-store-api.md](./08-store-api.md) | Order REST contract & response shape |
| 9 | [09-acceptance-checklist.md](./09-acceptance-checklist.md) | Done-when checks |

## Suggested implementation sequence

```
Setup → Data model → Warehouse API → Warehouse UI → Store packaging → Store pricing → Store order API → Checklist
```

Do not start Store until Warehouse can create ducks with a price and quantity — orders need that inventory data.
