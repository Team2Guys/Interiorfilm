"use client";
import Button from 'components/Common/Button'
import LabelInput from 'components/Common/LabelInput/LabelInput'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiMail, FiPhone } from 'react-icons/fi'
import { TfiLocationPin } from 'react-icons/tfi'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Toaster from "components/Toaster/Toaster";
import Loader from 'components/Loader/Loader';


const contact_us_Validation = Yup.object().shape({
    user_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is Required'),
    comment: Yup.string().required('Comment is Required'),
    user_email: Yup.string().email('Invalid email').required('Email is Required'),
    user_phone: Yup.number().required('Phone Number is Required'),
});

const Contact = () => {

    const [loading, setloading] = useState<boolean>(false)
    const initialValues = {
        user_email: '',
        user_name: '',
        user_phone: '',
        comment: ''
    }

    const submitHandler = async (values: any, resetForm: any) => {
        try {
            setloading(true)
            let response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendEmail`, values)
            console.log(response, "response")
            Toaster("success", "Message has been forward!")
            resetForm()

        } catch (err) {
            console.log(err)
            Toaster("error", "internal Server issue!")

        } finally {
            setloading(false)
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: contact_us_Validation,
        onSubmit: (values, { resetForm }) => {
            submitHandler(values, resetForm)

        },
    });


    return (
        <>
            <Overlay title='Contact' />
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
                                <FiPhone size={20} />
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
                    <div className='border border-gray rounded-md'>
                        <form className='p-4 pt-10' onSubmit={formik.handleSubmit}>
                            <LabelInput label='Name' placeholder='Enter Name' type='text' id='user_name' name='user_name' onChange={formik.handleChange}
                                value={formik.values.user_name} />
                            {formik.errors.user_name && formik.touched.user_name && <div className='text-primary pb-4'>{formik.errors.user_name}</div>}

                            <LabelInput label='Email' placeholder='Enter Email' type='email' id='user_email' name='user_email'
                                onChange={formik.handleChange}
                                value={formik.values.user_email}

                            />
                            {formik.errors.user_email && formik.touched.user_email && <div className='text-primary pb-4'>{formik.errors.user_email}</div>}

                            <LabelInput label='Phone Number' placeholder='Enter Phone Number' type='number' id='user_phone' name='user_phone'
                                onChange={formik.handleChange}
                                value={formik.values.user_phone}

                            />

                            {formik.errors.user_phone && formik.touched.user_phone && <div className='text-primary pb-4'>{formik.errors.user_phone}</div>}

                            <div className="w-full px-3 mb-10">
                                <label className="block uppercase tracking-wide text-dark text-sm font-bold mb-2">
                                    Comment
                                </label>
                                <textarea onChange={formik.handleChange} value={formik.values.comment} name='comment' className="appearance-none block w-full bg-gray-200 text-dark border border-gray mt-4 border-gray-200 rounded py-5 px-5 leading-tight focus:outline-none focus:bg-white focus:border-dark outline-dark" placeholder={"Enter Comment"} />
                                {formik.errors.comment && formik.touched.comment && <div className='text-primary pt-4'>{formik.errors.comment}</div>}

                                <Button className='text-center w-full bg-primary py-3 text-white mt-5' type="submit" title={loading ? <Loader /> : "Submit Now"} disable={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Contact