// Public site URL for absolute links (sitemap, robots). Set SITE_URL in production.
export const siteUrl = () =>
  (process.env.SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")).replace(/\/$/, "");
