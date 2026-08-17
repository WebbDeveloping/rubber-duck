# 07 — Store pricing (backend)

Compute **total to pay** and a **line-item breakdown** of discounts and increments.

## Inputs

- `quantity` (order)
- `unitPrice` (from matched duck)
- `packageType` (from packaging step)
- `destinationCountry`
- `shippingMode`

## Calculation order (important)

Apply modifiers in a **documented, fixed order** so totals are reproducible. Suggested pipeline:

1. **Base:** `quantity * price`
2. **Bulk discount:** if `quantity > 100` → subtract 20% of current total  
3. **Package adjustment** on current total:
   - Wood → +5%
   - Plastic → +10%
   - Cardboard → −1%
4. **Country tax/fee** on current total:
   - USA → +18%
   - Bolivia → +13%
   - India → +19%
   - Other → +15%
5. **Shipping flat / per-unit** (added after percentages):
   - Sea → + `$400`
   - Land → + `$10 * quantity`
   - Air → + `$30 * quantity`, then if `quantity > 1000` subtract **15% of that air shipping charge only**

### Air shipping clarification

Brief: “add 30 US dollars per order quantity minus 15% if the order exceeds 1000 units.”

**Interpretation:**

```text
airShipping = 30 * quantity
if quantity > 1000:
  airShipping = airShipping * 0.85
total += airShipping
```

Document this in code comments and tests.

### Percentage base

Assume each %-based rule applies to the **running total after previous steps**, unless you agree otherwise with the stakeholder. Chain-of-responsibility with a shared context (`runningTotal`, `details[]`) makes this explicit.

## Recommended design pattern: Chain of Responsibility

```text
PriceContext { quantity, unitPrice, packageType, country, shippingMode, total, details[] }

handlers in order:
  BaseCostHandler
  BulkDiscountHandler      // qty > 100 → -20%
  PackageAdjustmentHandler // wood/plastic/cardboard
  CountryFeeHandler
  ShippingCostHandler
```

Each handler appends to `details`, e.g.:

```json
{ "code": "BULK_DISCOUNT", "description": "20% off for quantity > 100", "amount": -40.0 }
```

Positive `amount` = increment; negative = discount.

**Decorator** is also valid (wrap cost calculator layers). Prefer Chain if you want an ordered list of independent rules that are easy to unit-test one-by-one.

## Detail lines the API should return

Enough for the brief’s “details of discounts and increments”:

- Base cost  
- Bulk discount (if any)  
- Package surcharge or discount  
- Country fee  
- Shipping charge (and air shipping discount if any)

## Done when

- Unit tests for each rule in isolation and one full integration-style total  
- Edge cases: qty 100 (no bulk), 101 (bulk); qty 1000 vs 1001 for air; each package type; each country

Next: [08-store-api.md](./08-store-api.md)
