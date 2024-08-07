"use client";

import React, { useState,useLayoutEffect } from 'react';
import { Layout } from 'antd';
import {FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Link from 'next/link';
import logo from "../../../../public/images/new/logo.png";
import Image from 'next/image';
import { socialLinks, categories, customerCare, pages } from 'data/FooterData';
import card1 from "../../../../public/images/new/card1.png";
import card2 from "../../../../public/images/new/card2.png";
import card3 from "../../../../public/images/new/card3.png";
import card4 from "../../../../public/images/new/card4.png";
import Container from '../Container/Container';
import { SlEnvolopeLetter } from 'react-icons/sl';
import Button from 'components/ui/Button/Button';
import axios from 'axios';
import {CategoriesType} from 'types/interfaces'

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCustomerCareOpen, setIsCustomerCareOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [category, setCategory] = useState<CategoriesType[]>([]);
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleCustomerCare = () => setIsCustomerCareOpen(!isCustomerCareOpen);
  const togglePages = () => setIsPagesOpen(!isPagesOpen);
  const bottomImages = [card1, card2, card3,card4];
  const CategoryHandler = async () => {
try{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
  console.log(response, "response")
  setCategory(response.data);
}catch(err){
  console.log(err, "err")

}
  };
  
  useLayoutEffect(() => {
    CategoryHandler();
  }, []);
  return (

    <>
    <div className='bg-secondary text-white pt-10 px-8 pb-10'>
      <div className='flex flex-wrap md:flex-nowrap justify-between border-b pb-10'>
        <div className='w-4/12 flex flex-wrap items-center md:flex-nowrap md:gap-4 mx-auto md:mx-0 space-y-3 md:space-y-0'>
          <Image width={200} height={200} src={logo} alt="Interior Film"/>
          <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href} className='hover:text-primary link-footer'>
                  {React.createElement(require('react-icons/fa')[link.icon], { className: "text-lg hover:text-primary link-footer" })}
                </Link>
              ))}
            </div>
        </div>
        <div className='flex flex-wrap md:*:flex-nowrap items-center justify-end gap-2 w-full md:w-8/12 text-white mt-4 md:mt-0'>
        <SlEnvolopeLetter className='text-primary' size={35} />
        <p className='lg:text-base text-sm capitalize text-white'>SUBSCRBE TO OUR NEWSLETTER.</p>
        <div className='flex items-center justify-center mt-5 md:mt-0 rounded-none'>
          <input className='bg-secondary border border-r-0 py-4 rounded-none h-9 px-2 outline-none w-4/6 md:w-auto' type='email' placeholder='Enter Email Address'/>
          <Button className='text-sm px-5' title={"SUBSCRBE"}/>
        </div>
        </div>
     
      </div>
    <div className=" text-white px-8">

        <div className=" lg:px-0 md:px-0 mx-auto px-4 lg:pb-0 flex flex-col md:flex-row justify-between mt-10">
          <div className="mb-8 md:mb-0">
            
            <p className='text-17 font-semibold'>Contact us</p>
            <p className='w-full md:w-2/3 '>Yellowzone Trading, Al Nabooda Tower A ,Shop 6, Oud Metha, Dubai, UAE</p>
            <div className='flex items-center gap-2 py-2 lg:order-2 order-1 text-black dark:text-white'>
              {bottomImages.map((image, index) => (
                <Image
                  key={index}
                  width={100}
                  height={0}
                  src={image}
                  alt="Interior Film"
                  className="w-10"
                />
              ))}
            </div> 
          </div>
          <hr className='lg:hidden bg-primary mb-5' />
            <div className='lg:pb-0 pb-3'>
              <h3 
                className="font-semibold lg:mb-4 mb-2 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
                onClick={toggleCategories}
              >
                Categories
                <span className="ml-2 md:hidden">
                  {isCategoriesOpen ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </h3>
              <ul className={`space-y-2 transition-all duration-300 overflow-hidden ${isCategoriesOpen ? 'max-h-96' : 'max-h-0'} md:max-h-none`}>
                {category?.length > 0 && category.slice(0,4).map((category, index) => (
                  <li key={index}>
                    <Link href="/products" className='hover:text-primary link-footer'>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='lg:pb-0 pb-3'>
              <h3 
                className="font-semibold lg:mb-4 mb-2 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
                onClick={toggleCustomerCare}
              >
                Quick Links
                <span className="ml-2 md:hidden">
                  {isCustomerCareOpen ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </h3>
              <ul className={`space-y-2 transition-all duration-300 overflow-hidden ${isCustomerCareOpen ? 'max-h-96' : 'max-h-0'} md:max-h-none`}>
                {customerCare.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className='hover:text-primary link-footer'>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='lg:pb-0 pb-3'>
              <h3 
                className="font-semibold mb-4 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
                onClick={togglePages}
              >
                Pages
                <span className="ml-2 md:hidden">
                  {isPagesOpen ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </h3>
              <ul className={`space-y-2 transition-all duration-300 overflow-hidden ${isPagesOpen ? 'max-h-96' : 'max-h-0'} md:max-h-none`}>
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link href={page.href} className='hover:text-primary link-footer'>{page.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      </div>
    </div>
<div className='bg-white  flex justify-center items-center'>
<p className='text-text h-12 flex items-center'>interior film © 2024. All Rights Reserved</p>
</div>
    </>

  );
};

export default Footer;
