"use client"
import axios from 'axios';
import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider'
import Container from 'components/Layout/Container/Container'
import React, { useEffect, useState } from 'react'
import PRODUCTS_TYPES from 'types/interfaces';

const HomeFeature = () => {
    const [allProducts, setAllProducts] = useState<PRODUCTS_TYPES[]>([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchAllProducts = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
          setAllProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAllProducts();
    }, []);
  return (
    <Container className="mt-10 ">
    <h1 className="text-[24px] text-heading text-center ">
    FEATURE PRODUCT
    </h1>
    <hr className="w-52 mx-auto border-primary"/>
    <ProductSlider products={allProducts} />
  </Container>
  )
}

export default HomeFeature