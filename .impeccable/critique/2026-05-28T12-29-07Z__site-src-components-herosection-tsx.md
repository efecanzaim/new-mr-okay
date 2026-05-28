---
target: site/src/components/HeroSection.tsx
total_score: 26
p0_count: 3
p1_count: 2
timestamp: 2026-05-28T12-29-07Z
slug: site-src-components-herosection-tsx
---
# Critique: site/src/components/HeroSection.tsx

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Static hero, n/a |
| 2 | Match System / Real World | 2 | "Nouvelle Collection" + "Discover" karışık locale |
| 3 | User Control and Freedom | 3 | Tek CTA |
| 4 | Consistency and Standards | 2 | letter-spacing 2px ≠ navLinkStyle 0.092em |
| 5 | Error Prevention | 3 | n/a |
| 6 | Recognition Rather Than Recall | 3 | Tek CTA net |
| 7 | Flexibility and Efficiency | 1 | Hardcoded image / collection / fallback metinleri |
| 8 | Aesthetic and Minimalist Design | 4 | Margiela poster register güçlü |
| 9 | Error Recovery | 3 | n/a |
| 10 | Help and Documentation | 2 | n/a |
| Total | | **26/40** | Mid — güzel görsel, accessibility/tutarlılık eksik |

## Anti-Patterns

Detector: 1 `bg-black` (line 67) — Tailwind config override, false positive.
LLM: Margiela poster register güçlü, AI-slop yok.

## What's Working

1. Full-bleed image + alt-bottom typography overlay — editorial register güçlü.
2. Single CTA / ontitle / h2 — modular composition.
3. Gradient scrim 0.65 → 0.25 → transparent — işlevsel.

## Priority Issues

**[P0] Image alt generic "Mr. Okay Hero"**
- Fix: Türkçe anlamlı alt-text.
- Command: harden hero

**[P0] CTA focus halkası yok**
- Fix: focus-visible:outline 2px white veya black.
- Command: harden hero

**[P0] prefers-reduced-motion saygılanmamış**
- Fix: useReducedMotion() ile entrance koşullu.
- Command: harden hero

**[P1] Typography inline + tracking 0.154em ≠ modül 0.092em**
- Fix: @/styles/typography modülünden import.
- Command: typeset hero

**[P1] Mixed locale ("Nouvelle Collection" + "Discover")**
- Fix: translation key'ler her dilde tanımlı; TR fallback ("Yeni Koleksiyon", "KEŞFET").
- Command: clarify hero

## Persona Red Flags

**Sam (a11y):** Alt-text bilgi içermiyor. CTA focus halkasız. 900ms entrance animasyonu reduced-motion'da.

**Selin (TR):** Fransızca + İngilizce karışık fallback Türkçe açılışta yabancı.

## Minor Observations

- `<Link><span>` yerine direkt `<Link className="...">`
- quality={100} → 85-90 yeterli
- slider3.jpeg hardcoded, slider1/2/4 hiç kullanılmıyor
- H1 yok; "SMARTWOMAN" h2; SEO+a11y fail

## Questions to Consider

- H1 nerede?
- Görsel rotation'a girer mi (slider1..4 zaten var)?
- CTA hedefi prop/CMS olabilir mi?
