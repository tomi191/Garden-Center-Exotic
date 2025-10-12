/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://exotic-garden.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  priority: 0.7,
  changefreq: 'weekly',
  transform: async (config, path) => {
    // Custom priority per page
    const priorities = {
      '/': 1.0,
      '/produkti': 0.9,
      '/uslugi': 0.9,
      '/za-nas': 0.8,
      '/kontakti': 0.9,
      '/blog': 0.8,
      '/lokacii': 0.8,
      '/faq': 0.7,
    };

    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
