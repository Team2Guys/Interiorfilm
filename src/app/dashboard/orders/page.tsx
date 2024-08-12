
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import React from 'react';
import FilterTable from 'components/Dashboard/Tables/FilterTable';
import { ordercolumns, Orderdata } from 'data/table';


const Orders = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName={'View Orders'} />
      <FilterTable data={Orderdata} columns={ordercolumns} />
    </DefaultLayout>
  );
};

export default Orders;
