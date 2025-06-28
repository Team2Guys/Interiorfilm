"use client";
import Container from "components/Layout/Container/Container";
import Overlay from "components/widgets/Overlay/Overlay";
import { useEffect, useState } from "react";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import PRODUCTS_TYPES from "types/interfaces";
import ProductDetails from "components/product_detail/ProductDetails";
import Accordion from "components/widgets/Accordion";
import ProductSkeleton from "components/Skeleton-loading/ProductSkelton";

const Product = ({ products, productDetail, categoryName, productsAdon }: { products: PRODUCTS_TYPES[], productDetail: PRODUCTS_TYPES, categoryName: string, productsAdon?: PRODUCTS_TYPES[] }) => {
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  // const fetchReviews = async (productId: string) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/getReviews/${productId}`
  //     );
  //     setReviews(response.data.reviews);
  //   } catch (err) {
  //     console.log("Failed to fetch reviews:", err);
  //   }
  // };
  // useEffect(() => {
  //   if (productDetail?._id) {
  //     fetchReviews(productDetail?._id);
  //   }
  // }, [products]);

  useEffect(() => {
    setProductsLoading(true)
    if (productDetail) {
      setTimeout(() => {
        setProductsLoading(false)
      }, 1000)
    }
  }, [productDetail])

  let filteredProducts = products.filter(
    (product) => product.category === productDetail?.category
  );

  if (filteredProducts.length === 0) {
    filteredProducts = productsAdon || []
  }
  return (
    <>
      <Overlay title="Shop" />

      {productsLoading ? <ProductSkeleton /> : productDetail ? (
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
            <Accordion />
          </div>
        </>
      ) : null}

      <Container className="mt-20">
        <div className="flex justify-center items-center">
          <p className="w-fit text-center text-lg border-b-2 border-primary md:text-3xl mb-5 uppercase tracking-[0.5rem]">
            recommended Products</p>
        </div>
        <ProductSlider loading={productsLoading} products={filteredProducts} />
      </Container>
    </>
  );
};

export default Product;
