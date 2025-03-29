'use client';

import { Chapter } from '@/types/comic';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function ChapterSelector({
  currentChapter,
  allChapters,
  slug,
  isDropdown = false,
}: {
  currentChapter: string;
  allChapters: Chapter[];
  slug: string;
  isDropdown?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChapters, setFilteredChapters] = useState(allChapters);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Filter chapters based on search query
    if (searchQuery) {
      setFilteredChapters(
        allChapters.filter(
          (ch) =>
            ch.chapter_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (ch.chapter_title &&
              ch.chapter_title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        )
      );
    } else {
      setFilteredChapters(allChapters);
    }
  }, [searchQuery, allChapters]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateToChapter = (chapterName: string) => {
    window.location.href = `/comic/${slug}/${chapterName}`;
  };

  // For dropdown in mobile compact view
  if (isDropdown) {
    return (
      <div className="w-full">
        <select
          value={currentChapter}
          onChange={(e) => navigateToChapter(e.target.value)}
          className="select select-bordered select-sm w-full"
        >
          {allChapters.map((ch) => (
            <option key={ch.chapter_name} value={ch.chapter_name}>
              Chương {ch.chapter_name}{' '}
              {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Custom dropdown for better mobile experience
  if (isMobile) {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-sm w-full flex justify-between items-center"
        >
          <span className="truncate">
            Chương {currentChapter}
            {allChapters.find((ch) => ch.chapter_name === currentChapter)
              ?.chapter_title
              ? ` - ${
                  allChapters.find((ch) => ch.chapter_name === currentChapter)
                    ?.chapter_title
                }`
              : ''}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-base-100 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="p-2 sticky top-0 bg-base-100">
              <input
                type="text"
                placeholder="Tìm chương..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered input-sm w-full"
              />
            </div>

            <div className="py-1">
              {filteredChapters.map((ch) => (
                <button
                  key={ch.chapter_name}
                  onClick={() => {
                    navigateToChapter(ch.chapter_name);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-base-200 ${
                    ch.chapter_name === currentChapter
                      ? 'bg-primary/10 text-primary font-medium'
                      : ''
                  }`}
                >
                  Chương {ch.chapter_name}{' '}
                  {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Regular select for desktop
  return (
    <select
      value={currentChapter}
      onChange={(e) => navigateToChapter(e.target.value)}
      className="select select-bordered select-md w-full max-w-xs"
    >
      {allChapters.map((ch) => (
        <option key={ch.chapter_name} value={ch.chapter_name}>
          Chương {ch.chapter_name}{' '}
          {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
        </option>
      ))}
    </select>
  );
}
