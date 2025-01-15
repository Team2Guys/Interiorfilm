import React, { useState, useRef, Fragment, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { IMAGE_INTERFACE } from "types/interfaces";
import Collapse from "components/ui/Collapse/Collapse";
import Accordion from "components/widgets/Accordion";
import axios from "axios";
import Review from "components/Common/Review";
import SideBySideMagnifier from "./SideBySideMagnifier";

interface ThumbProps {
  thumbs?: IMAGE_INTERFACE[];
  detail?: IMAGE_INTERFACE[];
  product?: any;
}

const Thumbnail: React.FC<ThumbProps> = ({ thumbs, detail, product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [reviews, setReviews] = useState<string[]>([]);
  const [showArrow, setShowArrow] = useState(false);
  const swiperContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number>(0); // This tracks the active main image index

  const fetchReviews = async (productId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/getReviews/${productId}`
      );
      setReviews(response.data.reviews);
    } catch (err) {
      console.log("Failed to fetch reviews:", err);
    }
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
    const container: any = swiperContainerRef.current;
    if (container) {
      const isScrollable = container.scrollHeight > container.clientHeight;
      setShowArrow(isScrollable);
    }
  }, [sortedThumbs]);

  const handleSlideClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Fragment>
      <div className="space-y-20">
        <div className="md:relative w-full">
          <div className="w-full flex flex-wrap md:flex-nowrap flex-col-reverse md:flex-row md:gap-3 xl:gap-6 ">
            {/* Thumbnail Swiper */}
            <div className="w-full md:w-3/12 flex flex-col gap-3 md:!max-h-[700px] lg:!max-h-[570px] xl:!max-h-[637px] 2xl:!max-h-[780px] 3xl:!max-h-[800px] thumbnailslide">
              <div className="overflow-y-auto custom-scrollbar" ref={swiperContainerRef}>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={false}
                  spaceBetween={10}
                  slidesPerView={3}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[ Navigation, Thumbs]}
                  className="bg-contain bg-white column-swipper"
                >
                  {sortedThumbs &&
                    sortedThumbs.map((array, index) => (
                      <SwiperSlide
                        key={array.imageIndex ?? index}
                        className={`w-full h-full column-swiper-slider custom-scrollbar mt-3 md:mt-0`}
                        onClick={() => handleSlideClick(index)}
                      >
                        <Image
                          className={`bg-cover border-4 bg-white h-full w-full cursor-pointer ${
                            activeIndex === index ? "border-primary" : "border-white"
                          }`}
                          src={array.imageUrl}
                          width={270}
                          height={140}
                          alt={array.altText || ''}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
            <div className="w-full md:w-9/12 relative md:!max-h-[700px] lg:!max-h-[570px] xl:!max-h-[637px] 2xl:!max-h-[750px] 3xl:!max-h-[800px] thumbnailslide">
              <Swiper
                style={
                  {
                    "--swiper-navigation-color": "#ffffff",
                    "--swiper-pagination-color": "#ffffff",
                  } as React.CSSProperties
                }
                loop={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                className="h-full"
                onSlideChange={(swiper) => {
                  const realIndex = swiper.realIndex;
                  setActiveIndex(realIndex);
                }}
              >
                {sortedThumbs &&
                  sortedThumbs.map((array, index) => (
                    <SwiperSlide key={index}>
                      <SideBySideMagnifier
                        imageSrc={array.imageUrl}
                        largeImageSrc={array.imageUrl}
                        altText={array.altText}
                        zoomScale={2}
                        inPlace={true}
                        alignTop={true}
                        fillSpace={false}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-13 hidden md:block">
        <Accordion 
        // detail={detail}
         />
        {/* <hr className="h-1 border-stone-200" /> */}
        {/* <Collapse title="Customer Reviews">
          <Review
            reviews={reviews}
            productId={product?._id}
            fetchReviews={fetchReviews}
          />
        </Collapse> */}
        <hr className="h-1 border-stone-200" />
      </div>
    </Fragment>
  );
};

export default Thumbnail;
