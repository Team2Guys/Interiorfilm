import React from 'react';
import Overlay from 'components/widgets/Overlay/Overlay';
import { privacyPolicyData } from 'data/Data';
import Link from 'next/link';
import blacklogo from "../../../public/images/logoblack.png";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Interior Film UAE',
  description: 'Need help? Contact Interior Film UAE for support, inquiries, or feedback. Our team is here to assist you with your wall decor and interior film needs.',
  openGraph: {
    title: 'Privacy Policy | Interior Film UAE',
    description: 'Need help? Contact Interior Film UAE for support, inquiries, or feedback. Our team is here to assist you with your wall decor and interior film needs.',
    url: 'https://interiorfilm.ae/privacy-policy',
    type: "website",
    images: [
      {
        url: `${blacklogo.src}`,
        alt: 'Interior Film',
      },
    ],
  },
  alternates: {
    canonical: 'https://interiorfilm.ae/privacy-policy',
  },
};

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Overlay title="Privacy Policy" />
      <div className="px-2 sm:px-4 md:px-8 max-w-screen-xl mx-auto space-y-3 py-20">
        {privacyPolicyData.map((item, index) => {
          const Tag = index === 0 ? 'h2' : 'h3';
          return (
            <div key={index} className="space-y-3">
              <Tag className={`${index === 0 ? 'text-2xl' : 'text-xl'} font-bold`}>
                {item.title}
              </Tag>

              <div>
                {item.text.includes('www.interiorfilm.ae') ? (
                  <>
                    {item.text.split('www.interiorfilm.ae')[0]}
                    <Link href="/" className="text-primary hover:text-primary">
                      www.interiorfilm.ae
                    </Link>
                    {item.text.split('www.interiorfilm.ae')[1]}
                  </>
                ) : (
                  item.text
                )}
              </div>

              {item.listItems && (
                <ul className="px-4 space-y-1 list-decimal">
                  {item.listItems.map((listItem, listItemIndex) => (
                    <li key={listItemIndex}>{listItem}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at
          <Link href="mailto:info@interiorfilm.ae" className="text-primary hover:text-primary px-2">
            info@interiorfilm.ae
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
