import { config } from "../data/playlist.config";

export default function PlaylistDrawer({ currentTrackIndex, visible, onTrackSelect }) {
  if (!visible) return null;

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
        maxHeight: "50vh",
        overflowY: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "#ffffff" }}>
        {config.albumTitle || "Playlist"}
      </div>
      {config.tracks.map((track, index) => (
        <div
          key={index}
          onClick={() => onTrackSelect(index)}
          style={{
            padding: "12px",
            marginBottom: "8px",
            borderRadius: "8px",
            background: index === currentTrackIndex ? `rgba(${config.theme.color1.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.2)` : "transparent",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: index === currentTrackIndex ? "bold" : "normal", color: "#ffffff" }}>
            {index + 1}. {track.title}
          </div>
        </div>
      ))}
    </div>
  );
}