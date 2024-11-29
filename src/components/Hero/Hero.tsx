
import Container from 'components/Layout/Container/Container';
import Navbar from 'components/Layout/Header/Navbar';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <>
      <div className='bg-hero w-full h-full  lg:h-screen  relative'>
      <Navbar/>
      <video
          className="w-full h-full sm:object-cover"
          loop
          muted
          playsInline
          autoPlay
        >
          <source src="/video/Agsons.mp4" type="video/mp4" />
        </video>
        <Container className='text-white text-end absolute bottom-10 md:bottom-20 right-1 md:right-20 space-y-5'>
          <p className='text-14 font-medium'>ARCHITECTURAL VINYL FILM WRAP</p>
          <p className='text-[25px]'>FRESH LOOK, SAVE BIG</p>
          <div>
            <Link className='bg-white px-8 py-2 hover:bg-primary hover:text-white  text-black' href={"/categories"}>
              SHOP OUR FULL RANGE
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Hero;
