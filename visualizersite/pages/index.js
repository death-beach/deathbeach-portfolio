import { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { config } from "../data/playlist.config";

// Dynamically import components to avoid SSR issues
const MediaEngine = dynamic(() => import("../components/MediaEngine"), { ssr: false });
const PlayerHUD = dynamic(() => import("../components/PlayerHUD"), { ssr: false });
const LyricsFeed = dynamic(() => import("../components/LyricsFeed"), { ssr: false });
const PlaylistDrawer = dynamic(() => import("../components/PlaylistDrawer"), { ssr: false });

export default function Player() {
  // Shared audio frequency data — stored in a ref so updates don't trigger re-renders.
  // The Three.js useFrame loops read audioDataRef.current directly at 60fps.
  const audioDataRef = useRef(null);

  // Player state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyricsVisible, setLyricsVisible] = useState(false);
  const [playlistVisible, setPlaylistVisible] = useState(false);

  // Get current track
  const currentTrack = config.tracks[currentTrackIndex];

  // Handle audio data from the active player
  const handleAudioData = useCallback((data) => {
    audioDataRef.current = data || null;
  }, []);

  // Playback controls
  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handlePrev = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : config.tracks.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev < config.tracks.length - 1 ? prev + 1 : 0));
  }, []);

  const handleTrackSelect = useCallback((index) => {
    setCurrentTrackIndex(index);
    setPlaylistVisible(false);
  }, []);

  // Auto-advance when track ends (if enabled)
  const handleTrackEnd = useCallback(() => {
    if (config.autoAdvance) {
      handleNext();
    }
  }, [handleNext]);

  // Toggle panels
  const toggleLyrics = useCallback(() => {
    setLyricsVisible(!lyricsVisible);
  }, [lyricsVisible]);

  const togglePlaylist = useCallback(() => {
    setPlaylistVisible(!playlistVisible);
  }, []);

  // Close panels when clicking outside
  const closePanels = useCallback(() => {
    setLyricsVisible(false);
    setPlaylistVisible(false);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: config.theme.background,
        color: "#ffffff",
        fontFamily: "'Hanken Grotesk', sans-serif",
      }}
      onClick={closePanels}
    >
      {/* ── FULL-SCREEN VISUALIZER ── */}
      <MediaEngine
        currentTrackIndex={currentTrackIndex}
        audioDataRef={audioDataRef}
        isPlaying={isPlaying}
        onVideoEnd={handleTrackEnd}
      />

      {/* ── BOTTOM HUD (Always Visible) ── */}
      <PlayerHUD
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handleNext}
        onTrackEnd={handleTrackEnd}
        onToggleLyrics={toggleLyrics}
        onTogglePlaylist={togglePlaylist}
        lyricsVisible={lyricsVisible}
        playlistVisible={playlistVisible}
        audioDataRef={audioDataRef}
      />

      {/* ── LYRICS PANEL (Slide Up) ── */}
      <LyricsFeed
        currentTrackIndex={currentTrackIndex}
        visible={lyricsVisible}
      />

      {/* ── PLAYLIST PANEL (Slide Up) ── */}
      <PlaylistDrawer
        currentTrackIndex={currentTrackIndex}
        visible={playlistVisible}
        onTrackSelect={handleTrackSelect}
      />
    </div>
  );
}