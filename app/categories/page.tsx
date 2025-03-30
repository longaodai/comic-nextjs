import { generateCategorySEO } from '@/utils/seoHelper';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';
import { fetchCategories } from '@/services/category';

export async function generateMetadata() {
  const categories = await fetchCategories();
  return generateCategorySEO(categories);
}

export default async function CategoryPage() {
  const categories = await fetchCategories();

  return (
    <div className="container mx-auto p-4">
      {categories.length > 0 ? (
        <>
          <SectionTitle title="Danh Mục Thể Loại" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="bg-base-100 shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 flex flex-col items-center text-center border border-primary group-hover:border-secondary">
                  <h2 className="text-lg font-bold text-primary group-hover:text-secondary">
                    {category.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Không có danh mục nào!
        </div>
      )}
    </div>
  );
}
