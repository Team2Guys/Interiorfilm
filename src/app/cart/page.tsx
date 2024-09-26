"use client";
import React, { useState, useEffect } from "react";
import Table from "components/ui/Table/Table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "components/Layout/Container/Container";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import axios from "axios";
import PRODUCTS_TYPES from "types/interfaces";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { GoLock } from "react-icons/go";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const router = useRouter();
  const [totalItems, setTotalItems] = useState(0);


  console.log(cartItems, "cartItemscartItems")
  const productHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
      );
      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error("Product data is not an array", response.data.products);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    productHandler();

  }, []);

  const calculateTotals = (items: any) => {
    const sub = items.reduce((acc: number, item: any) => { return acc + item.totalPrice; }, 0);
    console.log(sub, "sub")
    const totalItems = items.reduce((acc: number, item: any) => { return acc + item.count }, 0);
    setTotal(sub);
    setTotalItems(totalItems);
    return totalItems;
  };

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(existingCart); // Set the cart items
    calculateTotals(existingCart); // Calculate totals based on the cart items
  }, []);

  // Handle cart changes (e.g., when a product is added, removed, or modified)
  const handleCartChange = (updatedCart: any) => {
    setCartItems(updatedCart);
    calculateTotals(updatedCart);
    console.log(updatedCart, "sub")
    const totalItems = calculateTotals(updatedCart);
    setTotalItems(totalItems);
  };

  return (
    <>
      <Container className="grid grid-cols-12  items-center mt-5">
        <div className="col-span-12 md:col-span-4 2xl:col-span-2">
          <p className="text-[29px] text-center sm:text-start capitalize">Your shopping basket</p>
        </div>
        <div className="col-span-12 md:col-span-4 2xl:col-span-8">
          <h1
            className={`text-3xl font-medium text-black flex justify-center items-center gap-3 leading-loose uppercase`}
          >
            <span className="cursor-pointer">
              <svg
                onClick={() => router.back()}
                className={`fill-black`}
                width="55"
                height="25"
                viewBox="0 0 55 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M54.6404 14.3224H4.87739L17.3712 1.82617L15.7027 0.157654L0.360352 15.5024L15.7004 30.8424L17.3689 29.1739L4.87739 16.6824H54.6404V14.3224Z" />
              </svg>
            </span>
            CART
          </h1>
        </div>
        <div className="col-span-12 md:col-span-4 2xl:col-span-2 ">
          <p className="text-13 font-medium">Free Delivery</p>
          <div className="flex justify-between items-center">
            <p className="text-11">Applies to orders of above AED 250.</p>
            <Link href={"/shipment-policy"} className="text-11 font-medium underline">View details</Link>
          </div>
        </div>
      </Container>

      <Container className="mt-10  mb-20">
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center space-y-3">
            <p className="text-2xl">Your cart is empty.</p>
            <div>
              <Link className="underline" href={"/products?category=view-all"}>
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full ">
              <Table onCartChange={handleCartChange} />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full mt-3 md:mt-5 border-t-2 border-b-2 py-4 border-gray">
              <div className="hidden sm:block">
                <button className="flex gap-2 justify-center items-center px-6 py-2 bg-primary text-white hover:bg-black text-16" onClick={() => router.back()}>
                  <FaArrowLeftLong />
                  Continue Shopping
                </button>
              </div>

              <div className="flex flex-col justify-center items-center space-y-2">
                <p className="text-13 font-semibold text-[#6F6969] sm:text-15  text-start  w-full"> You have {totalItems} items in your cart </p>
                <p className="text-13 font-semibold text-[#6F6969] sm:text-15  text-start  w-full">
                  You have {cartItems && cartItems.length > 0 ? cartItems.reduce((total: number, item: any) => total + item.length, 0) : 0} (m) length in your cart
                </p>

                <p className="font-semibold sm:text-15 w-full flex justify-between text-[#6F6969]">Subtotal:<span>AED { total}</span></p>
                <p className="font-normal  w-full flex justify-between text-[#6F6969]">Shipment Fee:<span> {total > 250 ?  "Free" : "AED 20"  }</span></p>

                <div className="flex flex-col gap-1 text-12 text-[#6F6969] border-t pt-3">
                <p className="font-bold text-lg items-center w-full text-black flex justify-between">Grand total:<span>AED { total < 250 ? ` ${20+total}` : total }</span></p>

              <p className="flex items-center gap-1">   <GoLock />Secure Checkout - Shopping with us is always safe and secure</p>  
                </div>
                <button className="flex gap-2 ml-auto items-center px-6 py-2 bg-black text-white hover:bg-primary text-16" onClick={() => router.push("/checkout")}>
                  Secure Checkout
                  <FaArrowRightLong />
                </button>

                {/* <div className="flex items-center gap-1 text-12 text-[#6F6969]">
                  <GoLock />Secure Checkout - Shopping with us is always safe and secure
                </div> */}
              </div>

            </div>


          </>
        )}

        <div className="mt-10 md:mt-20">
          <div className="flex justify-center items-center">
            <h1 className="w-fit text-center text-lg border-b-2 border-primary md:text-3xl mb-5  uppercase tracking-widest">
              Similar Products
            </h1>
          </div>
          <ProductSlider products={products} />
        </div>
      </Container>
    </>
  );
};

export default Cart;
