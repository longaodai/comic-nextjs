'use client';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ViewMoreButtonProps = {
  url: string;
};

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({ url }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className="bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary flex items-center gap-3 rounded-full px-6 py-3 text-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        View More <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default ViewMoreButton;
