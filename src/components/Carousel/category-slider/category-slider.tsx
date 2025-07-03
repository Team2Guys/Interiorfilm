'use client';
import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Autoplay, Navigation } from 'swiper/modules';
import CategoryCard from './card';
import { generateSlug } from 'data/Data';

const CategorySlider = ({ categories }: { categories: any[] }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);
  useEffect(() => {
    if (swiperRef.current?.swiper && categories.length > 0) {
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

  if (categories.length === 0) {
    return <div className="text-center text-red-500">No Product found.</div>;
  }

  return (
    <>
      {categories.length > 0 && (

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
      )}
    </>
  );
};

export default CategorySlider;
