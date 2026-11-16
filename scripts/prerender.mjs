import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntryPath = path.join(rootDir, '.ssr-tmp', 'entry-server.js');

const rawSiteUrl =
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '') ||
  process.env.APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

const ROUTES = [
  {
    routePath: '/',
    outFile: path.join(distDir, 'index.html'),
    title: 'RACHA BÉTON — Béton Imprimé, Résine Époxy & Sols',
    description:
      'Spécialiste des sols au Maroc : béton imprimé, béton lissé, désactivé, béton ciré, résine époxy, descente de garage et tlemis. Devis gratuit.',
  },
  {
    routePath: '/travaux',
    outFile: path.join(distDir, 'travaux', 'index.html'),
    title: 'Nos Travaux par Spécialité — RACHA BÉTON',
    description:
      'Découvrez les réalisations RACHA BÉTON par spécialité : béton imprimé, lissé, désactivé, béton ciré, résine époxy, descente de garage et tlemis.',
  },
];

function escapeHtmlAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildRouteHtml(template, route, appHtml) {
  const safeTitle = escapeHtmlAttr(route.title);
  const safeDesc = escapeHtmlAttr(route.description);

  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${safeDesc}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${safeTitle}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${safeDesc}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`,
  );

  if (siteUrl) {
    const canonicalUrl = `${siteUrl}${route.routePath === '/' ? '/' : route.routePath}`;
    const seoLinks = `    <link rel="canonical" href="${escapeHtmlAttr(canonicalUrl)}" />\n    <meta property="og:url" content="${escapeHtmlAttr(canonicalUrl)}" />`;
    html = html.replace('</head>', `${seoLinks}\n  </head>`);
  }

  return html;
}

async function run() {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  for (const route of ROUTES) {
    const appHtml = render(route.routePath);
    if (!appHtml || !appHtml.includes('<h1')) {
      throw new Error(`Pre-render produced incomplete HTML for ${route.routePath}`);
    }
    const finalHtml = buildRouteHtml(template, route, appHtml);
    fs.mkdirSync(path.dirname(route.outFile), { recursive: true });
    fs.writeFileSync(route.outFile, finalHtml, 'utf-8');
  }

  if (siteUrl) {
    const sitemapEntries = ROUTES.map((route) => {
      const loc = `${siteUrl}${route.routePath === '/' ? '/' : route.routePath}`;
      return `  <url>\n    <loc>${escapeHtmlAttr(loc)}</loc>\n  </url>`;
    }).join('\n');
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');

    const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf-8');
  }

  console.log(`Pre-rendered ${ROUTES.length} static routes into dist/.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
