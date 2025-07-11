import { Metadata } from "next";
import FAQs from "./FAQs"
import blacklogo from "../../../public/images/logoblack.png";

export const metadata: Metadata = {
  title: 'Most Frequently Asked Questions | Interior Film',
  description: 'Have questions about our products? Find answers to frequently asked questions and get all the information you need about Interior Film.',
  openGraph: {
    title: 'Most Frequently Asked Questions | Interior Film',
    description: 'Have questions about our products? Find answers to frequently asked questions and get all the information you need about Interior Film.',
    url: 'https://interiorfilm.ae/frequently-asked-questions',
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: 'https://interiorfilm.ae/frequently-asked-questions',
  },
};

function Page() {
    return (
      <FAQs />
    )
}

export default Page