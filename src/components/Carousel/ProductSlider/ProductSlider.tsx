"use client";
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Card from 'components/ui/Card/Card';
import Loader from 'components/Loader/Loader';
import PRODUCTS_TYPES from 'types/interfaces';
import SkeletonLoading from 'components/Skeleton-loading/SkeletonLoading';

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

  
  const pagination = {
    clickable: true,
    renderBullet: function (index:any, className:any) {
      return '<span class=" custom-pag ' + className + '">' + (index + 1) + '</span>';
    },
  };



  if (loading) {
    const skeletonIcons = Array.from({ length: 4 });
    return (
      <div className="flex flex-wrap items-center justify-center gap-5  md:flex-wrap">
        {skeletonIcons.map((_, index) => (
      
            <div key={index} className='w-[20%] min-w-[250px] '>
              <SkeletonLoading 
                avatar={{ shape: 'square', size: 250 }} 
                title={false} 
                paragraph={{ rows: 3}}  
                style={{ display: 'flex', flexDirection: 'column', gap: '10px', }} 
                className='w-full'
                active	={true}
              />
            </div>
        ))}
      </div>
    );
  }


  return (
    <>

        <Swiper
          ref={swiperRef}
     
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1.3,
              spaceBetween: 20,
            },
            370: {
              slidesPerView: 1.8,
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
          
          modules={[Navigation, Pagination]}
          pagination={pagination}
          className="mySwiper custom"
         
        >
          {products && products.map((product, index) => (
            <SwiperSlide key={index} className='mb-10 custom'>
              <Card ProductCard={[product]} slider={true} />

            </SwiperSlide>
          ))}
        </Swiper>
  
      </>
  );
};

export default ProductSlider;
