---
target: site/src/components/Footer.tsx
total_score: 21
p0_count: 4
p1_count: 6
timestamp: 2026-05-28T12-52-17Z
slug: site-src-components-footer-tsx
---
# Critique: Footer.tsx

## Score 21/40

| # | Heuristic | Score | Issue |
|---|---|---|---|
| 1 | Status | 1 | SMARTWOMAN disabled in footer but live elsewhere |
| 2 | Match | 3 | |
| 3 | Control | 2 | Inconsistent SMARTWOMAN state |
| 4 | Consistency | 1 | Typography/radius/weight drift x6 |
| 5 | Prevention | 3 | |
| 6 | Recognition | 2 | Icons unlabeled |
| 7 | Flexibility | 2 | No focus rings, no reduced-motion |
| 8 | Aesthetic | 3 | |
| 9 | Recovery | 2 | Newsletter fake-success |
| 10 | Help | 2 | |
| Total | | **21** | |

## P0
- SMARTWOMAN disabled in footer, live in header — clarify
- Icons + Send button no aria-label, no focus ring — harden
- useReducedMotion not respected — harden
- text-white/40 + placeholder text-black/40 contrast AAA fail — polish

## P1
- Typography drift (6 inline) → use ultraLabelStyle/microLabelStyle module — typeset
- rounded-lg on WhatsApp/Email — DESIGN.md "Sharp by default" — polish
- bg-white/5 + border-white/10 trust cards = glassmorphism subtle, PRODUCT.md anti-ref — polish
- text-green-600 success breaks two-tone palette — polish
- <h1> wordmark on every page — semantic h-hierarchy — polish
- "avenir" custom class — drift from typography module — typeset

## Persona

Sam: focus rings absent; icon links bare URLs to screen reader; tab traps on disabled link.
Selin: SMARTWOMAN footer-disabled but header-live → cognitive dissonance.

## Notes
- Pre-footer "identical card grid" of trust badges — DESIGN.md absolute ban borderline
- 6 bg-black detector false positives (Tailwind override)
