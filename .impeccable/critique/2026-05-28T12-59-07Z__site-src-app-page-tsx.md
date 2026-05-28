---
target: site/src/app/page.tsx (homepage orchestration + ProductShowcase + BrandStory)
total_score: 20
p0_count: 5
p1_count: 6
timestamp: 2026-05-28T12-59-07Z
slug: site-src-app-page-tsx
---
# Critique: Homepage (page.tsx + ProductShowcase + BrandStory)

## Score 20/40

| # | Heuristic | Score | Issue |
|---|---|---|---|
| 1 | Status | 1 | Carousel no aria-live; fake-functional Heart/Cart |
| 2 | Match | 2 | Heart/Cart break expectation |
| 3 | Control | 2 | Carousel kb/touch broken |
| 4 | Consistency | 1 | gradient-silver ban, section label Helvetica, color drift |
| 5 | Prevention | 3 | |
| 6 | Recognition | 2 | Heart/Cart unlabeled |
| 7 | Flexibility | 1 | Carousel mouse-only, no reduced-motion, layout-transition antipattern |
| 8 | Aesthetic | 3 | Composition strong, token drift |
| 9 | Recovery | 3 | |
| 10 | Help | 2 | |
| Total | | **20** | |

## P0 (absolute bans + functionality)
- text-gradient-silver = DESIGN.md absolute ban (BrandStory L66)
- Heart + ShoppingBag fake-functional buttons (ProductShowcase ExpandButton)
- transition: max-width = layout-transition antipattern (ProductShowcase L30/47, detector)
- Carousel no kb + no touch swipe
- useReducedMotion missing across 3 components

## P1 (drift)
- Section heading Helvetica → Playfair (DESIGN.md spec)
- Hardcoded TR strings (Favorilere Ekle, Hemen Satın Al, section titles)
- Random colors #212529, #020202, #545454 → use ink-primary #050505 + neutral-mid #686868
- BrandStory font-semibold body → 400; tracking-ultrawide → ultraLabelStyle
- ProductShowcase frame gradient mismatch (0.12 vs DESIGN.md 0.20/0.03)
- BrandStory discover button no focus ring

## Persona

Sam: carousel arrows unlabeled, Heart/Cart bare, mixed heading register.
Selin: mobile swipe doesn't work; Heart tap does nothing.
Jordan: Heart icon ambiguous — bookmark/favorite/like?

## Notes
- BrandStory bg-white vs page surface #faf9f6 — visual break
- ProductShowcase 1:1 frame vs ProductCard 3:4 — aspect drift
- Sticky hero + scroll-over performance worth testing on mobile
