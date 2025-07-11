import { Metadata } from "next";
import ContactUs from "./ContactUs";
import blacklogo from "../../../public/images/logoblack.png";

export const metadata: Metadata = {
  title: 'Contact Us | Interior Film',
  description: 'Welcome to Interior Films',
  openGraph: {
    title: 'Contact Us | Interior Film',
    description: 'Welcome to Interior Films',
    url: 'https://interiorfilm.ae/contact',
     type: "website",
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: 'https://interiorfilm.ae/contact',
  },
};

const Contact = () => {


  return (
    <ContactUs />
  );
};

export default Contact;
