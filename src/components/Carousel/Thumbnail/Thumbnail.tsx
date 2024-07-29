//@ts-nocheck
'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { IMAGE_INTERFACE } from 'types/interfaces';

interface ThumbProps {
  thumbs?: IMAGE_INTERFACE[];
}

const Thumbnail: React.FC<ThumbProps> = ({ thumbs }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('0% 0%');

  const handleMouseEnter = (imageUrl: any) => {
    setHoveredImage(imageUrl);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <div className='relative'>
 
        <Swiper
          style={{
            '--swiper-navigation-color': '#ffffff',
            '--swiper-pagination-color': '#ffffff',
          } as React.CSSProperties}
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {thumbs.map((array, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative cursor-zoom-in"
                onMouseEnter={() => handleMouseEnter(array.imageUrl)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image className='bg-contain w-full' src={array.imageUrl} width={500} height={500} alt='Image' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mt-2 bg-contain bg-white rounded-md"
        >
          {thumbs.map((array, index) => (
            <SwiperSlide key={index}>
              <Image
                className='bg-contain p-2 bg-white shadow-md w-full md:h-32'
                src={array.imageUrl}
                width={200}
                height={200}
                alt='Image'
              />
            </SwiperSlide>
          ))}
        </Swiper>
   
      <div className="  absolute -right-10 top-1 hidden md:block">
        {hoveredImage && (
          <div
            className="magnified-image absolute left-0  z-50"
            style={{
              backgroundImage: `url(${hoveredImage})`,
              backgroundPosition: backgroundPosition,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '200%',
              width: '600px',
              height: '600px',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
