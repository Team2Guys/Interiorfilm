import { Metadata } from "next";
import FAQs from "./FAQs"

export const metadata: Metadata = {
  title: 'Most Frequently Asked Questions | Interior Film',
  description: 'Have questions about our products? Find answers to frequently asked questions and get all the information you need about Interior Film.',
  openGraph: {
    title: 'Most Frequently Asked Questions | Interior Film',
    description: 'Have questions about our products? Find answers to frequently asked questions and get all the information you need about Interior Film.',
    url: '/',
    images: [
      {
        url: '/',
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: '',
  },
};

function Page() {
    return (
      <FAQs />
    )
}

export default Page