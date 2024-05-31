//@ts-nocheck
'use client'
import Container from 'components/Layout/Container/Container'
import SelectList from 'components/ui/Select/Select'
import Overlay from 'components/widgets/Overlay/Overlay'
import React, { useState,useLayoutEffect } from 'react'
import img2 from "../../../public/images/img-1.png"
import img3 from "../../../public/images/img-10.png"
import img4 from "../../../public/images/img-11.png"
import img5 from "../../../public/images/img-12.png"
import img6 from "../../../public/images/img-13.png"
import img7 from "../../../public/images/img-14.png"
import img8 from "../../../public/images/img-15.png"
import img9 from "../../../public/images/img-16.png"
import Card from 'components/ui/Card/Card'
import Link from 'next/link'
import Collapse from 'components/ui/Collapse/Collapse'
import { Select, Slider } from 'antd'
import DrawerMenu from 'components/ui/DrawerMenu/DrawerMenu'
import { IoFunnelOutline } from 'react-icons/io5'
import Cookies from 'js-cookie';
import Pagintaion from 'components/Pagination/Pagintaion'
import PRODUCTS_TYPES from 'types/interfaces'
import Loader from "components/Loader/Loader";


import { getPaginatedproducts, getPRODUCTS} from 'utils/helperFunctions'
import { number } from 'yup'



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


    let colorsARray =[
        { colorName : '000'},
        { colorName : '153'}, 
        { colorName : '343'},
        { colorName : 'e22'},
        { colorName : 'ht3'},
        { colorName : '7f3'},

]
useLayoutEffect(()=>{
  getPRODUCTS(setTotalProducts,setError,setLoading,1, setTotalPage, setTotalProductscount)
},[])


const CategoryHandler = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
  );
  const Categories = await response.json();
  setCategory(Categories);
};

useLayoutEffect(() => {
  CategoryHandler();
}, []);


const getProductsHandler =(page: number)=>{
  getPRODUCTS(setTotalProducts,setError,setLoading,page)

}

console.log(totalProductscount, "totalProductscount")

const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value)
}

const handleSortChange = (value: string) => {
  setSortOption(value)
}

const filteredProducts = totalProducts
  .filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!colorName || product.colors.some(color => color.colorName === colorName))
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
            <h1 className="">Sort By: </h1>
            <Select
            defaultValue="Default"
            className='w-40 h-13'
            onChange={handleSortChange}
            options={[
              { value: "Default", label: "Default",disabled: true},
              { value: "Low to High", label: "Low to High" },
              { value: "High to Low", label: "High to Low" },
            ]}
          />
          </div>
          <input
            className="px-2 border-2 rounded-md border-primary outline-none w-3/6 md:w-auto"
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

                  {category?.map((item)=>{
                    return (
                      <li>
                      <Link href={"/"}>{item.name}</Link>
                    </li>
                    )
                  })}
                </ul>
              </Collapse>
            </div>

            <div className="p-2 bg-secondary">
              <Collapse title="All Filters">
                <div className="flex gap-2">
                  {colorsARray.map((color, index) => {
                    return (
                      <div
                        className={`rounded-full p-1 ${
                          color.colorName === colorName
                            ? " border-2 border-primary"
                            : ""
                        }`}
                        key={index}
                      >
                        <div
                          className={` space-x-2 h-4 w-4 cursor-pointer rounded-full `}
                          style={{ backgroundColor: `#${color.colorName}` }}
                          onClick={() => {
                            setColorName(color.colorName);
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </Collapse>
            </div>
            <div className="p-2 bg-secondary">
              <Collapse title="Filter Price">
                <Slider
                  range={{ draggableTrack: true }}
                  defaultValue={[0, 10]}
                />
              </Collapse>
            </div>
          </div>
          </div>
          <DrawerMenu
            className="float-end"
            width={250}
            title={
              <>
                <div className="flex md:hidden mt-5  underline gap-2 items-center">
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
                      <li>
                        <Link href={"/"}>Dresses</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Sweatshirts</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Jackets</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Denim Jeans</Link>
                      </li>
                      <li>
                        <Link href={"/"}>Shorts</Link>
                      </li>
                    </ul>
                  </Collapse>
                </div>

                <div className="p-2 bg-secondary">
                  <Collapse title="All Filters">
                    <div className="flex flex-wrap gap-2">
                      {colorsARray.map((color, index) => {
                        return (
                          <div
                            className={`rounded-full p-1 ${
                              color.colorName === colorName
                                ? " border-2 border-primary"
                                : ""
                            }`}
                            key={index}
                          >
                            <div
                              className={` space-x-2 h-4 w-4 cursor-pointer rounded-full `}
                              style={{ backgroundColor: `#${color.colorName}` }}
                              onClick={() => {
                                setColorName(color.colorName);
                              }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </Collapse>
                </div>
                <div className="p-2 bg-secondary">
                  <Collapse title="Filter Price">
                    <Slider
                      range={{ draggableTrack: true }}
                      defaultValue={[0, 10]}
                    />
                  </Collapse>
                </div>
              </div>
            }
          />
          <div className="w-full md:w-9/12">

            {
                 error? <div className="text-red flex justify-center items-center">{error}</div> : 
            
            <>
                  {
      loading ? <div className="flex justify-center items-center h-2/3"><Loader/></div>  : 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <Card ProductCard={sortedProducts} />
            </div>
              }
            <Pagintaion setTotalPage={totalPage} totalSize ={totalProductscount ? Number(totalProductscount): 5  } handlerChange={getProductsHandler}  />
  
          
            </>
            }
          </div>
        </div>
      </Container>
    </>
  );
};

export default Product;
