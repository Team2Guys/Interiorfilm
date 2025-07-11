
import React from 'react';
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';
import { Metadata } from 'next';
import blacklogo from "../../../public/images/logoblack.png";

export const metadata: Metadata = {
  title: 'Interior Film',
  description: 'Welcome to Interior Films',
  openGraph: {
    title: 'Interior Film',
    description: 'Welcome to Interior Films',
    url: 'https://interiorfilm.ae/returns-refunds',
    type: "website",
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: 'https://interiorfilm.ae/returns-refunds',
  },
};
const ReturnRefund: React.FC = () => {
  return (
    <>
      <Overlay title='Return & Refund'/>
      <div className='px-2 sm:px-4 md:px-8 max-w-screen-xl mx-auto space-y-3 py-20'>
      <h2 className='text-2xl font-bold'>Return & Refund</h2>
      <p>Can I return my <Link className='text-primary' href="/">Interiorfilm.ae</Link> product if I change my mind?</p>
      <ul className='list-decimal px-4'>
        <li>Yes, you may return any item within 7 days of receiving your order from us, providing the item is unopened, unused and with all original packaging intact.</li>
        <li>To initiate a return, please send an email to customer service at <Link className='text-primary' href="mailto:cs@interiorfilm.ae">cs@interiorfilm.ae</Link>, explaining clearly why you would like to return the item. Please also ensure your order number is included.</li>
        <li>Our team will get back to you within 24hrs and guide you through the return process and provide you with a return authorization number (RAN). Returns cannot be accepted without the RAN.</li>
        <li>Once in receipt of your return, if deemed acceptable, we will issue the refund right away. The time for the refund to reflect in your account again varies from card issuer to card issuer, but from our side, it will be executed within 24 hours of an approved return.</li>
      </ul>
      <h2 className='font-semibold text-2xl'>What if an item is defective?</h2>
      <ul className='list-decimal px-4'>
        <li>In the rare event that your received item is deemed faulty, please follow the instructions above, except add FAULTY before the order number in the subject line. Your return will be treated as a priority and replacement sent out asap.</li>
        <li>If the item has developed a fault after being installed, we understand that it won’t be in it’s unused state and would ask you to contact <Link className='text-primary' href="mailto:cs@interiorfilm.ae">cs@interiorfilm.ae</Link> and we’ll arrange a site visit by one of our experienced team members.</li>
      </ul>
      <h2 className='font-semibold text-2xl'>Who covers the return shipping costs?</h2>
      <p>If you need to return an item you bought from us, please note that you will have to pay for the return shipping unless the item is defective or we made a mistake.</p>
      <ul className='list-decimal px-4'>
        <li>We strongly recommend using a trackable shipping service, to make the return smoothly. This will help you and <Link className='text-primary' href="/">Interiorfilm.ae</Link> to see where your package is on its journey. This method will make sure the product arrives back on time.</li>
        <li>If something happens to the item on the way, or if the item is lost by the courier, we cannot be held responsible and will not be able to offer a refund.</li>
      </ul>
      <h2 className='font-semibold text-2xl'>Products Not Eligible for Replacement or Refund</h2>
      <p>At <Link className='text-primary' href="/">Interiorfilm.ae</Link>, we have an aim to make sure of your satisfaction with every purchase. However, there are certain products and eligibility criteria that we are unable to replace or refund. Please review the list below for details:</p>
      <ul className='list-decimal px-4'>
        <li>Items sold during sales and promotion period</li>
        <li>Items not in original condition, used or damaged</li>
      </ul>
      <h2 className='font-semibold text-2xl'>Refund Process</h2>
      <p>We will initiate the refund process immediately once we receive the product at <Link className='text-primary' href="/">Interiorfilm.ae&apos;s</Link> warehouse. The refund will be processed based on the original mode of payment for the order:</p>
      <p>For orders paid by credit/debit card, refunds will be credited back to the original payment method within 1 working days upon receipt of the returned product. Please note that once the refund has been initiated, the time taken for the funds to reach your account varies between banks. We will send you a confirmation when we have completed everything from our side in case you need to take it up with your bank or card issuer.</p>
      <p>For orders paid by cash, we will refund via bank deposit or transfer upon providing the necessary details.</p>
      <h2 className='font-semibold text-2xl'>Contact Us:</h2>
        <p>If you have any questions or concerns about our return and refund policy, please contact us at <Link className='text-primary' href="mailto:cs@interiorfilm.ae">cs@interiorfilm.ae</Link>. Our customer service team is available to assist you from 9 am to 6 pm, Monday to Saturday (excluding public holidays).</p>
        <p>Thank you for choosing <Link className='text-primary' href="/">Interiorfilm.ae</Link>.</p>
      </div>
    </>
  );
};

export default ReturnRefund;
