'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import SectionTitle from '@/components/ui/SectionTitle';
import SkeletonComicReader from '@/components/ui/skeletons/SkeletonComicReader';
import { request } from '@/config/axios';
import Image from 'next/image';
import { Chapter, Comic, ChapterNavigation, ImageDetail } from '@/types/comic';
import StickyNavigation from '@/components/ui/StickyNavigation';
import ComicChapterNavigation from '@/components/ui/ComicChapterNavigation';
import { SITE_URL } from '@/utils/constants';

export default function ComicReaderPage() {
  const params = useParams();
  const slug = params.slug as string;
  const chapter = params.chapter as string;

  const [comic, setComic] = useState<Comic>();
  const [chapterData, setChapterData] = useState<Chapter>();
  const [domainCdn, setDomainCdn] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevChapter, setPrevChapter] = useState<ChapterNavigation | null>(
    null
  );
  const [nextChapter, setNextChapter] = useState<ChapterNavigation | null>(
    null
  );
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);
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
          (a: Chapter, b: Chapter) =>
            Number(a.chapter_name) - Number(b.chapter_name)
        );

        setAllChapters(chapters);

        const currentIndex = chapters.findIndex(
          (ch: Chapter) => ch.chapter_name === chapter
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
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter]);

  useEffect(() => {
    if (comic) {
      document.title = `${comic.name} - Chapter ${chapter}`;
      const seoDescription = `Đọc ${comic?.name} - Chapter ${chapter} miễn phí, nhanh và chất lượng cao tại ${SITE_URL}`;
      const metaDescription = document.querySelector(
        "meta[name='description']"
      );
      if (metaDescription) {
        metaDescription.setAttribute('content', seoDescription);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = seoDescription;
        document.head.appendChild(meta);
      }
    }
  }, [comic, chapter]);

  if (loading) return <SkeletonComicReader />;

  return (
    <div className="container mx-auto px-4 py-6">
      <SectionTitle
        title={`${comic?.name} - Chapter ${chapterData?.chapter_name}`}
      />

      <ComicChapterNavigation
        slug={slug}
        chapter={chapter}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        allChapters={allChapters}
      />

      <div
        className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {chapterData?.chapter_image &&
          chapterData.chapter_image.map((img: ImageDetail) => (
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

      <ComicChapterNavigation
        slug={slug}
        chapter={chapter}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        allChapters={allChapters}
      />

      <StickyNavigation
        slug={slug}
        chapter={chapter}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        allChapters={allChapters}
      />
    </div>
  );
}
