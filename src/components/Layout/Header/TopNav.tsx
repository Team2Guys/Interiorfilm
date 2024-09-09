import Link from 'next/link'
import React from 'react'
import { BsInstagram, BsTelephone } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'
import { IoLogoFacebook } from 'react-icons/io5'
import { TfiEmail } from 'react-icons/tfi'
import { TiSocialFacebook } from "react-icons/ti";

const TopNav = () => {
  return (
    <div className="bg-primary hidden sm:block border-b py-2 border-primary w-full z-99 relative  p-2 lg:px-8 xl:px-32 ">
    <div className="grid grid-cols-1 lg:grid-cols-3 text-center space-y-1 lg:space-y-0 items-center">
      <div className="flex flex-wrap items-center justify-center lg:justify-start lg:text-start  gap-4 xl:gap-10">
        <div className="flex gap-2 items-center text-white">
          <BsTelephone  className="text-white text-14 lg:text-20" />
          <Link
            className="text-12 lg:text-13 font-normal"
            href={`tel:+971 4 252 2025`}
          >
            +971 4 252 2025
          </Link>
        </div>
        <div className="flex gap-2 items-center text-white">
          <TfiEmail  className="text-white text-14 lg:text-20" />
          <Link
            className="text-12 lg:text-13 font-normal"
          href="mailto:info@interiorfilm.ae"
          target='_blank'
          rel="noopener"
          
          >
       info@interiorfilm.ae
          </Link>
        </div>


      </div>
      <div>
        <p className="uppercase text-white text-[10px] sm:text-xs md:text-14 whitespace-normal md:whitespace-nowrap ">
          Free Shipping on over AED 250 EVERYWHERE (WITHIN DUBAI CITY LIMITS.)
        </p>
      </div>
      <div className="flex items-center justify-center lg:justify-end gap-3 ">
      <Link
        className="text-13 font-normal  bg-white p-1 rounded-full"
        target='_blank'
         rel="noopener"
        href="https://www.facebook.com/InteriorFilm.ae"
      >
        <TiSocialFacebook className='text-primary' size={18} />
      </Link>
      <Link
        className="text-13 font-normal bg-black p-1 rounded-full"
        target='_blank'
         rel="noopener"
        href="https://instagram.com/interiorfilm.ae/"
      >
        <BsInstagram className='text-white rounded-md'  size={18} />
      </Link>
    </div>
    </div>

    
  </div>
  )
}

export default TopNav