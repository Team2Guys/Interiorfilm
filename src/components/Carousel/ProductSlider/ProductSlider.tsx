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
             <div className="flex gap-6 px-4 lg:px-6 xl:px-10 mt-10 w-full max-md:overflow-x-scroll">
             {Array.from({ length: 4 }).map((_, index) => (
               <div key={index} className="animate-pulse max-sm:flex-shrink-0 flex flex-col gap-4 w-full md:w-[45%] lg:w-4/12 bg-gray rounded-lg overflow-hidden ">
                 <div className="bg-gray h-48 md:h-[250px] lg:h-[350px] w-full"></div>
               </div>
             ))}
           </div>
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
