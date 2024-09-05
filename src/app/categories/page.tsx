'use client';
import axios from 'axios';
import SkeletonLoading from 'components/Skeleton-loading/SkeletonLoading';
import Overlay from 'components/widgets/Overlay/Overlay';
import { generateSlug } from 'data/Data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { CategoriesType } from 'types/interfaces';

function Categories() {
  const [category, setCategory] = useState<CategoriesType[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();

  const handleButtonClick = (categoryID: string) => {
    router.push(`/products?category=${categoryID}`);
  };


  const CategoryHandler = async () => {
    try {
      setloading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
      console.log(response, "response")
      setCategory(response.data);
    } catch (err) {
      console.log(err, "err")
    } finally {
      setloading(false)

    }
  };
  useLayoutEffect(() => {
    CategoryHandler();
  }, []);
  return (
    <>
      <Overlay title='Categories' bodyText='Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, ' />
      <div className='w-full my-10 md:mt-20 px-2 md:px-8 grid grid-cols-1 gap-15 lg:grid-cols-3 md:grid-cols-2 '>

        {

          loading ?
            new Array(6).fill(0).map((item: number, index: number) => {
              return (
                <div key={index} className='w-full space-4'>
                  <SkeletonLoading
                    avatar={{ shape: 'square', size: 150, className: "w-full flex flex-col" }}
                    title={false}
                    style={{ flexDirection: 'column' }}
                    paragraph={{ rows: 3 }}
                    className='gap-10 flex'
                    active={true}
                  />
                </div>

              )
            })

            : category.map((item: any, index) => {

              return (

                <div key={index} className='group w-full space-4 cursor-pointer '>

                  <div className='relative'>

                    <Image
                      src={item.posterImageUrl.imageUrl}
                      className="object-cover w-full"
                      alt='categories'
                      width={1000}
                      height={1000}
                    />
                    <div className='hidden group-hover:block cursor-point absolute bg-white bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-center py-1 px-4'>
                      <Link className='text-black' href={`/products?category=${generateSlug(item.name)}`}>VIEW ALL</Link>


                    </div>

                  </div>


                  <div className='flex items-center flex-col gap-2 mt-3'>
                    <p className='group-hover:text-primary uppercase font-poppins font-bold text-title-xsm'>{item.name}</p>
                    <p className='text-center'>{item.description}</p>

                  </div>


                </div>



              );
            })}



      </div>
    </>
  );
}

export default Categories;
