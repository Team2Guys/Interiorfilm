//@ts-nocheck
'use client';

import React, {useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

interface thumb{
    image?: any;
}

interface thumbprops{
    thumbs : thumb[];
}

const Thumbnail: React.FC<thumbprops> = ({thumbs}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#ffffff',
          '--swiper-pagination-color': '#ffffff',
        } as React.CSSProperties}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2">
        {
            thumbs.map((array,index)=>(
            <SwiperSlide key={index} >
                <Image className='bg-contain w-full' src={array.image} width={500} height={500} alt='Image'/>
              </SwiperSlide>
            ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-2 bg-contain bg-white  rounded-md"
      >
           {
            thumbs.map((array,index)=>(
                <SwiperSlide key={index}>
                <Image className='bg-contain p-2 bg-white shadow-md w-full md:h-32' src={array.image} width={150} height={150} alt='Image'/>
              </SwiperSlide>
            ))
        }    
      </Swiper>
    </>
  );
};

export default Thumbnail;
