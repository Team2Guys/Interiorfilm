"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { RxMinus, RxPlus } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { message, Modal } from "antd";
import Button from "../Button/Button";
import PRODUCTS_TYPES from "types/interfaces";
import Link from "next/link";
import { generateSlug } from "data/Data";
import { FiMinus, FiPlus } from "react-icons/fi";

interface TableProps {
  cartdata?: PRODUCTS_TYPES[];
  wishlistdata?: PRODUCTS_TYPES[];
  onCartChange: (updatedCart: PRODUCTS_TYPES[]) => void;
}

const Table: React.FC<TableProps> = ({
  cartdata,
  wishlistdata,
  onCartChange,
}) => {
  const pathName = usePathname();
  const [data, setData] = useState<PRODUCTS_TYPES[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [subtotal, setSubtotal] = useState(0);
  const [changeId, setChangeId] = useState<number | null>(null);
  const [lengths, setLengths] = useState<{ [key: number]: number }>({});
  const [totalItems, setTotalItems] = useState(0);



  useEffect(() => {
    const handleCartChange = () => {
      ProductHandler(); 
      console.log(
        "function called", "sub"
      )
    };

    window.addEventListener("cartChanged", handleCartChange);
    window.addEventListener("WishlistChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
      window.removeEventListener("WishlistChanged", handleCartChange);
    };
  }, []);

  useEffect(() => {
    ProductHandler();
  }, [pathName, changeId]);

  useEffect(() => {
    const total = data.reduce((sum, product) => sum + (product.count || 1), 0);
    setTotalItems(total);
  }, [data]);

  const ProductHandler = () => {
    const Products = localStorage.getItem(pathName === "/wishlist" ? "wishlist" : "cart");
    if (Products && JSON.parse(Products).length > 0) {
      const items: any = JSON.parse(Products || "[]");
      console.log(items, "sub")
      onCartChange(items)
      
      setData(items);
      setCounts(
        items.reduce((acc: any, item: any, index: number) => {
          acc[index] = item.count || 1;
          return acc;
        }, {})
      );
      setLengths(
        items.reduce((acc: any, item: any, index: number) => {
          acc[index] = item.length || 1;
          return acc;
        }, {})
      );
      const sub = items.reduce(
        (total: number, item: any) => total + item.totalPrice,
        0
      );
      setSubtotal(sub);
    }
  };

  const increment = (index: number) => {
    const newLengths = { ...lengths };
    if (newLengths[index] < 100) {
      newLengths[index] = (newLengths[index] || 1) + 1;
      setLengths(newLengths);
      updateTotalPrice(index, newLengths[index]);
      window.dispatchEvent(new Event("cartChanged"));
      window.dispatchEvent(new Event("WishlistChanged"));
    } else {
      message.error("Length cannot be more than 100 meters.");
    }
  };

  const decrement = (index: number) => {
    const newLengths = { ...lengths };
    if (newLengths[index] > 1) {
      newLengths[index] -= 1;
      setLengths(newLengths);
      updateTotalPrice(index, newLengths[index]);
      window.dispatchEvent(new Event("cartChanged"));
      window.dispatchEvent(new Event("WishlistChanged"));
    } else {
      message.error("Length cannot be less than 1 meter.");
    }
  };

  const updateTotalPrice = (index: number, newLength: number) => {
    const updatedData = [...data];
    updatedData[index].length = newLength;
    updatedData[index].totalPrice =
      (updatedData[index].discountPrice || updatedData[index].price) *
      (counts[index] || 1) *
      newLength;
    setData(updatedData);
    localStorage.setItem(
      pathName === "/wishlist" ? "wishlist" : "cart",
      JSON.stringify(updatedData)
    );
    const sub = updatedData.reduce(
      (total: number, item: any) => total + item.totalPrice,
      0
    );
    setSubtotal(sub);
    onCartChange(updatedData);
  };

  const removeItemFromCart = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    localStorage.setItem(
      pathName === "/wishlist" ? "wishlist" : "cart",
      JSON.stringify(updatedData)
    );
    window.dispatchEvent(new Event("cartChanged"));
    window.dispatchEvent(new Event("WishlistChanged"));
    setChangeId(index);
    onCartChange(updatedData);
  };

  const showDeleteConfirm = (index: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeItemFromCart(index);
      },
    });
  };

  const addToCart = (product: PRODUCTS_TYPES, index: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex(
      (item: any) => item.id === product._id && item.length === lengths[index]
    );

    if (existingIndex !== -1) {
      cart[existingIndex].count += counts[index] || 1;
      cart[existingIndex].totalPrice =
        (product.discountPrice || product.price) *
        cart[existingIndex].count *
        lengths[index];
    } else {
      const totalPrice =
        (product.discountPrice || product.price) *
        (counts[index] || 1) *
        lengths[index];
      cart.push({
        ...product,
        count: counts[index] || 1,
        length: lengths[index],
        totalPrice: totalPrice,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setData(cart);
    removeItemFromCart(index);
    window.dispatchEvent(new Event("cartChanged"));
  };

  const handleChange = (index: number,e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1 || value > 100) {
      message.error("Please select a quantity between 1 and 100.");
    } else {
      setCounts({ ...counts, [index]: value });
      updateTotalPrice(index, value);
      window.dispatchEvent(new Event("cartChanged"));
      window.dispatchEvent(new Event("WishlistChanged"));
    }
  };

  const handleLengthChange = (index: number, value: number) => {
    const newLengths = { ...lengths, [index]: value };
    setLengths(newLengths);
    updateTotalPrice(index, value);
    window.dispatchEvent(new Event("cartChanged"));
    window.dispatchEvent(new Event("WishlistChanged"));
  };

  const lengthOptions = (totalStockQuantity: number) => {
    const options = [];
    for (let i = 1; i <= Math.floor(totalStockQuantity); i++) {
      options.push({
        label: `1.22cm x ${i} METERS`,
        value: i,
      });
    }
    if (options.length === 0) {
      options.push({
        label: "No sizes available",
        value: 0,
        disabled: true,
      });
    }
    return options;
  };



  return (
    <>
      <div className=" hidden md:block   ">
        <div className="flex justify-between items-center text-18 font-semibold px-6 bg-white text-black py-3 ">

          <div className={` ${pathName === "/wishlist" ? "md:w-4/12 lg:w-4/12" : "md:w-4/12 lg:w-4/12"} `}>
            <p>Items</p>
          </div>
          <div className={` ${pathName === "/wishlist" ? "md:w-2/12 lg:w-2/12" : "md:w-2/12 lg:w-2/12"} `}>
            <p>Price</p>
          </div>
          <div className={` ${pathName === "/wishlist" ? "md:w-2/12 lg:w-2/12" : "md:w-1/12 lg:w-3/12"} `}>
            <p>QTY(M)</p>
          </div>

          <div className={`${pathName === "/wishlist" ? "md:w-2/12 lg:w-2/12" : "text-center md:w-2/12 lg:w-2/12"} `} >
            <p>Total</p>
          </div>


          

          {pathName === "/wishlist" ? (
            <p className="md:w-2/12 lg:w-2/12">
              <div className=" text-end text-14  font-semibold text-white whitespace-nowrap ">
                Action
              </div>
            </p>
          ) : null}
        </div>

        <div className="max-h-[529px] overflow-auto table-scrollbar ">
          {data.map((product, index) => {
            const options = lengthOptions(product.totalStockQuantity || 0);
            return (
              <div
                className="flex justify-between items-center mt-5"
                key={index}
              >

              <div   className={`  ${pathName === "/wishlist" ? "md:w-4/12 lg:w-4/12" : "md:w-4/12 lg:w-4/12"}`}>

              <Link
                  href={`/product/${generateSlug(product.name)}`}
                className="w-fit flex gap-1"
                >
                  <Image
                    className="w-[184px] h-[130px] object-cover "
                    width={300}
                    height={300}
                    src={product.posterImageUrl || product.imageUrl}
                    alt="Product"
                  />
                  <div className="p-2 w-fit">
                    <h1 className="text-sm md:text-base font-bold">
                      {typeof product.name === "string" ? product.name : ""}
                    </h1>
                    <div>
                      <p className="text-[#B9BBBF]">{product.code}</p>

                      <p className="text-16 font-semibold text-[#535353]">
                        Width: <span>Roll width is 122cm</span>
                      </p>
                    </div>
                  </div>


                </Link>
                
              </div>
        

                <div className={` ${ pathName === "/wishlist" ? "md:w-2/12 lg:w-2/12" : " md:w-2/12 lg:w-2/12"} `}>
                  <p>
                    AED
                    <span>
                      {pathName === "/wishlist"
                        ? product.discountPrice
                          ? product.discountPrice * (counts[index] || 1)
                          : product.price * (counts[index] || 1)
                        : product.discountPrice
                        ? product.discountPrice
                        : product.price}
                    </span>
                  </p>
                </div>
                <div className={` ${ pathName === "/wishlist" ? "md:w-2/12 lg:w-2/12" : " md:w-2/12 lg:w-3/12"} `}>
                  <div
                    className={`flex w-28 h-12  justify-between px-2  bg-[#F0F0F0]  ${
                      pathName === "/wishlist" ? "" : ""
                    }`}
                  >
                    <div
                      onClick={() => decrement(index)}
                      className="  flex justify-center items-center"
                    >
                      <RxMinus size={20} className="cursor-pointer" />
                    </div>
                    <div className="  flex justify-center items-center">
                      <input
                        className="h-7 w-8 text-center cursor-pointer"
                        type="text"
                        min={1}
                        max={100}
                        disabled
                        value={lengths[index] || product.length}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div
                      onClick={() => increment(index)}
                      className="  flex justify-center items-center"
                    >
                      <RxPlus size={20} className="cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className={` flex gap-4 ${pathName === "/wishlist" ? "md:w-2/12 lg:w-2/12 " : "justify-center lg:w-2/12 "} `}
                >
                  <p>
                    AED
                    <span>
                      {product.discountPrice
                        ? product.discountPrice *
                          (counts[index] || 1) *
                          (lengths[index] || product.length)
                        : product.price *
                          (counts[index] || 1) *
                          (lengths[index] || product.length)}
                    </span>
                  </p>
                  <div
                    onClick={() => showDeleteConfirm(index)}
                    className="bg-black/20 shadow h-5 w-5  flex justify-center items-center rounded-full cursor-pointer hover:text-white hover:bg-primary"
                  >
                    <IoCloseSharp size={18} />
                  </div>
                </div>

                {pathName === "/wishlist" ? (
                  <div className="w-2/12 text-end">
                    <Button
                      onClick={() => addToCart(product, index)}
                      className="px-4 rounded-md"
                      title={"Add To Cart"}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>




      {data.map((product, index) => {
        const options = lengthOptions(product.totalStockQuantity || 0);
        return (
          <>
            <div
              className="border border-gray space-y-2 flex flex-col text-center justify-center items-center py-5  md:hidden"
              key={index}
            >
              <Image
                className="w-32 h-32 bg-contain rounded-md"
                width={80}
                height={80}
                src={product.posterImageUrl || product.imageUrl}
                alt="Product"
              />
              <div className="text-center">
                <h1 className="text-14 font-semibold">
                  {typeof product.name === "string" ? product.name : ""}
                </h1>
                <p className="text-13 font-semibold">
                <span>Roll width is 122cm</span>
                </p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Unit Price:</p>
                <p className="">
                  AED{" "}
                  <span>
                    {pathName === "/wishlist"
                      ? product.discountPrice
                        ? product.discountPrice * (counts[index] || 1)
                        : product.price * (counts[index] || 1)
                      : product.discountPrice
                      ? product.discountPrice
                      : product.price}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <p className="font-semibold">QTY(M):</p>
                <div className="flex  justify-between px-2 ">
                  <div
                    onClick={() => decrement(index)}
                    className=" h-6 w-6 flex justify-center items-center border rounded-full bg-primary text-white"
                  >
                    <FiMinus size={14} />
                  </div>
                  <div className="  flex justify-center items-center">
                    <input
                      className="h-6 w-6 text-center"
                      type="text"
                      min={1}
                      max={100}
                      disabled
                      value={lengths[index] || product.length}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div
                    onClick={() => increment(index)}
                    className="  h-6 w-6 flex justify-center items-center border rounded-full bg-primary text-white"
                  >
                    <FiPlus size={14} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Total:</p>
                  <p>
                    AED
                    <span>
                      {product.discountPrice
                        ? product.discountPrice *
                          (counts[index] || 1) *
                          (lengths[index] || product.length)
                        : product.price *
                          (counts[index] || 1) *
                          (lengths[index] || product.length)}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <p className="font-semibold">Remove:</p>
                  <div
                    onClick={() => showDeleteConfirm(index)}
                    className="bg-primary text-white shadow h-5 w-5 rounded-full cursor-pointer flex justify-center items-center"
                  >
                    <IoCloseSharp size={14} />
                  </div>
                </div>

                <div>
                  {pathName === "/wishlist" ? (
                    <Button
                      onClick={() => addToCart(product, index)}
                      className="px-4 rounded-md"
                      title={"Add To Cart"}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </>
        );
      })}

    </>
  );
};

export default Table;
