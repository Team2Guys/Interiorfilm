import Image from 'next/image'
import React from 'react'
import front from "../../../public/images/front.png"
import Link from 'next/link'
import VisibleCard from 'components/widgets/visibleCard/visibleCard'
const OfferProduct = () => {
  return (
    <>
    <VisibleCard/>
    <div className='flex flex-wrap md:gap-10 md:flex-nowrap bg-Offer bg-no-repeat justify-center items-center pb-10 px-2 md:px-20 mt-20'>
        <div className='w-full md:w-4/12'>
            <Image className='md:w-full w-64 h-64 md:h-full object-contain mx-auto md:mx-0  bg-no-repeat' height={400} width={400} src={front} alt='front' /> 
        </div>
        <div className='w-full md:w-7/12  '>
            <span className='w-full  text-base md:text-[30px] lg:text-[56px] leading-snug font-medium text-heading mb-4 text-center  capitalize'>Stunning collection of options to transform your home</span>
            <div className='text-center md:text-start  mt-5'>
            <Link className='bg-primary text-white px-6 py-3  rounded-md' href={"/products"}>View All</Link>
            </div>
        </div>
    </div>
     </>
  )
}

export default OfferProduct