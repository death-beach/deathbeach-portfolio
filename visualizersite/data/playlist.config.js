export const config = {
  // Album info
  artist: "Death Beach",
  albumTitle: "Audio Singularity", // optional

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
      title: "Drunk on the Mic (Death Beach Remix)",
      mediaType: "3d", // 3D reactive visualizer
      url: "/audio/drunk-on-the-mic-remix.mp3", // MP3 for 3D tracks
      visualizer: "singularity", // only used for 3D: "singularity", "nebula", "waveform", "minimal", "custom"
      lyrics: [
        { time: 0, text: "Tension, release, and bounce..." },
        { time: 12, text: "Complete flip of the original harmony..." },
        { time: 25, text: "It doesn't just fill a room—it expands it." },
      ],
    },
    {
      title: "Desert Transmission",
      mediaType: "3d", // 3D reactive visualizer
      url: "/audio/desert-transmission.mp3", // MP3 for 3D tracks
      visualizer: "singularity", // only used for 3D: "singularity", "nebula", "waveform", "minimal", "custom"
      lyrics: [
        { time: 0, text: "A brooding, frequency-rich descent..." },
        { time: 12, text: "Into analog synthesis and digital precision..." },
        { time: 25, text: "This track strips away the static..." },
        { time: 35, text: "To leave pure, vibrating emotion." },
      ],
    },
    {
      title: "Neon Bleed",
      mediaType: "3d", // 3D reactive visualizer
      url: "/audio/neon-bleed.mp3",
      visualizer: "singularity", // only used for 3D: "singularity", "nebula", "waveform", "minimal", "custom"
      lyrics: [
        { time: 0, text: "Visceral drum architecture..." },
        { time: 12, text: "Meets haunting, unfiltered vocal production..." },
        {
          time: 25, text: "It is a sonic ecosystem designed to crack you open...",
        },
        { time: 35, text: "And leave a lasting mark." },
      ],
    },
  ],
};