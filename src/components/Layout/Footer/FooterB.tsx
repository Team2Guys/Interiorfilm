import React from 'react'
import Container from '../Container/Container'
import paypal from "../../../../public/images/paypal.jpg";
import visacard from "../../../../public/images/visacard.jpg";
import mastercard from "../../../../public/images/mastercard.jpg";
import maestrocard from "../../../../public/images/maestrocard.jpg";
import Image from 'next/image';

const FooterB = () => {
  return (
    <>
  <div className='bg-primary lg:py-0 py-3 lg:mt-0 lg:mb-0 mb-6'>
  <div className='container mx-auto'>
        <div className="flex items-center flex-wrap lg:justify-between justify-center">
            <div className='text-white lg:order-1 order-2'>
                <p className='text-xs'>© Interior Film - All Rights Reserved</p>
            </div>
               <div className='flex items-center gap-2 py-2 lg:order-2 order-1'>
               <Image width={100} height={0} src={paypal} alt="Interior Film" className="w-10 bg-white " />   
               <Image width={100} height={0} src={visacard} alt="Interior Film" className="w-10 " />   
               <Image width={100} height={0} src={mastercard} alt="Interior Film" className="w-10 " />   
               <Image width={100} height={0} src={maestrocard} alt="Interior Film" className="w-10 " />   
               </div>  
        </div>  
   </div>
  </div>
   </>
   
  )
}

export default FooterB