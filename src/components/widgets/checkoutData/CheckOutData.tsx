//@ts-nocheck
import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";
import { message, Modal } from "antd";
import { usePathname } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import PRODUCTS_TYPES from "types/interfaces";
import { IoIosClose } from "react-icons/io";
import { Checkbox } from "antd";

interface TableProps {
  cartdata: PRODUCTS_TYPES[];
  onCartChange: (updatedCart: PRODUCTS_TYPES[]) => void;
  subtotal: number;
  setSubtotal: React.Dispatch<SetStateAction<number>>;
  shipmentFee: number | string;
  cartItems?: PRODUCTS_TYPES[];
  onClick?: MouseEvent<HTMLButtonElement>;
}

const CheckoutData: React.FC<TableProps> = ({
  cartdata,
  onCartChange,
  subtotal,
  setSubtotal,
  shipmentFee,
  cartItems,
  onClick,
}) => {
  const pathName = usePathname();
  const [data, setData] = useState<PRODUCTS_TYPES[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  const [totalCount, setTotalCount] = useState(0); // New state variable for total count
  const [changeId, setChangeId] = useState<number | null>(null);

  const ProductHandler = () => {
    const Products = localStorage.getItem("cart");
    if (Products && JSON.parse(Products).length > 0) {
      const items = JSON.parse(Products || "[]");
      setData(items);
      const itemCounts = items.reduce((acc: any, item: any, index: number) => {
        acc[index] = item.count || 1;
        return acc;
      }, {});
      setCounts(itemCounts);

      const sub = items.reduce(
        (total: number, item: any) => total + item.totalPrice,
        0
      );
      setSubtotal(sub);

      // Calculate total count of products
      const total = items.reduce(
        (sum: number, item: any) => sum + (item._id || 1),
        0
      );
      setTotalCount(total);
    }
  };

  useEffect(() => {
    ProductHandler();
  }, [pathName, changeId]);

  const removeItemFromCart = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    localStorage.setItem("cart", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("cartChanged"));
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

  return (
    <div className="bg-transparent px-2 md:ps-6 py-10 md:pe-10">
      <h2 className="text-16 font-medium  text-end mb-4">
        *total <span className="text-primary">{totalCount}</span> Items
      </h2>
      <div className="space-y-4 max-h-85 overflow-y-scroll custom-scrollbar1">
        {data.map((product, index) => (
          <div className="bg-transparent" key={index}>
            <div className="flex gap-2 sm:gap-4 justify-between items-center pe-1 sm:pe-6">
              <div className="w-10/12 flex gap-3 sm:gap-6 items-center">
                <Image
                  className="w-18 xsm:w-22 sm:w-32 h-18 xsm:h-22 sm:h-32"
                  width={100}
                  height={100}
                  src={product.imageUrl[0].imageUrl || product.imageUrl}
                  alt="Product"
                />
                <div>
                  <h1 className="text-16 sm:text-18 font-medium">
                    {typeof product.name === "string" ? product.name : ""}
                  </h1>

                  <div className="flex mt-1 xsm:mt-0 gap-0 items-center">
                    <p className="font-normal text-14 sm:text-base text-lightdark text-nowrap">
                      Size : 1.22
                    </p>
                    <IoIosClose size={25} className="text-lightdark" />
                    <div className={`text-14 sm:text-base font-normal text-lightdark text-nowrap`}>
                      {product.length} Meter
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1 w-4/12">
                <p className="float-end text-16 sm:text-18 font-medium">
                  AED{" "}
                  <span>
                    {product.discountPrice
                      ? product.discountPrice *
                        (counts[index] || 1) *
                        product.length
                      : product.price * (counts[index] || 1) * product.length}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full sm:w-3/4 lg:w-3/4 xl:w-2/3 mx-auto bg-white px-14 pt-10 py-14 space-y-3 rounded-sm mt-10">
        <h2 className="text-23 font-bold tracking-wide">YOUR ORDER</h2>
        <div className="flex justify-between items-center">
          <h2 className="text-16 font-bold">SUBTOTAL</h2>
          <h2 className="text-20">
            AED <span>{subtotal}</span>
          </h2>
        </div>
        <hr className="w-full mx-auto border-[#D2D2D2]" />

        <div className="flex justify-between items-center">
          <h2 className="text-16 font-bold">SHIPPING</h2>
          <h2 className="text-16">
            AED <span>{shipmentFee}</span>
          </h2>
        </div>
        <hr className="w-full mx-auto border-[#D2D2D2]" />

        <div className="flex justify-between items-center">
          <h2 className="text-16 font-bold">TOTAL:</h2>
          <h2 className="text-22 font-bold">
            AED{" "}
            <span>
              {shipmentFee == "Free"
                ? subtotal
                : Number(shipmentFee) + subtotal}
            </span>
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          <Checkbox className="custom-checkbox font-medium" >
            Agree <span className="underline">Shipping and Returns</span> Policy
          </Checkbox>
        </div>
        <div className="flex justify-center items-center">
          <button className="w-full bg-black hover:bg-dark text-white py-3" onClick={onClick}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutData;
