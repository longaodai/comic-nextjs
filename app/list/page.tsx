import ComicType from '@/components/ui/ComicType';
import { generateComicListSEO } from '@/utils/seoHelper';

export async function generateMetadata() {
  return generateComicListSEO();
}

export default async function ComicListPage() {
  return (
    <div className="container mx-auto p-4">
      <ComicType />
    </div>
  );
}
