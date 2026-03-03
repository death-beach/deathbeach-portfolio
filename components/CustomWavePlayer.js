"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomWavePlayer({ audioUrl }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    let ws;

    // Dynamically import WaveSurfer to avoid SSR issues
    import("wavesurfer.js").then((WaveSurfer) => {
      try {
        ws = WaveSurfer.default.create({
          container: waveformRef.current,
          waveColor: "rgba(18, 171, 255, 0.25)",
          progressColor: "#f00c6f",
          cursorColor: "transparent",
          barWidth: 2,
          barGap: 2,
          barRadius: 2,
          height: 48,
          normalize: true,
          fillParent: true,
        });

        wavesurfer.current = ws;

        // Wrap load in try-catch and handle promise rejections
        try {
          const loadPromise = ws.load(audioUrl);
          if (loadPromise && typeof loadPromise.catch === 'function') {
            loadPromise.catch((loadError) => {
              console.warn("WaveSurfer load promise rejected:", loadError);
              setHasError(true);
              setIsReady(false);
            });
          }
        } catch (loadError) {
          console.warn("WaveSurfer load error:", loadError);
          setHasError(true);
          setIsReady(false);
          return;
        }

        ws.on("ready", () => {
          setIsReady(true);
          setHasError(false);
        });

        ws.on("play", () => setIsPlaying(true));
        ws.on("pause", () => setIsPlaying(false));
        ws.on("finish", () => setIsPlaying(false));

        ws.on("error", (error) => {
          console.warn("WaveSurfer error:", error);
          setHasError(true);
          setIsReady(false);
        });

        ws.on("load", (url) => {
          // Reset error state on successful load
          setHasError(false);
        });
      } catch (initError) {
        console.error("Failed to initialize WaveSurfer:", initError);
        setHasError(true);
        setIsReady(false);
      }
    }).catch((importError) => {
      console.error("Failed to import WaveSurfer:", importError);
      setHasError(true);
      setIsReady(false);
    });

    return () => {
      if (ws) {
        ws.destroy();
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (wavesurfer.current && isReady) {
      wavesurfer.current.playPause();
    }
  };

  return (
    <div className="player-container" style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px" }}>
      <style jsx>{`
        .play-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 1px solid rgba(18, 171, 255, 0.3);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          outline: none;
        }
        .play-btn:hover {
          border-color: #f00c6f;
          box-shadow: 0 0 15px rgba(240, 12, 111, 0.4);
          transform: scale(1.05);
        }
        .play-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          border-color: #333;
          box-shadow: none;
          transform: none;
        }
        .waveform-wrapper {
          flex-grow: 1;
          position: relative;
          transition: filter 0.3s ease;
        }
        /* The Audio-Reactive Glow Effect */
        .waveform-wrapper.active {
          filter: drop-shadow(0 0 8px rgba(240, 12, 111, 0.5));
        }
        .loading-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          color: rgba(18, 171, 255, 0.6);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          pointer-events: none;
        }
      `}</style>

      {/* Play/Pause Button */}
      <button className="play-btn" onClick={togglePlay} disabled={!isReady}>
        {isPlaying ? (
          // Pause Icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          // Play Icon
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Waveform Container */}
      <div className={`waveform-wrapper ${isPlaying ? "active" : ""}`}>
        {!isReady && !hasError && <div className="loading-text">Loading Audio...</div>}
        {hasError && <div className="loading-text" style={{ color: "#f00c6f" }}>Audio Unavailable</div>}
        <div ref={waveformRef} style={{ width: "100%", opacity: isReady ? 1 : 0, transition: "opacity 0.5s ease" }} />
      </div>
    </div>
  );
}