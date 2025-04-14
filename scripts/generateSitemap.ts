//npx tsc generateSitemap.ts
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

const DOMAIN = 'https://comicmoi.site';
const API_BASE = 'https://otruyenapi.com/v1/api';
const STATIC_PATHS = [
  '/',
  '/list',
  '/list/sap-ra-mat',
  '/list/truyen-moi',
  '/list/dang-phat-hanh',
  '/list/hoan-thanh',
  '/categories',
  '/contact',
  '/terms',
  '/privacy',
];

// Constants for sitemap size management
const MAX_URLS_PER_SITEMAP = 40000; // Keep under the 50,000 limit
const OUTPUT_DIR = path.join(process.cwd(), 'public');

const api = axios.create({
  timeout: 10000,
  headers: {
    Connection: 'keep-alive',
  },
});

api.interceptors.response.use(undefined, async (err) => {
  const config = err.config || {};
  config.retryCount = config.retryCount || 0;
  const maxRetries = 3;
  const retryDelay = 1000;

  if (config.retryCount >= maxRetries) {
    return Promise.reject(err);
  }

  config.retryCount += 1;
  await new Promise((resolve) => setTimeout(resolve, retryDelay));
  return api(config);
});

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

function createUrlEntry(
  loc: string,
  lastmod: string,
  priority = '0.8',
  changefreq = 'daily'
): string {
  return `<url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod.split('.')[0]}Z</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function fetchCategories(): Promise<string[]> {
  try {
    const response = await api.get(`${API_BASE}/the-loai`);
    return response.data.data.items.map((item: { slug: string }) => item.slug);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function fetchComicsByCategory(
  categorySlug: string
): Promise<{ slug: string; updatedAt: string }[]> {
  const comics = new Map<string, string>();
  let page = 1;
  let totalPages = 1;

  try {
    const firstResponse = await api.get(
      `${API_BASE}/the-loai/${categorySlug}?page=${page}`
    );
    const firstData = firstResponse.data.data;

    if (!firstData || !firstData.items) return [];

    firstData.items.forEach((comic: { slug: string; updatedAt: string }) => {
      comics.set(comic.slug, comic.updatedAt);
    });

    totalPages = Math.ceil(
      firstData.params.pagination.totalItems /
        firstData.params.pagination.totalItemsPerPage
    );

    const pagePromises = [];
    for (page = 2; page <= totalPages; page++) {
      pagePromises.push(
        api.get(`${API_BASE}/the-loai/${categorySlug}?page=${page}`)
      );
    }

    if (pagePromises.length > 0) {
      const responses = await Promise.allSettled(pagePromises);

      responses.forEach((result) => {
        if (result.status === 'fulfilled') {
          const data = result.value.data.data;
          if (data && data.items) {
            data.items.forEach((comic: { slug: string; updatedAt: string }) => {
              comics.set(comic.slug, comic.updatedAt);
            });
          }
        }
      });
    }
  } catch (error) {
    console.error(`Error fetching comics for category ${categorySlug}:`, error);
  }

  return Array.from(comics.entries()).map(([slug, updatedAt]) => ({
    slug,
    updatedAt: updatedAt || new Date().toISOString(),
  }));
}

// Function to write a sitemap file
function writeSitemap(filename: string, urls: string[]): void {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n  ')}
</urlset>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, filename), content);
}

// Function to write the sitemap index file
function writeSitemapIndex(
  sitemapFiles: { filename: string; lastmod: string }[]
): void {
  const sitemapEntries = sitemapFiles.map(
    (file) => `<sitemap>
    <loc>${DOMAIN}/${file.filename}</loc>
    <lastmod>${file.lastmod}</lastmod>
  </sitemap>`
  );

  const indexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries.join('\n  ')}
</sitemapindex>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), indexContent);
}

async function generateSitemaps() {
  console.time('Sitemap generation');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const currentDate = new Date().toISOString();
  const sitemapFiles: { filename: string; lastmod: string }[] = [];

  // Create static pages sitemap
  const staticUrlEntries = STATIC_PATHS.map((staticPath) =>
    createUrlEntry(`${DOMAIN}${staticPath}`, currentDate, '1.0', 'weekly')
  );

  const staticSitemapFile = 'sitemap-static.xml';
  writeSitemap(staticSitemapFile, staticUrlEntries);
  sitemapFiles.push({ filename: staticSitemapFile, lastmod: currentDate });
  console.log(`Created static sitemap with ${staticUrlEntries.length} URLs`);

  // Fetch all categories
  const categories = await fetchCategories();
  console.log(`Fetched ${categories.length} categories`);

  // Process categories and create category-specific sitemaps
  let currentSitemapUrls: string[] = [];
  let currentSitemapIndex = 1;

  for (const category of categories) {
    // Add category URL
    const categoryUrl = createUrlEntry(
      `${DOMAIN}/categories/${category}`,
      currentDate,
      '0.9',
      'weekly'
    );
    currentSitemapUrls.push(categoryUrl);

    // Fetch comics for this category
    const comics = await fetchComicsByCategory(category);
    console.log(`Fetched ${comics.length} comics for category "${category}"`);

    // Create URL entries for comics
    for (const { slug, updatedAt } of comics) {
      const comicUrl = createUrlEntry(
        `${DOMAIN}/comic/${slug}`,
        updatedAt,
        '0.8',
        'daily'
      );

      currentSitemapUrls.push(comicUrl);

      // If we've reached the limit, write the current sitemap and start a new one
      if (currentSitemapUrls.length >= MAX_URLS_PER_SITEMAP) {
        const filename = `sitemap-comics-${currentSitemapIndex}.xml`;
        writeSitemap(filename, currentSitemapUrls);
        sitemapFiles.push({ filename, lastmod: currentDate });
        console.log(
          `Created sitemap ${filename} with ${currentSitemapUrls.length} URLs`
        );

        // Reset for next sitemap
        currentSitemapUrls = [];
        currentSitemapIndex++;
      }
    }
  }

  // Write any remaining URLs to a final sitemap
  if (currentSitemapUrls.length > 0) {
    const filename = `sitemap-comics-${currentSitemapIndex}.xml`;
    writeSitemap(filename, currentSitemapUrls);
    sitemapFiles.push({ filename, lastmod: currentDate });
    console.log(
      `Created sitemap ${filename} with ${currentSitemapUrls.length} URLs`
    );
  }

  // Create the sitemap index file
  writeSitemapIndex(sitemapFiles);

  console.timeEnd('Sitemap generation');
  console.log(
    `✅ Successfully generated ${sitemapFiles.length} sitemaps with a sitemap index`
  );
}

generateSitemaps().catch((error) => {
  console.error('Failed to generate sitemaps:', error);
  process.exit(1);
});
