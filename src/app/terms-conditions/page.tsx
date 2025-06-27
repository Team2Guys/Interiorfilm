import React from 'react'
import TermsAndCondition from './TermsAndCondition'
import blacklogo from "../../../public/images/logoblack.png";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interior Film',
  description: 'Welcome to Interior Films',
  openGraph: {
    title: 'Interior Film',
    description: 'Welcome to Interior Films',
    url: '/terms-conditions',
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: '/terms-conditions',
  },
};


const Page = () => {
  return (
    <TermsAndCondition />
  )
}

export default Page