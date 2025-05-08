module.exports = {
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all'
          }
        ],
      }
    ]
  },
} 