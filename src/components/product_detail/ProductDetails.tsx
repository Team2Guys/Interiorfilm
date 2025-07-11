"use client";

import React, { Fragment, useEffect, useState } from "react";
import Thumbnail from "components/Carousel/Thumbnail/Thumbnail";
import { message } from "antd";
import PRODUCTS_TYPES from "types/interfaces";
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
  generateSlug,
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
import SideMenu, { Product } from "./sideMenu";
import EnviromentIcons from "./enviroment-icon";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProductSelect from "components/ui/Select/ProductSelect";
interface productDetailsProps {
  productDetail: PRODUCTS_TYPES;
  categoryName?: string;
  firstFlex?: string;
  isQuickView?: boolean;
  isAccessory?: boolean;
}
export default function ProductDetails({
  productDetail,
  categoryName,
  firstFlex,
  isQuickView,
  isAccessory,
}: productDetailsProps) {
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState<number>(1);
  const [adsonProducts, setAdsonProducts] = useState<Product[]>([])
  const router = useRouter();
  console.log(setQuantity, "setQuantity", adsonProducts)
  const Acessoptions =
    productDetail && productDetail.totalStockQuantity > 0
      ? Array.from(
        { length: Math.floor(productDetail.totalStockQuantity) },
        (_, i) => ({
          label: `${i + 1}`,
          value: i + 1,
        })
      )
      : [];
  const options =
    productDetail && productDetail.totalStockQuantity > 0
      ? Array.from(
        { length: Math.floor(productDetail.totalStockQuantity) },
        (_, i) => ({
          label: `1.22m x ${i + 1}m`,
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
    return (totalRating / reviews.length).toFixed(2); // Convert to 2 decimal places
  };

  const averageRating = calculateAverageRating();


  const handleAddToCart = (product: any, buynow?: string) => {
    const maxPerProduct = 100;
    const currentStock = product.totalStockQuantity;
    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const Total_length = existingCart.reduce((accum: any, value: any) => {

      if (value.id == product.id) {

        return (accum += value.length)
      }
    }, 0)

    if (Total_length >= product.totalStockQuantity) {

      message.error("Cannot add to cart. Exceeds available stock!");

      return;
    }

    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product._id);

    if (existingItemIndex !== -1) {
      const existingItem = existingCart[existingItemIndex];
      const totalRequestedQuantity = existingItem.length + length;

      if (totalRequestedQuantity > currentStock) {
        message.error(`You can't add more than the available stock (${currentStock}).`);
        return;
      }

      if (totalRequestedQuantity > maxPerProduct) {
        message.error(`You can't buy more than ${maxPerProduct} units of this product.`);
        return;
      }

      existingItem.length += length;
      existingItem.totalPrice =
        (product.discountPrice || product.salePrice) * existingItem.length;
      existingCart[existingItemIndex] = existingItem;
    } else {
      if (length > currentStock) {
        message.error(`You can't add more than the available stock (${currentStock}).`);
        return;
      }

      if (length > maxPerProduct) {
        message.error(`You can't buy more than ${maxPerProduct} units of this product.`);
        return;
      }

      const newCartItem = {
        id: product._id,
        name: product.name,
        price: product.salePrice,
        imageUrl: product.posterImageUrl?.imageUrl,
        discountPrice: product.discountPrice,
        totalStockQuantity: product.totalStockQuantity,
        count: 1,
        length,
        totalPrice:
          (product.discountPrice || product.salePrice) * length,
        purchasePrice: product.purchasePrice,
        sizes: product.sizes,
        code: product.code,
        categoryName: categoryName,
      };

      existingCart.push(newCartItem);
    }


    localStorage.setItem("cart", JSON.stringify(existingCart));

    message.success("Product added to cart successfully!");

    window.dispatchEvent(new Event("cartChanged"));

    buynow ? router.push("/checkout") : null
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
    <div className="mt-10 mb-5 px-2 md:px-10  mx-auto xl:max-w-screen-3xl">
      <div className="flex flex-wrap lg:flex-nowrap gap-4  mt-2 p-2 ">
        <div className={`w-full lg:w-8/12 xl:w-7/12 ${firstFlex} `}>
          <Thumbnail
            thumbs={productDetail.imageUrl}
          />
        </div>
        <div className="flex lg:w-4/12 xl:w-5/12  flex-col ">
          <div className="flex flex-wrap xl:flex-nowrap w-full justify-between flex-col md:flex-row gap-4">
            <div
              className={`w-full md:px-2 space-y-2 md:space-y-4 ${!isQuickView ? "md:w-3/3 xl:w-8/12" : "w-full xl:w-12/12"
                }`}
            >
              <div>
                <h1 className="text-22 lg:text-[28px] text-[#000000] font-medium">
                  {productDetail?.name || ""}
                </h1>
                <p className="text-30  text-[#B9BBBF] font-medium">
                  {productDetail.code}
                </p>
              </div>
              <hr className="text-[#E4E4E4]" />

              <div className="flex flex-wrap w-full justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-secondary font-poppins text-[25.92px] font-bold ">
                    <span className="font-currency text-[28px]"></span>{" "}
                    <span>
                      {productDetail.discountPrice
                        ? productDetail.discountPrice
                        : productDetail.salePrice}
                    </span>
                    {!isAccessory && (<span>/m</span>)}
                  </p>
                  {productDetail.discountPrice ? (
                    <p className="line-through text-[#808080]">
                      <span className="font-currency text-18"></span> <span>{productDetail.salePrice}</span>
                    </p>
                  ) : null}
                </div>
                {reviews.length && reviews.length > 0 ? (
                  <div className="flex flex-col flex-wrap gap-2 w-1/2 text-[10.67px]">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex gap-1 items-center bg-[#FBF3EA] w-[49.79px] h-[23px] p-2 rounded-xl text-[#D48D3B] max-w-fit ">
                        <FaRegStar /> {averageRating}
                      </div>
                      <div className="flex  items-center gap-1 bg-[#F5F5F5] px-3 rounded-xl h-[23px]">
                        <BiMessageDetail />
                        {reviews.length} Review
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {!isAccessory && (
                <p className="font-medium text-16 text-text">
                  Roll width is <span className="text-black">122cm</span>
                </p>
              )}
              {isAccessory ? (
                <div className="flex flex-wrap 2xl:flex-nowrap items-center gap-2">
                  <p className="font-medium text-16 whitespace-nowrap text-text">
                    Select Quantity:
                  </p>
                  <ProductSelect
                    className="w-60 h-10 border outline-none shipment text-16"
                    onChange={onChange}
                    options={Acessoptions}
                    value={length}
                  />
                </div>

              ) : (
                <div className="flex flex-wrap 2xl:flex-nowrap items-center gap-2">
                  <p className="font-medium text-16 whitespace-nowrap text-text">
                    Select Quantity:
                  </p>
                  <ProductSelect
                    className="w-60 h-10 border outline-none shipment text-16"
                    onChange={onChange}
                    options={options}
                    value={length}
                  />
                </div>
              )}
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
                <span className="font-currency text-23"></span> <span>{totalPrice}</span>
              </p>

              {productDetail.totalStockQuantity == 0 || productDetail.totalStockQuantity <= 0 ? (
                <>
                  <p className="text-primary text-center text-2xl">
                    Product is out of stock
                  </p>
                  <Link
                    target="_blank"
                    href="https://wa.link/mb359y"
                    className="bg-[#2AB200]  w-full flex items-center gap-2 justify-center py-2 text-white"
                  >
                    <BsWhatsapp /> Order on WhatsApp
                  </Link>
                </>

              ) : (
                <Fragment>
                  <div className="flex  gap-1 md:gap-2">
                    <button
                      className="bg-secondary w-full  text-12 md:text-14 2xl:text-16  py-2 px-3 md:px-5 text-white "
                      onClick={() => {
                        handleAddToCart(productDetail, "buynow");

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
                  <span className="absolute -top-3 left-2 bg-[#00FFBC]  px-2 py-1 rounded-lg text-xs font-extrabold">
                    tabby
                  </span>
                  <div className="text-12">
                    Pay 4 interest-free payments of <span className="font-currency text-14"></span>{" "}
                    {totalPrice && (totalPrice / 4).toFixed()}{" "}
                    <Dialog>
                      <DialogTrigger asChild className="text-red">
                        <span className=" underline cursor-pointer" style={{ color: "red" }}>
                          Learn more
                        </span>
                      </DialogTrigger>

                      <DialogOverlay className="bg-black/60 z-999999" />
                      <DialogContent className="sm:max-w-[80%] mt-10 lg:max-w-[60%] z-999999 bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0 h-180 ">

                        <DialogHeader>
                          <DialogTitle className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                            Easy Monthly Installments
                          </DialogTitle>
                        </DialogHeader>
                        <div className="py-5 ps-5 xs:ps-10 md:ps-20 pe-4 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
                          <Image src={tabbyLogo} alt="tabby logo" />
                          <p className="text-xl xs:text-2xl sm:text-lg md:text-xl font-bold mt-5 leading-10 xs:leading-tight">
                            <span className="rounded-full bg-[#3BFFC1] px-4 py-0 text-nowrap">
                              Shop now,
                            </span>
                            <br />
                            <span className="text-[#3BFFC1] text-outline-border  tracking-wider">
                              pay over time.
                            </span>
                          </p>
                          <ul className='mt-5 font-bold text-lg xs:text-2xl sm:text-xl md:text-xl list-["–"] list-inside leading-normal md:leading-normal'>
                            {tabbyfeature.map((item) => (
                              <li key={item.id}>{item.para}</li>
                            ))}
                          </ul>
                          <div className="mt-5">
                            <h3 className="font-bold text-2xl sm:text-3xl">
                              How it works
                            </h3>
                            <ul className="font-medium text-lg xs:text-xl md:text-2xl mt-3 md:leading-relaxed">
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

                          <div className="flex justify-end gap-2 mt-5 px-6">
                            {tabbypayicon.map((item, index) => (
                              <Image
                                src={item.imageUrl}
                                alt="card icon"
                                className="w-20 h-20 object-contain"
                                key={index}
                              />
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="relative w-1/2 border-4 border-[#D47C84] p-4 rounded-lg shadow">
                  <span className="absolute -top-3 left-2 bg-gradient-to-r from-blue-300 via-orange-300 to-pink-300 text-black font-extrabold px-2 py-1 rounded-lg text-xs">
                    tamara
                  </span>
                  <div className="text-12">
                    Pay 4 interest-free payments of <span className="font-currency text-14"></span>{" "}
                    {totalPrice && (totalPrice / 4).toFixed()}{" "}
                    <Dialog>
                      <DialogTrigger asChild className="text-red">
                        <span className=" underline cursor-pointer">
                          Learn more
                        </span>
                      </DialogTrigger>

                      <DialogOverlay className="bg-black/60  z-999999 " />
                      <DialogContent className="sm:max-w-[80%] mt-10 lg:max-w-[60%] z-999999  bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0 h-180">
                        <DialogHeader>
                          <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10 ">
                            Easy Monthly Installments
                          </DialogTitle>
                        </DialogHeader>
                        <div className="py-8 px-5 xs:px-10 md:px-20 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
                          <div className="text-center">
                            <Image
                              src={tamaraLogo}
                              alt="tamara logo"
                              className="mx-auto"
                            />
                          </div>
                          <p className="text-center font-bold text-2xl mt-5">
                            Pay easier with Tamara
                          </p>
                          <div className="px-4 py-2 bg-gradient-to-r from-orange-300 via-blue-300 to-pink-300 mt-4 rounded-[70px]">
                            <div className="bg-gradient-to-r from-orange-100 via-blue-100 to-pink-100 pb-6 pt-1 px-8 rounded-[70px] flex flex-col gap-2">
                              <div className="w-10/12 mx-auto">
                                {tamarafeature.map((item) => (
                                  <div
                                    className="flex justify-between items-center py-2"
                                    key={item.id}
                                  >
                                    <div>
                                      <h3 className="font-bold text-lg">
                                        {item.title}
                                      </h3>
                                      <p className="text-md font-light mt-1">
                                        {item.para}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 px-5 xs:px-10 2xl:px-20">
                            <h3 className="font-bold text-2xl">Why Tamara?</h3>
                            <div className="flex items-center flex-wrap 2xl:flex-nowrap justify-center 2xl:justify-between gap-4 pt-4">
                              {tamarawhy.map((item) => (
                                <div
                                  className="w-auto px-2 h-9 rounded-2xl bg-primary text-white flex items-center justify-center text-20 font-semibold"
                                  key={item.id}
                                >
                                  {item.para}
                                </div>
                              ))}
                            </div>
                            <div className="mt-5">
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
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 justify-between items-center px-2 md:px-0 bg-white  ">
                {PaymentMethods.map((item, index) => (
                  <Image
                    src={item.imageUrl}
                    alt="card icon"
                    width={60}
                    height={60}
                    className="object-contain shadow p-1 "
                    key={index}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-black dark:text-white">
                <p className="font-semibold text-12 md:text-16">Category: </p>
                <Link href={`/products?category=${generateSlug(categoryName ? categoryName : "")}`} className="font-semibold hover:text-primary text-12 md:text-16">{categoryName}</Link>
              </div>
              <div>
                <p className="text-14 md:text-16 font-normal">
                  {productDetail?.description}
                </p>
              </div>
              <div>
                <ul className="px-4">
                  {productDetail?.spacification?.map(
                    (item: any, index: number) => (
                      <li
                        className="list-disc text-14 text-black font-normal"
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
                <SideMenu setAdsonProducts={setAdsonProducts} />
              </div>
            )}
          </div>
          {!isAccessory && (
            <div className="flex flex-col gap-2 mt-5 md:mt-10">
              <EnviromentIcons />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
