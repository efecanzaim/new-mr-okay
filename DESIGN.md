---
name: Mr. Okay Beauty
description: Niche parfümerie storefront — modular labels, hushed surfaces, Margiela-precision in cream and ink.
colors:
  surface-primary: "#faf9f6"
  surface-elevated: "#ffffff"
  ink-primary: "#050505"
  ink-inverse: "#ffffff"
  neutral-mid: "#686868"
  overlay-scrim: "#050505"
typography:
  display:
    fontFamily: "Blacksword, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.5rem, 3.2vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0"
  title:
    fontFamily: "Avenir, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0.02em"
  body:
    fontFamily: "AvenirThin, Avenir, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0.05em"
  label:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.23
    letterSpacing: "0.092em"
rounded:
  none: "0"
  full: "9999px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "96px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ink-primary}"
    textColor: "{colors.ink-inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 40px"
  button-primary-hover:
    backgroundColor: "{colors.ink-inverse}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.none}"
    padding: "12px 40px"
  button-inverse:
    backgroundColor: "{colors.ink-inverse}"
    textColor: "{colors.ink-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "11px 36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 0"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  product-tag:
    backgroundColor: "{colors.ink-primary}"
    textColor: "{colors.ink-inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
---

# Design System: Mr. Okay Beauty

## 1. Overview

**Creative North Star: "The Margiela Apothecary"**

Mr. Okay is a parfümerie storefront that behaves like a Margiela Replica white-label rack crossed with a quiet apothecary. Surfaces are warm paper, ink is near-black, edges are sharp. Every koku gets the same modular label treatment; hierarchy comes from sequence and breathing room, not from sparkle or scale. The interface respects the customer's time and intelligence: no promo countdowns, no "stoklar tükeniyor" pressure, no rounded SaaS softness. When the site is loud, it is loud about the product photograph, not about the chrome.

The aesthetic explicitly rejects three lanes drawn from PRODUCT.md: (a) Chanel-era luxury clichés (gold scrollwork, marble texture, italic script gilding), (b) generic Turkish e-commerce (Trendyol red discount tabs, popup timers, badge clutter), and (c) SaaS-cream pastel gradients. What survives is editorial composure: cream paper, ink that warms toward charcoal, one ash-toned mid-gray for support, and a single decorative serif (Blacksword) reserved for the wordmark.

Tactile and confident at the component level: solid ink blocks for primary calls-to-action, square corners everywhere, magnetic hover scale on inputs the customer can touch. Hushed at the layout level: generous vertical rhythm, one-piece sections, no nested cards, no card grids that fake equivalence between unequal things.

**Key Characteristics:**
- Cream warm paper surface (`#faf9f6`); pure white reserved for inverted CTAs and elevated product frames
- Near-black ink (`#050505`) carries 95% of text load; mid-gray (`#686868`) for secondary support only
- Sharp corners throughout (`border-radius: 0`); circular only for social-media icon medallions
- One decorative serif (Blacksword) for the wordmark; Playfair Display + Avenir do the working typography
- Label typography is Helvetica Neue, uppercase, `letter-spacing: 0.092em` — the Guerlain register
- Motion uses a single ease curve (`cubic-bezier(0.23, 1, 0.32, 1)`); durations stair-step from 300ms (color) to 800ms (entrances)
- Elevation is flat; depth comes from 1px hairline borders at `rgba(0,0,0,0.1)` and tonal layering of cream over white

## 2. Colors

The palette is **two-tone with a single neutral mid**: cream paper, ink near-black, one mid-gray. No accent. No secondary. This is the doctrine.

### Primary
- **ink-primary** (`#050505` / ≈ `oklch(0.135 0 0)`): The voice. All body text, primary CTA fill, product name headlines, hairline dividers (at 10% alpha). Used everywhere the site has something to say.

### Neutral
- **surface-primary** (`#faf9f6` / ≈ `oklch(0.978 0.005 80)`): The paper. Page background across all routes, mega-menu surface, footer surface. Warm-tinted so cream sits next to ink without screen-glare.
- **surface-elevated** (`#ffffff` / `oklch(1 0 0)`): The label. Newsletter input fill, inverted CTA fill, product-card frame highlights. Pure white is reserved; it should feel like a printed Margiela tag set on cream paper, not like the default canvas.
- **neutral-mid** (`#686868` / ≈ `oklch(0.475 0 0)`): The whisper. Secondary metadata, store/marketplace labels, "collection" pretitle on product cards. Never used for primary text, never on the cream surface for anything the customer needs to read closely.
- **overlay-scrim** (`#050505` at 25–65% alpha): Hero image gradient (`linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, transparent 65%)`). The only place ink appears as a semi-opaque wash.

