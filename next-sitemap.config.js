module.exports = {
  siteUrl: 'https://makeacv.ai',
  changefreq: 'daily',
  priority: 0.7,
  generateRobotsTxt: false, // We manage robots.txt manually in /public
  generateIndexSitemap: false, // Single sitemap file, no index+child split
  sitemapSize: 10000,
  exclude: [
    '/admin/**',
    '/api/**',
    '/sign-in/**',
    '/sign-up/**',
    '/billing',
    '/editor',
    '/resumes',
    '/opengraph-image*',
    '/favicon.ico',
  ],
  additionalPaths: async () => {
    return [
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      { loc: '/about', changefreq: 'weekly', priority: 0.7 },
      { loc: '/blog', changefreq: 'daily', priority: 0.8 },
      { loc: '/contact', changefreq: 'monthly', priority: 0.5 },
      { loc: '/faqs', changefreq: 'monthly', priority: 0.5 },
      { loc: '/tos', changefreq: 'monthly', priority: 0.3 },
    ];
  }
}