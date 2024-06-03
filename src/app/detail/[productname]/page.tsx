"use client"
import Thumbnail from 'components/Carousel/Thumbnail/Thumbnail'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import React, { useState,useEffect, useLayoutEffect } from 'react'
// import img from "../../../public/images/img-1.png"
import img from "../../../../public/images/img-1.png"
import img2 from "../../../../public/images/img-10.png"
import img3 from "../../../../public/images/img-12.png"
import img4 from "../../../../public/images/img-11.png"
import img5 from "../../../../public/images/img-15.png"
import img6 from "../../../../public/images/img-16.png"
import img7 from "../../../../public/images/img-18.png"
import img8 from "../../../../public/images/img-17.png"
import { Rate } from 'antd'
import { HiOutlineMinus } from 'react-icons/hi2'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { GoHeart } from 'react-icons/go'
import Tabs from 'components/ui/Tabs/Tabs'
import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider'
import Mobiletab from 'components/ui/Tabs/Mobiletab/Mobiletab'
import axios from 'axios'
import {generateSlug} from 'data/Data'
import PRODUCTS_TYPES from 'types/interfaces'


const items=[
    { image: img3, title: "JBL Micoro Headphone", price: 23, oldprice: 38, star: 2 },
    { image: img4, title: "Bose Color Speaker", price: 21, oldprice: 38, star: 2 },
    { image: img5, title: "Bose Color Speaker", price: 30, oldprice: 38, star: 2 },
    { image: img6, title: "Asus Watch Speaker", price: 28, oldprice: 38, star: 2 },
    { image: img7, title: "Asus Watch Speaker", price: 12, oldprice: 38, star: 2 },
    { image: img8, title: "Sony Wireless Bohm", price: 19, oldprice: 38, star: 2 },
];
    

const Detail = ({ params }: { params: { productname: string }}) => {
  const parsedProduct = params.productname ? params.productname: null;
  console.log(parsedProduct, "parsedProduct")
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [productDetail, setproductDetail] = useState<PRODUCTS_TYPES | null>(null);
  const [productsLoading, setProductsloading] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsloading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        if(parsedProduct  && (response.data.products && response.data.products.length > 0)){
          let slicedProducts = response.data.products.length > 4 ?  response.data.products.filter((item:any)=> generateSlug(item.name) !==parsedProduct).slice(0, 4) :   response.data.products.filter((item:any)=>generateSlug(item.name) !==parsedProduct)
          setProducts(slicedProducts);
        for(let key of response.data.products)
          if(generateSlug(key.name) ===parsedProduct){
            return setproductDetail(key)
          }

        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally{
        setProductsloading(false)
  
      }
    };
  
    fetchData();
  }, [parsedProduct]);

    const [colorName, setColorName] = useState<string>()
    let [count, setCount] = useState(0);

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }

    let colorsARray =[
        { colorName : '000'},
        { colorName : '153'}, 
        { colorName : '343'},
        { colorName : 'e22'},
        { colorName : 'ht3'},
        { colorName : '7f3'},

]

console.log(productDetail, " productDetail"
)

  return (
    <>
        <Overlay title='Product Detail'/>
    {
      productDetail ? 
        <Container className='mt-10 mb-5'>
        <div className='shadow p- bg-white'>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-2 p-2 gap-4'>
            <div className='w-full'>
                <Thumbnail
                thumbs={
                  productDetail.imageUrl
              }
                />
                </div>
                <div className='py-5 px-8 space-y-4 md:space-y-8'>
                    <h1 className='text-3xl'>{productDetail.name}</h1>
                    <div className='flex gap-2'>
                    <Rate disabled allowHalf defaultValue={3.5} />
                    <p>(24)</p>
                    </div>
                    <div className='flex gap-2'>
           
                    <p className='text-primary'>
                        Dhs. <span>{productDetail.discountPrice ? productDetail.discountPrice : productDetail.salePrice }</span>.00
                    </p>
                    {productDetail.discountPrice ? 
                    <p className='line-through text-light'>
                        Dhs. <span>{productDetail.salePrice}</span>.00
                    </p>
: null}
                    </div>
                    <div className='flex gap-2'>
                    <p className='font-medium text-lg'>Color: </p>
                    <div  className='flex flex-wrap gap-2'>

                    {productDetail.colors && productDetail.colors.map((color, index) =>{
                        return (
                            <div className={`rounded-full p-1 ${color.colorName ===colorName ? " border-2 border-primary": ""}`} key={index}>
                            <div  className={`space-x-2 h-4 w-4 cursor-pointer rounded-full `} style={{backgroundColor: `#${color.colorName}`}} onClick={()=>{setColorName(color.colorName)}}>
                            </div>
                            </div>
                        )
                    })}
                    </div>
                 
                    </div>

                    {/* <div className='flex items-center gap-2'>
                        <button className='border py-2 px-2 rounded-md' onClick={decrementCount}><HiOutlineMinus /></button>
                        <div>{count}</div>
                         <button className='border py-2 px-2 rounded-md' onClick={incrementCount}><HiOutlinePlusSm /></button>
                    </div> */}
                    
                    <p>{productDetail.description}</p>
                    <div className='flex gap-2'>
                        <button className='bg-primary rounded-md py-3 px-8 text-white'>Add To Cart</button>
                        <button className='bg-primary rounded-md py-3 px-3 text-white'><GoHeart size={25} /></button>
                    </div>
                    <div className='flex items-center gap-2'>
                    <p className='font-medium text-lg'>Categories: </p>
                    <p className='text-dark'>All, Featured, Shoes</p>
                    </div>
                    {/* <div className='flex items-center gap-2'>
                    <p className='font-medium text-lg'>Tags: </p>
                    <p className='text-dark'>All, Featured, Shoes</p>
                    </div> */}
                </div>
            </div>
        </div>
        </Container> : null
    }    

        <div className='bg-secondary  mt-20'>
         <Container>
        <Mobiletab className='pt-10 pb-10'/>
         </Container>
        </div>
        <Container className='mt-20'>
         <h1 className='text-lg md:text-3xl mb-5=-'>Related Product</h1>
         <ProductSlider
         Related={items}
         />
         </Container>
    </>
  )
}

export default Detail