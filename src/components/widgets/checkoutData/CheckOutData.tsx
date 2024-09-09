import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";
import { usePathname } from "next/navigation";
import PRODUCTS_TYPES from "types/interfaces";
import { IoIosClose } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
interface TableProps {
  cartdata: PRODUCTS_TYPES[];
  onCartChange: (updatedCart: PRODUCTS_TYPES[]) => void;
  subtotal: number;
  setSubtotal: React.Dispatch<SetStateAction<number>>;
  shipmentFee: number | string;
  cartItems?: PRODUCTS_TYPES[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
    <div className="bg-transparent ">
      <div className="flex justify-between items-center px-2 py-6 lg:px-10">
        <p className="text-16 md:text-[24px]">Order Summary</p>
        <h2 className="text-16 font-medium  text-end mb-4">
          *total <span className="text-primary">{totalCount}</span> Items
        </h2>
      </div>
      <div className="space-y-4 max-h-100 overflow-y-scroll table-scrollbar px-2 lg:px-8 mx-2">
        {data && data.map((product, index) => (
          <div className="bg-transparent" key={index}>
            <div className="flex gap-2 sm:gap-4 justify-between items-center pe-1 sm:pe-6">
            <div className="w-12/12 flex gap-3 sm:gap-4 items-center">
                <Image

                      className="w-18 xsm:w-22 sm:w-[124px] h-18 xsm:h-22 sm:h-[124px]"
                      width={100}
                      height={100}
                      src={
                        typeof product.imageUrl === "string"
                          ? product.imageUrl
                          : product.imageUrl && product.imageUrl[0] && product.imageUrl[0].imageUrl
                          ? product.imageUrl[0].imageUrl
                          : ""
                      }
                      alt="Product"
                    />
                <div>
                  <h1 className="text-16 sm:text-18 font-medium">
                    {product.name}
                    {/* {counts[index] || 1}X (
                    {typeof product.name === "string" ? product.name : ""}) */}
                  </h1>
                  <h1 className="text-16 sm:text-18 font-medium text-[#B9BBBF]">
                    {product.code}
                  </h1>

                  <div className="flex mt-1 xsm:mt-0 gap-0 items-center">
                    <p className="font-normal text-14 sm:text-base text-lightdark text-nowrap">
                      Width : 1.22
                    </p>
                    <IoIosClose size={25} className="text-lightdark" />
                    <div
                      className={`text-14 sm:text-base font-normal text-lightdark text-nowrap`}
                    >
                      {product.length} (m)
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="space-y-1 w-4/12">
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
              </div> */}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full   space-y-3 rounded-sm mt-10 px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-16 ">SUBTOTAL</h2>
          <h2 className="text-20">
            AED <span>{subtotal}</span>
          </h2>
        </div>
        <hr className="w-full mx-auto border-[#D2D2D2]" />

        <div className="flex justify-between items-center">
          <h2 className="text-16 ">SHIPPING</h2>
          {shipmentFee === "Free"}
          <h2 className="text-16">
            <span>
              {shipmentFee === "Free" ? shipmentFee : `AED ${shipmentFee}`}
            </span>
          </h2>
        </div>
        <hr className="w-full mx-auto border-[#D2D2D2]" />

        <div className="flex justify-between items-center">
          <h2 className="text-16 ">TOTAL</h2>
          <h2 className="text-20 ">
            AED{" "}
            <span>
              {shipmentFee == "Free"
                ? subtotal
                : Number(shipmentFee) + subtotal}
            </span>
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="w-full bg-black hover:bg-dark text-white py-3 flex justify-center items-center gap-3"
            onClick={onClick}
          >
            proceed to payment <FaArrowRight />
          </button>
        </div>
        <div className="max-w-70 pt-5 mx-auto">
          <Image
            className="w-[618px] h-[42px]"
            width={500}
            height={500}
            src={"/images/icon/return.png"}
            alt="return"
          />
        </div>
        <div className="pt-4">
          <Image
            className="w-[618px] h-[42px]"
            width={500}
            height={500}
            src={"/images/icon/payment.png"}
            alt="return"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutData;
