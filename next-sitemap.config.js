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
    }
  }
  