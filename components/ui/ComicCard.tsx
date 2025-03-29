import Link from 'next/link';
import { getLatestChapter, timeAgo } from '../../utils/utils';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
}

interface Comic {
  slug: string;
  thumb_url: string;
  name: string;
  chaptersLatest: any[];
  updatedAt: string;
  status: string;
  category: Category[];
}

interface ComicCardProps {
  comic: Comic;
}

export default function ComicCard({ comic }: ComicCardProps) {
  return (
    <Link href={`/comic/${comic.slug}`} className="block group">
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm shadow-lg bg-base-100 transition-transform duration-300 hover:scale-105">
        <Image
          src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
          alt={comic.name}
          width={800}
          height={1200}
          unoptimized
          className="w-full h-full object-cover rounded-sm group-hover:opacity-80"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Thông tin Truyện */}
        <div className="absolute bottom-2 left-2 right-2 text-white">
          <h3 className="text-lg font-bold line-clamp-2">{comic.name}</h3>
          <div className="flex justify-between text-sm opacity-80">
            <span className="text-secondary font-semibold">
              Chap {getLatestChapter(comic.chaptersLatest)}
            </span>
            <span>{timeAgo(comic.updatedAt)}</span>
          </div>
        </div>

        {/* Thể loại & trạng thái */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <span className="badge badge-primary text-xs">{comic.status}</span>
          {comic.category.slice(0, 2).map((cat) => (
            <span key={cat.id} className="badge badge-secondary text-xs">
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
