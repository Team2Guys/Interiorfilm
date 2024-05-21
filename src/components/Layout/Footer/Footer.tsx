"use client";

import React, { useState } from 'react';
import { Layout } from 'antd';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Link from 'next/link';
import logo from "../../../../public/images/logo.png";
import Image from 'next/image';
import { socialLinks, categories, customerCare, pages } from 'data/FooterData';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCustomerCareOpen, setIsCustomerCareOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleCustomerCare = () => setIsCustomerCareOpen(!isCustomerCareOpen);
  const togglePages = () => setIsPagesOpen(!isPagesOpen);

  return (
    <AntFooter className="text-gray-800 lg:py-8 px-0 bg-secondary">
      <div className="container lg:px-0 md:px-0 mx-auto px-4 lg:pb-0 pb-8 flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0">
          <Image width={100} height={100} src={logo} alt="Interior Film" className="w-32 mb-4" />
          <p>Contact Info</p>
          <p className='w-2/3 '>17 Princess Road, London, Greater London NW1 8JR, UK</p>
          <div className="flex space-x-4 mt-4">
            {socialLinks.map((link, index) => (
              <Link key={index} href={link.href} className='hover:text-primary'>
                {React.createElement(require('react-icons/fa')[link.icon], { className: "text-lg hover:text-primary" })}
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
              {categories.map((category, index) => (
                <li key={index}>
                  <Link href={category.href} className='hover:text-primary'>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='lg:pb-0 pb-3'>
            <h3 
              className="font-semibold lg:mb-4 mb-2 cursor-pointer md:cursor-auto flex items-center lg:text-lg text-sm justify-between"
              onClick={toggleCustomerCare}
            >
              Customer Care
              <span className="ml-2 md:hidden">
                {isCustomerCareOpen ? <FaAngleUp /> : <FaAngleDown />}
              </span>
            </h3>
            <ul className={`space-y-2 transition-all duration-300 overflow-hidden ${isCustomerCareOpen ? 'max-h-96' : 'max-h-0'} md:max-h-none`}>
              {customerCare.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className='hover:text-primary'>{item.name}</Link>
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
                  <Link href={page.href} className='hover:text-primary'>{page.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
