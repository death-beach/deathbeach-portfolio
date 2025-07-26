// pages/index.js
import Image from "next/image"
import Link from "next/link"
import Hero from "@/components/Hero"
import { useState } from "react"

const portfolioItems = [
  {
    id: 1,
    title: "Charon",
    slug: "charon",
    image: "/images/charon.png",
  },
  {
    id: 2,
    title: "Charon Wallet",
    slug: "charon-wallet",
    image: "/images/charon-wallet-project.png",
  },
  {
    id: 3,
    title: "Music Production",
    slug: "production",
    image: "/images/death-beach.png",
  },
  {
    id: 4,
    title: "POOLS",
    slug: "pools",
    image: "/images/p00ls.png",
  },
]

export default function Portfolio() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      {/* Hero Section */}
      <Hero />

      {/* Portfolio Grid with darker charcoal background */}
      <div style={{ backgroundColor: "#0f0f0f", padding: "48px 16px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "32px",
            }}
          >
            <style jsx>{`
              @media (max-width: 767px) {
                .portfolio-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
              @media (min-width: 1200px) {
                .portfolio-grid {
                  grid-template-columns: repeat(4, 1fr) !important;
                }
              }
              .project-item {
                min-width: 250px !important; /* Ensure even sizes */
              }
              .project-image {
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.3) !important; /* Stronger glow */
              }
            `}</style>
            {portfolioItems.map((item, index) => {
              const [isHovered, setIsHovered] = useState(false);
              return (
                <Link key={item.id} href={`/projects/${item.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    className="project-item"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                      cursor: "pointer",
                      transition: "box-shadow 0.3s ease",                
                    }}
                  >
                    <div className="project-image" style={{ aspectRatio: "1", position: "relative", marginBottom: "16px", borderRadius: "4px", overflow: "hidden" }}>
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        style={{ 
                          objectFit: "cover", 
                          transition: "filter 0.3s ease",
                          filter: isHovered ? "invert(1)" : "none"
                        }}
                        sizes="(max-width: 767px) 50vw, (max-width: 1200px) 25vw, 33vw"
                        priority={index < 3} // Add priority to first few for LCP
                      />
                    </div>
                    <div style={{ padding: "0 16px 16px 16px" }}>
                      <h3
                        style={{
                          fontWeight: "600",
                          color: "white",
                          marginBottom: "8px",
                          fontFamily: "'Hanken Grotesk', sans-serif",
                          textTextAlign: "center",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}