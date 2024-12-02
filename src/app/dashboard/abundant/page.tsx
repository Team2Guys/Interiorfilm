
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import React from 'react';
import AbundantOrder from 'components/Dashboard/view-abundant/AbundantOrder';



const Abundant  = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName={'Abundant Order'} />
      <AbundantOrder/>
    </DefaultLayout>
  );
};

export default Abundant;
