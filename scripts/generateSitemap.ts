import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

const DOMAIN = 'https://truyentranh.online';
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

async function fetchCategories(): Promise<string[]> {
  try {
    const response = await axios.get(`${API_BASE}/the-loai`);
    return response.data.data.items.map((item: { slug: string }) => item.slug);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function fetchComicsByCategory(
  categorySlug: string
): Promise<{ slug: string; updatedAt: string }[]> {
  // eslint-disable-next-line prefer-const
  let comics = new Map<string, string>();
  let page = 1;
  let totalPages = 1;

  try {
    while (page <= totalPages) {
      const response = await axios.get(
        `${API_BASE}/the-loai/${categorySlug}?page=${page}`
      );
      const data = response.data.data;
      if (!data || !data.items) break;

      data.items.forEach((comic: { slug: string; updatedAt: string }) => {
        comics.set(comic.slug, comic.updatedAt);
      });

      totalPages = Math.ceil(
        data.params.pagination.totalItems /
          data.params.pagination.totalItemsPerPage
      );
      page++;
    }
  } catch (error) {
    console.error(`Error fetching comics for category ${categorySlug}:`, error);
  }

  return Array.from(comics.entries()).map(([slug, updatedAt]) => ({
    slug,
    updatedAt,
  }));
}

async function generateSitemap() {
  // eslint-disable-next-line prefer-const
  let urlSet = new Set<string>();
  const currentDate = new Date().toISOString(); // Full ISO format YYYY-MM-DDTHH:mm:ss.sssZ

  STATIC_PATHS.forEach((path) => {
    urlSet.add(
      `<url><loc>${DOMAIN}${path}</loc><lastmod>${currentDate}</lastmod></url>`
    );
  });

  // Fetch categories
  const categories = await fetchCategories();
  for (const category of categories) {
    urlSet.add(
      `<url><loc>${DOMAIN}/categories/${category}</loc><lastmod>${currentDate}</lastmod></url>`
    );

    // Fetch comics theo category
    const comics = await fetchComicsByCategory(category);
    comics.forEach(({ slug, updatedAt }) => {
      const lastmod = updatedAt ? updatedAt : currentDate;
      urlSet.add(
        `<url><loc>${DOMAIN}/comic/${slug}</loc><lastmod>${lastmod}</lastmod></url>`
      );
    });
  }

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${Array.from(
    urlSet
  ).join('\n  ')}\n</urlset>`;

  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log('✅ Sitemap generated successfully at:', sitemapPath);
}

generateSitemap();
