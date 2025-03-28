'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  pageRanges: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  pageRanges,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startPage = Math.max(1, currentPage - Math.floor(pageRanges / 2));
  const endPage = Math.min(totalPages, startPage + pageRanges - 1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center flex-wrap gap-2 mt-16">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="btn btn-sm btn-outline transition-transform hover:scale-105"
        >
          ‹ Previous
        </button>
      )}

      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="btn btn-sm btn-outline"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`btn btn-sm transition ${
              page === currentPage
                ? 'btn-primary scale-110 shadow-md'
                : 'btn-outline hover:scale-105'
            }`}
          >
            {page}
          </button>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-400">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="btn btn-sm btn-outline"
          >
            {totalPages}
          </button>
        </>
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="btn btn-sm btn-outline transition-transform hover:scale-105"
        >
          Next ›
        </button>
      )}
    </div>
  );
};

export default Pagination;
