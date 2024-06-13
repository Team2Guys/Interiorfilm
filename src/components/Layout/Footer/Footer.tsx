"use client";

import React, { useState,useLayoutEffect } from 'react';
import { Layout } from 'antd';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Link from 'next/link';
import logo from "../../../../public/images/logo.png";
import Image from 'next/image';
import { socialLinks, categories, customerCare, pages } from 'data/FooterData';
import paypal from "../../../../public/images/paypal.jpg";
import visacard from "../../../../public/images/visacard.jpg";
import mastercard from "../../../../public/images/mastercard.jpg";
import maestrocard from "../../../../public/images/maestrocard.jpg";
import Container from '../Container/Container';
import { SlEnvolopeLetter } from 'react-icons/sl';
import Button from 'components/ui/Button/Button';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCustomerCareOpen, setIsCustomerCareOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [category, setCategory] = useState<any[]>();
;



  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleCustomerCare = () => setIsCustomerCareOpen(!isCustomerCareOpen);
  const togglePages = () => setIsPagesOpen(!isPagesOpen);
  const bottomImages = [paypal, visacard, mastercard, maestrocard];

  const CategoryHandler = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
    );
    const Categories = await response.json();
    setCategory(Categories);
  };
  
  useLayoutEffect(() => {
    CategoryHandler();
  }, []);
  
  return (
    <>
    <div className='bg-white pt-10'>
    <Container>
      <div className='flex flex-wrap md:flex-nowrap justify-between'>
        <div className='flex items-center gap-2 w-full md:w-2/6 text-black dark:text-white'>
        <SlEnvolopeLetter className='text-primary' size={35} />
        <p className='lg:text-base text-sm '><span className='text-primary '>$90 OFF*</span> YOUR ORDER! SUBSCRBE TO OUR NEWSLETTER TODAY.</p>
        </div>
        <div className='flex items-center justify-center mt-5 md:mt-0 rounded-none'>
          <input className='bg-secondary rounded-none h-8 px-2 outline-primary w-4/6 md:w-auto' type='email' placeholder='Enter Email Address'/>
          <Button className='text-sm px-5' title={"SUBSCRBE"}/>
        </div>
      </div>
    </Container>
    </div>
    <div className="bg-secondary">
      <Container className="text-gray-800 lg:py-8 pt-8 pb-0 px-0  mt-10">
        <div className="container lg:px-0 md:px-0 mx-auto px-4 lg:pb-0 flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Image width={100} height={100} src={logo} alt="Interior Film" className="w-32 mb-4" />
            <p>Contact Info</p>
            <p className='w-2/3 '>17 Princess Road, London, Greater London NW1 8JR, UK</p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href} className='hover:text-primary link-footer'>
                  {React.createElement(require('react-icons/fa')[link.icon], { className: "text-lg hover:text-primary link-footer" })}
                </Link>
              ))}
            </div>
          </div>
          <hr className='lg:hidden bg-primary mb-5' />
          <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-24">
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
                {category && category.map((category, index) => (
                  <li key={index}>
                    <Link href="/" className='hover:text-primary link-footer'>{category.name}</Link>
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
      </Container>
      </div>
      <div className="bg-primary">
      <Container className='lg:py-0 py-3 lg:mt-0 lg:mb-0 mb-6'>
        <div className='container mx-auto'>
          <div className="flex items-center flex-wrap lg:justify-between justify-center">
            <div className='text-white lg:order-1 order-2'>
              <p className='text-xs'>© Interior Film - All Rights Reserved</p>
            </div>
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
        </div>
      </Container>
      </div>
    </>
  );
};

export default Footer;
