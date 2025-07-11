import React from 'react'
import TermsAndCondition from './TermsAndCondition'
import blacklogo from "../../../public/images/logoblack.png";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Interior Film UAE',
  description: 'Read the terms and conditions for using Interior Film UAE. Learn about your rights, responsibilities, and our policies regarding wall decor purchases and website use.',
  openGraph: {
    title: 'Terms and Conditions | Interior Film UAE',
    description: 'Read the terms and conditions for using Interior Film UAE. Learn about your rights, responsibilities, and our policies regarding wall decor purchases and website use.',
    url: 'https://interiorfilm.ae/terms-conditions',
    type: "website",
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: 'https://interiorfilm.ae/terms-conditions',
  },
};


const Page = () => {
  return (
    <TermsAndCondition />
  )
}

export default Page