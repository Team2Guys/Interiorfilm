"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface OverlayProps {
  title: string;
  bodyText?: string;
}

const data = [
  {
    name: "SHIPPING ADDRESS",
    src: "/images/shiping.png",
  },
  {
    name: "PAYMENT INFORMATION",
    src: "/images/payement.png",
  },
  {
    name: "THANK YOU",
    src: "/images/thankyou.png",
  },
];

const Overlay: React.FC<OverlayProps> = ({ title }) => {
  const overLay = ["cart", "shop", "faqs"];
  const uiFlag = overLay.includes(title.toLowerCase());
  const router = useRouter();
  const Tag = title === "Shop" ? "h2" : "h1"; // ✅ moved outside JSX

  return (
    <div
      className={`${
        uiFlag ? "bg-white" : "bg-black"
      } w-full h-auto bg-no-repeat py-5 text-center`}
    >
      {title === "show_details" ? (
        <div className="bg-black py-5 gap-5 flex justify-center items-center">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-4">
              <Image
                className="w-[10px] h-[10px] sm:w-[20px] sm:h-[20px]"
                src={item.src}
                alt="shipping image"
                height={20}
                width={20}
              />
              <p className="text-white text-[7px] sm:text-12 lg:text-base">
                {item.name}
              </p>
              {index !== data.length - 1 && (
                <div className="w-4 md:w-10 h-px bg-white"></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Tag
          className={`lg:text-3xl text-xl font-medium ${
            uiFlag ? "text-black" : "text-white"
          } flex justify-center items-center gap-3 leading-loose uppercase`}
        >
          <span className="cursor-pointer">
            <svg
              onClick={() => router.back()}
              className={`${uiFlag ? "fill-black" : "fill-white"}`}
              width="40"
              height="25"
              viewBox="0 0 55 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M54.6404 14.3224H4.87739L17.3712 1.82617L15.7027 0.157654L0.360352 15.5024L15.7004 30.8424L17.3689 29.1739L4.87739 16.6824H54.6404V14.3224Z" />
            </svg>
          </span>
          {title}
        </Tag>
      )}

      {title !== "show_details" && (
        <div className="flex justify-center space-x-2 text-slate-400 mt-3">
          <Link href="/">Home</Link>
          <span>&gt;</span>
          <span className="text-slate-500">{title}</span>
        </div>
      )}
    </div>
  );
};

export default Overlay;
