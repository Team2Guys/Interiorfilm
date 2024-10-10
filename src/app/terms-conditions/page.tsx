'use client'
import React from 'react';
import Overlay from 'components/widgets/Overlay/Overlay';
import { Terms_Conditions } from 'data/Data';
import Link from 'next/link';

const TermsAndCondition: React.FC = () => {
  const replaceTextWithLink = (text: string) => {
    let replacedText = text.split('cs@interiorfilm.ae').map((part, index, array) =>
      index < array.length - 1 ? (
        <>
          {part}
          <Link href='mailto:cs@interiorfilm.ae' className='text-primary hover:text-primary'>
            cs@interiorfilm.ae
          </Link>
        </>
      ) : (
        part
      )
    );

    replacedText = replacedText.flatMap((element: any) =>
      typeof element === 'string' ? (
        element.split('www.interiorfilm.ae').map((part, index, array) =>
          index < array.length - 1 ? (
            <>
              {part}
              <Link href='/' className='text-primary hover:text-primary'>
                www.interiorfilm.ae
              </Link>
            </>
          ) : (
            part
          )
        )
      ) : (
        [element]
      )
    );

    return replacedText;
  };

  return (
    <>
      <Overlay title='Terms & Conditions'/>
      <div className='px-2 sm:px-4 md:px-8 max-w-screen-xl mx-auto space-y-3 py-20'>
        <h1 className='text-2xl font-bold'>Terms & Conditions–Yellowzone Trading LLC</h1>
        {Terms_Conditions.map((item, index) => (
          <div key={index} className='space-y-3'>
            <h2 className='text-xl font-bold'>
              {replaceTextWithLink(item.title ?? '')}
            </h2>
            <div>{replaceTextWithLink(item.text)}</div>
            {item.listItems && (
              <ul className='px-4 space-y-1'>
                {item.listItems.map((listItem, listItemIndex) => (
                  <li key={listItemIndex} className='list-decimal'>
                    {replaceTextWithLink(listItem)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TermsAndCondition;
