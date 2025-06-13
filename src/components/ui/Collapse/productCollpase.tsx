"use client";
import React from "react";
import { ReactNode } from "react";
import { BsPlus } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { HiMinusSm } from "react-icons/hi";

interface CollapseProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
  titleClass?: string;
  className?: string;
  isHome?: boolean
  Icon?: any
}

const ProductCollapse: React.FC<CollapseProps> = ({
  title,
  children,
  isOpen,
  onClick,
  className,
  titleClass,
  isHome,
  Icon
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className={`w-full ${className}`} >
        {
          Icon ?
            <div className="w-fit ml-4 sm:ml-0">
              {Icon}
            </div> : null
        }

        <div className="w-full">
          <button
            className="w-full px-4 py-2 text-left focus:outline-none"
            onClick={onClick}
          >
            <div className="flex w-full justify-between items-center  gap-3">
              <h3 className={`${titleClass }   `}>{title}</h3>
              <span>{isOpen ? isHome ? <HiMinusSm className="text-2xl " /> : <MdKeyboardArrowUp className="text-3xl" /> : isHome ? <BsPlus className="text-3xl " /> : <MdKeyboardArrowDown className="text-3xl" />}</span>
            </div>
          </button>

          <div className={`overflow-hidden w-full  ${isOpen ? "max-h-screen" : "max-h-0"}`}>
            <div className="px-4 py-2">{children}</div>
          </div>


        </div>
      </div>



      <hr className="text-[#8d898927]" />

    </div>

  );
};

export default ProductCollapse;
