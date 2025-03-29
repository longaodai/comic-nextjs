'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import 'swiper/css';
import 'swiper/css/navigation';
import { COMIC_LIST_TYPE } from '@/utils/constants';

export default function HomeBanner() {
  const router = useRouter();

  return (
    <div className="container mx-auto my-6">
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="rounded-lg shadow-xl"
      >
        {COMIC_LIST_TYPE.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-48 md:h-80 lg:h-96 cursor-pointer group overflow-hidden"
              onClick={() => router.push(banner.url)}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="100vw"
                className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/70 p-6 rounded-lg shadow-xl">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    {banner.title}
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
