import React from 'react';
import Overlay from 'components/widgets/Overlay/Overlay';
import blacklogo from "../../../public/images/logoblack.png";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipment Policy for Wall Decor Orders',
  description: 'Learn about our shipping and delivery process at Interior Film UAE. Get details on dispatch times, delivery options, and order tracking for wall decor products.',
  openGraph: {
    title: 'Shipment Policy for Wall Decor Orders',
    description: 'Learn about our shipping and delivery process at Interior Film UAE. Get details on dispatch times, delivery options, and order tracking for wall decor products.',
    url: 'https://interiorfilm.ae/shipment-policy',
    type: "website",
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: 'https://interiorfilm.ae/shipment-policy',
  },
};


const ShipmentPolicy: React.FC = () => {
  return (
    <>
      <Overlay title='Shipment Policy'/>
      <div className='px-2 sm:px-4 md:px-8 max-w-screen-xl mx-auto space-y-3 py-20'>
        <h2 className='text-2xl font-bold'>Shipping policy</h2>
          <div className='space-y-3'>
            <h3 className='text-xl font-bold'>Free shipping throughout mainland UAE on all orders above <span className="font-currency text-22"></span> 250</h3>
          <p>If your order exceeds Above <span className="font-currency text-18"></span> 250 and you are located inside the UAE, you will be offered free standard delivery at checkout.</p>
          <p>If your order is below <span className="font-currency text-18"></span> 250, we will offer standard delivery anywhere in the UAE for only <span className="font-currency text-18"></span> 20.</p>
          <p>CASH ON DELIVERY: NOT AVAILABLE</p>
      </div>
      </div>
    </>
  );
};

export default ShipmentPolicy;
