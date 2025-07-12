"use client";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import Container from "components/Layout/Container/Container";
import { specificProductCodesByCategory } from "data/Data";
import React, { useEffect, useState } from "react";
import PRODUCTS_TYPES, { Categories_Types } from "types/interfaces";

const HomeFeature = ({ allProducts, categories }: { allProducts: PRODUCTS_TYPES[], categories: Categories_Types[] }) => {
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<PRODUCTS_TYPES[]>([]);

  // Get products by codes and match with categories
  const getProductsByCodes = (codes: string[]) => {
    const products = allProducts.filter(product => codes.includes(product.code));
    
    // Match products with their categories and sort by category name
    const productsWithCategory = products.map(product => {
      const category = categories.find(cat => cat._id === product.category);
      return {
        ...product,
        categoryName: category?.name || '',
      };
    });

    // Sort by category order/name, then by product code
    return productsWithCategory.sort((a, b) => {
      if (a.categoryName !== b.categoryName) {
        return a.categoryName.localeCompare(b.categoryName);
      }
      return a.code.localeCompare(b.code);
    });
  };

  useEffect(() => {
    if (allProducts.length > 0 && categories.length > 0) {
      const featureProducts: string[] = Object.values(specificProductCodesByCategory).flat().sort();
      const filtered = getProductsByCodes(featureProducts);
      setFilteredProducts(filtered);
      
      if (filtered.length > 0) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
  }, [allProducts, categories]);
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