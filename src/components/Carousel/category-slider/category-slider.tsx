'use client';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
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
  const [error, setError] = useState<string | null>(null);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError('Failed to fetch categories.');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    if (swiperRef.current?.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [categories]);
  const handleMouseEnter = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
    {
      loading ? 
      <div className="flex gap-6 px-4 lg:px-6 xl:px-10 mt-10 w-full max-md:overflow-x-scroll">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse max-sm:flex-shrink-0 flex flex-col gap-4 w-full md:w-[45%] lg:w-4/12 bg-[gray] rounded-lg overflow-hidden shadow-md">
          <div className="bg-[gray] h-48 md:h-[300px] xl:h-[460px] w-full"></div>
          <div className="flex flex-col gap-2 px-4 pb-4">
            <div className="bg-[gray] h-6 w-3/4 rounded-md"></div>
            <div className="bg-[gray] h-6 w-1/2 rounded-md"></div>
            <div className="bg-[gray] h-10 w-1/3 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
      :
      <div
      className="px-0 md:px-4 flex items-center relative mt-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
          904: {
            slidesPerView: 2.2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper custom"
      >
        {categories.map((category: any) => (
          <SwiperSlide key={category._id}>
            <CategoryCard
              name={category.name}
              posterImageUrl={category.posterImageUrl.imageUrl}
              categoryId={generateSlug(category.name)}
              nameClass={category.name === 'Accessories' ? 'text-black' : 'text-white'}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={nextRef}
        className="relative right-4 bg-white text-black h-8 w-8 shadow-lg p-2 flex justify-center items-center z-10 hover:scale-110 transition duration-300 ease-in-out"
      >
        <MdArrowForwardIos size={20} />
      </button>
    </div>
    }
    </>
  );
};

export default CategorySlider;
