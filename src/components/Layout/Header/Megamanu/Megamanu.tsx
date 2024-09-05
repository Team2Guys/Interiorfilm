import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PRODUCTS_TYPES, { Categories_Types } from "types/interfaces";
import { Skeleton } from "antd";
import { generateSlug } from "data/Data";

interface MegamanuProps {
  Categories: Categories_Types[];
  products: PRODUCTS_TYPES[];
  loading?: boolean;
  onProductClick: () => void;
}

const Megamanu: React.FC<MegamanuProps> = ({
  Categories,

  products,
  onProductClick,
  loading,
}) => {
  const router = useRouter();
  const [hoverCategory, setHoverCategory] = useState<Categories_Types | null>(
    null
  );
  useEffect(() => {
    if (Categories.length > 0) {
      setHoverCategory(Categories[0]);
    }
  }, [Categories]);

  const handleButtonClick = (categoryName: string) => {
    const slug = generateSlug(categoryName)
    router.push(`/products?category=${slug}`);
    onProductClick();
  };
  const handleHoverImg = (category: Categories_Types) => {
    setHoverCategory(category);
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 xl:gap-8 p-3 mt-2 w-full">
      <div className={`w-full lg:w-6/12 grid grid-cols-2 md:grid-cols-3 gap-4 xl:gap-8`}>
        {!loading
          ? Categories.map((item) => (
              <div
                key={item._id}
                className="category-wrapper text-center cursor-pointer"
                onClick={() => (handleButtonClick(item.name))}
                onMouseEnter={() => handleHoverImg(item)}
              >
                <Image
                  src={item.posterImageUrl.imageUrl}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="mx-auto w-full"
                />
                <h3 className="link-underline after:bg-[#FF914E] font-semibold text-12 lg:text-[10px] 2xl:text-16" >
                  {item.name}
                </h3>
              </div>
            ))
          : Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="category-wrapper text-center">
                <Skeleton.Image
                  active={true}
                  style={{ width: 160, height: 150 }}
                  className="skeleton-img"
                />
                <Skeleton.Input
                  active={true}
                  style={{ height: 20 , width: 0 }}
                  className="mt-1 skeleton-input"
                />
              </div>
            ))}
      </div>
      <div className={`lg:w-6/12 category-hover-img-wrapper hidden lg:block`}>
        {!loading ? (
          hoverCategory && (
            <div className="cursor-pointer relative w-full h-full" onClick={() => handleButtonClick(hoverCategory.name)}>
              <Image
                src={hoverCategory.posterImageUrl.imageUrl}
                alt={hoverCategory.name}
                width={500}
                height={500}
                className="w-full h-full cursor-pointer"
              />
              <div className="bg-white w-50 h-12 flex justify-center items-center shadow-1 absolute bottom-5 left-1/2 -translate-x-1/2 font-medium text-18">
                {hoverCategory.name}
              </div>
            </div>
          )
        ) : (
          <Skeleton.Image active={true} className="skeleton-img" />
        )}
      </div>
    </div>
  );
};

export default Megamanu;
