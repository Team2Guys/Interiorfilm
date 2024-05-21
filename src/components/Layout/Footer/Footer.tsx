"use client";

import React from 'react';
import { Layout } from 'antd';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import Link from 'next/link';
import logo from "../../../../public/images/logo.png"
import Image from 'next/image';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="text-gray-800 py-8 bg-secondary ">
      <div className="container lg:px-40 mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0">
          <Image width={100} height={100} src={logo} alt="Interior Film" className="w-32 mb-4" />
          <p>Contact Info</p>
          <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
          <div className="flex space-x-4 mt-4">
            <Link href="https://facebook.com"  className='hover:text-primary'>
              <FaFacebookF className="text-xl hover:text-primary" />
            </Link>
            <Link href="https://twitter.com"  className='hover:text-primary'>
              <FaTwitter className="text-xl hover:text-primary" />
            </Link>
            <Link href="https://instagram.com"  className='hover:text-primary'>
              <FaInstagram className="text-xl hover:text-primary" />
            </Link>
            <Link href="https://pinterest.com"  className='hover:text-primary'>
              <FaPinterest className="text-xl hover:text-primary" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link href={"/"} className='hover:text-primary'>Laptops & Computers</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Cameras & Photography</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Smart Phones & Tablets</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Video Games & Consoles</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>TV & Audio</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Gadgets</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Waterproof Headphones</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li><Link href={"#"} className='hover:text-primary'>My Account</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Discount</Link></li>
              <li><Link href={"#"} className='hover:text-primary'></Link></li>
              <li><Link href={""} className='hover:text-primary'>Orders History</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Order Tracking</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Pages</h4>
            <ul className="space-y-2">
              <li><Link href={"#"} className='hover:text-primary'>Blog</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Browse the Shop</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Category</Link></li>
              <li> <Link href={"#"} className='hover:text-primary'>Pre-Built Pages</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>Visual Composer Elements</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>WooCommerce Pages</Link></li>
              <li><Link href={"#"} className='hover:text-primary'>WooCommerce Shortcodes</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
