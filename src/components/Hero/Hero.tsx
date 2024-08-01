
import Container from 'components/Layout/Container/Container';
import Header from 'components/Layout/Header/Header';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <>
      <div className='bg-hero w-full h-[600px] md:h-screen bg-cover bg-no-repeat'>
      <Header/>
        <div className='absolute top-1/2 left-5 h-36 w-14 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-2'>
          <p className='transform  mt-20  -rotate-90 whitespace-nowrap'>Get 10% Off!</p>
        </div>
        <Container className='text-white text-end absolute bottom-10 md:bottom-20 right-1 md:right-20 space-y-5'>
          <p className='text-14 font-medium'>SELF ADHESIVE ARCHITECTURAL VINYL</p>
          <p className='text-[25px]'>DON&apos;T REPLACE, UPGRADE</p>
          <div>
            <Link className='bg-white px-8 py-2 text-black' href={"/products"}>
              SHOP OUR FULL RANGE
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Hero;
