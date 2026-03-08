import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { config } from "../data/playlist.config";

// Dynamically import components to avoid SSR issues
const MediaSingularity = dynamic(() => import("./MediaSingularity"), { ssr: false });

export default function MediaEngine({
  currentTrackIndex,
  audioDataRef,
  isPlaying,
  onVideoEnd
}) {
  const videoRef = useRef(null);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const controlsTimeoutRef = useRef(null);
  const [previousTrackIndex, setPreviousTrackIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentTrack = config.tracks[currentTrackIndex];
  const isVideo = currentTrack.mediaType === "video";

  // Handle track transitions for crossfade
  useEffect(() => {
    if (previousTrackIndex !== null && previousTrackIndex !== currentTrackIndex) {
      setIsTransitioning(true);
      // Transition completes after 400ms
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousTrackIndex(null);
      }, 400);
      return () => clearTimeout(timer);
    } else if (previousTrackIndex === null) {
      setPreviousTrackIndex(currentTrackIndex);
    }
  }, [currentTrackIndex, previousTrackIndex]);

  // Handle video playback
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedData = () => {
      if (isPlaying) {
        video.play().catch(() => {});
      }
    };

    const handleTimeUpdate = () => {
      setVideoProgress((video.currentTime / video.duration) * 100);
    };

    const handleEnded = () => {
      onVideoEnd?.();
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [isVideo, isPlaying, onVideoEnd]);

  // Sync video playback with player state
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const video = videoRef.current;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying, isVideo]);

  // Handle mouse movement for video controls
  const handleMouseMove = () => {
    if (!isVideo) return;

    setShowVideoControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      setShowVideoControls(false);
    }, 3000);
  };

  const handleVideoSeek = (e) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * videoRef.current.duration;

    videoRef.current.currentTime = newTime;
    setVideoProgress(percentage * 100);
  };

  if (isVideo) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "#000000",
          overflow: "hidden"
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={currentTrack.url}
          poster={currentTrack.poster}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            background: "#000000"
          }}
          preload="metadata"
          playsInline
        />

        {/* Video Controls Overlay */}
        {showVideoControls && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
              padding: "20px",
              zIndex: 5
            }}
          >
            {/* Progress Bar */}
            <div
              style={{
                width: "100%",
                height: "8px",
                background: "rgba(255,255,255,0.3)",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "10px"
              }}
              onClick={handleVideoSeek}
            >
              <div
                style={{
                  height: "100%",
                  width: `${videoProgress}%`,
                  background: config.theme.color1,
                  borderRadius: "4px",
                  transition: "width 0.1s ease"
                }}
              />
            </div>

            {/* Video Info */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#ffffff"
            }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {currentTrack.title}
                </div>
                <div style={{ fontSize: "12px", color: "#cccccc" }}>
                  {config.artist}
                </div>
              </div>
              <div style={{ fontSize: "12px", color: "#cccccc" }}>
                Video
              </div>
            </div>
          </div>
        )}

        {/* Click to show controls hint */}
        {!showVideoControls && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              background: "rgba(0,0,0,0.7)",
              color: "#ffffff",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              zIndex: 5
            }}
          >
            Move mouse for controls
          </div>
        )}
      </div>
    );
  }

  // Default to 3D visualizer with crossfade transitions
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Previous track visualizer (fading out) */}
      {isTransitioning && previousTrackIndex !== null && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: "opacity 0.4s ease-out",
            zIndex: 1
          }}
        >
          <MediaSingularity
            audioDataRef={null} // No audio data for fading out visualizer
            color1={config.theme.color1}
            color2={config.theme.color2}
          />
        </div>
      )}

      {/* Current track visualizer (fading in) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: isTransitioning ? 0 : 1,
          transition: isTransitioning ? "opacity 0.4s ease-in" : "none",
          zIndex: 2
        }}
      >
        <MediaSingularity
          audioDataRef={audioDataRef}
          color1={config.theme.color1}
          color2={config.theme.color2}
        />
      </div>
    </div>
  );
}