import { COMIC_LIST_TYPE } from '@/utils/constants';
import Image from 'next/image';

const ComicType: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {COMIC_LIST_TYPE.map((type) => (
          <div key={type.title} className="relative group">
            <a
              href={type.url}
              className="block cursor-pointer rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-40">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h4 className="text-white text-lg font-bold">{type.title}</h4>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicType;
