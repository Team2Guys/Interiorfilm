import React from 'react';
import { useRouter } from 'next/navigation';
import Button from 'components/Common/Button';

interface CategoryCardProps {
  name: string;
  posterImageUrl: string;
  categoryId: string; // Add categoryId to navigate to the specific category
  onClick?:any; 
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, posterImageUrl, categoryId }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    // Navigate to the product page, you can customize the URL based on your routing structure
    router.push(`/categories`);
    // router.push(`/products/${categoryId}`);
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
        <Button className='bg-white font-12 whitespace-nowrap' title={"SEE ALL"} onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default CategoryCard;
