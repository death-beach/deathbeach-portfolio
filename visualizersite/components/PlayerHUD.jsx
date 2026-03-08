import { useCallback } from "react";
import dynamic from "next/dynamic";
import { config } from "../data/playlist.config";

// Dynamically import CustomWavePlayer to avoid SSR issues
const CustomWavePlayer = dynamic(() => import("./CustomWavePlayer"), { ssr: false });

export default function PlayerHUD({
  currentTrackIndex,
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  onTrackEnd,
  onToggleLyrics,
  onTogglePlaylist,
  lyricsVisible,
  playlistVisible,
  audioDataRef,
  onTimeUpdate,
  visible = true,
}) {
  const currentTrack = config.tracks[currentTrackIndex];

  // Handle audio data from the active player
  const handleAudioData = useCallback((data) => {
    audioDataRef.current = data || null;
  }, [audioDataRef]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: visible ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)" : "transparent",
        padding: visible ? "20px" : "0px",
        paddingBottom: visible ? "40px" : "0px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >


      {/* Waveform Player - Always mounted, CSS visibility control */}
      <div style={{
        marginBottom: "15px",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease"
      }}>
        <CustomWavePlayer
          audioUrl={currentTrack.url}
          onAudioData={handleAudioData}
          isActive={true}
          onTrackEnd={onTrackEnd}
          isPlaying={isPlaying}
          onTimeUpdate={onTimeUpdate}
        />
      </div>

      {/* Panel Toggle Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleLyrics(); }}
          style={{
            background: "none",
            border: "none",
            color: lyricsVisible ? config.theme.color1 : "#ffffff",
            fontSize: "14px",
            cursor: "pointer",
            opacity: 0.7,
            transition: "all 0.2s",
            padding: "8px 12px",
            borderRadius: "4px",
            backgroundColor: lyricsVisible ? "rgba(255,255,255,0.1)" : "transparent",
          }}
          onMouseEnter={(e) => e.target.style.opacity = "1"}
          onMouseLeave={(e) => e.target.style.opacity = "0.7"}
        >
          CC
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onTogglePlaylist(); }}
          style={{
            background: "none",
            border: "none",
            color: playlistVisible ? config.theme.color1 : "#ffffff",
            fontSize: "16px",
            cursor: "pointer",
            opacity: 0.7,
            transition: "all 0.2s",
            padding: "8px 12px",
            borderRadius: "4px",
            backgroundColor: playlistVisible ? "rgba(255,255,255,0.1)" : "transparent",
          }}
          onMouseEnter={(e) => e.target.style.opacity = "1"}
          onMouseLeave={(e) => e.target.style.opacity = "0.7"}
        >
          ≡
        </button>
      </div>
    </div>
  );
}