'use client';
import axios from 'axios';
import Overlay from 'components/widgets/Overlay/Overlay';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { CategoriesType } from 'types/interfaces';

function Categories() {
  const [category, setCategory] = useState<CategoriesType[]>([]);
  const router = useRouter();

  const handleButtonClick = (categoryID: string) => {
    router.push(`/products?category=${categoryID}`);
  };
  const CategoryHandler = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
      console.log(response, "response")
      setCategory(response.data);
    } catch (err) {
      console.log(err, "err")
    }
  };
  useLayoutEffect(() => {
    CategoryHandler();
  }, []);
  return (
    <>
      <Overlay title='Categories' />
        <div className='w-full mt-10 md:mt-20 px-2 md:px-8'>
          {category.slice(0, 7).map((item: any, index) => {
            const EvenFlag = index % 2 === 0;
            return (
              <div key={index} className='w-full flex flex-wrap md:flex-nowrap gap-12 mb-10 md:mb-20'>
                <div className={`w-full md:w-3/6 ${EvenFlag ? "order-1 md:order-1" : 'order-1 md:order-2'} `}>
                  <Image
                    src={item.posterImageUrl.imageUrl}
                    className="object-cover w-full"
                    alt='categories'
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className={`w-full md:w-3/6 flex justify-center flex-col md:min-w-80 ${EvenFlag ? "order-2 md:order-2" : 'order-1 md:order-1'}`}>
                  <h1 className='text-[#3A393C] font-bold font-poppins text-20 md:text-[30px] pb-5'>{item.name}</h1>
                  <p className='text-[#3A393C] text-14 md:text-[20px] leading-[20px] md:leading-[45px] font-poppins pb-7'>{item.description}</p>
                  <button onClick={() => handleButtonClick(item._id)} className='inline-block text-start border w-fit px-6 rounded-md border-[#535353] outline-none hover:bg-black hover:text-white font-poppins font-normal text-[15px] leading-[44px]'>View All</button>
               
                </div>
              </div>
            );
          })}
        </div>
    </>
  );
}

export default Categories;
