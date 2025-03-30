import { CDN_IMAGE_URL, SITE_NAME, SITE_URL } from '@/utils/constants';
import { Category, Comic, SEOData } from '@/types/comic';

export function generateSEOData(seo: SEOData | null) {
  const defaultTitle = `Đọc Truyện Tranh Online Miễn Phí - ${SITE_NAME}`;
  const defaultDescription = `${SITE_NAME} - Website đọc truyện tranh miễn phí với hàng ngàn bộ truyện hấp dẫn. Cập nhật nhanh nhất, chất lượng cao, không quảng cáo.`;

  const ogImages =
    seo?.og_image && seo.og_image.length
      ? seo.og_image.map((img) => ({
          url: `${CDN_IMAGE_URL}${img}`,
          width: 1200,
          height: 630,
          alt: defaultTitle,
        }))
      : [
          {
            url: `${SITE_URL}/default-og-image.jpg`,
            width: 1200,
            height: 630,
            alt: defaultTitle,
          },
        ];

  return {
    title: defaultTitle,
    description: defaultDescription,
    openGraph: {
      type: seo?.og_type || 'website',
      title: defaultTitle,
      description: defaultDescription,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: ogImages,
      locale: 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDescription,
      images: ogImages.map((img) => img.url),
    },
    alternates: {
      canonical: SITE_URL,
    },
    robots: 'index, follow',
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: defaultDescription,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  };
}

export function generateCategorySEO(categories: Category[]) {
  const title = `Danh Mục Truyện Tranh Hay Nhất - ${SITE_NAME}`;
  const description = `Tổng hợp danh mục truyện tranh đặc sắc trên ${SITE_NAME}. Đọc truyện tranh mới, hot, full chap nhanh nhất!`;
  const url = `${SITE_URL}/categories`;

  const keywords = [
    'thể loại truyện tranh',
    'truyện tranh hay nhất',
    'truyện tranh online',
    'manga',
    'manhwa',
    'manhua',
    ...categories.map((c) => c.name.toLowerCase()),
  ].join(', ');

  const ogImage = `${SITE_URL}/default-category.jpg`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Danh Mục Thể Loại',
    url,
    description,
    itemListElement: categories.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: category.name,
      url: `${SITE_URL}/categories/${category.slug}`,
    })),
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
    robots: 'index, follow',
    other: { 'application/ld+json': JSON.stringify(structuredData) },
  };
}

export function generateComicListSEO() {
  const title = `Danh Sách Truyện Tranh Hot Nhất - ${SITE_NAME}`;
  const description = `Khám phá danh sách truyện tranh hay nhất, mới nhất và được yêu thích trên ${SITE_NAME}. Đọc truyện miễn phí, chất lượng cao, không quảng cáo!`;
  const url = `${SITE_URL}/list`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url,
    description,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: `${SITE_URL}/default-cover.jpg`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Danh Sách Truyện Tranh',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Truyện Mới',
          url: `${SITE_URL}/list/truyen-moi`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sắp Ra Mắt',
          url: `${SITE_URL}/list/sap-ra-mat`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Đang Phát Hành',
          url: `${SITE_URL}/list/dang-phat-hanh`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Hoàn Thành',
          url: `${SITE_URL}/list/hoan-thanh`,
        },
      ],
    },
  };

  return {
    title,
    description,
    keywords: [
      'danh sách truyện tranh',
      'truyện tranh hot',
      'truyện tranh mới',
      'đọc truyện online',
      'manga',
      'manhwa',
      'manhua',
      'truyện tranh full',
    ].join(', '),
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      images: [
        {
          url: `${SITE_URL}/default-cover.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/default-cover.jpg`],
    },
    alternates: {
      canonical: url,
    },
    robots: 'index, follow',
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}

