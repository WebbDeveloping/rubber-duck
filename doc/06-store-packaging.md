# 06 — Store packaging (backend)

Backend-only. Implement after Warehouse can supply duck price/size for an order.

## Goal

From duck **size** and shipment **mode**, decide:

1. Package material  
2. Protection filler(s)

## Rules — package material (by size)

| Size | Package |
|------|---------|
| `XLarge`, `Large` | Wood |
| `Medium` | Cardboard |
| `Small`, `XSmall` | Plastic |

## Rules — protection (by shipping mode + package)

| Shipping | Package | Protection |
|----------|---------|------------|
| Air | Wood or Cardboard | Polystyrene balls |
| Air | Plastic | Bubble wrap bags |
| Land | Any | Polystyrene balls |
| Sea | Any | Moisture-absorbing beads **and** bubble wrap bags |

## Recommended design pattern: Strategy (+ small factory)

```text
PackagingStrategy (interface)
  resolve(size, shippingMode) → { packageType, protections[] }

SizeToMaterialStrategy     // maps size → Wood | Cardboard | Plastic
ProtectionStrategy         // maps (shippingMode, material) → protections
PackagingService           // orchestrates both
```

Why Strategy: each rule set is swappable and unit-testable without touching the controller.

Alternative: a pure decision table function is fine for this size; wrap it in a service so Nest DI still isolates it from HTTP.

## Types (example)

```ts
type PackageType = 'Wood' | 'Cardboard' | 'Plastic';
type Protection =
  | 'Polystyrene balls'
  | 'Bubble wrap bags'
  | 'Moisture-absorbing beads';
type ShippingMode = 'Land' | 'Air' | 'Sea';
```

Sea always returns **both** protections (order them consistently in the API response).

## Tests to write

- Large + Air → Wood + polystyrene  
- Small + Air → Plastic + bubble wrap  
- Medium + Land → Cardboard + polystyrene  
- XSmall + Sea → Plastic + beads + bubble wrap  
- XLarge + Land → Wood + polystyrene  

## Done when

- Pure packaging service covered by unit tests  
- No HTTP yet required (wire in [08-store-api.md](./08-store-api.md))

Next: [07-store-pricing.md](./07-store-pricing.md)
