'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Chapter {
  chapter_name: string;
}

interface ChapterListProps {
  comicSlug: string;
  initialChapters: Chapter[];
}

export default function ChapterList({
  comicSlug,
  initialChapters,
}: ChapterListProps) {
  const router = useRouter();
  const [showAllChapters, setShowAllChapters] = useState<boolean>(false);
  const [chapters] = useState(initialChapters); // ✅ Giữ nguyên dữ liệu SSR

  const visibleChapters = showAllChapters ? chapters : chapters.slice(0, 20);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Chapters</h2>
      {visibleChapters.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
            {visibleChapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() =>
                  router.push(`/comic/${comicSlug}/${chapter.chapter_name}`)
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
  );
}
