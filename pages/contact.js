import Script from 'next/script'
import Hero from "@/components/hero"

export default function Contact() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif", backgroundColor: "#0f0f0f", color: "#ffffff" }}>
      <Hero />

      <div style={{ backgroundColor: "#0f0f0f", padding: "80px 16px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                marginBottom: "24px",
                background: "linear-gradient(90deg, #f00c6f, #dd11b0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Hanken Grotesk', sans-serif",
              }}
            >
              Let's Work Together
            </h1>
            <p style={{ fontSize: "20px", lineHeight: "1.6", color: "#d1d5db", fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Tell me about your project and let's create something that lives.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              padding: "40px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div data-tf-live="01KJWZ1Q1BJ1YQY9S6DV1BZWZY"></div>
            <Script src="//embed.typeform.com/next/embed.js" strategy="lazyOnload" />
          </div>
        </div>
      </div>
    </div>
  )
}
