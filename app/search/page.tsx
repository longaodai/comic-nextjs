'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import ComicCard from '@/components/ui/ComicCard';
import SkeletonSearch from '@/components/ui/skeletons/SkeletonSearch';
import { Comic } from '@/types/comic';
import { request } from '@/config/axios';
import useDebounce from '@/hooks/useDebounce';

interface PaginationData {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationData>({
    totalItems: 0,
    totalItemsPerPage: 24,
    currentPage: 1,
    pageRanges: 3,
  });
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const debouncedSearchQueryValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (
      typeof debouncedSearchQueryValue === 'string' &&
      !debouncedSearchQueryValue.trim()
    )
      return;

    setLoading(true);
    request
      .get(`/tim-kiem?keyword=${debouncedSearchQueryValue}&page=${page}`)
      .then((response) => {
        const data = response.data.data;
        setComics(data.items || []);
        setPagination(data.params.pagination);
      })
      .catch(() => {
        setComics([]);
      })
      .finally(() => {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }, [debouncedSearchQueryValue, page]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`?q=${searchQuery}&page=1`);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-6 text-primary">
        Kết quả tìm kiếm
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex items-center bg-base-200 rounded-full px-4 py-2 mb-6 max-w-lg mx-auto focus-within:ring-2 focus-within:ring-secondary shadow-sm hover:shadow-md"
      >
        <input
          type="text"
          placeholder="Nhập tên truyện..."
          className="bg-transparent outline-none px-3 py-2 w-full text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 bg-secondary text-white p-2 rounded-full hover:bg-primary transition-all"
        >
          <Search className="text-white" size={20} />
        </button>
      </form>

      {loading ? (
        <SkeletonSearch />
      ) : comics.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {comics.map((comic) => (
            <ComicCard comic={comic} key={comic.slug} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Không tìm thấy truyện.
        </p>
      )}

      {!loading && pagination.totalItems > pagination.totalItemsPerPage && (
        <Pagination
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.totalItemsPerPage}
          pageRanges={pagination.pageRanges}
        />
      )}
    </div>
  );
}
