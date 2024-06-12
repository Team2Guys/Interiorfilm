"use client"
import Thumbnail from 'components/Carousel/Thumbnail/Thumbnail'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import React, { useState, useEffect } from 'react'
import { Rate, message } from 'antd'

import { GoHeart } from 'react-icons/go'
import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider'
import axios from 'axios'
import { generateSlug } from 'data/Data'
import PRODUCTS_TYPES from 'types/interfaces'
import { Tabs } from 'antd';
import Loader from 'components/Loader/Loader'


const Detail = ({ params }: { params: { productname: string } }) => {
  const parsedProduct = params.productname ? params.productname : null;
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [productDetail, setProductDetail] = useState<PRODUCTS_TYPES | null>(null);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    const colorToAdd = selectedValue || (product.colors && product.colors[0]);

    if (!colorToAdd) {
      message.error('Please select a color.');
      return;
    }

    console.log("Product added to cart:", product);

    const newCartItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      discountPrice: product.discountPrice,
      color: selectedValue,
      count: 1,
      totalPrice: product.discountPrice ? product.discountPrice : product.salePrice,
      purchasePrice: product.purchasePrice
    };

    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("existingCart", existingCart)
    console.log("product", product)

    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product._id);

    if (existingItemIndex !== -1) {
      const updatedCart = existingCart.map((item: any, index: number) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            count: item.count + 1,
            totalPrice: (item.count + 1) * (item.discountPrice ? item.discountPrice : item.price),
          };
        }
        return item;
      });
      console.log(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart));

    } else {
      existingCart.push(newCartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }

    message.success('Product added to cart successfully!');
    window.dispatchEvent(new Event("cartChanged"));
    console.log(existingCart, "existingCart")
  };

  const handleAddToWishlist = (product: any) => {
    const colorToAdd = selectedValue || (product.colors && product.colors[0]);

    if (!colorToAdd) {
      message.error('Please select a color.');
      return;
    }

    console.log(selectedValue, "selectedValue")
    console.log("Product added to wishlist:", product);

    const newWishlistItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      discountPrice: product.discountPrice,
      color: selectedValue,
      count: 1,
      totalPrice: product.discountPrice ? product.discountPrice : product.salePrice,
    };

    let existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    console.log("existingWishlist", existingWishlist)
    console.log("product", product)

    const existingItemIndex = existingWishlist.findIndex((item: any) => item.id === product._id);

    if (existingItemIndex !== -1) {
      const updatedWishlist = existingWishlist.map((item: any, index: number) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            count: item.count + 1,
            totalPrice: (item.count + 1) * (item.discountPrice ? item.discountPrice : item.price),
          };
        }
        return item;
      });
      console.log(updatedWishlist)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    } else {
      existingWishlist.push(newWishlistItem);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    }

    message.success('Product added to Wishlist successfully!');
    window.dispatchEvent(new Event("WishlistChanged"));
    console.log(existingWishlist, "existingWishlist")
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        if (parsedProduct && (response.data.products && response.data.products.length > 0)) {
          let slicedProducts = response.data.products.length > 4 ? response.data.products.filter((item: any) => generateSlug(item.name) !== parsedProduct).slice(0, 4) : response.data.products.filter((item: any) => generateSlug(item.name) !== parsedProduct)
          setProducts(slicedProducts);
          console.log(slicedProducts, "slicedProducts")
          for (let key of response.data.products)
            if (generateSlug(key.name) === parsedProduct) {
              return setProductDetail(key)
            }

        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setProductsLoading(false)

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

  let colorsArray = [
    { colorName: '000' },
    { colorName: '153' },
    { colorName: '343' },
    { colorName: 'e22' },
    { colorName: 'ht3' },
    { colorName: '7f3' },
  ]

  console.log(productDetail, "productDetail")

  const tabData = [
    {
      key: "1",
      label: 'Description',
      children: (
        <div className='space-y-3'>
          <div>
            <p>{productDetail?.description}</p>
          </div>
        </div>
      )
    },
    {
      key: "2",
      label: 'Additional Info',
      children: (
        <div className='space-y-3'>
          <div>
            <ul className='px-6'>
              {productDetail?.spacification?.map((item, index) => (
                <li className='list-disc' key={index}>{item.specsDetails}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      key: "3",
      label: 'Review',
      children: <></>
    },
    {
      key: "4",
      label: 'Video',
      children: <></>
    },
  ];

  return (
    <>
      <Overlay title='Product Detail' />
      {
        productsLoading ? <div className='flex justify-center items-center h-[20vh]'><Loader /></div> : productDetail ?
          <>
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
                        Dhs. <span>{productDetail.discountPrice ? productDetail.discountPrice : productDetail.salePrice}</span>.00
                      </p>
                      {productDetail.discountPrice ?
                        <p className='line-through text-light'>
                          Dhs. <span>{productDetail.salePrice}</span>.00
                        </p>
                        : null}
                    </div>
                    <p><span className='font-medium text-lg'>Available Quantity: </span> {productDetail.totalStockQuantity ?? "0"} </p>

                    <div className='flex gap-2'>
                      <p className='font-medium text-lg'>Color: </p>
                      <div className='flex flex-wrap gap-2'>
                        {productDetail.colors && productDetail.colors.map((color, index) => {
                          return (
                            <div className={`rounded-full p-1 ${color.colorName === colorName                          ? " border-2 border-primary" : ""}`} key={index}>
                            <div className={`space-x-2 h-4 w-4 cursor-pointer rounded-full `} style={{ backgroundColor: `#${color.colorName}` }} onClick={() => { setColorName(color.colorName) }}>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <p>{productDetail.description}</p>

                  {productDetail.totalStockQuantity == null ? (
                    <p className="text-primary text-center text-2xl">Product is out of stock</p>
                  ) : (
                    <div className='flex gap-2'>
                      <button className='bg-primary rounded-md py-3 px-8 text-white' onClick={() => handleAddToCart(productDetail)} >Add To Cart</button>
                      <button className='bg-primary rounded-md py-3 px-3 text-white' onClick={() => handleAddToWishlist(productDetail)}><GoHeart size={25} /></button>
                    </div>
                  )}
                  <div className='flex items-center gap-2'>
                    <p className='font-medium text-lg'>Categories: </p>
                    <p className='text-dark'>All, Featured, Shoes</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <div className='bg-secondary mt-20'>
            <Container>
              <Tabs items={tabData} />
            </Container>
          </div>
        </>
        : null
    }
    <Container className='mt-20'>
      <h1 className='text-lg md:text-3xl mb-5=-'>Related Product</h1>
      <ProductSlider Productname={parsedProduct} />
    </Container>
  </>
)
}

export default Detail;

