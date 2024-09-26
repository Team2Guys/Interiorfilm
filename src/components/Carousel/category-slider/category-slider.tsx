'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import SkeletonLoading from 'components/Skeleton-loading/SkeletonLoading';
import { Autoplay, Navigation } from 'swiper/modules';
import CategoryCard from './card';
import { generateSlug } from 'data/Data';

const CategorySlider: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const updateSwiperNavigation = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [categories]);

  useEffect(() => {
    updateSwiperNavigation();
  }, [updateSwiperNavigation]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      <div className="flex flex-wrap items-center justify-center gap-5 md:flex-wrap mt-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-[20%] min-w-[250px] flex gap-2">
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
    ) : (
      <div className="px-0 md:px-4 flex items-center relative mt-10"  onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <button
        ref={prevRef}
        className="relative left-4 bg-white text-black h-8 w-8 shadow-lg p-2 flex justify-center items-center z-10 hover:scale-110 transition duration-300 ease-in-out"
      >
        <MdArrowBackIos size={20} />
      </button>
      <Swiper
        ref={swiperRef}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className="mySwiper custom"
      >
        {
          categories.map((category) => (
            <SwiperSlide key={category._id}>
              <CategoryCard
                name={category.name}
                posterImageUrl={category.posterImageUrl.imageUrl}
                categoryId={generateSlug(category.name)}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <button
        ref={nextRef}
        className="relative right-4  bg-white text-black h-8 w-8 shadow-lg p-2 flex justify-center items-center z-10 hover:scale-110 transition duration-300 ease-in-out"
      >
        <MdArrowForwardIos size={20} />
      </button>
    </div>
    )}

   

</>
  
  );
};

export default CategorySlider;
