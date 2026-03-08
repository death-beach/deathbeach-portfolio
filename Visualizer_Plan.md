# MediaSingularity: Visual Album Experience

## 🎯 The Product

A **visual album site** — not just a music player, but a web-native equivalent of vinyl with liner notes and artwork, but interactive and alive. Each track plays with its own custom-designed 3D world that reacts to the music in real-time.

**What You Get:** A standalone Next.js site that musicians can deploy in minutes. Each track has its own visual identity. The experience transforms as the album plays.

**Target Audience:** Musicians who want to create immersive, memorable listening experiences for their releases. No coding required — just configuration and deployment.

---

## 💼 Service Tiers

| Tier             | What They Get                                        | Your Time | Price |
| ---------------- | ---------------------------------------------------- | --------- | ----- |
| **DIY**          | Fork the repo + README walkthrough                   | 0 hrs     | Free  |
| **Guided Setup** | 2-hr call: fork, configure, deploy, pick their style | 2 hrs     | $X    |
| **Full Custom**  | You build their MediaSingularity + full setup        | 4-6 hrs   | $X    |

---

## 🎨 Customization Layers

### 1. Media Type (Per-Track)

Each track chooses its media format:

- **3D Reactive**: Audio-reactive Three.js visualizer that responds to music frequencies
- **Video**: Full AI-generated music video with baked-in audio
- **Custom**: Any combination — you can build unique experiences per track

### 2. 3D Visualizer (For 3D Tracks)

The audio-reactive backdrop. Artists can choose from:

- **Preset options**: singularity (orbital rings), nebula (particle cloud), waveform (frequency bars), minimal (core sphere)
- **Custom scenes**: Unlimited — each track can have its own unique Three.js scene built to their specifications

### 3. Player Skin

The HUD/control styling:

- **glass**: Semi-transparent, modern
- **brutalist**: Bold borders, high contrast
- **retro-terminal**: Monospace fonts, green-on-black
- **minimal**: Clean, subtle

### 4. Lyric Font

Typography for the CC lyrics feed:

- **grotesque**: Sans-serif, modern
- **serif**: Classic, elegant
- **mono**: Technical, retro
- **handwritten**: Organic, personal
- **condensed**: Bold, impactful

---

## 🌐 Deployment Options

### Primary Options (Recommended for 95% of Artists)

#### Option 1: Standalone Album Site

- Deploy to `albumname.com` or `album-name.vercel.app`
- Artist buys a dedicated domain (~$12/year from Namecheap)
- Fully self-contained experience
- Store works perfectly (Stripe Payment Links)

#### Option 2: Album Subdomain

- Deploy to `albumname.artistname.com`
- Artist already has a main website
- Just add a CNAME record in their DNS (points to Vercel)
- Store works identically (Stripe Payment Links)
- Links seamlessly from their main site

### Advanced Option (For Developers)

#### Option 3: Page on Existing Next.js Site

- Copy components into their existing Next.js application
- Requires technical setup and Next.js knowledge
- Not recommended for most musicians

---

## 🛒 Commerce & SSL

### SSL (Automatic)

**Vercel handles SSL automatically.** When deployed to Vercel (free tier), SSL certificates are provisioned and renewed automatically on every domain — including custom domains. Musicians buy a domain (e.g. `bandname.com` from Namecheap for ~$12/yr), point DNS to Vercel, and HTTPS is live within minutes. Zero work required.

### Commerce (Stripe Payment Links)

The album micro-site includes a **Buy** section with Stripe Payment Links — zero custom code needed. Artists create products in their Stripe account, generate payment links, and paste the URLs into the config.

#### For Digital Downloads (MP3s)

- Stripe Payment Links support digital delivery
- After payment, redirect to download URL (hosted in `/public/audio/`)
- Or integrate with services like SendOwl/Gumroad for automated email delivery

#### For Physical Products (CDs, Vinyl, etc.)

- Enable "Require shipping address" in the payment link settings
- Stripe collects buyer name, email, and shipping address
- Artist receives email notification with order details and address
- Artist ships manually (local bands, quick turnaround)

#### Record-Keeping

Stripe automatically captures and stores:

- Customer name + email + shipping address (if physical)
- Product purchased + price
- Transaction ID + timestamp
- Email receipts sent to buyer

Artists log into Stripe dashboard for:

