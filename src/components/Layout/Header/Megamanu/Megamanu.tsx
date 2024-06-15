import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider';
import Loader from 'components/Loader/Loader';
import Link from 'next/link';
import React from 'react';
import {Categories_Types} from 'types/interfaces'


interface MegamanuProps {
  loading: boolean;
  Categories: Categories_Types[];
  activeLink: any;
  handleCategoryClick: (Categories: Categories_Types) => void;
}
const Megamanu: React.FC<MegamanuProps> = ({ loading, Categories, activeLink, handleCategoryClick }) => {


  return (
    <div className='flex'>
      <div className={`w-2/12 space-y-1`}>
        <h1 className='text-2xl font-semibold mb-4'>All Categories</h1>
        <ul className="px-1 pt-2 space-y-1">
          {loading ? <div className="flex justify-center items-center"><Loader /></div> : Categories.map((item, index) => (
            <li className='flex flex-col w-full' key={index}>
              <div className={activeLink?.name === item.name ? "border-s-4 border-primary px-2 text-dark h-7 w-full flex items-center cursor-pointer" : "border-primary text-dark px-2 hover:text-dark h-7 w-full flex items-center cursor-pointer"} onClick={() => handleCategoryClick(item)}>{item.name}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={`w-10/12 px-3 border-s-2 border-gray`}>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-semibold mb-4'>{activeLink?.name}</h1>
          <Link className='hover:underline hover:text-black' href={"/product"}>View All</Link>
        </div>
        <ProductSlider categoryId={activeLink?._id} />
      </div>
    </div>
  );
};

export default Megamanu;
