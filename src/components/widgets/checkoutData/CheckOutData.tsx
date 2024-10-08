import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";
import { Modal } from "antd";
import { usePathname } from "next/navigation";
import PRODUCTS_TYPES from "types/interfaces";
import { IoIosClose } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import PaymentMethod from "components/Layout/PaymentMethod";
import { FooterPaymentMethods } from "data/Data";
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
          *total <span className="text-primary">{totalCount}</span>{totalCount <= 1 ? "Item" : "Items"}
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
                      Size : 1.22
                    </p>
                    <IoIosClose size={25} className="text-lightdark" />
                    <div
                      className={`text-14 sm:text-base font-normal text-lightdark text-nowrap`}
                    >
                      {product.length}m
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

      <div className="w-full  space-y-3 rounded-sm mt-10 px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-16">SUBTOTAL</h2>
          <h2 className="text-20">
            AED <span>{subtotal}</span>
          </h2>
        </div>
        <hr className="w-full mx-auto border-[#D2D2D2]" />

        <div className="flex justify-between items-center">
          <h2 className="text-16 ">SHIPPING</h2>
          {shipmentFee === "Free"}
          <h2 className="text-16">
            <span className="text-20">
              {subtotal > 250 ? "Free" : `AED ${20}`}
            </span>
          </h2>
        </div>
        <hr className="w-full mx-auto border-[#D2D2D2]" />

        <div className="flex justify-between items-center">
          <h2 className="text-16 ">TOTAL</h2>
          <h2 className="text-20 ">
            AED{" "}
            <span>
              {subtotal > 250 ? subtotal : Number(20) + subtotal}
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
        <div className="flex justify-center items-center  gap-5">

          <p className="w-fit"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.64377 9.13623H5.33864V18.9736H1.64377C1.43703 18.9736 1.23876 18.8916 1.09257 18.7453C0.946384 18.5991 0.864258 18.4008 0.864258 18.1942V9.91574C0.864258 9.709 0.946384 9.51073 1.09257 9.36454C1.23876 9.21837 1.43703 9.13623 1.64377 9.13623Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.33887 9.13568L9.29876 2.80607C9.45222 2.5559 9.66787 2.34973 9.92469 2.20766C10.1815 2.06558 10.4708 1.99247 10.7642 1.99539C10.9954 1.98705 11.2258 2.02512 11.442 2.10737C11.6582 2.18962 11.8557 2.31436 12.0228 2.47424C12.19 2.63411 12.3234 2.82586 12.4151 3.03817C12.5069 3.25047 12.5552 3.47902 12.5571 3.7103V8.24703H19.4012C19.654 8.25524 19.9023 8.31687 20.1297 8.42791C20.3571 8.53893 20.5584 8.69681 20.7204 8.8912C20.8824 9.08558 21.0014 9.31204 21.0696 9.55571C21.1378 9.79937 21.1537 10.0547 21.1161 10.3049L19.8689 18.3495C19.8157 18.7794 19.6072 19.1751 19.2829 19.4622C18.9585 19.7493 18.5404 19.908 18.1071 19.9085H7.88006C7.39321 19.9104 6.91268 19.7983 6.47694 19.581L5.35446 19.0198" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.33887 9.13586V18.9733" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          </p>

          <div className="flex flex-col justify-center h-full">
            <p className="p-0 m-0 text-primary font-futura text-sm">Buy with confidence</p>
            <p className="p-0 m-0 text-[#827277] font-futura text-sm flex gap-5">Free easy returns up to 14 days. <Link href="/return-refund" className="text-[#9F9592] text-sm font-futura cursor-pointer">Learn more</Link></p>
          </div>


        </div>
        <div className="pt-4" >
          <div className="grid grid-cols-4 xl:grid-cols-6 gap-2 py-2 text-black justify-start xl:justify-between  w-full items-center ">
            {FooterPaymentMethods.map((item, index) => {
              return (
                <div className=" px-2 rounded-md flex justify-center items-center bg-white shadow-lg h-14"key={index} >
                  <Image
                  src={item.imageUrl}
                  alt="master"
                  width={85}
                  height={35}
                  className=" object-contain  rounded-md cursor-pointer"
                  
                />
                </div>


              )


            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutData;
