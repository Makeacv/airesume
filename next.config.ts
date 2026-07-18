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
  async redirects() {
    return [
      // Fix: /sitemap (no .xml) → proper sitemap URL
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      // Fix: www → non-www canonical redirect
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.makeacv.ai" }],
        destination: "https://makeacv.ai/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Allow all public pages to be indexed
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
      {
        // Private/auth pages — prevent indexing
        source: "/(sign-in|sign-up|editor|resumes|billing|admin|api)(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
