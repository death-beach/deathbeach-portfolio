import Image from "next/image"
import Link from "next/link" //new save
import Hero from "@/components/Hero"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      {/* Hero Section */}
      <Hero />

      {/* About Content with haunted charcoal background */}
      <div style={{ backgroundColor: "#0f0f0f", padding: "48px 16px" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              padding: "32px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Image
                src="/images/profile.png"
                alt="Death Beach Studio Profile"
                width={150}
                height={150}
                style={{ margin: "0 auto 16px auto", borderRadius: "50%" }}
              />
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "16px",
                  fontFamily: "'Hanken Grotesk', sans-serif",
                }}
              >
                About
              </h2>
            </div>

            <div style={{ maxWidth: "650px", margin: "0 auto", color: "#6b7280", lineHeight: "1.6" }}>
              <p style={{ fontSize: "18px", marginBottom: "24px", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                Josh Mallit specializes in Web 3 integrations, product management, and music production, creating
                digital experiences at the intersection of technology and creativity.
              </p>

              <p style={{ marginBottom: "48px", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                With expertise spanning blockchain technology, product strategy, and audio production, Josh brings a unique
                perspective to every project, always focusing on scaling, pushing boundaries, and exploring new possibilities.
              </p>

              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "16px",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                  }}
                >
                  Skills & Expertise
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <ul style={{ listStyle: "none", padding: "0" }}>
                    <li style={{ marginBottom: "8px", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                      • Web 3 Integration
                    </li>
                    <li style={{ marginBottom: "8px", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                      • PM
                    </li>
                    <li style={{ marginBottom: "8px", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                      • Music Production
                    </li>
                  </ul>
                  <ul style={{ 
                    listStyle: "none", 
                    padding: "0",
                    paddingLeft: "16px"
                  }}>
                    <li style={{ marginBottom: "8px", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                      • Blockchain
                    </li>
                    <li style={{ marginBottom: "8px", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                      • Cryptocurrency
                    </li>
                    <li style={{ marginBottom: "8px", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                      • AI
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
