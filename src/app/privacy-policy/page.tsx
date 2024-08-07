'use client'
import React from 'react';
import Overlay from 'components/widgets/Overlay/Overlay';
import { privacyPolicyData } from 'data/Data';
import Link from 'next/link';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Overlay title='Privacy Policy'/>
      <div className='px-2 sm:px-4 md:px-8 max-w-screen-xl mx-auto space-y-3 py-20'>
        <h1 className='text-2xl font-bold'>Privacy Policy</h1>
        {privacyPolicyData.map((item, index) => (
          <div key={index} className='space-y-3'>
            <h2 className='text-xl font-bold'>{item.title}</h2>
            <p>{item.text}</p>
            {item.listItems && (
              <ul className='px-4 space-y-1'>
                {item.listItems.map((listItem, listItemIndex) => (
                  <li key={listItemIndex} className='list-decimal'>{listItem}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at  
          <Link href='mailto:info@interiorfilm.ae' className='text-primary hover:text-primary px-2'>
             info@interiorfilm.ae
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;