import React from 'react'
import Container from '../Container/Container'
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import Link from 'next/link';
import { IoMailOutline } from "react-icons/io5";
import SelectList from '@/components/ui/Select/Select';
import { CiGlobe, CiUser } from 'react-icons/ci';


const Header = () => {
  return (
    <>
    <div className=' bg-secondary border-b w-full'>
        <Container className='flex justify-between flex-wrap lg:flex-nowrap gap-2 p-2 items-center'>
            <div className='flex gap-4 mx-auto md:mx-0' >
                  <div className='flex gap-1 text-sm md:text-base  items-center hover:underline'>
                  <HiOutlineDevicePhoneMobile  className='text-primary' />
                  <Link  href={"tel:+9213123123"}>+9213123123</Link>
                  </div>
                  <div className='flex gap-1 text-sm md:text-base  items-center hover:underline'>
                  <IoMailOutline   className='text-primary' />
                  <Link href={"mailto:abc@gmail.com"}>abc@gmail.com</Link>
                  </div>
            </div>
            <div className='flex gap-2  mx-auto md:mx-0' >
                <p className='text-sm md:text-base  text-center lg:text-start'>Get Up To *0% off in your first order</p>
            </div>
            <div className='flex gap-2 items-center mx-auto md:mx-0 ' >
                <SelectList 
                className='borderless-select w-[70px] md:w-20'
                defaultValue="USD"
                options={[
                  { value: 'USD', label: 'USD' },
                  { value: 'AED', label: 'AED' },
                  { value: 'ERU', label: 'ERU' },
                ]}
                />
                <SelectList 
                className='borderless-select w-[70px] md:w-20'
                defaultValue="ENG"
                options={[
                  { value: 'ENG', label: 'ENG' },
                  { value: 'ARB', label: 'ARB' },
                  { value: 'CHI', label: 'CHI' },
                ]}
                />
                <div className='flex gap-2 items-center text-sm md:text-base '>
                <CiGlobe className='text-primary'  />
                <Link className='text-sm md:text-base ' href={"/login"}>Login/Register</Link>
                </div>
                <Link className='text-base ' href={"/profile"}><CiUser  className='text-primary' /></Link>
            </div>
              

        </Container>
    </div>
    </>
  )
}

export default Header