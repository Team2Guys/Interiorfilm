'use client'
import React from 'react';
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';

const TermsAndCondition: React.FC = () => {

  return (
    <>
      <Overlay title='Terms & Conditions'/>
      <div className='px-2 sm:px-4 md:px-8 max-w-screen-xl mx-auto space-y-3 py-20'>
        <h2 className='font-semibold text-2xl'>Terms & Conditions–Yellowzone Trading LLC</h2>
        <p >Please carefully consider this agreement before using this website. Yellowzone Trading LLC has all the rights to amend this site, its services, T&Cs and Delivery Policy, Refund and Return Policy, and Shipping Policy. Also, Yellowzone Trading LLC has all the right to modify the services offered on the website and these conditions at any moment without previous notice.</p>
        <h2 className='font-semibold text-2xl'>1) Introduction:</h2>
        <p>The Yellowzone Trading LLC Terms and Conditions (&apos;Terms&apos;) considered as a legal agreement between you and (&apos;User,&apos; &apos;you,&apos; or &apos;your&apos;) and Yellowzone Trading LLC, Inc. (&apos;Yellowzone Trading LLC&apos; &apos;Company,&apos; &apos;we,&apos; &apos;our,&apos; or &apos;us&apos;). These terms and conditions, incorporated and presented after careful consideration, govern and secure your use of our website located at <Link className='text-primary' href="/">www.interiorfilm.ae</Link> (&apos;website&apos;), including all content that is posted, functionality, and services offered on or through the website by Yellowzone Trading LLC.</p>
        <p>Please carefully read these Terms and Conditions before you start using the website and the services offered. Our aim is to make this legal agreement as readable as possible.</p>
        <p>By accessing or using the website to buy and use the services by Yellowzone Trading LLC, you are bound to accept these terms and conditions. Also, it will be considered as a proof that you agree to the terms, conditions and notices contained on the website or referenced herein. If you do not agree to these terms, you must not access or use the website and its content or services provided by Yell</p>
        <p>To contact us please email us at: <Link className='text-primary' href="mailto:cs@interiorfilm.ae">cs@interiorfilm.ae</Link></p>
        <h2 className='font-semibold text-2xl'>2) By using our website (<Link className='text-primary' href="/">www.interiorfilm.ae</Link>) and services, you accept these terms:</h2>
        <p>By using our website, you agree and confirm that you accept these terms and our Privacy Policy, and are bound to comply with them, incorporated here by reference. If you do not feel comfortable with these terms and conditions and wish to disagree, we respect your decision.</p>
        <p>These T&Cs take effect from the date you first access our website. In addition to the general T&Cs mentioned in this page, you can also refer to Yellowzone Trading LLC’s Delivery Policy, Refund & Return Policy, Shipping Policy before making any purchase from our website (<Link className='text-primary' href="/">www.interiorfilm.ae</Link>). Please be advised that by agreeing to these general T&Cs, you are accepting the other T&Cs outlined in the Delivery Policy, Refund & Return Policy and Shipping Policy. These policies are all part of a legally binding contract between Yellowzone Trading LLC and “you” (user of this website and services).</p>
        <p>By agreeing to these terms, you represent and warrant that you are of legal age to use the website and the services provided by Yellowzone Trading LLC, under the law of the United Arab Emirates to form a binding contract with Yellowzone Trading LLC.</p>
        <h2 className='font-semibold text-2xl'>3) Updates of Terms and Services</h2>
        <p>We may update or revise these Terms at any time at our sole discretion.</p>
        <p>Please be advised that any modifications made to the Terms and Conditions of our website (<Link className='text-primary' href="/">www.interiorfilm.ae</Link>) will take effect immediately once they are updated. These changes and updates will apply to all future access and use of our website and services mentioned. By continuing to use the website after the revised terms have been posted, you are indicating your acceptance and agreement to the changes and updated T&Cs, Delivery Policy, Refund and Return Policy, and Shipping Polic</p>
        <p>We strongly recommend you to regularly review and have a clear understanding of these Terms and Conditions that govern your use of the website and its services. Whenever these terms are updated, we will update the &apos;Last Updated&apos; date at the top of this document.</p>
        <h2 className='font-semibold text-2xl'>4) User Conduct</h2>
        <p>It is imperative to adhere and comply with the terms of use when accessing the website and its services. Users must avoid the following in order to access and engage with Yellowzone Trading LLC’s website and its services in future.</p>
        <ul className='list-decimal px-4'>
          <li>Any action that violates any applicable federal, state, local, or international law or regulation.</li>
          <li>The transmission, reception, posting, downloading, use, or reuse of any content that does not conform to the guidelines for acceptable submissions provided in these terms of service.</li>
          <li>The sending or arranging for the sending of any promotional or advertising materials.</li>
          <li>Impersonating the company, an employee of the company, another user, or any other entity or persona, including the use of email addresses associated with any of the aforementioned.</li>
        </ul>
        <p>Subject to these Terms, Yellowzone Trading LLC grants you a non-transferable, non-exclusive, revocable, limited license to access and use the website exclusively for your personal, non-commercial use.</p>
        <p>It is advised that users abide by these rules to avoid any legal consequences or violation of the terms of service.</p>
      </div>
    </>
  );
};

export default TermsAndCondition;
