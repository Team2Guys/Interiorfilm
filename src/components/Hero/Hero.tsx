import Container from 'components/Layout/Container/Container';
import Link from 'next/link';

const Hero = () => {
  return (
    <>
      <div className='relative'>
      <Container className="absolute bottom-10 md:bottom-20 right-1 md:right-20 text-white text-end space-y-5 z-20">
        <h1 className="text-14 font-medium">ARCHITECTURAL VINYL FILM WRAP</h1>
        
        <p className="text-[25px]">FRESH LOOK, SAVE BIG</p>
        <div>
          <Link href="/categories" className=" bg-white px-8 py-2 hover:bg-primary hover:text-white text-black transition duration-300">
              SHOP OUR FULL RANGE
          </Link>
        </div>
      </Container>
      <video
        className="w-full h-full object-cover sm:object-fill md:h-[55vh] lg:h-[65vh] xl:h-[100vh] z-10"
        loop
        muted
        playsInline
        autoPlay
        preload="meta"
        aria-label="Background video showcasing product"
      >
        <source src="https://bncmain.s3.eu-north-1.amazonaws.com/a.mp4" type="video/mp4" />
      </video>
      </div>
    
    </>
  );
};

export default Hero;
