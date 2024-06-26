
'use client'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import React, { useState,useLayoutEffect } from 'react'
import Card from 'components/ui/Card/Card'
import Link from 'next/link'
import Collapse from 'components/ui/Collapse/Collapse'
import { Select, Space } from 'antd'
import DrawerMenu from 'components/ui/DrawerMenu/DrawerMenu'
import { IoFunnelOutline } from 'react-icons/io5'
import Pagintaion from 'components/Pagination/Pagintaion'
import PRODUCTS_TYPES from 'types/interfaces'
import Loader from "components/Loader/Loader";
import type { CheckboxProps, RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

import { getPaginatedproducts, getPRODUCTS} from 'utils/helperFunctions'
import Input from 'components/Common/regularInputs'
import axios from 'axios'

interface category {
  posterImageUrl: {
        public_id: string,
        imageUrl: string
    },
    _id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    __v:any

}

const Product = () => {
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[]>([])
  const [totalPage, setTotalPage] = useState<string | undefined>()
  const [totalProductscount, setTotalProductscount] = useState<number | undefined>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [colorName, setColorName] = useState<string>()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("Default")
  const [category, setCategory] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [priceRange, setPriceRange] = useState({ from: '', to: '' })
  const [value, setValue] = useState(1)
  const [activeLink, setActiveLink] = useState<category | undefined>()
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [outOfStockOnly, setOutOfStockOnly] = useState<boolean>(false)


  const handleInStockChange: CheckboxProps['onChange'] = (e) => {
    setInStockOnly(e.target.checked)
    setOutOfStockOnly(false)
    setValue(2)
  }

  const handleOutOfStockChange: CheckboxProps['onChange'] = (e) => {
    setOutOfStockOnly(e.target.checked)
    setInStockOnly(false)
    setValue(3)
  }

  const handleAllProductsChange = () => {
    setInStockOnly(false)
    setOutOfStockOnly(false)
    setValue(1)
  }

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
    if (e.target.value === 1) {
      handleAllProductsChange()
    } else if (e.target.value === 2) {
      setInStockOnly(true)
      setOutOfStockOnly(false)
    } else if (e.target.value === 3) {
      setOutOfStockOnly(true)
      setInStockOnly(false)
    }
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }


  console.log(activeLink, 
    "activeLink"
  )



  let productHandler = async()=>{
    try{
      setLoading(true)
      const CategoryRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`)
      const productRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`)

    const [categoryResponse, products] = await Promise.all([CategoryRequest,productRequest]);
    setTotalProducts(products.data.products)
    console.log(categoryResponse.data, "Category Data")
    setActiveLink(categoryResponse.data[0])
    setCategory(categoryResponse.data)
 
    }catch(err){
      console.log(err, "err")

    }finally{
      setLoading(false)

    }
  }

  useLayoutEffect(() => {
    productHandler()
  }, [])



  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  const handlePriceChange = (field:any, value:any) => {
    setPriceRange(prevRange => ({
      ...prevRange,
      [field]: value === '' ? '' : Number(value) // Handle empty string for clearing input
    }));
  };

  const resetPriceFilter = () => {
    setPriceRange({ from: '', to: '' })
  }

  const filteredProductsByCategory = activeLink ? totalProducts.filter(product => product.category === activeLink._id) : totalProducts;
  const filteredProducts = filteredProductsByCategory.filter((product: PRODUCTS_TYPES) => {
    if (!product) return true; // Keep the product if it's null
  
    const price = product.discountPrice ?? product.salePrice;
    const priceMatch = (priceRange.from === '' || price >= priceRange.from) && (priceRange.to === '' || price <= priceRange.to);
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const colorMatch = !colorName || (product.colors && product.colors.some(color => color.colorName === colorName));
    const inStockMatch = !inStockOnly || product.totalStockQuantity && product.totalStockQuantity > 0;
    const outOfStockMatch = !outOfStockOnly || product.totalStockQuantity === 0 || !product.totalStockQuantity
  
    return nameMatch && colorMatch && priceMatch && inStockMatch && outOfStockMatch ;
  });
  
  const sortedProducts = filteredProducts.sort((a, b) => {
    const getPrice = (product: PRODUCTS_TYPES) => product.discountPrice ?? product.salePrice;

    if (sortOption === "Low to High") {
      return getPrice(a) - getPrice(b);
    } else if (sortOption === "High to Low") {
      return getPrice(b) - getPrice(a);
    } else {
      return 0;
    }
  });

  const handleCategoryClick = (categoryName: category) => {
    setActiveLink(categoryName)
  }




  return (
    <>
      <Overlay title="Product" />
      <Container className="mt-20">
        <div className="flex justify-end gap-3">
          <div className="flex gap-2 items-center w-3/6 md:w-auto">
            <h1>Sort By: </h1>
            <Select
              defaultValue="Default"
              className='w-40 h-13'
              onChange={handleSortChange}
              options={[
                { value: "Default", label: "Default" },
                { value: "Low to High", label: "Low to High" },
                { value: "High to Low", label: "High to Low" },
              ]}
            />
          </div>
          <input
            className="px-2 border rounded-md border-primary outline-none w-3/6 md:w-auto"
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-10">
          <div className="w-full md:w-3/12 space-y-3 hidden md:block relative">
            <div className="sticky top-20">
              <div className="p-2 bg-secondary">
                <Collapse title="All Categories">
                  <ul className="px-1 pt-2 space-y-1 ">

                    {loading ?   <div className="flex justify-center items-center"><Loader /></div> :  category && category?.map((item, index) => (
                      <li className='flex flex-col w-full' key={index} >
                        <div className={activeLink?.name === item.name ? "bg-primary px-2 text-white rounded-md w-full h-8 flex items-center cursor-pointer" : "hover:bg-primary px-2 hover:text-white hover:rounded-md w-full h-8 flex items-center cursor-pointer"} onClick={() => handleCategoryClick(item)}>{item.name}</div>
                      </li>
                    ))}
                  </ul>

                </Collapse>
              </div>
              <div className="p-2 bg-secondary">
                <Collapse title="Availability">
                <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                <Radio  value={1}>All Product</Radio>
                  <Radio checked={inStockOnly} onChange={handleInStockChange} value={2}>In Stock</Radio>
                  <Radio checked={outOfStockOnly} onChange={handleOutOfStockChange} value={3}>Out Of Stock</Radio>
                  </Space>
                </Radio.Group>
                </Collapse>
              </div>
              <div className="p-2 bg-secondary">
              <Collapse title="Filter Price">
                  <div className='flex gap-2'>
                    <Input 
                    className='h-10'
                      placeholder='From'
                      type='number'
                      value={priceRange.from}
                      onChange={(e:any) => handlePriceChange('from', e.target.value)}
                    />
                    <Input
                    className='h-10'
                      placeholder='To'
                      type='number'
                      value={priceRange.to}
                      onChange={(e:any) => handlePriceChange('to', e.target.value)}
                    />
                  </div>
                  <div className='text-end pt-2 underline cursor-pointer' onClick={resetPriceFilter}>Reset Price</div>
                </Collapse>
              </div>
            </div>
          </div>
          <DrawerMenu
            showDrawer={showDrawer}
            onClose={onClose}
            open={open}
            className="float-end"
            width={300}
            title={
              <>
                <div className="flex md:hidden mt-5 underline gap-2 items-center">
                  <IoFunnelOutline size={20} />
                  Filters{" "}
                </div>
              </>
            }
            content={
              <div className="space-y-2">
                <div className="p-2 bg-secondary">
                  <Collapse title="All Categories">
                    <ul className="px-1 pt-2 space-y-1">
                    {loading ?   <div className="flex justify-center items-center"><Loader /></div> :  category && category?.map((item, index) => (
                      <li className='flex flex-col w-full' key={index} onClick={onClose}>
                        <div className={activeLink?.name === item.name ? "bg-primary px-2 text-white rounded-md w-full h-8 flex items-center cursor-pointer" : "hover:bg-primary px-2 hover:text-white hover:rounded-md w-full h-8 flex items-center cursor-pointer"} onClick={() => handleCategoryClick(item)}>{item.name}</div>
                      </li>
                    ))}
                    </ul>
                  </Collapse>
                </div>
                  <div className="p-2 bg-secondary">
                  <Collapse title="Availability">
                  <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio checked={inStockOnly} onChange={handleInStockChange} value={1}>In Stock</Radio>
                    <Radio checked={outOfStockOnly} onChange={handleOutOfStockChange} value={2}>Out Of Stock</Radio>
                    </Space>
                  </Radio.Group>
                  </Collapse>
                </div>
                <div className="p-2 bg-secondary">
                <Collapse title="Filter Price">
                  <div className='flex gap-2'>
                    <Input 
                    className='h-10'
                      placeholder='From'
                      type='number'
                      value={priceRange.from}
                      onChange={(e:any) => handlePriceChange('from', e.target.value)}
                    />
                    <Input
                    className='h-10'
                      placeholder='To'
                      type='number'
                      value={priceRange.to}
                      onChange={(e:any) => handlePriceChange('to', e.target.value)}
                    />
                  </div>
                  <div className='text-end pt-2 underline cursor-pointer' onClick={resetPriceFilter}>Reset Price</div>
                </Collapse>
                </div>
              </div>
            }
          />
          <div className="w-full md:w-9/12">
            {error ? (
              <div className="text-red flex justify-center items-center">{error}</div>
            ) : (
              <>
                {loading ? (
                  <div className="flex justify-center items-center h-2/3"><Loader /></div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <Card ProductCard={sortedProducts} /> 
                  </div>
                )}
{/*                 
                <Pagintaion
                  setTotalPage={totalPage}
                  totalSize={totalProductscount ? Number(totalProductscount) : 5}
                  handlerChange={getProductsHandler}
                /> */}
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Product;