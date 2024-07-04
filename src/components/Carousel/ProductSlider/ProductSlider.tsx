"use client";
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Card from 'components/ui/Card/Card';
import Loader from 'components/Loader/Loader';
import PRODUCTS_TYPES from 'types/interfaces';

interface PRODUCT_SLIDER_PROPS {
  products: PRODUCTS_TYPES[];
  loading: boolean;
}

const ProductSlider: React.FC<PRODUCT_SLIDER_PROPS> = ({ products, loading }) => {
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
  }, [products]);

  return (
    loading ? <div className='flex justify-center items-center h-[20vh]'><Loader /></div> :
      <div className="flex items-center justify-center w-full">
        <div className='w-1/12'>
          <button ref={prevRef} className='p-2 rounded-md bg-white hover:bg-primary shadow hover:scale-105 text-primary hover:text-white ml-2 mr-2'>
            <MdArrowBackIos size={15} />
          </button>
        </div>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
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
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          {products && products.map((product, index) => (
            <SwiperSlide key={index}>
              <Card ProductCard={[product]} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='w-1/12'>
          <button ref={nextRef} className='p-2 rounded-md bg-white hover:bg-primary shadow hover:scale-105 text-primary hover:text-white ml-2 mr-2'>
            <MdArrowForwardIos size={15} />
          </button>
        </div>
      </div>
  );
};

export default ProductSlider;
