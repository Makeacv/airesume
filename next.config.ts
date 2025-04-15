import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kontcpqrldbxg3qs.public.blob.vercel-storage.com",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/sitemap",
        destination: "/sitemap-0.xml",
      },
    ];
  },
};

export default nextConfig;

// Just add a blank comment:

