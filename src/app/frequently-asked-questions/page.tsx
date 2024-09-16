"use client"
import React, { useState } from 'react'
import Container from 'components/Layout/Container/Container'
import Overlay from "components/widgets/Overlay/Overlay";
import { Description } from '@radix-ui/react-dialog';
import Link from 'next/link';
import ProductCollapse from 'components/ui/Collapse/productCollpase';

interface ACCORDINTYPES {
    Title: string,
    Description: string,
}


// const AccordionsArray: ACCORDINTYPES[] = [
//     {
//         Title: "What is the meaning of Lorem ipsum?",
//         Description: "Lorem ipsum dolor sit amet, consectetur adipisici elit…&apos; (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word &apos;Lorem&apos; ",


//     },
//     {
//         Title: "Can I order a free sample copy of a magazine?",
//         Description: "Lorem ipsum dolor sit amet, consectetur adipisici elit…&apos; (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word &apos;Lorem&apos ",
//     },
//     {
//         Title: "Are unsold magazines sent back to the publisher?",
//         Description: "Lorem ipsum dolor sit amet, consectetur adipisici elit…&apos; (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word &apos;Lorem&apos",


//     },
//     {
//         Title: "Where can I find your disclaimer and privacy policy?",
//         Description: "Lorem ipsum dolor sit amet, consectetur adipisici elit…&apos; (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word &apos;Lorem&apos ",

//     },
//     {
//         Title: "Can I change the displayed currency?",
//         Description: "Improve aesthetics of your kitchen with Premium Vinyl Wraps",

//     },
//     {
//         Title: "Do I have the right to return an item?",
//         Description: "Improve aesthetics of your kitchen with Premium Vinyl Wraps",

//     },


// ]



const AccordionsArray: ACCORDINTYPES[] = [
    {
        Title: "What is the meaning of Lorem ipsum?",
        Description: "Lorem ipsum dolor sit amet, consectetur adipisici elit…&apos; (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word &apos;Lorem&apos;",
    },
    {
        Title: "Can I order a free sample copy of a magazine?",
        Description: "Lorem ipsum dolor sit amet, consectetur adipisici elit…&apos; (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word &apos;Lorem&apos;",
    },
    {
        Title: "Are unsold magazines sent back to the publisher?",
        Description: "Lorem ipsum dolor sit amet, consectetur adipisici elit…&apos; (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word &apos;Lorem&apos;",
    },
    {
        Title: "Where can I find your disclaimer and privacy policy?",
        Description: "Lorem ipsum dolor sit amet, consectetur adipisici elit…&apos; (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document. The text is intentionally unintelligible so that the viewer is not distracted by the content. The language is not real Latin and even the first word &apos;Lorem&apos;",
    },
    {
        Title: "Can I change the displayed currency?",
        Description: "Improve aesthetics of your kitchen with Premium Vinyl Wraps",
    },
    {
        Title: "Do I have the right to return an item?",
        Description: "Improve aesthetics of your kitchen with Premium Vinyl Wraps",
    },
]





function Page() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <Container>
            <Overlay title="faqS" />
            <div className='flex justify-center my-7'>
                <div>
                    <h1 className=' font-futura text-center font-semibold text-4xl'>We&apos;re here to help</h1>
                    <p className='text-[#9DA3AE] font-semibold text-13 text-center'>Have questions? We&apos;re here to help.</p>

                </div>
            </div>

            {AccordionsArray.map((item, index) => {
                return (
                    <ProductCollapse
                        key={index}
                        isOpen={openIndex === index}
                        isHome={true}
                        onClick={() => handleToggle(index)} title={item.Title}
                        titleClass={openIndex === index ? "font-bold" : 'font-normal font-futura'}
                        className='flex gap-2 items-center my-3'

                    >

                        <p className="text-[14px] text-para">{item.Description}</p>
                    </ProductCollapse>
                )
            })}


            <div className='flex justify-center flex-col items-center font-futura mt-8 gap-5'>
                <h1 className='font-semibold text-23'>Still have questions?</h1>
                <p className='font-light text-16 text-center text-[#A3A9B3] flex flex-col'>Can&apos;t find the answer you&apos;re looking for?
                    <span>Please chat to our friendly team.</span> </p>

                <Link href="/contact" className='bg-black px-5 py-2 text-white rounded-sm'> GET IN TOUCH</Link>

            </div>

        </Container>
    )
}

export default Page