Death Beach main music production page re-write (index.js and there is also a version under the project - both are the same). Follow layout instructions as they happen and reference the current/old layout as noted for things like playlists, videos, images.

Append a full implementation plan to the bottom of this document with checklist/todo's to track progress.

In the ### Products & Crypto section
• Charon should link to the Charon project page
• Charon Wallet link to Charon Wallet project page
• Charon Loyalty link to my repo https://github.com/death-beach/sas-loyalty-starter
• P00LS link to P00LS on project page
• Brewery Management System link to https://www.burningbeardbrewing.com/
• Content Series link to Content project page

# Death Beach (_centered_)

### Music Production, Engineering, & Mixing • Vibe Coding • Product & Crypto (_centered_)

You carry entire worlds inside you.

Sounds that hit deeper than words alone ever could. Layers that wrap around your soul and refuse to let go. Moments so raw they crack you open and make whoever hears it feel everything right along with you. Lyrics and music dripping into the ear of fans offering a world for them to live in.

You don’t want these sounds “recorded.” You want them felt. Alive, haunting, honest.

I live to help you set those worlds free.

I’m Death Beach. I’ve been right where you are obsessing over tone, frequencies, and vibration since I was a kid, teaching myself everything I could get my hands on because the hunger wouldn’t let me stop. I poured my life into bands, chasing that electric, alive feeling on stage. Our biggest night with Fing was opening for The Damned at the Casbah, and that same fire still drives every single thing I do.

That path took me from studio intern at Capricorn Studios (learning from Bryan Stratman) to producing full-length albums from the ground up writing, tracking, sound design, the whole thing. I’ve worked in places like Studio West, Rarefied Recording, and Capricorn Studios in San Diego, but I’m just as comfortable (and usually more inspired) in a desert Airbnb, a hotel room, or someone’s remote house. The setting doesn’t matter. The feeling does.

That same raw spirit once turned an LA songwriting camp into pure magic when 11 of us crammed into my Airbnb room, recording while the whole place erupted in screams and cheers over the best improvised lines.

I blend raw, unfiltered performances with obsessive attention to detail so the final record — or the final product — becomes a place you (and your people) can completely lose yourselves in.

---

## What I Build

### For Artists & Bands

Immersive full-length albums and sonic worlds that actually haunt listeners. Deep, long-form creative partnerships where character always wins over perfection.

###For Brands, Founders & Crypto Projects
Vibe-coded products, on-chain tools, and digital experiences that don’t just work — they feel alive. Same obsession with resonance, frequency, and soul.

---

## Experience the Worlds

### Listen to the Vibe

Curated sonic environments.
_Put the playlists here, side by side desktop/stacked on mobile just like they are now_

### Watch

_Put the youtube links here, side by side desktop/stacked on mobile just like they are now_

_Put the images here, side by side desktop/stacked on mobile just like they are now_

---

## Selected Worlds I’ve Helped Create

### Music

• Five song EP under the open sky in Joshua Tree with Marc Oliver
• Multi-location album journey with Choirs (Bakersfield to San Diego studios)
• Assisting Ulrich Wilde on Psychotic Waltz in studio
• Full production with the Dope Jackets

### Products & Crypto

• Charon – POS for stablecoins
• Charon Wallet - wallet for merchants, 2FA, swaps
• Charon Loyalty – onchain rewards on Solana
• P00LS – creator token platform
• Brewery Management System – full vibe coded operations tool in development with Burning Beard Brewing
• Content Series – education + entertainment pieces

---

## Still in the Trenches

Helping run the Sound Economy community with Mickey Shiloh. Building real tools and support for independent creators who want their art (and their business) to live and breathe.

---

## Let’s Build Something That Lives

Whether you’re a band with a record that needs to breathe, a founder with a product that needs to feel right, or a project that lives at the intersection of sound, code, and culture…
Reach out.
San Diego or anywhere in the world.
[Contact button] (_links to contact page_)

---

# Implementation Plan

## Overview

Rewrite `pages/index.js` as a standalone, long-form landing page matching the layout defined above. Update `pages/[slug].js` to redirect the `production` slug to `/` so the Music square on the Projects page continues to work. No changes to `Hero.js`, `data/projects.js`, or `pages/projects/index.js`.

---

## Files to Change

| File                      | Change                                                  |
| ------------------------- | ------------------------------------------------------- |
| `pages/index.js`          | Full rewrite — standalone long-form landing page        |
| `pages/[slug].js`         | Add redirect: if slug === `production`, redirect to `/` |
| `Hero.js`                 | No change                                               |
| `data/projects.js`        | No change                                               |
| `pages/projects/index.js` | No change                                               |

---

## pages/index.js — New Layout (top to bottom)

### 1. `<Hero />` component

- Render unchanged at the top (logo, nav, social icons)

### 2. Page Header (centered)

- `<h1>` → **Death Beach**
- `<h3>` → **Music Production, Engineering, & Mixing • Vibe Coding • Product & Crypto**

### 3. Intro Copy Block

- Render all body paragraphs from the doc verbatim:
  - "You carry entire worlds inside you…"
  - "Sounds that hit deeper…"
  - "You don't want these sounds 'recorded.'…"
  - "I live to help you set those worlds free."
  - "I'm Death Beach…" (full bio paragraph)
  - "That path took me from studio intern…"
  - "That same raw spirit once turned an LA songwriting camp…"
  - "I blend raw, unfiltered performances…"
