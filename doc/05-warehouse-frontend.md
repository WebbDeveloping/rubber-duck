# 05 — Warehouse module (frontend)

Build after Warehouse API is stable. Store module has **no** frontend.

## Screens

1. **Duck list** — table of inventory
2. **Add duck** — create form
3. **Edit duck** — same form, color/size read-only

Match the provided design screenshots when available.

## List page

| Column | Source |
|--------|--------|
| Id | `id` |
| Color | `color` |
| Size | `size` |
| Price | `price` |
| Quantity | `quantity` |

- Load from `GET /ducks` (already sorted by quantity on the server; optional client re-sort).
- **Edit** link/button → edit route with duck id.
- **Delete** link/button → confirm dialog (“Are you sure…?”) → `DELETE /ducks/:id` → refresh list.
- Empty state when no ducks.

## Add form

Collect:

- Color (select: Red, Green, Yellow, Black)
- Size (select: XLarge … XSmall)
- Quantity (number)
- Price (number) — required for merge rule; see decisions doc

Submit → `POST /ducks` → redirect to list (or show success). Surface API validation errors.

## Edit form

Reuse the add form component:

- Color, Size: **read-only** (disabled inputs or plain text)
- Quantity, Price: editable
- Submit → `PATCH /ducks/:id`
- Prefill from `GET /ducks/:id`

## UX details from brief

- Confirm before delete (browser `confirm` or modal).
- Edit/Delete as links or buttons on each row.
- Keep styling aligned with the specified design; until screenshots exist, use a simple clean admin layout consistent with the rest of the app.

## Suggested routes

```text
/ducks           → list
/ducks/new       → add
/ducks/:id/edit  → edit
```

## Done when

- Full CRUD flow works in the browser against the real API
- Soft-deleted ducks never appear in the table
- Edit cannot change color/size
- Delete asks for confirmation

Next: [06-store-packaging.md](./06-store-packaging.md)
