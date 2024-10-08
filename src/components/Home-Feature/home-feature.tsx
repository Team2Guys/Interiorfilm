"use client";
import axios from "axios";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import Container from "components/Layout/Container/Container";
import React, { useEffect, useState } from "react";
import PRODUCTS_TYPES from "types/interfaces";

const HomeFeature = () => {
  const [allProducts, setAllProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
        );
        setAllProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const getProductsByCodes = (codes: string[]) => {
    return allProducts.filter(product => codes.includes(product.code));
  };

  const filteredProducts = getProductsByCodes(["KH6003", "KH6005", "KH6012", "KS6015", "KH6013", "KH6004", "KH6006", "KH6016", "KH6002", "KH6009", "KH6007", "KH6017", "KH6018", "KH6001", "KH6014"]);

  return (
    <Container className="mt-10 ">
      <h1 className="text-[24px] text-heading text-center tracking-widest">
        FEATURE PRODUCT
      </h1>
      <hr className="2xsm:w-80 mx-auto border-primary h-1" />

      {/* Pass filtered products to the ProductSlider */}
      <ProductSlider loading={loading} products={filteredProducts} />
    </Container>
  );
};

export default HomeFeature;