### Named Rules

**The Two-Tone Rule.** Cream and ink. That is the palette. A third color does not enter the system without an Editorial board meeting. Hover states invert (cream→ink, ink→cream); they do not introduce new hues.

**The Cream-Default Rule.** Pure white (`#ffffff`) appears only as inverted CTAs, the newsletter input fill, and the product-frame highlight. The page surface is always cream. If a section wants "more white", the answer is more whitespace, not a whiter color.

**The No-Accent Rule.** There is no brand accent color. No magenta, no gold, no teal, no Trendyol red. The product photograph is the accent; the interface holds still while the photograph does the work.

## 3. Typography

**Display Font:** Blacksword (custom OTF) with Georgia, serif fallback
**Headline Font:** Playfair Display (Google Fonts) with Georgia, serif fallback
**Title Font:** Avenir (custom OTF) with system-ui, sans-serif fallback
**Body Font:** AvenirThin / Avenir (custom OTF) with system-ui, sans-serif fallback
**Label Font:** Helvetica Neue, Helvetica, Arial, sans-serif

**Character:** Blacksword is the wordmark voice: decorative, italic-leaning, used exactly once per screen for "Mr. Okay" and never extended. Playfair Display does the working serif: editorial headlines, product names, section titles. Avenir family carries body and titles. Helvetica Neue handles every uppercase UI label and CTA — `0.092em` letter-spacing, 13px, 500 weight — a deliberate borrow from the Guerlain register that anchors the system in luxury-editorial rather than parfümerie-saccharine.

### Hierarchy
- **Display** (400, `clamp(2.5rem, 7vw, 5.25rem)`, line-height 1, Blacksword): The wordmark only. Hero overlay "Mr. Okay", About page title. One per screen.
- **Headline** (500, `clamp(1.5rem, 3.2vw, 3rem)`, line-height 1.15, Playfair Display): Section heads, product detail names, collection titles. The site's working voice for big statements.
- **Title** (500, 1.125rem, line-height 1.35, Avenir): Card titles below product images, newsletter heading, footer column heads.
- **Body** (400, 0.9375rem, line-height 1.65, AvenirThin/Avenir, `letter-spacing: 0.05em`): Marketing copy, about-page narrative, product descriptions. Cap line length at 65–75ch; the about page already does this with `max-w-7xl` + column grids.
- **Label** (500, 0.8125rem, line-height 1.23, Helvetica Neue, `letter-spacing: 0.092em`, **uppercase**): Every CTA, navigation link, category tag, breadcrumb. The "Guerlain register" that PRODUCT.md's editorial principle leans on.
- **Micro-label** (700/900, 0.625rem, line-height 1.0, Helvetica Neue, `letter-spacing: 0.35em` = `tracking-ultrawide`, **uppercase**): Pretitles on product cards ("BUSINESSMAN"), marketplace labels, footer column headers. The smallest the site will go.

### Named Rules

**The One-Wordmark Rule.** Blacksword appears exactly once per page: the wordmark. Never section heads, never product names, never decoration. It is the brand signature, not a font.

**The Uppercase-Label Rule.** Every CTA, navigation link, badge, and pretitle is uppercase Helvetica Neue with ≥0.05em letter-spacing. Title-case CTAs ("Discover Now") are forbidden; they read as e-commerce default-template.

**The 65-Character Rule.** Body copy paragraphs do not exceed 75 characters of line length on desktop. About and product-detail sections already enforce this; new pages must too.

## 4. Elevation

The system is **flat by default**. Depth is conveyed through three quiet mechanisms, never through `box-shadow`:

1. **Tonal layering.** Cream (`#faf9f6`) page sits below pure white (`#ffffff`) elevated elements (inverted CTAs, newsletter input fill, product-frame highlights). The tonal step is small (Δ lightness ≈ 0.02), but on a cream-default surface the eye registers white as "lifted off the page."
2. **Hairline borders.** `1px solid rgba(0,0,0,0.1)` separates section blocks, dropdown menus, footer panels, mega-menu top/bottom rules. Always one pixel, always at 10% opacity, never thicker, never colored.
3. **Gradient frames.** Product cards and mega-menu thumbnails sit in a 3:4 frame with `linear-gradient(107deg, rgba(89,89,89,0.20) 0%, rgba(89,89,89,0.03) 100%)`. This isn't a shadow; it's a printed gray substrate the photograph sits against. Treat it as part of the photograph's composition, not as a "card."

