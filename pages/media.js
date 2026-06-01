// pages/media.js
import React, { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
            Music is the product. Code is the infrastructure. Death Beach builds the digital realities where both collide.
          </p>
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
                <Link href="/projects/lumina" className="lumina-link" style={{ fontSize: "13px" }}>
                  HERE
                </Link>
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
          <Link
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
          </Link>
        </motion.section>
      </motion.div>
    </div>
  );
}