- Sales reports and analytics
- Customer export (CSV)
- Email notifications for new orders

#### Config Structure

```js
// In playlist.config.js:
shop: {
  enabled: true,
  products: [
    {
      label: "Download MP3",
      price: "$9.99",
      stripeLink: "https://buy.stripe.com/xxx",
      type: "digital", // or "physical"
    },
    {
      label: "Physical CD",
      price: "$14.99 + shipping",
      stripeLink: "https://buy.stripe.com/yyy",
      type: "physical",
    },
  ],
},
```

Artists create their own Stripe Payment Links in their account, paste URLs into config. The site renders "Buy Now" buttons that link out to Stripe. No Stripe keys needed in the repo — Stripe handles everything on their end.

---

## 🖥️ UI Layout (Full Viewport)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│              MEDIASINGULARITY (full screen)             │
│                   3D VISUALIZER                         │
│                                                         │
│                                                         │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  LYRICS FEED (slide up / CC toggle)               │  │
│  │  "line by line, synced or scrolling..."           │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  [◀◀] [▶] [▶▶]  ───waveform────────────────  [CC] ││
│  │  Track Title · Artist  · 01/03  [≡ playlist]        ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Bottom HUD (Always Visible, Fixed)

- **Prev / Play-Pause / Next** controls
- **WaveSurfer waveform** (seekable, shows progress)
- **Track info**: "Track Title · Artist · 01/03"
- **[CC] button** — toggles lyrics panel slide-up
- **[≡] button** — slides up playlist drawer

### Lyrics Panel (Slide-Up Overlay)

- Semi-transparent dark panel above HUD
- Scrollable text feed
- Supports **timed lyrics** (karaoke-style, current line highlighted) OR **static lyrics block**
- Dismiss with [CC] button or click outside

### Playlist Drawer (Slide-Up Overlay)

- Compact track list: number, title, duration
- Active track highlighted
- Click to switch tracks
- Dismiss with [≡] button or click outside

---

## 📁 Repo Structure

```
singularity-player/
├── data/
│   └── playlist.config.js       ← THE ONLY FILE a musician needs to edit
├── components/
│   ├── MediaEngine.jsx           ← Unified 3D/video component
│   ├── MediaSingularity.jsx      ← 3D visualizer (accepts theme colors as props)
│   ├── CustomWavePlayer.js       ← WaveSurfer waveform player
│   ├── PlayerHUD.jsx             ← Bottom control bar
│   ├── LyricsFeed.jsx            ← CC-style lyrics panel
│   └── PlaylistDrawer.jsx        ← Slide-up track list
├── pages/
│   ├── index.js                  ← The full-screen player page
│   └── configure.js              ← Form UI for artists (dev only)
├── public/
│   ├── audio/                    ← Drop MP3s for 3D tracks
│   └── video/                    ← Drop MP4s for video tracks
└── README.md                     ← "How to add your tracks"
```

---

## 🎛️ playlist.config.js Schema

This is the **single file** musicians edit to customize their player:

```js
export const config = {
  // Album info
  artist: "Your Name",
  albumTitle: "Your Album Name", // optional

  // Global visual theme
  theme: {
    color1: "#f00c6f", // primary accent (rings, progress bar)
    color2: "#12abff", // secondary accent
    background: "#0a0a0a",
  },

  // Player skin (HUD styling)
  playerSkin: "glass", // "glass", "brutalist", "retro-terminal", "minimal"

  // Lyric font
  lyricFont: "grotesque", // "grotesque", "serif", "mono", "handwritten", "condensed"

  // Playback settings
  autoAdvance: true, // auto-play next track when current finishes

  // Your tracks (mix 3D reactive tracks with video tracks!)
  tracks: [
    {
      title: "Neon Bleed",
      mediaType: "3d", // 3D reactive visualizer
      url: "/audio/neon-bleed.mp3", // MP3 for 3D tracks
      visualizer: "singularity", // only used for 3D: "singularity", "nebula", "waveform", "minimal", "custom"
      lyrics: [
        { time: 0, text: "Visceral drum architecture..." },
        { time: 12, text: "Meets haunting, unfiltered vocal production..." },
        {
          time: 25,
          text: "It is a sonic ecosystem designed to crack you open...",
        },
        { time: 35, text: "And leave a lasting mark." },
      ],
    },
    {
      title: "Desert Transmission",
      mediaType: "video", // Full AI-generated music video
      url: "/video/desert-transmission.mp4", // MP4 with baked-in audio + video
      poster: "/images/desert-poster.jpg", // Optional loading image
      // No visualizer needed — the video IS the visual
      lyrics:
        "A brooding, frequency-rich descent into analog synthesis and digital precision. This track strips away the static to leave pure, vibrating emotion.",
    },
    {
      title: "Ghost Static",
      mediaType: "3d", // Back to 3D for this track
      url: "/audio/ghost-static.mp3",
      visualizer: "custom", // You build this one for them
      lyrics: [
        { time: 0, text: "Static fills the air..." },
        { time: 10, text: "Ghosts in the machine..." },
        { time: 20, text: "Digital hauntings..." },
      ],
    },
  ],
};
```

