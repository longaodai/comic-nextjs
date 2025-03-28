export interface Comic {
  _id: string;
  slug: string;
  thumb_url: string;
  name: string;
  chaptersLatest: any[];
  updatedAt: string;
  status: string;
  category: { id: number; name: string }[];
}
