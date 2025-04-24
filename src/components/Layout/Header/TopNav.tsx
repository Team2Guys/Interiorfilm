import Link from "next/link";
import React from "react";
import { BsInstagram, BsTelephone } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { TiSocialFacebook } from "react-icons/ti";
import Container from "../Container/Container";

const TopNav = () => {
  return (
    <div className="bg-primary hidden sm:block border-b py-2 border-primary w-full z-99 relative   ">
      <Container className="flex justify-between lg:grid grid-cols-1 md:grid-cols-3 text-center space-y-1 lg:space-y-0 items-center ">
        <div className="flex flex-col lg:flex-row items-start lg:items-center  justify-center md:justify-start  gap-1 lg:gap-4 xl:gap-10">
          <Link
            href={`tel:+971 04 589 9888`}
            className="flex gap-1 lg:gap-2 items-center text-white"
          >
            <BsTelephone className="text-white text-12 lg:text-20" />
            <div className="text-9 md:text-10 lg:text-12 font-normal">
              +971 04 589 9888
            </div>
          </Link>
          <Link
            href="mailto:info@interiorfilm.ae"
            target="_blank"
            rel="noopener"
            className="flex gap-2 items-center text-white"
          >
            <TfiEmail className="text-white text-12 lg:text-20" />
            <div className="text-9 md:text-10 lg:text-12 font-normal">
              info@interiorfilm.ae
            </div>
          </Link>
        </div>
        <div>
          <p className="uppercase text-white text-9 md:text-11 lg:text-12 xl:text-14 whitespace-nowrap">
            <Link href={"/shipment-policy"} className="cursor-pointer hover:underline">Free shipping</Link> throughout
            mainland UAE on all orders above <span className="font-currency text-16"></span> 250
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
      </Container>
    </div>
  );
};

export default TopNav;
