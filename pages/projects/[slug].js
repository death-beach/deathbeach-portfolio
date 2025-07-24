"use client"

import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Project data with different media types
const projectsData = {
  "colorful-characters": {
    title: "Colorful Characters",
    description: "A vibrant collection of whimsical characters and creatures that bring joy and imagination to life.",
    year: "2024",
    category: "Character Design",
    tools: ["Procreate", "Adobe Illustrator", "Photoshop"],
    type: "image",
    images: [
      "/images/colorful-characters-1.jpg",
      "/images/colorful-characters-2.jpg",
      "/images/colorful-characters-3.jpg",
    ],
    process: "This project began with exploring different personality archetypes through quick sketches...",
  },
  "music-project": {
    title: "Music Project",
    description: "Original soundtrack composition featuring ambient and electronic elements.",
    year: "2024",
    category: "Music Production",
    tools: ["Logic Pro", "Ableton Live"],
    type: "audio",
    images: ["/images/music-project-cover.jpg"],
    spotifyUrl: "https://open.spotify.com/embed/track/YOUR_TRACK_ID",
    soundcloudUrl: "https://w.soundcloud.com/player/?url=YOUR_SOUNDCLOUD_URL",
    process: "This composition explores the intersection of organic and synthetic sounds...",
  },
  "animation-demo": {
    title: "Animation Demo",
    description: "Character animation showcase demonstrating movement and personality.",
    year: "2024",
    category: "Animation",
    tools: ["After Effects", "Procreate"],
    type: "video",
    images: ["/images/animation-thumb.jpg"],
    youtubeUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    localVideo: "/videos/animation-demo.mp4", // For local MP4 files
    process: "The animation focuses on bringing static characters to life through fluid movement...",
  },
}

export default function ProjectPage() {
  const router = useRouter()
  const { slug } = router.query

  const project = projectsData[slug]

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Project not found</h1>
          <Link href="/">
            <Button>Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{project.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{project.description}</p>

            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>
                <strong>Year:</strong> {project.year}
              </span>
              <span>
                <strong>Category:</strong> {project.category}
              </span>
              <span>
                <strong>Tools:</strong> {project.tools.join(", ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Main Media Content */}
        <div className="mb-12">
          {project.type === "image" && (
            <Image
              src={project.images[0] || "/placeholder.svg"}
              alt={project.title}
              width={800}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
          )}

          {project.type === "video" && (
            <div className="space-y-8">
              {/* YouTube Embed */}
              {project.youtubeUrl && (
                <div className="aspect-video">
                  <iframe
                    src={project.youtubeUrl}
                    title={project.title}
                    className="w-full h-full rounded-lg shadow-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Local MP4 Video */}
              {project.localVideo && (
                <div className="aspect-video">
                  <video
                    controls
                    className="w-full h-full rounded-lg shadow-lg object-cover"
                    poster={project.images[0]}
                  >
                    <source src={project.localVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          )}

          {project.type === "audio" && (
            <div className="space-y-8">
              {/* Cover Image */}
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={600}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />

              {/* Spotify Embed */}
              {project.spotifyUrl && (
                <div className="w-full max-w-md mx-auto">
                  <iframe
                    src={project.spotifyUrl}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg shadow-lg"
                  ></iframe>
                </div>
              )}

              {/* SoundCloud Embed */}
              {project.soundcloudUrl && (
                <div className="w-full max-w-md mx-auto">
                  <iframe
                    width="100%"
                    height="300"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={project.soundcloudUrl}
                    className="rounded-lg shadow-lg"
                  ></iframe>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Process Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Process</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{project.process}</p>
        </div>

        {/* Additional Images (for image projects) */}
        {project.type === "image" && project.images.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {project.images.slice(1).map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${index + 2}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="text-center">
          <Link href="/">
            <Button size="lg">View More Projects</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
