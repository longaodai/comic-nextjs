import { create } from 'zustand';
import { request } from '@/config/axios';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ComicStore {
  categories: Category[];
  categoryLoading: boolean;
  getCategories: () => Promise<void>;
}

export const useComic = create<ComicStore>((set) => ({
  categories: [],
  categoryLoading: false,

  getCategories: async () => {
    set({ categoryLoading: true });
    try {
      const res = await request.get<{ data: { items: Category[] } }>(
        '/the-loai'
      );
      set({ categories: res.data.data.items || [] });
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      set({ categoryLoading: false });
    }
  },
}));
