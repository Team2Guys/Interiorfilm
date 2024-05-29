import React from 'react';
import Container from '../Container/Container';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import Link from 'next/link';
import { IoMailOutline, IoSearch } from "react-icons/io5";
import { CiGlobe } from 'react-icons/ci';
import Image from 'next/image';
import logo from "../../../../public/images/logo.png";
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbCategoryMinus } from 'react-icons/tb';
import { PiBag } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa';
import { RiMenuFold3Fill } from 'react-icons/ri';
import { MdOutlineHome, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import DrawerMenu from 'components/ui/DrawerMenu/DrawerMenu';
import SelectList from 'components/ui/Select/Select';
import Button from 'components/ui/Button/Button';
import { useRouter } from 'next/navigation';
import {  Popover } from 'antd';
import Megamanu from './Megamanu/Megamanu';
import Mobiletab from 'components/ui/Tabs/Mobiletab/Mobiletab';


const Header = () => {


  const router = useRouter()
  return (
    <>
      <div className='bg-secondary border-b w-full'>
        <Container>
          <div className='flex justify-between flex-wrap lg:flex-nowrap gap-2 p-2 items-center'>
            <div className='flex gap-4 mx-auto md:mx-0'>
              <div className='flex gap-1 text-sm md:text-base lg:text-lg items-center '>
                <HiOutlineDevicePhoneMobile className='text-primary' />
                <Link href="tel:+971505974495">+971 50 597 4495</Link>
              </div>
              <div className='flex gap-1 text-sm md:text-base lg:text-lg items-center '>
                <IoMailOutline className='text-primary' />
                <Link href="mailto:cs@avenue39.com">cs@avenue39.com</Link>
              </div>
            </div>
            <div className='hidden lg:flex gap-2 mx-auto md:mx-0'>
              <p className='text-sm md:text-base text-center lg:text-start'>Get Up To 20% off in your first order</p>
            </div>
            <div className='flex gap-2 items-center mx-auto md:mx-0'>
              <div className='flex gap-2 items-center text-sm md:text-base lg:text-lg'>
                <CiGlobe className='text-primary' />
                <p className='text-sm md:text-base'><span className='cursor-pointer' onClick={()=>router.push('/login')}>Login</span>/<span className='cursor-pointer'  onClick={()=>router.push('/register')}>Register</span></p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className='bg-secondary border-b w-full py-3'>
        <Container>
          <div className='flex justify-between flex-wrap lg:flex-nowrap gap-0 md:gap-2 items-center'>
            <Link href={"/"}>
            <Image className='w-14 lg:w-24' src={logo} alt="logo" width={100} height={100} />
            </Link>
           
            <div className='border w-3/6 lg:w-full max-w-screen-md flex'>
              
              <input className='w-full px-4 focus:outline-none active:border-none focus:border-none border-white' type="text" placeholder='Search Product Here...' />
              <Button className='rounded-l-md px-2 md:px-4' title={<IoSearch size={25} />} />
            </div>
            <DrawerMenu
              width={250}
              title={<><div className='p-1 rounded-md block lg:hidden text-white bg-primary'>
                <RiMenuFold3Fill size={20} />
              </div></>}
              content={<>
                <ul className='space-y-2'>
                  <li><Link className='text-base font-semibold text-black hover:text-black' href="/">Home</Link></li>
                  <li><DrawerMenu
                      classDrawer=' back-transparent  backdrop-blur-md p-2 shadow-none'
                        className='text-base font-semibold text-black hover:text-black cursor-pointer'
                      width={500}
                        title={"product"}
                        content={<>
                          <Mobiletab/>
                        </>}
                      /></li>
                  <li><Link className='text-base font-semibold text-black hover:text-black ' href="/about">About</Link></li>
                  <li><Link className='text-base font-semibold text-black hover:text-black' href="/contact">Contact</Link></li>
                </ul>
              </>}
            />
            <div className='hidden lg:flex gap-2 md:gap-4 lg:gap-8'>
              <div className='relative group'>
              <Link className='group' href="/">
              
                <IoMdHeartEmpty className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} />
              </Link>
              <div className='rounded-full text-white w-6 h-6 bg-dark group-hover:bg-primary absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                  1
                </div>

              </div>
    
              <div className='relative group'>
                          
              <Link className='relative group' href="/">
              
                <PiBag className='text-primary group-hover:text-dark transition duration-200 ease-in' size={30} />
              </Link>
              <div className='rounded-full text-white w-6 h-6 bg-dark group-hover:bg-primary absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
                  1
                </div>
          </div>
              <Link className='text-base lg:text-lg' href="/profile"><FaRegUser size={25} className='text-primary' /></Link>
            </div>
          </div>
        </Container>
      </div>
      <div className='bg-primary py-4 hidden lg:block'>
        <ul className='flex justify-center gap-12 text-white'>
          <li><Link className='link-underline' href="/">Home</Link></li>
          <li><Popover className='cursor-pointer link-underline' placement="bottom" trigger="click" content={Megamanu} title="">
            Product
          </Popover></li>
          <li><Link className='link-underline' href="/about">About</Link></li>
          <li><Link className='link-underline' href="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className='bg-primary p-3 fixed w-full bottom-0 block lg:hidden z-50'>
        <div className='flex justify-evenly gap-4'>
          <Link className='text-base lg:text-lg' href="/profile"><MdOutlineHome size={30} className='text-white' /></Link>
          

          <div className='relative group'>
          <Link href="/">

        <IoMdHeartEmpty className='text-white transition duration-200 ease-in' size={30} />
        </Link>
          <div className='rounded-full text-dark w-6 h-6 bg-white absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
              1
            </div>
          </div>
    


    <div className='relative group'>
          <Link  href="/">
            <PiBag className='text-white transition duration-200 ease-in' size={30} />
          </Link>
          <div className='rounded-full text-dark w-6 h-6 bg-white absolute bottom-3 left-4 flex justify-center items-center transition duration-200 ease-in'>
              1
            </div>
    </div>
          <Link className='text-base lg:text-lg' href="/profile"><FaRegUser size={25} className='text-white' /></Link>
        </div>
      </div>
    </>
  );
};

export default Header;
