"use client";

import { Pagination } from "antd";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


const TableTwo: React.FC = () => {
  const [category, setCategory] = useState<any[]>();
  const CategoryHandler = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
    );
    const Categories = await response.json();
    setCategory(Categories);
  };
  
  useLayoutEffect(() => {
    CategoryHandler();
  }, []);
  


  return (
    <>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 md:col-span-3 flex items-center">
          <p className="font-medium text-black dark:text-white">Category Image</p>
        </div>
        <div className="col-span-2 md:col-span-3  items-center sm:flex">
          <p className="font-medium text-black dark:text-white" >Category Name</p>
        </div>
        <div className="col-span-2 flex items-center justify-end md:justify-start">
          <p className="font-medium text-black dark:text-white">Action</p>
        </div>
      </div>

      {category && category.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 md:col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.posterImageUrl.imageUrl}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
            </div>
          </div>
          <div className=" col-span-2 md:col-span-3  items-center flex">
            <p className="text-sm text-black dark:text-white">
              {product.name}
            </p>
          </div>
          <div className="col-span-2 flex gap-4 items-center justify-end md:justify-start">
          <FaEye className="text-black dark:text-white" size={20} />
          <FaEdit className="text-black dark:text-white" size={20} />
          <MdDeleteOutline className="text-black dark:text-white" size={20} />

          </div>
        </div>
      ))}
      
    </div>
  
    </>
  );
};

export default TableTwo;
