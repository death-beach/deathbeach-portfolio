import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Hero from "@/components/Hero"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')
    
    try {
      emailjs.init('0EwhoSXIL8FmvrNEF')
      
      const result = await emailjs.send(
        'service_3xfc6be',
        'template_b3toc88',
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: 'deathbeachstudio@gmail.com'
        },
        '0EwhoSXIL8FmvrNEF'
      )
      
      console.log('EmailJS result:', result) // For debugging
      setStatus('Message sent successfully! 🎉')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus(`Failed to send: ${error.text || error.message || 'Unknown error'}`)
    }
    
    setIsSubmitting(false)
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <Hero />

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

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
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

              {status && (
                <div style={{ 
                  textAlign: "center", 
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: status.includes('successfully') ? '#dcfce7' : '#fef2f2',
                  color: status.includes('successfully') ? '#166534' : '#dc2626',
                  fontFamily: "'Hanken Grotesk', sans-serif"
                }}>
                  {status}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                style={{ 
                  width: "auto",
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  opacity: isSubmitting ? 0.7 : 1,
                  alignSelf: "center", 
                  padding: "8px 24px" 
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}