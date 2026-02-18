# Death Beach Homepage — Design Plan

## Overview

Full design pass on `pages/index.js`. The goal is a page that feels dark, mysterious, emotional, and visually alive — raw and real, not polished and corporate. Every layout decision serves the "worlds that live" thread.

**Stack:** Next.js, inline styles + `<style jsx>`, no Tailwind on this page.  
**Image CDN:** `https://cdn.jsdelivr.net/gh/death-beach/portfolio-images/`  
**Image repo:** https://github.com/death-beach/portfolio-images

---

## Image Assets (CDN URLs)

| Use                 | Filename             | Full URL                                                                        |
| ------------------- | -------------------- | ------------------------------------------------------------------------------- |
| Hero background     | `hero_image (1).png` | `https://cdn.jsdelivr.net/gh/death-beach/portfolio-images/hero_image%20(1).png` |
| Bio split — image 1 | `1_350.png`          | `https://cdn.jsdelivr.net/gh/death-beach/portfolio-images/1_350.png`            |
| Bio split — image 2 | `2_350.png`          | `https://cdn.jsdelivr.net/gh/death-beach/portfolio-images/2_350.png`            |
| Bio split — image 3 | `3_350.png`          | `https://cdn.jsdelivr.net/gh/death-beach/portfolio-images/3_350.png`            |

---

## Color Palette

| Name          | Hex       | Usage                                               |
| ------------- | --------- | --------------------------------------------------- |
| Hot Pink      | `#f00c6f` | Primary accent — most section titles, card borders  |
| Electric Blue | `#12abff` | Secondary accent — "What I Build" card border, tint |
| Deep Blue     | `#0c72cf` | Supporting blue                                     |
| Magenta       | `#dd11b0` | Gradient partner with hot pink                      |
| Base Black    | `#0f0f0f` | Page background                                     |
| Dark Charcoal | `#1a1a1a` | Card backgrounds, Hero bg                           |
| Light Gray    | `#d1d5db` | Body text                                           |
| Dimmer Gray   | `#9ca3af` | Subtext, captions                                   |

### Section Background Tints (replaces `<hr>` dividers)

| Section               | Background                 |
| --------------------- | -------------------------- |
| Intro / Bio split     | `#0f0f0f` (base)           |
| What I Build          | `rgba(18, 171, 255, 0.05)` |
| Experience the Worlds | `#0f0f0f`                  |
| Selected Worlds       | `rgba(240, 12, 111, 0.05)` |
| Still in the Trenches | `#0f0f0f`                  |
| Let's Build (CTA)     | `rgba(221, 17, 176, 0.04)` |

### Section Title Colors

| Section                              | Style                                                |
| ------------------------------------ | ---------------------------------------------------- |
| "Death Beach" (h1)                   | White — `#ffffff`                                    |
| "What I Build"                       | Solid `#f00c6f`                                      |
| "Experience the Worlds"              | Gradient `#f00c6f → #dd11b0` (this gets the big pop) |
| "Selected Worlds I've Helped Create" | Solid `#f00c6f`                                      |
| "Still in the Trenches"              | Solid `#f00c6f`                                      |
| "Let's Build Something That Lives"   | Gradient `#12abff → #f00c6f`                         |

---

## Global Layout Rules

- **Content container:** `max-width: 860px; margin: 0 auto; padding: 0 16px;`
  - This fixes every width-jump issue. All sections use this same container.
- **Section padding:** `80px 0` (top and bottom) for breathing room between sections
- **Responsive breakpoint:** `768px` — mobile stacks everything

---

## Page Structure (top to bottom)

---

### Section 1 — Hero (full-bleed)

**Purpose:** Instant visual impact. Eye-catching before a single word is read.

**Layout:**

- Full-width, no container limit
- Background: `hero_image (1).png` from CDN, `object-fit: cover`, with a dark overlay (`rgba(0,0,0,0.55)`) so text pops
- Content centered on top of image
- Keep existing Hero component (logo, nav, social icons) above this

**Content (centered, on top of bg image):**

```
[Logo + Nav — existing Hero component]

Your wildest ideas deserve to exist as your legacy.
I make sure they don't just stay dreams.

# Death Beach

Music Production, Engineering, & Mixing • Vibe Coding • Product & Crypto
```

**Notes:**

- The existing `<Hero />` component (nav bar) stays at the very top
- The full-bleed hero image section sits directly below it
- Text uses white with a subtle text-shadow for legibility over the image

---

### Section 2 — Bio Split (860px container)

**Purpose:** Emotional connection. People see you in the rooms right next to your story.

**Desktop layout (two columns):**

- Left (~58%): Full bio text
- Right (~42%): Vertical stack of 3 in-studio photos

**Left column — text:**

