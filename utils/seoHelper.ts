// utils/seoHelper.ts
import { CDN_IMAGE_URL, SITE_URL } from '@/utils/constants';
import { Category, Comic, SEOData } from '@/types/comic';

export function generateSEOData(seo: SEOData | null) {
  const defaultTitle = 'Đọc truyện tranh online miễn phí - Cập nhật nhanh';
  const defaultDescription =
    'Truyentranh.online - Website đọc truyện tranh miễn phí, cập nhật nhanh nhất với chất lượng hình ảnh sắc nét.';

  const ogImages =
    seo?.og_image && seo.og_image.length
      ? seo.og_image.map((img) => ({
          url: `${CDN_IMAGE_URL}${img}`,
          width: 1200,
          height: 630,
          alt: seo.titleHead || defaultTitle,
        }))
      : [
          {
            url: `${CDN_IMAGE_URL}/default-og-image.jpg`,
            width: 1200,
            height: 630,
            alt: defaultTitle,
          },
        ];

  return {
    title: seo?.titleHead || defaultTitle,
    description: seo?.descriptionHead || defaultDescription,
    openGraph: {
      type: seo?.og_type || 'website',
      title: seo?.titleHead || defaultTitle,
      description: seo?.descriptionHead || defaultDescription,
      url: SITE_URL,
      siteName: 'TruyenTranh.Online',
      images: ogImages,
      locale: 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.titleHead || defaultTitle,
      description: seo?.descriptionHead || defaultDescription,
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
        name: 'TruyenTranh.Online',
        url: SITE_URL,
        description: seo?.descriptionHead || defaultDescription,
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
  const title = 'Danh Mục Thể Loại Truyện Tranh - TruyenTranh.Online';
  const description =
    'Khám phá danh mục thể loại truyện tranh đa dạng trên TruyenTranh.Online. Cập nhật nhanh các thể loại manga, manhwa, manhua hay nhất!';
  const url = `${SITE_URL}/categories`;

  const keywords = [
    'thể loại truyện tranh',
    'truyện tranh hay',
    'truyện tranh mới',
    'manga',
    'manhwa',
    'manhua',
    'truyện tranh online',
    ...categories.map((c) => c.name.toLowerCase()),
  ].join(', ');

  const ogImage =
    categories.length > 0
      ? `${CDN_IMAGE_URL}/categories/${categories[0].slug}.jpg`
      : `${CDN_IMAGE_URL}/default-category.jpg`;

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
      siteName: 'TruyenTranh.Online',
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
  const title = 'Danh Sách Truyện Tranh - TruyenTranh.Online';
  const description =
    'Khám phá danh sách các bộ truyện tranh hot nhất, được cập nhật liên tục trên TruyenTranh.Online. Đọc truyện miễn phí, nhanh chóng, chất lượng cao!';
  const url = `${SITE_URL}/comic-list`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url,
    description,
    publisher: {
      '@type': 'Organization',
      name: 'TruyenTranh.Online',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: `${CDN_IMAGE_URL}/default-cover.jpg`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Danh Sách Truyện Tranh',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Truyện mới cập nhật',
          url: `${SITE_URL}/comic-list/latest`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Truyện đang hot',
          url: `${SITE_URL}/comic-list/trending`,
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
      'truyen tranh full',
    ].join(', '),
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'TruyenTranh.Online',
      locale: 'vi_VN',
      images: [
        {
          url: `${CDN_IMAGE_URL}/default-cover.jpg`,
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
      images: [`${CDN_IMAGE_URL}/default-cover.jpg`],
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
  const url = `${SITE_URL}/danh-sach/${slug}`;
  const description = `Khám phá danh sách các bộ truyện tranh thuộc thể loại ${title} trên TruyenTranh.Online. Đọc truyện miễn phí, cập nhật nhanh chóng!`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url,
    description,
    publisher: {
      '@type': 'Organization',
      name: 'TruyenTranh.Online',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: `${CDN_IMAGE_URL}/default-category.jpg`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Danh sách truyện ${title}`,
      itemListElement: comics.slice(0, 10).map((comic, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: comic.name,
        url: `${SITE_URL}/truyen/${comic.slug}`,
      })),
    },
  };

  return {
    title: title || 'Danh Sách Truyện Tranh - TruyenTranh.Online',
    description,
    keywords: [
      `truyện ${title}`,
      'truyện tranh online',
      'truyện tranh hay',
      'manga',
      'manhwa',
      'manhua',
      'truyen tranh full',
    ].join(', '),
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'TruyenTranh.Online',
      locale: 'vi_VN',
      images: [
        {
          url: `${CDN_IMAGE_URL}/default-category.jpg`,
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
      images: [`${CDN_IMAGE_URL}/default-category.jpg`],
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
  const url = `${SITE_URL}/the-loai/${slug}`;
  const description = `Khám phá thể loại truyện tranh ${title} trên TruyenTranh.Online. Cập nhật nhanh, đọc truyện miễn phí với hàng ngàn bộ truyện hấp dẫn!`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url,
    description,
    publisher: {
      '@type': 'Organization',
      name: 'TruyenTranh.Online',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: `${CDN_IMAGE_URL}/default-category.jpg`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Danh sách truyện thể loại ${title}`,
      itemListElement: comics.slice(0, 10).map((comic, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: comic.name,
        url: `${SITE_URL}/truyen/${comic.slug}`,
      })),
    },
  };

  return {
    title: title || 'Thể Loại Truyện Tranh - TruyenTranh.Online',
    description,
    keywords: [
      `truyện ${title}`,
      'truyện tranh online',
      'truyện tranh hay',
      'manga',
      'manhwa',
      'manhua',
      'truyen tranh full',
    ].join(', '),
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'TruyenTranh.Online',
      images: [
        {
          url: `${CDN_IMAGE_URL}/default-category.jpg`,
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
      images: [`${CDN_IMAGE_URL}/default-category.jpg`],
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
  const title = `${comic.name} - Đọc Truyện Tranh Online`;
  const description = `Đọc truyện tranh ${
    comic.name
  } miễn phí với đầy đủ chapter cập nhật mới nhất. Thể loại: ${comic.category
    .map((c) => c.name)
    .join(', ')}.`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: comic.name,
    url,
    description,
    image: `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`,
    genre: comic.category.map((c) => c.name),
    author: {
      '@type': 'Person',
      name: 'TruyenTranh.Online',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TruyenTranh.Online',
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
      `${comic.name} chap mới`,
      `đọc truyện ${comic.name}`,
      'truyện tranh online',
      'manga',
      'manhwa',
      'manhua',
      'truyện tranh full',
    ].join(', '),
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'TruyenTranh.Online',
      images: [
        {
          url: `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`,
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
      images: [`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`],
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
  const url = `${SITE_URL}/search?q=${query}`;
  const title = query
    ? `Kết quả tìm kiếm cho "${query}" - TruyenTranh.Online`
    : 'Tìm kiếm truyện tranh - TruyenTranh.Online';
  const description = query
    ? `Tìm kiếm truyện tranh với từ khóa "${query}". Khám phá hàng ngàn bộ truyện tranh hấp dẫn được cập nhật liên tục tại TruyenTranh.Online.`
    : 'Tìm kiếm truyện tranh online miễn phí tại TruyenTranh.Online. Khám phá hàng ngàn bộ truyện hấp dẫn, cập nhật mỗi ngày.';

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
      'manga',
      'manhwa',
      'manhua',
      'truyện tranh online',
    ]
      .filter(Boolean)
      .join(', '),
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'TruyenTranh.Online',
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
