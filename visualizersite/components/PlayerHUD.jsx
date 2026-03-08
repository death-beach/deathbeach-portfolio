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
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
        padding: "20px",
        paddingBottom: "40px",
      }}
    >
      {/* Transport Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "10px" }}>
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
            fontSize: "24px",
            cursor: "pointer",
            opacity: 0.7,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.opacity = "1"}
          onMouseLeave={(e) => e.target.style.opacity = "0.7"}
        >
          ◀◀
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPlayPause(); }}
          style={{
            background: "none",
            border: "none",
            color: config.theme.color1,
            fontSize: "32px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {isPlaying ? "▶" : "⏸"}
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
            fontSize: "24px",
            cursor: "pointer",
            opacity: 0.7,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.opacity = "1"}
          onMouseLeave={(e) => e.target.style.opacity = "0.7"}
        >
          ▶▶
        </button>
      </div>

      {/* Track Info */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff" }}>
          {currentTrack.title}
        </div>
        <div style={{ fontSize: "14px", color: "#cccccc" }}>
          {config.artist} · {currentTrackIndex + 1}/{config.tracks.length}
        </div>
      </div>

      {/* Waveform Player */}
      <div style={{ marginBottom: "10px" }}>
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
            fontSize: "16px",
            cursor: "pointer",
            opacity: 0.7,
            transition: "all 0.2s",
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