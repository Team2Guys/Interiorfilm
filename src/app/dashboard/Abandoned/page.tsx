
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import React from 'react';
import dynamic from 'next/dynamic';
const AbundantOrder = dynamic(() => import('components/Dashboard/view-abundant/AbundantOrder'));


const Abundant  = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName={'Abandoned Orders'} />
      <AbundantOrder/>
    </DefaultLayout>
  );
};

export default Abundant;
