'use client';
import { Chapter, ChapterNavigation } from '@/types/comic';
import { ArrowLeft, ArrowRight, Minimize, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ChapterSelector from './ChapterSelector';

export default function ComicChapterNavigation({
  slug,
  chapter,
  prevChapter,
  nextChapter,
  allChapters,
}: {
  slug: string;
  chapter: string;
  prevChapter: ChapterNavigation | null;
  nextChapter: ChapterNavigation | null;
  allChapters: Chapter[];
}) {
  const router = useRouter();
  const [isCompactView, setIsCompactView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Default to compact view on mobile
      if (mobile) {
        setIsCompactView(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToPrevChapter = () => {
    if (prevChapter) {
      router.push(`/comic/${slug}/${prevChapter.chapter_name}`);
    }
  };

  const goToNextChapter = () => {
    if (nextChapter) {
      router.push(`/comic/${slug}/${nextChapter.chapter_name}`);
    }
  };

  // Compact layout for mobile
  if (isCompactView) {
    return (
      <div className="mb-4 mt-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-center font-medium">Chương {chapter}</div>

          <div className="dropdown dropdown-end">
            <button
              onClick={() => setIsCompactView(false)}
              className="btn btn-sm btn-circle btn-ghost"
              aria-label="Expand view"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            disabled={!prevChapter}
            onClick={goToPrevChapter}
            className={`btn btn-sm ${
              prevChapter ? 'btn-primary' : 'btn-disabled'
            } w-full`}
          >
            <ArrowLeft size={16} /> Chương trước
          </button>

          <button
            disabled={!nextChapter}
            onClick={goToNextChapter}
            className={`btn btn-sm ${
              nextChapter ? 'btn-primary' : 'btn-disabled'
            } w-full`}
          >
            Chương tiếp <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Responsive layout for all devices
  return (
    <div className="mb-4 mt-6">
      {isMobile ? (
        // Mobile full view
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <div className="text-center font-medium">Chương {chapter}</div>
            <button
              onClick={() => setIsCompactView(true)}
              className="btn btn-sm btn-circle btn-ghost"
              aria-label="Compact view"
            >
              <Minimize size={18} />
            </button>
          </div>

          <ChapterSelector
            currentChapter={chapter}
            allChapters={allChapters}
            slug={slug}
          />

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              disabled={!prevChapter}
              onClick={goToPrevChapter}
              className={`btn btn-sm ${
                prevChapter ? 'btn-primary' : 'btn-disabled'
              } w-full`}
            >
              <ArrowLeft size={16} /> Chương trước
            </button>

            <button
              disabled={!nextChapter}
              onClick={goToNextChapter}
              className={`btn btn-sm ${
                nextChapter ? 'btn-primary' : 'btn-disabled'
              } w-full`}
            >
              Chương tiếp <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        // Desktop view
        <div className="flex justify-between items-center gap-4 p-3 rounded-lg">
          <button
            disabled={!prevChapter}
            onClick={goToPrevChapter}
            className={`btn ${prevChapter ? 'btn-primary' : 'btn-disabled'}`}
          >
            <ArrowLeft size={20} /> Chương trước
          </button>

          <ChapterSelector
            currentChapter={chapter}
            allChapters={allChapters}
            slug={slug}
          />

          <button
            disabled={!nextChapter}
            onClick={goToNextChapter}
            className={`btn ${nextChapter ? 'btn-primary' : 'btn-disabled'}`}
          >
            Chương tiếp theo <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
