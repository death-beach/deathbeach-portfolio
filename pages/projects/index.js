// pages/projects/index.js
import Image from "next/image"
import Link from "next/link"
import Hero from "@/components/Hero"
import { useState } from "react"
import { getAllProjects } from "../../data/projects"

// Generate portfolio items from projects data
const generatePortfolioItems = () => {
  const projects = getAllProjects()
  
  // Get production project to add at the top
  const productionProject = projects.find(project => project.slug === "production")
  
  // Get other projects (excluding production)
  const otherProjects = projects
    .filter(project => project.slug !== "production")
    .map(project => ({
      id: project.slug,
      title: project.title,
      slug: project.slug,
      image: project.thumbnailImage,
      projectTitle: project.projectTitle,
      shortDescription: project.shortDescription,
    }))
  
  // If production exists, add it at the beginning with a link to "/"
  if (productionProject) {
    return [{
      id: "music",
      title: "Music",
      slug: "", // special case - links to "/"
      image: productionProject.thumbnailImage,
      projectTitle: productionProject.projectTitle,
      shortDescription: productionProject.shortDescription,
    }, ...otherProjects]
  }
  
  return otherProjects
}

const portfolioItems = generatePortfolioItems()

export default function Projects() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      {/* Hero Section */}
      <Hero />

      {/* Portfolio Grid with darker charcoal background */}
      <div style={{ backgroundColor: "#0f0f0f", padding: "48px 16px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <style jsx>{`
            @media (max-width: 767px) {
              .portfolio-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
              .project-image {
                aspect-ratio: 1 / 1 !important;
                box-shadow: 0 0 25px rgba(255, 255, 255, 0.4) !important; /* Stronger glow on mobile */
              }
            }
            @media (min-width: 768px) {
              .portfolio-grid {
                grid-template-columns: repeat(3, 1fr) !important;
              }
              .project-image {
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.2) !important; /* Default glow for desktop */
              }
            }
          `}</style>
          <div
            className="portfolio-grid"
            style={{
              display: "grid",
              gap: "32px",
            }}
          >
            {portfolioItems.map((item, index) => {
              const [isHovered, setIsHovered] = useState(false);
              return (
                <Link key={item.id} href={item.slug === "" ? "/" : `/${item.slug}`} style={{ textDecoration: "none" }}>
                  <div
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
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
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
                          textAlign: "center",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                        {item.shortDescription}
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
