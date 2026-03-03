// pages/press.js
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CustomWavePlayer from "../components/CustomWavePlayer";

export default function PressKit() {
  // Framer Motion variants for high-end staggered entrance
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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Custom premium easing
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
      {/* ── STYLED JSX ── */}
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
          background-color: #1a1a1a;
          border: 1px solid #333;
          border-left: 4px solid #333; /* Default border */
          border-radius: 12px;
          padding: 32px;
          transition: all 0.4s ease;
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
        .contact-btn {
          transition: all 0.3s ease;
        }
        .contact-btn:hover {
          box-shadow: 0 0 12px 3px rgba(18, 171, 255, 0.6), 0 0 30px 8px rgba(18, 171, 255, 0.25);
          color: #ffffff !important;
          background-color: rgba(18, 171, 255, 0.1);
        }
        
        /* Layout scaling for mobile */
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
        }
      `}</style>

      {/* ── FIXED LOGO ── */}
      <div style={{ position: "fixed", top: "32px", left: "32px", zIndex: 50 }}>
        <Link href="/">
          <div style={{ cursor: "pointer", transition: "opacity 0.3s", opacity: 0.9 }} className="hover:opacity-100">
            <Image
              src="/Death_Beach.png"
              alt="Death Beach Logo"
              width={64}
              height={64}
              style={{ display: "block" }}
            />
          </div>
        </Link>
      </div>

      {/* ── MAIN CONTENT (Scrollable with negative space) ── */}
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
        <motion.section variants={itemVariants} className="section-spacing" style={{ marginBottom: "140px" }}>
          <h1
            className="headline gradient-blue-pink"
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              lineHeight: "1.1",
              marginBottom: "32px",
              letterSpacing: "-0.02em",
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
            }}
          >
            Music is the product. Code is the infrastructure. Death Beach builds the digital realities where both collide.
          </p>
        </motion.section>

        {/* 2. THE TRACKS */}
        <motion.section variants={itemVariants} className="section-spacing" style={{ marginBottom: "140px" }}>
          <h2 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "40px" }}>
            01 // The Sonic Thesis
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="track-card pink">
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px", color: "#ffffff" }}>
                "Drunk on the Mic" (Death Beach Remix)
              </h3>
              <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#9ca3af", margin: 0 }}>
                A masterclass in tension, release, and undeniable bounce. It doesn’t just fill a room—it commands the culture.
              </p>

              {/* Inject the high-end player here */}
              <CustomWavePlayer audioUrl="/audio/drunk-on-the-mic-remix.mp3" />
            </div>

            <div className="track-card blue">
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px", color: "#ffffff" }}>
                Desert Transmission
              </h3>
              <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#9ca3af", margin: 0 }}>
                A brooding, frequency-rich descent into analog synthesis and digital precision. This track strips away the static to leave pure, vibrating emotion.
              </p>

              {/* Inject the high-end player here */}
              <CustomWavePlayer audioUrl="/audio/desert-transmission.mp3" />
            </div>

            <div className="track-card pink">
              <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px", color: "#ffffff" }}>
                Neon Bleed
              </h3>
              <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#9ca3af", margin: 0 }}>
                Visceral drum architecture meets haunting, unfiltered vocal production. It is a sonic ecosystem designed to crack you open and leave a lasting mark.
              </p>

              {/* Inject the high-end player here */}
              <CustomWavePlayer audioUrl="/audio/neon-bleed.mp3" />
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
            In partnership with multi-platinum visionary Mickey Shiloh, Death Beach is engineering the rails for total creator sovereignty at{" "}
            <a href="https://soundeconomy.io" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              soundeconomy.io
            </a>. We build the decentralized tools, we architect the community, and we scale the vision—turning independent artists into blue-chip assets.
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
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#d1d5db" }}>
            My “Audio Singularity” real-time 3D environments transform static domains into living, breathing visual ecosystems. In an industry fighting for passive attention, I don’t just pitch a sound—I engineer a fully immersive, vibe-coded world that demands absolute focus.
          </p>
        </motion.section>

        {/* 5. THE CALL TO ACTION */}
        <motion.section
          variants={itemVariants}
          style={{
            textAlign: "center",
            paddingTop: "60px",
            borderTop: "1px solid rgba(255,255,255,0.05)"
          }}
        >
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px", color: "#ffffff" }}>
            Vision is common. Execution is rare. <span className="gradient-blue-pink">Legacy is earned.</span>
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#9ca3af", marginBottom: "48px", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            Whether you are an artist demanding a sonic signature, a founder scaling a cultural movement, or a brand requiring an unforgettable digital world, the standard is set.
            <br /><br />
            Let’s build something that lives.
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