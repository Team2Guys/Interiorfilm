"use client";

import React, { useState, useLayoutEffect } from "react";
import { Layout } from "antd";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { socialLinks, customerCare, pages } from "data/FooterData";
import card6 from "../../../../public/images/payment-icons/Mastercard-Logo.png";
import card2 from "../../../../public/images/payment-icons/applepay-logo.png";
import card1 from "../../../../public/images/payment-icons/amex_82052.png";
import card7 from "../../../../public/images/payment-icons/googlepay-logo.png";
import card5 from "../../../../public/images/payment-icons/tabby-logo.png";
import card3 from "../../../../public/images/payment-icons/tamara-logo.png";
import card4 from "../../../../public/images/payment-icons/visacard-logo.png";
import Container from "../Container/Container";
import { SlEnvolopeLetter } from "react-icons/sl";
import Button from "components/ui/Button/Button";
import axios from "axios";
import { CategoriesType } from "types/interfaces";
import PreFooter from "./PreFooter";
import { FooterPaymentMethods, generateSlug, PaymentMethods } from "data/Data";
import { usePathname, useRouter } from "next/navigation";
import PaymentMethod from "../PaymentMethod";

const Footer: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isCustomerCareOpen, setIsCustomerCareOpen] = useState(true);
  const [isPagesOpen, setIsPagesOpen] = useState(true);
  const [category, setCategory] = useState<CategoriesType[]>([]);
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleCustomerCare = () => setIsCustomerCareOpen(!isCustomerCareOpen);

  const pathname = usePathname();
  const togglePages = () => setIsPagesOpen(!isPagesOpen);
  const bottomImages = [card1, card2, card3, card4, card5, card6, card7];
  const CategoryHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
      );
      setCategory(response.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  useLayoutEffect(() => {
    CategoryHandler();
  }, []);
  const router = useRouter();
  const handleButtonClick = (categoryName: string) => {
    const slug = generateSlug(categoryName);
    router.push(`/products?category=${slug}`);
  };

  return (
    <>
      {/* {pathname == "/" || pathname == "/about" ? null : <PreFooter />} */}

      <div className="bg-secondary text-white pt-10  pb-10 md:px-8 lg:px-30">
        <div className="flex flex-wrap md:flex-nowrap justify-between border-b items-center border-slate-500 pb-10 ">
          <div className=" hidden  md:w-4/12 md:flex  flex-wrap items-center justify-between md:justify-start md:flex-nowrap md:gap-4 mx-auto md:mx-0 ">
            <Image
              width={500}
              height={500}
              className="w-[320px] h-auto"
              src="/images/logowhite.png"
              alt="Interior Film"
            />
          </div>

          <div className="flex flex-wrap md:*:flex-nowrap items-center justify-start md:justify-end gap-2 w-full px-3 md:w-8/12 text-white mt-4 md:mt-0">
            <SlEnvolopeLetter
              className="text-primary ml-4 md:ml-12 sm:ml-0"
              size={35}
            />
            <p className="lg:text-base text-sm capitalize text-white">
              SUBSCRIBE TO OUR NEWSLETTER.
            </p>
            <div className="ml-5 flex items-center justify-center mt-5 md:mt-0 rounded-none h-13">
              <input
                className="bg-white border border-r-0  h-full rounded-none  px-4 outline-none w-4/6 md:w-auto text-black"
                type="email"
                placeholder="Enter Email Address"
              />
              <Button className="text-sm px-5  h-full" title={"SUBSCRBE"} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 px-2 pt-5 md:justify-items-center gap-4">
          <div className="col-span-12  xsm:col-span-12 md:col-span-3">
            <div className="  md:hidden flex flex-wrap items-center  md:justify-start md:flex-nowrap md:gap-4 mx-auto md:mx-0 ">
              <Image
                width={250}
                height={250}
                src="/images/logowhite.png"
                alt="Interior Film"
              />
            </div>
            <div className="lg:pb-0 pb-3">
              <p className=" text-slate-200">
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content.
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
                      className: "text-lg hover:text-primary link-footer",
                    })}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className=" lg:pb-0 pb-3 col-span-12 2xsm:col-span-6 xsm:col-span-4 md:col-span-2 ">
              <h3
                className="font-semibold lg:mb-4 mb-2 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
                onClick={toggleCategories}
              >
                Collections
                <span className="ml-2 md:hidden ">
                  {isCategoriesOpen ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </h3>
              <div className="flex md:block gap-16">
                <ul
                  className={`space-y-2 transition-all duration-300 overflow-hidden ${
                    isCategoriesOpen ? "max-h-96" : "max-h-0"
                  } md:max-h-none`}
                >
                  {category.map((categoryItem, index) => (
                    <li key={index}>
                      <div
                        onClick={() => handleButtonClick(categoryItem.name)}
                        className="hover:text-primary link-footer text-slate-400 cursor-pointer whitespace-nowrap"
                      >
                        {categoryItem.name.replace("Series", "")}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:pb-0 pb-3 whitespace-nowrap col-span-12 2xsm:col-span-6 xsm:col-span-4 md:col-span-2 ">
              <h3
                className="font-semibold lg:mb-4 mb-2 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
                onClick={toggleCustomerCare}
              >
                Quick Links
                <span className="ml-2 md:hidden">
                  {isCustomerCareOpen ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </h3>
              <ul
                className={`space-y-2 transition-all duration-300 overflow-hidden ${
                  isCustomerCareOpen ? "max-h-96" : "max-h-0"
                } md:max-h-none`}
              >
                {customerCare.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="hover:text-primary link-footer text-slate-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pb-0 pb-3 whitespace-nowrap col-span-12 2xsm:col-span-12 xsm:col-span-4 md:col-span-2">
              <h3
                className="font-semibold mb-4 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
                onClick={togglePages}
              >
                Policies
                <span className="ml-2 md:hidden">
                  {isPagesOpen ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </h3>
              <ul
                className={`space-y-2 transition-all duration-300 overflow-hidden ${
                  isPagesOpen ? "max-h-96" : "max-h-0"
                } md:max-h-none`}
              >
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link
                      href={`/${page.href}`}
                      className="hover:text-primary link-footer text-slate-400"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pb-0 pb-3 col-span-12 sm:col-span-12 md:col-span-3">
              <p className="text-17 font-semibold">Contact us</p>

              <div className="w-full lg:w-auto md:w-2/3 text-slate-400">
                Yellowzone Trading, Al Nabooda Tower A, Shop 6, Oud Metha,
                Dubai, UAE
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
                    className="text-12 lg:text-13 font-normal"
                    href={`tel:+971 52 191 9327`}
                  >
                    +971 52 191 9327
                  </Link>
                </p>
                <br />
              </div>

              <PaymentMethod />

              {/* <div className="flex items-center flex-wrap gap-2 py-2 lg:order-2 order-1 text-black dark:text-white">
                {bottomImages.map((image, index) => (
                  <Image
                    key={index}
                    width={100}
                    height={0}
                    src={image}
                    alt="Interior Film"
                    className="w-10 rounded-sm"
                  />
                ))}
              </div> */}
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
