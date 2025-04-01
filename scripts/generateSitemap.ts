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
];

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

async function generateSitemap() {
  console.time('Sitemap generation');
  const urlEntries: string[] = [];
  const currentDate = new Date().toISOString();

  STATIC_PATHS.forEach((staticPath) => {
    urlEntries.push(
      createUrlEntry(`${DOMAIN}${staticPath}`, currentDate, '1.0', 'weekly')
    );
  });

  const categories = await fetchCategories();
  console.log(`Fetched ${categories.length} categories`);

  const categoryPromises = categories.map(async (category) => {
    const categoryUrl = createUrlEntry(
      `${DOMAIN}/categories/${category}`,
      currentDate,
      '0.9',
      'weekly'
    );

    const comics = await fetchComicsByCategory(category);
    console.log(`Fetched ${comics.length} comics for category ${category}`);

    const comicUrls = comics.map(({ slug, updatedAt }) => {
      return createUrlEntry(
        `${DOMAIN}/comic/${slug}`,
        updatedAt,
        '0.8',
        'daily'
      );
    });

    return [categoryUrl, ...comicUrls];
  });

  const categoryResults = await Promise.allSettled(categoryPromises);
  categoryResults.forEach((result) => {
    if (result.status === 'fulfilled') {
      urlEntries.push(...result.value);
    }
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlEntries.join('\n  ')}
</urlset>`;

  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.timeEnd('Sitemap generation');
  console.log(
    `✅ Sitemap generated successfully with ${urlEntries.length} URLs at: ${sitemapPath}`
  );
}

generateSitemap().catch((error) => {
  console.error('Failed to generate sitemap:', error);
  process.exit(1);
});
