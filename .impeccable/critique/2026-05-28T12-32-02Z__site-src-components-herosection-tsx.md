---
target: site/src/components/HeroSection.tsx
total_score: 31
p0_count: 0
p1_count: 0
timestamp: 2026-05-28T12-32-02Z
slug: site-src-components-herosection-tsx
---
# Critique: HeroSection.tsx (post-fix)

## Design Health Score (26 → 31)

| # | Heuristic | Before | After | Δ |
|---|-----------|--------|-------|---|
| 1 | Visibility | 3 | 3 | 0 |
| 2 | Match System / Real World | 2 | 4 | +2 |
| 3 | User Control | 3 | 3 | 0 |
| 4 | Consistency | 2 | 4 | +2 |
| 5 | Error Prevention | 3 | 3 | 0 |
| 6 | Recognition | 3 | 3 | 0 |
| 7 | Flexibility | 1 | 2 | +1 |
| 8 | Aesthetic | 4 | 4 | 0 |
| 9 | Error Recovery | 3 | 3 | 0 |
| 10 | Help & Docs | 2 | 2 | 0 |
| Total | | 26 | **31** | **+5** |

## What Was Fixed

**Harden (3 P0):**
- Alt text: "Mr. Okay Hero" → context-aware Türkçe ("Smartwoman koleksiyonu için sahnelenmiş parfüm fotoğrafı"). Tüm 5 dilde locale-specific.
- CTA focus: `focus-visible:outline-2 outline-offset-4 outline-white` halkası eklendi.
- useReducedMotion: entrance animasyonu reduced-motion'da bypass; instantly visible.
- Section'a `aria-label="Anasayfa hero"`; gradient'e `aria-hidden`.

**Typeset (P1):**
- `navLinkStyle` + `microLabelStyle` `@/styles/typography`'den import.
- Title style genişletildi (24px, 0.092em — modül ile uyumlu tracking).
- Ontitle micro-label kullanıyor; CTA ctaStyle = navLinkStyle + padding extra.

**Clarify (P1):**
- 5 yeni translation key:
  - `home.hero.ontitle`: Yeni Koleksiyon / New Collection / Neue Kollektion / Nouvelle Collection / مجموعة جديدة
  - `home.hero.alt`: Türkçe + 4 dilde editorial alt-text
- Mixed locale fallback ("Nouvelle Collection" + "Discover") elendi; TR-öncelikli fallback.
- CTA `toLocaleUpperCase("tr-TR")` ile Turkish-safe uppercase.

## Remaining (deferred P2-P3)

- `<h1>` page-level başlık yok; hero h2 ile başlıyor (SEO + a11y minor)
- slider1/2/4.jpeg hiç kullanılmıyor; rotation/seasonal logic CMS işi
- CTA hedefi (`/collections/smartwoman`) hardcoded; prop'a açılabilir
- Image quality 100 → 90 düşürüldü (transfer optimize)

## Anti-Patterns

Detector: 1 `bg-black` false positive (Tailwind override).
LLM: Margiela poster register güçlü, AI-slop yok.

## Persona Status

**Sam (a11y):** Alt-text bilgilendirici; CTA focus halkası görünür; reduced-motion'da entrance bypass; gradient semantic olarak gizli.

**Selin (TR):** Sayfa açılınca "Yeni Koleksiyon" + "KOLEKSİYONU KEŞFET" — tamamen Türkçe. Fransızca/İngilizce kalıntı yok.
