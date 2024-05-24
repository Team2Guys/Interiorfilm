import React from 'react'
import Container from '../Container/Container'
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import Link from 'next/link';
import { IoMailOutline, IoSearch } from "react-icons/io5";
import { CiGlobe } from 'react-icons/ci';
import Image from 'next/image';
import logo from "../../../../public//images/logo.png"
import { IoMdHeartEmpty } from 'react-icons/io';
import {  TbCategoryMinus } from 'react-icons/tb';
import { PiBag } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa';
import { RiMenuFold3Fill } from 'react-icons/ri';
import { MdOutlineHome } from 'react-icons/md';
import DrawerMenu from 'components/ui/DrawerMenu/DrawerMenu';
import SelectList from 'components/ui/Select/Select';
import Button from 'components/ui/Button/Button';


const Header = () => {
  return (
    <>
    <div className=' bg-secondary border-b w-full'>
        <Container >
          <div className='flex justify-between flex-wrap lg:flex-nowrap gap-2 p-2 items-center'>
            <div className='flex gap-4 mx-auto md:mx-0' >
                  <div className='flex gap-1 text-sm md:text-base lg:text-lg  items-center hover:underline'>
                  <HiOutlineDevicePhoneMobile  className='text-primary' />
                  <Link  href={"tel:+9213123123"}>+9213123123</Link>
                  </div>
                  <div className='flex gap-1 text-sm md:text-base lg:text-lg  items-center hover:underline'>
                  <IoMailOutline   className='text-primary' />
                  <Link href={"mailto:abc@gmail.com"}>abc@gmail.com</Link>
                  </div>
            </div>
            <div className='hidden lg:flex gap-2  mx-auto md:mx-0' >
                <p className='text-sm md:text-base  text-center lg:text-start'>Get Up To 20% off in your first order</p>
            </div>
            <div className='flex gap-2 items-center mx-auto md:mx-0 ' >
         
                <div className='flex gap-2 items-center text-sm md:text-base lg:text-lg '>
                <CiGlobe className='text-primary'  />
                <Link className='text-sm md:text-base  ' href={"/login"}>Login/Register</Link>
                </div>
            </div>
            </div>
        </Container>
    </div>
    <div className='bg-secondary border-b w-full py-3'>
      <Container >
          <div className='flex justify-between flex-wrap lg:flex-nowrap gap-0 md:gap-2 items-center' >
              <Image className='w-14 lg:w-24' src={logo} alt="logo" width={100} height={100} />
              <DrawerMenu
              width={250}
                title={<><div className='p-1 rounded-md block lg:hidden text-white bg-primary'>
              <TbCategoryMinus  size={20} />
              </div></>}
              content={<>
              <ul className='space-y-2'>
                <li><Link className='text-base font-semibold text-black hover:text-black' href={"/"}>Dinnig</Link></li>
                <li><Link className='text-base font-semibold text-black hover:text-black' href={"/"}>Bedrrom</Link></li>
                <li><Link className='text-base font-semibold text-black hover:text-black' href={"/"}>Kitchen</Link></li>
              </ul>
              </>}
              />
              <div className='border w-3/6 lg:w-full max-w-screen-md flex'>
              <SelectList 
                className=' w-40 h-12 borderless-select border-r hidden lg:block'
                defaultValue="All Categories"
                options={[
                  { value: 'Dining', label: 'Dining' },
                  { value: 'Living', label: 'Living' },
                  { value: 'Bedroom', label: 'Bedroom' },
                ]}
                />
                
                <input className='w-full px-4 focus:outline-none active:border-none focus:border-none border-white ' type="text" placeholder='Search Product Here...'/>
                <Button className='rounded-l-md px-2 md:px-4' title={<IoSearch size={25} />}/>
              </div>
               <DrawerMenu
               width={250}
                title={<><div className='p-1 rounded-md block lg:hidden text-white bg-primary'>
                <RiMenuFold3Fill  size={20} />
                </div></>}
              content={<>
              <ul className='space-y-2'>
                <li><Link className='text-base font-semibold text-black hover:text-black' href={"/"}>Home</Link></li>
                <li><Link className='text-base font-semibold text-black hover:text-black' href={"/product"}>Product</Link></li>
                <li><Link className='text-base font-semibold text-black hover:text-black' href={"/"}>About</Link></li>
                <li><Link className='text-base font-semibold text-black hover:text-black' href={"/"}>Contact</Link></li>
              </ul>
              </>}
              />
              <div className='hidden lg:flex gap-2 md:gap-4 lg:gap-8 '>
                <Link className='relative group ' href={"/"}>
                  <div className='rounded-full text-white w-6 h-6 bg-dark group-hover:bg-primary absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                    1
                  </div>
                <IoMdHeartEmpty className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} />
                </Link>
                <Link className='relative group' href={"/"}>
                  <div className='rounded-full text-white w-6 h-6 bg-dark group-hover:bg-primary absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                    1
                  </div>
                  <PiBag   className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} />
                </Link>
                <Link className='text-base lg:text-lg ' href={"/profile"}><FaRegUser size={25}  className= 'text-primary' /></Link>
              </div>
            </div>
      </Container>
    </div>
    <div className='bg-primary py-4 hidden lg:block '>
        <ul className='flex justify-center gap-12 text-white'>
          <li><Link className='hover:underline' href={"/"}>Home</Link></li>
          <li><Link className='hover:underline' href={"/product"}>Product</Link></li>
          <li><Link className='hover:underline' href={"/"}>About</Link></li>
          <li><Link className='hover:underline' href={"/"}>Contact</Link></li>
        </ul>
        
      </div>

      <div className='bg-primary p-3 fixed w-full bottom-0 block lg:hidden z-50'>
      <div className='flex justify-evenly gap-4 '>
              <Link className='text-base lg:text-lg ' href={"/profile"}><MdOutlineHome  size={30}  className= 'text-white' /></Link>

                <Link className='relative group ' href={"/"}>
                  <div className='rounded-full text-dark w-6 h-6 bg-white  absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                    1
                  </div>
                <IoMdHeartEmpty className='text-white  transition duration-200 ease-in' size={30} />
                </Link>
                <Link className='relative group' href={"/"}>
                  <div className='rounded-full text-dark w-6 h-6 bg-white  absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                    1
                  </div>
                  <PiBag   className='text-white  transition duration-200 ease-in' size={30} />
                </Link>
                <Link className='text-base lg:text-lg ' href={"/profile"}><FaRegUser size={25}  className= 'text-white' /></Link>
              </div>
      </div>
    </>
  )
}

export default Header