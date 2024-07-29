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
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { PiUsersFour } from 'react-icons/pi';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Rate } from 'antd';

interface review{
  name: string;
  detail: string;
  star?: number;
  designation?:string;
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
        {/* <button ref={prevRef} className=' p-2 rounded-md bg-white hover:bg-primary shadow hover:scale-105 text-primary hover:text-white ml-2 mr-2'>
          <MdArrowBackIos size={25} />
        </button>
        <button ref={nextRef} className=' p-2 rounded-md bg-white hover:bg-primary shadow hover:scale-105 text-primary hover:text-white'>
          <MdArrowForwardIos size={25} />
        </button> */}
        <div className='text-center mb-10'>
          <h2 className='lg:text-5xl md:text-3xl font-medium text-xl lg:w-96 leading-10 mx-auto text-heading '>What Say Our Top Clients</h2>
        </div>
      </div>
      
      <Swiper
        ref={swiperRef}
        slidesPerView={1} // Default to 1 slide per view
        spaceBetween={20}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
          370: {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3.9,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false, 
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {
          Reviews.map((array,index)=>(
            <SwiperSlide key={index}>
            <div className='p-3 bg-white w-full group shadow-md mb-2 rounded-md h-72 '>
              <FaQuoteLeft className='text-light group-hover:text-primary transition duration-500' size={25} />
              <div className='flex gap-6 mt-5'>
                <div className='w-1/6'>
                  <div className='w-14 h-14 rounded-full bg-primary  flex justify-center items-center'>
                    <PiUsersFour className='text-white ' size={25} />
                  </div>
                </div>
                <div className='w-5/6 space-y-2'>
                <div>
                  <h1 className='font-semibold underline'>{array.name}</h1>
                  <h2 className='font-medium text-xs text-para'>{array.designation}</h2>
                </div>
                 <div className='block'>
                  <p className='text-start line-clamp-4'><span className='text-xl'></span> {array.detail} <span className='text-xl'></span>
                  </p>
                 </div>
                    <div className="flex gap-1 justify-start">
                      <Rate disabled defaultValue={array.star} className="text-sm gap-0"  />
                    </div>                  
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
