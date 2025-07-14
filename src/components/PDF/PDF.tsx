import Container from 'components/Layout/Container/Container'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
const PDF = () => {
  return (
    <div className='pdf-background mt-5'>

    <Container className='grid grid-cols-12 pt-5 pb-5 md:pb-0 items-center justify-items-center relative'>
        <div className='col-span-12 md:col-span-7 relative'>
          <div className=' w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px]'>
            <Image fill quality={75} src="/images/pdf.png" alt='pdf' loading='lazy'/>
          </div>
        </div>
        <div className='md:col-span-1'/>
        <div className='col-span-12 md:col-span-4 space-y-4'>
            <h2 className='text-3xl font-bold'>Download the latest catalogue</h2>
            <p className=''>Click on the button below to download a PDF version of our current catalogue</p>
            <div className='flex gap-4'>
                <Link href='/pdf/catelog.pdf' target='_blank' className='bg-primary text-white font-medium md:font-semibold px-4 py-2'>Download Now</Link>
            </div>
        </div>
    </Container>
    </div>
  )
}

export default PDF