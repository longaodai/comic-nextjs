import { Comic } from '@/types/comic';
import ComicCard from './ComicCard';
import SectionTitle from './SectionTitle';

interface ComicSectionProps {
  title: string;
  comics: Comic[];
  color: string;
}

export const ComicSection: React.FC<ComicSectionProps> = ({
  title,
  comics,
  color,
}) => (
  <div className="rounded-xl shadow-xl mt-16">
    <SectionTitle title={title} color={color} />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
      {comics.map((comic) => (
        <ComicCard comic={comic} key={comic.slug} />
      ))}
    </div>
  </div>
);

export default ComicSection;
