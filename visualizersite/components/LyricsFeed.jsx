import { config } from "../data/playlist.config";

export default function LyricsFeed({ currentTrackIndex, visible }) {
  if (!visible) return null;

  const currentTrack = config.tracks[currentTrackIndex];

  return (
    <div
      style={{
        position: "absolute",
        bottom: "120px",
        left: "20px",
        right: "20px",
        zIndex: 15,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "20px",
        maxHeight: "40vh",
        overflowY: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ fontSize: "16px", lineHeight: "1.6", color: "#ffffff" }}>
        {Array.isArray(currentTrack.lyrics)
          ? currentTrack.lyrics.map((line, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                {line.text}
              </div>
            ))
          : currentTrack.lyrics
        }
      </div>
    </div>
  );
}