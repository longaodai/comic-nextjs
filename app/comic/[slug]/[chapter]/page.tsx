'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import SectionTitle from '@/components/ui/SectionTitle';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SkeletonComicReader from '@/components/ui/skeletons/SkeletonComicReader';
import { request } from '@/config/axios';
import Image from 'next/image';

export default function ComicReaderPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const chapter = params.chapter as string;

  const [comic, setComic] = useState<any>(null);
  const [chapterData, setChapterData] = useState<any>(null);
  const [domainCdn, setDomainCdn] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prevChapter, setPrevChapter] = useState<any>(null);
  const [nextChapter, setNextChapter] = useState<any>(null);
  const [allChapters, setAllChapters] = useState<any[]>([]);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    setLoading(true);

    request
      .get(`/truyen-tranh/${slug}`)
      .then((response) => {
        const comicData = response.data.data.item;
        setComic(comicData);

        const chapters = comicData.chapters[0].server_data.sort(
          (a: any, b: any) => Number(a.chapter_name) - Number(b.chapter_name)
        );

        setAllChapters(chapters);

        const currentIndex = chapters.findIndex(
          (ch: any) => ch.chapter_name === chapter
        );

        if (currentIndex !== -1) {
          setPrevChapter(chapters[currentIndex - 1] || null);
          setNextChapter(chapters[currentIndex + 1] || null);

          return axios.get(chapters[currentIndex].chapter_api_data);
        } else {
          throw new Error('Chapter not found');
        }
      })
      .then((chapterResponse) => {
        setDomainCdn(chapterResponse.data.data.domain_cdn);
        setChapterData(chapterResponse.data.data.item);
        setLoading(false);
        setFadeIn(true);

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
      })
      .catch(() => {
        setError('Failed to fetch comic details.');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 500) setShowStickyNav(false);
      if (currentScrollY < lastScrollY - 50) setShowStickyNav(true);
      else if (currentScrollY > lastScrollY + 50) setShowStickyNav(false);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <SkeletonComicReader />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <SectionTitle
        title={`${comic?.name} - Chapter ${chapterData?.chapter_name}`}
      />

      <div className="flex justify-between items-center mb-4 gap-4">
        <button
          disabled={!prevChapter}
          onClick={() =>
            router.push(`/comic/${slug}/${prevChapter?.chapter_name}`)
          }
          className={`btn ${prevChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          <ArrowLeft size={20} /> Chương trước
        </button>

        <select
          value={chapter}
          onChange={(e) => router.push(`/comic/${slug}/${e.target.value}`)}
          className="select select-bordered select-lg w-full max-w-xs"
        >
          {allChapters.map((ch) => (
            <option key={ch.chapter_name} value={ch.chapter_name}>
              Chương {ch.chapter_name}{' '}
              {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
            </option>
          ))}
        </select>

        <button
          disabled={!nextChapter}
          onClick={() =>
            router.push(`/comic/${slug}/${nextChapter?.chapter_name}`)
          }
          className={`btn ${nextChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          Chương tiếp theo <ArrowRight size={20} />
        </button>
      </div>

      <div
        className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {chapterData?.chapter_image.map((img: any) => (
          <Image
            key={img.image_page}
            src={`${domainCdn}/${chapterData.chapter_path}/${img.image_file}`}
            alt={`Page ${img.image_page}`}
            width={800}
            height={1200}
            unoptimized
            className="w-full max-w-3xl rounded-lg shadow-md"
          />
        ))}
      </div>

      <div className="flex justify-between items-center mb-4 gap-4 mt-18">
        <button
          disabled={!prevChapter}
          onClick={() =>
            router.push(`/comic/${slug}/${prevChapter?.chapter_name}`)
          }
          className={`btn ${prevChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          <ArrowLeft size={20} /> Chương trước
        </button>

        <select
          value={chapter}
          onChange={(e) => router.push(`/comic/${slug}/${e.target.value}`)}
          className="select select-bordered select-lg w-full max-w-xs"
        >
          {allChapters.map((ch) => (
            <option key={ch.chapter_name} value={ch.chapter_name}>
              Chương {ch.chapter_name}{' '}
              {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
            </option>
          ))}
        </select>

        <button
          disabled={!nextChapter}
          onClick={() =>
            router.push(`/comic/${slug}/${nextChapter?.chapter_name}`)
          }
          className={`btn ${nextChapter ? 'btn-primary' : 'btn-disabled'}`}
        >
          Chương tiếp theo <ArrowRight size={20} />
        </button>
      </div>

      {/* Sticky Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-base-200 p-4 z-50 transition-transform duration-300 shadow-lg ${
          showStickyNav ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center gap-4">
          <button
            disabled={!prevChapter}
            onClick={() =>
              router.push(`/comic/${slug}/${prevChapter?.chapter_name}`)
            }
            className={`btn ${prevChapter ? 'btn-primary' : 'btn-disabled'}`}
          >
            <ArrowLeft size={20} /> Chương trước
          </button>

          <select
            value={chapter}
            onChange={(e) => router.push(`/comic/${slug}/${e.target.value}`)}
            className="select select-bordered select-lg w-full max-w-xs"
          >
            {allChapters.map((ch) => (
              <option key={ch.chapter_name} value={ch.chapter_name}>
                Chương {ch.chapter_name}{' '}
                {ch.chapter_title ? `- ${ch.chapter_title}` : ''}
              </option>
            ))}
          </select>

          <button
            disabled={!nextChapter}
            onClick={() =>
              router.push(`/comic/${slug}/${nextChapter?.chapter_name}`)
            }
            className={`btn ${nextChapter ? 'btn-primary' : 'btn-disabled'}`}
          >
            Chương tiếp theo <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
