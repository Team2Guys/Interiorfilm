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

interface ThumbProps {
  thumbs: IMAGE_INTERFACE[];
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

  return (
    <div className='relative'>

      <div className='w-full flex gap-5'>

        <div className='w-1/3'>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mt-2 bg-contain bg-white rounded-md column-swipper"
          >
            <div>
              {thumbs.map((array, index) => (
                <SwiperSlide key={index} className='w-full column-swiper-slider'>
                  <Image
                    className='bg-contain p-2 bg-white shadow-md w-full md:h-50'
                    src={array.imageUrl}
                    width={300}
                    height={300}
                    alt='Image'
                  />
                </SwiperSlide>
              ))}
            </div>


          </Swiper>


        </div>



        {/* <div className='w-[65%]'>

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
          >
            {thumbs.map((array, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative cursor-zoom-in h-full w-full"
                  onMouseEnter={() => handleMouseEnter(array.imageUrl)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image className='bg-contain w-full h-full' src={array.imageUrl} width={400} height={400} alt='Image' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>


        </div> */}


<div className='w-[65%] relative'>
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
        {thumbs.map((array, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative cursor-zoom-in h-full w-full"
              onMouseEnter={() => handleMouseEnter(array.imageUrl)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Image className='bg-contain w-full h-full' src={array.imageUrl} width={400} height={400} alt='Image' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      <div ref={prevRef} className='swiper-prev absolute left-[-25px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'>
        
        <Image src='/images/arrows.png' width={51} height={55}/>
       
      </div>


      <div ref={nextRef} className='swiper-button absolute right-[-25px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'>
      <Image src='/images/arrows.png' width={51} height={55} className='rotate-180'/>
      </div>
    </div>




      </div>

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
