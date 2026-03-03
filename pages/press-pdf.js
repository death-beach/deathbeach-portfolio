// pages/press-pdf.js
// Dedicated PDF export page - open this page and Cmd+P to save as PDF
// Each slide is a fixed 1280x720 div (16:9) styled identically to press.js

import React from "react";
import Image from "next/image";

const SLIDE_W = 1280;
const SLIDE_H = 720;

const slideStyle = {
  width: `${SLIDE_W}px`,
  height: `${SLIDE_H}px`,
  backgroundColor: "#0f0f0f",
  color: "#ffffff",
  fontFamily: "'Hanken Grotesk', Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "80px",
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
  pageBreakAfter: "always",
};

const trackCardBase = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: "12px",
  padding: "28px",
  textAlign: "left",
  width: "340px",
  flexShrink: 0,
};

export default function PressPDF() {
  return (
    <div style={{ backgroundColor: "#0f0f0f" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0f0f0f;
          margin: 0;
          padding: 0;
        }

        .gradient-blue-pink {
          background: linear-gradient(90deg, #12abff, #f00c6f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-pink-magenta {
          background: linear-gradient(90deg, #f00c6f, #dd11b0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .slide-label {
          position: absolute;
          top: 32px;
          left: 40px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #6b7280;
        }

        .slide-number {
          position: absolute;
          bottom: 32px;
          right: 40px;
          font-size: 11px;
          color: #333;
          letter-spacing: 0.1em;
        }

        @media print {
          @page {
            size: 1280px 720px;
            margin: 0;
          }
          body {
            background: #0f0f0f !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .slide {
            page-break-after: always;
          }
        }
      `}</style>

      {/* ── SLIDE 1: THE HOOK ── */}
      <div className="slide" style={slideStyle}>
        {/* Logo top-left */}
        <div style={{ position: "absolute", top: "28px", left: "36px" }}>
          <Image src="/Death_Beach.png" alt="Death Beach" width={52} height={52} />
        </div>
        <span className="slide-label" style={{ left: "100px" }}>Death Beach Studio</span>
        <span className="slide-number">01 / 05</span>

        <h1
          className="gradient-blue-pink"
          style={{
            fontSize: "72px",
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
            maxWidth: "700px",
          }}
        >
          Music is the product. Code is the infrastructure.<br />
          Death Beach builds the digital realities where both collide.
        </p>
      </div>

      {/* ── SLIDE 2: THE TRACKS ── */}
      <div className="slide" style={slideStyle}>
        {/* Logo top-left */}
        <div style={{ position: "absolute", top: "28px", left: "36px" }}>
          <Image src="/Death_Beach.png" alt="Death Beach" width={52} height={52} />
        </div>
        <span className="slide-label" style={{ left: "100px" }}>Death Beach Studio</span>
        <span className="slide-number">02 / 05</span>

        {/* Static gradient background mimicking AudioSingularity */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 75% 50%, rgba(240,12,111,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(18,171,255,0.10) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />
        {/* Decorative rings */}
        <svg style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", opacity: 0.15, zIndex: 0 }} width="500" height="500" viewBox="0 0 500 500">
          <circle cx="250" cy="250" r="200" fill="none" stroke="#f00c6f" strokeWidth="1" />
          <circle cx="250" cy="250" r="160" fill="none" stroke="#12abff" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="120" fill="none" stroke="#f00c6f" strokeWidth="1" />
          <circle cx="250" cy="250" r="80" fill="none" stroke="#12abff" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="40" fill="none" stroke="#f00c6f" strokeWidth="1" />
        </svg>

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <h2
          style={{
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#6b7280",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          01 // The Sonic Thesis
        </h2>

        <div style={{ display: "flex", gap: "24px", justifyContent: "center", alignItems: "flex-start" }}>
          {/* Card 1 */}
          <div style={{ ...trackCardBase, borderLeft: "4px solid #f00c6f" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: "#ffffff" }}>
              "Drunk on the Mic"<br />
              <span style={{ color: "#9ca3af", fontWeight: "normal", fontSize: "16px" }}>(Death Beach Remix)</span>
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#9ca3af" }}>
              A masterclass in tension, release, and undeniable bounce. It doesn't just fill a room—it commands the culture.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ ...trackCardBase, borderLeft: "4px solid #12abff" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: "#ffffff" }}>
              Desert Transmission
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#9ca3af" }}>
              A brooding, frequency-rich descent into analog synthesis and digital precision. This track strips away the static to leave pure, vibrating emotion.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ ...trackCardBase, borderLeft: "4px solid #f00c6f" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: "#ffffff" }}>
              Neon Bleed
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#9ca3af" }}>
              Visceral drum architecture meets haunting, unfiltered vocal production. A sonic ecosystem designed to crack you open and leave a lasting mark.
            </p>
          </div>
        </div>
        </div>{/* close zIndex wrapper */}
      </div>{/* close slide 2 */}

      {/* ── SLIDE 3: THE BUSINESS ── */}
      <div className="slide" style={slideStyle}>
        <div style={{ position: "absolute", top: "28px", left: "36px" }}>
          <Image src="/Death_Beach.png" alt="Death Beach" width={52} height={52} />
        </div>
        <span className="slide-label" style={{ left: "100px" }}>Death Beach Studio</span>
        <span className="slide-number">03 / 05</span>

        <h2
          style={{
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#6b7280",
            marginBottom: "40px",
          }}
        >
          02 // The Economic Engine
        </h2>
        <h3
          className="gradient-pink-magenta"
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            marginBottom: "32px",
            lineHeight: "1.1",
          }}
        >
          Art without leverage<br />is a liability.
        </h3>
        <p style={{ fontSize: "20px", lineHeight: "1.7", color: "#d1d5db", maxWidth: "800px" }}>
          In partnership with multi-platinum visionary Mickey Shiloh, Death Beach is engineering the rails for total creator sovereignty at{" "}
          <span style={{ color: "#ffffff", textDecoration: "underline" }}>soundeconomy.io</span>.
          We build the decentralized tools, architect the community, and scale the vision—turning independent artists into blue-chip assets.
        </p>
      </div>

      {/* ── SLIDE 4: THE TECH ── */}
      <div className="slide" style={slideStyle}>
        <div style={{ position: "absolute", top: "28px", left: "36px" }}>
          <Image src="/Death_Beach.png" alt="Death Beach" width={52} height={52} />
        </div>
        <span className="slide-label" style={{ left: "100px" }}>Death Beach Studio</span>
        <span className="slide-number">04 / 05</span>

        <h2
          style={{
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#6b7280",
            marginBottom: "40px",
          }}
        >
          03 // The Digital Dimension
        </h2>
        <h3
          style={{
            fontSize: "44px",
            fontWeight: "bold",
            marginBottom: "32px",
            color: "#ffffff",
            lineHeight: "1.2",
            maxWidth: "900px",
          }}
        >
          The screen is a canvas.<br />
          The browser is a venue.<br />
          Code is the ultimate instrument.
        </h3>
        <p style={{ fontSize: "20px", lineHeight: "1.7", color: "#d1d5db", maxWidth: "800px" }}>
          My "Audio Singularity" real-time 3D environments transform static domains into living, breathing visual ecosystems. In an industry fighting for passive attention, I don't just pitch a sound—I engineer a fully immersive, vibe-coded world that demands absolute focus.
        </p>
      </div>

      {/* ── SLIDE 5: THE CTA ── */}
      <div className="slide" style={{ ...slideStyle, borderTop: "none" }}>
        <div style={{ position: "absolute", top: "28px", left: "36px" }}>
          <Image src="/Death_Beach.png" alt="Death Beach" width={52} height={52} />
        </div>
        <span className="slide-label" style={{ left: "100px" }}>Death Beach Studio</span>
        <span className="slide-number">05 / 05</span>

        <h2
          style={{
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#6b7280",
            marginBottom: "40px",
          }}
        >
          04 // The Standard
        </h2>
        <h3
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            marginBottom: "32px",
            color: "#ffffff",
            lineHeight: "1.2",
          }}
        >
          Vision is common.<br />
          Execution is rare.{" "}
          <span className="gradient-blue-pink">Legacy is earned.</span>
        </h3>
        <p style={{ fontSize: "20px", lineHeight: "1.7", color: "#9ca3af", maxWidth: "800px", marginBottom: "48px" }}>
          Whether you are an artist demanding a sonic signature, a founder scaling a cultural movement, or a brand requiring an unforgettable digital world, the standard is set.
        </p>
        <div
          style={{
            display: "inline-block",
            padding: "16px 48px",
            border: "1px solid #12abff",
            borderRadius: "4px",
            color: "#12abff",
            fontSize: "18px",
            fontWeight: "500",
            letterSpacing: "0.05em",
          }}
        >
          deathbeachstudio.com
        </div>
      </div>
    </div>
  );
}