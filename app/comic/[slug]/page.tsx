import { Metadata } from 'next';
import Image from 'next/image';
import { request } from '@/config/axios';
import { notFound } from 'next/navigation';
import ChapterList from '@/components/ui/ChapterList';
import { Chapter, Comic } from '@/types/comic';
import ComicDescription from '@/components/ui/ComicDescription';
import Link from 'next/link';

const SITE_URL = 'https://truyentranh.online';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getComicDetail(slug: string): Promise<Comic | null> {
  try {
    const response = await request.get(`/truyen-tranh/${slug}`);
    return response.data.data.item || null;
  } catch (error) {
    console.error('Error fetching comic details:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comic = await getComicDetail(slug);
  if (!comic) return {};

  const title = `${comic.name} - Đọc Truyện Tranh Online`;
  const description = `Đọc truyện ${
    comic.name
  } miễn phí với đầy đủ chapter cập nhật mới nhất. Thể loại: ${comic.category
    .map((c) => c.name)
    .join(', ')}.`;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${SITE_URL}/comic/${comic.slug}`,
      images: [
        {
          url: `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`,
          width: 800,
          height: 1200,
          alt: comic.name,
        },
      ],
    },
  };
}

export default async function ComicDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const comic = await getComicDetail(slug);

  if (!comic) return notFound();

  const chapters: Chapter[] = [
    ...(comic?.chapters?.[0]?.server_data || []),
  ].sort((a, b) => Number(b.chapter_name) - Number(a.chapter_name));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row bg-base-100 shadow-xl rounded-xl overflow-hidden">
        <div className="relative w-full lg:w-1/4">
          <Image
            src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
            alt={comic.name}
            className="w-full h-full object-cover"
            width={800}
            height={1200}
            unoptimized
          />
        </div>
        <div className="p-6 lg:w-3/4">
          <h1 className="text-3xl font-bold text-base-content">{comic.name}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {comic.category.map((cat) => (
              <Link
                href={`/categories/${cat.slug}`}
                key={cat.slug}
                className="badge badge-secondary text-xs"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <ComicDescription content={comic?.content || null} />
        </div>
      </div>
      <ChapterList comicSlug={comic.slug} initialChapters={chapters} />
    </div>
  );
}
