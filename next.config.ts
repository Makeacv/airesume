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
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
