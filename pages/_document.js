import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content="Death Beach Studio" />
        <meta property="og:description" content="Work portfolio showcasing projects and achievements." />
        <meta property="og:image" content="/images/preview-image.png" />
        <meta property="og:url" content="https://deathbeachstudio.com" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}