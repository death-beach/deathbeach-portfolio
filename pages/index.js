import Image from "next/image"
import Link from "next/link"
import Hero from "@/components/Hero"
import { useState } from "react"

const portfolioItems = [
  {
    id: 1,
    title: "Charon",
    slug: "charon",
    image: "/imgages/charon.png",
  },
  {
    id: 2,
    title: "Charon Wallet",
    slug: "charon-wallet",
    image: "/imgages/charon-wallet.png",
  },
  {
    id: 3,
    title: "Music Production",
    slug: "music-production",
    image: "/imgages/death-beach.png",
  },
  {
    id: 4,
    title: "POOLS",
    slug: "pools",
    image: "/imgages/p00ls.png",
  },
]

export default function Portfolio() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      {/* Hero Section */}
      <Hero />

      {/* Portfolio Grid with darker charcoal background */}
      <div style={{ backgroundColor: "#0f0f0f", padding: "36px 16px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}
          >
            {portfolioItems.map((item) => {
              const [isHovered, setIsHovered] = useState(false);
              return (
                <Link key={item.id} href={`/projects/${item.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                      cursor: "pointer",
                      transition: "box-shadow 0.3s ease",                
                    }}
                  >
                    <div style={{ aspectRatio: "1", position: "relative", marginBottom: "16px", borderRadius: "4px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}>
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        style={{ 
                          objectFit: "cover", 
                          transition: "filter 0.3s ease",
                          filter: isHovered ? "invert(1)" : "none"
                        }}
                      />
                    </div>
                    <div style={{ padding: "0 16px 16px 16px" }}>
                      <h3
                        style={{
                          fontWeight: "600",
                          color: "white",
                          marginBottom: "8px",
                          fontFamily: "'Hanken Grotesk', sans-serif",
                          textAlign: "center",
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