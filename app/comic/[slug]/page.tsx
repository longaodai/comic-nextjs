'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import SkeletonComicDetail from '@/components/ui/skeletons/SkeletonComicDetail';
import { request } from '@/config/axios';

interface Chapter {
  chapter_name: string;
}

interface Comic {
  _id: string;
  slug: string;
  thumb_url: string;
  name: string;
  status: string;
  category: { id: number; name: string }[];
  content: string;
  chapters?: { server_data?: Chapter[] }[];
}

export default function ComicDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [comic, setComic] = useState<Comic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllChapters, setShowAllChapters] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;

    request
      .get(`/truyen-tranh/${slug}`)
      .then((response) => {
        setComic(response.data.data.item);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải thông tin truyện.');
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <SkeletonComicDetail />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-error">{error}</p>
      </div>
    );
  }

  if (!comic) {
    return <p className="text-center text-gray-500">Không tìm thấy truyện.</p>;
  }

  const chapters: Chapter[] = [
    ...(comic?.chapters?.[0]?.server_data || []),
  ].sort((a, b) => Number(b.chapter_name) - Number(a.chapter_name));
  const visibleChapters = showAllChapters ? chapters : chapters.slice(0, 20);

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
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="badge badge-primary text-xs">{comic.status}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {comic.category?.map((cat) => (
              <span key={cat.id} className="badge badge-secondary text-xs">
                {cat.name}
              </span>
            ))}
          </div>
          <p
            className="mt-4 text-base-content text-sm line-clamp-5"
            dangerouslySetInnerHTML={{ __html: comic.content }}
          ></p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Chapters</h2>
        {visibleChapters.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
              {visibleChapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() =>
                    router.push(`/comic/${comic.slug}/${chapter.chapter_name}`)
                  }
                  className="btn btn-sm btn-outline btn-primary text-center"
                >
                  Chap {chapter.chapter_name}
                </button>
              ))}
            </div>
            {chapters.length > 20 && (
              <button
                onClick={() => setShowAllChapters(!showAllChapters)}
                className="mt-4 w-full text-primary font-bold hover:underline"
              >
                {showAllChapters
                  ? 'Thu gọn'
                  : `Xem thêm (${chapters.length - 20} chương)`}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500">Không có chương nào.</p>
        )}
      </div>
    </div>
  );
}
