'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SkeletonCategoryMenu from '../ui/skeletons/SkeletonCategoryMenu';
import { useComic } from '@/store/useComic';

export default function CategoryMenu() {
  const categoryRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const { categories, categoryLoading, getCategories } = useComic();

  const pathname = usePathname();
  const activeSlug = pathname.split('/').pop();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (activeSlug && categoryRefs.current[activeSlug]) {
      categoryRefs.current[activeSlug]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [categories, activeSlug]);

  if (categoryLoading) return <SkeletonCategoryMenu />;

  return (
    <div className="bg-base-100 shadow-lg">
      <div className="container mx-auto relative">
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-base-100 via-base-100/80 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-base-100 via-base-100/80 to-transparent pointer-events-none"></div>

          <div className="flex gap-3 px-4 py-4 lg:pt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-200 whitespace-nowrap scroll-smooth">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                ref={(el) => {
                  if (el) categoryRefs.current[category.slug] = el;
                }}
                className={`btn btn-sm transition-all duration-300 ${
                  activeSlug === category.slug
                    ? 'btn-primary shadow-md scale-105'
                    : 'btn-outline hover:scale-105'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
