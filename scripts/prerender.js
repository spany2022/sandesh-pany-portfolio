// Runs after `vite build` + the SSR build. Writes a fully rendered HTML file for
// every page (with its own title, description, social tags and structured data),
// plus 404.html, sitemap.xml and robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, getAllRoutes, getPageMeta, renderHeadTags, SITE_URL } = await import(
  pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href
);

const fileFor = (route) => {
  if (route === '/') return 'index.html';
  if (route === '/404') return '404.html';
  return `${route.slice(1)}.html`; // /work/x → work/x.html (served as /work/x with cleanUrls)
};

const routes = getAllRoutes();

for (const route of [...routes, '/404']) {
  const meta = getPageMeta(route);
  const imagePath = path.join(dist, new URL(meta.image).pathname);
  if (!fs.existsSync(imagePath)) {
    console.warn(`⚠ Missing link-preview image for ${route}: public${new URL(meta.image).pathname}`);
  }

  const html = template
    .replace('<!--app-head-->', renderHeadTags(meta))
    .replace('<!--app-html-->', render(route));
  const file = path.join(dist, fileFor(route));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url>\n    <loc>${SITE_URL}${route === '/' ? '/' : route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages + 404, sitemap.xml and robots.txt`);
