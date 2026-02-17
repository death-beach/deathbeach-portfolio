// pages/index.js - Shows production content at root URL
import Image from "next/image"
import Hero from "@/components/Hero"
import { useState } from "react"
import { getProjectBySlug } from "../data/projects"

export async function getStaticProps() {
  const project = getProjectBySlug("production")
  
  if (!project) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      project
    }
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

  const { slug, title, projectTitle, shortDescription, detailedDescription, images, customContent } = project

  // Render custom content for production project
  const renderProductionCustomContent = () => {
    if (!customContent || customContent.type !== "production") return null
    
    return (
      <>
        <div className="mobile-stack"
          style={{
            display: "grid",
            gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth <= 768 ? "1fr" : "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          <div style={{ position: "relative", height: "352px", backgroundColor: "#1a1a1a", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px", height: "352px", border: "none" }}
              src={customContent.spotifyEmbed}
              width="100%"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
          <div style={{ position: "relative", height: "352px", backgroundColor: "#1a1a1a", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <iframe
              width="100%"
              height="352"
              style={{ border: "none" }}
              allow="autoplay"
              src={customContent.soundcloudEmbed}
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "48px", textAlign: "justify", whiteSpace: "pre-line" }}>
          {detailedDescription}
        </p>
        <div className="mobile-stack"
          style={{
            display: "grid",
            gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth <= 768 ? "1fr" : "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {customContent.youtubeVideos.map((videoUrl, index) => (
            <iframe 
              key={index}
              width="100%" 
              height="315" 
              src={videoUrl} 
              title={`YouTube video player ${index + 1}`} 
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            />
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
          className="production-image-grid"
        >
          {images.map((img, index) => (
            <div key={index} style={{ position: "relative", aspectRatio: "1.33", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)", cursor: "pointer" }} onClick={() => handleImageClick(img)}>
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
      </>
    )
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif", backgroundColor: "#0f0f0f", color: "#ffffff" }}>
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-stack { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Hero />

      <div style={{ padding: "48px 16px", maxWidth: "1152px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
          {title}
        </h1>

        <p style={{ fontSize: "22px", fontWeight: "normal", marginBottom: "16px", textAlign: "center", color: "#d1d5db" }}>
          {projectTitle}
        </p>

        <h3 style={{ fontSize: "32px", fontWeight: "normal", marginBottom: "32px", textAlign: "center", color: "#d1d5db" }}>
          {shortDescription}
        </h3>

        {renderProductionCustomContent()}
      </div>

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
            cursor: "pointer"
          }}
          onClick={closeModal}
        >
          <div style={{ position: "relative", maxWidth: "95%", maxHeight: "95%", width: "100%", height: "100%" }}>
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
