import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import Image from 'next/image'
import React from 'react'
import about from "../../../public/images/about.png"
import Offer from 'components/widgets/Offer/Offer'
import Testimonial from 'components/widgets/Testimonial/Testimonial'
import { SlDiamond } from 'react-icons/sl'
import { CgBulb } from 'react-icons/cg'
import { GiPayMoney } from 'react-icons/gi'
import { RiCustomerService2Line } from 'react-icons/ri'
import Link from 'next/link'
const offers = [
    { icon:<SlDiamond className='text-primary  group-hover:text-white' size={40} /> ,title: 'Quality Products', detail: 'Get free Quality Products for your interior design project.' },
    { icon:<CgBulb className='text-primary  group-hover:text-white' size={40} /> ,title: 'Reasonable Pricing', detail: 'We ensure the highest quality standards for your interiors.' },
    { icon:<GiPayMoney className='text-primary  group-hover:text-white' size={40} /> ,title: 'Reasonable Pricing', detail: 'Competitive pricing for all our services.' },
    { icon:<RiCustomerService2Line className='text-primary  group-hover:text-white' size={40} /> ,title: '24/7 Support', detail: 'Our support team is available 24/7 to assist you.' },
  ];
const About = () => {
  return (
    <>
    <Overlay title='About'/>
    <Container className='mt-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-2 justify-items-center sm:gap-1 md:gap-10'>
            <div className='relative bg-primary h-auto md:h-[275px] lg:h-auto rounded-lg'>
                <Image className='w-full mb-4 ml-4' width={800} height={800} src={about} alt='about'/>

            </div>

            <div className='p-2 sm:p-4 md:p-8 space-y-3'>
                <h1 className='text-3xl'>Know About Our Ecomemrce Business,History</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur quib dam enim expedita sed nesciunt incidunt accusamus adipisci officia libero laboriosam! Proin gravida nibh vel velit auctor aliquet. nec sagittis sem nib elit. Duis sed odio sit amet nibh vultate cursus a sit amet mauris.</p>
                <div className='pt-3'>
                <Link className='bg-primary py-3 px-4 rounded-md text-white ' href={"/contact"}>Contact us</Link>
                </div>
            </div>
        </div>

    <Offer Offers={offers}/>
    </Container>
      <Testimonial/>
    </>
  )
}

export default About