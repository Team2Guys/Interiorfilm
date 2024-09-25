"use client";
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import React, { useState, useEffect } from "react";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import axios from "axios";
import { generateSlug } from "data/Data";
import PRODUCTS_TYPES from "types/interfaces";
import ProductDetails from "components/product_detail/ProductDetails";
import { ProductSkeleton } from "components/Skeleton-loading/ProductSkelton";
import Loader from "components/Loader/Loader";
import Accordion from "components/widgets/Accordion";
import Collapse from "components/ui/Collapse/Collapse";
import Review from "components/Common/Review";

const Product = ({ productname }:{ productname: string  }) => {
  const parsedProduct = productname ? productname : null;
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [productDetail, setProductDetail] = useState<PRODUCTS_TYPES | null>(
    null
  );
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string | undefined>();
  const [reviews, setReviews] = useState<string[]>([]);
  const productHandler = async () => {
    try {
      setProductsLoading(true);

      const categoryRequest = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
      );
      const productRequest = await axios.get( `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
      const [categoryResponse, productResponse] = await Promise.all([
        categoryRequest,
        productRequest,
      ]);
      setProducts(productResponse.data.products);

      if (parsedProduct && productResponse.data.products.length > 0) {
        const foundProduct = productResponse.data.products.find(
          (item: any) => generateSlug(item.name) === parsedProduct
        );

        if (foundProduct) {
          setProductDetail(foundProduct);

          const foundCategory = categoryResponse.data.find(
            (cat: any) => cat._id === foundProduct.category
          );
          setCategoryName(foundCategory ? foundCategory.name : null);
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    productHandler();
  }, [parsedProduct]);
  const fetchReviews = async (productId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/getReviews/${productId}`
      );
      setReviews(response.data.reviews);
    } catch (err) {
      console.log("Failed to fetch reviews:", err);
    }
  };
  useEffect(() => {
    if (productDetail?._id) {
      fetchReviews(productDetail?._id);
    }
  }, [products]);

  const filteredProducts = products.filter(
    (product) => product.category === productDetail?.category
  );
  return (
    <>
      <Overlay title="Shop" />

      {productsLoading ? (
        <ProductSkeleton />
      ) : productDetail ? (
        <>
          <ProductDetails
            productDetail={productDetail}
            categoryName={categoryName}
          />
        </>
      ) : null}

      {productDetail ? (
        <>
          <div className="block lg:hidden mt-5">
            <Accordion detail={productDetail.modelDetails} />
            <Collapse title="Customer Reviews">
              <Review
                reviews={reviews}
                productId={productDetail?._id}
                fetchReviews={fetchReviews}
              />
            </Collapse>
          </div>
        </>
      ) : null}

      <Container className="mt-20">
        <div className="flex justify-center items-center">
          <h1 className="w-fit text-center text-lg border-b-2 border-primary md:text-3xl mb-5 uppercase tracking-[0.5rem]">
            recommended Product</h1>
        </div>
        <ProductSlider loading={productsLoading} products={filteredProducts} />
      </Container>
    </>
  );
};

export default Product;
