import Link from "next/link";
import React from "react";
import { BsInstagram, BsTelephone } from "react-icons/bs";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { TiSocialFacebook } from "react-icons/ti";
import Container from "../Container/Container";

const TopNav = () => {
  return (
    <div className="bg-primary hidden sm:block border-b py-2 border-primary w-full z-99 relative   ">
      <div className="grid grid-cols-1 md:grid-cols-3 text-center space-y-1 lg:space-y-0 items-center lg:max-w-[1140px] xl:max-w-[1390px] 2xl:max-w-[1810px] lg:ml-auto px-2 sm:px-4  lg:px-10 xl:px-14 ">
        <div className="flex flex-wrap items-center justify-center lg:justify-start lg:text-start  gap-4 xl:gap-10">
          <Link
            href={`tel:+971 52 191 9327`}
            className="flex gap-2 items-center text-white"
          >
            <BsTelephone className="text-white text-14 lg:text-20" />
            <div className="text-12 md:text-10 lg:text-13 font-normal">
              +971 52 191 9327
            </div>
          </Link>
          <Link
            href="mailto:info@interiorfilm.ae"
            target="_blank"
            rel="noopener"
            className="flex gap-2 items-center text-white"
          >
            <TfiEmail className="text-white text-14 lg:text-20" />
            <div className="text-12 md:text-10 lg:text-13 font-normal">
              info@interiorfilm.ae
            </div>
          </Link>
        </div>
        <div>
          <p className="uppercase text-white text-[10px] sm:text-xs md:text-10 lg:text-14 whitespace-normal md:whitespace-nowrap ">
            <Link href={"/shipment-policy"} className="cursor-pointer hover:underline">Free shipping</Link> throughout
            mainland UAE on all orders above AED 250
          </p>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-3 ">
          <Link
            className="text-13 font-normal  bg-white p-1 rounded-full"
            target="_blank"
            rel="noopener"
            href="https://www.facebook.com/Interiorfilmuae"
          >
            <TiSocialFacebook className="text-primary" size={18} />
          </Link>
          <Link
            className="text-13 font-normal bg-black p-1 rounded-full"
            target="_blank"
            rel="noopener"
            href="https://www.instagram.com/interiorfilmuae/"
          >
            <BsInstagram className="text-white rounded-md" size={18} />
          </Link>
          <Link
            className="text-13 font-normal bg-white p-1 rounded-full"
            target="_blank"
            rel="noopener"
            href="https://www.pinterest.com/interiorfilmuae/"
          >
            <FaPinterest className="text-[#E60023] rounded-md" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
