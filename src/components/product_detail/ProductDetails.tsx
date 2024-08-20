"use client";

import React, { useEffect, useState } from "react";

import Container from "components/Layout/Container/Container";
import Thumbnail from "components/Carousel/Thumbnail/Thumbnail";
import { Rate, message } from "antd";
import { RxMinus, RxPlus } from "react-icons/rx";
import SelectList from "components/ui/Select/Select";
import { GoHeart } from "react-icons/go";
import PRODUCTS_TYPES from "types/interfaces";
import { detaildot } from "data/Data";
import ProductSelect from "components/ui/Select/ProductSelect";

interface productDetailsProps {
  productDetail: PRODUCTS_TYPES;
  categoryName?: any;
}

export default function ProductDetails({
  productDetail,
  categoryName,
}: productDetailsProps) {
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState<number>(1);
  console.log(productDetail, "productDetail productDetail");

  let options: any = [];

  if (productDetail && productDetail.totalStockQuantity > 0) {
    for (let i = 1; i <= Math.floor(productDetail.totalStockQuantity); i++) {
      let SizesArray = {
        label: `1.22 x ${i} METERS`,
        value: i, 
      };
      options.push(SizesArray);
    }
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.star, 0);
    return totalRating / reviews.length;
  };

  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    } else {
      message.error("Quantity cannot exceed 100.");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      message.error("Quantity cannot be less than 1.");
    }
  };

  const averageRating = calculateAverageRating();

  const handleAddToCart = (product: any) => {
    const newCartItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      discountPrice: product.discountPrice,
      count: quantity,
      length: length,
      totalPrice:
        (product.discountPrice || product.salePrice) * length * quantity,
      purchasePrice: product.purchasePrice,
      sizes: product.sizes,
    };

    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === product._id
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].length += length;
      existingCart[existingItemIndex].count += quantity;
      existingCart[existingItemIndex].totalPrice +=
        (product.discountPrice || product.salePrice) * length * quantity;
    } else {
      existingCart.push(newCartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    message.success("Product added to cart successfully!");
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
      totalPrice:
        (product.discountPrice || product.salePrice) * length * quantity,
    };

    let existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingItemIndex = existingWishlist.findIndex(
      (item: any) => item.id === product._id
    );

    if (existingItemIndex !== -1) {
      existingWishlist[existingItemIndex].length += length;
      existingWishlist[existingItemIndex].count += quantity;
      existingWishlist[existingItemIndex].totalPrice +=
        (product.discountPrice || product.salePrice) * length * quantity;
    } else {
      existingWishlist.push(newWishlistItem);
    }
    localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    message.success("Product added to Wishlist successfully!");
    window.dispatchEvent(new Event("WishlistChanged"));
  };
  const onChange = (value: string) => {
    console.log(value, "value")
    setLength(Number(value));
  };
  useEffect(() => {
    if (productDetail) {
      const price = productDetail.discountPrice || productDetail.salePrice;

      setTotalPrice(price * length * quantity);
    }
  }, [length, quantity, productDetail]);

  

  return (
      <div className="mt-10 mb-5 px-4 lg:px-10">
        <div className="flex flex-wrap lg:flex-nowrap gap-5  mt-2 p-2 ">
          <div className="w-full lg:w-8/12">
            <Thumbnail thumbs={productDetail.imageUrl} />
          </div>

          <div className="w-full lg:w-4/12 py-3 space-y-2 md:space-y-4 lg:max-w-[400px] ">
            <h1 className="text-22 lg:text-[28px] text-[#535353] font-medium">{productDetail.name}</h1>

            {reviews.length && reviews.length > 0 ? (
              <div className="flex gap-2">
                <Rate
                  className="text-primary product_starts"
                  value={averageRating}
                  disabled
                />
                <p className="flex items-center h-[30x] w-[30x]">
                  ({reviews.length})
                </p>
              </div>
            ) : null}

            <div className="flex gap-2">
              <p className="text-secondary font-poppins text-[28px] font-bold">
                Dhs.
                <span>
                  {productDetail.discountPrice
                    ? productDetail.discountPrice
                    : productDetail.salePrice}
                </span>
                .00
              </p>
              {productDetail.discountPrice ? (
                <p className="line-through text-light">
                  Dhs. <span>{productDetail.salePrice}</span>.00
                </p>
              ) : null}
            </div>
            <div className="flex gap-2 items-center w-[70%]">
            <ProductSelect
              className="w-full h-10 border outline-none shipment text-20"
              onChange={onChange}
              options={options}
              defaultValue="Select Size"
              stockQuantity={productDetail.totalStockQuantity || 0} // Pass stock quantity to SelectList
              length={length}
              
            />
            </div>
           
            
            <div className="space-y-3">
              <p className="font-medium text-12">Quantity :</p>
              <div className="flex justify-between border border-[#DDDDDD] w-26 p-1">
                <div
                  className="h-7 w-7  bg-white  border-gray flex justify-center items-center"
                  onClick={handleDecrement}
                >
                  <RxMinus size={20} />
                </div>
                <div className="h-7 w-7  flex justify-center items-center">
                  <input
                    className="h-8 w-8 text-center  rounded-md"
                    type="text"
                    min={1}
                    max={100}
                    disabled
                    value={quantity}
                  />
                </div>
                <div
                  className="h-7 w-7   border-gray flex justify-center items-center"
                  onClick={handleIncrement}
                >
                  <RxPlus size={20} />
                </div>
              </div>
            </div>

            <div>
            <p className="text-16">
              <span className=" text-text font-medium text-16 mr-2">
                Available Quantity:
              </span>
              {productDetail.totalStockQuantity &&
              productDetail.totalStockQuantity > 0
                ? "In Stock"
                : "Out Of Stock"}
            </p>
            </div>

            <p className="font-medium text-16 text-text">
              Width : <span className="text-blak font-normal">1.22 mm</span>
            </p>

            <p className="  text-black text-21 font-bold ">
              <span className="font-medium 	text-[#535353]  mr-2">
                Total Price :
              </span> 
                 Dhs. <span>{totalPrice}</span>.00
            </p>
          
            {productDetail.totalStockQuantity == null ? (
              <p className="text-primary text-center text-2xl">
                Product is out of stock
              </p>
            ) : (
              <div className="flex flex-wrap gap-1 md:gap-2">
                <button
                  className="bg-secondary text-12 md:text-16  py-2 px-3 md:px-5 text-white"
                 
                >
                  Order Now
                </button>
                <button
                  className="bg-secondary  text-12 md:text-16  py-2 px-3 md:px-5 text-white"
                  onClick={() => handleAddToCart(productDetail)} 
                >
                  Add To Cart
                </button>
                <button
                  className="bg-primary text-16 md:text-16  py-2 px-3 md:px-5 text-white"
                  onClick={() => handleAddToWishlist(productDetail)}
                >
                  <GoHeart />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 text-black dark:text-white">
              <p className="font-medium text-12 md:text-14">Categories: </p>
              <p className="text-dark text-12 md:text-14">{categoryName}</p>
            </div>
            <div>
              <p className="text-12 lg:text-14 text-[#707070] font-light">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            <div>
              <ul className="px-6 space-y-2">
                {detaildot.map(
                  (item: any, index: number) => (
                    <li className="list-disc text-12 lg:text-14 text-[#707070] font-light" key={index}>
                      {item.specsDetails}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* <div>
              <p className="text-14 text-[#707070] font-light">{productDetail?.description}</p>
            </div>
            <div>
              <ul className="px-6">
                {productDetail?.spacification?.map(
                  (item: any, index: number) => (
                    <li className="list-disc text-14 text-[#707070] font-light" key={index}>
                      {item.specsDetails}
                    </li>
                  )
                )}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
  );
}
