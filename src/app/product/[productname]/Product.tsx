"use client";
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import React, { useState, 
 } from "react";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import ProductDetails from "components/product_detail/ProductDetails";
import Accordion from "components/widgets/Accordion";

interface IPRODS{
  productname: string,
  filteredProducts:any,
   productDetail:any, 
   categoryName: any  
}

const Product = ({ productname,filteredProducts, productDetail,categoryName }: IPRODS) => {

  const parsedProduct = productname ? productname : null;
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  console.log(parsedProduct, setProductsLoading)
 
  return (
    <>
      <Overlay title="Shop" />

      {
      productDetail ? (
        <>
          <ProductDetails
            productDetail={productDetail}
            categoryName={categoryName}
            isAccessory={categoryName === 'accessories'}
          />
        </>
      ) : null}

      {productDetail ? (
        <>
          <div className="block lg:hidden mt-5">
            <Accordion/>
          </div>
        </>
      ) : null}

      <Container className="mt-20">
        <div className="flex justify-center items-center">
          <h1 className="w-fit text-center text-lg border-b-2 border-primary md:text-3xl mb-5 uppercase tracking-[0.5rem]">
            recommended Products</h1>
        </div>
        <ProductSlider loading={productsLoading} products={filteredProducts} />
      </Container>
    </>
  );
};

export default Product;