- Style: readable body text, max-width container, centered on page

### 4. `---` Divider

### 5. "What I Build" Section

- `<h2>` → **What I Build**
- `<h3>` → **For Artists & Bands** + body copy
- `<h3>` → **For Brands, Founders & Crypto Projects** + body copy

### 6. `---` Divider

### 7. "Experience the Worlds" Section

- `<h2>` → **Experience the Worlds**

#### Listen to the Vibe

- `<h3>` → **Listen to the Vibe**
- Subtext: "Curated sonic environments."
- **2-column grid desktop / 1-column stacked mobile**
  - Left: Spotify embed (reuse `customContent.spotifyEmbed` from `data/projects.js`)
  - Right: SoundCloud embed (reuse `customContent.soundcloudEmbed`)
  - Height: 352px each, matching current layout

#### Watch

- `<h3>` → **Watch**
- **2-column grid desktop / 1-column stacked mobile**
  - Render both YouTube iframes from `customContent.youtubeVideos`
  - Height: 315px each, matching current layout

#### Images

- **3-column grid desktop / 1-column stacked mobile**
  - Render the 3 production images from `images` array in `data/projects.js`
  - Clickable → lightbox modal (same expand/close behavior as current)

### 8. `---` Divider

### 9. "Selected Worlds I've Helped Create" Section

- `<h2>` → **Selected Worlds I've Helped Create**

#### Music (text-only bullets)

- `<h3>` → **Music**
- Five song EP under the open sky in Joshua Tree with Marc Oliver
- Multi-location album journey with Choirs (Bakersfield to San Diego studios)
- Assisting Ulrich Wilde on Psychotic Waltz in studio
- Full production with the Dope Jackets

#### Products & Crypto (hyperlinked bullets)

- `<h3>` → **Products & Crypto**
- [Charon](http://localhost:3000/charon) – POS for stablecoins → links to `/charon`
- [Charon Wallet](/charon-wallet) – wallet for merchants, 2FA, swaps → links to `/charon-wallet`
- [Charon Loyalty](https://github.com/death-beach/sas-loyalty-starter) – onchain rewards on Solana → external link
- [P00LS](/pools) – creator token platform → links to `/pools`
- [Brewery Management System](https://www.burningbeardbrewing.com/) – full vibe coded operations tool → external link
- [Content Series](/content) – education + entertainment pieces → links to `/content`
- All external links open in new tab (`target="_blank" rel="noopener noreferrer"`)
- Internal links use Next.js `<Link>`

### 10. `---` Divider

### 11. "Still in the Trenches" Section

- `<h2>` → **Still in the Trenches**
- Body copy with Sound Economy hyperlinked:
  - "Helping run the [Sound Economy](https://www.skool.com/soundeconomy/about) community with Mickey Shiloh. Building real tools and support for independent creators who want their art (and their business) to live and breathe."

### 12. `---` Divider

### 13. "Let's Build Something That Lives" Section

- `<h2>` → **Let's Build Something That Lives**
- Body copy verbatim from doc
- **Contact button** → Next.js `<Link href="/contact">` styled as a button (matching site aesthetic: dark bg, white text, subtle border)

---

## pages/[slug].js — Redirect for `production`

- In `getStaticProps`, if `params.slug === "production"`, return a redirect to `/` instead of rendering the page:
  ```js
  if (params.slug === "production") {
    return { redirect: { destination: "/", permanent: false } };
  }
  ```
- This keeps the Music square on the Projects page functional (it links to `/`) while preventing a duplicate page at `/production`

---

## Styling Notes

- Maintain existing dark theme: `backgroundColor: "#0f0f0f"`, `color: "#ffffff"`
- Font: `'Hanken Grotesk', sans-serif` throughout
- Max content width: `1152px`, centered with `margin: 0 auto`
- Section padding: `48px 16px`
- Dividers: `<hr>` styled with subtle color (`#333` or similar)
- Responsive breakpoint: `768px` (mobile stacks, desktop side-by-side)
- Lightbox modal: reuse existing expand/close pattern from current `index.js`

---

## Implementation Checklist

- [ ] Rewrite `pages/index.js` — Hero + header section
- [ ] Add intro copy block to `pages/index.js`
- [ ] Add "What I Build" section to `pages/index.js`
- [ ] Add "Experience the Worlds" section — Spotify + SoundCloud embeds (side-by-side / stacked)
- [ ] Add "Watch" subsection — YouTube iframes (side-by-side / stacked)
- [ ] Add images grid with lightbox modal
- [ ] Add "Selected Worlds" section — Music bullets (text-only)
- [ ] Add "Selected Worlds" section — Products & Crypto bullets (hyperlinked)
- [ ] Add "Still in the Trenches" section with Sound Economy hyperlink
- [ ] Add "Let's Build Something That Lives" section with Contact button
- [ ] Update `pages/[slug].js` — add redirect for `production` slug → `/`
- [ ] Verify responsive layout (desktop 2-col/3-col grids, mobile stacked)
- [ ] Verify all internal links route correctly
- [ ] Verify all external links open in new tab
- [ ] Smoke test: Projects page Music square still links to `/`
