import React, { useState, useEffect } from 'react';
import MenuSlider from 'components/Carousel/menuSlider/menuSlider';
import Loader from 'components/Loader/Loader';
import Link from 'next/link';
import PRODUCTS_TYPES from 'types/interfaces';

interface MegamanuProps {
  Categories: { _id: string, name: string }[];
  products: PRODUCTS_TYPES[];
  onProductClick: () => void; // Add a prop to close the popover on product click
}

const Megamanu: React.FC<MegamanuProps> = ({ Categories, products, onProductClick }) => {
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<PRODUCTS_TYPES[]>([]);

  useEffect(() => {
    if (Categories.length > 0) {
      setSelectedCategory(Categories[0]._id);
    }
  }, [Categories]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className='flex'>
      <div className={`w-2/12 space-y-1`}>
        <h1 className='text-2xl font-semibold mb-4'>All Categories</h1>
        <ul className="px-1 pt-2 space-y-1">
          {loadingCategories ? (
            <div className="flex justify-center items-center"><Loader /></div>
          ) : (
            Categories.map((item, index) => (
              <li className='flex flex-col w-full' key={index}>
                <div
                  className={item._id === selectedCategory ? "border-s-4 border-primary px-2 text-primary h-7 w-full flex items-center cursor-pointer" : "border-primary text-dark px-2 hover:text-dark h-7 w-full flex items-center cursor-pointer"}
                  onClick={() => handleCategoryClick(item._id)}
                >
                  {item.name}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className={`w-10/12 px-3 border-s-2 border-gray`}>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-semibold mb-4'>{selectedCategory ? Categories.find(cat => cat._id === selectedCategory)?.name : "All Products"}</h1>
          <Link className='hover:underline hover:text-black' href={"/products"}>View All</Link>
        </div>
        {/* Pass the onProductClick prop to MenuSlider */}
        <MenuSlider products={filteredProducts} loading={loadingCategories} onProductClick={onProductClick} />
      </div>
    </div>
  );
};

export default Megamanu;
