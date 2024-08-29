//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { RxMinus, RxPlus } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { message, Modal } from "antd";
import Button from "../Button/Button";
import PRODUCTS_TYPES from "types/interfaces";
import SelectList from "../Select/Select";
import ProductSelect from "../Select/ProductSelect";

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

  const ProductHandler = () => {
    const Products = localStorage.getItem(
      pathName === "/wishlist" ? "wishlist" : "cart"
    );
    if (Products && JSON.parse(Products).length > 0) {
      const items = JSON.parse(Products || "[]");
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

  useEffect(() => {
    ProductHandler();
  }, [pathName, changeId]);

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

    // Find index of existing product with the same ID and length
    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.length === lengths[index]
    );

    if (existingIndex !== -1) {
      // Update quantity and totalPrice if product with the same ID and length already exists
      cart[existingIndex].count += counts[index] || 1;
      cart[existingIndex].totalPrice =
        (product.discountPrice || product.price) *
        cart[existingIndex].count *
        lengths[index];
    } else {
      // Add new item to cart if no matching product found
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

    // Ensure all totalPrices are numbers
    cart.forEach((item) => {
      item.totalPrice = Number(item.totalPrice) || 0;
    });

    // Update local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Remove item from wishlist if added to cart
    removeItemFromCart(index);

    // Trigger cart changed event
    window.dispatchEvent(new Event("cartChanged"));
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      <div className="hidden lg:flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-23 xl:text-[30px] font-medium text-dark">
                      Products
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-23 xl:text-[30px] font-medium text-dark"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-23 xl:text-[30px] font-medium text-dark"
                    >
                      Quantity (M)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-23 xl:text-[30px] font-medium text-dark"
                    >
                      {pathName === "/wishlist" ? "Action" : "Total"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product, index) => {
                    const options = lengthOptions(
                      product.totalStockQuantity || 0
                    );
                    return (
                      <tr key={index} className="border-b border-[#EFEFEF]">
                        <td className="md:px-3 md:py-4 text-sm font-medium">
                          <div className="flex gap-1">
                            <div className="relative">
                              <Image
                                className="w-24 h-24 bg-contain"
                                width={100}
                                height={100}
                                src={
                                  product.imageUrl[0]?.imageUrl ||
                                  product.imageUrl
                                }
                                alt="Product"
                              />
                              <div className="absolute -top-2 -right-2">
                                <div
                                  onClick={() => showDeleteConfirm(index)}
                                  className="bg-white shadow h-5 w-5 flex justify-center items-center rounded-full cursor-pointer hover:text-white hover:bg-[#C62131]"
                                >
                                  <IoCloseSharp size={18} />
                                </div>
                              </div>
                            </div>
                            <div className="p-2 w-full">
                              <h1 className="text-sm md:text-base font-bold">
                                <span>{counts[index] || 1}* </span>{typeof product.name === "string"
                                  ? product.name
                                  : ""}
                                
                              </h1>
                              <div>
                                <p className="text-16 font-semibold">
                                  Width: <span>1.22cm (28inch)</span>
                                </p>
                              </div>
                              {/* <div className="flex gap-2 items-center w-full">
                                <ProductSelect
                                  className="w-[70%] h-10 border outline-none shipment text-20"
                                  onChange={(value) =>
                                    handleLengthChange(index, value)
                                  }
                                  options={options}
                                  defaultValue={`1.22cm x ${
                                    lengths[index] || product.length
                                  } METERS`}
                                />
                              </div> */}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base">
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
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base">
                          <div className="flex border w-28 h-12 justify-between px-2">
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
                                value={lengths[index] || product.length}
                                onChange={(e) => handleChange(index, e)}
                              />
                            </div>
                            <div
                              onClick={() => increment(index)}
                              className="  flex justify-center items-center"
                            >
                              <RxPlus size={20} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm md:text-base">
                          {pathName === "/wishlist" ? (
                            <Button
                              onClick={() => addToCart(product, index)}
                              className="px-4 rounded-md"
                              title={"Add To Cart"}
                            />
                          ) : (
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
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {data.map((product, index) => {
        const options = lengthOptions(product.totalStockQuantity || 0);
        return (
          <div
            className="p-2 rounded-md mt-5 bg-white shadow block lg:hidden"
            key={index}
          >
            <div className="space-y-2">
              <div className="flex gap-3">
                <div className="relative">
                  <div className="bg-gray p-1 rounded-md">
                    <Image
                      className="w-20 h-20 bg-contain"
                      width={80}
                      height={80}
                      src={product.imageUrl[0]?.imageUrl || product.imageUrl}
                      alt="Product"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div
                      onClick={() => showDeleteConfirm(index)}
                      className="bg-white shadow h-5 w-5 rounded-full cursor-pointer flex justify-center items-center"
                    >
                      <IoCloseSharp size={14} />
                    </div>
                  </div>
                </div>
                <div className="space-y-1 w-8/12">
                  <h1 className="text-14 font-medium">
                    <span>{counts[index] || 1}</span>* (
                    {typeof product.name === "string" ? product.name : ""} )
                  </h1>
                  <p className="text-14 font-medium">
                    AED <span>
                      {pathName === "/wishlist"
                        ? product.discountPrice
                          ? product.discountPrice * (counts[index] || 1)
                          : product.price * (counts[index] || 1)
                        : product.discountPrice
                        ? product.discountPrice
                        : product.price}
                    </span>
                  </p>
                  <div>
                                <p className="text-12 font-medium">
                                  Width: <span>1.22cm (28inch)</span>
                                </p>
                              </div>
                  <div className="flex border w-20 h-8 justify-between px-2 ">
                            <div
                              onClick={() => decrement(index)}
                              className="  flex justify-center items-center"
                            >
                              <RxMinus size={14} />
                            </div>
                            <div className="  flex justify-center items-center">
                              <input
                                className="h-7 w-8 text-center"
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
                              <RxPlus size={14} />
                            </div>
                          </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <h1 className="font-bold">Total: </h1>
                {pathName === "/wishlist" ? (
                  <Button
                    onClick={() => addToCart(product, index)}
                    className="px-4 rounded-md"
                    title={"Add To Cart"}
                  />
                ) : (
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
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Table;
