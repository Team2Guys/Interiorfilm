"use client";

import { PRODUCTBRANCH } from "types/types";
import Image from "next/image";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const brandData: PRODUCTBRANCH[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    price: 120,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Twitter",
    price: 120,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Github",
    price: 120,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    price: 120,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    price: 120,

  },
];

const ViewProduct = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 ">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Product
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Price
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3  ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">AED {brand.price}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
            <div className="col-span-2 flex gap-4 items-center justify-end md:justify-start">
            <FaEye className="text-black dark:text-white" size={20} />
            <FaEdit className="text-black dark:text-white" size={20} />
            <MdDeleteOutline className="text-black dark:text-white" size={20} />

            </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
