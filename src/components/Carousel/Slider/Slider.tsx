//@ts-nocheck
"use client";
import React, { useRef, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { PiUsersFour } from 'react-icons/pi';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

interface review{
  name: string;
  detail: string;

}


interface Reviewprops{
  Reviews: review[];
}

const Slider: React.FC<Reviewprops> = ({Reviews}) => {
  // Refs for custom navigation buttons
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <div className="relative">
      <div className='text-end mb-5'>
        <button ref={prevRef} className=' p-2 rounded-md bg-white hover:bg-primary shadow hover:scale-105 text-primary hover:text-white ml-2 mr-2'>
          <MdArrowBackIos size={25} />
        </button>
        <button ref={nextRef} className=' p-2 rounded-md bg-white hover:bg-primary shadow hover:scale-105 text-primary hover:text-white'>
          <MdArrowForwardIos size={25} />
        </button>
      </div>
      
      <Swiper
        ref={swiperRef}
        slidesPerView={1} // Default to 1 slide per view
        spaceBetween={20}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[ Navigation]}
        className="mySwiper"
      >
        {
          Reviews.map((array,index)=>(
            <SwiperSlide key={index}>
            <div className='p-3 bg-white w-full group shadow-md mb-2 rounded-md'>
              <FaQuoteLeft className='text-light group-hover:text-primary' size={25} />
              <div className='flex gap-6 mt-5'>
                <div className='w-1/6'>
                  <div className='w-14 h-14 rounded-full bg-primary  flex justify-center items-center'>
                    <PiUsersFour className='text-white ' size={25} />
                  </div>
                </div>
                <div className='w-5/6 space-y-2'>
                  <h1 className='font-semibold underline'>{array.name}</h1>
                  <FaQuoteLeft className='text-light group-hover:text-primary' size={18} />
                  <p className='text-start'>{array.detail} <FaQuoteRight className=' text-light group-hover:text-primary' size={18} /></p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          ))
        }
      

      </Swiper>
    </div>
  );
};

export default Slider;