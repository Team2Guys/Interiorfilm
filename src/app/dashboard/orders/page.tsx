import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import React from 'react';
import dynamic from "next/dynamic";
const ViewOrder = dynamic(() => import('components/Dashboard/view-order/ViewOrder'));
const Orders = () => {

  return (
    <DefaultLayout> 
      <Breadcrumb pageName="View Orders" />
       <ViewOrder/>
    </DefaultLayout>
  );
};

export default Orders;
