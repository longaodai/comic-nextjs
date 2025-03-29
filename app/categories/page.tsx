import { Metadata } from 'next';
import { request } from '@/config/axios';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';
import { Category } from '@/types/comic';

const SITE_URL = 'https://truyentranh.online';

async function getCategoriesData() {
  try {
    const response = await request.get<{ data: { items: Category[] } }>(
      '/the-loai'
    );
    return response.data.data.items || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Danh Mục Thể Loại - TruyenTranh.Online';
  const description =
    'Khám phá danh mục thể loại truyện tranh đa dạng trên TruyenTranh.Online. Cập nhật nhanh các thể loại manga, manhwa, manhua hay nhất!';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Danh Mục Thể Loại',
    url: `${SITE_URL}/categories`,
    description,
  };

  return {
    title,
    description,
    keywords: [
      'thể loại truyện tranh',
      'truyện tranh hay',
      'truyện tranh mới',
      'manga',
      'manhwa',
      'manhua',
      'truyện tranh online',
    ].join(', '),
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${SITE_URL}/categories`,
      siteName: 'TruyenTranh.Online',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/categories`,
    },
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}

export default async function CategoryPage() {
  const categories = await getCategoriesData();

  return (
    <div className="container mx-auto p-4">
      {categories.length > 0 ? (
        <>
          <SectionTitle title="Danh Mục Thể Loại" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="bg-base-100 shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 flex flex-col items-center text-center border border-primary group-hover:border-secondary">
                  <h2 className="text-lg font-bold text-primary group-hover:text-secondary">
                    {category.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Không có danh mục nào!
        </div>
      )}
    </div>
  );
}
