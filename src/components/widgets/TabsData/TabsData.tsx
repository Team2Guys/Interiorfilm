import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img1 from "../../../../public/images/CA101.png"
import Card from 'components/ui/Card/Card'


const TabsData = ({items}:any) => {
  return (
    <>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center sm:gap-2 md:gap-4 mt-10'>
        <div className='sm:col-span-2 bg-secondary p-2 w-full'>
            <div className='flex justify-center items-center'>
                <div className=' px-8 w-3/6'>
                    <h1 className='text-[22px] font-semibold md:text-4xl md:font-bold'>23% off in All Product</h1>
                    <Link className='underline' href={"/"}>Shop Now</Link>
                </div>
                <div className='w-full  md:w-3/6'>
                    <Image className='w-full' width={300} height={300} src={img1} alt='image'/>
                </div>
            </div>
        </div>
        <Card  />
    
    </div>
    <div className=' text-center mt-10 mb-7'>
        <Link className='bg-primary rounded-md py-3 px-10 text-white' href={"/"}>View All</Link>
        </div>
    </>

  )
}

export default TabsData