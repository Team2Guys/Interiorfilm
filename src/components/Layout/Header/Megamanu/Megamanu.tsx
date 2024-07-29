import Loader from 'components/Loader/Loader';
import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import PRODUCTS_TYPES from 'types/interfaces';
import MenuSlider from 'components/Carousel/menuSlider/menuSlider';

const Megamanu: React.FC = () => {
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [error, setError] = useState<any>(null);

  const CategoryHandler = async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
      const Categories = await response.json();
      setCategories(Categories);
      if (Categories.length > 0) {
        setSelectedCategory(Categories[0]._id); // Set the first category as the default selected category
      }
      setLoadingCategories(false);
    } catch (err) {
      console.log('err', err);
      setLoadingCategories(false);
    }
  };

  const getallProducts = async (categoryId: string) => {
    try {
      let response: any = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
      let products = response.data.products;
      if (categoryId) {
        products = products.filter((product: PRODUCTS_TYPES) => product.category === categoryId);
      }
      setProducts(products);
    } catch (err: any) {
      console.log(err, "err");
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  useLayoutEffect(() => {
    CategoryHandler();
  }, []);

  useLayoutEffect(() => {
    if (selectedCategory) {
      getallProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className='flex '>
      <div className={`w-2/12 space-y-1`}>
        <h1 className='text-2xl font-semibold mb-4'>All Categories</h1>
        <ul className="px-1 pt-2 space-y-1">
          {loadingCategories ? (
            <div className="flex justify-center items-center"><Loader /></div>
          ) : (
            categories.map((item, index) => (
              <li className='flex flex-col w-full' key={index}>
                <div
                  className={item._id === selectedCategory ? "border-s-4 border-primary px-2 text-dark h-7 w-full flex items-center cursor-pointer" : "border-primary text-dark px-2 hover:text-dark h-7 w-full flex items-center cursor-pointer"}
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
          <h1 className='text-2xl font-semibold mb-4'>{selectedCategory ? categories.find(cat => cat._id === selectedCategory)?.name : "All Products"}</h1>
          <Link className='hover:underline hover:text-black' href={"/product"}>View All</Link>
        </div>
        <MenuSlider products={products} loading={!selectedCategory || loadingCategories} />
      </div>
    </div>
  );
};

export default Megamanu;