---

## 🔧 Component Architecture

### MediaSingularity.jsx (3D Visualizer)

- **Props**: `audioDataRef`, `color1`, `color2`, `position`
- **Features**: Core sphere, orbital rings, particle system
- **Audio Response**: Rings glow based on frequency bands, particles rotate based on high frequencies
- **Themeable**: Colors passed as props instead of hardcoded

### CustomWavePlayer.js (Waveform Player)

- **Props**: `audioUrl`, `onAudioData`, `onResize`, `isActive`
- **Features**: WaveSurfer.js waveform, play/pause, seeking
- **Audio Analysis**: Web Audio API analyser feeds frequency data to visualizer
- **State**: Only one player active at a time (prevents double-playing)

### PlayerHUD.jsx (Bottom Control Bar)

- **Props**: `currentTrack`, `isPlaying`, `onPlayPause`, `onPrev`, `onNext`, `onToggleLyrics`, `onTogglePlaylist`
- **Features**: Transport controls, waveform display, track info, CC/playlist buttons
- **Layout**: Fixed bottom, full width, semi-transparent

### LyricsFeed.jsx (CC Panel)

- **Props**: `lyrics`, `currentTime`, `isVisible`, `onClose`
- **Features**: Slide-up animation, timed lyric highlighting, static text scrolling
- **Logic**: If lyrics is array → timed karaoke; if string → static block

### PlaylistDrawer.jsx (Track List)

- **Props**: `tracks`, `currentTrackIndex`, `onTrackSelect`, `isVisible`, `onClose`
- **Features**: Slide-up animation, track list with durations, active track highlight
- **Interaction**: Click track to switch playback

### pages/player.js (Main Page)

- **State Management**: Current track index, playback state, panel visibility
- **Logic**: One-active-track-at-a-time, auto-advance, shared audioDataRef
- **Layout**: Full viewport, visualizer background, HUD overlay

---

## 📦 Distribution Strategy

### For Musicians (End Users)

1. **Fork/Clone** the repo
2. Drop MP3s in `/public/audio/`
3. Edit `data/playlist.config.js`
4. `npm install && npm run dev` (test locally)
5. Deploy to **Vercel** (free, one-click from GitHub)

### README.md Instructions

```
# How to Use MediaSingularity Player

1. **Add your audio files**
   - Place your MP3s in the `public/audio/` folder
   - Example: `public/audio/my-song.mp3`

2. **Configure your playlist**
   - Open `data/playlist.config.js`
   - Change the `artist` name
   - Update the `theme` colors if desired
   - Add your tracks to the `tracks` array

3. **Add lyrics (optional)**
   - For timed lyrics: use array format with `time` and `text`
   - For static lyrics: just use a string

4. **Deploy**
   - Push to GitHub
   - Connect to Vercel for free hosting
   - Your player is live!

No coding required. Just edit the config file.
```

---

## 🛠️ Build Checklist

### Phase 1: Core Infrastructure

- [x] Create `data/playlist.config.js` with schema and demo tracks
- [x] Create `pages/player.js` (full-screen player page)
- [x] Refactor `MediaSingularity.jsx` to accept `color1`/`color2` props
- [x] Implement one-active-track-at-a-time playback logic

### Phase 2: Hybrid 3D + Video Support

