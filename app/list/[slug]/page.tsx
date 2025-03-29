import { Metadata } from 'next';
import { request } from '@/config/axios';
import Pagination from '@/components/ui/Pagination';
import ComicCard from '@/components/ui/ComicCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { Comic } from '@/types/comic';
import ComicType from '@/components/ui/ComicType';

interface PaginationData {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await request.get(`/danh-sach/${slug}?page=1`);
  const data = response.data.data;
  return {
    title: data.titlePage || 'Comic List Type',
    description: `Explore the best comics in the ${data.titlePage} list type.`,
  };
}

export default async function ComicCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  let comics: Comic[] = [];
  let title = '';
  let pagination: PaginationData = {
    totalItems: 0,
    totalItemsPerPage: 24,
    currentPage: 1,
    pageRanges: 5,
  };

  try {
    const { slug } = await params;
    const response = await request.get(
      `/danh-sach/${slug}?page=${currentPage}`
    );
    const data = response.data.data;
    title = data.titlePage;
    comics = data.items || [];
    pagination = data?.params?.pagination;
  } catch (error) {
    console.error('Failed to fetch comics:', error);
  }

  if (!comics.length) {
    return (
      <p className="container mx-auto p-10 text-center text-gray-500">
        No comic found.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ComicType />

      <SectionTitle title={title || 'Comic Category'} />

      {comics.length && (
        <>
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
        </>
      )}
    </div>
  );
}
