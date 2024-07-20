//@ts-nocheck
'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface SliderProps {
  slides: Slide[];
}
const pagination = {
  clickable: true,
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  },
};

const Slider: React.FC<SliderProps> = ({ slides }) => {
  return (
    <div className="w-full mx-auto">
      <Swiper
        loop={true}
        pagination={pagination}
        modules={[Pagination]}                                                       
        className="mySwiper "
      >
        {slides.map((slide, index) => (
          <SwiperSlide className='' key={index}>
            <div className="relative lg:h-[60vh] h-96 flex items-center justify-start z-10">
              <Image
                src={slide.image}
                alt="Interior Film"
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
              <div className='absolute left-6 md:left-40 lg:left-80 top-1/2 transform -translate-y-1/2'>
                <div>
                  <p className='text-xl md:text-3xl lg:text-4xl'>{slide.title}</p>
                  <h2 className='text-2xl md:text-4xl lg:text-7xl py-2 text-primary'>{slide.subtitle}</h2>
                  <p className='text-base md:w-2/3 lg:w-3/5 w-3/4'>{slide.description}</p>
                </div>
                <div className="flex items-center justify-start mt-6">
                  <Link href={"/product"} className="border border-primary py-2 px-4 md:px-8 rounded-md hover:bg-primary hover:text-white transition-all ">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
