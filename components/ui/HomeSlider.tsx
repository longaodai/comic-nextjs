'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ComicCard from './ComicCard';
import { Comic } from '@/types/comic';

import 'swiper/css';
import 'swiper/css/navigation';

interface HomeSliderProps {
  comics: Comic[];
}

export default function HomeSlider({ comics }: HomeSliderProps) {
  if (!comics || comics.length === 0) return null;

  return (
    <div className="container mx-auto my-6">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        slidesPerGroup={1}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        {comics.map((comic) => (
          <SwiperSlide key={comic._id}>
            <ComicCard comic={comic} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
