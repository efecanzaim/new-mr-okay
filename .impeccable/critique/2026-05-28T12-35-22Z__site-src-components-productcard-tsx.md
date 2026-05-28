---
target: site/src/components/ProductCard.tsx
total_score: 25
p0_count: 4
p1_count: 2
timestamp: 2026-05-28T12-35-22Z
slug: site-src-components-productcard-tsx
---
# Critique: ProductCard.tsx

## Score 25/40

| # | Heuristic | Score | Issue |
|---|---|---|---|
| 1 | Status | 2 | Quick Add hover-only |
| 2 | Match | 3 | n/a |
| 3 | Control | 3 | n/a |
| 4 | Consistency | 2 | silver-dark, easeInOut, font-semibold drift |
| 5 | Prevention | 3 | n/a |
| 6 | Recognition | 3 | n/a |
| 7 | Flexibility | 1 | Hover-only Quick Add unreachable by kb/touch |
| 8 | Aesthetic | 3 | n/a |
| 9 | Recovery | 3 | n/a |
| 10 | Help | 2 | n/a |
| Total | | **25** | |

## P0
- Quick Add hover-only — fix: focus-within + @media(hover:none)
- No focus ring on Link — fix: focus-visible outline
- No useReducedMotion — fix: gate motion
- text-silver-dark on cream fails AAA — fix: text-black/80

## P1
- Typography drift (tracking-ultrawide inline) — fix: ultraLabelStyle from module
- easeInOut ≠ signature curve — fix: cubic-bezier(0.23,1,0.32,1)

## Persona
Sam: focus invisible, Quick Add invisible.
Selin: Quick Add never appears on phone.

## Notes
- Hover image alt should be empty (decorative duplicate)
- quality 100 → 90
- 3 bg-black false positives (Tailwind override)
