"use client"
import React from 'react';
import Image from 'next/image';
import { Rate } from 'antd';
import { LuShoppingCart } from 'react-icons/lu';
import { GoHeart } from 'react-icons/go';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
  image?: any;
  title: string;
  price: number;
  oldprice: number;
  star: number;
}

interface CardProps {
  ProductCard?: Product[];
}

const Card: React.FC<CardProps> = ({ ProductCard = [] }) => {
  const router = useRouter()
  if (ProductCard.length === 0) {
    return <p className="text-center text-xl text-dark flex items-center">No products</p>;
  }

  return (
    <>
      {ProductCard.map((product, index) => (
        // <Link href={"/detail"} className='bg-white shadow-md p-2 w-full mt-2 group' key={index}>

<div className='cursor-pointer' onClick={()=>router.push('/detail')}>
          <div className='relative'>
            <Image className='w-full bg-contain h-44 md:h-72' width={300} height={300} src={product.image} alt='Image' />
           <div className='space-y-3 absolute top-4 right-4 overflow-hidden translate-x-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition ease-in-out duration-400 hidden md:block '> 
           <Link href={"/"} className='w-10 h-10 rounded-full  bg-white hover:bg-primary flex justify-center items-center '>
            <LuShoppingCart className='text-primary hover:text-white' size={25} />
            </Link>
           <Link href={"/"} className='w-10 h-10 rounded-full  bg-white hover:bg-primary flex justify-center items-center '>
            <GoHeart  className='text-primary hover:text-white' size={25} />
            </Link>
           </div>
          </div>
          <div className='mt-2 text-center space-y-1'>
            <h1 className='text-xl text-center text-dark font-semibold'>{product.title}</h1>
            <div className='flex gap-2 justify-center'>
              <p className='text-primary'>
                Dhs. <span>{product.price}</span>.00
              </p>
              <p className='line-through text-light'>
                Dhs. <span>{product.oldprice}</span>.00
              </p>
            </div>
            
            <div className='flex gap-2 justify-center'>
              <Rate disabled allowHalf defaultValue={product.star} />
              <p>(24)</p>
            </div>
          </div>

</div>


  

      ))}
    </>
  );
};

export default Card;
