import React, { useEffect, useState } from "react";
import { Drawer, message } from "antd";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { RxMinus, RxPlus } from "react-icons/rx";
import SelectList from "components/ui/Select/Select";
import { options } from "data/Data";
import Link from "next/link";
import PRODUCTS_TYPES from "types/interfaces";

const CartDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [cartItems, setCartItems] = useState<PRODUCTS_TYPES[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const fetchCartItems = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(existingCart);
    setCounts(
      existingCart.reduce((acc: any, item: any, index: number) => {
        acc[index] = item.count || 1;
        return acc;
      }, {})
    );
    calculateSubtotal(existingCart);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateSubtotal = (items: PRODUCTS_TYPES[]) => {
    const sub = items.reduce((acc, item) => {
      const price = item.discountPrice || item.price;
      return acc + price * (counts[item._id] || item.count);
    }, 0);
    setSubtotal(sub);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const increment = (index: number) => {
    const newCounts = { ...counts };
    if (newCounts[index] < 100) {
      newCounts[index] = (newCounts[index] || 1) + 1;
      setCounts(newCounts);
      updateTotalPrice(index, newCounts[index]);
      window.dispatchEvent(new Event("cartChanged"));
    } else {
      message.error("Quantity cannot be more than 100.");
    }
  };

  const decrement = (index: number) => {
    if (counts[index] > 1) {
      const newCounts = { ...counts };
      newCounts[index] -= 1;
      setCounts(newCounts);
      updateTotalPrice(index, newCounts[index]);
      window.dispatchEvent(new Event("cartChanged"));
    } else {
      message.error("Quantity cannot be less than 1.");
    }
  };

  const updateTotalPrice = (index: any, newCount: any) => {
    const updatedData = [...cartItems];
    updatedData[index].count = newCount;
    updatedData[index].totalPrice = (updatedData[index].discountPrice || updatedData[index].price) * newCount;
    setCartItems(updatedData);
    localStorage.setItem('cart', JSON.stringify(updatedData));
    calculateSubtotal(updatedData);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const removeItem = (index: number) => {
    const newCartItems = cartItems.filter((_, itemIndex) => itemIndex !== index);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    calculateSubtotal(newCartItems);
    message.success('Product removed from cart successfully!');
    window.dispatchEvent(new Event("cartChanged"));
  };

  return (
    <>
      <div onClick={showDrawer} className="z-999999">
        Open
      </div>
      <Drawer
        title={
          <>
            <p className="text-23">
              My Cart <span> ({cartItems.length})</span>
            </p>
          </>
        }
        className="z-999999"
        onClose={onClose}
        open={open}
        width={500}
        footer={
          <>
            <div className="flex justify-between px-2 font-semibold text-14 md:text-22">
              <p className="">Subtotal</p>
              <p>
                AED<span>{subtotal}</span>.00
              </p>
            </div>
            <div className="flex flex-col w-full justify-center space-y-3 mt-5">
              <Link
                className="w-full p-4 text-16 bg-primary text-white text-center"
                href="/cart"
              >
                VIEW CART
              </Link>
              <Link
                className="w-full p-4 text-16 bg-black text-white text-center"
                href="/checkout"
              >
                CHECK OUT
              </Link>
            </div>
          </>
        }
      >
        {cartItems.map((item:any, index) => (
          <div key={index} className="rounded-md shadow p-2 mt-5 bg-white">
            <div className="space-y-2">
              <div className="flex gap-3">
                <div className="relative ">
                  <div className="bg-gray p-1 rounded-md">
                    <Image
                      className="w-16 h-16 bg-contain"
                      width={80}
                      height={80}
                      src={item.imageUrl[0].imageUrl || item.imageUrl}
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
                  <p className="text-12 md:text-14 ">
                    AED<span>{item.discountPrice ? item.discountPrice : item.price}</span>.00
                  </p>
                  <div className="flex">
                    <div
                      className="h-5 w-5 bg-[#E7E7EF] hover:bg-[#F0EFF2] flex justify-center items-center"
                      onClick={() => decrement(index)}
                    >
                      <RxMinus size={20} />
                    </div>
                    <div className="h-5 w-5 bg-[#F0EFF2] hover:bg-[#E7E7EF] flex justify-center items-center">
                      <input
                        className="h-5 w-5 text-center"
                        type="text"
                        min={1}
                        max={100}
                        disabled
                        value={counts[index] || item.count}
                      />
                    </div>
                    <div
                      className="h-5 w-5 bg-[#E7E7EF] hover:bg-[#F0EFF2] flex justify-center items-center"
                      onClick={() => increment(index)}
                    >
                      <RxPlus size={20} />
                    </div>
                  </div>
                  <SelectList
                    className="w-32 h-8  outline-none  text-20"
                    onChange={onChange}
                    options={options}
                    defaultValue="Select Size"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center ">
                <h1 className="font-bold">Total: </h1>
                <p>
                  AED <span>{(item.discountPrice ? item.discountPrice : item.price) * (counts[index] || item.count)}</span>.00
                </p>
              </div>
            </div>
          </div>
        ))}
      </Drawer>
    </>
  );
};

export default CartDrawer;
