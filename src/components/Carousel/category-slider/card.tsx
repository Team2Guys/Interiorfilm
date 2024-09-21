import React from 'react';
import { useRouter } from 'next/navigation';
import Button from 'components/Common/Button';
import { generateSlug } from 'data/Data';

interface CategoryCardProps {
  name: string;
  posterImageUrl: string;
  categoryId: string; 
  onClick?:any; 
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, posterImageUrl, categoryId }) => {
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
      className='w-full h-[400px] md:h-[603px] bg-cover bg-center relative'
    >
      <div className='absolute bottom-8 md:bottom-16 right-8 md:right-16 space-y-5 text-end'>
        <p className='text-22 text-white font-bold tracking-widest'>{name}</p>
        <Button className='bg-white hover:bg-primary hover:text-white font-12 whitespace-nowrap' title={"VIEW ALL"} onClick={(e:React.MouseEvent<HTMLButtonElement>)=>handleButtonClick(e)} />
      </div>
    </div>
  );
};

export default CategoryCard;