No `box-shadow` declarations exist in the codebase. None should be added.

### Named Rules

**The No-Shadow Rule.** `box-shadow` is forbidden. If something needs to feel "lifted", layer a `surface-elevated` (`#ffffff`) block onto the cream surface or add a hairline border. If those don't read, the element doesn't need to be lifted.

**The Hairline-Only Rule.** Dividers, panel edges, dropdown outlines: always `1px solid rgba(0,0,0,0.1)`. No 2px borders, no colored borders, no `border-left` accents. Side-stripe borders are absolutely banned (Impeccable shared design law).

## 5. Components

### Buttons

Tactile and confident. Every button is square, ink-on-cream or cream-on-ink, and inverts on hover. The hover transition is `cubic-bezier(0.23, 1, 0.32, 1)` over 300–500ms.

- **Shape:** square (`border-radius: 0`). Always.
- **Primary** (`button-primary`): `bg #050505` / `text #ffffff` / `border 1px solid #050505` / `padding: 12px 40px` / typography = label. Hover inverts: `bg #ffffff` / `text #050505`, border stays.
- **Inverse** (`button-inverse`): for use on dark image overlays. `bg #ffffff` / `text #050505` / `padding: 11px 36px`. Hover inverts to `bg #050505` / `text #ffffff`. Used by the hero "Discover" CTA.
- **Ghost** (`button-ghost`): `bg transparent` / `text #050505` / `padding: 8px 0` (no horizontal padding; usually appears inline with a chevron). Hover drops opacity to `text-black/60`. Used in navigation and "Tüm Koleksiyonu Keşfet →" links.
- **Magnetic interaction:** primary buttons use Framer Motion `whileHover={{ scale: 1.02 }}` + `whileTap={{ scale: 0.98 }}`. The scale is the only motion; nothing rotates, slides, or pulses.

### Inputs

- **Underline input** (`input-underline`): `bg transparent` / `border-bottom: 1px solid rgba(0,0,0,0.2)` / `padding: 12px 0` / typography = body / `letter-spacing: 0.05em`. Focus: border darkens to `rgba(0,0,0,0.6)`, no outline-ring. Used for contact form, search.
- **Newsletter input** (filled variant): `bg #ffffff` / `border 1px solid rgba(0,0,0,0.2)` / `padding: 8px 12px` / typography = body sm. Focus: border darkens. Square corners.
- **No** rounded inputs, no shadow on focus, no colored focus ring; the border darkens and that's the whole focus signal. (Note: this currently fails AAA keyboard-visibility; see Don'ts.)

### Cards / Product Frames

Cards are **not "cards"** in the SaaS sense. They are framed product photographs.

- **Corner Style:** square (`border-radius: 0`).
- **Frame Background:** `linear-gradient(107deg, rgba(89,89,89,0.20) 0%, rgba(89,89,89,0.03) 100%)` inside a 3:4 aspect ratio container. The photograph fills the frame `object-cover`.
- **Hover behavior:** the default image cross-fades (500ms) to a `_hover` variant of the same photograph (sourced via `getHoverImagePath`). A "Discover" full-width inverse-CTA slides up from `y: 100% → 0` over 500ms on hover.
- **Border:** none. The gradient frame is the entire visual boundary.
- **Internal padding (info block below image):** none horizontal, `mb-6` between image and info, `space-y-2` between info lines.
- **Tag** (`product-tag`): absolutely positioned top-left, `bg #050505` / `text #ffffff` / `padding: 4px 12px` / typography = micro-label. Square. Never rounded.

**No nested cards.** A product card never contains another card. Featured-products grids do not wrap each card in another card. The frame is the only container.

### Navigation

- **Header:** `bg #faf9f6`, 56px height, `border-bottom: 1px solid rgba(0,0,0,0.1)`. Three-column grid: left nav, centered wordmark (Blacksword 28px), right icons + search + language.
- **Nav links:** typography = label, color `#050505`, hover drops to `text-black/60` over 200ms.
- **Mega-menu:** opens from header hover, `bg #faf9f6`, top + bottom hairlines, 5-column grid of category thumbnails (3:4 frame, same gradient as product cards). Children animate in with `y: 10 → 0` + `opacity: 0 → 1`, staggered by 0.04s. Exit animates `y: 0 → -8` over 300ms.
- **Mobile drawer:** full-screen overlay (`fixed inset-0 z-40 bg-[#faf9f6]`), vertically stacked uppercase labels, language buttons at bottom.

### Signature Component: The Wordmark

