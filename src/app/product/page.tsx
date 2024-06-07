//@ts-nocheck
'use client'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import React, { useState,useLayoutEffect } from 'react'
import Card from 'components/ui/Card/Card'
import Link from 'next/link'
import Collapse from 'components/ui/Collapse/Collapse'
import { Select } from 'antd'
import DrawerMenu from 'components/ui/DrawerMenu/DrawerMenu'
import { IoFunnelOutline } from 'react-icons/io5'
import Pagintaion from 'components/Pagination/Pagintaion'
import PRODUCTS_TYPES from 'types/interfaces'
import Loader from "components/Loader/Loader";

import { getPaginatedproducts, getPRODUCTS} from 'utils/helperFunctions'
import Input from 'components/Common/regularInputs'

const Product = () => {
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[]>([])
  const [totalPage, setTotalPage] = useState<string | undefined>()
  const [totalProductscount, setTotalProductscount] = useState<number | undefined>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [colorName, setColorName] = useState<string>()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("Default")
  const [category, setCategory] = useState<any[]>();
  const [open, setOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ from: "", to: Infinity });

  const showDrawer = () => {
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    getPRODUCTS(setTotalProducts, setError, setLoading, 1, setTotalPage, setTotalProductscount)
  }, [])

  const CategoryHandler = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
    );
    const Categories = await response.json();
    setCategory(Categories);
    console.log(setCategory, "setCategory")
  };

  useLayoutEffect(() => {
    CategoryHandler();
  }, []);

  const getProductsHandler = (page: number) => {
    getPRODUCTS(setTotalProducts, setError, setLoading, page)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  const handlePriceChange = (key: string, value: number) => {
    setPriceRange(prev => ({ ...prev, [key]: value }));
  }

  const filteredProducts = totalProducts
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!colorName || product.colors.some(color => color.colorName === colorName)) &&
      (product.salePrice >= priceRange.from && product.salePrice <= priceRange.to)
    )

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "Low to High") {
      return a.salePrice - b.salePrice
    } else if (sortOption === "High to Low") {
      return b.salePrice - a.salePrice
    } else {
      return 0 // Default sorting (could be by name or id)
    }
  })
    
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
                  <ul className="px-1 pt-2 space-y-1">
                    {category?.map((item, index) => (
                      <li key={index}>
                        <Link href={"/"}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </div>
              <div className="p-2 bg-secondary">
                <Collapse title="Filter Price">
                  <div className='flex gap-2'>
                    <Input
                      placeholder='From'
                      type='number'
                      value={priceRange.from === Infinity ? '' : priceRange.from}
                      onChange={(e) => handlePriceChange('from', Number(e.target.value))}
                    />
                    <Input
                      placeholder='To'
                      type='number'
                      value={priceRange.to === Infinity ? '' : priceRange.to}
                      onChange={(e) => handlePriceChange('to', Number(e.target.value))}
                    />
                  </div>
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
                      {category?.map((item, index) => (
                        <li key={index}>
                          <Link href={"/"}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                </div>
                <div className="p-2 bg-secondary">
                  <Collapse title="Filter Price">
                    <div className='flex gap-2'>
                      <Input
                        placeholder='From'
                        type='number'
                        value={priceRange.from === Infinity ? '' : priceRange.from}
                        onChange={(e) => handlePriceChange('from', Number(e.target.value))}
                      />
                      <Input
                        placeholder='To'
                        type='number'
                        value={priceRange.to === Infinity ? '' : priceRange.to}
                        onChange={(e) => handlePriceChange('to', Number(e.target.value))}
                      />
                    </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <Card ProductCard={sortedProducts} />
                  </div>
                )}
                <Pagintaion
                  setTotalPage={totalPage}
                  totalSize={totalProductscount ? Number(totalProductscount) : 5}
                  handlerChange={getProductsHandler}
                />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Product;
