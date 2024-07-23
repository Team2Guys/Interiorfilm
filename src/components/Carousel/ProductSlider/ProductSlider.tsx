"use client";
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Card from 'components/ui/Card/Card';
import SkeletonLoading from 'components/Skeleton-loading/SkeletonLoading';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
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

  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="custom-pag ' + className + '">' + (index + 1) + '</span>';
    },
  };

  if (loading) {
    const skeletonIcons = Array.from({ length: 4 });
    return (
      <div className="flex flex-wrap items-center justify-center gap-5 md:flex-wrap">
        {skeletonIcons.map((_, index) => (
          <div key={index} className="w-[20%] min-w-[250px]">
            <SkeletonLoading
              avatar={{ shape: 'square', size: 250 }}
              title={false}
              paragraph={{ rows: 3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              className="w-full"
              active={true}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative mt-2">
      <div className='float-end flex gap-2 mb-5'>
      <button
        ref={prevRef}
        className=" border-0 hover:border hover:border-primary hover:scale-110 transition duration-300 ease-in-out bg-primary hover:bg-transparent text-white h-8 w-8 hover:text-black p-2 rounded-full flex justify-center items-center z-10"
      >
        <MdArrowBackIos size={20} />
      </button>
      <button
        ref={nextRef}
        className=" border-0 hover:border hover:border-primary hover:scale-110 transition duration-300 ease-in-out bg-primary hover:bg-transparent text-white h-8 w-8 hover:text-black p-2 rounded-full flex justify-center items-center z-10"
      >
        <MdArrowForwardIos size={20} />
      </button>
      </div>
      <Swiper
        ref={swiperRef}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
        modules={[Autoplay, Pagination, Navigation]}
        pagination={pagination}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className="mySwiper custom"
      >
        {products && products.map((product, index) => (
          <SwiperSlide key={index} className="mb-10 custom">
            <Card ProductCard={[product]} slider={true} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default ProductSlider;
