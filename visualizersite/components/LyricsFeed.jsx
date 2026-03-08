import { useState, useEffect } from "react";
import { config } from "../data/playlist.config";
import { fetchLyrics } from "../utils/parseLyrics";

export default function LyricsFeed({ currentTrackIndex, visible, currentTime = 0 }) {
  const currentTrack = config.tracks[currentTrackIndex];
  const [lyrics, setLyrics] = useState([]);

  // Fetch and parse lyrics if lyricsUrl is provided
  useEffect(() => {
    if (currentTrack.lyricsUrl) {
      fetchLyrics(currentTrack.lyricsUrl).then(setLyrics);
    } else if (Array.isArray(currentTrack.lyrics)) {
      setLyrics(currentTrack.lyrics);
    } else {
      setLyrics([]);
    }
  }, [currentTrackIndex, currentTrack.lyricsUrl, currentTrack.lyrics]);

  // Find the current lyric line based on time
  const getCurrentLyricIndex = () => {
    if (!Array.isArray(lyrics)) return -1;

    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return i;
      }
    }
    return -1;
  };

  const currentLyricIndex = getCurrentLyricIndex();

  return (
    <div
      style={{
        position: "absolute",
        bottom: visible ? "120px" : "80px",
        left: "20px",
        right: "20px",
        zIndex: 15,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: visible ? "20px" : "0px",
        maxHeight: visible ? "40vh" : "0vh",
        overflowY: visible ? "auto" : "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#ffffff",
        transition: "opacity 0.2s ease",
        opacity: visible ? 1 : 0
      }}>
        {Array.isArray(lyrics)
          ? lyrics.map((line, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "8px",
                  color: i === currentLyricIndex ? config.theme.color1 : "#ffffff",
                  fontWeight: i === currentLyricIndex ? "bold" : "normal",
                  transition: "all 0.3s ease",
                  textShadow: i === currentLyricIndex ? `0 0 8px ${config.theme.color1}40` : "none",
                }}
              >
                {line.text}
              </div>
            ))
          : typeof lyrics === 'string' ? lyrics : null
        }
      </div>
    </div>
  );
}
