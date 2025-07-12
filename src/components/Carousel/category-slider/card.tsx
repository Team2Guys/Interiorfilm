
import Image from 'next/image';
import Link from 'next/link';
interface CategoryCardProps {
  name: string;
  posterImageUrl: string;
  categoryId: string;
  onClick?: any;
  nameClass?: string;
}

const CategoryCard = ({ name, posterImageUrl, categoryId, nameClass }:CategoryCardProps) => {

  return (
    <div className='w-full h-[400px] md:h-[603px] relative flex items-end sm:items-start sm:justify-start justify-center pb-10'>
      <Image src={posterImageUrl} alt={name} fill priority fetchPriority='high' />
      <div className='absolute bottom-8 md:bottom-16 right-8 md:right-16 space-y-5 text-center sm:text-end'>
        <h2 className={`text-22 font-bold md:tracking-widest ${nameClass}`}>{name}</h2>
        <Link href={`/${categoryId}`} className='bg-white hover:bg-primary hover:text-white font-12 whitespace-nowrap block text-center py-2 px-20'>VIEW ALL</Link>
      </div>
    </div>
  );
};

export default CategoryCard;
