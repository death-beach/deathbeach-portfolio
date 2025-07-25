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
  let additionalContent = null
  let projectTitle = ""
  let customContent = null

  if (slug === "charon") {
    title = "Charon"
    projectTitle = "Founder and Builder"
    shortDescription = "Cut fees. Get paid instantly."
    videoSrc = "/videos/PayDemo.mp4"
    detailedDescription = "Integrates with POS systems to process payments instantly with lower fees, no chargebacks, and no crypto complexity.\n\nBuilt using Solana Pay, Charon allows merchants to start accepting stablecoins like USDC with no new hardware or extra steps. Simply install Charon on your register and the app pulls relevant merchant information automatically that will be tied to a wallet created and accessed with an email address. Charon fits into normal payment flows, requires minimal training for employees, handles split payments and refunds. Customers enjoy a typical payment flow where they can tip and then simply scan a QR code to pay with their favorite wallet.\n\nCharon is built using Solana Pay, Privy, Jupiter swaps, Node.js and Typscript backend, and Kotlin front end."
    images = [
      "/images/charon-pay.png",
      "/images/charon-tip.png",
      "/images/charon-qr.png",
      "/images/charon-done.png"
    ]
  } else if (slug === "charon-wallet") {
    title = "Charon Wallet"
    projectTitle = "Founder and Builder"
    shortDescription = "Self-custody. Fee-less swaps. 2FA."
    videoSrc = "/videos/wallettour.mp4"
    detailedDescription = "Funds land in a secure wallet merchants control. Giving a ledger view of ins and outs. When ready to cash out, send to a presaved offramp address. Send to your bank or swap first if needed, all straightforward. Wallet information is also easy to find on POS in app. The wallet, is a separate web app. Log in with an email (add 2FA for extra security), see balances, send funds to any address, or even swap between supported digital currencies. Receive by sharing your address. No blockchain jargon, just practical tools for managing funds.\n\nCharon Wallet is built with Privy, React frontend, and Node.js and Typescript backend."
    images = [
      "/images/charon-wallet.png",
      "/images/wallet-options.png"
    ]
  } else if (slug === "pools") {
    title = "P00LS"
    projectTitle = "Community Strategist → Senior Manager, Business Development"
    shortDescription = "Your community. Your token."
    videoSrc = "/videos/p00ls-sizzle.mp4"
    detailedDescription = "P00LS is a semi-decentralized web3 rewards protocol.\n\nThe best way to understand P00LS is to see it as a way for anyone with an audience in web3 (Creators) to automatically and simply create their own loyalty points as a fungible token and distribute them to their community (Holders).\n\nCreators can create NFTs that Holders will buy, mint, and hold. Create POAPs every time they organize events. Be active on a number of web3 protocols and apps such as Zora, Sound, Audius, or Lens. All these “engagements” form what we call a Creator’s economy. This economy is represented by a Token within the P00LS protocol.\n\nThe P00LS protocol dynamically matches a Creator’s economy with a community of holders through the continuous and automatic distribution of a non-transferable, fungible, and Creator-specific ERC20 token."
    images = [
      "/images/p00ls-image.png"
    ]
    additionalContent = (
      <>
        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "48px", textAlign: "justify" }}>
          A P00LS Creator Token is a tool at the disposal of anyone with an audience who wants to map, understand, and reward their whole web3 audience - in the past, present, and future. Composable, it can be integrated and included on any platform, webpage, or app that supports web3 (e.g., token gating). It is an evolving tool that continuously evolves with a Creator’s economy and their audience.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {[
            "/images/p00ls-social-graph.png",
            "/images/p00ls-dashboard.png",
            "/images/p00ls-ish.png",
            "/images/p00ls-rewards.png"
          ].map((img, index) => (
            <div key={index} style={{ position: "relative", aspectRatio: "1.777", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}>
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
            src="/videos/p00ls-landing.mp4"
            controls
            style={{ maxWidth: "600px", width: "100%", borderRadius: "8px", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
          />
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
          Hall 0f Fame
        </h3>
        <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "center" }}>
          ED BANGER | ALUNA | BLOND:ISH | RONALDINHO | CULTURED MAGAZINE | EVAN MOCK | HUGO COMTE | IAM | LALA BAPTISTE | STEELO | MARIE LAFFONT | BUT LIKE MAYBE | YSL BEAUTY | SHILLY | BLACK DAVE | AGORIA | SARAH PHILLIPS | NFT PARIS
        </p>
      </>
    )
  } else if (slug === "production") {
    title = "Death Beach"
    projectTitle = "Producer, Mixer, Engineer"
    shortDescription = "Studio and location recording experiences."
    detailedDescription = "Death Beach is a music producer focused on building immersive, emotionally resonant albums across genres like pop, rock, trip hop, indie, trance, and techno. Known for blending raw, unfiltered performances with meticulous sound design, Death Beach creates sonic environments that artists can truly lose themselves in.\n\nWith experience ranging from top-tier studios like Studio West and Rarefied in San Diego to makeshift setups in Airbnbs, hotel rooms, and remote homes, Death Beach prioritizes flexibility and inspiration over formality. Every session is designed to help artists tap into their truest voice, beyond studio constraints or clocked hours.\n\nProjects have included a five song EP recorded in Joshua Tree with Marc Oliver, a multi-location album journey recording with Choirs in Bakersfield and multiple studios in San Diego, assisting Ulrich Wilde recording Psychotic Waltz, and producing with the Dope Jackets.\n\nOriginally starting as a studio intern at Capricorn Studios learning from Bryan Stratman, Death Beach has since evolved into a producer dedicated to full length work; writing, tracking, and building records from the ground up. With a philosophy that values character over perfection, Death Beach believes the best records come from capturing real moments, whether they’re recorded on a $4,000 mic in a multi-million dollar studio or a phone.\n\nAvailable for select collaborations focused on long form album production and deep creative partnership."
    customContent = (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          <iframe data-testid="embed-iframe" style={{borderRadius:"12px", height: "352px"}} src="https://open.spotify.com/embed/playlist/0m6i2hbWuTIaPiM5a59d9G?utm_source=generator" width="100%" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          <iframe width="100%" height="352" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1449922525%3Fsecret_token%3Ds-rX9IWtQtFxj&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" loading="lazy"></iframe>
        </div>
        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "48px", textAlign: "justify", whiteSpace: "pre-line" }}>
          {detailedDescription}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/eT9fDO06C7M?si=nI8SuApPo63si22k" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/cpVPE_BQXEI?si=Ftu16tMicW63_GYW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {[
            "/images/1.png",
            "/images/2.png",
            "/images/3.png"
          ].map((img, index) => (
            <div key={index} style={{ position: "relative", aspectRatio: "1.33", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}>
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

        {slug === "charon" && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <a
              href="https://www.charongateway.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#d1d5db", fontSize: "16px", fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              https://www.charongateway.com/
            </a>
          </div>
        )}

        {slug === "pools" && (
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <a
              href="https://www.p00ls.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#d1d5db", fontSize: "16px", fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              https://www.p00ls.io
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
          <video
            src={videoSrc}
            controls
            autoPlay={slug === "pools"}
            muted={slug === "pools"}
            preload="metadata"
            poster={`/images/${slug}-poster.png`}
            style={{ maxWidth: "600px", width: "100%", borderRadius: "8px", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}
          />
        </div>
      )}

        {slug !== "production" && (
          <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "48px", textAlign: "justify", whiteSpace: "pre-line" }}>
            {detailedDescription}
          </p>
        )}

        {images.length > 0 && slug === "pools" && (
          <div style={{ marginBottom: "48px", textAlign: "center" }}>
            <div style={{ position: "relative", aspectRatio: "2.07", maxWidth: "800px", margin: "0 auto", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}>
              <Image
                src={images[0]}
                alt="P00LS image"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        )}

        {images.length > 0 && slug !== "pools" && slug !== "production" && (
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

        {additionalContent}
        {customContent}
      </div>
    </div>
  )
}