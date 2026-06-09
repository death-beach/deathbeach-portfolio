// pages/media.js
import React, { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import CustomWavePlayer from "../components/CustomWavePlayer";

// Dynamically import MediaSingularity to avoid SSR issues (Three.js needs browser)
const MediaSingularity = dynamic(() => import("../components/MediaSingularity"), { ssr: false });

export default function PressKit() {
  // Shared audio frequency data — stored in a ref so updates don't trigger re-renders.
  // The Three.js useFrame loops read audioDataRef.current directly at 60fps.
  const audioDataRef = useRef(null);

  // Shared playlist state — null means nothing playing, 0 = track 1, 1 = track 2
  const [playingIndex, setPlayingIndex] = useState(null);

  // Resize functions for waveform players
  const [resizeFunctions, setResizeFunctions] = useState({});

  // Mobile detection for portrait sizing
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleAudioData = useCallback((data) => {
    audioDataRef.current = data || null;
  }, []);

  const handleResizeCallback = useCallback((index, resizeFn) => {
    setResizeFunctions(prev => ({ ...prev, [index]: resizeFn }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        color: "#ffffff",
        fontFamily: "'Hanken Grotesk', sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style jsx>{`
        .gradient-pink-magenta {
          background: linear-gradient(90deg, #f00c6f, #dd11b0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-blue-pink {
          background: linear-gradient(90deg, #12abff, #f00c6f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .track-card {
          position: relative;
          z-index: 10;
          background-color: rgba(26, 26, 26, 0.85);
          border: 1px solid #333;
          border-left: 4px solid #333;
          border-radius: 12px;
          padding: 32px;
          transition: all 0.4s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .track-card.pink:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(240, 12, 111, 0.15);
          border-left-color: #f00c6f;
        }
        .track-card.blue:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(18, 171, 255, 0.15);
          border-left-color: #12abff;
        }
        .lumina-link {
          color: #12abff;
          text-decoration: none;
          border-bottom: 1px solid rgba(18, 171, 255, 0.4);
          transition: all 0.2s ease;
          padding-bottom: 1px;
        }
        .lumina-link:hover {
          color: #ffffff;
          border-bottom-color: #ffffff;
        }
        .contact-btn {
          transition: all 0.3s ease;
        }
        .contact-btn:hover {
          box-shadow: 0 0 12px 3px rgba(18, 171, 255, 0.6), 0 0 30px 8px rgba(18, 171, 255, 0.25);
          color: #ffffff !important;
          background-color: rgba(18, 171, 255, 0.1);
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 100px 24px 80px 24px !important;
          }
          .headline {
            font-size: 36px !important;
          }
          .section-spacing {
            margin-bottom: 80px !important;
          }
            .track-card {            
            background-color: #141414 !important;             
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;            
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.9) !important; 
          }
        }
      `}</style>

      {/* ── FIXED LOGO ── */}
      <div className="fixed-logo" style={{ position: "fixed", top: "32px", left: "32px", zIndex: 50 }}>
        <a href="/">
          <div style={{ cursor: "pointer", transition: "opacity 0.3s", opacity: 0.9 }} className="hover:opacity-100">
            <Image
              src="/Death_Beach.png"
              alt="Death Beach Logo"
              width={64}
              height={64}
              style={{ display: "block" }}
            />
          </div>
        </a>
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        className="content-wrapper"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "160px 32px 120px 32px",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1. THE HOOK */}
        <motion.section variants={itemVariants} className="section-spacing" style={{ marginBottom: "140px", position: "relative" }}>
          <Image
            src="/portrait.png"
            alt="Death Beach"
            width={isMobile ? 180 : 380}
            height={isMobile ? 220 : 480}
            style={{
              position: "absolute",
              top: isMobile ? "120%" : "50%",
              left: isMobile ? "60%" : "85%",
              transform: "translate(-50%, -50%)",
              objectFit: "cover",
              opacity: 1.0,
              zIndex: 0,
              maskImage: "radial-gradient(ellipse 65% 70% at 50% 50%, black 0%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 65% 70% at 50% 50%, black 10%, transparent 75%)",
            }}
          />
          <h1
            className="headline gradient-blue-pink"
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              lineHeight: "1.1",
              marginBottom: "32px",
              letterSpacing: "-0.02em",
              position: "relative",
              zIndex: 1,
            }}
          >
            Architect of sound.<br />
            Engineer of scale.<br />
            Creator of worlds.
          </h1>
          <p
            style={{
              fontSize: "22px",
              lineHeight: "1.6",
              color: "#d1d5db",
              maxWidth: "600px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Building immersive music experiences.
          </p>
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* X (Twitter) */}
            <a
              href="https://x.com/deathbeach"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Death Beach on X"
              style={{ color: "#9ca3af", textDecoration: "none" }}
            >
              <svg style={{ width: "24px", height: "24px" }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/deathbeach_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Death Beach on Instagram"
              style={{ color: "#9ca3af", textDecoration: "none" }}
            >
              <svg style={{ width: "24px", height: "24px" }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/deathbeach"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Death Beach on Telegram"
              style={{ color: "#9ca3af", textDecoration: "none" }}
            >
              <svg style={{ width: "24px", height: "24px" }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.820 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/death-beach"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Death Beach on GitHub"
              style={{ color: "#9ca3af", textDecoration: "none" }}
            >
              <svg style={{ width: "24px", height: "24px" }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </motion.div>
        </motion.section>

        {/* 2. THE TRACKS — MediaSingularity lives behind this section */}
        <motion.section
          variants={itemVariants}
          className="section-spacing"
          style={{
            marginBottom: "140px",
            position: "relative",
            paddingTop: "60px",
            paddingBottom: "60px",
          }}
        >
          {/* ── 3D BACKGROUND: absolute inside section, bleeds to viewport edges ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "calc(-50vw + 50%)",
              right: "calc(-50vw + 50%)",
              zIndex: 0,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <MediaSingularity
              audioDataRef={audioDataRef}
              position={[4.5, 0, 0]}
            />
            {/* Top fade-in — mirrors the bottom fade-out inside AudioSingularity */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "30%",
                background: "linear-gradient(to bottom, #0f0f0f 0%, transparent 100%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          </div>

          {/* ── CONTENT (sits above the 3D scene) ── */}
          <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
            <h2 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "40px" }}>
              01 // The Sonic Thesis
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Track 1 */}
              <motion.div
                className="track-card pink"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onAnimationComplete={() => resizeFunctions[0]?.()}
              >
                <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "4px", color: "#ffffff" }}>
                  "Drunk on the Mic"
                </h3>
                <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "20px", marginTop: 0 }}>
                  Mickey Shiloh (Death Beach Remix)
                </p>
                <CustomWavePlayer
                  audioUrl="/audio/drunk-on-the-mic-remix.mp3"
                  onAudioData={handleAudioData}
                  onResize={(fn) => handleResizeCallback(0, fn)}
                  isPlaying={playingIndex === 0}
                  onPlay={() => setPlayingIndex(0)}
                  onPause={() => setPlayingIndex(null)}
                  onFinish={() => setPlayingIndex(1)}
                />
              </motion.div>

              {/* Track 2 */}
              <motion.div
                className="track-card blue"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onAnimationComplete={() => resizeFunctions[1]?.()}
              >
                <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "4px", color: "#ffffff" }}>
                  "Trap(ped)"
                </h3>
                <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "20px", marginTop: 0 }}>
                  Death Beach
                </p>
                <CustomWavePlayer
                  audioUrl="/audio/Trap(ped).mp3"
                  onAudioData={handleAudioData}
                  onResize={(fn) => handleResizeCallback(1, fn)}
                  isPlaying={playingIndex === 1}
                  onPlay={() => setPlayingIndex(1)}
                  onPause={() => setPlayingIndex(null)}
                  onFinish={() => setPlayingIndex(null)}
                />
              </motion.div>
            </div>

            {/* ── LUMINA LINK CALLOUT ── */}
            <div
              style={{
                position: "relative",
                zIndex: 20,
                marginTop: "40px",
                paddingTop: "28px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#9ca3af", marginBottom: "10px" }}>
                Play with reactive and immersive 3D visuals live{" "}
                <a
                  href="https://beautifulnothing.deathbeachstudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lumina-link"
                >
                  HERE
                </a>
                .
              </p>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                Learn about Lumina{" "}
                <a href="/lumina" className="lumina-link" style={{ fontSize: "13px" }}>
                  HERE
                </a>
                .
              </p>
            </div>
          </div>
        </motion.section>

        {/* 3. THE BUSINESS PROWESS */}
        <motion.section variants={itemVariants} className="section-spacing" style={{ marginBottom: "140px" }}>
          <h2 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "32px" }}>
            02 // The Economic Engine
          </h2>
          <h3 className="gradient-pink-magenta" style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px" }}>
            Art without leverage is a liability.
          </h3>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#d1d5db" }}>
            In partnership with multi-platinum visionary Mickey Shiloh, Death Beach helped build the rails for creator sovereignty — work that became part of HRDRV's education track (soundeconomy.io). We build the decentralized tools, architect the community, and scale the vision.
          </p>
        </motion.section>

        {/* 4. THE TECH / 3D EDGE */}
        <motion.section variants={itemVariants} className="section-spacing" style={{ marginBottom: "160px" }}>
          <h2 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "32px" }}>
            03 // The Digital Dimension
          </h2>
          <h3 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px", color: "#ffffff" }}>
            The screen is a canvas. The browser is a venue. Code is the ultimate instrument.
          </h3>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#d1d5db", marginBottom: "24px" }}>
            Lumina, my real-time 3D environment app transforms static domains into living, breathing visual ecosystems. In an industry fighting for passive attention, I don't just pitch a sound, I engineer a fully immersive, world that demands absolute focus.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#d1d5db" }}>
            I'm at my best in music production and artistic development, helping the art come out of the artist. I can engineer, produce, or mix when needed, but I don't need to be the finalizer. I'm here to make the vision stronger before it ever reaches another producer, mixer, or label.
          </p>
        </motion.section>

        {/* 5. THE CALL TO ACTION */}
        <motion.section
          variants={itemVariants}
          className="section-spacing"
          style={{
            textAlign: "center",
            paddingTop: "60px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            marginBottom: 0,
          }}
        >
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px", color: "#ffffff" }}>
            Vision is common. Execution is rare. <span className="gradient-blue-pink">Legacy is earned.</span>
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#9ca3af", marginBottom: "48px", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            Whether you are an artist demanding a sonic signature, a founder scaling a cultural movement, or a brand requiring an unforgettable digital world, the standard is set.
            <br /><br />
            Let's build something that lives.
          </p>
          <a
            href="/contact"
            className="contact-btn"
            style={{
              display: "inline-block",
              padding: "16px 48px",
              backgroundColor: "transparent",
              color: "#12abff",
              border: "1px solid #12abff",
              borderRadius: "4px",
              fontSize: "18px",
              fontWeight: "500",
              letterSpacing: "0.05em",
            }}
          >
            Initiate Contact
          </a>
        </motion.section>
      </motion.div>
    </div>
  );
}
