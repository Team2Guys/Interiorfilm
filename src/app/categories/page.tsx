'use client';
import axios from 'axios';
import Container from 'components/Layout/Container/Container';
import Overlay from 'components/widgets/Overlay/Overlay';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { CategoriesType } from 'types/interfaces';

function Categories() {
  const [category, setCategory] = useState<CategoriesType[]>([]);
  const router = useRouter();

  const handleButtonClick = (categoryId: string) => {
    router.push(`/products?${categoryId}`);
  };

  const CategoryHandler = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
      console.log(response, "response");
      setCategory(response.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  useLayoutEffect(() => {
    CategoryHandler();
  }, []);

  console.log(category, "category");

  return (
    <>
      <Overlay title='Categories' />
      <Container className='mt-20'>
        <div className='w-full'>
          {category.slice(0, 7).map((item: any, index) => {
            const EvenFlag = index % 2 === 0;
            return (
              <div key={index} className='w-full flex flex-wrap gap-12 mb-20'>
                <div className={`w-full md:w-2/5 ${EvenFlag ? "order-1 md:order-1" : 'order-1 md:order-2'} min-w-72`}>
                  <Image
                    src={item.posterImageUrl.imageUrl}
                    className="object-contain w-full"
                    alt='categories'
                    width={500}
                    height={500}
                  />
                </div>
                <div className={`w-full md:w-2/5 flex justify-center flex-col md:min-w-80 ${EvenFlag ? "order-2 md:order-2" : 'order-1 md:order-1'}`}>
                  <h1 className='text-[#3A393C] font-bold font-poppins text-[30px] pb-5'>{item.name}</h1>
                  <p className='text-[#3A393C] text-[20px] leading-[45px] font-poppins pb-7'>{item.description}</p>
                  <button onClick={() => handleButtonClick(item._id)} className='inline-block text-start border w-fit px-6 rounded-md border-[#535353] outline-none hover:bg-black hover:text-white font-poppins font-normal text-[15px] leading-[44px]'>View All</button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default Categories;
