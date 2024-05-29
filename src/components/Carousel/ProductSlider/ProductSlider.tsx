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
import Card from 'components/ui/Card/Card';

interface Relateddata{
  image: any;
  title: string;
  price: number;
  oldprice: number;
  star: number;
}


interface relatedprops{
    Related: Relateddata[];
}

const ProductSlider: React.FC<relatedprops> = ({Related}) => {
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
      <div className='text-end lg:mb-2'>
        <button ref={prevRef} className=' p-2 rounded-md bg-white hover:bg-primary shadow hover:scale-105 text-primary hover:text-white ml-2 mr-2'>
          <MdArrowBackIos size={15} />
        </button>
        <button ref={nextRef} className=' p-2 rounded-md bg-white hover:bg-primary shadow hover:scale-105 text-primary hover:text-white'>
          <MdArrowForwardIos size={15} />
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
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[ Navigation]}
        className="mySwiper"
      >
   
   {
    Related.map((array,index)=>(
<SwiperSlide key={index}>
            <Card ProductCard={
                [
                    { image: array.image, title: array.title, price: array.price, oldprice: array.oldprice, star: array.star },
                ]
            }/>
            </SwiperSlide>
    ))
   }
            
  

      </Swiper>
    </div>
  );
};

export default ProductSlider;
