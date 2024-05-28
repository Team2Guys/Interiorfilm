import Container from 'components/Layout/Container/Container';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface cardvalue {
  image: any,
  title: string,
  description: string,
}

interface cardprops {
  productcard: cardvalue[],
}

const ProductData: React.FC<cardprops> = ({ productcard }) => {
  return (
    <Container className='mt-20'>
      {
        productcard.map((array, index) => (
          <div className='border rounded-md p-4 bg-white mt-5' key={index}>
            <div className={`flex flex-wrap md:flex-nowrap md:gap-5 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className='w-full md:w-3/6'>
                <Image width={600} height={600} className='bg-contain w-full h-full' src={array.image} alt='product list' />
              </div>
              <div className='w-full md:w-3/6 pt-4 md:pt-20 space-y-1 md:space-y-5 md:mx-10'>
                <h1 className='text-xl md:text-4xl font-semibold'>{array.title}</h1>
                <p className='text-lg md:text-2xl'>{array.description}</p>
                <div className='pt-2 md:pt-0'>
                  <Link className='bg-primary rounded-md px-3 py-3 text-white' href={"/product"}>View All</Link>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </Container>
  );
}

export default ProductData;
