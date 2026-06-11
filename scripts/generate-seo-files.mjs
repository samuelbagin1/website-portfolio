import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const siteUrl = (process.env.REACT_APP_SITE_URL || process.env.SITE_URL || "")
  .trim()
  .replace(/\/+$/, "");

if (!siteUrl) {
  console.warn("SEO sitemap skipped: set REACT_APP_SITE_URL to the production origin.");
  process.exit(0);
}

let parsedSiteUrl;
try {
  parsedSiteUrl = new URL(siteUrl);
} catch {
  console.error("SEO sitemap skipped: REACT_APP_SITE_URL must be an absolute URL.");
  process.exit(1);
}

if (!["http:", "https:"].includes(parsedSiteUrl.protocol)) {
  console.error("SEO sitemap skipped: REACT_APP_SITE_URL must use http or https.");
  process.exit(1);
}

const routes = [
  "/",
  "/portfolio",
  "/portfolio/photo",
  "/portfolio/video",
  "/portfolio/graphic",
  "/portfolio/develop",
  "/skills",
  "/contact",
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join("\n")}
</urlset>
`;

const robots = `# Public portfolio pages are available to search engines and AI search crawlers.
User-agent: OAI-SearchBot
Allow: /
Disallow: /upload

User-agent: GPTBot
Allow: /
Disallow: /upload

User-agent: PerplexityBot
Allow: /
Disallow: /upload

User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
await Promise.all([
  writeFile(path.join(root, "public", "sitemap.xml"), xml, "utf8"),
  writeFile(path.join(root, "public", "robots.txt"), robots, "utf8"),
]);

console.log(`Generated SEO crawl files for ${siteUrl}`);
