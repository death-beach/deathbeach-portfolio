# MediaSingularity Player

A **visual album site** — not just a music player, but a web-native equivalent of vinyl with liner notes and artwork, but interactive and alive. Each track plays with its own custom-designed 3D world that reacts to the music in real-time.

**What You Get:** A standalone Next.js site that musicians can deploy in minutes. Each track has its own visual identity. The experience transforms as the album plays.

**Target Audience:** Musicians who want to create immersive, memorable listening experiences for their releases. No coding required — just configuration and deployment.

---

## 🚀 Quick Start

1. **Fork this repo** on GitHub
2. **Add your audio files** to `public/audio/` (MP3 format)
3. **Edit `data/playlist.config.js`** with your album info and tracks
4. **Deploy to Vercel** (free, one-click from GitHub)
5. **Your visual album is live!**

---

## 📁 Project Structure

```
singularity-player/
├── data/
│   └── playlist.config.js       ← THE ONLY FILE you need to edit
├── components/
│   ├── MediaSingularity.jsx     ← 3D audio-reactive visualizer
│   ├── CustomWavePlayer.js      ← Audio player with waveform
│   ├── PlayerHUD.jsx            ← Bottom control bar
│   ├── LyricsFeed.jsx           ← CC-style lyrics panel
│   └── PlaylistDrawer.jsx       ← Track list drawer
├── pages/
│   ├── index.js                 ← Main player page (full-screen)
│   └── store.js                 ← Commerce page (optional)
├── public/
│   ├── audio/                   ← Drop your MP3s here
│   └── video/                   ← Drop MP4s for video tracks
└── README.md                    ← This file
```

---

## 🎛️ Configuration

Edit `data/playlist.config.js` to customize your player:

```js
export const config = {
  // Album info
  artist: "Your Name",
  albumTitle: "Your Album Name",

  // Visual theme
  theme: {
    color1: "#f00c6f", // primary accent
    color2: "#12abff", // secondary accent
    background: "#0a0a0a",
  },

  // Player styling
  playerSkin: "glass", // "glass", "brutalist", "retro-terminal", "minimal"
  lyricFont: "grotesque", // "grotesque", "serif", "mono", "handwritten", "condensed"

  // Playback
  autoAdvance: true, // auto-play next track

  // Your tracks
  tracks: [
    {
      title: "Track Name",
      mediaType: "3d", // or "video"
      url: "/audio/your-track.mp3",
      visualizer: "singularity", // "singularity", "nebula", "waveform", "minimal"
      lyrics: [
        { time: 0, text: "Lyrics line 1..." },
        { time: 5, text: "Lyrics line 2..." },
      ],
    },
  ],
};
```

---

## 🎨 Customization Options

### Visualizer Types

- **singularity**: Orbital rings + particle system (default)
- **nebula**: Particle cloud effect
- **waveform**: Frequency bars
- **minimal**: Core sphere only

### Player Skins

- **glass**: Semi-transparent, modern
- **brutalist**: Bold borders, high contrast
- **retro-terminal**: Monospace fonts, green-on-black
- **minimal**: Clean, subtle

### Media Types

- **3d**: Audio-reactive 3D visualizer
- **video**: Full AI-generated music video

---

## 🛒 Adding Commerce

The player includes a built-in store page (`pages/store.js`) with Stripe Payment Links:

1. Create products in your Stripe dashboard
2. Generate payment links for each product
3. Add the links to your `playlist.config.js`:

```js
shop: {
  enabled: true,
  products: [
    {
      label: "Download MP3",
      price: "$9.99",
      stripeLink: "https://buy.stripe.com/xxx",
      type: "digital",
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

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. Fork this repo
2. Connect your GitHub to Vercel
3. Deploy automatically
4. Get a `your-project.vercel.app` URL instantly

### Option 2: Custom Domain

1. Buy a domain from Namecheap (~$12/year)
2. Point DNS to Vercel
3. SSL certificate provisioned automatically

### Option 3: Static Export

Uncomment `output: 'export'` in `next.config.mjs` for static hosting on Netlify, GitHub Pages, etc.

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📋 Requirements

- **Node.js** 18+
- **Next.js** 15+
- **Three.js** for 3D graphics
- **WaveSurfer.js** for audio playback
- **Web Audio API** for frequency analysis

---

## 🎵 Audio Format Support

- **MP3**: Primary format, works everywhere
- **WAV**: Higher quality, larger files
- **AAC/M4A**: Good compression, iOS optimized

**Bitrate recommendation:** 320kbps MP3 for best quality.

---

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch controls optimized
- Reduced particle count on low-power devices
- Graceful degradation for older browsers

---

## 🎨 Advanced Customization

### Custom Visualizers

For unique visual experiences beyond the presets:

1. Create new component in `components/`
2. Add to `playlist.config.js` as `visualizer: "custom"`
3. Build your Three.js scene with audio reactivity

### Lyric Formats

- **Timed lyrics**: Array with `time` and `text` properties
- **Static lyrics**: Simple string for scrolling text
- **LRC/WebVTT**: Future support planned

---

## 🤝 Contributing

This is designed to be forked and customized. The core architecture is:

- **Modular components** for easy extension
- **Configuration-driven** for no-code customization
- **Self-contained** for easy deployment

---

## 📄 License

MIT License - fork, modify, deploy, and sell your music!

---

## 🆘 Support

- **Documentation**: This README
- **Issues**: GitHub Issues for bugs/features
- **Discord**: [Join our community](https://discord.gg/example)

---

**Built with ❤️ by Death Beach**
