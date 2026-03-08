# MediaSingularity Setup Instructions

## Quick Start (20 Steps)

### 1. Fork & Setup

1. Fork this repository on GitHub
2. Clone your fork locally: `git clone [your-repo-url]`
3. Install dependencies: `npm install`
4. Test locally: `npm run dev` (should open at http://localhost:3000)

### 2. Add Your Media Files

5. Place your MP3 files in the `public/audio/` folder (for 3D reactive tracks)
6. Place your MP4 files in the `public/video/` folder (for video tracks)
7. Note the filenames (e.g., `my-song.mp3` or `my-video.mp4`)

### 3. Configure Your Player

7. Open `data/playlist.config.js`
8. Change `artist: "Your Name"`
9. Update theme colors if desired:
   - `color1`: Primary accent (rings, progress bar)
   - `color2`: Secondary accent
10. Choose your player skin: `"glass"`, `"brutalist"`, `"retro-terminal"`, `"minimal"`
11. Choose your lyric font: `"grotesque"`, `"serif"`, `"mono"`, `"handwritten"`, `"condensed"`

### 4. Add Your Tracks

12. **Use the config generator tool:** Visit `http://localhost:3000/configure` in your browser to generate your config file automatically (no coding needed!)
13. Or manually edit the `tracks` array in `data/playlist.config.js`:
    ```js
    // For 3D reactive tracks:
    {
      title: "My Song",
      mediaType: "3d",
      url: "/audio/my-song.mp3",
      visualizer: "singularity", // "singularity", "nebula", "waveform", "minimal", "custom"
      lyrics: "Static lyrics here...",
    },
    // For video tracks:
    {
      title: "My Video",
      mediaType: "video",
      url: "/video/my-video.mp4",
      poster: "/images/poster.jpg", // optional loading image
      lyrics: [{ time: 0, text: "First line" }, { time: 5, text: "Next line" }],
    }
    ```
14. Add lyrics (optional):
    - Static: `lyrics: "Paste your lyrics here"`
    - Timed: `lyrics: [{ time: 0, text: "First line" }, { time: 5, text: "Next line" }]`

### 5. Add Commerce (Optional)

14. Create a free Stripe account at stripe.com
15. Create products for your releases (digital downloads, physical items)
16. Generate Payment Links for each product
17. Add to config:
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
      ],
    }
    ```

### 6. Deploy

18. Push to GitHub: `git add . && git commit -m "Setup complete" && git push`
19. Connect to Vercel (free): Go to vercel.com, import your repo
20. Your site is live! (Vercel provides free SSL automatically)

---

## Detailed Steps

### Media File Setup

#### Audio Files (for 3D tracks)

- MP3 format recommended (WAV/FLAC also work)
- Keep filenames simple: `song-title.mp3`
- File size limit: ~50MB per track (Vercel free tier)

#### Video Files (for video tracks)

- MP4 format with H.264 encoding recommended
- Keep filenames simple: `video-title.mp4`
- File size limit: ~100MB per video (Vercel free tier)
- Audio should be baked into the MP4 (final mix)
- Optional: Add poster images in `/public/images/` for loading states

### Visualizer Selection

- **singularity**: Orbital rings + particles (default, most dynamic)
- **nebula**: Dispersed particle cloud (dreamy, atmospheric)
- **waveform**: Frequency bars in a ring (technical, precise)
- **minimal**: Just the core sphere (clean, subtle)

### Theme Customization

- Colors use hex codes: `"#ff006f"`, `"#00d4ff"`
- Background defaults to dark (`"#0a0a0a"`)
- Test combinations in your local dev server

### Lyric Timing

- For timed lyrics, timestamps are in seconds
- Use decimals for precision: `12.5` = 12 seconds, 500ms
- AI can help generate timestamps from your lyrics

### Stripe Setup

- Enable "Collect shipping address" for physical products
- Stripe handles all payment processing and receipts
- No monthly fees for basic usage

### Domain Setup

- Buy domain from Namecheap (~$12/year)
- Add DNS records in Vercel dashboard
- SSL certificate applied automatically

### Testing Checklist

- [ ] All tracks load and play (both 3D audio and video tracks)
- [ ] 3D visualizers respond to audio frequency data
- [ ] Video progress bar appears on mouse activity, hides when watching
- [ ] Lyrics display correctly (CC button)
- [ ] Playlist navigation works between different media types
- [ ] Buy buttons link to Stripe (if enabled)
- [ ] Mobile responsive
- [ ] Fast loading times

### The /configure Tool

The `/configure` page (available at `http://localhost:3000/configure` during development) is a form-based tool that helps artists generate their `playlist.config.js` file without writing code:

- **Add tracks** with a simple form interface
- **Choose media type** (3D or Video) for each track
- **Select visualizers** from dropdown menus
- **Add lyrics** in a textarea
- **Generate config** with one click — copy-paste the output into your config file

This tool is only available in development mode for security. In production, visiting `/configure` redirects to the home page.

---

## Troubleshooting

**Audio not playing?**

- Check file paths in config match actual filenames
- Ensure MP3s are in `public/audio/` folder
- Try different browser (Chrome recommended)

**Visualizer not responding?**

- Check browser console for errors
- Ensure Web Audio API is enabled
- Try refreshing the page

**Deployment issues?**

- Vercel build logs show any errors
- Check that all dependencies are in package.json
- Ensure no missing files referenced in config

---

## Support

For guided setup (2-hour call): [Your contact info]
Custom visualizer development: [Your contact info]
Documentation: Check `docs/visualizer/` folder
