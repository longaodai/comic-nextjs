'use client';

import { useEffect, useState } from 'react';
import SkeletonHomePage from '../components/ui/skeletons/SkeletonHomePage';
import { Comic } from '@/types/comic';
import ComicSection from '@/components/ui/ComicSection';
import { request } from '@/config/axios';
import HomeSlider from '@/components/ui/HomeSlider';

export default function HomePage() {
  const [latestComics, setLatestComics] = useState<Comic[]>([]);
  const [upcomingComics, setUpcomingComics] = useState<Comic[]>([]);
  const [ongoingComics, setOngoingComics] = useState<Comic[]>([]);
  const [completedComics, setCompletedComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latest, upcoming, ongoing, completed] = await Promise.all([
          request.get<{ data: { items: Comic[] } }>(`/danh-sach/truyen-moi`),
          request.get<{ data: { items: Comic[] } }>(`/danh-sach/sap-ra-mat`),
          request.get<{ data: { items: Comic[] } }>(
            `/danh-sach/dang-phat-hanh`
          ),
          request.get<{ data: { items: Comic[] } }>(`/danh-sach/hoan-thanh`),
        ]);

        setLatestComics(latest.data.data.items || []);
        setUpcomingComics(upcoming.data.data.items || []);
        setOngoingComics(ongoing.data.data.items || []);
        setCompletedComics(completed.data.data.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <SkeletonHomePage />;
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 space-y-8 sm:space-y-10 pt-0">
      <HomeSlider comics={latestComics} />

      {latestComics.length > 0 && (
        <ComicSection
          title="Latest Comics"
          comics={latestComics}
          color="#ff416c"
        />
      )}
      {upcomingComics.length > 0 && (
        <ComicSection
          title="Upcoming Comics"
          comics={upcomingComics}
          color="#56ccf2"
        />
      )}
      {ongoingComics.length > 0 && (
        <ComicSection
          title="Ongoing Comics"
          comics={ongoingComics}
          color="#f2994a"
        />
      )}
      {completedComics.length > 0 && (
        <ComicSection
          title="Completed Comics"
          comics={completedComics}
          color="#00b09b"
        />
      )}
    </div>
  );
}
