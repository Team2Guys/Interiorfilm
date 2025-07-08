"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { socialLinks, customerCare, pages } from "data/FooterData";
import whitelogo from "../../../../public/images/logowhite.png";
import { SlEnvolopeLetter } from "react-icons/sl";
import Button from "components/ui/Button/Button";
import axios from "axios";
import {footerlink,} from "data/Data";
import PaymentMethod from "../PaymentMethod";
import showToast from "components/Toaster/Toaster";

const Footer: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isCustomerCareOpen, setIsCustomerCareOpen] = useState(true);
  const [isPagesOpen, setIsPagesOpen] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleCustomerCare = () => setIsCustomerCareOpen(!isCustomerCareOpen);
  const togglePages = () => setIsPagesOpen(!isPagesOpen);
  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/promotion/Add_email`,
        { email }
      );
      console.log(response);
      showToast("success", "Email subscribed successfully🎉");
      setEmail("");
    } catch (err) {
      showToast("error", "Failed to subscribe. Please try again😢");
      console.error("Error subscribing email:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <div className="bg-secondary text-white pt-10  pb-10 md:px-2 lg:px-10 xl:px-30">
        <div className="flex flex-wrap md:flex-nowrap justify-between border-b items-center border-slate-500 pb-10 ">
          <div className=" hidden  md:w-3/12 md:flex  flex-wrap items-center justify-between md:justify-start md:flex-nowrap md:gap-4 mx-auto md:mx-0 ">
            <Image
              width={500}
              height={500}
              className="w-[320px] h-auto"
              src="/images/logowhite.png"
              alt="Interior Film"
            />
          </div>

          <div className="flex flex-wrap md:*:flex-nowrap items-center justify-start gap-4 md:justify-end w-full px-3 md:w-9/12 text-white mt-4 md:mt-0">
            <SlEnvolopeLetter
              className="text-primary ml-4 md:ml-12 sm:ml-0"
              size={35}
            />
            <p className="lg:text-base text-sm capitalize text-white">
              SUBSCRIBE TO OUR NEWSLETTER.
            </p>
            <form
              onSubmit={handleEmailSubmit}
              className=" flex items-center justify-center mt-5 md:mt-0 rounded-none h-13 lg:w-125"
            >
              <input
                className="bg-white border border-r-0  h-full rounded-none  px-4 outline-none w-4/6 md:w-5/6 text-black"
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <Button
                className="text-sm px-5 h-full"
                title={loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
                disabled={loading}
              />
            </form>
          </div>
        </div>

        <div className="grid grid-cols-12 px-2 pt-5 md:justify-items-center gap-4">
          <div className="col-span-12  xsm:col-span-12 md:col-span-2 lg:md:col-span-3">
            <div className="  md:hidden flex flex-wrap items-center  md:justify-start md:flex-nowrap md:gap-4 mx-auto md:mx-0 ">
              <Image
                width={250}
                height={250}
                src={whitelogo}
                alt="Interior Film"
              />
            </div>
            <div className="lg:pb-0 pb-3">
              <p className=" text-slate-200 md:text-13 lg:text-base md:font-normal">
                Our mission is to bring the latest and best architechtural vinyl
                film wrap at the lowest possible prices
              </p>

              <div className="flex items-center flex-wrap gap-4 py-2 lg:order-2 order-1 text-white dark:text-black">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    className="hover:text-primary link-footer"
                  >
                    {React.createElement(require("react-icons/fa")[link.icon], {
                      className: "text-xl hover:text-primary link-footer",
                    })}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className=" lg:pb-0 pb-3 col-span-12 2xsm:col-span-6 xsm:col-span-4 sm:col-span-4 md:col-span-2 ">
            <h3
              className="font-semibold lg:mb-4 mb-2 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
              onClick={toggleCategories}
            >
              Collections
         
            </h3>
            <div className="flex md:block gap-16">
              <ul
                className={`space-y-2 md:space-y-0 lg:space-y-2 transition-all duration-300 overflow-hidden ${isCategoriesOpen ? "max-h-96" : "max-h-0"
                  } md:max-h-none`}
              >
                {footerlink.map((navItem, index) => {
                  const slug = navItem.title.includes("Series")
                    ? `/products?category=${navItem.ref}`
                    : `/${navItem.ref}`;
                  return (
                    <li key={index}>
                      <Link

                        href={slug}
                        className="hover:text-primary link-footer text-slate-400 cursor-pointer whitespace-nowrap text-base md:text-14 xl:text-base"
                      >
                        {navItem.title.replace("Series", "")}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:pb-0 pb-3 whitespace-nowrap col-span-12 2xsm:col-span-6 xsm:col-span-3 sm:col-span-4 md:col-span-2 ">
            <h3
              className="font-semibold lg:mb-4 mb-2 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
              onClick={toggleCustomerCare}
            >
              Quick Links
            </h3>
            <ul
              className={`space-y-2 md:space-y-0 lg:space-y-2 transition-all duration-300 overflow-hidden ${isCustomerCareOpen ? "max-h-96" : "max-h-0"
                } md:max-h-none`}
            >
              {customerCare.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-primary link-footer text-slate-400 text-base md:text-14 xl:text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pb-0 pb-3 whitespace-nowrap col-span-12 2xsm:col-span-12 xsm:col-span-5 sm:col-span-4 md:col-span-3 lg:col-span-2">
            <h3
              className="font-semibold mb-4 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
              onClick={togglePages}
            >
              Policies
            </h3>
            <ul
              className={`space-y-2 md:space-y-0 lg:space-y-2 transition-all duration-300 overflow-hidden ${isPagesOpen ? "max-h-96" : "max-h-0"
                } md:max-h-none`}
            >
              {pages.map((page, index) => (
                <li key={index}>
                  <Link
                    href={`/${page.href}`}
                    className="hover:text-primary link-footer text-slate-400 text-base md:text-14 xl:text-base"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pb-0 pb-3 col-span-12 sm:col-span-12 md:col-span-3">
            <p className="lg:text-lg text-sm font-semibold mb-4">Contact us</p>

            <div className="w-full lg:w-auto md:w-2/3 text-slate-400">
              <Link
                target="_blank"
                href={
                  "https://www.google.com/maps/place/interiorfilm.ae/@25.2365707,55.307743,21z/data=!4m14!1m7!3m6!1s0x3e5f439cc8bb1d43:0xd3d5fae1dc84d0c0!2sFloors+And+Walls+Dubai!8m2!3d25.2370265!4d55.3080125!16s%2Fg%2F11qrkn8_1q!3m5!1s0x3e5f43e5c67a5595:0xdb1aeea922163a0a!8m2!3d25.2364864!4d55.3079376!16s%2Fg%2F11sz9pys8k?hl=en&entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"
                }
                className="md:text-12 lg:text-base"
              >
                ELITE CONCEPTS GENERAL TRADING LLC <br />
                Shop 5 Khalil Al Sayegh Building, Oud Metha, Umm Hurrair Dubai UAE
              </Link>
              <p>
                <Link
                  href="mailto:info@interiorfilm.ae"
                  target="_blank"
                  className="hover:text-primary"
                >
                  info@interiorfilm.ae
                </Link>
              </p>
              <p>
                <Link
                  className="text-14 font-normal hover:text-primary"
                  href={`tel:+97145899888`}
                >
                  +971 4 589 9888
                </Link>
              </p>
              <br />
            </div>

            <PaymentMethod />
          </div>
        </div>
      </div>
      <div className="bg-white  flex justify-center items-center">
        <p className="text-text h-12 flex items-center">
          Interior film © 2024. All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