```
# Death Beach  (h1, white)
### Music Production, Engineering, & Mixing • Vibe Coding • Product & Crypto  (h3, #d1d5db)

[All bio paragraphs:]
You carry entire worlds inside you.
Sounds that hit deeper than words alone ever could...
You don't want these sounds "recorded." You want them felt...
I live to help you set those worlds free.
I'm Death Beach. I've been right where you are...
That path took me from studio intern at Capricorn Studios...
That same raw spirit once turned an LA songwriting camp...
I blend raw, unfiltered performances...
```

**Right column — images:**

- `1_350.png` (top)
- `2_350.png` (middle)
- `3_350.png` (bottom)
- Each image: `width: 100%`, `border-radius: 8px`, `box-shadow: 0 0 0 1px rgba(240, 12, 111, 0.2)` (subtle pink border glow)
- Gap between images: `16px`

**Mobile layout (stacked):**

1. "Death Beach" h1 + subtitle
2. First photo (`1_350.png`)
3. Full bio text
4. Second photo (`2_350.png`)
5. Third photo (`3_350.png`)

---

### Section 3 — What I Build (full-width bg tint, 860px container)

**Purpose:** Clear value proposition for both audiences.

**Background:** `rgba(18, 171, 255, 0.05)` — very subtle blue tint, full-width
**Section padding:** `80px 16px`

**Title:** `## What I Build` — color `#f00c6f`, centered

**Layout:** Two cards side-by-side (desktop) / stacked (mobile)

**Card style:**

- Background: `#1a1a1a`
- Border: `1px solid #333`
- Left accent border: `4px solid [accent color]`
  - Card 1 (For Artists & Bands): `#12abff`
  - Card 2 (For Brands, Founders & Crypto): `#f00c6f`
- Border-radius: `12px`
- Padding: `32px`
- Max-width of card grid: `860px`, centered

**Card 1 — For Artists & Bands:**

- Title: `#ffffff`, `font-size: 20px`, `font-weight: 600`
- Body: `#d1d5db`, `font-size: 16px`, `line-height: 1.8`
- Content: "Immersive full-length albums and sonic worlds that actually haunt listeners. Deep, long-form creative partnerships where character always wins over perfection."

**Card 2 — For Brands, Founders & Crypto Projects:**

- Same style, accent border `#f00c6f`
- Content: "Vibe-coded products, on-chain tools, and digital experiences that don't just work — they feel alive. Same obsession with resonance, frequency, and soul."

---

### Section 4 — Experience the Worlds (860px container)

**Purpose:** The emotional payoff — let them feel the work.

**Background:** `#0f0f0f` (base)
**Section padding:** `80px 16px`

**Title:** `# Experience the Worlds` — **h1**, gradient text `#f00c6f → #dd11b0`

```css
background: linear-gradient(90deg, #f00c6f, #dd11b0);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

**Subsection: Listen to the Vibe**

- `h3` — white, `font-size: 24px`
- Italic subtext: "Curated sonic environments." — `#9ca3af`
- 2-column grid desktop / 1-column mobile
  - Left: Spotify embed (352px height)
  - Right: SoundCloud embed (352px height)

**Subsection: Watch**

- `h3` — white, `font-size: 24px`
- 2-column grid desktop / 1-column mobile
  - Both YouTube iframes (315px height each)

> Note: The 3 studio photos are now used in the Bio Split above, so this section stays focused on audio + video only.

---

### Section 5 — Selected Worlds I've Helped Create (full-width bg tint, 860px container)

**Purpose:** Proof of work — music and product/crypto.

**Background:** `rgba(240, 12, 111, 0.05)` — very subtle pink tint, full-width
**Section padding:** `80px 16px`

**Title:** `## Selected Worlds I've Helped Create` — color `#f00c6f`, centered

**Layout:** Two cards side-by-side (desktop) / stacked (mobile)

**Card style:** Same as "What I Build" cards

- Card 1 (Music): left accent border `#12abff`
- Card 2 (Products & Crypto): left accent border `#f00c6f`

**Bullet hanging indent fix (CSS):**

```css
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  padding-left: 1.2em;
  text-indent: -1.2em;
  line-height: 2;
  color: #d1d5db;
  font-size: 16px;
}
```

This makes wrapped text align under the first word, not the bullet.

**Card 1 — Music (text-only):**

- • Five song EP under the open sky in Joshua Tree with Marc Oliver
- • Multi-location album journey with Choirs (Bakersfield to San Diego studios)
- • Assisting Ulrich Wilde on Psychotic Waltz in studio
- • Full production with the Dope Jackets

**Card 2 — Products & Crypto (hyperlinked):**

