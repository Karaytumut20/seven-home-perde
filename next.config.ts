import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async headers() {
    return [{ source: '/media/hero/packed-v1/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }];
  },
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 85] },
};
export default nextConfig;
