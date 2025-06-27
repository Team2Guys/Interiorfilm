"use client";
import React, { useEffect, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Card from 'components/ui/Card/Card';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import PRODUCTS_TYPES from 'types/interfaces';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import ProductSliderSkeleton from 'components/Skeleton-loading/ProductSliderSkeleton';

interface ProductSliderProps {
  products: PRODUCTS_TYPES[];
  loading?: boolean;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products,loading }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  const featuredProducts = products.slice(0, 10);

  const updateSwiperNavigation = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [featuredProducts]);

  useEffect(() => {
    updateSwiperNavigation();
  }, [updateSwiperNavigation]);

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <>
      {loading ? (
             <ProductSliderSkeleton />
      ) : (
        <div className="relative mt-10" >
         
          <Swiper
            ref={swiperRef}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            breakpoints={{
              320: {
                slidesPerView: 1.3,
                spaceBetween: 10,
              },
              370: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              800: {
                slidesPerView: 2.6,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            pagination={{
              dynamicBullets: true,
              clickable: true,
             
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className="mySwiper custom"
          >
            {featuredProducts && featuredProducts.map((product, index) => (
              <SwiperSlide key={index} className="my-5 custom" onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
                <Card ProductCard={[product]} slider={true} />
              </SwiperSlide>
            ))}
          </Swiper>

          
           <div className=' flex justify-center gap-54 absolute w-full bottom-5'>
            <button
              ref={prevRef}
              className="text-black h-8 w-8 shadow  flex justify-center items-center z-10 "
            >
              <RiArrowLeftSFill size={30} />
            </button>
            <button
              ref={nextRef}
              className="text-black h-8 w-8 shadow flex justify-center items-center z-10 "
            >
              <RiArrowRightSFill size={30} />
            </button>
          </div>
        </div>
      )}
    </>


  );
};

export default ProductSlider;
