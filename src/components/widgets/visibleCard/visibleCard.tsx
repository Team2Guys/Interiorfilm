"use client";
import { Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const VisibleCard = () => {
  const [cartProduct, setCartProduct] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [cartVisible, setCartVisible] = useState(false);
  const [topClass, setTopClass] = useState("top-49");
  const cartRef = useRef<HTMLDivElement>(null);

  const fetchCartProducts = () => {
    const products = localStorage.getItem("cart");
    if (products && JSON.parse(products).length > 0) {
      const cartItems = JSON.parse(products || "[]");
      setCartProduct(cartItems);

      const sub = cartItems.reduce(
        (total: number, item: any) =>
          total + (item.discountPrice ?? item.price) * item.count,
        0
      );
      setSubtotal(sub);
      setCartVisible(true); // Show the cart when products are fetched
    } else {
      setCartVisible(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
    const handleCartChanged = () => {
      fetchCartProducts();
    };

    window.addEventListener("cartChanged", handleCartChanged);

    return () => {
      window.removeEventListener("cartChanged", handleCartChanged);
    };
  }, []);

  useEffect(() => {
    if (cartVisible) {
      const timer = setTimeout(() => {
        setCartVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [cartVisible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const removeItemFromCart = (index: number) => {
    Modal.confirm({
      title: "Confirm",
      icon: null,
      content: "Are you sure you want to remove this item from your cart?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        const updatedCart = [...cartProduct];
        updatedCart.splice(index, 1);
        setCartProduct(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartChanged"));
        fetchCartProducts();
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setTopClass("top-[9.45rem]");
      } else {
        setTopClass("top-49");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
    return (
      <>
        {cartVisible && (
          <div
            className={`max-w-screen-xl mx-auto right-0 sm:right-5 mt-2 fixed  z-50 hidden md:block ${topClass}`}
            ref={cartRef}
          >
          <div className="border sm:w-96 bg-white p-2">
            <div className="flex items-center justify-between">
              <p className="font-bold text-md-h6">SHOPPING CART</p>
              <IoIosClose
                className="cursor-pointer"
                size={30}
                onClick={() => setCartVisible(false)}
              />
            </div>
            <div className="max-h-52 border border-slate-100 overflow-y-scroll p-1 custom-scrollbar">
              {cartProduct.map((product, index) => (
                <div className="flex gap-2 mt-2 relative" key={index}>
                  <div className="absolute top-2 right-2">
                    <FaRegTrashAlt
                      onClick={() => removeItemFromCart(index)}
                      className="cursor-pointer"
                    />
                  </div>
                  <Image
                    className="rounded-md object-contain w-20 h-20"
                    width={100}
                    height={100}
                    src={product.imageUrl}
                    alt="image"
                  />
                  <div className="w-52">
                    <p className="text-[12px]">{product.name}</p>
                    <p className="text-12 font-bold">
                      <span>{product.count}</span> X
                    </p>
                    <p className="text-12 font-bold">
                      AED: <span>{product.discountPrice ?? product.price}</span>.00
                    </p>
                    <p className="text-12 font-bold mt-5 absolute bottom-0 right-0">
                      AED <span>{(product.discountPrice ?? product.price) * product.count}</span>.00
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-end mt-2 mb-2">
              <p className="font-bold">
                Total: AED <span>{subtotal}</span>.00
              </p>
            </div>
            <p className="text-[12px]">
              *ALL ORDERS MAY TAKE 48 HOURS TO BE DELIVERED TO YOUR DOORSTEP
            </p>
            <div className="w-full mt-2 space-y-1">
              <Link
                href="/cart"
                className="w-full block text-center bg-black text-white py-1"
              >
                View Cart
              </Link>
              <button
                className="border w-full border-black hover:bg-black hover:text-white transition duration-300 py-1"
                onClick={() => setCartVisible(false)}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VisibleCard;
