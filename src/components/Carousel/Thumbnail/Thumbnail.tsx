'use client';

import React, { useState, useRef, Fragment, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { IMAGE_INTERFACE } from 'types/interfaces';
import Collapse from 'components/ui/Collapse/Collapse';
import { collapseData } from 'data/Data';
import Accordion from 'components/widgets/Accordion';
import axios from 'axios';
import Review from 'components/Common/Review';
import { FaArrowDownLong } from 'react-icons/fa6';
import { PiArrowDownLight } from 'react-icons/pi';

interface ThumbProps {
  thumbs?: IMAGE_INTERFACE[];
  detail?: IMAGE_INTERFACE[];
  product?: any
}

const Thumbnail: React.FC<ThumbProps> = ({ thumbs, detail, product }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [backgroundPosition, setBackgroundPosition] = useState<string>('0% 0%');
  const [reviews, setReviews] = useState<string[]>([]);
  const [showArrow, setShowArrow] = useState(false);
  const swiperContainerRef = useRef(null);

  const fetchReviews = async (productId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/getReviews/${productId}`);
      setReviews(response.data.reviews);
    } catch (err) {
      console.log("Failed to fetch reviews:", err);
    }
  };
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  
  const handleMouseEnter = (imageUrl: string) => {
    setHoveredImage(imageUrl);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };
  const sortedThumbs = thumbs?.slice().sort((a, b) => {
    const indexA = a.imageIndex ?? Number.MAX_SAFE_INTEGER;
    const indexB = b.imageIndex ?? Number.MAX_SAFE_INTEGER;
    return indexA - indexB;
  });
  useEffect(() => {
    if (product?._id) {
      fetchReviews(product?._id);
    }
  }, [product]);

  useEffect(() => {
    const container:any = swiperContainerRef.current;
    if (container) {
      const isScrollable = container.scrollHeight > container.clientHeight;
      setShowArrow(isScrollable);
    }
  }, [sortedThumbs]);

  
  const handleScrollDown = () => {
    const container:any = swiperContainerRef.current;
    if (container) {
      container.scrollBy({ top: 150, behavior: 'smooth' });
    }
  };
  return (
    <Fragment>
      <div className='space-y-20'>
        <div className='lg:relative w-full'>
          <div className='w-full flex flex-wrap lg:flex-nowrap flex-col-reverse lg:flex-row lg:gap-6 xl:gap-10'>

            <div className='w-full lg:w-3/12 flex flex-col gap-3'>
              <div className=' lg:max-h-[500px] xl:max-h-[700px] overflow-y-auto custom-scrollbar' ref={swiperContainerRef}>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={false}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="bg-contain bg-white column-swipper"
                >
                  {sortedThumbs && sortedThumbs.map((array, index) => (
                    <SwiperSlide key={array.imageIndex ?? index} className='w-full h-full column-swiper-slider custom-scrollbar md:h-5 mt-3 lg:mt-0'>
                      <Image
                        className='bg-contain pb-2 bg-white lg:h-[160px] xl:h-[222px] md:w-67 cursor-pointer'
                        src={array.imageUrl}
                        width={270}
                        height={120}
                        alt='Image'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

              </div>
              {/* {showArrow && (
                <div ref={nextRef} className='items-center justify-center hidden lg:flex'>
                  <PiArrowDownLight  className='object-contain cursor-pointer  w-[90.2px] h-[95px]' onClick={handleScrollDown}/>
                </div>
              )} */}



            </div>
            <div className='w-full lg:w-9/12 relative '>
              <Swiper
                style={{
                  '--swiper-navigation-color': '#ffffff',
                  '--swiper-pagination-color': '#ffffff',
                } as React.CSSProperties}
                loop={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className='h-full'
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper:any) => {
                  if (swiper.params.navigation) {//+
                    swiper.params.navigation.prevEl = prevRef.current;//+
                    swiper.params.navigation.nextEl = nextRef.current;//+
                  }
                }}
              >
                {sortedThumbs && sortedThumbs.map((array, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="relative cursor-zoom-in h-full w-full"
                      onMouseEnter={() => handleMouseEnter(array.imageUrl)}

                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Image className='bg-contain w-full h-full lg:h-[611px]  xl:h-[811px]  ' src={array.imageUrl} width={800} height={800} alt='Image' />
                    </div>

                  </SwiperSlide>
                ))}
              </Swiper>
{/* 
              <div ref={prevRef} className='swiper-prev absolute left-[-30px] md:left-[-25px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'>

                <Image src='/images/arrows.png' width={51} height={55} alt='arrow' />

              </div>

              <div ref={nextRef} className='swiper-button absolute right-[-15px]  md:right-[-25px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'>
                <Image src='/images/arrows.png' width={51} height={55} className='rotate-180' alt='arrow' />
              </div> */}


            </div>
          </div>

          <div className="  absolute right-0 top-10 hidden lg:block">
            {hoveredImage && (
              <div
                className="magnified-image absolute left-0  z-50"
                style={{
                  backgroundImage: `url(${hoveredImage})`,
                  backgroundPosition: backgroundPosition,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '200%',
                  width: '550px',
                  height: '550px',
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-13 hidden lg:block">
        <Accordion detail={detail} />
        <hr className=" h-1 border-stone-200" />
        <Collapse
          title="Customer Reviews"

        >
          <Review reviews={reviews} productId={product?._id} fetchReviews={fetchReviews} />
        </Collapse>
        <hr className=" h-1 border-stone-200" />
        {/* <div className="lg:max-w-[1020px] hidden lg:block mt-5"> */}
      </div>
    </Fragment>
  );
};

export default Thumbnail;
