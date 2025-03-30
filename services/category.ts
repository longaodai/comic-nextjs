import { unstable_cache } from 'next/cache';
import { request } from '@/config/axios';
import { Category } from '@/types/comic';

async function fetchCategoriesData(): Promise<Category[]> {
  try {
    const response = await request.get<{ data: { items: Category[] } }>(
      '/the-loai'
    );
    return response.data.data.items || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export const fetchCategories = unstable_cache(
  fetchCategoriesData,
  ['categories'],
  {
    revalidate: 3600,
  }
);
