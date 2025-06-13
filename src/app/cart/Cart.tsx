"use client";
import React, { useState, useEffect } from "react";
import Table from "components/ui/Table/Table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "components/Layout/Container/Container";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import PRODUCTS_TYPES from "types/interfaces";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { GoLock } from "react-icons/go";

const Cart = ({products}: {products: PRODUCTS_TYPES[]}) => {
  const [cartItems, setCartItems] = useState([]);  // Holds the cart items
  const [total, setTotal] = useState(0);  // Holds the total price
  const [totalItems, setTotalItems] = useState(0);  // Holds the total item count
  const router = useRouter();

  // Calculate total price and total items based on the cart
  const calculateTotals = (items: any) => {
    const sub = items.reduce(
      (acc: number, item: any) => acc + item.totalPrice,
      0
    );
    const totalItems = items.reduce((acc: number, item: any) => {
      if (item.categoryName === "accessories") {
        return acc + item.count;  // For accessories, count by quantity
      } else {
        return acc + item.length;  // For non-accessories, count by length
      }
    }, 0);

    setTotal(sub);
    setTotalItems(totalItems);
    return totalItems;
  };

  // Fetch cart items from localStorage and calculate totals
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(existingCart);
    calculateTotals(existingCart);
  }, []);

  // Listen for cart changes and update state and totals
  useEffect(() => {
    const handleCartChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(updatedCart);
      calculateTotals(updatedCart);  // Recalculate totals when cart changes
    };

    window.addEventListener("cartChanged", handleCartChange);
    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  // const addToCart = (product: PRODUCTS_TYPES, index: number) => {
  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   const existingIndex = cart.findIndex(
  //     (item: any) => item.name === product.name && item.length === product.length
  //   );
  //   if (existingIndex !== -1) {
  //     const updatedProduct = cart[existingIndex];
  //     if (updatedProduct.count + 1 > updatedProduct.totalStockQuantity) {
  //       message.error(`Cannot add more than ${updatedProduct.totalStockQuantity} units of this product.`);
  //       return;
  //     }

  //     if (updatedProduct.count + 1 > 100) {
  //       message.error("Cannot add more than 100 units of this product.");
  //       return;
  //     }
  //     updatedProduct.count += 1;
  //     updatedProduct.totalPrice = updatedProduct.count * (updatedProduct.discountPrice || updatedProduct.price);
  //     cart[existingIndex] = updatedProduct;
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     setCartItems(cart);
  //     calculateTotals(cart);
  //     window.dispatchEvent(new Event("cartChanged"));
  //     message.success("Product quantity updated in the cart.");
  //   } else {
  //     // If the product doesn't exist in the cart, add it
  //     if (product.count > product.totalStockQuantity) {
  //       message.error(`Cannot add more than ${product.totalStockQuantity} units of this product.`);
  //       return;
  //     }

  //     if (product.count > 100) {
  //       message.error("Cannot add more than 100 units.");
  //       return;
  //     }

  //     const newProduct = {
  //       ...product,
  //       count: 1, // Initially add 1 unit
  //       totalPrice: (product.discountPrice || product.price) * 1, // Total price calculation
  //     };

  //     cart.push(newProduct);
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     setCartItems(cart);
  //     calculateTotals(cart);
  //     window.dispatchEvent(new Event("cartChanged"));
  //     message.success("Product added to the cart.");
  //   }
  // };

  // Handle cart changes (e.g., when a product is added, removed, or modified)
  
  const handleCartChange = (updatedCart: any) => {
    setCartItems(updatedCart);
    calculateTotals(updatedCart);
  };

  return (
    <>
      <Container className="grid grid-cols-12  items-center mt-5">
        <div className="col-span-12 md:col-span-4 2xl:col-span-2">
          <p className="text-[29px] text-center sm:text-start capitalize">
            Your shopping basket
          </p>
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
            <p className="text-11">Applies to orders of above <span className="font-currency text-13 font-normal"></span> 250.</p>
            <Link
              href={"/shipment-policy"}
              className="text-11 font-medium underline"
            >
              View details
            </Link>
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
                <button
                  className="flex gap-2 justify-center items-center px-6 py-2 bg-primary text-white hover:bg-black text-16"
                  onClick={() => router.back()}
                >
                  <FaArrowLeftLong />
                  Continue Shopping
                </button>
              </div>

              <div className="flex flex-col justify-center items-center space-y-2">
                <p className="text-13 font-semibold text-[#6F6969] sm:text-15 text-start w-full">
                  You have {totalItems} items in your cart{" "}
                  {/* Total items now reflect both accessories and non-accessories */}
                </p>
                <p className="text-13 font-semibold text-[#6F6969] sm:text-15 text-start w-full">
                  You have{" "}
                  {cartItems && cartItems.length > 0
                    ? cartItems.reduce((total: number, item: any) => {
                        return item.categoryName !== "accessories"
                          ? total + item.length
                          : total;
                      }, 0)
                    : 0}{" "}
                  (m) length in your cart
                </p>

                <p className="font-semibold sm:text-15 w-full flex justify-between text-[#6F6969]">
                  Subtotal:<span><span className="font-currency font-semibold text-17"></span> {total}</span>
                </p>
                <p className="font-normal w-full flex justify-between text-[#6F6969]">
                  Shipment Fee:<span> {total > 250 ? "Free" : <><span className="font-currency text-17 font-normal"></span> 20</>}</span>
                </p>

                <div className="flex flex-col gap-1 text-12 text-[#6F6969] border-t pt-3">
                  <p className="font-bold text-lg items-center w-full text-black flex justify-between">
                    Grand total:
                    <span><span className="font-currency font-bold text-19"></span> {total < 250 ? ` ${20 + total}` : total}</span>
                  </p>

                  <p className="flex items-center gap-1">
                    {" "}
                    <GoLock />
                    Secure Checkout - Shopping with us is always safe and secure
                  </p>
                </div>
                <button
                  className="flex gap-2 ml-auto items-center px-6 py-2 bg-black text-white hover:bg-primary text-16"
                  onClick={() => router.push("/checkout")}
                >
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
            <h2 className="w-fit text-center text-lg border-b-2 border-primary md:text-3xl mb-5  uppercase tracking-widest">
              Similar Products
            </h2>
          </div>
          <ProductSlider products={products} />
        </div>
      </Container>
    </>
  );
};

export default Cart;
