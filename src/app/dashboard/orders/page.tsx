'use client';

import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import React, { useEffect, useState } from 'react';
import FilterTable from 'components/Dashboard/Tables/FilterTable';
import { ordercolumns, Orderdata } from 'data/table';
import axios from 'axios';
import Cookies from 'js-cookie';
import FilterTableSkeleton from 'components/Skeleton-loading/FilterTableSkelton';

const Orders = () => {
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [loading,setLoading]=useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const token = Cookies.get("2guysAdminToken");
  const superAdminToken = Cookies.get("superAdminToken");
  let finalToken = token ? token : superAdminToken;

  const getOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getorders`, {
        headers: { token: finalToken },
      });
      console.log(response.data, 'response');
      
      setOrdersData(response.data);
      const allProducts = response.data.flatMap((order: any) => 
        order.products.map((product: any) => ({
          ...product,
          usermail: order.usermail,
          userAddress: order.userAddress,
        }))
      );
      setProducts(allProducts);
      setLoading(true)
     
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []); 

  return (
    <DefaultLayout>
      <Breadcrumb pageName="View Orders" />
      {loading===false?(
        <FilterTableSkeleton/>
      ):(
        <FilterTable data={products} columns={ordercolumns} /> 
      )}
    </DefaultLayout>
  );
};

export default Orders;
