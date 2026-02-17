import Image from "next/image"
import Hero from "@/components/Hero"
import { useState } from "react"
import { getProjectBySlug, getAllProjectSlugs } from "../data/projects"

export async function getStaticPaths() {
  const slugs = getAllProjectSlugs()
  
  const paths = slugs.map((slug) => ({
    params: { slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug)
  
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

export default function ProjectPage({ project }) {
  const [expandedImage, setExpandedImage] = useState(null)

  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc)
  }

  const closeModal = () => {
    setExpandedImage(null)
  }

  const { slug, title, projectTitle, shortDescription, videoSrc, detailedDescription, images, websiteUrl, starterRepoUrl, additionalContent, customContent } = project

  // Render additional content for P00LS project
  const renderPoolsAdditionalContent = () => {
    if (!additionalContent || additionalContent.type !== "pools") return null
    
    return (
      <>
        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "48px", textAlign: "justify" }}>
          A P00LS Creator Token is a tool at the disposal of anyone with an audience who wants to map, understand, and reward their whole web3 audience - in the past, present, and future. Composable, it can be integrated and included on any platform, webpage, or app that supports web3 (e.g., token gating). It is an evolving tool that continuously evolves with a Creator's economy and their audience.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {additionalContent.additionalImages.map((img, index) => (
            <div key={index} style={{ position: "relative", aspectRatio: "1.777", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }} onClick={() => handleImageClick(img)}>
              <Image
                src={img}
                alt={`P00LS image ${index + 1}`}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <video
            src={additionalContent.additionalVideo}
            controls
            style={{ maxWidth: "600px", width: "100%", borderRadius: "8px", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
          />
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
          Hall 0f Fame
        </h3>
        <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "center" }}>
          {additionalContent.hallOfFame}
        </p>
      </>
    )
  }

  // Render custom content for production project
  const renderProductionCustomContent = () => {
    if (!customContent || customContent.type !== "production") return null
    
    return (
      <>
        <div
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
        <div
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

  // Render additional content for content project
  const renderContentAdditionalContent = () => {
    if (!additionalContent || additionalContent.type !== "content") return null
    
    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth <= 768 ? "1fr" : "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {additionalContent.workshopImages.map((img, index) => (
            <div key={index} style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)", cursor: "pointer" }} onClick={() => handleImageClick(img)}>
              <Image
                src={img}
                alt={`Content image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <Image
            src={additionalContent.pdfThumbnail}
            alt="The Part-Time Artist PDF"
            width={612}
            height={791}
            style={{ maxWidth: "100%", height: "auto", cursor: "pointer" }}
            onClick={() => handleImageClick(additionalContent.pdfUrl)}
          />
        </div>
      </>
    )
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif", backgroundColor: "#0f0f0f", color: "#ffffff" }}>
      <style jsx>{`
        @media (max-width: 768px) {
          .charon-responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Hero />

      <div style={{ padding: "48px 16px", maxWidth: "1152px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
          {title}
        </h1>

        {slug === "charon" && websiteUrl && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#d1d5db", fontSize: "16px", fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {websiteUrl}
            </a>
          </div>
        )}

        {slug === "pools" && websiteUrl && (
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#d1d5db", fontSize: "16px", fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {websiteUrl}
            </a>
          </div>
        )}

        <p style={{ fontSize: "22px", fontWeight: "normal", marginBottom: "16px", textAlign: "center", color: "#d1d5db" }}>
          {projectTitle}
        </p>

        <h3 style={{ fontSize: "32px", fontWeight: "normal", marginBottom: "32px", textAlign: "center", color: "#d1d5db" }}>
          {shortDescription}
        </h3>

        {videoSrc && (
          <div style={{ marginBottom: "48px", textAlign: "center" }}>
            {slug === "content" ? (
              <iframe
                width="100%"
                height="315"
                src={videoSrc.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]}
                title="Content YouTube Video"
                style={{ border: "none", maxWidth: "560px", borderRadius: "8px", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={videoSrc}
                controls
                autoPlay={slug === "pools"}
                muted={slug === "pools"}
                playsInline={slug === "pools"}
                preload="metadata"
                poster={`/images/${slug}-poster.png`}
                style={{ maxWidth: "600px", width: "100%", borderRadius: "8px", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
              />
            )}
          </div>
        )}

        {slug !== "production" && (
          <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "48px", textAlign: "justify", whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: detailedDescription }}
          />
        )}

        {slug === "charon" && starterRepoUrl && (
          <div style={{ 
            marginBottom: "48px", 
            padding: "24px", 
            backgroundColor: "#1a1a1a", 
            borderRadius: "8px", 
            border: "1px solid #333"
          }}>
            <p style={{ 
              fontSize: "16px", 
              lineHeight: "1.6", 
              margin: "0", 
              color: "#d1d5db",
              textAlign: "left"
            }}>
              Want to build your own Solana Pay POS? Check out my open-source starter repo with a simple web UI and Solana Pay integration to get you up and running quickly. <a
                href={starterRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: "#60a5fa", 
                  textDecoration: "underline"
                }}
              >
                {starterRepoUrl}
              </a>
            </p>
          </div>
        )}

        {slug === "content" && images.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
              marginBottom: "48px",
            }}
            className="charon-image-grid"
          >
            {images.map((img, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  aspectRatio: "1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(img)}
              >
                {img.endsWith('.pdf') ? (
                  <Image
                    src={img.includes('mix-zones') ? 
                      "https://cdn.jsdelivr.net/gh/death-beach/portfolio-images/mix-zones-thumb.png" :
                      "https://cdn.jsdelivr.net/gh/death-beach/portfolio-images/part-time-artist-thumb.png"
                    }
                    alt={img.includes('mix-zones') ? "Mix Zones PDF Preview" : "Part Time Artist PDF Preview"}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <Image
                    src={img}
                    alt={`Content image ${index + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {images.length > 0 && slug === "pools" && (
          <div style={{ marginBottom: "48px", textAlign: "center" }}>
            <div style={{ position: "relative", aspectRatio: "2.07", maxWidth: "800px", margin: "0 auto", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }} onClick={() => handleImageClick(images[0])}>
              <Image
                src={images[0]}
                alt="P00LS image"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 800px"
                priority
                quality={90}
                loading="eager"
              />
            </div>
          </div>
        )}

        {images.length > 0 && slug !== "pools" && slug !== "production" && slug !== "content" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: (slug === "charon" || slug === "charon-wallet") ? 
                "repeat(2, 1fr)" : "repeat(2, 1fr)",
              gap: "32px",
              marginBottom: "48px",
            }}
            className={(slug === "charon" || slug === "charon-wallet") ? "charon-responsive-grid" : ""}
          >
            {images.map((img, index) => (
              <div key={index} style={{ position: "relative", aspectRatio: slug === "charon-wallet" ? "1.84" : "1.6", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }} onClick={() => handleImageClick(img)}>
                <Image
                  src={img}
                  alt={`${title} image ${index + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                  quality={90}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        )}

        {renderPoolsAdditionalContent()}
        {renderContentAdditionalContent()}
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
            {expandedImage.endsWith('.pdf') ? (
              typeof window !== 'undefined' && window.innerWidth <= 768 ? (
                window.open(expandedImage, '_blank')
              ) : (
                <iframe 
                  src={expandedImage}
                  width="100%" 
                  height="100%" 
                  style={{ 
                    borderRadius: "8px", 
                    border: "none"
                  }}
                />
              )
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  )
}