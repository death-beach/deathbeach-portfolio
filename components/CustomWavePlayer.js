"use client";

import React, { useEffect, useRef, useState } from "react";

// onAudioData: optional callback(Float32Array) called every animation frame while playing
export default function CustomWavePlayer({ audioUrl, onAudioData }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Poll analyser for frequency data while playing
  const startAnalysis = () => {
    if (!analyserRef.current || !onAudioData) return;
    const analyser = analyserRef.current;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(data);
      onAudioData(data);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  };

  const stopAnalysis = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (onAudioData) onAudioData(null);
  };

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    let ws;

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

        try {
          const loadPromise = ws.load(audioUrl);
          if (loadPromise && typeof loadPromise.catch === "function") {
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

          // Set up Web Audio analyser — original working approach
          if (onAudioData && !analyserRef.current) {
            try {
              const mediaEl = typeof ws.getMediaElement === "function" ? ws.getMediaElement() : null;
              if (mediaEl) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) throw new Error("No AudioContext");
                const ctx = new AudioCtx();
                // Resume context (required by browser autoplay policy)
                ctx.resume().catch(() => {});
                const source = ctx.createMediaElementSource(mediaEl);
                const analyser = ctx.createAnalyser();
                analyser.fftSize = 4096;
                source.connect(analyser);
                analyser.connect(ctx.destination);
                analyserRef.current = analyser;
              }
              // If getMediaElement not available, skip analyser silently — audio still works
            } catch (e) {
              // Analyser failed — audio playback is unaffected
              console.warn("Audio analyser unavailable (audio still plays):", e.message);
            }
          }
        });

        ws.on("play", () => {
          setIsPlaying(true);
          // Sync parallel audio playback with WaveSurfer (fallback only)
          if (analyserRef.current?.parallelAudio) {
            analyserRef.current.parallelAudio.currentTime = ws.getCurrentTime();
            analyserRef.current.parallelAudio.play().catch(() => {});
          }
          startAnalysis();
        });

        ws.on("pause", () => {
          setIsPlaying(false);
          // Sync parallel audio pause with WaveSurfer (fallback only)
          if (analyserRef.current?.parallelAudio) {
            analyserRef.current.parallelAudio.pause();
          }
          stopAnalysis();
        });

        ws.on("finish", () => {
          setIsPlaying(false);
          // Sync parallel audio stop with WaveSurfer (fallback only)
          if (analyserRef.current?.parallelAudio) {
            analyserRef.current.parallelAudio.pause();
            analyserRef.current.parallelAudio.currentTime = 0;
          }
          stopAnalysis();
        });

        ws.on("error", (error) => {
          console.warn("WaveSurfer error:", error);
          setHasError(true);
          setIsReady(false);
        });

        ws.on("load", () => {
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
      stopAnalysis();
      if (analyserRef.current?.parallelAudio) {
        analyserRef.current.parallelAudio.pause();
        analyserRef.current.parallelAudio = null;
      }
      if (ws) ws.destroy();
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

      <button className="play-btn" onClick={togglePlay} disabled={!isReady}>
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className={`waveform-wrapper ${isPlaying ? "active" : ""}`}>
        {!isReady && !hasError && <div className="loading-text">Loading Audio...</div>}
        {hasError && <div className="loading-text" style={{ color: "#f00c6f" }}>Audio Unavailable</div>}
        <div ref={waveformRef} style={{ width: "100%", opacity: isReady ? 1 : 0, transition: "opacity 0.5s ease" }} />
      </div>
    </div>
  );
}
