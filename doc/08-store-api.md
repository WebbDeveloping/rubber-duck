# 08 — Store order API (backend)

Wire packaging + pricing behind one REST endpoint. No Store frontend.

## Endpoint

`POST /orders` (or `/store/orders`)

### Request body

```json
{
  "color": "Red",
  "size": "Large",
  "quantity": 150,
  "destinationCountry": "USA",
  "shippingMode": "Air"
}
```

| Field | Values |
|-------|--------|
| `color` | Red, Green, Yellow, Black |
| `size` | XLarge, Large, Medium, Small, XSmall |
| `quantity` | Positive integer |
| `destinationCountry` | String (normalize USA / Bolivia / India / other) |
| `shippingMode` | Land, Air, Sea |

### Server steps

1. Validate body.  
2. Find non-deleted duck matching `color` + `size` (see [01-decisions.md](./01-decisions.md) if multiple prices exist).  
3. If none → `404`. If insufficient stock → `400` (if you enforce stock).  
4. Run packaging service → `packageType`, `protections`.  
5. Run pricing chain with duck’s `price` → `totalToPay`, `details`.  
6. Return response (do not require persisting the order for v1).

### Response body

```json
{
  "packageType": "Wood",
  "protections": ["Polystyrene balls"],
  "totalToPay": 1234.56,
  "details": [
    { "code": "BASE", "description": "quantity × price", "amount": 1000 },
    { "code": "BULK_DISCOUNT", "description": "20% off (quantity > 100)", "amount": -200 },
    { "code": "PACKAGE_WOOD", "description": "Wood package +5%", "amount": 40 },
    { "code": "COUNTRY_USA", "description": "USA +18%", "amount": 151.2 },
    { "code": "SHIPPING_AIR", "description": "Air shipping $30 × quantity", "amount": 4500 }
  ]
}
```

Adjust amounts to match your pipeline math; keep `code` / `description` / `amount` stable for clients and tests.

For sea, `protections` includes both:

```json
"protections": ["Moisture-absorbing beads", "Bubble wrap bags"]
```

## NestJS shape (optional)

```text
store/
  orders.controller.ts
  orders.service.ts
  store.module.ts
  packaging/
  pricing/
  dto/create-order.dto.ts
```

Warehouse `DucksService` (or repository) is injected only to resolve unit price / stock — do not duplicate duck queries inside pricing.

## Done when

- Happy-path order returns package, protections, total, details  
- Validation errors return 400  
- Missing duck returns 404  
- Packaging + pricing unit tests still pass through the service layer

Next: [09-acceptance-checklist.md](./09-acceptance-checklist.md)
