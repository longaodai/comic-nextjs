import { unstable_cache } from 'next/cache';
import { request } from '@/config/axios';
import ComicSection from '@/components/ui/ComicSection';
import HomeSlider from '@/components/ui/HomeSlider';
import { ComicsResponse, SEOData } from '@/types/comic';
import { generateSEOData } from '@/utils/seoHelper';
import ViewMoreButton from '@/components/ui/ViewMore';

const fetchComicsData = unstable_cache(
  async () => {
    try {
      const [latest, upcoming, ongoing, completed] = await Promise.all([
        request.get<ComicsResponse>('/danh-sach/truyen-moi'),
        request.get<ComicsResponse>('/danh-sach/sap-ra-mat'),
        request.get<ComicsResponse>('/danh-sach/dang-phat-hanh'),
        request.get<ComicsResponse>('/danh-sach/hoan-thanh'),
      ]);

      return {
        latestComics: latest.data.data.items || [],
        upcomingComics: upcoming.data.data.items || [],
        ongoingComics: ongoing.data.data.items || [],
        completedComics: completed.data.data.items || [],
        seo: latest.data.data.seoOnPage || ({} as SEOData),
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        latestComics: [],
        upcomingComics: [],
        ongoingComics: [],
        completedComics: [],
        seo: {} as SEOData,
      };
    }
  },
  ['comicsData'],
  { revalidate: 3600 }
);

export async function generateMetadata() {
  const { seo } = await fetchComicsData();
  return generateSEOData(seo);
}

export default async function HomePage() {
  const { latestComics, upcomingComics, ongoingComics, completedComics } =
    await fetchComicsData();

  return (
    <div className="container mx-auto p-2 sm:p-4 space-y-8 sm:space-y-10 pt-10 md:pt-12">
      <h1 className="text-3xl font-bold text-center">
        Đọc truyện tranh online miễn phí, cập nhật nhanh nhất
      </h1>
      <HomeSlider />

      {latestComics.length > 0 && (
        <>
          <ComicSection
            title="Truyện mới"
            comics={latestComics}
            color="#ff416c"
          />
          <ViewMoreButton url={'list/truyen-moi'} />
        </>
      )}
      {upcomingComics.length > 0 && (
        <>
          <ComicSection
            title="Truyện Hot"
            comics={upcomingComics}
            color="#56ccf2"
          />
          <ViewMoreButton url={'list/sap-ra-mat'} />
        </>
      )}
      {ongoingComics.length > 0 && (
        <>
          <ComicSection
            title="Đang phát hành"
            comics={ongoingComics}
            color="#f2994a"
          />
          <ViewMoreButton url={'list/dang-phat-hanh'} />
        </>
      )}
      {completedComics.length > 0 && (
        <>
          <ComicSection
            title="Truyện hoàn thành"
            comics={completedComics}
            color="#00b09b"
          />
          <ViewMoreButton url={'list/hoan-thanh'} />
        </>
      )}
    </div>
  );
}
