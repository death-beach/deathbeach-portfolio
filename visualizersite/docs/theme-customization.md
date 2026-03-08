# Theme Customization Guide

This document provides a complete reference for customizing MediaSingularity Player themes and configurations.

## 📋 Complete Config Schema

```js
export const config = {
  // Album metadata
  artist: "Your Artist Name", // Required: Displayed in player
  albumTitle: "Your Album Title", // Optional: Displayed if provided

  // Visual theme colors
  theme: {
    color1: "#f00c6f", // Primary accent (rings, progress bar, lyrics highlight)
    color2: "#12abff", // Secondary accent (particle colors, secondary elements)
    background: "#0a0a0a", // Page background color
  },

  // UI styling options
  playerSkin: "glass", // "glass" | "brutalist" | "retro-terminal" | "minimal"
  lyricFont: "grotesque", // "grotesque" | "serif" | "mono" | "handwritten" | "condensed"

  // Playback behavior
  autoAdvance: true, // Auto-play next track when current ends

  // Commerce (optional)
  shop: {
    enabled: true,
    products: [
      {
        label: "Digital Download",
        price: "$9.99",
        stripeLink: "https://buy.stripe.com/...",
        type: "digital", // "digital" | "physical"
      },
    ],
  },

  // Track list
  tracks: [
    {
      title: "Track Title", // Required
      mediaType: "3d", // "3d" | "video"
      url: "/audio/track.mp3", // Audio/video file path
      visualizer: "singularity", // For 3D: "singularity" | "nebula" | "waveform" | "minimal" | "custom"
      poster: "/images/poster.jpg", // Optional: Video loading image

      // Lyrics options (choose one)
      lyrics: [
        // Inline timed lyrics
        { time: 0, text: "First line..." },
        { time: 12.5, text: "Second line..." },
      ],
      // OR
      lyricsUrl: "/lyrics/track.lrc", // LRC file path
    },
  ],
};
```

## 🎨 Example Configurations

### Dark Minimal Theme

```js
export const config = {
  artist: "Minimal Artist",
  albumTitle: "Essentials",

  theme: {
    color1: "#ffffff",
    color2: "#cccccc",
    background: "#000000",
  },

  playerSkin: "minimal",
  lyricFont: "mono",
  autoAdvance: false,

  tracks: [
    {
      title: "Pure Tone",
      mediaType: "3d",
      url: "/audio/pure-tone.mp3",
      visualizer: "minimal",
      lyrics: [
        { time: 0, text: "Clean." },
        { time: 30, text: "Simple." },
        { time: 60, text: "Essential." },
      ],
    },
  ],
};
```

### Neon Club Theme

```js
export const config = {
  artist: "Neon Nights",
  albumTitle: "Club Bangers",

  theme: {
    color1: "#ff0080", // Hot pink
    color2: "#00ffff", // Cyan
    background: "#0a0a0a",
  },

  playerSkin: "glass",
  lyricFont: "condensed",
  autoAdvance: true,

  tracks: [
    {
      title: "Laser Dance",
      mediaType: "3d",
      url: "/audio/laser-dance.mp3",
      visualizer: "singularity",
      lyrics: [
        { time: 0, text: "Feel the beat drop..." },
        { time: 8, text: "Lights flashing..." },
        { time: 16, text: "Dance floor alive!" },
      ],
    },
  ],
};
```

### Retro Terminal Theme

```js
export const config = {
  artist: "Retro Synth",
  albumTitle: "Digital Dreams",

  theme: {
    color1: "#00ff00", // Terminal green
    color2: "#ffffff", // White text
    background: "#000000",
  },

  playerSkin: "retro-terminal",
  lyricFont: "mono",
  autoAdvance: true,

  tracks: [
    {
      title: "Matrix Code",
      mediaType: "3d",
      url: "/audio/matrix-code.mp3",
      visualizer: "waveform",
      lyrics: [
        { time: 0, text: "> Initializing sequence..." },
        { time: 15, text: "> Loading audio data..." },
        { time: 30, text: "> Playback ready." },
      ],
    },
  ],
};
```

### Brutalist Industrial Theme

```js
export const config = {
  artist: "Industrial Noise",
  albumTitle: "Heavy Machinery",

  theme: {
    color1: "#ff0000", // Warning red
    color2: "#ffff00", // Caution yellow
    background: "#333333",
  },

  playerSkin: "brutalist",
  lyricFont: "condensed",
  autoAdvance: true,

  tracks: [
    {
      title: "Factory Floor",
      mediaType: "3d",
      url: "/audio/factory-floor.mp3",
      visualizer: "singularity",
      lyrics: [
        { time: 0, text: "MACHINERY WHIRRING" },
        { time: 12, text: "METAL ON METAL" },
        { time: 24, text: "INDUSTRIAL STRENGTH" },
      ],
    },
  ],
};
```

### Elegant Serif Theme

```js
export const config = {
  artist: "Classical Ensemble",
  albumTitle: "Chamber Works",

  theme: {
    color1: "#8b4513", // Saddle brown
    color2: "#daa520", // Goldenrod
    background: "#f5f5dc", // Beige
  },

  playerSkin: "glass",
  lyricFont: "serif",
  autoAdvance: false,

  tracks: [
    {
      title: "String Quartet No. 1",
      mediaType: "3d",
      url: "/audio/string-quartet.mp3",
      visualizer: "minimal",
      lyrics: [
        { time: 0, text: "Andante con moto" },
        { time: 45, text: "Allegro vivace" },
        { time: 120, text: "Adagio espressivo" },
      ],
    },
  ],
};
```

## 🎨 Color Palette Guidelines

### Primary Color (color1)

- Used for: Progress bars, ring highlights, active lyric lines
- Should be: High contrast against background, vibrant
- Examples: Bright reds, blues, greens, magentas

### Secondary Color (color2)

- Used for: Particle colors, secondary UI elements
- Should be: Complementary to color1, slightly muted
- Examples: Softer versions of color1, contrasting hues

### Background Color

- Used for: Page background, overlay gradients
- Should be: Dark for visualizers, neutral tones
- Examples: Pure black, dark grays, deep blues

## 🔧 Advanced Customization

### Custom Fonts

To use custom fonts beyond the built-in options:

1. Add font files to `public/fonts/`
2. Import in `styles/globals.css`:
   ```css
   @font-face {
     font-family: "CustomFont";
     src: url("/fonts/custom.woff2") format("woff2");
   }
   ```
3. Add CSS class in component styles

### Custom Visualizers

For completely custom 3D scenes:

1. Create new component in `components/`
2. Follow the pattern of `MediaSingularity.jsx`
3. Use `audioDataRef.current` for frequency data
4. Set `visualizer: "custom"` in config

### LRC Lyric Files

Place `.lrc` files in `public/lyrics/` with format:

```
[00:12.34] First line of lyrics...
[00:15.67] Second line...
[00:25.00] Third line...
```

Reference with: `lyricsUrl: "/lyrics/track.lrc"`

## 🚀 Performance Tips

- **Mobile**: Keep particle counts low (< 1000)
- **Colors**: Use solid colors over gradients for better performance
- **Fonts**: Web-safe fonts load faster than custom fonts
- **Images**: Optimize poster images (< 100KB)

## 🎯 Best Practices

1. **Test on mobile** - Visualizer performance varies significantly
2. **Use high contrast** - Ensure text is readable over backgrounds
3. **Keep it simple** - Too many colors can be overwhelming
4. **Test with audio** - Visual reactions should feel responsive
5. **Consider accessibility** - Respect `prefers-reduced-motion`
