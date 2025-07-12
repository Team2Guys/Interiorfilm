'use client';

import React, { useRef } from 'react';
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
  categoryName?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, loading,categoryName }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  const featuredProducts = products.slice(0, 10);

  const handleMouseEnter = () => {
    swiperRef.current?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay?.start();
  };

  const assignNavigation = (swiper: any) => {
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  };

  return (
    <>
      {loading ? (
        <ProductSliderSkeleton />
      ) : (
        <div className="relative my-10">
          <div className="flex justify-center gap-54 absolute w-full bottom-0">
            <button
              ref={prevRef}
              className="text-black h-8 w-8 shadow flex justify-center items-center cursor-pointer bg-white z-10"
            >
              <RiArrowLeftSFill size={30} />
            </button>
            <button
              ref={nextRef}
              className="text-black h-8 w-8 shadow flex justify-center items-center cursor-pointer bg-white z-10"
            >
              <RiArrowRightSFill size={30} />
            </button>
          </div>

          {/* Swiper */}
          <Swiper
            ref={swiperRef}
            onBeforeInit={assignNavigation}
            modules={[Autoplay, Pagination, Navigation]}
            navigation={true}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1.3, spaceBetween: 10 },
              370: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              800: { slidesPerView: 2.6, spaceBetween: 10 },
              1024: { slidesPerView: 3.2, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="mySwiper custom !pb-5"
          >
            {featuredProducts.map((product, index) => (
              <SwiperSlide 
              className='!flex !flex-col !justify-between'
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Card categoryName={product?.category?.name ?? categoryName} ProductCard={[product]} slider={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ProductSlider;
