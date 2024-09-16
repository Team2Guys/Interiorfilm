"use client";
import { ReactNode } from "react";
import { BsPlus } from "react-icons/bs";
import { LuMinus, LuPlus } from "react-icons/lu";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

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
            <div className="w-fit">
              {Icon}
            </div> : null
        }

        <div className="w-full">


          <button
            className="w-full px-4 py-2 text-left focus:outline-none"
            onClick={onClick}
          >
            <div className="flex w-full justify-between items-center gap-3">
              <span className={`${titleClass}`}>{title}</span>
              <span>{isOpen ? isHome ? <RxCross2 className="text-2xl " /> : <MdKeyboardArrowUp className="text-3xl" /> : isHome ? <BsPlus className="text-3xl " /> : <MdKeyboardArrowDown className="text-3xl" />}</span>
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
