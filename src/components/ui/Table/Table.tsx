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
  onCartChange: any;
}

const Table: React.FC<TableProps> = ({
  onCartChange,
}) => {
  const pathName = usePathname();
  const [data, setData] = useState<PRODUCTS_TYPES[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [lengths, setLengths] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const handleCartChange = () => {
      ProductHandler();
      console.log("Cart or Wishlist updated");
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
  }, [pathName]);


  const ProductHandler = () => {
    const products = localStorage.getItem(
      pathName === "/wishlist" ? "wishlist" : "cart"
    );
    if (products) {
      const items: any = JSON.parse(products || "[]");
      onCartChange(items);

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
    }
  };

  const increment = (index: number) => {
    const product = data[index];
    const newLengths = { ...lengths };

    if (newLengths[index] >= product.totalStockQuantity) {
      message.error(
        "Cannot add more. You have reached the product's total stock!"
      );
      return;
    }
    if (newLengths[index] >= 100) {
      message.error("Length cannot exceed 100 meters.");
      return;
    }

    newLengths[index] = (newLengths[index] || 1) + 1;
    setLengths(newLengths);
    updateTotalPrice(index, newLengths[index]);
    window.dispatchEvent(new Event("cartChanged"));
    window.dispatchEvent(new Event("WishlistChanged"));
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
    const product = updatedData[index];

    if (newLength > product.totalStockQuantity) {
      message.error("Cannot exceed available stock!");
      return;
    }

    updatedData[index].length = newLength;
    updatedData[index].totalPrice =
      (product.discountPrice || product.price) * newLength;
    setData(updatedData);
    localStorage.setItem(
      pathName === "/wishlist" ? "wishlist" : "cart",
      JSON.stringify(updatedData)
    );
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
    onCartChange(updatedData);
  };

  const addToCart = (product: PRODUCTS_TYPES, index: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (lengths[index] > product.totalStockQuantity) {
      message.error("Cannot add to cart. Exceeds available stock!");
      return;
    }

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

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    const product = data[index];

    if (isNaN(value) || value < 1 || value > 100) {
      message.error("Please select a quantity between 1 and 100.");
      return;
    }
    if (value > product.totalStockQuantity) {
      message.error("Cannot exceed available stock!");
      return;
    }

    setCounts({ ...counts, [index]: value });
    updateTotalPrice(index, value);
    window.dispatchEvent(new Event("cartChanged"));
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

  return (
    <>
      <div className=" hidden md:block   ">
        <div className="flex justify-between items-center text-18 font-semibold px-4 bg-white text-black py-3 ">
          <div
            className={` ${
              pathName === "/wishlist"
                ? "md:w-4/12 lg:w-6/12"
                : "md:w-4/12 lg:w-6/12"
            } `}
          >
            <p>Items</p>
          </div>
          <div
            className={` ${
              pathName === "/wishlist"
                ? "md:w-2/12 lg:w-1/12"
                : "md:w-2/12 lg:w-2/12 "
            } `}
          >
            <p>Price</p>
          </div>
          <div
            className={` ${
              pathName === "/wishlist"
                ? "md:w-2/12 lg:w-2/12"
                : "md:w-1/12 lg:w-2/12 text-center"
            } `}
          >
            <p>QTY(M)</p>
          </div>

          <div
            className={`${
              pathName === "/wishlist"
                ? "md:w-2/12 lg:w-1/12"
                : "text-center md:w-2/12 lg:w-2/12"
            } `}
          >
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
            return (
              <div
                className="flex justify-between items-center mt-5"
                key={index}
              >
                <div
                  className={`  ${
                    pathName === "/wishlist"
                      ? "md:w-4/12 lg:w-6/12"
                      : "md:w-4/12 lg:w-6/12"
                  }`}
                >
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

                        {product.categoryName !== "Accessories" && (
                          <p className="font-medium text-16 text-text">
                            Roll width is{" "}
                            <span className="text-black">122cm</span>
                          </p>
                        )}

                      </div>
                    </div>
                  </Link>
                </div>

                <div
                  className={` ${
                    pathName === "/wishlist"
                      ? "md:w-2/12 lg:w-1/12"
                      : " md:w-2/12 lg:w-2/12"
                  } `}
                >
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
                <div
                  className={` ${
                    pathName === "/wishlist"
                      ? "md:w-2/12 lg:w-2/12"
                      : " md:w-2/12 lg:w-2/12 lg:flex lg:justify-center"
                  } `}
                >
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

                <div
                  className={` flex gap-4 ${
                    pathName === "/wishlist"
                      ? "md:w-2/12 lg:w-1/12 "
                      : "justify-center lg:w-2/12 "
                  } `}
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
