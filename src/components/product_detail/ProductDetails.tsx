"use client";

import React, { Fragment, useEffect, useState } from "react";
import Thumbnail from "components/Carousel/Thumbnail/Thumbnail";
import { Rate, message } from "antd";
import { GoHeart } from "react-icons/go";
import PRODUCTS_TYPES from "types/interfaces";
import ProductSelect from "components/ui/Select/ProductSelect";
import { RxMinus, RxPlus } from "react-icons/rx";
import Button from "components/Common/Button";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import Image from "next/image";
import {
  PaymentMethods,
  tabbyfeature,
  tabbyhowitwork,
  tabbypayicon,
  tamarafeature,
  tamaralist,
  tamarawhy,
} from "data/Data";
import tamaraLogo from "./../../../public/images/logo/tamara-transparent.png";
import tabbyLogo from "./../../../public/images/logo/tabby-transparent.png";
import { FaRegStar } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import SideMenu from "./sideMenu";
import EnviromentIcons from "./enviroment-icon";
import axios from "axios";
import { useRouter } from "next/navigation";
interface productDetailsProps {
  productDetail: PRODUCTS_TYPES;
  categoryName?: string;
  firstFlex?: string;
  isQuickView?: boolean;
}
export default function ProductDetails({
  productDetail,
  categoryName,
  firstFlex,
  isQuickView,
}: productDetailsProps) {
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState<number>(1);
  const router = useRouter();
  const options =
    productDetail && productDetail.totalStockQuantity > 0
      ? Array.from(
          { length: Math.floor(productDetail.totalStockQuantity) },
          (_, i) => ({
            label: `1.22m x ${i + 1} METERS`,
            value: i + 1,
          })
        )
      : [];

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
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.star, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating();
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setQuantity(value);
    } else {
      message.error("Please enter a quantity between 1 and 100.");
    }
  };

  const handleAddToCart = (product: any) => {
    const newCartItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      discountPrice: product.discountPrice,
      totalStockQuantity: product.totalStockQuantity,
      count: quantity,
      length,
      totalPrice:
        (product.discountPrice || product.salePrice) * length * quantity, // Calculate total price based on length and quantity
      purchasePrice: product.purchasePrice,
      sizes: product.sizes,
      code: product.code,
    };

    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === product._id && item.length === length
    );

    if (existingItemIndex !== -1) {
      const existingItem = existingCart[existingItemIndex];
      existingItem.count += quantity;
      existingItem.totalPrice =
        (product.discountPrice || product.salePrice) *
        existingItem.count *
        length;
      existingCart[existingItemIndex] = existingItem;
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
      totalStockQuantity: product.totalStockQuantity,
      count: quantity,
      length,
      totalPrice:
        (product.discountPrice || product.salePrice) * length * quantity,
    };

    let existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingItemIndex = existingWishlist.findIndex(
      (item: any) => item.id === product._id && item.length === length
    );

    if (existingItemIndex !== -1) {
      const existingItem = existingWishlist[existingItemIndex];
      existingItem.count += quantity; // Increment count based on quantity
      existingItem.totalPrice =
        (product.discountPrice || product.salePrice) *
        existingItem.count *
        length;
      existingWishlist[existingItemIndex] = existingItem;
    } else {
      existingWishlist.push(newWishlistItem);
    }
    localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    message.success("Product added to Wishlist successfully!");
    window.dispatchEvent(new Event("WishlistChanged"));
  };

  useEffect(() => {
    if (productDetail) {
      const price = productDetail.discountPrice || productDetail.salePrice;
      setTotalPrice(price * length * quantity);
    }
  }, [length, quantity, productDetail]);

  const onChange = (value: number) => {
    setLength(value);
  };
  useEffect(() => {
    if (productDetail?._id) {
      fetchReviews(productDetail?._id);
    }
  }, [productDetail]);

  return (
    // xl:max-w-screen-2xl
    <div className="mt-10 mb-5 px-2 md:px-10  mx-auto ">
      <div className="flex flex-wrap lg:flex-nowrap lg:gap-5  mt-2 p-2 ">
        <div className={`w-full lg:w-8/12 ${firstFlex} `}>
          <Thumbnail
            detail={productDetail.modelDetails}
            product={productDetail}
            thumbs={productDetail.imageUrl}
          />
        </div>
        <div className="flex lg:w-4/12  flex-col gap-3">
          <div className="flex flex-wrap w-full justify-between flex-col md:flex-row ">
            <div
              className={`w-full xl:w-8/12  md:px-2 space-y-2 md:space-y-4 ${
                !isQuickView ? "md:w-3/3" : "w-full"
              }`}
            >
              <span className="divide-8">
                <h1 className="text-22 lg:text-[28px] text-[#000000] font-medium">
                  {productDetail.name}
                </h1>
                <h3 className="text-30  text-[#B9BBBF] font-medium">
                  {productDetail.code}
                </h3>
              </span>
              <hr className="text-[#E4E4E4]" />

              <div className="flex flex-wrap w-full justify-between">
                <div className="flex  flex-col ">
                  <p className="text-secondary font-poppins text-[25.92px] font-bold ">
                    AED{" "}
                    <span>
                      {productDetail.discountPrice
                        ? productDetail.discountPrice
                        : productDetail.salePrice}
                    </span>
                    /m
                  </p>
                  {productDetail.discountPrice ? (
                    <p className="line-through text-[#808080]">
                      AED <span>{productDetail.salePrice}</span>
                    </p>
                  ) : null}
                </div>
                {reviews.length && reviews.length > 0 ? (
                  <div className="flex flex-col flex-wrap gap-2 w-1/2 text-[10.67px]">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex gap-1 items-center bg-[#FBF3EA] w-[49.79px] h-[23px] p-2 rounded-xl text-[#D48D3B] max-w-fit ">
                        <FaRegStar /> {averageRating}.0
                      </div>
                      <div className="flex  items-center gap-1 bg-[#F5F5F5] px-3 rounded-xl h-[23px]">
                        <BiMessageDetail />
                        {reviews.length} Review
                      </div>
                    </div>
                    <div className="text-[#B9BBBF]">
                      {" "}
                      <span className="text-[#3E9242]">
                        {(averageRating / 5) * 100}%{" "}
                      </span>{" "}
                      of buyers have recommended this.
                    </div>
                  </div>
                ) : null}
              </div>

              <p className="font-medium text-16 text-text">
                Width : <span className="text-blak font-normal">1.22cm</span>
              </p>
              <div className="flex flex-wrap 2xl:flex-nowrap items-center gap-2">
                <p className="font-medium text-16 whitespace-nowrap text-text">
                  Select Quantity (m):
                </p>
                <ProductSelect
                  className="w-60 h-10 border outline-none shipment text-16"
                  onChange={onChange}
                  options={options}
                  value={length}
                />
              </div>
              {/* <div className="flex border w-28 h-10 justify-between px-2">
              <div
                onClick={handleDecrement}
                className="  flex justify-center items-center"
              >
                <RxMinus size={20} />
              </div>
              <div className="  flex justify-center items-center">
                <input
                  className="h-7 w-8 text-center"
                  type="text"
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <div
                onClick={handleIncrement}
                className="  flex justify-center items-center"
              >
                <RxPlus size={20} />
              </div>
            </div> */}
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

              <p className="  text-black text-21 font-bold ">
                <span className="font-medium 	text-[#535353]  mr-2">
                  Total Price :
                </span>
                AED <span>{totalPrice}</span>
              </p>

              {productDetail.totalStockQuantity == null ? (
                <p className="text-primary text-center text-2xl">
                  Product is out of stock
                </p>
              ) : (
                <Fragment>
                  <div className="flex  gap-1 md:gap-2">
                    <button
                      className="bg-secondary w-full  text-12 md:text-14 2xl:text-16  py-2 px-3 md:px-5 text-white "
                      onClick={() => {
                        handleAddToCart(productDetail);
                        router.push("/checkout");
                      }}
                    >
                      Buy Now
                    </button>
                    <button
                      className="bg-[#FA7F2C]  w-full   text-12 md:text-14 2xl:text-16   py-2  md:px-5 text-white text-center"
                      onClick={() => handleAddToCart(productDetail)}
                    >
                      Add To Cart
                    </button>
                  </div>

                  {/*                   
                  <Link
                    className="bg-[#2AB200]  w-full flex items-center gap-2 justify-center py-2 text-white"
                    href={`tel:${process.env.NEXT_PUBLIC_CONTACT_NUMBER}`}
                    
                  >
                    <BsWhatsapp /> Order on WhatsApp
                  </Link> */}

                  <Link
                    target="_blank"
                    href="https://wa.link/mb359y"
                    className="bg-[#2AB200]  w-full flex items-center gap-2 justify-center py-2 text-white"
                  >
                    <BsWhatsapp /> Order on WhatsApp
                  </Link>
                </Fragment>
              )}

              <div className="flex items-center justify-center relative mb-2 text-[#E4E4E4]">
                <span className="absolute left-0 w-1/6 border-t border-gray-300"></span>
                <p className="text-center px-3 w-4/6 whitespace-nowrap font-semibold text-[#000000] text-sm xs:text-base lg:text-xs xl:text-base">
                  Guaranteed Safe Checkout
                </p>
                <span className="absolute right-0 w-1/6 border-t border-gray-300"></span>
              </div>

              <div className="flex gap-2 mb-4">
                <div className="relative w-1/2 border-4 border-[#00FFBC] p-4 rounded-lg shadow">
                  <span className="absolute -top-3 left-2 bg-[#00FFBC] text-black px-2 py-1 rounded-lg text-xs font-extrabold">
                    tabby
                  </span>
                  <p className="text-12">
                    Pay 4 interest-free payments of AED 396.25.{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="text-red-600 underline cursor-pointer">
                          Learn more
                        </span>
                      </DialogTrigger>

                      <DialogOverlay className="bg-white/80" />
                      <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0 h-180 ">
                        {/* <DialogContent className="bg-red h-10"> */}
                        <DialogHeader>
                          <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                            Easy Monthly Installments
                          </DialogTitle>
                        </DialogHeader>
                        <div className="py-8 ps-5 xs:ps-10 md:ps-20 pe-4 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
                          <Image src={tabbyLogo} alt="logo" />
                          <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold mt-8 leading-10 xs:leading-tight">
                            <span className="rounded-full bg-[#3BFFC1] px-4 py-0 text-nowrap">
                              Shop now,
                            </span>
                            <br />
                            <span className="text-[#3BFFC1] text-outline-border  tracking-wider">
                              pay over time.
                            </span>
                          </h2>
                          <ul className='mt-14 font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl list-["–"] list-inside leading-normal md:leading-normal'>
                            {tabbyfeature.map((item) => (
                              <li key={item.id}>{item.para}</li>
                            ))}
                          </ul>
                          <div className="mt-12">
                            <h3 className="font-bold text-4xl sm:text-5xl">
                              How it works
                            </h3>
                            <ul className="font-medium text-xl xs:text-2xl md:text-3xl mt-8 md:leading-relaxed">
                              {tabbyhowitwork.map((item) => (
                                <li
                                  className="flex items-center gap-2"
                                  key={item.id}
                                >
                                  <span className="rounded-full bg-lightbackground min-w-10 h-10 flex items-center justify-center">
                                    {item.id}
                                  </span>
                                  <span className="w-full">{item.para}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex justify-end gap-2 mt-20 px-6">
                            {tabbypayicon.map((item, index) => (
                              <Image
                                src={item.imageUrl}
                                alt="master"
                                className="w-20 h-20 object-contain"
                                key={index}
                              />
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </p>
                </div>
                <div className="relative w-1/2 border-4 border-[#D47C84] p-4 rounded-lg shadow">
                  <span className="absolute -top-3 left-2 bg-gradient-to-r from-blue-300 via-orange-300 to-pink-300 text-black font-extrabold px-2 py-1 rounded-lg text-xs">
                    tamara
                  </span>
                  <p className="text-12">
                    Pay 4 interest-free payments of AED 396.25.{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="text-red-600 underline cursor-pointer">
                          Learn more
                        </span>
                      </DialogTrigger>

                      <DialogOverlay className="bg-white/80" />
                      <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0 h-180">
                        <DialogHeader>
                          <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                            Easy Monthly Installments
                          </DialogTitle>
                        </DialogHeader>
                        <div className="py-8 px-5 xs:px-10 md:px-20 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
                          <div className="text-center">
                            <Image
                              src={tamaraLogo}
                              alt="logo"
                              className="mx-auto"
                            />
                          </div>
                          <h2 className="text-center font-bold text-5xl mt-12">
                            Pay easier with Tamara
                          </h2>
                          <div className="px-4 py-2 bg-gradient-to-r from-orange-300 via-blue-300 to-pink-300 mt-12 rounded-[70px]">
                            <div className="bg-gradient-to-r from-orange-100 via-blue-100 to-pink-100 pb-6 pt-2 px-8 rounded-[70px] flex flex-col gap-4">
                              <div className="w-10/12 mx-auto">
                                {tamarafeature.map((item) => (
                                  <div
                                    className="flex justify-between items-center py-4"
                                    key={item.id}
                                  >
                                    <div>
                                      <h3 className="font-bold text-2xl">
                                        {item.title}
                                      </h3>
                                      <p className="text-md font-light mt-2">
                                        {item.para}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-10 px-5 xs:px-10 2xl:px-20">
                            <h3 className="font-bold text-2xl">Why Tamara?</h3>
                            <div className="flex items-center flex-wrap 2xl:flex-nowrap justify-center 2xl:justify-between gap-4 pt-6">
                              {tamarawhy.map((item) => (
                                <div
                                  className="w-48 h-9 rounded-2xl bg-primary text-white flex items-center justify-center text-20 font-semibold"
                                  key={item.id}
                                >
                                  {item.para}
                                </div>
                              ))}
                            </div>
                            <div className="mt-10">
                              <ul className="font-20 font-normal">
                                {tamaralist.map((item) => (
                                  <li
                                    className="flex items-center gap-2"
                                    key={item.id}
                                  >
                                    <span>({item.id})</span>
                                    <span>{item.para}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 justify-start  px-2 md:px-6 sp">
                {PaymentMethods.map((item, index) => (
                  <Image
                    src={item.imageUrl}
                    alt="master"
                    width={60}
                    height={60}
                    className="bg-white p-2 object-contain shadow-lg "
                    key={index}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-black dark:text-white">
                <p className="font-medium text-12 md:text-14">Categories: </p>
                <p className="text-dark text-12 md:text-14">{categoryName}</p>
              </div>
              <div>
                <p className="text-14 text-[#707070] font-light">
                  {productDetail?.description}
                </p>
              </div>
              <div>
                <ul className="px-6">
                  {productDetail?.spacification?.map(
                    (item: any, index: number) => (
                      <li
                        className="list-disc text-14 text-[#707070] font-light"
                        key={index}
                      >
                        {item.specsDetails}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            {!isQuickView && (
              <div className="w-full xl:w-4/12  ">
                <SideMenu />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h1 className="text-[14px] font-bold">Healthy Green Environment</h1>
            <EnviromentIcons />
          </div>
        </div>
      </div>
    </div>
  );
}
