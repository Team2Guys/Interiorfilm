"use client"
import Thumbnail from 'components/Carousel/Thumbnail/Thumbnail';
import Container from 'components/Layout/Container/Container';
import Overlay from 'components/widgets/Overlay/Overlay';
import React, { useState, useEffect } from 'react';
import { Rate, message, Tabs } from 'antd';
import { GoHeart } from 'react-icons/go';
import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import Review from 'components/Common/Review';
import { IoIosClose } from 'react-icons/io';
import { RxMinus, RxPlus } from 'react-icons/rx';
import { generateSlug } from 'data/Data';
import PRODUCTS_TYPES from 'types/interfaces';

const { TabPane } = Tabs;

const Detail = ({ params }: { params: { productname: string } }) => {
  const parsedProduct = params.productname ? params.productname : null;
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [productDetail, setProductDetail] = useState<PRODUCTS_TYPES | null>(null);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [relatedProductsLoading, setRelatedProductsLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState<number>(1);

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1 || value > 100) {
      message.error('Please select a length between 1 and 100.');
    } else {
      message.destroy(); // clear any previous messages
      setLength(value);
    }
  };

  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    } else {
      message.error('Quantity cannot exceed 100.');
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      message.error('Quantity cannot be less than 1.');
    }
  };

  useEffect(() => {
    if (productDetail?._id) {
      fetchReviews(productDetail._id);
    }
  }, [productDetail]);

  useEffect(() => {
    if (productDetail) {
      const price = productDetail.discountPrice || productDetail.salePrice;
      setTotalPrice((price * length) * quantity);
    }
  }, [length, quantity, productDetail]);

  const fetchReviews = async (productId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/getReviews/${productId}`);
      console.log("productDetail", productDetail)
      setReviews(response.data.reviews);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleAddToCart = (product: any) => {
    const newCartItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      discountPrice: product.discountPrice,
      count: quantity,
      length: length,
      totalPrice: (product.discountPrice || product.salePrice) * length * quantity,
      purchasePrice: product.purchasePrice
    };
  
    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product._id);
  
    if (existingItemIndex !== -1) {
      // Update length and quantity
      existingCart[existingItemIndex].length += length;
      existingCart[existingItemIndex].count += quantity;
      existingCart[existingItemIndex].totalPrice += (product.discountPrice || product.salePrice) * length * quantity;
    } else {
      existingCart.push(newCartItem);
    }
  
    localStorage.setItem("cart", JSON.stringify(existingCart));
    message.success('Product added to cart successfully!');
    window.dispatchEvent(new Event("cartChanged"));
  };
  

  const handleAddToWishlist = (product: any) => {
    const newWishlistItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      discountPrice: product.discountPrice,
      count: quantity,
      length: length,
      totalPrice: (product.discountPrice || product.salePrice) * length * quantity,
    };
  
    let existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingItemIndex = existingWishlist.findIndex((item: any) => item.id === product._id);
  
    if (existingItemIndex !== -1) {
      // Update length and quantity
      existingWishlist[existingItemIndex].length += length;
      existingWishlist[existingItemIndex].count += quantity;
      existingWishlist[existingItemIndex].totalPrice += (product.discountPrice || product.salePrice) * length * quantity;
    } else {
      existingWishlist.push(newWishlistItem);
    }
  
    localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    message.success('Product added to Wishlist successfully!');
    window.dispatchEvent(new Event("WishlistChanged"));
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        if (parsedProduct && (response.data.products && response.data.products.length > 0)) {
          let slicedProducts = response.data.products.length > 4 ? response.data.products.filter((item: any) => generateSlug(item.name) !== parsedProduct).slice(0, 4) : response.data.products.filter((item: any) => generateSlug(item.name) !== parsedProduct)
          setProducts(slicedProducts);
          for (let key of response.data.products){
            if (generateSlug(key.name) === parsedProduct) {
              setProductDetail(key);
              fetchRelatedProducts(key.category); // Fetch related products based on category
              return;
            }
          }



        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setProductsLoading(false)
      }
    };

    const fetchRelatedProducts = async (categoryId: string) => {
      try {
        setRelatedProductsLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        const relatedProducts = response.data.products.filter((product: any) => product.category === categoryId && generateSlug(product.name) !== parsedProduct);
        setRelatedProducts(relatedProducts.slice(0, 4)); // Limit to 4 related products
      } catch (error) {
        console.log('Error fetching related products:', error);
      } finally {
        setRelatedProductsLoading(false);
      }
    };

    fetchData();
  }, [parsedProduct]);

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
              {productDetail?.spacification?.map((item: any, index: number) => (
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
      children: <><Review reviews={reviews} productId={productDetail?._id} fetchReviews={fetchReviews} /></>
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
                    <Thumbnail  thumbs={productDetail.imageUrl} />
                  </div>
                  <div className='py-5 px-8 space-y-4 md:space-y-8 z-10'>
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
                    <p><span className='font-bold text-base'>Available Quantity: </span> {productDetail.totalStockQuantity ?? "0"} </p>
                    <div className='flex gap-2 items-center'>
                      <p className='font-bold text-base'>Quantity :</p>
                      <div className='flex'>
                        <div className='h-7 w-7 rounded-md bg-white border border-gray flex justify-center items-center' onClick={handleDecrement}>
                          <RxMinus size={20} />
                        </div>
                        <div className='h-7 w-7 rounded-md bg-white flex justify-center items-center'>
                          <input
                            className="h-8 w-8 text-center border border-gray rounded-md"
                            type="text"
                            min={1}
                            max={100}
                            disabled
                            value={quantity}
                          />
                        </div>
                        <div className='h-7 w-7 rounded-md bg-white border border-gray flex justify-center items-center' onClick={handleIncrement}>
                          <RxPlus size={20} />
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <p className='font-bold text-base'>Dimension : 1.22</p> <IoIosClose size={20} />
                      <input min={1} max={100} type='number' value={length} onChange={handleLengthChange} name='length' placeholder='Enter Length' className={`peer px-3 py-2 block  border rounded-md border-gray-200 text-sm placeholder:text-slate-400 disabled:opacity-50 disabled:pointer-events-none autofill:pb-2`} />
                    </div>
                    <p className='text-primary'>
                      <span className='font-bold text-base text-black'>Total Price :</span> Dhs. <span>{totalPrice}</span>.00
                    </p>

                    {productDetail.totalStockQuantity == null ? (
                      <p className="text-primary text-center text-2xl">Product is out of stock</p>
                    ) : (
                      <div className='flex gap-2'>
                        <button className='bg-primary rounded-md py-3 px-8 text-white' onClick={() => handleAddToCart(productDetail)} >Add To Cart</button>
                        <button className='bg-primary rounded-md py-3 px-3 text-white' onClick={() => handleAddToWishlist(productDetail)}><GoHeart size={25} /></button>
                      </div>
                    )}
                    <div className='flex items-center gap-2 text-black dark:text-white'>
                      <p className='font-medium text-lg'>Categories: </p>
                      <p className='text-dark'>All, Featured, Shoes</p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            <div className='bg-secondary mt-20'>
              <Container>
                <Tabs defaultActiveKey="1">
                  {tabData.map(tab => (
                    <TabPane tab={tab.label} key={tab.key}>
                      {tab.children}
                    </TabPane>
                  ))}
                </Tabs>
              </Container>
            </div>
          </>
          : null
      }
      <Container className='mt-20'>
        <h1 className='text-lg md:text-3xl mb-5'>Related Products</h1>
        <ProductSlider products={relatedProducts} loading={relatedProductsLoading} />
      </Container>
    </>
  )
}

export default Detail;
