---
target: site/src/components/Header.tsx
total_score: 32
p0_count: 0
p1_count: 0
timestamp: 2026-05-28T12-19-28Z
slug: site-src-components-header-tsx
---
# Critique: site/src/components/Header.tsx (post-fix)

## Design Health Score (21 → 32)

| # | Heuristic | Before | After | Δ |
|---|-----------|--------|-------|---|
| 1 | Visibility of System Status | 1 | 2 | +1 |
| 2 | Match System / Real World | 3 | 3 | 0 |
| 3 | User Control and Freedom | 1 | 4 | +3 |
| 4 | Consistency and Standards | 2 | 4 | +2 |
| 5 | Error Prevention | 3 | 3 | 0 |
| 6 | Recognition Rather Than Recall | 2 | 3 | +1 |
| 7 | Flexibility and Efficiency | 1 | 4 | +3 |
| 8 | Aesthetic and Minimalist Design | 3 | 4 | +1 |
| 9 | Error Recovery | 3 | 3 | 0 |
| 10 | Help and Documentation | 2 | 2 | 0 |
| Total | | 21 | **32** | **+11** |

## Anti-Patterns

Detector: 3 `bg-black` false positives (Tailwind config overrides to #050505). No action.

LLM: Header is on-brand. Margiela Apothecary register honored throughout.

## What Was Fixed

**Harden:**
- Mega-menu: onFocus + onClick + ArrowDown + Escape, ARIA (haspopup, expanded, controls, menu/menuitem), focus trap on cluster
- Mobile: bottom-sheet sub-panel slides in from right with GERİ button, 5 koku grid
- Lang dropdown: listbox/option role, ArrowUp/Down, Escape, aria-selected
- Search: real form, submit handler, aria-label
- Icons: Turkish aria-labels (Sepet, Hesap, Dil seçimi, Menü, Ara)
- Skip link → main, layout main got id
- useReducedMotion respect; body scroll lock when drawer open

**Polish:**
- Mega-menu category description /60 → /80 for AAA
- Search underline /30 → /20 per DESIGN.md spec
- Placeholder /60 → /70
- Hairline drift fixed (/8 → /10 everywhere)
- Duration-200 → duration-300 sweep

**Typeset:**
- styles/typography.ts: navLinkStyle, microLabelStyle, ultraLabelStyle as shared module
- Letter-spacing unified to 0.092em across all uppercase labels
- Micro-label 0.04em per DESIGN.md spec

**Delight:**
- Wordmark route-aware: 32px on /, 28px inner routes (smooth transition)
- Wordmark hover breath: letter-spacing 0 → 0.02em over 700ms

## Remaining Work (deferred)

- Item count badge on cart icon (Visibility +1)
- Active-route highlight on nav (Visibility +1)
- Visible micro-labels under icons (Recognition +1)
- Documentation links (Help +1)

## Persona Status

**Sam (Accessibility, keyboard):** All gaps closed. Tab to SMARTWOMAN opens mega via onFocus. ArrowDown enters mega. Escape exits, focus returns. Lang dropdown navigable. Skip link works.

**Selin (Mobile-first):** Bottom-sheet sub-panel restores the 5-koku discovery surface on phone. Tap SMARTWOMAN, slide-in panel shows the kokular with images. GERİ returns. Mr. Okay logo larger on landing.

**Jordan (First-Timer):** Icons screen-reader-labeled but still no visible labels. Acceptable for now; future delight pass can add visible labels if recognition becomes the bottleneck.
