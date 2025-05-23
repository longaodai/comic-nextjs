import { request } from '@/config/axios';
import { Search } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import ComicCard from '@/components/ui/ComicCard';
import { Comic } from '@/types/comic';
import { generateSearchSEO } from '@/utils/seoHelper';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

async function getSearchResults(query: string, page: number) {
  if (!query.trim()) return { comics: [], pagination: null };

  try {
    const response = await request.get(
      `/tim-kiem?keyword=${query}&page=${page}`
    );
    const data = response.data.data;
    return {
      comics: data.items || [],
      pagination: data.params.pagination || null,
    };
  } catch (error) {
    console.error('Error fetching search results:', error);
    return { comics: [], pagination: null };
  }
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q || '';
  return generateSearchSEO(query);
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, page } = await searchParams;
  const query = q || '';
  const currentPage = parseInt(page || '1', 10);
  const { comics, pagination } = await getSearchResults(query, currentPage);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-6 text-primary">
        Kết quả tìm kiếm
      </h1>

      <form
        action="/search"
        method="GET"
        className="flex items-center bg-base-200 rounded-full px-4 py-2 mb-6 max-w-lg mx-auto focus-within:ring-2 focus-within:ring-secondary shadow-sm hover:shadow-md"
      >
        <input
          type="text"
          name="q"
          placeholder="Nhập tên truyện..."
          defaultValue={query}
          className="bg-transparent outline-none px-3 py-2 w-full text-lg"
        />
        <button
          type="submit"
          className="ml-2 bg-secondary text-white p-2 rounded-full hover:bg-primary transition-all"
        >
          <Search className="text-white" size={20} />
        </button>
      </form>

      {comics.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {comics.map((comic: Comic) => (
            <ComicCard comic={comic} key={comic.slug} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Không tìm thấy truyện.
        </p>
      )}

      {pagination && pagination.totalItems > pagination.totalItemsPerPage && (
        <Pagination
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.totalItemsPerPage}
          pageRanges={pagination.pageRanges}
        />
      )}
    </div>
  );
}
