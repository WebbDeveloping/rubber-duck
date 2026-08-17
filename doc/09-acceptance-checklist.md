# 09 — Acceptance checklist

Use this as the final pass before calling the project done.

## Warehouse — backend

- [ ] Duck fields: id, color, size, price, quantity, deleted  
- [ ] Colors limited to Red, Green, Yellow, Black  
- [ ] Sizes limited to XLarge, Large, Medium, Small, XSmall  
- [ ] List excludes `deleted = true`, sorted by quantity  
- [ ] Create merges quantity when color + size + price match  
- [ ] Create inserts when no match  
- [ ] Delete is soft (`deleted = true` only)  
- [ ] Update allows only quantity and price  

## Warehouse — frontend

- [ ] Table columns: Id, color, size, price, quantity  
- [ ] Edit and Delete actions per row  
- [ ] Delete shows confirmation alert  
- [ ] Add form: color, size, quantity (+ price per decisions)  
- [ ] Edit uses same form; color/size read-only  
- [ ] Layout matches provided design when screenshots are available  

## Store — backend only

- [ ] `POST` order accepts color, size, quantity, destination country, shipping mode  
- [ ] Package material rules by size (wood / cardboard / plastic)  
- [ ] Protection rules by shipping mode + package  
- [ ] Total uses quantity × price plus all listed discounts/increments  
- [ ] Response includes package type, protection type(s), total to pay, details  
- [ ] Design patterns used for packaging and pricing (Strategy / Chain / similar)  

## Engineering hygiene

- [ ] Env-based DB and API URLs (no secrets in git)  
- [ ] Validation on all write endpoints  
- [ ] Unit tests for packaging and pricing rules  
- [ ] README points to `doc/00-overview.md`  

## Build order reminder

```text
01 decisions → 02 model → 03 setup → 04 warehouse API → 05 warehouse UI
→ 06 packaging → 07 pricing → 08 order API → 09 checklist
```
