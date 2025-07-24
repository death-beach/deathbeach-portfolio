import Hero from "@/components/Hero"
import { Button } from "@/components/ui/button"

export default function Contact() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      {/* Hero Section */}
      <Hero />

      {/* Contact Form with haunted charcoal background */}
      <div style={{ backgroundColor: "#0f0f0f", padding: "48px 16px" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              padding: "32px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "16px",
                  fontFamily: "'Hanken Grotesk', sans-serif",
                }}
              >
                Contact
              </h2>
              <p style={{ fontSize: "18px", color: "#6b7280", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                Let's work together!
              </p>
            </div>

            <form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    outline: "none",
                    resize: "vertical",
                  }}
                ></textarea>
              </div>

              <Button type="submit" style={{ width: "18%", fontFamily: "'Hanken Grotesk', sans-serif" }}>
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
