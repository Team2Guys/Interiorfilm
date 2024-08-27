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
import Accordion from 'components/widgets/Accordion';

const { TabPane } = Tabs;

const Product = ({ params }: { params: { productname: string } }) => {
  const parsedProduct = params.productname ? params.productname : null;
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [productDetail, setProductDetail] = useState<PRODUCTS_TYPES | null>(null);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [relatedProducts, setRelatedProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [relatedProductsLoading, setRelatedProductsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string | any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  // Fetch reviews for the product
  const fetchReviews = async (productId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/getReviews/${productId}`);
      setReviews(response.data.reviews);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  // Fetch categories and products
  const productHandler = async () => {
    try {
      setProductsLoading(true);

      // Fetch categories and products concurrently
      const categoryRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
      const productRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);

      const [categoryResponse, productResponse] = await Promise.all([categoryRequest, productRequest]);

      setProducts(productResponse.data.products);
      setCategories(categoryResponse.data);

      // If parsedProduct is defined, find product details and related category
      if (parsedProduct && productResponse.data.products.length > 0) {
        const foundProduct = productResponse.data.products.find((item: any) => generateSlug(item.name) === parsedProduct);

        if (foundProduct) {
          setProductDetail(foundProduct);
          fetchRelatedProducts(foundProduct.category);

          // Find the category name based on the category ID
          const foundCategory = categoryResponse.data.find((cat: any) => cat._id === foundProduct.category);
          setCategoryName(foundCategory ? foundCategory.name : null);
        }
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  // Fetch related products
  const fetchRelatedProducts = async (categoryId: string) => {
    try {
      setRelatedProductsLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
      const relatedProducts = response.data.products.filter(
        (product: any) => product.category === categoryId && generateSlug(product.name) !== parsedProduct
      );
      setRelatedProducts(relatedProducts.slice(0, 4));
    } catch (error) {
      console.log('Error fetching related products:', error);
    } finally {
      setRelatedProductsLoading(false);
    }
  };

  // UseEffect to fetch products and categories on load
  useEffect(() => {
    productHandler();
  }, [parsedProduct]);

 
  return (
    <>
      <Overlay title='Product Detail' />
      {
        productsLoading ? (
          <div className='flex justify-center items-center h-[20vh]'><Loader /></div>
        ) : productDetail ? (
          <>
            <ProductDetails 
              productDetail={productDetail} 
              categoryName={categoryName}  // Pass category name here
            />

         <Review reviews={reviews} productId={productDetail?._id} fetchReviews={fetchReviews} />
          </>
        ) : null
      }
      <div className='block lg:hidden'>
      <Accordion/>

      </div>
      <Container className='mt-20'>
        <div className='flex justify-center items-center'>
          <h1 className='w-fit text-center text-lg border-b-2 border-[#FF914E] md:text-3xl mb-5 up'>FEATURE PRODUCT</h1>
        </div>
        <ProductSlider />
      </Container>
    </>
  );
};

export default Product;
