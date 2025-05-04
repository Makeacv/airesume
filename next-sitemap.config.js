module.exports = {
    siteUrl: 'https://makeacv.ai',
    changefreq: 'daily',
    priority: 0.7,
    generateRobotsTxt: true,
    sitemapSize: 10000,
    exclude: [
      '/admin/**',
      '/api/**',
    ],
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
        { userAgent: 'Googlebot', allow: '/' },
        { userAgent: 'AdsBot-Google', allow: '/' }
      ],
      additionalDirectives: [
        'Host: makeacv.ai',
        'Sitemap: https://makeacv.ai/sitemap.xml'
      ]
    },
    additionalPaths: async () => {
      return [
        { loc: '/', changefreq: 'daily', priority: 0.6 },
        { loc: '/about', changefreq: 'weekly', priority: 0.5 },
        { loc: '/blog', changefreq: 'daily', priority: 0.8 },
      ];
    }
  }
  