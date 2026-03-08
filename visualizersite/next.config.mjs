/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // For static export compatibility
  },
  experimental: {
    // Enable if needed for static export
    // output: 'export',
  },
};

export default nextConfig;
