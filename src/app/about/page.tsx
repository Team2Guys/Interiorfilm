import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import Image from 'next/image'
import React from 'react'
import about from "../../../public/images/about.png"
import Offer from 'components/widgets/Offer/Offer'
import { offers } from 'data/sideMenuData'
import { Metadata } from 'next'
import Link from 'next/link'
import blacklogo from "../../../public/images/logoblack.png";


export const metadata: Metadata = {
  title: 'Top Notch Quality, Quick Delivery, Affordable Prices | Interior Film',
  description: 'Interior Film, based in Dubai, offers top-quality vinyl wrapping solutions from Yellowzone General Trading. Expert service for all your wrapping needs.',
  openGraph: {
    title: 'Top Notch Quality, Quick Delivery, Affordable Prices | Interior Film',
    description: 'Interior Film, based in Dubai, offers top-quality vinyl wrapping solutions from Yellowzone General Trading. Expert service for all your wrapping needs.',
    url: 'https://interiorfilm.ae/about',
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: 'https://interiorfilm.ae/about', 
  },
};


const About = () => {
  return (
    <>
    <Overlay title='About Us'/>
    <Container className='lg:my-20 my-14 '>
        <div className='grid grid-cols-1 lg:grid-cols-2 mt-2 justify-items-center sm:gap-1 md:gap-10'>
            <div className='relative'>
             <Image className='w-full bg-primary rounded-lg p-2 lg:p-0 lg:pr-4 lg:pt-4' width={600} height={600} src={about} alt='about'/>
            </div>
            <div className=' md:p-8 space-y-3 mt-4 md:mt-0'>
                <p className='text-12 sm:text-14 md:text-17'><Link href='/' >Interiorfilm.ae</Link> is a venture born from Yellowzone General Trading’s passion for the vinyl wrapping industry. Based in Oud Metha, Dubai, we are a growing business, dedicated to bringing you the very best vinyl wrapping solutions available.</p>
                <p className='text-12 sm:text-14 md:text-17'>Having spent years buying from distributors and selling to the public, we now source directly from the factory to cut out the middleman. This has several benefits, from price reductions (which are then passed on to you) as well as being involved in the quality control process.</p>
                <p className='text-12 sm:text-14 md:text-17'>Those years of experience made it easy for us to have one of the global leaders in the vinyl wrapping industry by our side. With a strong foothold in the industry and already manufacturing for major household names, their trusted expertise was shared with us at a fraction of the cost.</p>
                <p className='text-12 sm:text-14 md:text-17'>Having such a close relationship with the factory allows us to share our feedback and ensure that the latest trends reach our shelves in record time. </p>
            </div>
        </div>
        <div className='md:mt-5'>
        <p className='text-12 sm:text-14 md:text-17'>Our range is now a stunning collection of over 150 designs, from elegant marble vinyl and sleek metallic finishes to rich textured fabrics and luxurious leather vinyl looks. </p>
        <p className='text-12 sm:text-14 md:text-17'>Our customers are the most important element of our journey to success. Hand in hand, we have transformed 1000’s of homes in Dubai and the wider UAE areas and hope to continue this for many years to come. We would love to hear any feedback from you about our products or services. Listening is what we are best at and has played a massive role in taking us to where are today. </p>
        </div>
        <Offer OffersData={offers} />
    </Container>
      {/* <Testimonial/> */}
    </>
  )
}

export default About