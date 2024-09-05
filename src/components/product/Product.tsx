'use client'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import React, { useState, useEffect } from 'react'
import Card from 'components/ui/Card/Card'
import Collapse from 'components/ui/Collapse/Collapse'
import { Select, Space } from 'antd'
import DrawerMenu from 'components/ui/DrawerMenu/DrawerMenu'
import { IoFunnelOutline } from 'react-icons/io5'
import PRODUCTS_TYPES from 'types/interfaces'
import Loader from "components/Loader/Loader";
import type { CheckboxProps, RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import Input from 'components/Common/regularInputs'
import axios from 'axios'
import SkeletonLoading from 'components/Skeleton-loading/SkeletonLoading'
import { Checkbox } from 'antd';
import { IoIosSearch } from 'react-icons/io'
import { useSearchParams } from 'next/navigation'
import { generateSlug } from 'data/Data'
import { Suspense } from 'react'



interface category {
  posterImageUrl: {
    public_id: string,
    imageUrl: string
  },
  _id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  __v: any
}

const StaticCategory = {
  posterImageUrl: {
    public_id: 'string',
    imageUrl: "string"
  },
  _id: "all",
  name: "View All",
  createdAt: "string",
  updatedAt: "string",
  __v: "any"
}


const ProductPage = () => {
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[]>([])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [colorName, setColorName] = useState<string>()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("Default")
  const [category, setCategory] = useState<category[]>([])
  const [activeLink, setActiveLink] = useState<category | undefined>()
  const searchParams = useSearchParams()
  const categoryName = searchParams.get('category');

  useEffect(() => {
    get_recordHandler();
  }, []);

  useEffect(() => {
    productHandler(categoryName);
  }, [categoryName]);

  const get_recordHandler=async()=>{
    try {
      setLoading(true);
      const [categoryResponse, productResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`),
      ]);

      const categories = [StaticCategory, ...categoryResponse.data];
      setCategory(categories);
      setTotalProducts(productResponse.data.products);
      if(!categoryName){
        setActiveLink(StaticCategory);
      }else {
      const activeCategory = categories.find((cat) =>{
          console.log(cat, "cat")
          return generateSlug(cat.name) === categoryName}
    
    );
      setActiveLink(activeCategory);
      }
    } catch (err) {
      console.error('Error loading products or categories', err);
    }
  }
  const productHandler = async (categoryName: string | null) => {
    try {
      const activeCategory = category.find((cat) =>generateSlug(cat.name) === categoryName);
      setActiveLink(activeCategory);
    } catch (err) {
      console.error('Error loading products or categories', err);
    }
  };

  const filteredProductsByCategory = activeLink
    ? totalProducts.filter((product) => {
        if (activeLink._id === "all") {
          return product;
        }
        return product.category === activeLink._id;
      })
    : totalProducts;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const filteredProducts = filteredProductsByCategory.filter((product: PRODUCTS_TYPES) => {
    if (!product) return true;
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const colorMatch = !colorName || (product.colors && product.colors.some(color => color.colorName === colorName));
    return nameMatch && colorMatch ;
  });

  const sortProducts = (products: PRODUCTS_TYPES[]) => {
    if (sortOption === "Default") {
      return products.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // Convert to uppercase for case-insensitive comparison
        const nameB = b.name.toUpperCase();
        return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
      });
    } else if (sortOption === "Low to High") {
      const getPrice = (product: PRODUCTS_TYPES) => product.discountPrice ?? product.salePrice;
      return products.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sortOption === "High to Low") {
      const getPrice = (product: PRODUCTS_TYPES) => product.discountPrice ?? product.salePrice;
      return products.sort((a, b) => getPrice(a) - getPrice(b));
    } else {
      return products;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);
  return (

<>
      <Overlay title="Product" />
      <Container className="mt-20 md:overflow-hidden">
        <div className="flex justify-between  gap-3">
            <p className='uppercase text-[24px] text-lightdark'>Home<span className='capitalize text-black'>/{activeLink?.name}</span></p>
          <div className='flex gap-4'>
          <div className="flex flex-wrap gap-2 items-center w-3/6 md:w-auto">
            <h1>Sort By: </h1>
            <Select
              defaultValue="price"
              className='w-40 h-10 rounded-none'
              onChange={handleSortChange}
              options={[
                { value: "Default", label: "Default" },
                { value: "Low to High", label: "Low to High" },
                { value: "High to Low", label: "High to Low" },
              ]}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center w-3/6 md:w-auto">
            <h1>Sort By: </h1>
            <Select
              defaultValue="color"
              className='w-40 h-10 rounded-none'
              onChange={handleSortChange}
              options={[
                { value: "Default", label: "Default" },
                { value: "Low to High", label: "Low to High" },
                { value: "High to Low", label: "High to Low" },
              ]}
            />
          </div>
          <div className="relative w-3/6 md:w-auto flex items-center border border-secondary" >
            <input
              className="px-2 py-1 rounded-none outline-none  w-[90%] border-sky-900"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IoIosSearch className="inline-block absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
            </div>

        </div>

        <div className="w-full">
            {error ? (
              <div className="text-red flex justify-center items-center">{error}</div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-10">
                  {loading ? (
                    Array.from({ length: 9 }).map((_, index) => (
                      <div key={index} className='gap-10 flex flex-col mt-3'>
                        <SkeletonLoading
                          avatar={{ shape: 'square', size: 150, className: "w-full flex flex-col" }}
                          title={false}
                          style={{ flexDirection: 'column' }}
                          paragraph={{ rows: 3 }}
                          className='gap-10 flex'
                          active={true}
                        />
                      </div>
                    ))
                  ) : (
                    <Card quickClass='right-8'  ProductCard={sortedProducts} />
                  )}
                </div>
              </>
            )}
            {/* {productsToShow < sortedProducts.length && (
              <button
                className='px-5 py-2 bg-primary text-white rounded-md flex items-center mx-auto'
                onClick={loadMoreProducts}
              >
                Load More
              </button>
            )} */}
          </div>
      </Container>

</>

  );
};

export default ProductPage;
