"use client";

import React, { useEffect, useRef, useState } from "react";

// onAudioData: optional callback(Uint8Array) called every animation frame while playing
// Uses a parallel Audio element for the analyser so it works regardless of WaveSurfer version.
export default function CustomWavePlayer({ audioUrl, onAudioData }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const analyserRef = useRef(null);
  const audioElRef = useRef(null);   // parallel Audio element for Web Audio API
  const audioCtxRef = useRef(null);  // AudioContext
  const animFrameRef = useRef(null);
  const frameCountRef = useRef(0);   // for debug logging
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // ── ANALYSER SETUP ──────────────────────────────────────────────────────────
  // We create a separate Audio element that plays in parallel with WaveSurfer.
  // This bypasses the fragile ws.getMediaElement() approach and works reliably
  // across all WaveSurfer versions.
  const setupAnalyser = (url) => {
    if (!onAudioData || !url) return;
    try {
      // Clean up any previous instance
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current.src = "";
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        console.warn("CustomWavePlayer: AudioContext not available");
        return;
      }

      const audioEl = new Audio();
      // Only set crossOrigin for external URLs; local /audio/ files don't need it
      // and setting it can cause CORS errors with some local servers
      if (url.startsWith("http://") || url.startsWith("https://")) {
        audioEl.crossOrigin = "anonymous";
      }
      audioEl.src = url;
      audioEl.preload = "auto";
      audioElRef.current = audioEl;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaElementSource(audioEl);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;          // 1024 bins, ~43Hz per bin at 44.1kHz
      analyser.smoothingTimeConstant = 0.8; // NO browser-side smoothing — we do our own
      source.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;

      console.log("CustomWavePlayer: analyser ready, fftSize=2048, bins=", analyser.frequencyBinCount);
    } catch (e) {
      console.warn("CustomWavePlayer: analyser setup failed:", e.message);
    }
  };

  // ── POLL LOOP ───────────────────────────────────────────────────────────────
  const startAnalysis = () => {
    if (!analyserRef.current || !onAudioData) return;
    const analyser = analyserRef.current;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(data);
      onAudioData(data);

      // Debug: log every 60 frames (~1 second) to confirm data is flowing
      frameCountRef.current++;
      if (frameCountRef.current % 60 === 0) {
        console.log(
          `[AudioData] bass[0-4]: ${data[0]},${data[1]},${data[2]},${data[3]},${data[4]}` +
          ` | mid[20]: ${data[20]}` +
          ` | high[100]: ${data[100]}`
        );
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  };

  const stopAnalysis = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    frameCountRef.current = 0;
    if (onAudioData) onAudioData(null);
  };

  // ── WAVESURFER INIT ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    // Set up the parallel analyser immediately
    setupAnalyser(audioUrl);

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
        });

        ws.on("play", () => {
          setIsPlaying(true);
          // Sync parallel audio element with WaveSurfer
          if (audioElRef.current && audioCtxRef.current) {
            audioCtxRef.current.resume().catch(() => {});
            audioElRef.current.currentTime = ws.getCurrentTime();
            audioElRef.current.play().catch((e) => {
              console.warn("Parallel audio play failed:", e.message);
            });
          }
          startAnalysis();
        });

        ws.on("pause", () => {
          setIsPlaying(false);
          if (audioElRef.current) audioElRef.current.pause();
          stopAnalysis();
        });

        ws.on("finish", () => {
          setIsPlaying(false);
          if (audioElRef.current) {
            audioElRef.current.pause();
            audioElRef.current.currentTime = 0;
          }
          stopAnalysis();
        });

        ws.on("seek", () => {
          // Keep parallel audio in sync when user scrubs the waveform
          if (audioElRef.current) {
            audioElRef.current.currentTime = ws.getCurrentTime();
          }
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
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current.src = "";
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
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
