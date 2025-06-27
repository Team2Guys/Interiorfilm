"use client";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import Container from "components/Layout/Container/Container";
import { sortProductsByCode, specificProductCodesByCategory } from "data/Data";
import React, { useEffect, useState } from "react";
import PRODUCTS_TYPES from "types/interfaces";

const HomeFeature = ({ allProducts }: { allProducts: PRODUCTS_TYPES[] }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allProducts.length > 0) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [allProducts]);

  const getProductsByCodes = (codes: string[]) => {
    const products = allProducts.filter(product => codes.includes(product.code));
    return sortProductsByCode(products)
  };

  const featureProducts: any = Object.values(specificProductCodesByCategory).flat().sort();
  console.log(featureProducts)
  const filteredProducts = getProductsByCodes(featureProducts);
  console.log(filteredProducts)
  return (
    <Container className="mt-10 ">
      <h2 className="text-[24px] text-heading text-center tracking-widest">
        FEATURE PRODUCTS
      </h2>
      <hr className="2xsm:w-80 mx-auto border-primary h-1" />
      <ProductSlider loading={loading} products={filteredProducts} />
    </Container>
  );
};
export default HomeFeature;