export function generateComicCategorySEO(
  slug: string,
  title: string,
  comics: Comic[]
) {
  const url = `${SITE_URL}/categories/${slug}`;
  const description = `Đọc truyện tranh ${title} mới nhất, miễn phí, cập nhật nhanh chóng tại ${SITE_NAME}. Kho truyện đa dạng: manga, manhwa, manhua, truyện màu, truyện full!`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url,
    description,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: `${SITE_URL}/default-category.jpg`,
    hasPart: comics.slice(0, 10).map((comic, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: comic.name,
      url: `${SITE_URL}/comic/${comic.slug}`,
    })),
  };

  return {
    title: `${title} - Thể Loại Truyện Tranh Hot | ${SITE_NAME}`,
    description,
    keywords: [
      `truyện ${title} hay`,
      `đọc truyện ${title} miễn phí`,
      'truyện tranh online',
      'truyện tranh hot',
      'truyện tranh mới',
      'truyện tranh full',
      'manga',
      'manhwa',
      'manhua',
      'webtoon',
      `truyen ${title} hay nhat`,
      `doc truyen ${title} nhanh nhat`,
    ].join(', '),
    openGraph: {
      type: 'website',
      title: `${title} - Thể Loại Truyện Tranh Hot | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      images: [
        {
          url: `${SITE_URL}/default-category.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Thể Loại Truyện Tranh Hot | ${SITE_NAME}`,
      description,
      images: [`${SITE_URL}/default-category.jpg`],
    },
    alternates: {
      canonical: url,
    },
    robots: 'index, follow',
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}

export function generateComicGenreSEO(
  slug: string,
  title: string,
  comics: Comic[]
) {
  const url = `${SITE_URL}/list/${slug}`;
  const description = `Khám phá Danh Mục truyện tranh ${title} mới nhất tại ${SITE_NAME}. Đọc truyện miễn phí, cập nhật nhanh, hàng ngàn bộ truyện hấp dẫn đang chờ bạn!`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url,
    description,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: `${SITE_URL}/default-category.jpg`,
    hasPart: comics.slice(0, 10).map((comic, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: comic.name,
      url: `${SITE_URL}/comic/${comic.slug}`,
    })),
  };

  return {
    title: `${title} - Danh Mục Truyện Tranh Hot | ${SITE_NAME}`,
    description,
    keywords: [
      `truyện ${title} hay`,
      `đọc truyện ${title} miễn phí`,
      'truyện tranh online',
      'truyện tranh hot',
      'truyện tranh mới',
      'truyện tranh full',
      'manga',
      'manhwa',
      'manhua',
      'webtoon',
      `truyen ${title} hay nhat`,
      `doc truyen ${title} nhanh nhat`,
    ].join(', '),
    openGraph: {
      type: 'website',
      title: `${title} - Danh Mục Truyện Tranh Hot | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      images: [
        {
          url: `${SITE_URL}/default-category.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Danh Mục Truyện Tranh Hot | ${SITE_NAME}`,
      description,
      images: [`${SITE_URL}/default-category.jpg`],
    },
    alternates: {
      canonical: url,
    },
    robots: 'index, follow',
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}

export function generateComicDetailSEO(comic: Comic) {
  const url = `${SITE_URL}/comic/${comic.slug}`;
  const title = `${comic.name} - Đọc Truyện Tranh Online Miễn Phí | ${SITE_NAME}`;
  const description = `Đọc truyện tranh ${
    comic.name
  } miễn phí với đầy đủ chapter cập nhật mới nhất. Thể loại: ${comic.category
    .map((c) => c.name)
    .join(', ')}. Trải nghiệm truyện tranh hấp dẫn tại ${SITE_NAME}!`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: comic.name,
    url,
    description,
    image: `${CDN_IMAGE_URL}/uploads/comics/${comic.thumb_url}`,
    genre: comic.category.map((c) => c.name),
    author: SITE_NAME,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'ReadAction',
      target: url,
    },
  };

  return {
    title,
    description,
    keywords: [
      `${comic.name} chap mới nhất`,
      `đọc truyện ${comic.name} full`,
      `truyện tranh ${comic.name} online`,
      'truyện tranh hot',
      'truyện tranh mới',
      'manga',
      'manhwa',
      'manhua',
      'webtoon',
      `truyen ${comic.name} hay nhat`,
      `doc truyen ${comic.name} nhanh nhat`,
    ].join(', '),
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${CDN_IMAGE_URL}/uploads/comics/${comic.thumb_url}`,
          width: 800,
          height: 1200,
          alt: comic.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${CDN_IMAGE_URL}/uploads/comics/${comic.thumb_url}`],
    },
    alternates: {
      canonical: url,
    },
    robots: 'index, follow',
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}

export function generateSearchSEO(query: string) {
  const url = `${SITE_URL}/search?q=${encodeURIComponent(query)}`;
  const title = query
    ? `Kết quả tìm kiếm cho "${query}" - ${SITE_NAME}`
    : `Tìm kiếm truyện tranh - ${SITE_NAME}`;
  const description = query
    ? `Tìm kiếm truyện tranh với từ khóa "${query}". Khám phá hàng ngàn bộ truyện tranh hấp dẫn được cập nhật liên tục tại ${SITE_NAME}.`
    : `Tìm kiếm truyện tranh online miễn phí tại ${SITE_NAME}. Khám phá hàng ngàn bộ truyện hấp dẫn, cập nhật mỗi ngày.`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: title,
    description,
    url,
  };

  return {
    title,
    description,
    keywords: [
      'tìm kiếm truyện tranh',
      'đọc truyện tranh',
      query,
      'truyện tranh hot',
      'truyện tranh mới',
      'manga',
      'manhwa',
      'manhua',
      'webtoon',
      `tim truyen ${query} nhanh nhat`,
    ]
      .filter(Boolean)
      .join(', '),
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: 'index, follow',
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}
