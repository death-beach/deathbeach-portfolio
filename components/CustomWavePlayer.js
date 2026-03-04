"use client";

import React, { useEffect, useRef, useState } from "react";

// onAudioData: callback(Uint8Array) called every animation frame while playing.
// Uses a parallel Audio element so the analyser works regardless of WaveSurfer version.
//
// fftSize = 4096 → frequencyBinCount = 2048 bins
// At 44100Hz sample rate: bin width = 44100/4096 ≈ 10.77Hz per bin
// Bass  (0–86Hz)    → bins 0–7
// Mids  (200–900Hz) → bins 19–84
// Highs (1.5k–20k)  → bins 139–1857
export default function CustomWavePlayer({ audioUrl, onAudioData }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const analyserRef = useRef(null);
  const audioElRef = useRef(null);
  const audioCtxRef = useRef(null);
  const animFrameRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const setupAnalyser = (url) => {
    if (!onAudioData || !url) return;
    try {
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current.src = "";
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const audioEl = new Audio();
      // crossOrigin only needed for external URLs
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
      analyser.fftSize = 4096;               // 2048 bins, 10.77Hz per bin
      analyser.smoothingTimeConstant = 0.5;  // balanced: not noisy, not sluggish

      // Silencer gain node: analyser reads the full signal, but output to speakers is 0.
      // This keeps the parallel element inaudible while WaveSurfer remains the only audio source.
      const silencer = ctx.createGain();
      silencer.gain.value = 0;

      source.connect(analyser);
      analyser.connect(silencer);
      silencer.connect(ctx.destination);
      analyserRef.current = analyser;

      console.log("[MediaPlayer] analyser ready — bins:", analyser.frequencyBinCount, "smoothing:", analyser.smoothingTimeConstant);
    } catch (e) {
      console.warn("[MediaPlayer] analyser setup failed:", e.message);
    }
  };

  const startAnalysis = () => {
    // Always cancel any existing loop before starting a new one
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (!analyserRef.current || !onAudioData) return;
    const analyser = analyserRef.current;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;

    const tick = () => {
      analyser.getByteFrequencyData(data);
      onAudioData(data);

      // Log every 2 seconds to verify data is flowing
      if (++frame % 120 === 0) {
        const bassMax = Math.max(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
        console.log(`[MediaPlayer] bass peak (bins 0-7): ${bassMax}/255 = ${(bassMax/255).toFixed(2)} | mid[40]: ${data[40]} | high[200]: ${data[200]}`);
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
    if (onAudioData) onAudioData(null);
  };

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

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
          const p = ws.load(audioUrl);
          if (p && typeof p.catch === "function") p.catch(() => { setHasError(true); setIsReady(false); });
        } catch { setHasError(true); setIsReady(false); return; }

        ws.on("ready", () => { setIsReady(true); setHasError(false); });

        ws.on("play", () => {
          setIsPlaying(true);
          if (audioElRef.current && audioCtxRef.current) {
            audioCtxRef.current.resume().catch(() => {});
            audioElRef.current.currentTime = ws.getCurrentTime();
            audioElRef.current.play().catch((e) => console.warn("[MediaPlayer] parallel play failed:", e.message));
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
          if (audioElRef.current) { audioElRef.current.pause(); audioElRef.current.currentTime = 0; }
          stopAnalysis();
        });

        ws.on("seek", () => {
          if (audioElRef.current) audioElRef.current.currentTime = ws.getCurrentTime();
        });

        ws.on("error", () => { setHasError(true); setIsReady(false); });
        ws.on("load", () => setHasError(false));
      } catch (e) { setHasError(true); setIsReady(false); }
    }).catch(() => { setHasError(true); setIsReady(false); });

    return () => {
      stopAnalysis();
      if (audioElRef.current) { audioElRef.current.pause(); audioElRef.current.src = ""; }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") audioCtxRef.current.close().catch(() => {});
      if (ws) ws.destroy();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (wavesurfer.current && isReady) wavesurfer.current.playPause();
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px" }}>
      <style jsx>{`
        .play-btn {
          width: 48px; height: 48px; border-radius: 50%;
          background: #1a1a1a; border: 1px solid rgba(18, 171, 255, 0.3);
          color: #fff; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s ease; flex-shrink: 0; outline: none;
        }
        .play-btn:hover { border-color: #f00c6f; box-shadow: 0 0 15px rgba(240,12,111,0.4); transform: scale(1.05); }
        .play-btn:disabled { opacity: 0.5; cursor: not-allowed; border-color: #333; box-shadow: none; transform: none; }
        .wave-wrap { flex-grow: 1; position: relative; transition: filter 0.3s ease; }
        .wave-wrap.active { filter: drop-shadow(0 0 8px rgba(240,12,111,0.5)); }
        .status { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          font-size: 12px; color: rgba(18,171,255,0.6); letter-spacing: 0.1em;
          text-transform: uppercase; pointer-events: none; }
      `}</style>

      <button className="play-btn" onClick={togglePlay} disabled={!isReady}>
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      <div className={`wave-wrap ${isPlaying ? "active" : ""}`}>
        {!isReady && !hasError && <div className="status">Loading Audio...</div>}
        {hasError && <div className="status" style={{ color: "#f00c6f" }}>Audio Unavailable</div>}
        <div ref={waveformRef} style={{ width: "100%", opacity: isReady ? 1 : 0, transition: "opacity 0.5s ease" }} />
      </div>
    </div>
  );
}
