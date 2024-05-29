"use client";
import { useState, ReactNode } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface CollapseProps {
  title: string;
  children: ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full">
      <button
        className="w-full px-4 py-2 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center uppercase">
          <span>{title}</span>
          <span>{isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</span>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
};

export default Collapse;
