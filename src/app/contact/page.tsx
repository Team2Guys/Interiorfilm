import Button from 'components/Common/Button'
import LabelInput from 'components/Common/LabelInput/LabelInput'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import Link from 'next/link'
import React from 'react'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiMail, FiPhone } from 'react-icons/fi'
import { TfiLocationPin } from 'react-icons/tfi'

const Contact = () => {
  return (
    <>
    <Overlay title='Contact'/>
    <Container className='lg:my-16 my-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-primary rounded-md p-4  sm:p-4 md:p-8 text-white space-y-14'>
                <h1 className='text-2xl lg:text-4xl font-medium pt-10'>Contact</h1>
                <div className='space-y-4'>
                    <div className='flex gap-2 items-center'>
                    <TfiLocationPin size={20} />
                        <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor.</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                    <FiPhone  size={20} />
                        <Link href={"tel:+1234567890"}>+1234567890</Link>
                    </div>
                    <div className='flex gap-2 items-center'>
                    <FiMail size={20} />
                    <Link href={"mailto:test@example.com"}>test@example.com</Link>
                    </div>
                </div>
                <div>
                    <h1 className='text-lg md:text-xl lg:text-3xl font-medium'>Follow Us</h1>
                    <div className='flex gap-5 mt-5'>
                        <Link href={"/"}><FaInstagram className='text-white' size={25} /></Link>
                        <Link href={"/"}><FaXTwitter className='text-white' size={25} /></Link>
                        <Link href={"/"}><FaFacebookSquare className='text-white' size={25} /></Link>
                    </div>
                </div>
            </div>
            <div className='border rounded-md'>
                <form className='p-4 pt-10'>
                    <LabelInput label='Name' placeholder='Enter Name' type='text' id='name'/>
                    <LabelInput label='Email' placeholder='Enter Email' type='email' id='Email'/>
                    <div className="w-full px-3 mb-10">
                    <label className="block uppercase tracking-wide text-dark text-sm font-bold mb-2">
                        Comment
                    </label>
                    <textarea className="appearance-none block w-full bg-gray-200 text-dark border mt-4 border-gray-200 rounded py-5 px-5 leading-tight focus:outline-none focus:bg-white focus:border-dark outline-dark"  placeholder={"Enter Comment"} />
                    <Button className='text-center w-full bg-primary py-3 text-white mt-5' title={"Submit Now"}/>
                    </div>
                </form>
            </div>
        </div>
    </Container>
    </>
  )
}

export default Contact