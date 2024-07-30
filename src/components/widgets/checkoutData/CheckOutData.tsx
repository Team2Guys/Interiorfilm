//@ts-nocheck
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import { usePathname } from 'next/navigation';
import { IoCloseSharp } from 'react-icons/io5';
import PRODUCTS_TYPES from 'types/interfaces';
import { IoIosClose } from 'react-icons/io';

interface TableProps {
  cartdata: PRODUCTS_TYPES[];
  onCartChange: (updatedCart: PRODUCTS_TYPES[]) => void;
}

const CheckoutData: React.FC<TableProps> = ({ cartdata, onCartChange }) => {
  const pathName = usePathname();
  const [data, setData] = useState<PRODUCTS_TYPES[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [subtotal, setSubtotal] = useState(0);
  const [changeId, setChangeId] = useState<number | null>(null);

  const ProductHandler = () => {
    const Products = localStorage.getItem("cart");
    if (Products && JSON.parse(Products).length > 0) {
      const items = JSON.parse(Products || "[]");
      setData(items);
      setCounts(
        items.reduce((acc: any, item: any, index: number) => {
          acc[index] = item.count || 1;
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
    <div className="bg-white p-6 border border-shade rounded-md ">
      <div className="space-y-4">
        {data.map((product, index) => (
          <div className="p-2 rounded-md mt-5 bg-white shadow " key={index}>
              <div className="flex gap-3 justify-between">
                <div className=" w-8/12 flex gap-2">
                    <Image
                      className=""
                      width={100}
                      height={100}
                      src={product.imageUrl[0].imageUrl || product.imageUrl}
                      alt="Product"
                    />
                  <div>
                <h1 className="text-14 font-semibold">
                    {typeof product.name === "string" ? product.name : ""}
                  </h1>
                  <p>
                    AED{" "}
                    <span>
                      {product.discountPrice
                        ? product.discountPrice * (counts[index] || 1)
                        : product.price * (counts[index] || 1)}
                    </span>
                    .00
                  </p>
                    <div className={` text-sm font-semibold`}>
                    {counts[index] || 1}X
                    </div>
                  
                  <div className="flex gap-2 items-center">
                    <p className="font-semibold text-base">Dimension : 1.22</p>{" "}
                    <IoIosClose size={20} />
                    <div className={` text-sm font-semibold`}
                    >{product.length}mm</div>
                  </div>
                  </div>
                </div>
                <div className="space-y-1 w-4/12">
                <p className='float-end'>
                  AED{" "}
                  <span>
                    {product.discountPrice
                      ? product.discountPrice * (counts[index] || 1) * product.length
                      : product.price * (counts[index] || 1) * product.length}
                  </span>
                  .00
                </p>
                </div>
              </div>
            
          </div>
        ))}
      </div>

      <div className="w-full bg-[#EFEFEF] px-8 py-14 space-y-3 rounded-sm  mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-[27px] ">Subtotals:</h1>
          <h1 className="text-[24px]  ">
            AED <span>{subtotal}</span>.00
          </h1>
        </div>
        <hr className="w-full mx-auto border-gray" />
        <div className="flex justify-between items-center">
          <h1 className="text-[27px] ">Total:</h1>
          <h1 className="text-[24px] ">
            AED <span>{subtotal}</span>.00
          </h1>
        </div>
        <hr className="w-full mx-auto border-gray" />
        <div className="flex justify-center items-center">
          <button className="w-full bg-black hover:bg-dark text-white py-3">Confirm Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutData;
