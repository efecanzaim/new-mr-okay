---
target: site/src/components/Header.tsx
total_score: 21
p0_count: 2
p1_count: 3
timestamp: 2026-05-28T12-06-14Z
slug: site-src-components-header-tsx
---
# Critique: site/src/components/Header.tsx

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | No active-route highlight; search has no submit feedback; cart has no item-count badge |
| 2 | Match System / Real World | 3 | Mixed TR/EN uppercase labels work for parfümerie audience |
| 3 | User Control and Freedom | 1 | No Escape on lang dropdown / mega-menu / mobile drawer; no skip-to-content |
| 4 | Consistency and Standards | 2 | Letter-spacing inconsistent across same role (1.2px nav, 1.6px mobile, 0.4px mega-desc) |
| 5 | Error Prevention | 3 | n/a (no destructive ops in header) |
| 6 | Recognition Rather Than Recall | 2 | Cart, Account, Globe icons unlabeled, no tooltip |
| 7 | Flexibility and Efficiency | 1 | Mega-menu hover-only — keyboard + touch users can't reach it |
| 8 | Aesthetic and Minimalist Design | 3 | Centered wordmark + cream surface honor DESIGN.md cleanly |
| 9 | Error Recovery | 3 | n/a |
| 10 | Help and Documentation | 2 | No in-header help (acceptable for nav) |
| **Total** | | **21/40** | **Mid — solid base, accessibility/keyboard gaps** |

## Anti-Patterns Verdict

**LLM assessment:** On-brand. 3-column grid + Blacksword wordmark + cream surface honor "The Margiela Apothecary" cleanly. AAA target failing where it isn't visible (keyboard, touch).

**Deterministic scan:** Detector flagged 2 `bg-black` occurrences (mobile-menu active language button, lines 185, 302). **False-positive in this project** — `tailwind.config.ts` overrides `bg-black` to `#050505` (DESIGN.md `ink-primary`). No action.

**Visual overlays:** Browser injection not attempted (no automation in this session).

## Overall Impression

Visually on-spec but accessibility-failing. Mega-menu hover-only is the single biggest UX cut, especially for mobile-first audience PRODUCT.md commits to.

## What's Working

1. 3-column grid + centered wordmark — "modular composition" principle honored.
2. Mega-menu thumbnails reuse product-card frame (3:4 + gray gradient) — signature visual rhyme.
3. Blacksword 28px wordmark + Helvetica 13px / 1.2px nav — DESIGN.md "Guerlain register" implemented.

## Priority Issues

**[P0] Mega-menu unreachable on touch and keyboard**
- Why: hover-only handlers; mobile bypasses the discovery surface; primary persona is mobile-first.
- Fix: add onFocus + onClick toggle; ARIA (`aria-expanded`, `aria-haspopup`, `role="menu"`); Escape handler; tap-to-open / tap-to-navigate on touch.
- Command: `/impeccable harden header`

**[P0] Icons lack accessible names; AAA target failing**
- Why: ShoppingBag, User, Globe, hamburger, search button — no aria-label. Screen readers silent. PRODUCT.md committed AAA.
- Fix: aria-label (Turkish) on every icon button. Search needs type=submit + form. Lang button: aria-haspopup=listbox, aria-expanded. Dropdown: role=listbox + role=option.
- Command: `/impeccable harden header`

**[P1] Letter-spacing inconsistent for the same role**
- Why: Same uppercase-label role has four spacings (1.2px nav, 1.6px mobile, 0.4px mega-desc, 0.35em ultrawide). Heuristic #4.
- Fix: Move navLinkStyle to shared module; mega-desc to 0.04em per Micro-label spec.
- Command: `/impeccable typeset header`

**[P1] Cart/Account icon contrast fails AAA**
- Why: text-black/70 on cream ≈ 5.7:1; PRODUCT.md requires 7:1.
- Fix: text-black/70 → text-black on default; use /60 only on hover dim.
- Command: `/impeccable polish header`

**[P1] Search input fails focus visibility AAA**
- Why: focus:outline-none + subtle border darken. Not perceivable for keyboard users.
- Fix: focus-visible:outline-2 outline-offset-2 outline-black.
- Command: `/impeccable polish header`

## Persona Red Flags

**Selin (Niche-Parfüm Shopper, 32, mobile-first):**
- 11pm on iPhone. Logo centered feels editorial — likes it.
- Taps SMARTWOMAN; navigates without seeing the 5-koku mega. Discovery surface gone.
- Drawer has no quick search, no language quick-switch (buried).

**Sam (Accessibility, keyboard-only):**
- Tabs to SMARTWOMAN; mega doesn't open on focus.
- Cart, Account, Language announce as bare "Link" with no purpose.
- Escape doesn't close language dropdown; must tab through 5 langs to exit.
- Search input focus-ring invisible against underline.

**Jordan (First-Timer, desktop):**
- Three unlabeled icons top-right. Three guesses to map cart/account/language.

## Minor Observations

- Mobile grid leaves col-1 empty; flex justify-between below lg is cleaner.
- BUSINESSMAN hardcoded uppercase to avoid Turkish İ; locale-aware CSS would handle it.
- Search input has no form / no Enter handler / submit button is type=undefined.
- transition-colors duration-200 everywhere; DESIGN.md prescribes 300ms for color steps.
- Mega-menu uses border-black/8; DESIGN.md Hairline-Only Rule says /10.

## Questions to Consider

- Touch-first mega as a bottom-sheet from the mobile drawer instead of desktop dropdown squeezed onto phone?
- Icons with 8px uppercase micro-labels ("SEPET") below — fix recognition AND match Guerlain micro-label register?
- Larger wordmark (32px) on landing, 24px on inner routes — more presence at the front door?
