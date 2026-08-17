# 01 — Decisions & open questions

Resolve these before coding so Warehouse and Store stay consistent.

## Recommended decisions

| Topic | Decision | Notes |
|-------|----------|-------|
| Backend | NestJS | Modules map cleanly to Warehouse / Store; DI helps Strategy patterns |
| Frontend | React + Vite | SPA talking to Nest REST API |
| DB | MySQL + Prisma | Typed schema, migrations, soft delete as a boolean |
| Soft delete | `deleted` column, default `false` | List endpoints always filter `deleted = false` |
| Money | Store price as `Decimal` (DB) / number in JSON | Brief says Double |
| Sort | List ducks ordered by `quantity` ascending | Confirm if brief wants asc/desc; default **asc** |
| CORS | Enable for local Vite origin | e.g. `http://localhost:5173` |

## Gaps in the brief (need a rule)

### 1. Price on “Add duck”

Form fields listed: Color, Size, Quantity only. Merge rule keys on **price + color + size**.

**Assumption to adopt:** Add form also collects **Price**. Edit still only allows Quantity + Price (Color/Size read-only). Document this in the UI.

### 2. Order product lookup

Store order sends Color, Size, Quantity — not Id or Price.

**Assumption:** Resolve the duck by Color + Size where `deleted = false`. If multiple rows exist (different prices), prefer the one with highest quantity, or reject with 400 until inventory is unique per color+size. Prefer keeping **one active row per color+size** via the merge-on-add rule (once price is on the form, merges only when price matches).

**Safer rule:** Order body includes `color`, `size`, `quantity` and the server looks up by color+size; if more than one non-deleted duck matches, return `409` with a clear message. Long-term, enforce uniqueness of `(color, size)` among non-deleted rows, or include `duckId` in the order (not in the brief).

### 3. Insufficient stock

Brief does not say what happens if `order.quantity > duck.quantity`.

**Assumption:** Return `400` with “insufficient stock” and do not decrement inventory unless you later add that as a feature. Inventory decrement is **out of scope** unless you choose to add it.

### 4. Design pictures

Brief references “see picture below” for list and form layouts.

**Assumption:** Match a clean admin table + form (Id, Color, Size, Price, Quantity; Edit/Delete actions; confirm dialog on delete). Revisit when screenshots are available.

### 5. Destination country values

Pricing names USA, Bolivia, India, and “any other”.

**Assumption:** Accept free-text country (normalized case) or a fixed enum including at least `USA`, `Bolivia`, `India`, and `Other`. Normalize `"usa"` → `USA`.

## Design patterns (Store module)

Planned patterns (see `06` / `07`):

- **Strategy** — package material by size; shipping filler by mode + material
- **Chain of Responsibility** or **Decorator** — stacked price modifiers (discount, package surcharge, tax, shipping)
- Keep packaging and pricing **pure functions / injectable services** with unit tests; the HTTP controller only orchestrates

## Out of scope (unless you expand later)

- Auth / roles
- Payment gateway
- Storefront UI for placing orders (Store is backend-only)
- Real shipping carriers
- Physical delete of ducks