- • [Charon](/charon) – POS for stablecoins
- • [Charon Wallet](/charon-wallet) – wallet for merchants, 2FA, swaps
- • [Charon Loyalty](https://github.com/death-beach/sas-loyalty-starter) – onchain rewards on Solana _(external, new tab)_
- • [P00LS](/pools) – creator token platform
- • [Brewery Management System](https://www.burningbeardbrewing.com/) – full vibe coded operations tool in development with Burning Beard Brewing _(external, new tab)_
- • [Content Series](/content) – education + entertainment pieces

All link styles: `color: #d1d5db; text-decoration: underline;`

---

### Section 6 — Still in the Trenches (860px container)

**Background:** `#0f0f0f`
**Section padding:** `80px 16px`

**Title:** `## Still in the Trenches` — color `#f00c6f`, centered

**Body (centered, max-width 600px):**
"Helping run the [Sound Economy](https://www.skool.com/soundeconomy/about) community with Mickey Shiloh. Building real tools and support for independent creators who want their art (and their business) to live and breathe."

Sound Economy link: `color: #d1d5db; text-decoration: underline;`, opens in new tab.

---

### Section 7 — Let's Build Something That Lives (full-width bg tint, 860px container)

**Background:** `rgba(221, 17, 176, 0.04)` — very subtle magenta tint, full-width
**Section padding:** `80px 16px`

**Title:** `## Let's Build Something That Lives` — gradient `#12abff → #f00c6f`, centered

**Body (centered, max-width 600px):**
"Whether you're a band with a record that needs to breathe, a founder with a product that needs to feel right, or a project that lives at the intersection of sound, code, and culture…
Reach out.
San Diego or anywhere in the world."

**Contact button:**

- `<Link href="/contact">`
- Style: `border: 1px solid #ffffff; padding: 14px 40px; border-radius: 4px; color: #ffffff; background: transparent;`
- Hover: subtle glow or background fill (optional enhancement)

---

## Implementation Checklist

### Setup

- [ ] Set global content container to `max-width: 860px` (replaces current 1152px)
- [ ] Remove all `<hr>` dividers — replace with section background tints

### Section 1 — Hero

- [ ] Add full-bleed hero image section below `<Hero />` component
- [ ] Use `hero_image (1).png` from CDN as background (`object-fit: cover`)
- [ ] Add dark overlay (`rgba(0,0,0,0.55)`) for text legibility
- [ ] Center "Death Beach" h1 + subtitle text over the image with text-shadow

### Section 2 — Bio Split

- [ ] Build two-column split layout (58% text / 42% images)
- [ ] Left: "Death Beach" h1 + subtitle + all bio paragraphs
- [ ] Right: vertical stack of `1_350.png`, `2_350.png`, `3_350.png` with pink border glow
- [ ] Mobile: stack as h1 → photo 1 → bio text → photo 2 → photo 3
- [ ] Remove images from "Experience the Worlds" section (now used in bio split)

### Section 3 — What I Build

- [ ] Add `rgba(18, 171, 255, 0.05)` full-width background tint
- [ ] Style section title `#f00c6f`
- [ ] Build two cards with `#1a1a1a` bg, `1px solid #333` border, `12px` radius
- [ ] Card 1: `4px solid #12abff` left accent border
- [ ] Card 2: `4px solid #f00c6f` left accent border
- [ ] Stack cards on mobile

### Section 4 — Experience the Worlds

- [ ] Promote to `h1` tag
- [ ] Apply gradient text `#f00c6f → #dd11b0`
- [ ] Keep Spotify + SoundCloud embeds (2-col / stacked)
- [ ] Keep YouTube iframes (2-col / stacked)
- [ ] Remove images grid (photos moved to bio split)

### Section 5 — Selected Worlds

- [ ] Add `rgba(240, 12, 111, 0.05)` full-width background tint
- [ ] Style section title `#f00c6f`
- [ ] Build two cards (same style as What I Build)
- [ ] Card 1 (Music): `4px solid #12abff` left accent, text-only bullets
- [ ] Card 2 (Products & Crypto): `4px solid #f00c6f` left accent, hyperlinked bullets
- [ ] Apply hanging indent CSS fix to all bullet lists

### Section 6 — Still in the Trenches

- [ ] Style section title `#f00c6f`
- [ ] Sound Economy hyperlinked, opens in new tab

### Section 7 — Let's Build (CTA)

- [ ] Add `rgba(221, 17, 176, 0.04)` full-width background tint
- [ ] Apply gradient text `#12abff → #f00c6f` to section title
- [ ] Keep Contact button as-is

### Final QA

- [ ] Verify all section backgrounds render correctly (full-width, not clipped to container)
- [ ] Verify all internal links route correctly (`/charon`, `/charon-wallet`, `/pools`, `/content`)
- [ ] Verify all external links open in new tab
- [ ] Verify responsive layout on mobile (all grids stack, bio split stacks correctly)
- [ ] Verify hero image loads from CDN
- [ ] Verify 3 bio images load from CDN
- [ ] Verify lightbox modal removed (images now in bio split, not clickable grid)
- [ ] Smoke test: Projects page Music square still links to `/`
