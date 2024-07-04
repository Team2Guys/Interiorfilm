'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import Button from '../Button/Button';
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

const Slider: React.FC<SliderProps> = ({ slides }) => {
  return (
    <div className="w-full mx-auto">
      <Swiper
       
        navigation={true}
        loop={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative lg:h-[80vh] h-96 flex items-center justify-start">
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
                    View More
                  </Link>
                  {/* <Button title={"Order Now"} /> */}
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