The decorative serif "Mr. Okay" set in Blacksword is the signature visual element. It must always appear:
- Letter-spacing: `0`
- Weight: 400
- Color: `ink-primary` on cream surfaces, `ink-inverse` (`#ffffff`) on dark image overlays
- Never italicized further, never tracked out, never paired with other Blacksword text on the same screen.

## 6. Do's and Don'ts

### Do
- **Do** use `surface-primary` (`#faf9f6`) as the page background on every new route. Cream is the default.
- **Do** invert hover states (ink↔cream) rather than introducing new hover colors.
- **Do** keep all buttons, inputs, cards, modals, and frames square (`border-radius: 0`). Circular shape is reserved for social-media icon medallions only.
- **Do** use the label typography (Helvetica Neue, uppercase, 0.092em letter-spacing, 13px) for every CTA, nav link, badge, and pretitle.
- **Do** use the single ease curve `cubic-bezier(0.23, 1, 0.32, 1)` for motion. Pick a duration from {300ms color, 500ms image, 700ms scale, 800ms entrance}. Don't invent intermediates.
- **Do** lift elements with tonal layering (`#ffffff` over cream) or hairline borders (`1px rgba(0,0,0,0.1)`), not shadows.
- **Do** cap body copy line length at 65–75ch.
- **Do** respect `prefers-reduced-motion: reduce` on every Framer Motion animation, scroll-reveal, magnetic-button, and parallax (PRODUCT.md WCAG AAA target).

### Don't
- **Don't** introduce a brand accent color (no magenta, no gold, no teal, no Trendyol red). The site is two-tone. If a future variant needs an accent, it goes through a documented exception, not a stylesheet diff.
- **Don't** use Chanel-era lux clichés: gold scrollwork, marble texture, italic script "gilded" headlines, "şarap-bordo + altın" palettes. Anti-reference from PRODUCT.md.
- **Don't** add generic Turkish e-com chrome: red discount badges, popup timers, "stoklar tükeniyor" overlays, sayaçlı promo banners, çapraz-satış grids. Anti-reference from PRODUCT.md.
- **Don't** import SaaS-cream + dijital-luxury hybrid styling: soft gradient cards, neutral-purple AI palettes, "modern startup" `rounded-2xl` everything. Anti-reference from PRODUCT.md.
- **Don't** use `background-clip: text` with a gradient. The current `.text-gradient-silver` utility in `globals.css` violates the absolute ban on gradient text and must be removed; do not extend it.
- **Don't** use glassmorphism (`backdrop-filter: blur`). The `.glass` / `.glass-light` utilities in `globals.css` should be deleted on next refactor; do not add new uses.
- **Don't** use `box-shadow` for elevation. None exists today; none should be added.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent on any card, list item, callout, or alert. Side-stripe borders are absolutely banned.
- **Don't** title-case CTAs ("Discover Now"). Labels are uppercase with letter-spacing. Title-case reads as e-commerce default template.
- **Don't** add a focus state that's only a border-color shift. Current inputs fail keyboard-visibility AAA; replace with a 2px `outline-offset: 2px` ring in `ink-primary` on focus (planned remediation, not yet in code).
- **Don't** mix `#FFFFFF` and `#faf9f6` randomly. White is reserved for inverted CTAs, newsletter input fill, and product-frame highlights. Everywhere else, the answer is cream.
- **Don't** rely on `font-serif` (Playfair Display) alone for the wordmark. The wordmark is Blacksword; Playfair is the working headline serif only.
- **Don't** use em-dashes in UI copy. Use commas, colons, periods, or parentheses (Impeccable shared rule).

### Drift to Remediate

The codebase has three known token drifts. Document them now; address in a separate `/impeccable polish` or refactor pass.

1. `globals.css` declares `--white: #FFFFFF`, `--silver: #C0C0C0`, `--silver-light: #D4D4D4`, `--silver-dark: #8B8B8B`, but `tailwind.config.ts` collapses all three silver shades to `#686868` and the actual surface is `#faf9f6`. Source of truth: this DESIGN.md and the Tailwind config. Migrate `globals.css` `:root` to match.
2. The `body` rule in `globals.css` sets `background-color: var(--white)` (= `#FFFFFF`); the actual body class in `layout.tsx` is `bg-[#faf9f6]`. Tailwind wins, but the `:root` should be corrected to `--surface-primary: #faf9f6` and the body rule updated.
3. `.text-gradient-silver` and `.glass` / `.glass-light` utilities remain in `globals.css` but conflict with the design system (gradient text ban, glassmorphism anti-reference). Remove on next cleanup pass; do not add new call sites.
