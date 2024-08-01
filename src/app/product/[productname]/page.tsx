"use client"

import Container from 'components/Layout/Container/Container';
import Overlay from 'components/widgets/Overlay/Overlay';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import Review from 'components/Common/Review';
import { generateSlug } from 'data/Data';
import PRODUCTS_TYPES from 'types/interfaces';
import ProductDetails from 'components/product_detail/ProductDetails';

const { TabPane } = Tabs;

const Product = ({ params }: { params: { productname: string } }) => {
  const parsedProduct = params.productname ? params.productname : null;
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [productDetail, setProductDetail] = useState<PRODUCTS_TYPES | null>(null);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [relatedProducts, setRelatedProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [relatedProductsLoading, setRelatedProductsLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);


  const fetchReviews = async (productId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/getReviews/${productId}`);
      setReviews(response.data.reviews);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        if (parsedProduct && (response.data.products && response.data.products.length > 0)) {
          let slicedProducts = response.data.products.length > 4 ? response.data.products.filter((item: any) => generateSlug(item.name) !== parsedProduct).slice(0, 4) : response.data.products.filter((item: any) => generateSlug(item.name) !== parsedProduct)
          setProducts(slicedProducts);
          for (let key of response.data.products) {
            if (generateSlug(key.name) === parsedProduct) {
              setProductDetail(key);
              fetchRelatedProducts(key.category);
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
        setRelatedProducts(relatedProducts.slice(0, 4));
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

    {
      key: "4",
      label: 'Video',
      children: <><Review reviews={reviews} productId={productDetail?._id} fetchReviews={fetchReviews} /></>
    },
  ];




  


  return (
    <>
      <Overlay title='Product Detail' />
      {
        productsLoading ? <div className='flex justify-center items-center h-[20vh]'><Loader /></div> : productDetail ?
          <>
  
          <ProductDetails productDetail={productDetail}/>

            <div className='bg-white mt-20'>
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
        <div className='flex justify-center items-center'>
          
          <h1 className='w-fit text-center text-lg border-b-2 border-[#FF914E] md:text-3xl mb-5 up'>FEATURE PRODUCT</h1>

        </div>
        <ProductSlider />
      </Container>
    </>
  )
}

export default Product;
