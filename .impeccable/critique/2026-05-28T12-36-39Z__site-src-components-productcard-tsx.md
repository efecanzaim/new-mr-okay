---
target: site/src/components/ProductCard.tsx
total_score: 32
p0_count: 0
p1_count: 0
timestamp: 2026-05-28T12-36-39Z
slug: site-src-components-productcard-tsx
---
# Critique: ProductCard.tsx (post-fix)

## Score 25 → 32 (+7)

| # | Heuristic | Before | After | Δ |
|---|---|---|---|---|
| 1 | Status | 2 | 3 | +1 |
| 2 | Match | 3 | 3 | 0 |
| 3 | Control | 3 | 3 | 0 |
| 4 | Consistency | 2 | 4 | +2 |
| 5 | Prevention | 3 | 3 | 0 |
| 6 | Recognition | 3 | 3 | 0 |
| 7 | Flexibility | 1 | 4 | +3 |
| 8 | Aesthetic | 3 | 4 | +1 |
| 9 | Recovery | 3 | 3 | 0 |
| 10 | Help | 2 | 2 | 0 |
| Total | | 25 | **32** | **+7** |

## Fixed

**Harden:**
- Focus state: Link gets focus-visible ring; focus also opens overlay (parity with hover)
- Touch device: `matchMedia('(hover: none)')` → overlay always visible
- aria-label on Link ("Elegant — Businessman")
- useReducedMotion: entrance + fades bypass when reduced
- Hover image alt → empty (decorative, aria-hidden parent)

**Polish:**
- text-silver-dark → text-black/80 (AAA)
- Image ease easeInOut → signature curve (0.23,1,0.32,1)
- quality 100 → 90 (both images)

**Typeset:**
- Category tag, Quick Add, collection pretitle → ultraLabelStyle module
- Description → microLabelStyle 12px / 0.04em
- Heading → font-serif weight 500 (Playfair medium per DESIGN.md)

## Remaining (deferred)

- Quick Add CTA is decorative ("İncele"); actual cart add is a separate flow
- 3 bg-black detector flags = Tailwind override false positives
