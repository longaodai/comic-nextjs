'use client';

import { use, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/components/ui/Pagination';
import ComicCard from '@/components/ui/ComicCard';
import { request } from '@/config/axios';
import SectionTitle from '@/components/ui/SectionTitle';
import SkeletonComicCategory from '@/components/ui/skeletons/SkeletonComicCategory';

interface PaginationData {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

interface Comic {
  _id: string;
  slug: string;
  thumb_url: string;
  name: string;
  chaptersLatest: any[];
  updatedAt: string;
  status: string;
  category: { id: number; name: string }[];
}

// ✅ Unwrap `params` bằng `use()`
export default function ComicCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const searchParams = useSearchParams();
  const { slug } = use(params); // ✅ Dùng `use()` để lấy giá trị `slug`
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [comics, setComics] = useState<Comic[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    totalItems: 0,
    totalItemsPerPage: 24,
    currentPage: 1,
    pageRanges: 5,
  });

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    request
      .get(`/the-loai/${slug}?page=${currentPage}`)
      .then((response) => {
        const data = response.data.data;
        setTitle(data.titlePage);
        setComics(data.items || []);
        setPagination(data.params.pagination);
      })
      .catch(() => {
        setComics([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, currentPage]);

  if (loading) {
    return <SkeletonComicCategory />;
  }

  if (!comics.length) {
    return <p className="text-center text-gray-500">No comic found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <SectionTitle title={title || 'Comic Category'} />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        {comics.map((comic) => (
          <ComicCard comic={comic} key={comic._id} />
        ))}
      </div>

      <Pagination
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.totalItemsPerPage}
        pageRanges={pagination.pageRanges}
      />
    </div>
  );
}
