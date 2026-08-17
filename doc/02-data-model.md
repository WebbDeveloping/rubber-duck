# 02 — Data model

Implement this before any API routes.

## Duck entity

| Attribute | Type | Notes |
|-----------|------|--------|
| `id` | Integer | Primary key, auto-increment |
| `color` | String / enum | `Red`, `Green`, `Yellow`, `Black` |
| `size` | String / enum | `XLarge`, `Large`, `Medium`, `Small`, `XSmall` |
| `price` | Double / Decimal | Unit price |
| `quantity` | Integer | Stock on hand |
| `deleted` | Boolean | Soft delete; default `false` |

Optional but useful: `createdAt`, `updatedAt`.

## Enums

```text
Color:  Red | Green | Yellow | Black
Size:   XLarge | Large | Medium | Small | XSmall
```

Validate on create/update (reject other strings).

## Soft delete

- Delete endpoint sets `deleted = true` (never hard-delete).
- All list/read-for-sale queries use `WHERE deleted = false`.
- Soft-deleted rows stay in the DB for history.

## Add-duck merge rule

When creating:

1. Look for an existing row with the **same** `color`, `size`, and `price`, and `deleted = false`.
2. If found → `quantity = quantity + incomingQuantity` (update, do not insert).
3. If not found → insert a new row.

## Prisma sketch (MySQL)

```prisma
enum DuckColor {
  Red
  Green
  Yellow
  Black
}

enum DuckSize {
  XLarge
  Large
  Medium
  Small
  XSmall
}

model Duck {
  id        Int       @id @default(autoincrement())
  color     DuckColor
  size      DuckSize
  price     Decimal   @db.Decimal(10, 2)
  quantity  Int
  deleted   Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([deleted, quantity])
  @@index([color, size, price, deleted])
}
```

## Store order (no persistent Order table required)

The brief does not require saving orders. Request in → compute packaging + price → JSON out is enough for v1. Add an `Order` table later only if you need audit history.
