import React, { useEffect, useState } from "react";
import { Drawer, message, Modal } from "antd";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { RxMinus, RxPlus } from "react-icons/rx";
import ProductSelect from "components/ui/Select/ProductSelect";
import Link from "next/link";
import PRODUCTS_TYPES from "types/interfaces";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  OpenDrawer?: React.ReactNode;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  OpenDrawer,
}) => {
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [lengths, setLengths] = useState<{ [key: number]: number }>({});
  const [cartItems, setCartItems] = useState<PRODUCTS_TYPES[]>([]);
  const [subtotal, setSubtotal] = useState(0);
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

  const lengthOptions = (totalStockQuantity: number) => {
    const options = [];
    for (let i = 1; i <= Math.floor(totalStockQuantity); i++) {
      options.push({
        label: `1.22 x ${i} METERS`,
        value: i,
      });
    }
    if (options.length === 0) {
      options.push({
        label: "No sizes available",
        value: "",
      });
    }
    return options;
  };

  const onLengthChange = (index: number, value: number) => {
    const newLengths = { ...lengths, [index]: value };
    setLengths(newLengths);
    updateTotalPrice(index, counts[index], value);
  };

  const calculateSubtotal = (items: PRODUCTS_TYPES[]) => {
    const sub = items.reduce((acc, item, index) => {
      const price = item.discountPrice || item.price;
      const length = lengths[index] || item.length;
      const count = counts[index] || item.count;
      return acc + price * length * count;
    }, 0);
    setSubtotal(sub);
  };

  const increment = (index: number) => {
    const newCounts = { ...counts };
    if (newCounts[index] < 100) {
      newCounts[index] = (newCounts[index] || 1) + 1;
      setCounts(newCounts);
      updateTotalPrice(index, newCounts[index], lengths[index]);
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
      updateTotalPrice(index, newCounts[index], lengths[index]);
      window.dispatchEvent(new Event("cartChanged"));
    } else {
      message.error("Quantity cannot be less than 1.");
    }
  };

  const updateTotalPrice = (index: number, newCount: number, length: number) => {
    const updatedData = [...cartItems];
    updatedData[index].count = newCount;
    updatedData[index].length = length;
    updatedData[index].totalPrice =
      (updatedData[index].discountPrice || updatedData[index].price) * length * newCount;
    updatedData[index].totalPrice = Number(updatedData[index].totalPrice) || 0;
    setCartItems(updatedData);
    localStorage.setItem("cart", JSON.stringify(updatedData));
    calculateSubtotal(updatedData);
  };

  const removeItem = (index: number) => {
    Modal.confirm({
      title: "Are you sure you want to remove this item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        const newCartItems = cartItems.filter(
          (_, itemIndex) => itemIndex !== index
        );
        setCartItems(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        calculateSubtotal(newCartItems);
        message.success("Product removed from cart successfully!");
        window.dispatchEvent(new Event("cartChanged"));
      },
      onCancel: () => {
        message.info("Item removal canceled");
      },
    });
  };

  return (
    <>
      {OpenDrawer && (
        <div
          className="relative text-20 md:text-2xl cursor-pointer"
          onClick={() => (open ? onClose() : undefined)}
        >
          {OpenDrawer}
        </div>
      )}
      <Drawer
        title={
          <>
            <p className="text-23">
              My Cart <span> ({cartItems.length})</span>
            </p>
          </>
        }
        className="z-99 border-none"
        onClose={onClose}
        open={open}
        width={500}
        footer={
          <>
            <div className="flex justify-between px-2 font-semibold text-14 md:text-22">
              <p className="">Subtotal</p>
              <p>
                AED<span>{subtotal.toFixed(2)}</span>
              </p>
            </div>
            <div className="flex flex-col w-full justify-center space-y-3 mt-5">
              <Link
                onClick={onClose}
                className="w-full p-4 text-16 bg-primary text-white hover:text-white text-center"
                href="/cart"
              >
                VIEW CART
              </Link>
              <Link
                onClick={onClose}
                className="w-full p-4 text-16 bg-black text-white hover:text-white text-center"
                href="/checkout"
              >
                CHECK OUT
              </Link>
            </div>
          </>
        }
      >
         {cartItems.map((item: any, index: number) => {
          const options = lengthOptions(item.totalStockQuantity || 0);

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
                    <h1 className="text-12 md:text-14 font-semibold">
                      {item.name}
                    </h1>
                    <p className="text-12 md:text-14">
                      AED
                      <span>
                        {item.discountPrice || item.price}
                      </span>
                      .00
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
                    <ProductSelect
                      className="w-[70%] h-10 border outline-none shipment text-20"
                      onChange={(value) => onLengthChange(index, value)}
                      options={options}
                      defaultValue={`1.22 x ${lengths[index] || item.length} METERS`}
                    />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <h1 className="font-bold">Total: </h1>
                  <p>
                      AED
                      <span>
                        {item.totalPrice !== null && item.totalPrice !== undefined && !isNaN(item.totalPrice)
                          ? item.totalPrice.toFixed(2)
                          : '0.00'}
                      </span>
                      .00
                    </p>
                </div>
              </div>
            </div>
          );
        })}
      </Drawer>
    </>
  );
};

export default CartDrawer;
