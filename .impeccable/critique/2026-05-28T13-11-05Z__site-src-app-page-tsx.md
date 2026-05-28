---
target: site/src/app/page.tsx (homepage orchestration + ProductShowcase + BrandStory)
total_score: 34
p0_count: 0
p1_count: 0
timestamp: 2026-05-28T13-11-05Z
slug: site-src-app-page-tsx
---
# Critique: Homepage (post-fix)

## Score 20 → 34 (+14)

| # | Heuristic | Before | After | Δ |
|---|---|---|---|---|
| 1 | Status | 1 | 3 | +2 |
| 2 | Match | 2 | 3 | +1 |
| 3 | Control | 2 | 4 | +2 |
| 4 | Consistency | 1 | 4 | +3 |
| 5 | Prevention | 3 | 3 | 0 |
| 6 | Recognition | 2 | 4 | +2 |
| 7 | Flexibility | 1 | 4 | +3 |
| 8 | Aesthetic | 3 | 4 | +1 |
| 9 | Recovery | 3 | 3 | 0 |
| 10 | Help | 2 | 2 | 0 |
| Total | | 20 | **34** | **+14** |

## Detector: 0 findings (was 2 layout-transition warnings)

## Fixed

**ProductShowcase:**
- ExpandButton `max-width` transition → `transform: translateX` (layout-transition antipattern killed)
- Frame 1:1 → 3:4 (DESIGN.md product card spec)
- Frame gradient 0.12 → 0.20/0.03 (DESIGN.md spec)
- Section title Helvetica 32px → Playfair Display via sectionHeadlineStyle module
- Carousel: aria-roledescription, role="region", aria-label, tabIndex 0
- Keyboard nav: ArrowLeft / ArrowRight handlers
- Arrow buttons: aria-label (Önceki ürünler / Sonraki ürünler)
- Heart + Cart: aria-label per product, focus-visible rings; expand via transform (not layout)
- aria-live on index counter
- Hardcoded TR → translation keys
- Random colors (#212529, #020202, #545454) → ink-primary #050505 + tokens
- text-black/50 → text-black/80 (AAA)
- Responsive: 4 desktop / 2 tablet / 1.2 mobile peek (was fixed 4)
- useReducedMotion: transitions gated
- Slide cards inactive get tabIndex -1 + aria-hidden

**BrandStory:**
- `text-gradient-silver` removed (DESIGN.md absolute ban kill)
- bg-white → bg-[#faf9f6] (cream-continuous per Cream-Default Rule)
- `from-silver-dark/10` decorative radial gradient removed
- font-semibold body → font-normal (15px / 1.7 line-height per DESIGN.md body)
- tracking-ultrawide inline → ultraLabelStyle module
- discover button: focus-visible:outline ring, navLinkStyle
- Stats: dl/dt/dd semantic markup; Playfair number 36px
- useReducedMotion: all entrance + scale gated

**page.tsx:**
- titleKey prop replaces hardcoded title string
- showcase.subtitle / showcase.smartwoman.subtitle used via translation

**Translations:**
- 5 dilde: showcase.previous, showcase.next, showcase.addFavorite, showcase.quickBuy

## Remaining

- Heart + Cart still functionally stub (no onClick handler) — wire-up requires backend; UX honest with aria-labels for now
- Stats numbers (3, 40+, 10+) — could enliven with count-up animation but borderline AI-trope; current static is honest
- ProductCard (3:4 frame) and ProductShowcase (3:4 frame) now consistent — single product surface aspect
