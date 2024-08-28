//@ts-nocheck
'use client';

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { IMAGE_INTERFACE } from 'types/interfaces';
import Collapse from 'components/ui/Collapse/Collapse';
import { collapseData } from 'data/Data';
import Accordion from 'components/widgets/Accordion';

interface ThumbProps {
  thumbs?: IMAGE_INTERFACE[];
}

const Thumbnail: React.FC<ThumbProps> = ({ thumbs }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('0% 0%');

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const handleMouseEnter = (imageUrl: string) => {
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
  const sortedThumbs = thumbs.slice().sort((a, b) => {
    const indexA = a.imageIndex ?? Number.MAX_SAFE_INTEGER;
    const indexB = b.imageIndex ?? Number.MAX_SAFE_INTEGER;
    return indexA - indexB;
  });

  return (
    <div className='space-y-20'>
      <div className='lg:relative w-full'>
        <div className='w-full flex flex-wrap lg:flex-nowrap flex-col-reverse lg:flex-row gap-5'>
          <div className='w-full lg:w-2/12 lg:max-h-[798px] overflow-y-scroll  custom-scrollbar '>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={false}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="bg-contain bg-white column-swipper"
            >
              {sortedThumbs.map((array, index) => (
                <SwiperSlide key={array.imageIndex ?? index} className='w-full h-full column-swiper-slider custom-scrollbar md:h-5'>
                  <Image
                    className='bg-contain pb-2 bg-white md:h-[222px] md:w-67 cursor-pointer'
                    src={array.imageUrl}
                    width={270}
                    height={120}
                    alt='Image'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='w-full lg:w-8/12 relative lg::max-h-[798px]'>
            <Swiper
              style={{
                '--swiper-navigation-color': '#ffffff',
                '--swiper-pagination-color': '#ffffff',
              } as React.CSSProperties}
              loop={true}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className='h-full'
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
            >
              {sortedThumbs.map((array, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative cursor-zoom-in h-full w-full"
                    onMouseEnter={() => handleMouseEnter(array.imageUrl)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Image className='bg-contain w-full h-full lg:max-h-[798px]' src={array.imageUrl} width={800} height={800} alt='Image' />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div ref={prevRef} className='swiper-prev absolute left-[-30px] md:left-[-25px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'>

              <Image src='/images/arrows.png' width={51} height={55} />

            </div>
            <div ref={nextRef} className='swiper-button absolute right-[-15px]  md:right-[-25px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'>
              <Image src='/images/arrows.png' width={51} height={55} className='rotate-180' />
            </div>
          </div>
        </div>

        <div className="  absolute right-20 top-1 hidden md:block">
          {hoveredImage && (
            <div
              className="magnified-image absolute left-0  z-50"
              style={{
                backgroundImage: `url(${hoveredImage})`,
                backgroundPosition: backgroundPosition,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '200%',
                width: '550px',
                height: '550px',
              }}
            />
          )}
        </div>
      </div>
      <div className="lg:max-w-[1020px] hidden lg:block">
        <Accordion />
      </div>

    </div>

  );
};

export default Thumbnail;
