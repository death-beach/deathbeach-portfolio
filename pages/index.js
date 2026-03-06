// pages/index.js - Death Beach main landing page
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Hero from "@/components/hero"
import { getProjectBySlug } from "../data/projects"

const CDN = "https://cdn.jsdelivr.net/gh/death-beach/portfolio-images"

export async function getStaticProps() {
  const project = getProjectBySlug("production")
  return {
    props: {
      project: project || null,
    },
  }
}

export default function Home({ project }) {
  const { customContent } = project || {}
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Hanken Grotesk', sans-serif",
        backgroundColor: "#0f0f0f",
        color: "#ffffff",
      }}
    >
      <style jsx>{`
        /* ── Grids ── */
        .embeds-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }
        .videos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        /* ── Bio split ── */
        .bio-split {
          display: grid;
          grid-template-columns: 58fr 42fr;
          gap: 48px;
          align-items: start;
        }

        /* ── Gradient text ── */
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

        /* ── Bullet hanging indent ── */
        .bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .bullet-list li {
          padding-left: 1.2em;
          text-indent: -1.2em;
          line-height: 2;
          color: #d1d5db;
          font-size: 16px;
        }

        /* ── Desktop: show right-column images, hide inline mobile images ── */
        .bio-images-desktop {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .bio-images-mobile {
          display: none;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .embeds-grid {
            grid-template-columns: 1fr;
          }
          .videos-grid {
            grid-template-columns: 1fr;
          }
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .bio-split {
            grid-template-columns: 1fr;
          }
          /* On mobile: hide right column, show inline images */
          .bio-images-desktop {
            display: none;
          }
          .bio-images-mobile {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          /* Hide desktop Let's Rock! button on mobile */
          .lets-rock-desktop {
            display: none;
          }
          /* ── Mobile: tighten space above Death Beach section ── */
          .section-bio {
            padding-top: 12px !important;
          }
          /* ── Mobile section background boosts ── */
          .section-what-i-build {
            background: linear-gradient(to bottom, #0f0f0f, rgba(18, 171, 255, 0.35)) !important;
          }
          .section-experience {
            background: linear-gradient(to bottom, rgba(18, 171, 255, 0.20) 60%, #0f0f0f 100%) !important;
          }
          .section-selected-worlds {
            background: linear-gradient(to bottom, #0f0f0f, rgba(240, 12, 111, 0.28)) !important;
          }
          .section-lets-build {
            background-color: rgba(221, 17, 176, 0.18) !important;
          }
        }

        /* ── NEW: Glow & Hover Effects for Cards ── */
        .section-what-i-build .cards-grid > div,
        .section-selected-worlds .cards-grid > div {
          transition: all 0.3s ease !important;
          cursor: default;
        }
        .section-what-i-build .cards-grid > div:hover,
        .section-selected-worlds .cards-grid > div:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(18, 171, 255, 0.25);
          border-left-color: #f00c6f !important;
        }
      `}</style>
      <style jsx global>{`
        .hero-wrapper > div {
          background-color: rgba(26, 26, 26, 0.65) !important;
        }
        .contact-btn {
          transition: box-shadow 0.3s ease, color 0.3s ease;
        }
        .contact-btn:hover {
          box-shadow: 0 0 12px 3px rgba(18, 171, 255, 0.6), 0 0 30px 8px rgba(18, 171, 255, 0.25);
          color: #ffffff !important;
        }
      `}</style>

      {/* ── Nav / Logo — hero image bleeds through Hero.js background ── */}
      <div
        className="hero-wrapper"
        style={{
          backgroundImage: `url(${CDN}/hero_image%20(1).png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Hero />
        {/* ── HERO DIVIDER ────────────────────────────────────────────
            This sits at the exact boundary between the hero and the
            rest of the page. Adjust height (default 5px) or the
            radial-gradient stops to change the glow intensity/spread.
            The mobile override in hero.jsx (.hero-divider media query)
            makes it taller and brighter on small screens.
        ─────────────────────────────────────────────────────────── */}
        {/*<div
          className="hero-divider"
          style={{
            height: "5px",
            position: "relative",
            zIndex: 2,
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 30%, rgba(255,255,255,0.08) 60%, transparent 80%)",
          }}
        /> */}
      </div>

      {/* ────────────────────────────────────────────
          Section 2 — Bio Split
      ──────────────────────────────────────────── */}
      <div className="section-bio" style={{ backgroundColor: "#0f0f0f", padding: "35px 16px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div className="bio-split">

            {/* Left: heading + bio text (+ mobile images inline) */}
            <div>
              <h1
                className="gradient-pink-magenta"
                style={{
                  fontSize: "42px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                Death Beach
              </h1>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "normal",
                  marginBottom: "36px",
                  color: "#d1d5db",
                  lineHeight: "1.6",
                }}
              >
                <i>Music Production, Engineering, &amp; Mixing</i>
              </h3>

              {/* Desktop only: Let's Rock! button */}
              <div style={{ textAlign: "left", marginBottom: "36px" }} className="lets-rock-desktop">
                <a
                  href="https://deathbeach.typeform.com/to/owqJZWqf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn"
                  style={{
                    display: "inline-block",
                    padding: "14px 40px",
                    backgroundColor: "transparent",
                    color: "#12abff",
                    border: "1px solid #12abff",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  Let's Rock!
                </a>
              </div>

              {/* Mobile only: first image between subtitle and bio */}
              <div className="bio-images-mobile" style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 0 0 1px rgba(240, 12, 111, 0.25)",
                  }}
                >
                  <Image
                    src={`${CDN}/1_350.png`}
                    alt="Death Beach in studio"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                  />
                </div>

                {/* Mobile only: Let's Rock! button */}
                <div style={{ textAlign: "center", marginTop: "32px" }}>
                  <a
                    href="https://deathbeach.typeform.com/to/owqJZWqf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn"
                    style={{
                      display: "inline-block",
                      padding: "14px 40px",
                      backgroundColor: "transparent",
                      color: "#12abff",
                      border: "1px solid #12abff",
                      borderRadius: "4px",
                      fontSize: "16px",
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      textDecoration: "none",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Let's Rock!
                  </a>
                </div>
              </div>

              {/* Bio text */}
              <div
                style={{
                  fontSize: "17px",
                  lineHeight: "1.85",
                  color: "#e5e7eb",
                }}
              >
                <p style={{ marginBottom: "20px" }}>You carry entire worlds inside you.</p>
                <p style={{ marginBottom: "20px" }}>
                  Sounds that hit deeper than words alone ever could. Moments so raw they crack you open and make whoever hears it feel everything right along with
                  you.
                </p>
                <p style={{ marginBottom: "20px"}}>Lyrics and music dripping into the ear of fans offering a world for them to live in.</p>
                <p style={{ marginBottom: "20px" }}>
                  You don&apos;t want these sounds &ldquo;recorded.&rdquo; You want them felt. Alive, haunting, honest.
                </p>
                <p style={{ marginBottom: "20px" }}>I live to help you set those worlds free.</p>
                <p style={{ marginBottom: "20px" }}>
                  I&apos;m Death Beach. I&apos;ve been right where you are obsessing over tone, frequencies, and
                  vibration since I was a kid, teaching myself everything I could get my hands on because the hunger
                  wouldn&apos;t let me stop.
                </p>
                < p style={{ marginBottom: "20px" }} >I poured my life into bands, chasing that electric, alive feeling on
                  stage. Our biggest night with Fing was opening for The Damned at the Casbah, and that same fire still
                  drives every single thing I do.
                </p>
                <p style={{ marginBottom: "20px" }}>
                  That path took me from studio intern at Capricorn Studios (learning from Bryan Stratman) to producing
                  full-length albums from the ground up writing, tracking, sound design, the whole thing. I&apos;ve
                  worked in places like Studio West and Rarefied Recording in San Diego, but
                  I&apos;m just as comfortable (and usually more inspired) in a desert Airbnb, a hotel room, or
                  someone&apos;s remote house. The setting doesn&apos;t matter. The feeling does.
                </p>
                <p style={{ marginBottom: "20px" }}>
                  That same raw spirit once turned an LA songwriting camp into pure magic when 11 of us crammed into my
                  Airbnb room, recording while the whole place erupted in screams and cheers over the best improvised
                  lines.
                </p>
                <p>
                  I blend raw, unfiltered performances with obsessive attention to detail so the final record &mdash;
                  or the final product &mdash; becomes a place you (and your people) can completely lose yourselves in.
                </p>
              </div>

              {/* Mobile only: images 2 + 3 after bio */}
              <div className="bio-images-mobile" style={{ marginTop: "32px" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 0 0 1px rgba(240, 12, 111, 0.25)",
                  }}
                >
                  <Image
                    src={`${CDN}/2_350.png`}
                    alt="Death Beach recording"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 0 0 1px rgba(240, 12, 111, 0.25)",
                  }}
                >
                  <Image
                    src={`${CDN}/3_350.png`}
                    alt="Death Beach at work"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                  />
                </div>

                {/* Mobile only: Get In Touch Now! button */}
                <div style={{ textAlign: "center", marginTop: "32px" }}>
                  <a
                    href="https://deathbeach.typeform.com/to/owqJZWqf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn get-in-touch-btn"
                    style={{
                      display: "inline-block",
                      padding: "14px 40px",
                      backgroundColor: "#f00c6f",
                      color: "#ffffff",
                      border: "1px solid #f00c6f",
                      borderRadius: "4px",
                      fontSize: "16px",
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      textDecoration: "none",
                      letterSpacing: "0.05em",
                      boxShadow: "0 0 12px 3px rgba(18, 171, 255, 0.6), 0 0 30px 8px rgba(18, 171, 255, 0.25)",
                    }}
                  >
                    Get In Touch Now!
                  </a>
                </div>
              </div>
            </div>

            {/* Right: images (desktop only) */}
            <div className="bio-images-desktop">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 0 0 1px rgba(240, 12, 111, 0.25)",
                }}
              >
                <Image
                  src={`${CDN}/1_350.png`}
                  alt="Death Beach in studio"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="40vw"
                  priority
                />
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 0 0 1px rgba(240, 12, 111, 0.25)",
                }}
              >
                <Image
                  src={`${CDN}/2_350.png`}
                  alt="Death Beach recording"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="40vw"
                />
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 0 0 1px rgba(240, 12, 111, 0.25)",
                }}
              >
                <Image
                  src={`${CDN}/3_350.png`}
                  alt="Death Beach at work"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="40vw"
                />
              </div>

              {/* Desktop only: Get In Touch Now! button */}
              <div style={{ textAlign: "center", marginTop: "96px" }}>
                <a
                  href="https://deathbeach.typeform.com/to/owqJZWqf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn get-in-touch-btn"
                  style={{
                    display: "inline-block",
                    padding: "14px 40px",
                    backgroundColor: "#f00c6f",
                    color: "#ffffff",
                    border: "1px solid #f00c6f",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  Get In Touch Now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          Section 3 — What I Build
      ──────────────────────────────────────────── */}
      <div className="section-what-i-build" style={{ background: "linear-gradient(to bottom, #0f0f0f, rgba(18, 171, 255, 0.20))", padding: "80px 16px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2
            className="gradient-pink-magenta"
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            What I Build
          </h2>
          <div className="cards-grid">
            {/* Card 1 — Artists & Bands */}
            <div
              onClick={() => setIsModalOpen(true)}
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderLeft: "4px solid #12abff",
                borderRadius: "12px",
                padding: "32px",
                cursor: "pointer",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "#ffffff",
                }}
              >
                For Artists &amp; Bands
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#d1d5db",
                  margin: "0 0 16px 0",
                }}
              >
                Immersive full-length albums and sonic worlds that actually haunt listeners. Deep, long-form creative
                partnerships where character always wins over perfection.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#12abff",
                  textDecoration: "underline",
                  margin: 0,
                  fontWeight: "500",
                }}
              >
                Learn More →
              </p>
            </div>

            {/* Card 2 — Brands, Founders & Crypto */}
            <Link href="/projects" style={{ textDecoration: "none" }}>
              <div
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderLeft: "4px solid #f00c6f",
                  borderRadius: "12px",
                  padding: "32px",
                  cursor: "pointer",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "16px",
                    color: "#ffffff",
                  }}
                >
                  For Brands, Founders &amp; Crypto Projects
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.8",
                    color: "#d1d5db",
                    margin: "0 0 16px 0",
                  }}
                >
                  Vibe-coded products, on-chain tools, and digital experiences that don&apos;t just work &mdash; they
                  feel alive. Same obsession with resonance, frequency, and soul.
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#f00c6f",
                    textDecoration: "underline",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  Learn More →
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Artists & Bands Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "16px",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              padding: "40px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
              border: "1px solid #333",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "#9ca3af",
                fontSize: "24px",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              ×
            </button>

            {/* Modal content - 3 columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "32px",
                marginBottom: "40px",
              }}
            >
              {/* Column 1: Capture (Recording) */}
              <div style={{ textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.1)", paddingRight: "44px" }}>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#12abff",
                    marginBottom: "8px",
                  }}
                >
                  Capture
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#9ca3af",
                    marginBottom: "16px",
                    fontStyle: "italic",
                  }}
                >
                  (Recording)
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "#d1d5db",
                    textAlign: "left",
                  }}
                >
                  Great art begins with an uncompromising snapshot of a moment. I focus on the raw energy of the performance, ensuring the source material is pure, intentional, and distinct. This is where I lay the bedrock of your world, capturing the textures that define your specific identity.
                </p>
              </div>

              {/* Column 2: Atmosphere (Mixing) */}
              <div style={{ textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.1)", paddingLeft: "16px", paddingRight: "19px" }}>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#12abff",
                    marginBottom: "8px",
                  }}
                >
                  Atmosphere
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#9ca3af",
                    marginBottom: "16px",
                    fontStyle: "italic",
                  }}
                >
                  (Mixing)
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "#d1d5db",
                    textAlign: "left",
                  }}
                >
                  The final stage is about depth, perspective, and emotional resonance. I manipulate the space and frequency to ensure your world is not just heard, but felt. By removing the noise and highlighting the intention, I ensure your message translates with absolute authority to the listener.
                </p>
              </div>

              {/* Column 3: Creation (Full Production) */}
              <div style={{ textAlign: "center", paddingLeft: "16px" }}>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#12abff",
                    marginBottom: "8px",
                  }}
                >
                  Creation
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#9ca3af",
                    marginBottom: "16px",
                    fontStyle: "italic",
                  }}
                >
                  (Full Production)
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "#d1d5db",
                    textAlign: "left",
                  }}
                >
                  I translate your internal vision into a tangible landscape. By bridging the gap between raw idea and finished product, I help you build an ecosystem that feels lived-in and authentic. I create for the artist first, knowing that an honest world is the only one worth an audience's time.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div style={{ textAlign: "center" }}>
              <a
                href="https://deathbeach.typeform.com/to/owqJZWqf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn"
                style={{
                  display: "inline-block",
                  padding: "16px 48px",
                  backgroundColor: "#12abff",
                  color: "#ffffff",
                  border: "1px solid #12abff",
                  borderRadius: "4px",
                  fontSize: "18px",
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  fontWeight: "600",
                }}
              >
                Build Your World
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Glowing divider ── */}
      <div
        style={{
          height: "1px",
          background: "rgba(18, 171, 255, 0.7)",
          boxShadow:
            "0 0 8px 2px rgba(18, 171, 255, 0.6), 0 0 24px 6px rgba(18, 171, 255, 0.3), 0 0 60px 12px rgba(18, 171, 255, 0.1)",
        }}
      />

      {/* ────────────────────────────────────────────
          Section 4 — Experience the Worlds
      ──────────────────────────────────────────── */}
      <div className="section-experience" style={{ background: "linear-gradient(to bottom, rgba(18, 171, 255, 0.20), #0f0f0f)", padding: "80px 16px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h1
            className="gradient-pink-magenta"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: "bold",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            Experience the Worlds
          </h1>

          {/* Listen to the Vibe */}
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Listen to the Vibe
          </h3>
          <p
            style={{
              fontSize: "16px",
              color: "#9ca3af",
              marginBottom: "24px",
              fontStyle: "italic",
            }}
          >
            Curated sonic environments.
          </p>
          {customContent && (
            <div className="embeds-grid">
              <div
                style={{
                  height: "352px",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  style={{ borderRadius: "12px", height: "352px", border: "none" }}
                  src={customContent.spotifyEmbed}
                  width="100%"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
              <div
                style={{
                  height: "352px",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  width="100%"
                  height="352"
                  style={{ border: "none" }}
                  allow="autoplay"
                  src={customContent.soundcloudEmbed}
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Watch */}
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            Watch
          </h3>
          {customContent && (
            <div className="videos-grid">
              {customContent.youtubeVideos.map((videoUrl, index) => (
                <iframe
                  key={index}
                  width="100%"
                  height="315"
                  src={videoUrl}
                  title={`YouTube video player ${index + 1}`}
                  style={{ border: "none", borderRadius: "8px" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Pink radial divider — glows center, fades to edges ── */}
      <div
        style={{
          height: "1px",
          background:
            "radial-gradient(ellipse at center, rgba(240, 12, 111, 0.9) 0%, rgba(240, 12, 111, 0.5) 30%, rgba(240, 12, 111, 0.1) 60%, transparent 80%)",
        }}
      />

      {/* ────────────────────────────────────────────
          Section 5 — Selected Worlds
      ──────────────────────────────────────────── */}
      <div className="section-selected-worlds" style={{ background: "linear-gradient(to bottom, #0f0f0f, rgba(240, 12, 111, 0.14))", padding: "80px 16px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2
            className="gradient-pink-magenta"
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            Selected Worlds I&apos;ve Helped Create
          </h2>
          <div className="cards-grid">
            {/* Music card */}
            <div
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderLeft: "4px solid #12abff",
                borderRadius: "12px",
                padding: "32px",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "20px",
                  color: "#ffffff",
                }}
              >
                Music
              </h3>
              <ul className="bullet-list">
                <li>• Five song EP under the open sky in Joshua Tree with Marc Oliver</li>
                <li>• Multi-location album journey with Choirs (Bakersfield to San Diego studios)</li>
                <li>• Assisting Ulrich Wilde on Psychotic Waltz in studio</li>
                <li>• Full production with the Dope Jackets</li>
              </ul>
            </div>

            {/* Products & Crypto card */}
            <div
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderLeft: "4px solid #f00c6f",
                borderRadius: "12px",
                padding: "32px",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "20px",
                  color: "#ffffff",
                }}
              >
                Products &amp; Crypto
              </h3>
              <ul className="bullet-list">
                <li>
                  •{" "}
                  <Link href="/charon" style={{ color: "#d1d5db", textDecoration: "underline" }}>
                    Charon
                  </Link>{" "}
                  &ndash; POS for stablecoins
                </li>
                <li>
                  •{" "}
                  <Link href="/charon-wallet" style={{ color: "#d1d5db", textDecoration: "underline" }}>
                    Charon Wallet
                  </Link>{" "}
                  &ndash; wallet for merchants, 2FA, swaps
                </li>
                <li>
                  •{" "}
                  <a
                    href="https://github.com/death-beach/sas-loyalty-starter"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#d1d5db", textDecoration: "underline" }}
                  >
                    Charon Loyalty
                  </a>{" "}
                  &ndash; onchain rewards on Solana
                </li>
                <li>
                  •{" "}
                  <Link href="/pools" style={{ color: "#d1d5db", textDecoration: "underline" }}>
                    P00LS
                  </Link>{" "}
                  &ndash; creator token platform
                </li>
                <li>
                  •{" "}
                  <a                    
                    style={{ color: "#d1d5db", textDecoration: "underline" }}
                  >
                    Brewery Management System
                  </a>{" "}
                  &ndash; full vibe coded operations tool in development
                </li>
                <li>
                  •{" "}
                  <Link href="/content" style={{ color: "#d1d5db", textDecoration: "underline" }}>
                    Content Series
                  </Link>{" "}
                  &ndash; education + entertainment pieces
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          Section 6 — Still in the Trenches
      ──────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#0f0f0f", padding: "80px 16px" }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            className="gradient-pink-magenta"
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            Still in the Trenches
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#d1d5db" }}>
            Helping run the{" "}
            <a
              href="https://www.soundeconomy.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#d1d5db", textDecoration: "underline" }}
            >
              Sound Economy
            </a>{" "}
            community with Mickey Shiloh. Building real tools and support for independent creators who want their art
            (and their business) to live and breathe.
          </p>
        </div>
      </div>

      {/* ────────────────────────────────────────────
          Section 7 — Let's Build Something That Lives
      ──────────────────────────────────────────── */}
      <div className="section-lets-build" style={{ backgroundColor: "rgba(221, 17, 176, 0.08)", padding: "80px 16px" }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            className="gradient-blue-pink"
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            Let&apos;s Build Something That Lives
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
              color: "#d1d5db",
              marginBottom: "32px",
            }}
          >
            Whether you&apos;re a band with a record that needs to breathe, a founder with a product that needs to feel
            right, or a project that lives at the intersection of sound, code, and culture&hellip;
            <br />
            <br />
            Reach out.
            <br />
            San Diego or anywhere in the world.
          </p>
          <Link
            href="/contact"
            className="contact-btn"
            style={{
              display: "inline-block",
              padding: "14px 40px",
              backgroundColor: "transparent",
              color: "#12abff",
              border: "1px solid #12abff",
              borderRadius: "4px",
              fontSize: "16px",
              fontFamily: "'Hanken Grotesk', sans-serif",
              textDecoration: "none",
              letterSpacing: "0.05em",
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}