import { config } from "../data/playlist.config";

export default function PlaylistDrawer({ currentTrackIndex, visible, onTrackSelect }) {
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
        maxHeight: visible ? "50vh" : "0vh",
        overflowY: visible ? "auto" : "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "16px",
        color: "#ffffff",
        transition: "opacity 0.2s ease",
        opacity: visible ? 1 : 0
      }}>
        {config.albumTitle || "Playlist"}
      </div>
      {config.tracks.map((track, index) => (
        <div
          key={index}
          onClick={() => onTrackSelect(index)}
          style={{
            padding: visible ? "12px" : "0px",
            marginBottom: visible ? "8px" : "0px",
            borderRadius: "8px",
            background: index === currentTrackIndex ? `rgba(${config.theme.color1.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.2)` : "transparent",
            cursor: "pointer",
            transition: "all 0.2s",
            height: visible ? "auto" : "0px",
            overflow: "hidden",
          }}
        >
          <div style={{
            fontSize: "16px",
            fontWeight: index === currentTrackIndex ? "bold" : "normal",
            color: "#ffffff",
            transition: "opacity 0.2s ease",
            opacity: visible ? 1 : 0
          }}>
            {index + 1}. {track.title}
          </div>
        </div>
      ))}
    </div>
  );
}
