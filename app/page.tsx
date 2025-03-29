import { request } from '@/config/axios';
import ComicSection from '@/components/ui/ComicSection';
import HomeSlider from '@/components/ui/HomeSlider';
import { ComicsResponse, Comic, SEOData } from '@/types/comic';

const SITE_URL = 'https://truyentranh.online';
const CDN_IMAGE_URL = 'https://img.otruyenapi.com';

async function getComicsData() {
  try {
    const [latest, upcoming, ongoing, completed] = await Promise.all([
      request.get<ComicsResponse>('/danh-sach/truyen-moi'),
      request.get<ComicsResponse>('/danh-sach/sap-ra-mat'),
      request.get<ComicsResponse>('/danh-sach/dang-phat-hanh'),
      request.get<ComicsResponse>('/danh-sach/hoan-thanh'),
    ]);

    return {
      latestComics: latest.data.data.items || [],
      upcomingComics: upcoming.data.data.items || [],
      ongoingComics: ongoing.data.data.items || [],
      completedComics: completed.data.data.items || [],
      seo: latest.data.data.seoOnPage || ({} as SEOData),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      latestComics: [] as Comic[],
      upcomingComics: [] as Comic[],
      ongoingComics: [] as Comic[],
      completedComics: [] as Comic[],
      seo: {} as SEOData,
    };
  }
}

export async function generateMetadata() {
  const { seo } = await getComicsData();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TruyenTranh.Online',
    url: SITE_URL,
    description:
      seo.descriptionHead ||
      'Truyentranh.online - Website đọc truyện tranh miễn phí, cập nhật nhanh nhất với chất lượng hình ảnh sắc nét.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    title: seo.titleHead || 'Đọc truyện tranh online miễn phí - Cập nhật nhanh',
    description:
      seo.descriptionHead ||
      'Truyentranh.online - Website đọc truyện tranh miễn phí, cập nhật nhanh nhất với chất lượng hình ảnh sắc nét.',
    keywords: [
      'truyện tranh online',
      'đọc truyện miễn phí',
      'manga',
      'manhwa',
      'manhua',
      'truyện tranh hay',
      'truyện tranh mới',
      'truyện tranh full',
      'truyện tranh hot',
    ].join(', '),
    openGraph: {
      type: seo.og_type || 'website',
      title:
        seo.titleHead || 'Đọc truyện tranh online miễn phí - Cập nhật nhanh',
      description:
        seo.descriptionHead ||
        'Truyentranh.online - Website đọc truyện tranh miễn phí, cập nhật nhanh nhất với chất lượng hình ảnh sắc nét.',
      url: SITE_URL,
      siteName: 'TruyenTranh.Online',
      images: seo.og_image.map((img) => ({
        url: `${CDN_IMAGE_URL}${img}`,
        width: 1200,
        height: 630,
        alt: seo.titleHead || 'Đọc truyện tranh miễn phí',
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title:
        seo.titleHead || 'Đọc truyện tranh online miễn phí - Cập nhật nhanh',
      description:
        seo.descriptionHead ||
        'Truyentranh.online - Website đọc truyện tranh miễn phí, cập nhật nhanh nhất với chất lượng hình ảnh sắc nét.',
      images: seo.og_image.map((img) => `${CDN_IMAGE_URL}${img}`),
    },
    alternates: {
      canonical: SITE_URL,
    },
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}

export default async function HomePage() {
  const { latestComics, upcomingComics, ongoingComics, completedComics } =
    await getComicsData();

  return (
    <div className="container mx-auto p-2 sm:p-4 space-y-8 sm:space-y-10 pt-0">
      <HomeSlider />

      {latestComics.length > 0 && (
        <ComicSection
          title="Truyện mới"
          comics={latestComics}
          color="#ff416c"
        />
      )}
      {upcomingComics.length > 0 && (
        <ComicSection
          title="Sắp ra mắt"
          comics={upcomingComics}
          color="#56ccf2"
        />
      )}
      {ongoingComics.length > 0 && (
        <ComicSection
          title="Đang phát hành"
          comics={ongoingComics}
          color="#f2994a"
        />
      )}
      {completedComics.length > 0 && (
        <ComicSection
          title="Truyện hoàn thành"
          comics={completedComics}
          color="#00b09b"
        />
      )}
    </div>
  );
}
