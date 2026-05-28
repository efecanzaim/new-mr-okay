---
target: site/src/components/Footer.tsx
total_score: 33
p0_count: 0
p1_count: 0
timestamp: 2026-05-28T12-54-24Z
slug: site-src-components-footer-tsx
---
# Critique: Footer.tsx (post-fix)

## Score 21 → 33 (+12)

| # | Heuristic | Before | After | Δ |
|---|---|---|---|---|
| 1 | Status | 1 | 3 | +2 |
| 2 | Match | 3 | 3 | 0 |
| 3 | Control | 2 | 3 | +1 |
| 4 | Consistency | 1 | 4 | +3 |
| 5 | Prevention | 3 | 3 | 0 |
| 6 | Recognition | 2 | 4 | +2 |
| 7 | Flexibility | 2 | 4 | +2 |
| 8 | Aesthetic | 3 | 4 | +1 |
| 9 | Recovery | 2 | 3 | +1 |
| 10 | Help | 2 | 2 | 0 |
| Total | | 21 | **33** | **+12** |

## Fixed

**Clarify:**
- SMARTWOMAN footer'da `disabled: true` → kaldırıldı, canlı (header ile tutarlı)
- "Limited Edition" disabled değil, "YAKINDA" badge ile durum şeffaf

**Harden:**
- useReducedMotion: tüm entrance + social hover gated
- aria-labels: Send (Bültene abone ol), Instagram/Facebook/YouTube (Türkçe açıklamalı), WhatsApp / Email (uzun açıklama)
- focus-visible:outline halkaları her input/button/link'te
- Form: real form role="search" + label htmlFor + aria-live="polite" success
- Pre-footer trust strip ve link kolonları role="group" aria-label

**Polish:**
- text-white/40 → /60 (AAA)
- placeholder text-black/40 → /70
- rounded-lg WhatsApp/Email → square (DESIGN.md "Sharp by default")
- bg-white/5 trust badges → transparent + border-white/15 (glassmorphism kaldırıldı)
- text-green-600 success → text-black/70 (iki ton palet)
- bg-white/10 dark dividers → /15 hairline

**Typeset:**
- Column headers (4x) → ultraLabelStyle module
- Link text → linkStyle (Helvetica 14px / 0.04em / 400)
- Body descriptions → microLabelStyle 12px / lineHeight 1.5
- Bottom bar → microLabelStyle 12px
- "avenir" custom class kaldırıldı; tipografi modülünden gelir
- Wordmark <h1> → <span> (heading hierarchy fix)
- Newsletter / Follow-us heading → microLabelStyle 16px (semantik h3, custom class yok)

## Remaining (deferred)

- Newsletter gerçek submit endpoint'i yok (görsel fake-success)
- Pre-footer 3 trust card "identical card grid" — DESIGN.md absolute ban sınırında; ikonlar farklı ama strüktür aynı
- 6 bg-black detector flag = Tailwind override false positives
