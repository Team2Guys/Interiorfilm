'use client'
import React, { Suspense } from 'react';
const DynamicHeader = dynamic(() => import("components/thankyou/page"), {
    suspense: true,
  })

import Thankyou from 'components/thankyou/page';
import dynamic from 'next/dynamic';

function Thank() {


    return (
   <Suspense><Thankyou/> </Suspense>
    )
}

export default Thank