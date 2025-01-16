import React from 'react';
import { useRouter } from 'next/navigation';
import Button from 'components/Common/Button';

interface CategoryCardProps {
  name: string;
  posterImageUrl: string;
  categoryId: string; 
  onClick?:any; 
  nameClass?:string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, posterImageUrl, categoryId,nameClass }) => {
  const router = useRouter();

  const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    router.push(`/products?category=${categoryId}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${posterImageUrl})`,
        backgroundRepeat: 'no-repeat',
      }}
      className='w-full h-[400px] md:h-[603px] bg-cover bg-center relative flex items-end sm:items-start sm:justify-start justify-center pb-10'
    >
      <div className='sm:absolute  sm:bottom-8   md:bottom-16  sm:right-8 md:right-16 space-y-5 text-center sm:text-end'>
        <p className={`text-22  font-bold md:tracking-widest ${nameClass}`}>{name}</p>
        <Button className='bg-white hover:bg-primary hover:text-white font-12 whitespace-nowrap' title={"VIEW ALL"} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handleButtonClick(e)} />
      </div>
    </div>
  );
};

export default CategoryCard;
