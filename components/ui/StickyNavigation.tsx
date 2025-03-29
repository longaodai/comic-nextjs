'use client';
import { Chapter, ChapterNavigation } from '@/types/comic';
import { ArrowLeft, ArrowRight, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function StickyNavigation({
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
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 500) setShowStickyNav(false);
      if (currentScrollY < lastScrollY - 50) setShowStickyNav(true);
      else if (currentScrollY > lastScrollY + 50) {
        setShowStickyNav(false);
        setExpanded(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push(`/comic/${slug}/${value}`);
  };

  if (!showStickyNav) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Compact view for mobile (always shown) */}
      <div className="flex justify-between items-center bg-base-200 shadow-lg px-4 py-3">
        <button
          disabled={!prevChapter}
          onClick={goToPrevChapter}
          className={`btn btn-sm ${
            prevChapter ? 'btn-primary' : 'btn-disabled'
          }`}
        >
          <ArrowLeft size={16} />
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-sm btn-ghost"
        >
          <span className="hidden md:inline mr-2">Chương {chapter}</span>
          <span className="md:hidden">Chương {chapter}</span>
          <ChevronUp
            size={16}
            className={`transition-transform ${expanded ? '' : 'rotate-180'}`}
          />
        </button>

        <button
          disabled={!nextChapter}
          onClick={goToNextChapter}
          className={`btn btn-sm ${
            nextChapter ? 'btn-primary' : 'btn-disabled'
          }`}
        >
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Expanded view with chapter list */}
      <div
        className={`bg-base-200 shadow-lg transition-all duration-300 ${
          expanded ? 'max-h-40' : 'max-h-0'
        } overflow-hidden`}
      >
        <div className="p-3">
          <select
            value={chapter}
            onChange={handleChapterChange}
            className="select select-bordered select-sm w-full"
          >
            {allChapters.map((ch) => (
              <option key={ch.chapter_name} value={ch.chapter_name}>
                Chương {ch.chapter_name}{' '}
                {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              disabled={!prevChapter}
              onClick={goToPrevChapter}
              className={`btn btn-sm ${
                prevChapter ? 'btn-outline btn-primary' : 'btn-disabled'
              }`}
            >
              <ArrowLeft size={16} /> Chương trước
            </button>

            <button
              disabled={!nextChapter}
              onClick={goToNextChapter}
              className={`btn btn-sm ${
                nextChapter ? 'btn-outline btn-primary' : 'btn-disabled'
              }`}
            >
              Chương tiếp <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
