//@ts-nocheck
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { RxMinus, RxPlus } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import Button from '../Button/Button';
import PRODUCTS_TYPES from 'types/interfaces';

interface TableProps {
  data: PRODUCTS_TYPES[];
}
const Table: React.FC<TableProps> = ({ data }) => {
  const pathName = usePathname();
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  console.log(data , "cart datata");

  const increment = (index: number) => {
    setCounts(prevCounts => ({ ...prevCounts, [index]: (prevCounts[index] || 0) + 1 }));
  };

  const decrement = (index: number) => {
    if (counts[index] > 0) {
      setCounts(prevCounts => ({ ...prevCounts, [index]: (prevCounts[index] || 0) - 1 }));
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
                    <th scope="col" className="px-6 py-3 text-end text-xl font-medium text-dark ">{pathName == "/wishlist" ? "Action" : "Total"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((product, index) => (
                    <tr key={index}>
                      <td className="md:px-3 md:py-4  text-sm font-medium">
                        <div className='flex gap-1'>
                          <div className='relative'>
                          <Image className='w-24 h-24 bg-contain' width={100} height={100} src={product.imageUrl} alt='Cart' />
                            <div className='absolute -top-2 -right-2'>
                              <div className='bg-white shadow h-5 w-5 rounded-full cursor-pointer'>
                                <IoMdCloseCircleOutline size={20} />
                              </div>
                            </div>
                          </div>
                          <div className='p-2'>
                            <h1 className='text-sm md:text-base font-medium'>{product.name}</h1>
                            <p className=' text-xs md:text-sm text-gray-500'>Color: <span>{product.colors}</span></p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base"><p >AED <span>{product.price}</span>.00</p></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <div className='flex'>
                          <div onClick={() => decrement(index)} className='h-8 w-8 rounded-md bg-white border border-gray flex justify-center items-center'>
                            <RxMinus size={20} />
                          </div>
                          <div className='h-8 w-8 rounded-md bg-white flex justify-center items-center'>
                            {counts[index] || 0}
                          </div>
                          <div onClick={() => increment(index)} className='h-8 w-8 rounded-md bg-white border border-gray flex justify-center items-center'>
                            <RxPlus size={20} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm md:text-base">
                        {pathName == "/wishlist" ? <Button className='px-4 rounded-md' title={"Add To Cart"} /> :
                          <p>AED <span>{product.totalPrice * (counts[index] || 1)}</span>.00</p>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
