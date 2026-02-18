// pages/index.js - Death Beach main landing page
import Image from "next/image"
import Link from "next/link"
import Hero from "@/components/Hero"
import { useState } from "react"
import { getProjectBySlug } from "../data/projects"

export async function getStaticProps() {
  const project = getProjectBySlug("production")

  return {
    props: {
      project: project || null,
    },
  }
}

export default function Home({ project }) {
  const [expandedImage, setExpandedImage] = useState(null)

  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc)
  }

  const closeModal = () => {
    setExpandedImage(null)
  }

  const { images, customContent } = project || {}

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
          margin-bottom: 48px;
        }
        .images-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }
        .worlds-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 48px;
          margin-bottom: 48px;
        }
        @media (max-width: 768px) {
          .embeds-grid {
            grid-template-columns: 1fr;
          }
          .videos-grid {
            grid-template-columns: 1fr;
          }
          .images-grid {
            grid-template-columns: 1fr;
          }
          .worlds-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Hero />

      <div style={{ padding: "48px 16px", maxWidth: "1152px", margin: "0 auto" }}>

        {/* ── Page Header ── */}
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Death Beach
        </h1>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "normal",
            marginBottom: "48px",
            textAlign: "center",
            color: "#d1d5db",
          }}
        >
          Music Production, Engineering, &amp; Mixing &bull; Vibe Coding &bull; Product &amp; Crypto
        </h3>

        {/* ── Intro Copy ── */}
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto 48px auto",
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#e5e7eb",
          }}
        >
          <p style={{ marginBottom: "24px" }}>You carry entire worlds inside you.</p>
          <p style={{ marginBottom: "24px" }}>
            Sounds that hit deeper than words alone ever could. Layers that wrap around your soul and refuse to let go.
            Moments so raw they crack you open and make whoever hears it feel everything right along with you. Lyrics and
            music dripping into the ear of fans offering a world for them to live in.
          </p>
          <p style={{ marginBottom: "24px" }}>
            You don&apos;t want these sounds &ldquo;recorded.&rdquo; You want them felt. Alive, haunting, honest.
          </p>
          <p style={{ marginBottom: "24px" }}>I live to help you set those worlds free.</p>
          <p style={{ marginBottom: "24px" }}>
            I&apos;m Death Beach. I&apos;ve been right where you are obsessing over tone, frequencies, and vibration
            since I was a kid, teaching myself everything I could get my hands on because the hunger wouldn&apos;t let
            me stop. I poured my life into bands, chasing that electric, alive feeling on stage. Our biggest night with
            Fing was opening for The Damned at the Casbah, and that same fire still drives every single thing I do.
          </p>
          <p style={{ marginBottom: "24px" }}>
            That path took me from studio intern at Capricorn Studios (learning from Bryan Stratman) to producing
            full-length albums from the ground up writing, tracking, sound design, the whole thing. I&apos;ve worked in
            places like Studio West, Rarefied Recording, and Capricorn Studios in San Diego, but I&apos;m just as
            comfortable (and usually more inspired) in a desert Airbnb, a hotel room, or someone&apos;s remote house.
            The setting doesn&apos;t matter. The feeling does.
          </p>
          <p style={{ marginBottom: "24px" }}>
            That same raw spirit once turned an LA songwriting camp into pure magic when 11 of us crammed into my
            Airbnb room, recording while the whole place erupted in screams and cheers over the best improvised lines.
          </p>
          <p>
            I blend raw, unfiltered performances with obsessive attention to detail so the final record &mdash; or the
            final product &mdash; becomes a place you (and your people) can completely lose yourselves in.
          </p>
        </div>

        <hr style={{ borderColor: "#333", marginBottom: "48px" }} />

        {/* ── What I Build ── */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            What I Build
          </h2>
          <div className="worlds-grid">
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "16px", color: "#ffffff" }}>
                For Artists &amp; Bands
              </h3>
              <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#d1d5db" }}>
                Immersive full-length albums and sonic worlds that actually haunt listeners. Deep, long-form creative
                partnerships where character always wins over perfection.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "16px", color: "#ffffff" }}>
                For Brands, Founders &amp; Crypto Projects
              </h3>
              <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#d1d5db" }}>
                Vibe-coded products, on-chain tools, and digital experiences that don&apos;t just work &mdash; they
                feel alive. Same obsession with resonance, frequency, and soul.
              </p>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "#333", marginBottom: "48px" }} />

        {/* ── Experience the Worlds ── */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            Experience the Worlds
          </h2>

          {/* Listen to the Vibe */}
          <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}>Listen to the Vibe</h3>
          <p style={{ fontSize: "16px", color: "#9ca3af", marginBottom: "24px", fontStyle: "italic" }}>
            Curated sonic environments.
          </p>
          {customContent && (
            <div className="embeds-grid">
              <div
                style={{
                  position: "relative",
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
                  position: "relative",
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
          <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px" }}>Watch</h3>
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

          {/* Images */}
          {images && images.length > 0 && (
            <div className="images-grid">
              {images.map((img, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    aspectRatio: "1.33",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(img)}
                >
                  <Image
                    src={img}
                    alt={`Music Production image ${index + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <hr style={{ borderColor: "#333", marginBottom: "48px" }} />

        {/* ── Selected Worlds ── */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            Selected Worlds I&apos;ve Helped Create
          </h2>
          <div className="worlds-grid">
            {/* Music */}
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "16px" }}>Music</h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: "2",
                  color: "#d1d5db",
                }}
              >
                <li>• Five song EP under the open sky in Joshua Tree with Marc Oliver</li>
                <li>• Multi-location album journey with Choirs (Bakersfield to San Diego studios)</li>
                <li>• Assisting Ulrich Wilde on Psychotic Waltz in studio</li>
                <li>• Full production with the Dope Jackets</li>
              </ul>
            </div>

            {/* Products & Crypto */}
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "16px" }}>Products &amp; Crypto</h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: "2",
                  color: "#d1d5db",
                }}
              >
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
                    href="https://www.burningbeardbrewing.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#d1d5db", textDecoration: "underline" }}
                  >
                    Brewery Management System
                  </a>{" "}
                  &ndash; full vibe coded operations tool in development with Burning Beard Brewing
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

        <hr style={{ borderColor: "#333", marginBottom: "48px" }} />

        {/* ── Still in the Trenches ── */}
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto 48px auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "24px" }}>Still in the Trenches</h2>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#d1d5db" }}>
            Helping run the{" "}
            <a
              href="https://www.skool.com/soundeconomy/about"
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

        <hr style={{ borderColor: "#333", marginBottom: "48px" }} />

        {/* ── Let's Build Something That Lives ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "24px" }}>
            Let&apos;s Build Something That Lives
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
              color: "#d1d5db",
              maxWidth: "600px",
              margin: "0 auto 32px auto",
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
            style={{
              display: "inline-block",
              padding: "14px 40px",
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "1px solid #ffffff",
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

      {/* ── Lightbox Modal ── */}
      {expandedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "95%",
              maxHeight: "95%",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={expandedImage}
              alt="Expanded image"
              fill
              style={{ objectFit: "contain" }}
              sizes="95vw"
              priority
              quality={95}
              loading="eager"
            />
          </div>
        </div>
      )}
    </div>
  )
}
