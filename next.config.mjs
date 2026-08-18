/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Local /public assets only — Next.js resizes per viewport and
    // re-encodes to WebP/AVIF automatically, so cards no longer ship the
    // full multi-megabyte source PNG on every request.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1600],
  },
}

export default nextConfig