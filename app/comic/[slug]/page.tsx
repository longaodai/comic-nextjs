import Image from 'next/image';
import { request } from '@/config/axios';
import { notFound } from 'next/navigation';
import ChapterList from '@/components/ui/ChapterList';
import { Chapter, Comic } from '@/types/comic';
import ComicDescription from '@/components/ui/ComicDescription';
import Link from 'next/link';
import { generateComicDetailSEO } from '@/utils/seoHelper';
import { getComicStatus } from '@/utils/utils';
import { CDN_IMAGE_URL } from '@/utils/constants';

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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const comic = await getComicDetail(slug);
  if (!comic) return {};

  return generateComicDetailSEO(comic);
}

export default async function ComicDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const comic = await getComicDetail(slug);

  if (!comic) return notFound();

  const chapters: Chapter[] = [
    ...(comic?.chapters?.[0]?.server_data || []),
  ].sort((a, b) => Number(b.chapter_name) - Number(a.chapter_name));

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Comic Info Card */}
      <div className="bg-base-100 shadow-lg rounded-xl overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnail Container with fixed aspect ratio */}
          <div className="md:w-1/4 flex-shrink-0">
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
              <Image
                src={`${CDN_IMAGE_URL}/uploads/comics/${comic.thumb_url}`}
                alt={comic.name}
                className="object-cover hover:scale-105 transition-transform duration-300"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                priority
              />
            </div>
          </div>

          {/* Comic Details */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Title and Status */}
            <div className="flex flex-col mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-base-content">
                {comic.name}
              </h1>
              <div className="badge badge-primary py-2 mt-2">
                {getComicStatus(comic.status)}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Thể loại:</h3>
              <div className="flex flex-wrap gap-2">
                {comic.category.map((cat) => (
                  <Link
                    href={`/categories/${cat.slug}`}
                    key={cat.slug}
                    className="badge badge-outline badge-secondary hover:badge-secondary transition-colors text-xs py-2"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-2">
              <h3 className="text-sm font-medium mb-2">Nội dung:</h3>
              <ComicDescription content={comic?.content || null} />
            </div>

            {/* Quick Actions */}
            {chapters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 md:mt-auto pt-4">
                <Link
                  href={`/comic/${comic.slug}/${chapters[0].chapter_name}`}
                  className="btn btn-primary btn-sm md:btn-md"
                >
                  Đọc mới nhất
                </Link>
                <Link
                  href={`/comic/${comic.slug}/${
                    chapters[chapters.length - 1].chapter_name
                  }`}
                  className="btn btn-outline btn-sm md:btn-md"
                >
                  Đọc từ đầu
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chapter List Section */}
      <div className="bg-base-100 shadow-lg rounded-xl overflow-hidden p-4">
        <div className="">
          <h2 className="text-xl font-bold">Danh sách Chapter</h2>
          <p className="text-sm text-gray-500 mt-1">
            {chapters.length} chapter{chapters.length !== 1 ? 's' : ''}
          </p>
        </div>
        <ChapterList comicSlug={comic.slug} initialChapters={chapters} />
      </div>
    </div>
  );
}
