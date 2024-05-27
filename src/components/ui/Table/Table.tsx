"use client"
import React, { useState } from 'react'
import img from "../../../../public/images/img-1.png"
import Image from 'next/image'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { RxMinus, RxPlus } from 'react-icons/rx'
const Table = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
      setCount(count + 1);
    };
  
    const decrement = () => {
      if (count > 0) {
        setCount(count - 1);
      }
    };
  return (
    <>
<div className="hidden md:flex flex-col">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xl font-optima text-dark ">Product</th>
              <th scope="col" className="px-6 py-3 text-start text-xl font-medium text-dark ">Price</th>
              <th scope="col" className="px-6 py-3 text-start text-xl font-medium text-dark ">Quantity</th>
              <th scope="col" className="px-6 py-3 text-end text-xl font-medium text-dark ">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="md:px-3 md:py-4  text-sm font-medium">
                <div className='flex gap-1'>
                    <div className='relative'>
                        <Image className='w-24 h-24 bg-contain' width={100} height={100} src={img} alt='Cart'/>
                        <div className='absolute -top-2 -right-2'>
                            <div className='bg-white shadow h-5 w-5 rounded-full cursor-pointer'>
                             <IoMdCloseCircleOutline size={20} />
                            </div>
                        </div>
                    </div>
                    <div className='p-2'>
                        <h1 className='text-sm md:text-base font-medium'>Basic Korean-style Bag</h1>
                        <p className=' text-xs md:text-sm text-gray-500'>Color: <span>Brown</span></p>
                    </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base"><p >AED <span>120</span>.00</p></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base">
                <div className='flex'>
                     <div onClick={decrement} className='h-8 w-8 rounded-md bg-white border flex justify-center items-center'>
                     <RxMinus size={20} />
                     </div>
                     <div className='h-8 w-8 rounded-md bg-white flex justify-center items-center'>
                     {count}
                     </div>
                     <div onClick={increment} className='h-8 w-8 rounded-md bg-white border flex justify-center items-center'>
                     <RxPlus size={20} />
                     </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-end text-sm md:text-base">
                <p>AED <span>120</span>.00</p>
              </td>
            </tr>
       
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<div className='border rounded-md p-2 bg-white shadow block md:hidden'>
    <div className='flex'>
        <div className='flex gap-2'>
            <Image className='rounded-md' width={80} height={80} src={img} alt='cart'/>
            <div className='space-y-1'>
                <h1 className='text-sm md:text-base font-medium'>Basic Korean-style Bag</h1>
                <p className=' text-xs md:text-sm text-gray-500'>Color: <span>Brown</span></p>
                <div className='flex'>
                     <div onClick={decrement} className='h-6 w-6 rounded-md bg-white border flex justify-center items-center'>
                     <RxMinus size={20} />
                     </div>
                     <div className='h-6 w-6 rounded-md bg-white flex justify-center items-center'>
                     {count}
                     </div>
                     <div onClick={increment} className='h-6 w-6 rounded-md bg-white border flex justify-center items-center'>
                     <RxPlus size={20} />
                     </div>
                </div>
                <p className='text-sm md:text-base font-base'>AED <span>120</span>.00</p>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Table