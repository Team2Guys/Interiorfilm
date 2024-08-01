import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img1 from "../../../../public/images/CA101.png"
import Card from 'components/ui/Card/Card'


const TabsData = ({category,carDetail,staticConatiner,cardClass}:any) => {
  return (
    <>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4 mt-10 '>
        <div className={`md:col-span-2 bg-secondary p-2 w-full ${staticConatiner}`}>
            
            <div className='flex justify-center items-center text-heading'>
                <div className=' px-8 w-3/6'>
                    <h1 className='text-[22px] font-semibold md:text-4xl md:font-bold'>23% off in All Product</h1>
                    <Link className='underline' href={"/products"}>Shop Now</Link>
                </div>
                <div className='w-full  md:w-3/6'>
                    <Image className='object-contain' width={300} height={300} src={img1} alt='image'/>
                </div>
            </div>
        </div>
        <Card cardClass={cardClass} categoryId ={category} carDetail={carDetail} />
    
    </div>
    <div className=' text-center mt-10 mb-7'>
        <Link className='bg-primary rounded-md py-3 px-10 text-white hover:text-white' href={"/products"}>View All</Link>
        </div>
    </>

  )
}

export default TabsData