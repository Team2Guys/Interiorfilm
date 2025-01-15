import Container from 'components/Layout/Container/Container'
import Image from 'next/image'
import React from 'react'
import pdf from "../../../public/images/pdf.png"
import Link from 'next/link'
const PDF = () => {
  return (
    <div className='pdf-background mt-5'>

    <Container className='grid grid-cols-12 pt-5 pb-5 md:pb-0 items-center justify-items-center'>
        <div className='col-span-12 md:col-span-7'>
        <Image width={800} height={800} src={pdf} alt='pdf'/>
        </div>
        <div className='md:col-span-1'/>
        <div className='col-span-12 md:col-span-4 space-y-4'>
            <h1 className='text-3xl font-bold'>Download the latest catalogue</h1>
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