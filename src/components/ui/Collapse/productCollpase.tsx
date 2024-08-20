"use client";
import { ReactNode } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface CollapseProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
  titleClass?: string;
  className?: string;
}

const ProductCollapse: React.FC<CollapseProps> = ({
  title,
  children,
  isOpen,
  onClick,
  className,
  titleClass
}) => {
  return (
    <div className={`w-full ${className}`}>
      <button
        className="w-full px-4 py-2 text-left focus:outline-none"
        onClick={onClick}
      >
        <div className="flex justify-between items-center uppercase">
          <span className={`${titleClass}`}>{title}</span>
          <span>{isOpen ? <LuMinus /> : <LuPlus />}</span>
        </div>
      </button>
      <div
        className={`overflow-hidden  ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
};

export default ProductCollapse;
