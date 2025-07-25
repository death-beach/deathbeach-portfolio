import { useRouter } from "next/router"
import Image from "next/image"
import Hero from "@/components/Hero"

export default function ProjectPage() {
  const router = useRouter()

  if (!router.isReady) {
    return <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif", backgroundColor: "#0f0f0f", color: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</div>
  }

  const { slug } = router.query

  let title = ""
  let shortDescription = ""
  let videoSrc = null
  let detailedDescription = ""
  let images = []

  if (slug === "charon") {
    title = "Charon"
    shortDescription = "Integrates with POS systems to process payments instantly with lower fees, no chargebacks, and no crypto complexity."
    videoSrc = "/videos/PayDemo.mp4"
    detailedDescription = "Built using Solana Pay, Charon allows merchants to start accepting stablecoins like USDC with no new hardware or extra steps. Simply install Charon on your register and the app pulls relevant merchant information automatically that will be tied to a wallet created and accessed with an email address. Charon fits into normal payment flows, requires minimal training for employees, handles split payments and refunds. Customers enjoy a typical payment flow where they can tip and then simply scan a QR code to pay with their favorite wallet."
    images = [
      "/images/charon-pay.png",
      "/images/charon-tip.png",
      "/images/charon-qr.png",
      "/images/charon-done.png"
    ]
  } else if (slug === "charon-wallet") {
    title = "Charon Wallet"
    shortDescription = "Self custody wallet for merchants. Email login, fee-less swaps between stablecoins, saved offramp address, and 2FA security."
    videoSrc = "/videos/wallettour.mp4"
    detailedDescription = "Funds land in a secure wallet merchants control. Giving a ledger view of ins and outs. When ready to cash out, send to a presaved offramp address. Send to your bank or swap first if needed, all straightforward. Wallet information is also easy to find on POS in app. The wallet, is a separate web app. Log in with an email (add 2FA for extra security), see balances, send funds to any address, or even swap between supported digital currencies. Receive by sharing your address. No blockchain jargon, just practical tools for managing funds."
    images = [
      "/images/charon-wallet.png",
      "/images/wallet-options.png"
    ]
  }

  if (!title) {
    return <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif", backgroundColor: "#0f0f0f", color: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center" }}>Project not found</div>
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif", backgroundColor: "#0f0f0f", color: "#ffffff" }}>
      <Hero />

      <div style={{ padding: "48px 16px", maxWidth: "1152px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
          {title}
        </h1>
        <h3 style={{ fontSize: "20px", fontWeight: "normal", marginBottom: "32px", textAlign: "center", color: "#d1d5db" }}>
          {shortDescription}
        </h3>

        {videoSrc && (
          <div style={{ marginBottom: "48px", textAlign: "center" }}>
            <video
              src={videoSrc}
              controls
              style={{ maxWidth: "600px", width: "100%", borderRadius: "8px", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
            />
          </div>
        )}

        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "48px", textAlign: "justify" }}>
          {detailedDescription}
        </p>

        {images.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {images.map((img, index) => (
              <div key={index} style={{ position: "relative", aspectRatio: slug === "charon-wallet" ? "1.84" : "1.6", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}>
                <Image
                  src={img}
                  alt={`${title} image ${index + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}