
import SkeletonLoading from 'components/Skeleton-loading/SkeletonLoading';
import Overlay from 'components/widgets/Overlay/Overlay';
import { generateSlug } from 'data/Data';
import Image from 'next/image';
import Link from 'next/link';
import { CategoriesType } from 'types/interfaces';
const Category = ({ category }: { category: CategoriesType[] }) => {
   return (
      <>
         {category.length < 1 ? new Array(6).fill(0).map((_ , index: number) => (
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
         )) : (
            <>
               <Overlay title='Categories' bodyText='Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, ' />
               <div className='w-full my-10 md:mt-20 px-2 md:px-8 grid grid-cols-1 gap-15 lg:grid-cols-3 md:grid-cols-2 '>
                  {category.map((item: any, index) => (
                     <Link href={`/${item.custom_url ?? generateSlug(item.name)}`} key={index} className='group w-full space-4 cursor-pointer '>
                        <div className='relative'>
                           <Image
                              src={item.posterImageUrl.imageUrl}
                              className="object-cover w-full h-[300px] 2xsm:h-[400px] xsm:h-[500px] sm:h-[600px] md:h-[450px] lg:h-[395px] 2xl:h-[580px] 3xl:h-[792px]"
                              alt='categories'
                              width={1000}
                              height={1000}
                           />
                           <div className='hidden group-hover:block cursor-point absolute bg-white bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-center py-1 px-4'>
                              <Link className='text-black' href={`/${generateSlug(item.name)}`}>VIEW ALL</Link>
                           </div>
                        </div>
                        <div className='flex items-center flex-col gap-2 mt-3'>
                           <h3 className='group-hover:text-primary uppercase font-poppins font-bold text-title-xsm'>{item.name}</h3>
                           <p className='text-12 xsm:text-14 lg:text-base text-center'>{item.description}</p>
                        </div>
                     </Link>
                  ))}

               </div>
            </>
         )}

      </>
   );
}

export default Category;
