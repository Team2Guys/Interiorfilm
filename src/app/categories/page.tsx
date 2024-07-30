'use client'

import axios from 'axios';
import Container from 'components/Layout/Container/Container'
import Image from 'next/image'
import { useLayoutEffect, useState } from 'react';
import { CategoriesType } from 'types/interfaces';

const categories = [
    {
        id: 1,
        Name: 'Category1',
        Descriptions: "Transform your space with our Interior Film Marble Series. Easy to apply and maintain, this film features realistic marble textures that add elegance and sophistication to any surface. Perfect for countertops, walls, and furniture. Upgrade your decor effortlessly!",
        ImageUrl: "/images/new/201.png"
    },
    {
        id: 2,
        Name: 'Category1',
        Descriptions: "Transform your space with our Interior Film Marble Series. Easy to apply and maintain, this film features realistic marble textures that add elegance and sophistication to any surface. Perfect for countertops, walls, and furniture. Upgrade your decor effortlessly!",
        ImageUrl: "/images/new/201.png"
    },
    {
        id: 3,
        Name: 'Category1',
        Descriptions: "Transform your space with our Interior Film Marble Series. Easy to apply and maintain, this film features realistic marble textures that add elegance and sophistication to any surface. Perfect for countertops, walls, and furniture. Upgrade your decor effortlessly!",
        ImageUrl: "/images/new/201.png"
    },
    {
        id: 4,
        Name: 'Category1',
        Descriptions: "Transform your space with our Interior Film Marble Series. Easy to apply and maintain, this film features realistic marble textures that add elegance and sophistication to any surface. Perfect for countertops, walls, and furniture. Upgrade your decor effortlessly!",
        ImageUrl: "/images/new/201.png"
    },
]



function Page() {
  const [category, setCategory] = useState<CategoriesType[]>([]);

  const CategoryHandler = async () => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
      console.log(response, "response")
      setCategory(response.data);
    }catch(err){
      console.log(err, "err")
    
    }
      };
      
      useLayoutEffect(() => {
        CategoryHandler();
      }, []);

      console.log(category, "category")


    return (
        <Container>
            <div className='w-full'>
                {category.slice(0,7).map((item:any, index) => {
                    const EvenFlag = index % 2 === 0;
                    return (
                        <div key={index} className='w-full flex flex-wrap gap-12 mb-12'>
                            <div className={`w-full md:w-2/5 ${EvenFlag ? "order-1 md:order-1" : 'order-2 md:order-2'} min-w-72`}>
                                <Image 
                                    src={item.posterImageUrl.imageUrl} 
                                    className="w-full h-full min-h-full object-cover" 
                                    alt='categories' 
                                    width={100} 
                                    height={100} 
                                    style={{ height: "100%", width: "100%" }} 
                                />
                            </div>
                            <div className={`w-full md:w-2/5 flex justify-center flex-col md:min-w-80  ${EvenFlag ? "order-2 md:order-2" : 'order-1 md:order-1'}`}>
                                <h1 className='text-[#3A393C] font-bold font-poppins text-[30px] pb-5'>{item.name}</h1>
                                <p className='text-[#3A393C] text-[20px] leading-[45px] font-poppins pb-7'>{item.description}</p>
                                <button className='inline-block text-start border w-fit px-6 rounded-md border-[#535353] outline-none hover:bg-black hover:text-white font-poppins font-normal text-[15px] leading-[44px]'>View All</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}

export default Page;
