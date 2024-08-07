
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import React from 'react';
import FilterTable from 'components/Dashboard/Tables/FilterTable';
import { ordercolumns, Orderdata } from 'data/table';



const Abundant  = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName={'Abundant Order'} />
      <FilterTable data={Orderdata} columns={ordercolumns} />
    </DefaultLayout>
  );
};

export default Abundant;
