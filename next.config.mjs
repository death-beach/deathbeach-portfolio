/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/production',
        destination: '/',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;