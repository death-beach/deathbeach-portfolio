# Adding Lyrics to Your Visualizer

## Overview

The MediaSingularity player supports two types of lyrics:

1. **Static lyrics** — Simple text that scrolls with the track
2. **Timed lyrics** — Karaoke-style lyrics that highlight in sync with the music

## Static Lyrics (Easiest)

Just paste your full lyrics as a string. They'll display in a scrollable panel.

```js
// In data/playlist.config.js
tracks: [
  {
    title: "My Song",
    audioUrl: "/audio/my-song.mp3",
    lyrics:
      "These are my lyrics\nThey scroll as text\nNo timing needed\nJust paste them here",
  },
];
```

## Timed Lyrics (Advanced)

For karaoke-style synced lyrics, use an array of objects with `time` (in seconds) and `text`.

```js
// In data/playlist.config.js
tracks: [
  {
    title: "My Song",
    audioUrl: "/audio/my-song.mp3",
    lyrics: [
      { time: 0, text: "Intro line..." },
      { time: 12.5, text: "First verse starts here" },
      { time: 16.0, text: "Next line of lyrics" },
      { time: 20.2, text: "Chorus begins" },
      { time: 25.8, text: "More lyrics..." },
    ],
  },
];
```

## How to Get Timestamps

### Method 1: Manual Timing (Free)

1. Play your track in any audio player
2. Note the timestamps when each line should appear
3. Add them to your config

### Method 2: AI Assistance (Recommended)

Describe your lyrics to an AI like Claude or ChatGPT:

```
"I have this song with these lyrics:
[Intro]
These are my lyrics
They scroll as text

[Verse 1]
First verse starts here
Next line of lyrics

[Chorus]
Chorus begins
More lyrics...

Can you create a timed lyrics array for me? The song is 3:45 long."
```

The AI will generate the proper format with reasonable timestamps.

### Method 3: Professional Tools

- **Audacity** — Free audio editor with timestamp tools
- **Logic Pro** — Professional DAW with lyric syncing
- **Lalal.ai** — AI-powered lyric transcription and timing

## Tips

- **Line breaks**: Use `\n` in strings or separate array items for natural line breaks
- **Timing precision**: ±0.5 seconds is usually fine for casual listening
- **Testing**: Use the CC button in the player to toggle lyrics on/off
- **Font**: Choose your lyric font in the config (`lyricFont: "mono"`)

## Example Config

```js
export const config = {
  artist: "Your Name",
  lyricFont: "handwritten", // Choose your font style

  tracks: [
    {
      title: "Track 1",
      audioUrl: "/audio/track1.mp3",
      lyrics: "Simple static lyrics\nNo timing required\nJust paste your text",
    },
    {
      title: "Track 2",
      audioUrl: "/audio/track2.mp3",
      lyrics: [
        { time: 0, text: "Welcome to the show" },
        { time: 5, text: "This is timed perfectly" },
        { time: 10, text: "Each line appears on cue" },
      ],
    },
  ],
};
```
