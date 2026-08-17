# 04 — Warehouse module (backend)

Implement after setup and schema. Frontend depends on these endpoints.

## Responsibilities

Create, list, update, soft-delete ducks. Enforce color/size enums and merge-on-create.

## REST API (suggested)

| Method | Path | Behavior |
|--------|------|----------|
| `GET` | `/ducks` | List non-deleted ducks, sorted by `quantity` |
| `GET` | `/ducks/:id` | One duck if not deleted; else 404 |
| `POST` | `/ducks` | Add or merge quantities |
| `PATCH` | `/ducks/:id` | Edit **quantity** and/or **price** only |
| `DELETE` | `/ducks/:id` | Soft delete (`deleted = true`) |

Base path can be `/api/ducks` if you prefer a versioned prefix.

## Request / response shapes

### List item

```json
{
  "id": 1,
  "color": "Red",
  "size": "Large",
  "price": 12.5,
  "quantity": 40
}
```

Do not expose soft-deleted ducks in list.

### Create body

```json
{
  "color": "Yellow",
  "size": "Medium",
  "price": 9.99,
  "quantity": 10
}
```

(`price` included per [01-decisions.md](./01-decisions.md).)

### Update body

```json
{
  "price": 10.5,
  "quantity": 25
}
```

Reject attempts to change `color` or `size` (400).

## Business rules

1. **List:** `deleted = false`, order by `quantity` (document asc vs desc).
2. **Create:** merge if same `color` + `size` + `price` and not deleted; else insert.
3. **Delete:** set `deleted = true`; return 204 or the updated entity.
4. **Update:** only `price` and `quantity`; duck must exist and not be deleted.
5. Validate enums and `quantity >= 0`, `price > 0` (or `>= 0` if free samples allowed — prefer `> 0`).

## NestJS shape (optional)

```text
warehouse/
  ducks.controller.ts
  ducks.service.ts
  ducks.module.ts
  dto/create-duck.dto.ts
  dto/update-duck.dto.ts
```

## Done when

- All five operations work via HTTP client (Postman / curl)
- Merge-on-create verified with two POSTs of same color/size/price
- Soft-deleted duck disappears from `GET /ducks`
- Invalid color/size rejected

Next: [05-warehouse-frontend.md](./05-warehouse-frontend.md)
