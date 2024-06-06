//@ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { RxMinus, RxPlus } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import { Modal } from 'antd';
import Button from '../Button/Button';
import PRODUCTS_TYPES from 'types/interfaces';

interface TableProps {
  cartdata: PRODUCTS_TYPES[];
  wishlistdata: PRODUCTS_TYPES[];
}

const Table: React.FC<TableProps> = ({ cartdata, wishlistdata }) => {
  const pathName = usePathname();
  const [data, setData] = useState<PRODUCTS_TYPES[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  console.log(wishlistdata , "wishlistdata")
  useEffect(() => {
    const initialData = pathName === "/wishlist" ? wishlistdata : cartdata;
    setData(initialData);
    const initialCounts = initialData.reduce((acc, product, index) => {
      acc[index] = product.count || 1;
      return acc;
    }, {});
    setCounts(initialCounts);
  }, [pathName, cartdata, wishlistdata]);

  const increment = (index: number) => {
    setCounts(prevCounts => {
      const newCounts = { ...prevCounts, [index]: prevCounts[index] + 1 };
      updateLocalStorage(index, newCounts[index]);
      return newCounts;
    });
  };
  

  const decrement = (index: number) => {
    setCounts(prevCounts => {
      if (prevCounts[index] > 1) {
        const newCounts = { ...prevCounts, [index]: prevCounts[index] - 1 };
        updateLocalStorage(index, newCounts[index]);
        return newCounts;
      }
      return prevCounts;
    });
  };

  const updateLocalStorage = (index: number, count: number) => {
    const updatedData = [...data];
    updatedData[index].count = count;
    if (pathName === "/wishlist") {
      updatedData[index].totalPrice = updatedData[index].price * count;
    } else {
      updatedData[index].totalPrice = updatedData[index].price * count;
    }
    setData(updatedData);
  
    if (pathName === "/wishlist") {
      localStorage.setItem("wishlist", JSON.stringify(updatedData));
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedData));
    }
  };

  const deleteItem = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);

    if (pathName === "/wishlist") {
      localStorage.setItem("wishlist", JSON.stringify(updatedData));
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedData));
    }
  };

  const showDeleteConfirm = (index: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteItem(index);
      },
    });
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
                    <th scope="col" className="px-6 py-3 text-start text-xl font-optima text-dark">Product</th>
                    <th scope="col" className="px-6 py-3 text-start text-xl font-medium text-dark">Price</th>
                    <th scope="col" className="px-6 py-3 text-start text-xl font-medium text-dark">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-end text-xl font-medium text-dark">{pathName === "/wishlist" ? "Action" : "Total"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((product, index) => (
                    <tr key={index}>
                      <td className="md:px-3 md:py-4 text-sm font-medium">
                        <div className='flex gap-1'>
                          <div className='relative'>
                            <Image className='w-24 h-24 bg-contain' width={100} height={100} src={product.imageUrl[0].imageUrl || product.imageUrl} alt='Product' />
                            <div className='absolute -top-2 -right-2'>
                              <div onClick={() => showDeleteConfirm(index)} className='bg-white shadow h-5 w-5 rounded-full cursor-pointer'>
                                <IoMdCloseCircleOutline size={20} />
                              </div>
                            </div>
                          </div>
                          <div className='p-2'>
                            <h1 className='text-sm md:text-base font-medium'>{typeof product.name === 'string' ? product.name : ''}</h1>
                            <p className='text-xs md:text-sm text-gray-500'>Color: <span>{typeof product.color === 'string' ? product.color : ''}</span></p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base"><p>AED <span>{pathName === "/wishlist" ? ( product.discountPrice ? product.discountPrice * (counts[index] || 1) : product.price * (counts[index] || 1)) :(product.discountPrice ? product.discountPrice : product.price)}</span>.00</p></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <div className='flex'>
                          <div onClick={() => decrement(index)} className='h-8 w-8 rounded-md bg-white border border-gray flex justify-center items-center'>
                            <RxMinus size={20} />
                          </div>
                          <div className='h-8 w-8 rounded-md bg-white flex justify-center items-center'>
                            {counts[index] || 1}
                          </div>
                          <div onClick={() => increment(index)} className='h-8 w-8 rounded-md bg-white border border-gray flex justify-center items-center'>
                            <RxPlus size={20} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm md:text-base">
                        {pathName === "/wishlist" ? <Button className='px-4 rounded-md' title={"Add To Cart"} /> :
                          <p>AED <span> {pathName === "/wishlist" ?( product.discountPrice ? product.discountPrice * (counts[index] || 1) : product.price * (counts[index] || 1)) :(product.discountPrice ? product.discountPrice* (counts[index] || 1) : product.price * (counts[index] || 1))}</span>.00</p>
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


      {data.map((product, index) => (
                <>
                    <div className='p-2 rounded-md mt-5 bg-white shadow block md:hidden' key={index}>
                        <div className='space-y-2'>
                            <div className='flex gap-3'>
                                  <div className='relative '>
                                    <div className='bg-gray p-1 rounded-md'>
                                  <Image className='w-20 h-20 bg-contain' width={80} height={80} src={product.imageUrl[0].imageUrl || product.imageUrl} alt='Product' />
                                    </div>
                                  <div className='absolute -top-2 -right-2'>
                                    <div onClick={() => showDeleteConfirm(index)} className='bg-white shadow h-5 w-5 rounded-full cursor-pointer'>
                                      <IoMdCloseCircleOutline size={20} />
                                    </div>
                                  </div>
                                </div>
                                <div className='space-y-1 w-8/12'>
                                    <h1 className='text-14 font-semibold'>{typeof product.name === 'string' ? product.name : ''}</h1>
                                    <h2 className='text-12 font-medium'>Dhs. <span>{product.price}</span>.00 AED</h2>
                                    <h2 className='text-12 font-medium'>Color: <span>{typeof product.color === 'string' ? product.color : ''}</span></h2>
                                    <div className='flex'>
                                    <div onClick={() => decrement(index)} className='h-7 w-7 rounded-md bg-white border border-gray flex justify-center items-center'>
                                      <RxMinus size={20} />
                                    </div>
                                    <div className='h-7 w-7 rounded-md bg-white flex justify-center items-center'>
                                      {counts[index] || 1}
                                    </div>
                                    <div onClick={() => increment(index)} className='h-7 w-7 rounded-md bg-white border border-gray flex justify-center items-center'>
                                      <RxPlus size={20} />
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div className='flex gap-2 '>
                                <h1 className='font-bold'>Total: </h1>
                                {pathName === "/wishlist" ? <Button className='px-4 rounded-md' title={"Add To Cart"} /> :
                              <p>AED <span> {pathName === "/wishlist" ?( product.discountPrice ? product.discountPrice * (counts[index] || 1) : product.price * (counts[index] || 1)) :(product.discountPrice ? product.discountPrice* (counts[index] || 1) : product.price * (counts[index] || 1))}</span>.00</p>
                        }

                            </div>
                        </div>
                    </div>

                </>
            ))}

    </>
  );
}

export default Table;
