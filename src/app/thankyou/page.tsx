import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Thankyou = () => {
  return (
<>
     <div className='max-w-full flex flex-col space-y-6 justify-center items-center mb-20 p-4'>
        <div className='mt-6'><Image src={"/images/thankyou/check.png"} 
        alt=""
        height={"100"}
        width={"100"}/>
        </div>
        <div className='text-2xl sm:text-4xl text-center'><h2>Your Order Is Completed!</h2></div>
        <div className='sm:max-w-[90%] max-w-[80%] lg:max-w-[55%] text-center'><p className='text-xs text-lightdark leading-6'>Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You will receive an email confirmation when your order is completed.</p></div>
        <div className='bg-black text-white text-xs text-center py-5 px-9'>
        <Link href={'/products'}>
        Continue Shopping
        </Link>
        </div>
    </div>
</>
  )
}

export default Thankyou;