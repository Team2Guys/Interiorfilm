"use client"
import React, { useState } from 'react'
import Container from 'components/Layout/Container/Container'
import Overlay from "components/widgets/Overlay/Overlay";
import Link from 'next/link';
import ProductCollapse from 'components/ui/Collapse/productCollpase';
import { AccordionsArray } from 'data/Data';

function FAQs() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <Container className="mb-5">
            <Overlay title="Faqs" />
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
                    onClick={() => handleToggle(index)}
                    title={item.Title}
                    titleClass={openIndex === index ? "font-semibold" : 'font-normal'}
                    className='flex gap-2 items-center my-3'
                  >
                    {item.Description.includes('Interiorfilm.ae') ? (
                      <p className="text-[14px] text-para">
                        {item.Description.split('Interiorfilm.ae').map((part, i) => (
                          <React.Fragment key={i}>
                            {part}
                            {i === 0 && (
                              <Link
                                href="/"
                                className="text-primary underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Interiorfilm.ae
                              </Link>
                            )}
                          </React.Fragment>
                        ))}
                      </p>
                    ) : (
                      <p className="text-[14px] text-para">{item.Description}</p>
                    )}
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

export default FAQs