import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import {message } from "antd";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import Link from "next/link";
import PRODUCTS_TYPES from "types/interfaces";
import { IoIosClose } from "react-icons/io";
import { RxMinus, RxPlus } from "react-icons/rx";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}
const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  onMouseEnter,
  onMouseLeave
}) => {
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [lengths, setLengths] = useState<{ [key: number]: number }>({});
  const [cartItems, setCartItems] = useState<PRODUCTS_TYPES[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCartItems();
    const handleCartChange = () => {
      fetchCartItems();
    };
    window.addEventListener("cartChanged", handleCartChange);
    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  const fetchCartItems = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const validCartItems = existingCart.map((item: any) => ({
      ...item,
      totalPrice: Number(item.totalPrice) || 0,
    }));
    setCartItems(validCartItems);
    setCounts(
      validCartItems.reduce((acc: any, item: any, index: number) => {
        acc[index] = item.count || 1;
        return acc;
      }, {})
    );
    setLengths(
      validCartItems.reduce((acc: any, item: any, index: number) => {
        acc[index] = item.length || 1;
        return acc;
      }, {})
    );
    calculateSubtotal(validCartItems);
  };
  
  const increment = (index: number) => {
    const newLengths = { ...lengths };
    const item = cartItems[index];
  
    if (newLengths[index] < item.totalStockQuantity && newLengths[index] < 100) {
      newLengths[index] = (newLengths[index] || 1) + 1;
      setLengths(newLengths);
      updateTotalPrice(index, counts[index], newLengths[index]);
    } else {
      message.error(
        newLengths[index] >= item.totalStockQuantity
          ? `Cannot exceed available stock (${item.totalStockQuantity}).`
          : "Cannot be more than 100."
      );
    }
  };
  
  const decrement = (index: number) => {
    const newLengths = { ...lengths };
    if (newLengths[index] > 1) {
      newLengths[index] -= 1;
      setLengths(newLengths);
      updateTotalPrice(index, counts[index], newLengths[index]);
    } else {
      message.error("Cannot be less than 1.");
    }
  };
  
  // useEffect(()=>{
  //   fetchCartItems()
  // },[lengths])

  const onLengthChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const item = cartItems[index];
  
    if (!isNaN(value)) {
      if (value >= 1 && value <= 100 && value <= item.totalStockQuantity) {
        const newLengths = { ...lengths, [index]: value };
        setLengths(newLengths);
        updateTotalPrice(index, counts[index], value);
      } else {
        message.error(
          value > item.totalStockQuantity
            ? `Cannot exceed available stock (${item.totalStockQuantity}).`
            : "Please enter a valid length between 1 and 100 meters."
        );
      }
    } else {
      message.error("Please enter a valid number.");
    }
  };
  const updateTotalPrice = (index: number, newCount: number, length: number) => {
    const updatedData = [...cartItems];
    const item = updatedData[index];
  
    if (length > item.totalStockQuantity || length > 100) {
      message.error(
        length > item.totalStockQuantity
          ? `Cannot exceed available stock (${item.totalStockQuantity}).`
          : "Cannot be more than 100."
      );
      return;
    }
  
    item.count = newCount;
    item.length = length;
    item.totalPrice =
      (item.discountPrice || item.price) * length * newCount;
    item.totalPrice = Number(item.totalPrice) || 0;
  
    setCartItems(updatedData);
    localStorage.setItem("cart", JSON.stringify(updatedData));
    calculateSubtotal(updatedData);
  };

  const calculateSubtotal = (items: PRODUCTS_TYPES[]) => {
    const sub = items.reduce((acc, item, index) => {
      const price = item.discountPrice || item.price;
      const length = lengths[index] || item.length;
      const count = counts[index] || item.count;
      return acc + price * length * count;
    }, 0);
    console.log(sub)
    const sub2 = items.reduce((acc: number, item: any) => { return acc + item.totalPrice; }, 0);
    setSubtotal(sub2);
  };

  const removeItem = (index: number) => {
        const newCartItems = cartItems.filter(
          (_, itemIndex) => itemIndex !== index
        );
        setCartItems(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        calculateSubtotal(newCartItems);
        message.success("Product removed from cart successfully!");
        window.dispatchEvent(new Event("cartChanged"));
  };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
  
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, onClose]);

  return (
    <>
    {open && (
        <div className="  right-0 sm:right-5 top-20 mt-2 fixed z-999 " onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div className="border sm:w-96  bg-white p-2" ref={drawerRef}>
            <div className="flex items-center justify-between">
              <p className="font-bold text-md-h6">SHOPPING CART</p>
              <IoIosClose
                className="cursor-pointer"
                size={30}
                onClick={() => onClose()} 
              />
            </div>
            <div className="max-h-52 border border-slate-100 overflow-y-scroll p-1 custom-scrollbar">
              
            {cartItems.length > 0 ? cartItems.map((item: any, index: number) => {
          return (
            <div key={index} className="rounded-md shadow p-2 mt-5 bg-white">
              <div className="space-y-2">
                <div className="flex gap-3">
                  <div className="relative">
                    <div className="bg-gray p-1 rounded-md">
                      <Image
                        className="w-16 h-16 bg-contain"
                        width={80}
                        height={80}
                        src={item.imageUrl || "/default-image.png"}
                        alt={item.name}
                      />
                    </div>
                    <div className="absolute -top-2 -right-1">
                      <div
                        className="bg-white shadow h-3 w-3 rounded-full cursor-pointer"
                        onClick={() => removeItem(index)}
                      >
                        <IoCloseSharp size={12} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 w-8/12">
                    <h1 className="text-12 md:text-14 font-semibold">{item.name}</h1>
                    <p className="text-12 md:text-14">
                    <span className="font-currency font-normal"></span>
                      <span>
                        {item.discountPrice || item.price}
                      </span>
                   
                    </p>
                    <div className="flex border w-28 h-8 justify-between px-2">
                            <div
                              onClick={() => decrement(index)}
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
                                disabled
                                value={lengths[index] || item.length}
                                onChange={(e) => onLengthChange(index, e)}
                              />
                            </div>
                            <div
                              onClick={() => increment(index)}
                              className="  flex justify-center items-center"
                            >
                              <RxPlus size={20} />
                            </div>
                          </div>
                 
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <h1 className="font-bold">Total: </h1>
                  <p>
                  <span className="font-currency font-bold"></span> <span>
                        {item.totalPrice !== null && item.totalPrice !== undefined && !isNaN(item.totalPrice)
                          ? item.totalPrice.toFixed()
                          : null}
                      </span>
                     
                    </p>
                </div>
              </div>
            </div>
          );
        }) : ( <p className="font-bold p-4">Cart is empty</p>)}
            </div>
            <div className="text-end mt-2 mb-2">
              <p className="font-bold">
                Total: <span className="font-currency font-bold"></span> <span>{subtotal}</span>
              </p>
            </div>
            <p>*ALL ORDERS MAY TAKE 48 HOURS TO BE DELIVERED TO YOUR DOORSTEP</p>
            <div className="w-full mt-2 space-y-1">
              <Link
                href="/cart"
                className="w-full block text-center bg-black text-white py-1"
              >
                View Cart
              </Link>
              <button
                className="border w-full border-black hover:bg-black hover:text-white transition duration-300 py-1"
                onClick={() => onClose()} // Close cart section
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

export default CartDrawer;