- [x] Create `components/MediaEngine.jsx` (unified component for 3D/video switching)
- [x] Add `mediaType: "3d" | "video"` to config schema
- [x] Implement video progress bar (shows on mouse activity, hides when watching)
- [x] Add crossfade transitions between tracks (300-500ms)
- [x] Implement preloading for next tracks
- [x] Create `/configure` page (form UI for artists to generate config, dev-only with production redirect)
- [x] Add `/public/video/` folder for MP4 files
- [x] Add `poster` image support for video loading states

### Phase 3: UI Components

- [x] Create `components/PlayerHUD.jsx` (bottom control bar)
- [x] Create `components/LyricsFeed.jsx` (CC-style slide-up panel)
- [x] Create `components/PlaylistDrawer.jsx` (slide-up track list)

### Phase 4: Integration & Polish

- [x] Wire up all components in `pages/player.js`
- [x] Add slide-up animations for panels
- [x] Implement timed lyrics logic
- [x] Add keyboard shortcuts (spacebar play/pause, etc.)
- [ ] Mobile responsiveness & performance (reduced particles on low-power devices)
- [ ] Deep linking support (?track=2&t=1:23)
- [ ] LRC/WebVTT lyric file parser

### Phase 4: Distribution Package

- [ ] Create comprehensive README.md
- [ ] Test with sample tracks
- [ ] Document theme customization options
- [ ] Add example configs for different visual styles

---

## 🔄 Playback Logic

### One-Active-Track System

- Only one `CustomWavePlayer` can be "active" at a time
- When switching tracks: pause current, start new, update `audioDataRef`
- Shared `audioDataRef` feeds the visualizer regardless of which track is playing

### Auto-Advance

- When track finishes, automatically play next (if `autoAdvance: true`)
- Loop back to first track when reaching the end

### Audio Analysis Chain

```
WaveSurfer → Web Audio API Analyser → Uint8Array → audioDataRef → Three.js useFrame (60fps)
```

---

## 🎨 Visualizer Technical Details

### Frequency Mapping (4096 bins, 10.77Hz/bin)

- **Sub-bass (0–86Hz)**: bins 0–7 → Core sphere breathing
- **Low-mids (200–900Hz)**: bins 19–84 → Ring opacity/glow
- **High-mids (900–4kHz)**: bins 84–372 → Particle rotation speed (weighted 1×)
- **Presence (4kHz–8kHz)**: bins 372–743 → Particle rotation speed (weighted 2×)
- **Air (8kHz–20kHz)**: bins 743–1857 → Particle rotation speed (weighted 4×)

### Performance Optimizations

- `audioDataRef` is a React ref (no re-renders)
- Three.js `useFrame` reads data at 60fps
- Web Audio analyser runs in parallel (silenced output)
- Only active track feeds the analyser

---

## 🚀 Future Expansions

### Performance & Mobile

- **Reduced motion mode**: Config flag for low-power devices (fewer particles, simpler geometry)
- **Device pixel ratio capping**: Prevent over-rendering on high-DPI mobile screens
- **Progressive enhancement**: Graceful degradation on older devices

### Lyrics & Content

- **LRC/WebVTT support**: Drop .lrc files alongside MP3s for automatic lyric syncing
- **AI lyric transcription**: Optional service to generate timed lyrics from audio
- **Lyric file parser**: Tiny library to convert standard formats to our array format

### Discovery & Sharing

- **Deep linking**: `?track=2` or `?t=1:23` for direct links to specific tracks/times
- **Social sharing**: Pre-built share buttons with timestamps
- **Embed codes**: iframe embed for blogs/websites

### Accessibility & SEO

- **Static fallback page**: Album art + tracklist for search engines and screen readers
- **Keyboard navigation**: Full keyboard control (spacebar, arrows, etc.)
- **Screen reader support**: Proper ARIA labels and semantic HTML
- **Open Graph meta tags**: Rich previews on social media

### Advanced Features

- **Visualizer presets**: singularity, nebula, waveform, minimal, custom
- **Album art backgrounds**: Per-track background images
- **Analytics**: Track play counts, engagement metrics
- **Offline support**: PWA capabilities for downloaded tracks

---

## 📋 Technical Requirements

- **Next.js 15+** (React 19, App Router)
- **Three.js** for 3D visualization
- **WaveSurfer.js** for audio playback
- **Framer Motion** for animations
- **Web Audio API** for frequency analysis

The player is designed to be **self-contained** and **easily forkable** — musicians get a professional-grade audio experience with minimal setup.
